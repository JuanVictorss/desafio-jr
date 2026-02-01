import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email é obrigatório e deve ser válido",
  }),
  password: z.string().min(1, {
    message: "Senha é obrigatória",
  }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "O nome é obrigatório",
  }),
  email: z.string().email({
    message: "Email inválido",
  }),
  password: z.string().min(8, {
    message: "A senha deve ter no mínimo 8 caracteres",
  }),
  mobile: z.string().optional(),
  document: z.string().optional(),
});


export const PetSchema = z.object({
  name: z.string().min(1, {
    message: "O nome do pet é obrigatório",
  }),
  age: z.coerce.number().optional(), 
  type: z.string().min(1, {
    message: "O tipo (espécie) é obrigatório",
  }),
  breed: z.string().optional(),
  
});