import { Outlet } from "@remix-run/react";
import { Building2, Lock, User } from "lucide-react";

import { Page, TabLink, TabLinkGroup } from "~/components";

export default function DashboardSettings() {
  return (
    <Page subPage={<Outlet />} subtitle="Visão Geral" title="Ajustes">
      <TabLinkGroup>
        <TabLink description="Nome, notificações." icon={User} title="Informações Pessoais" to="" />
        <TabLink description="Senha, A2F." icon={Lock} title="Segurança" to="security" />
        <TabLink
          description="Nome, endereço, caractere especial."
          icon={Building2}
          title="Condomínio"
          to="condominium"
        />
      </TabLinkGroup>
    </Page>
  );
}
