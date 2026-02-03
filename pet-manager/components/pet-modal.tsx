"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { PetSchema } from "@/schemas";
import { createPet } from "@/actions/create-pet";
import { updatePet } from "@/actions/update-pet";
import { Pet } from "@prisma/client";
// 👇 Importação do Toast
import { toast } from "sonner"; 

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface PetModalProps {
  children?: React.ReactNode;
  pet?: Pet; 
}

export const PetModal = ({ children, pet }: PetModalProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(PetSchema),
    defaultValues: {
      name: pet?.name || "",
      age: pet?.age || undefined,
      type: (pet?.type as "Cachorro" | "Gato") || "Cachorro",
      breed: pet?.breed || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof PetSchema>) => {
    setIsPending(true);

    try {
      let response;

      if (pet) {
        response = await updatePet(pet.id, values);
      } else {
        response = await createPet(values);
      }

      if (response.error) {
        // ❌ Erro visual
        toast.error(response.error);
      } else {
        // ✅ Sucesso visual
        toast.success(pet ? "Pet atualizado com sucesso!" : "Pet cadastrado com sucesso!");
        setOpen(false); 
        if (!pet) reset(); 
      }
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro inesperado.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{pet ? "Editar Pet" : "Novo Pet"}</DialogTitle>
          <DialogDescription>
            {pet
              ? "Faça alterações nos dados do animal abaixo."
              : "Preencha os dados para cadastrar um novo animal."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          
          {/* Campo NOME */}
          <div className="grid gap-2">
            <Label htmlFor="name">Nome do Pet</Label>
            <Input
              id="name"
              placeholder="Ex: Rex"
              {...register("name")}
              disabled={isPending}
            />
            {errors.name && (
              <span className="text-red-500 text-xs">{errors.name.message}</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Campo IDADE */}
            <div className="grid gap-2">
              <Label htmlFor="age">Idade (anos)</Label>
              <Input
                id="age"
                type="number"
                placeholder="Ex: 3"
                {...register("age", { valueAsNumber: true })}
                disabled={isPending}
              />
              {errors.age && (
                <span className="text-red-500 text-xs">{errors.age.message}</span>
              )}
            </div>

            {/* Campo TIPO */}
            <div className="grid gap-2">
              <Label htmlFor="type">Tipo</Label>
              <Select
                disabled={isPending}
                onValueChange={(val) =>
                  setValue("type", val as "Cachorro" | "Gato")
                }
                defaultValue={pet?.type || "Cachorro"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cachorro">Cachorro</SelectItem>
                  <SelectItem value="Gato">Gato</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Campo RAÇA */}
          <div className="grid gap-2">
            <Label htmlFor="breed">Raça (Opcional)</Label>
            <Input
              id="breed"
              placeholder="Ex: Vira-lata"
              {...register("breed")}
              disabled={isPending}
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full bg-brand-purple hover:bg-brand-dark" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {pet ? "Salvar Alterações" : "Cadastrar Pet"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};