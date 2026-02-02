"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { PetSchema } from "@/schemas";
import { auth } from "@/auth";
import { createLog } from "@/lib/logger";
import { revalidatePath } from "next/cache";

export const updatePet = async (
  petId: string, 
  values: z.infer<typeof PetSchema>
) => {
  // 1. Verifica Sessão
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return { error: "Você precisa estar logado!" };
  }

  // 2. Valida Dados recebidos
  const validatedFields = PetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Dados inválidos!" };
  }

  const { name, type, breed, age } = validatedFields.data;

  // 3. BUSCA O PET PARA VERIFICAR O DONO (Segurança)
  const existingPet = await db.pet.findUnique({
    where: { id: petId },
  });

  if (!existingPet) {
    return { error: "Pet não encontrado." };
  }

  // Se o dono do pet for diferente do usuário logado: BLOQUEIA
  if (existingPet.userId !== session.user.id) {
    return { error: "Proibido: Você não é o dono deste pet." };
  }

  try {
    // 4. Atualizar no Banco
    await db.pet.update({
      where: { id: petId },
      data: { name, type, breed, age },
    });

    // 5. Auditoria
    await createLog(
      session.user.id,
      "UPDATE_PET",
      `Atualizou o pet ${existingPet.name} para ${name}`
    );

    // 6. Atualizar a tela
    revalidatePath("/dashboard");

    return { success: "Pet atualizado com sucesso!" };
  } catch (error) {
    return { error: "Erro ao atualizar pet." };
  }
};