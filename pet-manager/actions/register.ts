"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos!" };
  }

  const { email, password, name, mobile, document } = validatedFields.data;

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Este email já está em uso!" };
  }

  const hashedPassword = await bcrypt.hash(password, 14);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      mobile,
      document
    },
  });

  return { success: "Conta criada com sucesso!" };
};