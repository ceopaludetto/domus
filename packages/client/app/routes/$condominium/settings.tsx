import { Outlet } from "@remix-run/react";
import { Building2, Lock, User } from "lucide-react";

import { Page, TabLink, TabLinkGroup } from "~/components";

export default function DashboardSettings() {
  return (
    <Page title="Ajustes" subtitle="Visão Geral" subPage={<Outlet />}>
      <TabLinkGroup>
        <TabLink to="" title="Informações Pessoais" description="Nome, notificações." icon={User} />
        <TabLink to="security" title="Segurança" description="Senha, A2F." icon={Lock} />
        <TabLink
          to="condominium"
          title="Condomínio"
          description="Nome, endereço, caractere especial."
          icon={Building2}
        />
      </TabLinkGroup>
    </Page>
  );
}
