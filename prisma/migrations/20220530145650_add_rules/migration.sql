-- CreateTable
CREATE TABLE "Rule" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "condominiumID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rule" ADD CONSTRAINT "Rule_condominiumID_fkey" FOREIGN KEY ("condominiumID") REFERENCES "Condominium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
