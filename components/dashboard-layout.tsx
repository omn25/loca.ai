"use client"

import { Button } from "@/components/ui/button"
import {
  HelpCircle,
  Home,
  Image as ImageIcon,
  LayoutDashboard,
  Megaphone,
  Plus,
  Settings,
  Wallet,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface DashboardLayoutProps {
  children: React.ReactNode
  pageTitle: React.ReactNode
  headerActions?: React.ReactNode
}

export function DashboardLayout({
  children,
  pageTitle,
  headerActions,
}: DashboardLayoutProps) {
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/campaigns", icon: Megaphone, label: "Campaigns" },
    { href: "/creatives", icon: ImageIcon, label: "Creatives" },
    { href: "/billing", icon: Wallet, label: "Billing" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ]

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <Image src="/logo.png" alt="loca.ai Logo" width={32} height={32} />
          <span className="font-semibold">loca.ai</span>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className="justify-start gap-2 w-full"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
        <div className="mt-auto p-4">
          <Link href="/?startStep=2">
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" /> New campaign
            </Button>
          </Link>
          <div className="mt-4 flex items-center justify-center text-sm text-muted-foreground">
            <HelpCircle className="mr-2 h-4 w-4" />
            Help and feedback
          </div>
        </div>
      </aside>
      <div className="flex flex-col sm:pl-64 w-full">
        <header className="flex h-16 items-center justify-between gap-4 border-b bg-background px-6">
          <div className="text-xl font-semibold">{pageTitle}</div>
          {headerActions && (
            <div className="flex items-center gap-2">{headerActions}</div>
          )}
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
} 