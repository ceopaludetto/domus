import { client } from "~/utils/api.server";

export function getRulesByCondominiumID(id: string) {
  return client.query("rules.findCondominiumRules", { id });
}
