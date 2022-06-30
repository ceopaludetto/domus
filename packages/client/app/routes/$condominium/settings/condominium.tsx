import type { LoaderFunction, MetaFunction } from "@remix-run/node";

import { IconButton } from "@mui/material";
import { json } from "@remix-run/node";
import { Plus } from "lucide-react";
import { setFormDefaults, ValidatedForm, validationError } from "remix-validated-form";
import invariant from "tiny-invariant";

import { Control, FormBuilder, Page, Section, SubmitButton, Tooltip } from "~/components";
import { getCondominiumByID } from "~/models";
import { CondominiumValidator } from "~/utils/validation";

export const loader: LoaderFunction = async ({ request, params }) => {
  const condominiumID = params.condominium;
  invariant(condominiumID, "Condominium must be setted");

  const condominium = await getCondominiumByID({ data: condominiumID, params, request });
  if (!condominium) return validationError({ fieldErrors: { name: "Condomínio não encontrado" } });

  return json({
    condominiumName: condominium.name,
    ...setFormDefaults("condominiumForm", {
      character: condominium.character,
      name: condominium.name,
    }),
  });
};

export const meta: MetaFunction = ({ data }) => ({
  title: `${data.condominiumName} - Domus`,
});

export default function DashboardSettingsCondominium() {
  return (
    <Page isSubPage subtitle="Ajustes" title="Condomínio">
      <Section
        description="Preencha as informações referente à identificação do condomínio."
        title="Informações do Condomínio"
      >
        <ValidatedForm id="condominiumForm" method="post" validator={CondominiumValidator}>
          <FormBuilder>
            <FormBuilder.Item size={8}>
              <Control label="Nome" name="name" />
            </FormBuilder.Item>
            <FormBuilder.Item size={4}>
              <Control inputProps={{ maxLength: 1 }} label="Caractere Especial" name="character" />
            </FormBuilder.Item>
            <FormBuilder.Item sx={{ textAlign: "right" }}>
              <SubmitButton>Alterar Informações</SubmitButton>
            </FormBuilder.Item>
          </FormBuilder>
        </ValidatedForm>
      </Section>
      <Section
        description="Preencha as regras de comportamento do condomínio."
        title="Regras"
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
