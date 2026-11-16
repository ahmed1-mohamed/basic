"use client";

import * as React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  Bell,
  User as UserIcon,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";

export function Navbar() {
  const t = useTranslations("common");
  const tNav = useTranslations("nav");

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left Section (Mobile Nav + Desktop Brand / Navigation) */}
        <div className="flex items-center gap-3">
          <MobileNav />

          <Link href="/" className="flex items-center gap-2 md:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold shadow-sm">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <span className="font-bold text-sm tracking-tight">{t("appName")}</span>
          </Link>

          {/* Top desktop nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link
              href="/"
              className="transition-colors hover:text-foreground"
            >
              {t("home")}
            </Link>
            <Link
              href="/dashboard"
              className="transition-colors hover:text-foreground"
            >
              {t("dashboard")}
            </Link>
            <Link
              href="/components-showcase"
              className="transition-colors hover:text-foreground"
            >
              {tNav("showcase")}
            </Link>
          </nav>
        </div>

        {/* Right Section (Search, Notifications, Lang, Theme, User) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Theme Switcher */}
          <ThemeToggle />

          {/* Notifications Placeholder */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground"
            aria-label={t("notifications")}
          >
            <Bell className="h-4 w-4" />
          </Button>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-full ms-1 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label={t("profile")}
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage src="" alt="Alex Johnson" />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                    AJ
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Alex Johnson</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    alex.johnson@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <UserIcon className="me-2 h-4 w-4" />
                <span>{t("profile")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="me-2 h-4 w-4" />
                <span>{t("settings")}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="me-2 h-4 w-4" />
                <span>{t("logout")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
