import type { ActionFunction, LoaderFunction } from "@remix-run/node";

import { Typography, Link as MuiLink, Box, Button } from "@mui/material";
import { json } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Building2, Lock, User } from "lucide-react";
import { useMemo } from "react";
import { ValidatedForm, validationError } from "remix-validated-form";

import { Control, FormBuilder, FormHeader, Stepper, SubmitButton } from "~/components";
import { createUser } from "~/models";
import { useStepperForm } from "~/utils/hooks";
import { createUserSession, dontRequireUser } from "~/utils/session.server";
import { SignupValidator } from "~/utils/validation";

export const loader: LoaderFunction = async ({ request }) => {
  await dontRequireUser(request);
  return json({});
};

export const action: ActionFunction = async ({ request }) => {
  const { data, error } = await SignupValidator.validate(await request.formData());
  if (error) return validationError(error);

  const res = await createUser(data);
  if (res.error) return validationError(res.error);

  return createUserSession(request, res.data.id);
};

export default function AuthenticationSignup() {
  const [step, { prev, onSubmit, ref }] = useStepperForm({
    fields: [["firstName", "lastName", "email"], ["password", "repeatPassword"], ["condominiumName"]],
    formID: "signupForm",
  });

  const { icon, description } = useMemo(() => {
    if (step === 0) return { icon: User, description: "Informações Pessoais" };
    if (step === 1) return { icon: Lock, description: "Senha" };
    return { icon: Building2, description: "Informações do Condomínio" };
  }, [step]);

  return (
    <Box sx={{ width: "100%", maxWidth: 500 }}>
      <ValidatedForm formRef={ref} onSubmit={onSubmit} id="signupForm" validator={SignupValidator} method="post">
        <input type="hidden" name="step" value={step} />
        <FormBuilder>
          <FormBuilder.Item>
            <FormHeader
              title="Bem Vindo!"
              description={description}
              icon={icon}
              trailing={<Stepper max={3} step={step} />}
            />
          </FormBuilder.Item>
          <FormBuilder.Item sx={{ display: step === 0 ? "block" : "none" }}>
            <FormBuilder>
              <FormBuilder.Item size={6}>
                <Control label="Nome" name="firstName" />
              </FormBuilder.Item>
              <FormBuilder.Item size={6}>
                <Control label="Sobrenome" name="lastName" />
              </FormBuilder.Item>
              <Control label="Email" name="email" />
              <SubmitButton size="large" fullWidth>
                Próximo
              </SubmitButton>
            </FormBuilder>
          </FormBuilder.Item>
          <FormBuilder.Item sx={{ display: step === 1 ? "block" : "none" }}>
            <FormBuilder>
              <Control label="Senha" name="password" type="password" />
              <Control label="Repetir Senha" name="repeatPassword" type="password" />
              <FormBuilder.Item size={6}>
                <Button onClick={prev} size="large" fullWidth variant="outlined">
                  Anterior
                </Button>
              </FormBuilder.Item>
              <FormBuilder.Item size={6}>
                <SubmitButton size="large" fullWidth>
                  Próximo
                </SubmitButton>
              </FormBuilder.Item>
            </FormBuilder>
          </FormBuilder.Item>
          <FormBuilder.Item sx={{ display: step === 2 ? "block" : "none" }}>
            <FormBuilder>
              <Control label="Nome do Condomínio" name="condominiumName" />
              <FormBuilder.Item size={6}>
                <Button onClick={prev} size="large" fullWidth variant="outlined">
                  Anterior
                </Button>
              </FormBuilder.Item>
              <FormBuilder.Item size={6}>
                <SubmitButton size="large" fullWidth>
                  Cadastrar
                </SubmitButton>
              </FormBuilder.Item>
            </FormBuilder>
          </FormBuilder.Item>
          <FormBuilder.Item sx={{ textAlign: "center" }}>
            <Typography>
              Já possui conta?{" "}
              <MuiLink component={Link} to="/authentication/signin">
                Entrar
              </MuiLink>
              .
            </Typography>
          </FormBuilder.Item>
        </FormBuilder>
      </ValidatedForm>
    </Box>
  );
}
