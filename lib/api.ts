import axios, { AxiosError, AxiosRequestConfig } from "axios";

// ─────────────────────────────────────────────────────────────
// Axios instance
// ─────────────────────────────────────────────────────────────
export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

console.log(process.env.NEXT_PUBLIC_API_BASE_URL);

// ─────────────────────────────────────────────────────────────
// Refresh control (prevents token refresh storms)
// ─────────────────────────────────────────────────────────────
let isRefreshing = false;

type FailedRequest = {
    resolve: (value?: unknown) => void;
    reject: (reason?: any) => void;
};

let failedQueue: FailedRequest[] = [];

const processQueue = (error: any) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else {
            resolve();
        }
    });
    failedQueue = [];
};

// ─────────────────────────────────────────────────────────────
// Response interceptor
// ─────────────────────────────────────────────────────────────
api.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
            _retry?: boolean;
        };

        // Only act on 401 once per request
        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            // If a refresh is already in progress, queue this request
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(() => api(originalRequest));
            }

            isRefreshing = true;

            try {
                // 🔁 Attempt token refresh (cookie-based)
                // Use clean axios instance to avoid interceptor deadlock
                await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dj-rest-auth/token/refresh/`, {}, {
                    withCredentials: true
                });

                processQueue(null);
                return api(originalRequest); // retry original request
            } catch (refreshError) {
                processQueue(refreshError);

                if (typeof window !== "undefined") {
                    // Use clean axios instance to avoid interceptor loops
                    axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dj-rest-auth/logout/`, {}, {
                        withCredentials: true
                    }).catch(() => {
                        // Ignore logout errors (e.g. 401), just redirect
                    }).finally(() => {
                        if (window.location.href != process.env.NEXT_PUBLIC_API_BASE_URL + '/' || window.location.href != process.env.NEXT_PUBLIC_API_BASE_URL) {
                            window.location.href = "/auth/login";
                        }
                    });
                }

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);


export const handleApiError = (error: any, setError: any) => {
    const response = error?.response || {};
    const { data, status } = response;
    console.log(data)

    // Clear previous server errors
    setError("root", { type: "server" });
    // Handle 405 Method Not Allowed and similar standard errors
    if (status === 405 || data?.detail) {
        setError("root", {
            type: "server",
            message: data?.detail || "This action is not allowed",
        });
        return;
    }

    // Handle validation errors (field-specific and non-field)
    if (data) {
        let hasHandledErrors = false;

        // Handle field-specific errors
        Object.entries(data).forEach(([field, messages]) => {
            if (field === 'non_field_errors' || field === 'detail') return;
            const message = Array.isArray(messages) ? messages[0] : messages;
            if (field === '0') {
                setError('root', {
                    type: 'server',
                    message,
                })
            }
            if (message) {
                setError(field, {
                    type: "server",
                    message,
                });
                hasHandledErrors = true;
            }
        });

        // Handle non-field errors
        if (data.non_field_errors) {
            const message = Array.isArray(data.non_field_errors)
                ? data.non_field_errors[0]
                : data.non_field_errors;
            setError("root", {
                type: "server",
                message,
            });
            hasHandledErrors = true;
        }

        if (hasHandledErrors) return;
    }

    // Fallback for unhandled errors
    setError("root", {
        type: "server",
        message: "Something went wrong. Please try again later.",
    });
};


// lib/auth.ts
export async function getCurrentUser() {
    try {
        const response = await api.get('/dj-rest-auth/user/')
        return response.data
    } catch (error) {
        return null
    }

}
