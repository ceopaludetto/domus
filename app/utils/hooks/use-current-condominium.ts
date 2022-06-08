import { useParams } from "@remix-run/react";
import invariant from "tiny-invariant";

export function useCurrentCondominium() {
  const { condominium } = useParams();
  invariant(condominium, "Condominium should be setted");

  return condominium;
}
