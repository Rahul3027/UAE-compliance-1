"use client"

import * as React from "react"
import { PreferencesProvider } from "@/hooks/use-preferences"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <PreferencesProvider>{children}</PreferencesProvider>;
}

