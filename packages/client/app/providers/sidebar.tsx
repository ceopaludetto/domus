import type { ReactNode } from "react";

import { useMemo, useContext, createContext, useCallback, useState } from "react";

type ISidebarContextProps = { open: boolean; toggleSidebar: (value?: boolean) => void };

const SidebarContext = createContext<ISidebarContextProps | undefined>(undefined);

type ISidebarProviderProps = { children: ReactNode };

export function SidebarProvider({ children }: ISidebarProviderProps) {
  const [open, setOpen] = useState(false);

  const toggleSidebar = useCallback((value?: boolean) => {
    setOpen((current) => value ?? !current);
  }, []);

  const value = useMemo(() => ({ open, toggleSidebar }), [open, toggleSidebar]);

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebarContext should be called inside SidebarProvider");

  return context;
}
