import * as Yup from "yup";

Yup.setLocale({
  mixed: {
    required: "Campo obrigatório",
  },
  number: {
    integer: "O número deve ser inteiro",
    positive: "O número deve ser positivo",
  },
  string: {
    email: "Email inválido",
  },
});

export * as Yup from "yup";
