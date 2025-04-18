"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "../../firebase"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"
import Image from "next/image" // Adicionado import do Image
import { Button } from "@/components/ui/button"
import { MapPin, Heart, Star, ChevronLeft, ChevronRight } from "lucide-react"
import UserAvatar from "@/components/UserAvatar"

interface UserData {
  nome?: string
  email?: string
  role?: string
  photoURL?: string
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid))
          if (userDoc.exists()) {
            setUserData(userDoc.data() as UserData)
          }
        } catch (error) {
          console.error("Error fetching user data:", error)
        }
      } else {
        setUserData(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Dados das categorias para mapeamento
  const categories = [
    { name: "Troca de óleo", icon: "/logo.png" },
    { name: "Avaliação do carro", icon: "/logo.png" },
    { name: "Aplicação de película", icon: "/logo.png" },
    { name: "Troca de filtros", icon: "/logo.png" },
    { name: "Alinhamento e balanceamento", icon: "/logo.png" },
    { name: "Troca de pastilhas", icon: "/logo.png" },
    { name: "Polimento e cristalização", icon: "/logo.png" },
    { name: "Instalação de acessórios", icon: "/logo.png" },
    { name: "Manutenção do ar-condicionado", icon: "/logo.png" },
    { name: "Higienização interna", icon: "/logo.png" }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {userData && (
        <div className="bg-background border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <UserAvatar size="sm" />
              <div>
                <h2 className="text-lg font-medium text-card-foreground">
                  Bem-vindo, {userData.nome || userData.email}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {userData.role === "admin" ? "Administrador" : "Usuário"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="border-b sticky top-[72px] bg-white z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center overflow-x-auto py-4 scrollbar-hide gap-8">
            {categories.map((category, index) => (
              <div key={index} className="flex flex-col items-center gap-2 min-w-[56px]">
                <Image 
                  src={category.icon} 
                  alt={category.name}
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
                <span className="text-xs text-center">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Exemplo de Listing Card */}
          <div className="space-y-2">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg"
                alt="Luxury villa"
                fill
                className="object-cover"
              />
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white hover:text-rose-500">
                <Heart className="h-5 w-5" />
              </Button>
              <div className="absolute bottom-0 left-0 right-0">
                <div className="flex justify-between p-2">
                  <Button size="sm" variant="ghost" className="bg-white/80 rounded-full h-7 w-7 p-0">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="bg-white/80 rounded-full h-7 w-7 p-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <h3 className="font-medium">Malibu, California</h3>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-1">4.98</span>
              </div>
            </div>
            <p className="text-gray-500">Beach view</p>
            <p className="text-gray-500">Nov 12-17</p>
            <p>
              <span className="font-medium">$350</span> night
            </p>
          </div>
        </div>

        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10">
          <Button className="rounded-full bg-gray-900 text-white px-4 py-3 shadow-lg">
            <span>Show map</span>
            <MapPin className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}