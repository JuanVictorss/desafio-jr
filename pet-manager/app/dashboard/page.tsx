import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getPets } from "@/actions/get-pets";
import { PetCard } from "@/components/pet-card";
import { PetModal } from "@/components/pet-modal";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // Busca os pets do banco (pode passar string de busca se quiser testar depois)
  const pets = await getPets(); 

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* 1. TOPO (HEADER) */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-purple rounded-lg flex items-center justify-center text-white font-bold">
              IO
            </div>
            <h1 className="text-xl font-bold text-gray-800">
              Dashboard <span className="text-gray-400 font-normal">| {session.user?.name}</span>
            </h1>
          </div>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
              Sair
            </Button>
          </form>
        </div>
      </header>

      {/* 2. CONTEÚDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-brand-dark">Meus Pets</h2>
            <p className="text-gray-500 text-sm">Gerencie os animais cadastrados no sistema.</p>
          </div>
          
          {/* Botão de Adicionar COM O MODAL */}
          <PetModal>
            <Button className="bg-brand-green text-brand-dark hover:bg-lime-400 font-bold shadow-sm">
              + Novo Pet
            </Button>
          </PetModal>
        </div>

        {/* 3. GRID DE CARDS */}
        {pets.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 text-lg">Nenhum pet encontrado.</p>
            <p className="text-sm text-gray-400">Clique em "+ Novo Pet" para começar.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <PetCard 
                key={pet.id} 
                pet={pet} 
                currentUserId={session.user.id} 
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}