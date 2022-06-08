import { prisma } from "~/utils/database.server";

export function getRulesByCondominiumID(id: string) {
  return prisma.rule.findMany({ where: { condominiumID: id } });
}
