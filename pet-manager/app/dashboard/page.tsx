import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getPets } from "@/actions/get-pets";
import { PetCard } from "@/components/pet-card";
import { PetModal } from "@/components/pet-modal";
import { SearchBar } from "@/components/search-bar"; // <--- Importe aqui

// 1. Defina a tipagem das props da página
interface DashboardProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function DashboardPage(props: DashboardProps) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // 2. Aguarde o searchParams (específico do Next.js 15)
  const searchParams = await props.searchParams;
  const query = searchParams.q || "";

  // 3. Passe a query para a função do banco
  const pets = await getPets(query);

  return (
    <div className="min-h-screen bg-gray-50">
      
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-purple rounded-lg flex items-center justify-center text-white font-bold">
              IO
            </div>
            <h1 className="text-xl font-bold text-gray-800 hidden md:block">
              Dashboard
            </h1>
          </div>

          {/* 4. Barra de Pesquisa no Header */}
          <div className="flex-1 max-w-md mx-4">
            <SearchBar />
          </div>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50 text-sm">
              Sair
            </Button>
          </form>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-brand-dark">
              {query ? `Resultados para "${query}"` : "Meus Pets"}
            </h2>
            <p className="text-gray-500 text-sm">
              {query ? "Filtro aplicado na listagem." : "Gerencie os animais cadastrados no sistema."}
            </p>
          </div>
          
          <PetModal>
            <Button className="bg-brand-green text-brand-dark hover:bg-lime-400 font-bold shadow-sm">
              + Novo Pet
            </Button>
          </PetModal>
        </div>

        {pets.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 text-lg">
              {query ? `Nenhum pet encontrado com "${query}".` : "Nenhum pet cadastrado."}
            </p>
            {query && (
              <p className="text-sm text-gray-400 mt-2">Tente buscar por outro nome.</p>
            )}
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