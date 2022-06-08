import * as Yup from "yup";

Yup.setLocale({
  mixed: {
    required: "Campo obrigatório",
  },
  string: {
    email: "Email inválido",
  },
  number: {
    positive: "O número deve ser positivo",
    integer: "O número deve ser inteiro",
  },
});

export * as Yup from "yup";
