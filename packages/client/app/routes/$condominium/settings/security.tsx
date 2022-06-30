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
    <Page isSubPage subtitle="Ajustes" title="Segurança">
      <Section description="Altere sua senha para algo de fácil memorização." title="Senha">
        <ValidatedForm validator={PasswordValidator}>
          <FormBuilder>
            <FormBuilder.Item size={6} sx={{ order: { md: 0, xs: 1 } }}>
              <FormBuilder>
                <Control label="Senha Atual" name="currentPassword" type="password" />
                <Control label="Nova Senha" name="newPassword" type="password" />
                <Control label="Repetir Nova Senha" name="repeatNewPassword" type="password" />
              </FormBuilder>
            </FormBuilder.Item>
            <FormBuilder.Item size={6} sx={{ order: { md: 1, xs: 0 } }}>
              <Paper sx={{ p: 2 }} variant="outlined">
                <Typography variant="button">Dicas de Senha</Typography>
              </Paper>
            </FormBuilder.Item>
            <FormBuilder.Item sx={{ order: 2, textAlign: "right" }}>
              <SubmitButton>Alterar Senha</SubmitButton>
            </FormBuilder.Item>
          </FormBuilder>
        </ValidatedForm>
      </Section>
    </Page>
  );
}
