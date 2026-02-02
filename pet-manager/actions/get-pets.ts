"use server";

import { db } from "@/lib/db";

// Função auxiliar para remover acentos e deixar minúsculo
const normalizeString = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

export const getPets = async (query?: string) => {
  try {
    const pets = await db.pet.findMany({
      where: {
        isActive: true,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!query) {
      return pets;
    }

    const termoLimpo = normalizeString(query);

    return pets.filter((pet) => {
      const nomePetLimpo = normalizeString(pet.name);
      const nomeDonoLimpo = normalizeString(pet.user?.name || "");

      return (
        nomePetLimpo.includes(termoLimpo) || 
        nomeDonoLimpo.includes(termoLimpo)
      );
    });

  } catch (error) {
    console.error("Erro ao buscar pets:", error);
    return [];
  }
};