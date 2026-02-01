import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Home() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-50 p-4">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Teste Shadcn UI</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <Button className="w-full">Entrar</Button>
        </CardContent>
      </Card>
    </div>
  )
}