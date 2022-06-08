import type { LoaderFunction, MetaFunction } from "@remix-run/node";

import { IconButton } from "@mui/material";
import { json } from "@remix-run/node";
import { Plus } from "lucide-react";
import { setFormDefaults, ValidatedForm, validationError } from "remix-validated-form";
import invariant from "tiny-invariant";

import { Control, FormBuilder, Page, Section, SubmitButton, Tooltip } from "~/components";
import { getCondominiumByID } from "~/models";
import { CondominiumValidator } from "~/utils/validation";

export const loader: LoaderFunction = async ({ params }) => {
  const condominiumID = params.condominium;
  invariant(condominiumID, "Condominium must be setted");

  const condominium = await getCondominiumByID(condominiumID);
  if (!condominium) return validationError({ fieldErrors: { name: "Condomínio não encontrado" } });

  return json({
    condominiumName: condominium.name,
    ...setFormDefaults("condominiumForm", {
      name: condominium.name,
      character: condominium.character,
    }),
  });
};

export const meta: MetaFunction = ({ data }) => ({
  title: `${data.condominiumName} - Domus`,
});

export default function DashboardSettingsCondominium() {
  return (
    <Page title="Condomínio" subtitle="Ajustes" isSubPage>
      <Section
        title="Informações do Condomínio"
        description="Preencha as informações referente à identificação do condomínio."
      >
        <ValidatedForm id="condominiumForm" validator={CondominiumValidator} method="post">
          <FormBuilder>
            <FormBuilder.Item size={8}>
              <Control label="Nome" name="name" />
            </FormBuilder.Item>
            <FormBuilder.Item size={4}>
              <Control label="Caractere Especial" name="character" inputProps={{ maxLength: 1 }} />
            </FormBuilder.Item>
            <FormBuilder.Item sx={{ textAlign: "right" }}>
              <SubmitButton>Alterar Informações</SubmitButton>
            </FormBuilder.Item>
          </FormBuilder>
        </ValidatedForm>
      </Section>
      <Section
        title="Regras"
        description="Preencha as regras de comportamento do condomínio."
        trailing={
          <Tooltip describeChild title="Adicionar Regra">
            <IconButton>
              <Plus />
            </IconButton>
          </Tooltip>
        }
      >
        rules
      </Section>
    </Page>
  );
}
