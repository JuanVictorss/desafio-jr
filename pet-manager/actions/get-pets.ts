"use server";

import { db } from "@/lib/db";

export const getPets = async () => {
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

    return pets;
  } catch (error) {
    console.error("Erro ao buscar pets:", error);
    return [];
  }
};