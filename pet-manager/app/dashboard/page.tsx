import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getPets } from "@/actions/get-pets";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const termoDeBusca = "rex";
  const pets = await getPets(termoDeBusca);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 gap-4">
      <Card className="w-[500px] shadow-xl">
        <CardHeader>
          <CardTitle>Dashboard: {session.user?.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          
          {/* Aviso visual do Teste */}
          <div className="bg-blue-50 p-3 rounded border border-blue-200 text-blue-800 text-sm">
            🔍 <strong>Teste de Busca (Task #19):</strong><br/>
            Filtrando resultados por: <span className="font-bold">"{termoDeBusca}"</span>
          </div>

          {/* LISTAGEM DE RESULTADOS */}
          <div className="border rounded p-4 bg-white">
            <h3 className="font-bold mb-2">Resultados ({pets.length})</h3>
            
            {pets.length === 0 ? (
              <p className="text-gray-500 text-sm">
                Nenhum pet encontrado com "{termoDeBusca}".
              </p>
            ) : (
              <ul className="space-y-2">
                {pets.map((pet) => (
                  <li key={pet.id} className="p-2 bg-gray-50 rounded border flex justify-between items-center">
                    <div>
                        <span>🐾 <strong>{pet.name}</strong></span>
                        <span className="text-xs text-gray-500 block">Dono: {pet.user?.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">
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