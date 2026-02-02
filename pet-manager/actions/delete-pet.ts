"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { createLog } from "@/lib/logger";
import { revalidatePath } from "next/cache";

export const deletePet = async (petId: string) => {
  // 1. Verifica Sessão
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return { error: "Você precisa estar logado!" };
  }

  // 2. Verifica Dono
  const existingPet = await db.pet.findUnique({
    where: { id: petId },
  });

  if (!existingPet) {
    return { error: "Pet não encontrado." };
  }

  if (existingPet.userId !== session.user.id) {
    return { error: "Proibido: Você não é o dono deste pet." };
  }

  try {
    // 3. Soft Delete 
    await db.pet.update({
      where: { id: petId },
      data: {
        isActive: false,
      },
    });

    // 4. Auditoria
    await createLog(
      session.user.id,
      "DELETE_PET",
      `Desativou pet ID: ${petId} (${existingPet.name})`
    );

    // 5. Atualiza a tela
    revalidatePath("/dashboard");

    return { success: "Pet removido com sucesso!" };
  } catch (error) {
    console.error("Erro ao deletar pet:", error);
    return { error: "Erro interno ao remover pet." };
  }
};