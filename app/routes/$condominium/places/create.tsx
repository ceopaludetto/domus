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

  const res = await createPlace(data, condominiumID);
  if (res.error) throw validationError(res.error);

  return json(res.data);
};

export default function DashboardPlacesCreate() {
  const { open, handleClose, handleTransitionEnd } = useFormDrawerController();

  return (
    <FormDrawer open={open} handleClose={handleClose} handleTransitionEnd={handleTransitionEnd}>
      <Box sx={{ width: 500 }}>
        <ValidatedForm validator={PlaceValidator} method="post">
          <FormBuilder>
            <FormHeader
              title="Adicionar Local"
              description="Locais e Eventos"
              icon={MapPin}
              useSemanticTags={false}
              trailing={
                <Tooltip describeChild title="Fechar">
                  <IconButton onClick={handleClose}>
                    <X />
                  </IconButton>
                </Tooltip>
              }
            />
            <Section title="Informações Sobre o Local" description="Preencha as características que definem o local.">
              <FormBuilder>
                <Control label="Nome do Local" name="name" />
                <Control label="Capacidade do Local" name="capacity" type="number" />
              </FormBuilder>
            </Section>
            <Section title="Fotos do Local" description="Adicione fotos que mostram o que o local tem à oferecer.">
              photo picker
            </Section>
            <SubmitButton size="large" fullWidth>
              Adicionar
            </SubmitButton>
            <Button variant="outlined" size="large" fullWidth onClick={handleClose}>
              Voltar
            </Button>
          </FormBuilder>
        </ValidatedForm>
      </Box>
    </FormDrawer>
  );
}
