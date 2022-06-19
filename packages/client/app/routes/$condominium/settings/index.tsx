import type { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";

import { fromDate } from "@domus/utils";
import { Button, Switch } from "@mui/material";
import { json } from "@remix-run/node";
import { setFormDefaults, ValidatedForm, validationError } from "remix-validated-form";

import { Page, FormBuilder, Section, Control, SubmitButton } from "~/components";
import { updateUser } from "~/models";
import * as Masks from "~/utils/mask";
import { createUserSession, requireUser, requireUserID } from "~/utils/session.server";
import { PersonalInfoValidator } from "~/utils/validation";

export const loader: LoaderFunction = async ({ request }) => {
  const { email, firstName, lastName, phone, birthDate } = await requireUser(request);
  const date = birthDate ? fromDate(birthDate) : "";

  return json(
    setFormDefaults("personalInformationForm", {
      email,
      phone,
      firstName,
      lastName,
      birthDate: date,
    })
  );
};

export const action: ActionFunction = async ({ request }) => {
  const { data, error } = await PersonalInfoValidator.validate(await request.formData());
  if (error) return validationError(error);

  const id = await requireUserID(request);
  const res = await updateUser(id, data);

  if (res.error) return validationError(res.error);
  return createUserSession(request, res.data.id, request.url);
};

export const meta: MetaFunction = () => ({
  title: "Informações Pessoais - Domus",
});

export default function DashboardSettingsIndex() {
  return (
    <Page title="Informações Pessoais" subtitle="Ajustes" isSubPage>
      <Section title="Identificação" description="Preencha as informações referentes à sua identificação.">
        <ValidatedForm validator={PersonalInfoValidator} id="personalInformationForm" method="post">
          <FormBuilder>
            <Control label="Email" name="email" />
            <FormBuilder.Item size={6}>
              <Control label="Nome" name="firstName" />
            </FormBuilder.Item>
            <FormBuilder.Item size={6}>
              <Control label="Sobrenome" name="lastName" />
            </FormBuilder.Item>
            <FormBuilder.Item size={6}>
              <Control label="Telefone" name="phone" maskOptions={Masks.PHONE} />
            </FormBuilder.Item>
            <FormBuilder.Item size={6}>
              <Control label="Data de Nascimento" name="birthDate" maskOptions={Masks.DATE} />
            </FormBuilder.Item>
            <FormBuilder.Item sx={{ textAlign: "right" }}>
              <SubmitButton>Alterar Informações</SubmitButton>
            </FormBuilder.Item>
          </FormBuilder>
        </ValidatedForm>
      </Section>
      <Section
        title="Notificações"
        description="Configure os meios de comunicação que utilizaremos para manter contato."
      >
        <Switch />
      </Section>
      <Section title="Área de Risco" description="Ações irreversíveis.">
        <Button color="error">Excluir Conta</Button>
      </Section>
    </Page>
  );
}
