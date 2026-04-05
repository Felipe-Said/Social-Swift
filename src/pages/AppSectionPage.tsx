import { Link } from "react-router-dom";
import { ArrowRight, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

interface AppSectionPageProps {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  primaryActionLabel: string;
  primaryActionHref: string;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
  highlights: string[];
}

export function AppSectionPage({
  eyebrow,
  title,
  description,
  icon: Icon,
  primaryActionLabel,
  primaryActionHref,
  secondaryActionLabel,
  secondaryActionHref,
  highlights,
}: AppSectionPageProps) {
  return (
    <div className="min-h-screen bg-bg px-4 py-6 md:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <GlassCard strong className="overflow-hidden">
          <div className="flex flex-col gap-8 p-6 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 rounded-pill border border-border/40 bg-bg-sub px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-text-dim">
                  <Icon className="h-3.5 w-3.5" />
                  <span>{eyebrow}</span>
                </div>
                <div className="space-y-3">
                  <h1 className="text-3xl font-bold text-text md:text-4xl">{title}</h1>
                  <p className="text-base leading-7 text-text-dim md:text-lg">{description}</p>
                </div>
              </div>

              <div className="flex size-16 shrink-0 items-center justify-center rounded-[20px] border border-brand/20 bg-brand/10 text-brand">
                <Icon className="h-8 w-8" />
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-brand border border-border/40 bg-bg-sub p-4 text-sm text-text-dim"
                >
                  {highlight}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="gradient-brand text-white">
                <Link to={primaryActionHref}>
                  {primaryActionLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              {secondaryActionLabel && secondaryActionHref ? (
                <Button asChild variant="outline">
                  <Link to={secondaryActionHref}>{secondaryActionLabel}</Link>
                </Button>
              ) : null}
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
