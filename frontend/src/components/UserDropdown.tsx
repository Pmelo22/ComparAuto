"use client"

import { auth } from "../../firebase"
import { ChevronDown, MessageSquare, Heart, User, HelpCircle, LogOut } from "lucide-react"
import { useState, useEffect } from "react" // Adicione useEffect
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image" // Importe o Image do Next

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null) // Estado para o usuário
  const router = useRouter()

  // Adicione este useEffect para monitorar mudanças de autenticação
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })
    return () => unsubscribe()
  }, [])

  const handleSignOut = async () => {
    try {
      await auth.signOut()
      router.push("/login")
    } catch (error) {
      console.error("Erro ao sair:", error)
    }
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 border rounded-full p-1 shadow-sm cursor-pointer hover:shadow-md transition-all"
      >
        {/* Avatar do usuário */}
        <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
          {user?.photoURL ? (
            <Image
              src={user.photoURL}
              alt="User photo"
              width={32}
              height={32}
              className="object-cover"
              unoptimized // Remove se configurou domínios no next.config.js
            />
          ) : (
            <span className="font-medium text-gray-600 text-sm">
              {user?.email?.charAt(0).toUpperCase() || '?'}
            </span>
          )}
        </div>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-50 border">
          <div className="p-4 border-b">
            <p className="font-medium truncate">{user?.displayName || "Usuário"}</p>
            <p className="text-sm text-gray-500 truncate">{user?.email}</p>
          </div>
          
          <div className="py-1">
            <DropdownItem href="/mensagens" icon={<MessageSquare size={16} />}>
              Mensagens
            </DropdownItem>
            <DropdownItem href="/favoritos" icon={<Heart size={16} />}>
              Favoritos
            </DropdownItem>
            <DropdownItem href="/conta" icon={<User size={16} />}>
              Conta
            </DropdownItem>
            <DropdownItem href="/ajuda" icon={<HelpCircle size={16} />}>
              Central de Ajuda
            </DropdownItem>
          </div>
          
          <div className="py-1 border-t">
            <button 
              onClick={handleSignOut}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <LogOut size={16} className="mr-2" />
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function DropdownItem({ 
  href, 
  icon, 
  children 
}: { 
  href: string
  icon: React.ReactNode
  children: React.ReactNode 
}) {
  return (
    <Link
      href={href}
      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      onClick={(e) => e.stopPropagation()}
    >
      <span className="mr-2">{icon}</span>
      {children}
    </Link>
  )
}