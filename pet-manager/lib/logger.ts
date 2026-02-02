import { db } from "@/lib/db";

/**
 * Registra uma ação de auditoria no banco de dados.
 * Tratado para não interromper o fluxo principal da aplicação em caso de falha.
 */
export const createLog = async (
  userId: string, 
  action: string, 
  details?: string
) => {
  try {
    await db.auditLog.create({
      data: {
        userId,
        action,
        details,
      },
    });
  } catch (error) {
    console.error("Critical: Falha ao criar log de auditoria:", error);
  }
};