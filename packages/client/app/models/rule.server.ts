import { withClient } from "~/utils/api.server";

export const getRulesByCondominiumID = withClient(async (client) => client.query("rules.findByCondominiumID"));
