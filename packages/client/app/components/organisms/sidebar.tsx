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
        <Stack sx={{ flex: 1 }} spacing={1.25} direction="column">
          <SidebarCondominium />
          <Divider />
          <SidebarLink to="" icon={LayoutDashboard}>
            Início
          </SidebarLink>
          <SidebarLink to="messages" icon={MessageCircle}>
            Mensagens
          </SidebarLink>
          <SidebarLink to="places" icon={MapPin} end={false}>
            Locais e Eventos
          </SidebarLink>
          <SidebarLink to="settings" icon={Sliders} end={false}>
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
        variant="permanent"
        sx={{ gridArea: "sidebar", display: { xs: "none", md: "block" }, ...sx }}
        PaperProps={{
          elevation: 0,
          sx: {
            p: 3,
            maxWidth: 350,
            width: "100%",
          },
          ...PaperProps,
        }}
        {...rest}
      >
        {renderItems()}
      </Drawer>
      <Drawer
        open={open}
        onClose={() => toggleSidebar()}
        variant="temporary"
        sx={{ gridArea: "sidebar", display: { md: "none" }, ...sx }}
        PaperProps={{
          elevation: 0,
          sx: {
            p: 3,
            maxWidth: 350,
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
