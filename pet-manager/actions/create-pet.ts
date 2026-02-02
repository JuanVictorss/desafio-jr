"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { PetSchema } from "@/schemas";
import { auth } from "@/auth"; 
import { createLog } from "@/lib/logger";
import { revalidatePath } from "next/cache";

export const createPet = async (values: z.infer<typeof PetSchema>) => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return { error: "Você precisa estar logado!" };
  }

  const validatedFields = PetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos!" };
  }

  const { name, type, breed, age } = validatedFields.data;

  try {
    const pet = await db.pet.create({
      data: {
        userId: session.user.id,
        name,
        type,
        breed,
        age,
      },
    });

    await createLog(
      session.user.id,
      "CREATE_PET",
      `Criou pet: ${pet.name} (ID: ${pet.id})`
    );

    revalidatePath("/dashboard");

    return { success: "Pet cadastrado com sucesso!" };
  } catch (error) {
    console.error("Erro ao criar pet:", error);
    return { error: "Erro interno ao cadastrar pet." };
  }
};