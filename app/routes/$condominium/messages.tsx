import type { MetaFunction } from "@remix-run/node";

import { Page } from "~/components";

export const meta: MetaFunction = () => ({
  title: "Mensagens - Domus",
});

export default function DashboardMessages() {
  return (
    <Page title="Mensagens" subtitle="Social">
      content
    </Page>
  );
}
