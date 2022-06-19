import type { ActionFunction, LoaderFunction } from "@remix-run/node";

import { Typography, Link as MuiLink, Box } from "@mui/material";
import { json } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { User } from "lucide-react";
import { ValidatedForm, validationError } from "remix-validated-form";

import { Control, FormBuilder, FormHeader, SubmitButton } from "~/components";
import { checkLogin } from "~/models";
import { createUserSession, dontRequireUser } from "~/utils/session.server";
import { SigninValidator } from "~/utils/validation";

export const loader: LoaderFunction = async ({ request }) => {
  await dontRequireUser(request);
  return json({});
};

export const action: ActionFunction = async ({ request }) => {
  const { data, error } = await SigninValidator.validate(await request.formData());
  if (error) return validationError(error);

  const res = await checkLogin({ request, data });
  if (res.error) return validationError(res.error);

  return createUserSession(request, res.data.user.id, res.data.token);
};

export default function AuthenticationSignin() {
  return (
    <Box sx={{ width: "100%", maxWidth: 500 }}>
      <ValidatedForm validator={SigninValidator} method="post">
        <FormBuilder>
          <FormHeader title="Bem Vindo de Volta!" description="Efetuar Login" icon={User} />
          <Control label="Email" name="email" />
          <Control label="Senha" name="password" type="password" />
          <SubmitButton size="large" fullWidth>
            Entrar
          </SubmitButton>
          <FormBuilder.Item sx={{ textAlign: "center" }}>
            <Typography>
              Ainda não possui conta?{" "}
              <MuiLink component={Link} to="/authentication/signup">
                Criar
              </MuiLink>
              .
            </Typography>
          </FormBuilder.Item>
        </FormBuilder>
      </ValidatedForm>
    </Box>
  );
}
