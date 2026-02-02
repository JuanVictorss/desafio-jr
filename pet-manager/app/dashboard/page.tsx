import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getPets } from "@/actions/get-pets"; // <--- Importamos a action da Task #16

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // --- INÍCIO: TESTE DA TASK #16 ---
  const pets = await getPets();
  console.log("=== DEBUG: LISTA DE PETS ===");
  console.log(pets); // Vai aparecer no terminal do VS Code
  // -------------------------------------

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 gap-4">
      <Card className="w-[400px] shadow-xl">
        <CardHeader>
          <CardTitle>Bem-vindo, {session.user?.name}!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-2">
            Email: <span className="font-bold">{session.user?.email}</span>
          </p>
          
          {/* Feedback visual do teste */}
          <div className="mb-4 p-2 bg-blue-50 rounded text-sm text-blue-700">
             <strong>Status do Sistema:</strong><br/>
             Pets encontrados no banco: {pets.length}
          </div>

          <p className="text-sm text-gray-500">
            Se você está vendo isso, o login funcionou.
          </p>
          
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
            className="mt-6"
          >
            <Button variant="destructive" className="w-full">
              Sair do Sistema (Logout)
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}