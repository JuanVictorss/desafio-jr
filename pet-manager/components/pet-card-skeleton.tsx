import { Skeleton } from "@/components/ui/skeleton";

export const PetCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-5 pl-7 border border-gray-100 shadow-sm relative overflow-hidden">
      {/* Faixa lateral simulada */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gray-200" />

      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          {/* Ícone */}
          <Skeleton className="h-12 w-12 rounded-full" />
          <div>
            {/* Nome */}
            <Skeleton className="h-6 w-24 mb-2" />
            {/* Raça */}
            <Skeleton className="h-4 w-16 rounded-full" />
          </div>
        </div>
        {/* Idade */}
        <Skeleton className="h-5 w-10" />
      </div>

      <div className="my-4 border-t border-gray-100" />

      {/* Dono */}
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Botões */}
      <div className="flex gap-2 mt-2 pt-2">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 flex-1" />
      </div>
    </div>
  );
};