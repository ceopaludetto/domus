import type { ActionFunction } from "@remix-run/node";

import { Box, Button, IconButton } from "@mui/material";
import { json } from "@remix-run/node";
import { MapPin, X } from "lucide-react";
import { ValidatedForm, validationError } from "remix-validated-form";
import invariant from "tiny-invariant";

import { FormDrawer, Control, FormBuilder, FormHeader, Section, SubmitButton, Tooltip } from "~/components";
import { createPlace } from "~/models";
import { useFormDrawerController } from "~/utils/hooks";
import { PlaceValidator } from "~/utils/validation";

export const action: ActionFunction = async ({ request, params }) => {
  const { data, error } = await PlaceValidator.validate(await request.formData());
  if (error) throw validationError(error);

  const condominiumID = params.condominium;
  invariant(condominiumID, "Condominium must be setted");

  const res = await createPlace({ data, params, request });
  if (res.error) throw validationError(res.error);

  return json(res.data);
};

export default function DashboardPlacesCreate() {
  const drawer = useFormDrawerController();

  return (
    <FormDrawer {...drawer}>
      <Box sx={{ width: 500 }}>
        <ValidatedForm method="post" validator={PlaceValidator}>
          <FormBuilder>
            <FormHeader
              description="Locais e Eventos"
              icon={MapPin}
              title="Adicionar Local"
              useSemanticTags={false}
              trailing={
                <Tooltip describeChild title="Fechar">
                  <IconButton onClick={drawer.handleClose}>
                    <X />
                  </IconButton>
                </Tooltip>
              }
            />
            <Section description="Preencha as características que definem o local." title="Informações Sobre o Local">
              <FormBuilder>
                <Control label="Nome do Local" name="name" />
                <Control label="Capacidade do Local" name="capacity" type="number" />
              </FormBuilder>
            </Section>
            <Section description="Adicione fotos que mostram o que o local tem à oferecer." title="Fotos do Local">
              photo picker
            </Section>
            <SubmitButton fullWidth size="large">
              Adicionar
            </SubmitButton>
            <Button fullWidth onClick={drawer.handleClose} size="large" variant="outlined">
              Voltar
            </Button>
          </FormBuilder>
        </ValidatedForm>
      </Box>
    </FormDrawer>
  );
}
