import type { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";

import { fromDate } from "@domus/utils";
import { Button, Switch } from "@mui/material";
import { json } from "@remix-run/node";
import { setFormDefaults, ValidatedForm, validationError } from "remix-validated-form";

import { Page, FormBuilder, Section, Control, SubmitButton } from "~/components";
import { updateUser } from "~/models";
import * as Masks from "~/utils/mask";
import { createUserSession, requireUser } from "~/utils/session.server";
import { PersonalInfoValidator } from "~/utils/validation";

export const loader: LoaderFunction = async ({ request }) => {
  const { email, firstName, lastName, phone, birthDate } = await requireUser(request);
  const date = birthDate ? fromDate(birthDate) : "";

  return json(
    setFormDefaults("personalInformationForm", {
      birthDate: date,
      email,
      firstName,
      lastName,
      phone,
    })
  );
};

export const action: ActionFunction = async ({ request }) => {
  const { data, error } = await PersonalInfoValidator.validate(await request.formData());
  if (error) return validationError(error);

  const res = await updateUser({ data, request });

  if (res.error) return validationError(res.error);
  return createUserSession(request, res.data.user.id, res.data.token, request.url);
};

export const meta: MetaFunction = () => ({
  title: "Informações Pessoais - Domus",
});

export default function DashboardSettingsIndex() {
  return (
    <Page isSubPage subtitle="Ajustes" title="Informações Pessoais">
      <Section description="Preencha as informações referentes à sua identificação." title="Identificação">
        <ValidatedForm id="personalInformationForm" method="post" validator={PersonalInfoValidator}>
          <FormBuilder>
            <Control label="Email" name="email" />
            <FormBuilder.Item size={6}>
              <Control label="Nome" name="firstName" />
            </FormBuilder.Item>
            <FormBuilder.Item size={6}>
              <Control label="Sobrenome" name="lastName" />
            </FormBuilder.Item>
            <FormBuilder.Item size={6}>
              <Control label="Telefone" maskOptions={Masks.PHONE} name="phone" />
            </FormBuilder.Item>
            <FormBuilder.Item size={6}>
              <Control label="Data de Nascimento" maskOptions={Masks.DATE} name="birthDate" />
            </FormBuilder.Item>
            <FormBuilder.Item sx={{ textAlign: "right" }}>
              <SubmitButton>Alterar Informações</SubmitButton>
            </FormBuilder.Item>
          </FormBuilder>
        </ValidatedForm>
      </Section>
      <Section
        description="Configure os meios de comunicação que utilizaremos para manter contato."
        title="Notificações"
      >
        <Switch />
      </Section>
      <Section description="Ações irreversíveis." title="Área de Risco">
        <Button color="error">Excluir Conta</Button>
      </Section>
    </Page>
  );
}
