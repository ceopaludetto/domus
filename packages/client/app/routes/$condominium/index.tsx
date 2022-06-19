import type { MetaFunction } from "@remix-run/node";

import { Page } from "~/components";

export const meta: MetaFunction = () => ({
  title: "Início - Domus",
});

export default function DashboardIndex() {
  return (
    <Page title="Início" subtitle="Visão Geral">
      content
    </Page>
  );
}
