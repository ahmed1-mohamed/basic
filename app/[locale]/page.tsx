import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import {
  ArrowRight,
  Sparkles,
  Languages,
  MoonStar,
  FormInput,
  Network,
  LayoutGrid,
  Cpu,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("home");

  const featureCards: Array<{
    key: "i18n" | "theme" | "forms" | "api" | "ui" | "state";
    icon: typeof Languages;
    color: string;
  }> = [
    {
      key: "i18n",
      icon: Languages,
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      key: "theme",
      icon: MoonStar,
      color: "text-amber-500 bg-amber-500/10",
    },
    {
      key: "forms",
      icon: FormInput,
      color: "text-emerald-500 bg-emerald-500/10",
    },
    {
      key: "api",
      icon: Network,
      color: "text-purple-500 bg-purple-500/10",
    },
    {
      key: "ui",
      icon: LayoutGrid,
      color: "text-rose-500 bg-rose-500/10",
    },
    {
      key: "state",
      icon: Cpu,
      color: "text-cyan-500 bg-cyan-500/10",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-28 lg:py-32 border-b bg-gradient-to-b from-background via-muted/20 to-background">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-1.5 text-xs sm:text-sm font-medium shadow-sm backdrop-blur mb-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>{t("badge")}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground max-w-4xl mx-auto leading-tight">
              {t("title")}
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="h-11 px-6 shadow-sm gap-2">
                <Link href="/dashboard">
                  <span>{t("getStarted")}</span>
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-11 px-6">
                <Link href="/components-showcase">
                  {t("viewComponents")}
                </Link>
              </Button>
            </div>

            {/* Micro Highlights */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>Next.js 15 App Router</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>TypeScript Strict Mode</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>Full RTL & LTR Support</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>shadcn/ui Design System</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {t("featuresTitle")}
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                {t("featuresSubtitle")}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featureCards.map((feat) => {
                const Icon = feat.icon;
                return (
                  <Card
                    key={feat.key}
                    className="group relative overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                  >
                    <CardHeader>
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-lg ${feat.color} mb-2`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-lg">
                        {t(`features.${feat.key}.title`)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t(`features.${feat.key}.description`)}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
