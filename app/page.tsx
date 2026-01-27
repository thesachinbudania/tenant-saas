'use client';
import { About3 } from "@/components/about3";
import { Hero115 } from "@/components/hero115";
import { Navbar1 } from "@/components/navbar1";
import { Pricing4 } from "@/components/pricing4";
import { Footer2 } from "@/components/footer2";
import { getCurrentUser } from "@/lib/api";
import React from "react";
export default function Home() {
  React.useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        window.location.href = '/dashboard'
      }
    })
  }, [])
  return (
    <main className="min-h-screen w-full flex flex-col font-sans">
      <Navbar1 />
      <div className="pt-16">
        <Hero115
          heading="The Secure Foundation for Multi-Tenant SaaS"
          description="Build, deploy, and scale your application with enterprise-grade isolation and security. The infrastructure choice for serious organizations."
          button={{
            text: "Start Building",
            url: "/auth/signup",
          }}
          trustText="Trusted by security-first organizations worldwide"
          imageSrc="/images/hero.jpg"
          imageAlt="Dashboard Preview"
        />

        <About3
          title="Engineered for Complete Isolation"
          description="Data sovereignty and tenant isolation aren't just features—they are our architecture. Experience the peace of mind that comes with true multi-tenancy."
          mainImage={{
            src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
            alt: "Architecture Diagram"
          }}
          secondaryImage={{
            src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
            alt: "Security Shield"
          }}
          breakout={{
            title: "Zero-Trust Security",
            description: "Every request is authenticated and authorized at the edge. default-deny policies ensure your data never leaks.",
            buttonText: "Read the Whitepaper",
            buttonUrl: "#",
            src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
            alt: "Security Icon"
          }}
          achievementsTitle="Scale Without Compromise"
          achievementsDescription="Our platform is designed to handle millions of requests while maintaining strict isolation guarantees."
          achievements={[
            { label: "Uptime SLA", value: "99.99%" },
            { label: "Tenants Secured", value: "10k+" },
            { label: "Data Leaks", value: "0" },
            { label: "Global Regions", value: "12" },
          ]}
        />

        <Pricing4
          title="Transparent, Predictable Pricing"
          description="Choose the plan that fits your growth. No hidden fees, just secure infrastructure."
          plans={[
            {
              name: "Starter",
              badge: "Bootstrap",
              monthlyPrice: "$0",
              yearlyPrice: "$0",
              features: [
                "Up to 5 Tenants",
                "Basic Isolation",
                "Community Support",
                "99.9% Uptime",
              ],
              buttonText: "Start for Free",
            },
            {
              name: "Growth",
              badge: "Most Popular",
              monthlyPrice: "$49",
              yearlyPrice: "$490",
              features: [
                "Unlimited Tenants",
                "Advanced Isolation",
                "Priority Support",
                "99.99% Uptime",
                "Audit Logs",
              ],
              buttonText: "Get Growth",
              isPopular: true,
            },
            {
              name: "Enterprise",
              badge: "Custom",
              monthlyPrice: "Custom",
              yearlyPrice: "Custom",
              features: [
                "Dedicated Infrastructure",
                "Custom Contracts",
                "24/7 Dedicated Support",
                "SLA Guarantees",
                "On-premise Options"
              ],
              buttonText: "Contact Sales",
            },
          ]}
        />
      </div>

      <Footer2
        className="mt-auto border-t"
        logo={{
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
          alt: "Covert Logo",
          title: "Covert.",
          url: "/"
        }}
        tagline="Securing the modern web, one tenant at a time."
        copyright="© 2024 Covert Systems Inc. All rights reserved."
      />
    </main>
  );
}
