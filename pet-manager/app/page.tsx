import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  // Se tiver logado, manda pro Dashboard
  if (session) {
    redirect("/dashboard");
  }

  // Se não, manda pro Login
  redirect("/login");
}