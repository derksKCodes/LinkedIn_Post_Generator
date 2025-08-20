"use client"

import { Search, Bell, User, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function DashboardHeader() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and AI Status */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-cyan-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LI</span>
              </div>
              <h1 className="font-sans font-black text-xl text-slate-800">LinkedIn AI</h1>
            </div>

            <Badge variant="secondary" className="bg-cyan-100 text-cyan-800 border-cyan-200">
              <Zap className="w-3 h-3 mr-1" />
              AI ready to assist
            </Badge>
          </div>

          {/* Search and User Menu */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input placeholder="Search posts and analytics..." className="pl-10 w-80 bg-slate-50 border-slate-200" />
            </div>

            <Button variant="ghost" size="icon" className="text-slate-600">
              <Bell className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="icon" className="text-slate-600">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
