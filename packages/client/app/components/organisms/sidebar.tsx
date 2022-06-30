import type { DrawerProps } from "@mui/material";
import type { Condominium, User } from "@prisma/client";

import { Drawer, Divider, Stack } from "@mui/material";
import { LayoutDashboard, MapPin, MessageCircle, Sliders } from "lucide-react";
import { useCallback } from "react";

import { SidebarCondominium, SidebarLink, SidebarUser } from "../molecules";

import { useSidebarContext } from "~/providers/sidebar";

export type ISidebarProps = DrawerProps & {
  condominiums: Condominium[];
  user: User;
};

export function Sidebar({ sx, user, condominiums, PaperProps, ...rest }: ISidebarProps) {
  const { open, toggleSidebar } = useSidebarContext();

  const renderItems = useCallback(
    () => (
      <>
        <Stack direction="column" spacing={1.25} sx={{ flex: 1 }}>
          <SidebarCondominium />
          <Divider />
          <SidebarLink icon={LayoutDashboard} to="">
            Início
          </SidebarLink>
          <SidebarLink icon={MessageCircle} to="messages">
            Mensagens
          </SidebarLink>
          <SidebarLink end={false} icon={MapPin} to="places">
            Locais e Eventos
          </SidebarLink>
          <SidebarLink end={false} icon={Sliders} to="settings">
            Ajustes
          </SidebarLink>
        </Stack>
        <SidebarUser user={user} />
      </>
    ),
    [user]
  );

  return (
    <>
      <Drawer
        sx={{ display: { md: "block", xs: "none" }, gridArea: "sidebar", ...sx }}
        variant="permanent"
        PaperProps={{
          elevation: 0,
          sx: {
            maxWidth: 350,
            p: 3,
            width: "100%",
          },
          ...PaperProps,
        }}
        {...rest}
      >
        {renderItems()}
      </Drawer>
      <Drawer
        onClose={() => toggleSidebar()}
        open={open}
        sx={{ display: { md: "none" }, gridArea: "sidebar", ...sx }}
        variant="temporary"
        PaperProps={{
          elevation: 0,
          sx: {
            maxWidth: 350,
            p: 3,
            width: "80%",
          },
          ...PaperProps,
        }}
        {...rest}
      >
        {renderItems()}
      </Drawer>
    </>
  );
}
