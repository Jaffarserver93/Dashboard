import { ArrowRight, CheckCircle, Code, Layers, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DotGrid } from "@/components/dot-grid";
import { FadeIn } from "@/components/fade-in";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const features = [
  {
    icon: <Layers className="h-8 w-8 text-primary" />,
    title: "Minimalist Design",
    description:
      "A clean and modern UI that puts your content front and center, built with ShadCN UI.",
  },
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: "Developer Friendly",
    description:
      "Built on Next.js and Tailwind CSS, it's easy to customize and extend for your own needs.",
  },
  {
    icon: <Rocket className="h-8 w-8 text-primary" />,
    title: "Launch Faster",
    description:
      "A solid foundation for your landing page, so you can focus on your product, not the boilerplate.",
  },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "$0",
    period: "/month",
    description: "For individuals and small teams getting started.",
    features: ["1 Project", "Basic Analytics", "Community Support"],
    cta: "Get Started Free",
    primary: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For growing teams that need more power and support.",
    features: [
      "Unlimited Projects",
      "Advanced Analytics",
      "Priority Support",
      "Team Collaboration",
    ],
    cta: "Choose Pro",
    primary: true,
  },
  {
    name: "Enterprise",
    price: "Contact Us",
    period: "",
    description: "For large organizations with custom needs.",
    features: [
      "Everything in Pro",
      "Custom Integrations",
      "Dedicated Account Manager",
      "SLA",
    ],
    cta: "Contact Sales",
    primary: false,
  },
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <DotGrid />
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 pt-32 pb-16 text-center md:px-6 md:pt-48 md:pb-24">
          <FadeIn>
            <div className="mb-4 inline-block rounded-full bg-secondary px-3 py-1 text-sm text-primary">
              Now in Public Beta
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              The Foundation for Your Next Big Idea
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
              Dot Landing is a beautifully designed, developer-friendly landing
              page template. Built with Next.js, Tailwind CSS, and ShadCN UI to
              help you launch faster.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="#">
                  Get Started <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                View on GitHub
              </Button>
            </div>
          </FadeIn>
        </section>

        <section
          id="features"
          className="container mx-auto px-4 py-16 md:px-6 md:py-24"
        >
          <FadeIn className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Why You'll Love Dot Landing
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Everything you need to build a stunning, professional landing
              page.
            </p>
          </FadeIn>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {features.map((feature, i) => (
              <FadeIn
                key={feature.title}
                delay={i * 150}
                className="flex flex-col items-center text-center"
              >
                {feature.icon}
                <h3 className="mt-4 text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {feature.description}
                </p>
              </FadeIn>
            ))}
          </div>
        </section>

        <section
          id="pricing"
          className="container mx-auto px-4 py-16 md:px-6 md:py-24"
        >
          <FadeIn className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Choose the plan that's right for you. No hidden fees.
            </p>
          </FadeIn>
          <div className="mt-12 grid gap-8 md:grid-cols-3 md:items-start">
            {pricingTiers.map((tier, i) => (
              <FadeIn key={tier.name} delay={i * 150}>
                <Card
                  className={
                    tier.primary ? "border-primary ring-2 ring-primary" : ""
                  }
                >
                  <CardHeader>
                    <CardTitle>{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{tier.price}</span>
                      <span className="text-muted-foreground">
                        {tier.period}
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      variant={tier.primary ? "default" : "outline"}
                    >
                      {tier.cta}
                    </Button>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="container mx-auto px-4 py-16 md:px-6 md:py-24"
        >
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Get in Touch
            </h2>
            <p className="mt-4 text-muted-foreground">
              Have a question or want to work together? Drop us a line.
            </p>
          </FadeIn>
          <FadeIn delay={150} className="mx-auto mt-12 max-w-xl">
            <Card>
              <CardContent className="p-6">
                <form className="grid gap-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input placeholder="Name" />
                    <Input placeholder="Email" type="email" />
                  </div>
                  <Textarea placeholder="Your message" rows={5} />
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </div>
  );
}
