"use client";

import { useState } from "react";
import { deletePet } from "@/actions/delete-pet";
import { Loader2 } from "lucide-react";
// 👇 Importação do Toast
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface DeletePetDialogProps {
  petId: string;
  petName: string;
  children: React.ReactNode;
}

export const DeletePetDialog = ({ petId, petName, children }: DeletePetDialogProps) => {
  const [isPending, setIsPending] = useState(false);

  const onDelete = async () => {
    setIsPending(true);
    try {
      const result = await deletePet(petId);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`O pet ${petName} foi removido com sucesso.`);
      }

    } catch (error) {
      console.error(error);
      toast.error("Erro ao deletar pet.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação irá remover o pet <strong>{petName}</strong> da sua listagem.
            O histórico será arquivado.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          
          <AlertDialogAction 
            onClick={(e) => {
              e.preventDefault(); 
              onDelete();
            }}
            className="bg-red-600 hover:bg-red-700 text-white"
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sim, remover
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};