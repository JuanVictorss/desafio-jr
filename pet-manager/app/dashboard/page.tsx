import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 gap-4">
      <Card className="w-[400px] shadow-xl">
        <CardHeader>
          <CardTitle>Bem-vindo, {session.user?.name}!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Email: <span className="font-bold">{session.user?.email}</span>
          </p>
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