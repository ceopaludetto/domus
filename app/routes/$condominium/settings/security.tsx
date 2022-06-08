import type { MetaFunction } from "@remix-run/node";

import { Paper, Typography } from "@mui/material";
import { ValidatedForm } from "remix-validated-form";

import { Control, FormBuilder, Page, Section, SubmitButton } from "~/components";
import { PasswordValidator } from "~/utils/validation";

export const meta: MetaFunction = () => ({
  title: "Segurança - Domus",
});

export default function DashboardSettingsSecurity() {
  return (
    <Page title="Segurança" subtitle="Ajustes" isSubPage>
      <Section title="Senha" description="Altere sua senha para algo de fácil memorização.">
        <ValidatedForm validator={PasswordValidator}>
          <FormBuilder>
            <FormBuilder.Item size={6} sx={{ order: { xs: 1, md: 0 } }}>
              <FormBuilder>
                <Control label="Senha Atual" name="currentPassword" type="password" />
                <Control label="Nova Senha" name="newPassword" type="password" />
                <Control label="Repetir Nova Senha" name="repeatNewPassword" type="password" />
              </FormBuilder>
            </FormBuilder.Item>
            <FormBuilder.Item size={6} sx={{ order: { xs: 0, md: 1 } }}>
              <Paper sx={{ p: 2 }} variant="outlined">
                <Typography variant="button">Dicas de Senha</Typography>
              </Paper>
            </FormBuilder.Item>
            <FormBuilder.Item sx={{ textAlign: "right", order: 2 }}>
              <SubmitButton>Alterar Senha</SubmitButton>
            </FormBuilder.Item>
          </FormBuilder>
        </ValidatedForm>
      </Section>
    </Page>
  );
}
