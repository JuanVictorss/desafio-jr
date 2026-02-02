"use client";

import { Pet, User } from "@prisma/client";
import { 
  Dog, 
  Cat, 
  User as UserIcon, 
  Trash2, 
  Pencil
} from "lucide-react";
import { Button } from "./ui/button";
import { PetModal } from "./pet-modal";
// 👇 IMPORTAÇÃO NOVA
import { DeletePetDialog } from "./delete-pet-dialog";

interface PetWithUser extends Pet {
  user: User;
}

interface PetCardProps {
  pet: PetWithUser;
  currentUserId?: string;
  // onDelete e onEdit não são mais necessários via props
}

export const PetCard = ({ pet, currentUserId }: PetCardProps) => {
  const isOwner = currentUserId === pet.userId;

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
      
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-purple" />

      <div className="p-5 pl-7">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-brand-light rounded-full text-brand-purple">
              {pet.type === "Cachorro" ? <Dog size={24} /> : <Cat size={24} />}
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg leading-tight">
                {pet.name}
              </h3>
              <span className="text-xs text-brand-purple font-medium bg-purple-50 px-2 py-0.5 rounded-full inline-block mt-1">
                {pet.breed || "Sem raça"}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-gray-600">
              {pet.age} {pet.age === 1 ? "ano" : "anos"}
            </span>
          </div>
        </div>

        <div className="my-4 border-t border-gray-100" />

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <UserIcon size={14} />
          <span>Dono: <span className="font-semibold text-gray-700">{pet.user.name}</span></span>
        </div>

        {isOwner && (
          <div className="flex gap-2 mt-2 pt-2">
            
            <PetModal pet={pet}>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 text-blue-600 border-blue-100 hover:bg-blue-50"
              >
                <Pencil size={14} className="mr-2" />
                Editar
              </Button>
            </PetModal>

            {/* 👇 AQUI ESTÁ A INTEGRAÇÃO DA EXCLUSÃO */}
            <DeletePetDialog petId={pet.id} petName={pet.name}>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 text-red-600 border-red-100 hover:bg-red-50"
              >
                <Trash2 size={14} className="mr-2" />
                Excluir
              </Button>
            </DeletePetDialog>

          </div>
        )}
      </div>
    </div>
  );
};