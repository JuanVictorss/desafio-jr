import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getPets } from "@/actions/get-pets";
import { createPet } from "@/actions/create-pet"; // <--- Importe a action da Task #15

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // Busca os pets (Task #16)
  const pets = await getPets();

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 gap-4">
      <Card className="w-[500px] shadow-xl">
        <CardHeader>
          <CardTitle>Dashboard: {session.user?.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          
          {/* --- ÁREA DE TESTE DA TASK #15 --- */}
          <div className="p-4 border-2 border-dashed border-yellow-400 rounded bg-yellow-50">
            <h3 className="font-bold text-yellow-800 mb-2">🧪 Área de Teste (Task #15)</h3>
            <p className="text-sm text-yellow-700 mb-4">
              Clique abaixo para criar um pet fixo e validar se o banco está salvando.
            </p>
            
<form
  action={async () => {
    "use server";
    console.log("--> TENTANDO CRIAR PET..."); // Log 1: Iniciou
    
    const resultado = await createPet({
      name: "Rex do Teste " + Math.floor(Math.random() * 100),
      type: "Cachorro",
      age: 3,
      breed: "Vira-lata",
    });

    console.log("--> RESULTADO:", resultado); // Log 2: Mostra erro ou sucesso
  }}
>
  <Button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700">
    Criar Pet de Teste (Mock)
  </Button>
</form>
          </div>
          {/* ---------------------------------- */}

          {/* --- LISTAGEM (TASK #16) --- */}
          <div className="border rounded p-4 bg-white">
            <h3 className="font-bold mb-2">Meus Pets ({pets.length})</h3>
            {pets.length === 0 ? (
              <p className="text-gray-500 text-sm">Nenhum pet encontrado.</p>
            ) : (
              <ul className="space-y-2">
                {pets.map((pet) => (
                  <li key={pet.id} className="p-2 bg-gray-50 rounded border flex justify-between">
                    <span>🐾 <strong>{pet.name}</strong> ({pet.type})</span>
                    <span className="text-xs text-gray-400 self-center">
                      {new Date(pet.createdAt).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <Button variant="destructive" className="w-full mt-4">
              Sair (Logout)
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}