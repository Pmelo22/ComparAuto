'use client'

import { useRouter } from 'next/navigation'
import { useForm } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db, auth } from '@/firebase'
import { useState } from 'react'
import Link from 'next/link'

// Schema de validação completo
const formSchema = z.object({
  nome: z.string()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres" })
    .max(100, { message: "Nome não pode exceder 100 caracteres" }),
  cnpj: z.string()
    .min(14, { message: "CNPJ deve ter 14 dígitos" })
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, { 
      message: "Formato inválido (use XX.XXX.XXX/XXXX-XX)" 
    }),
  endereco: z.string()
    .min(5, { message: "Endereço deve ter pelo menos 5 caracteres" })
    .max(200, { message: "Endereço não pode exceder 200 caracteres" }),
  telefone: z.string()
    .min(11, { message: "Telefone deve ter 11 dígitos" })
    .regex(/^\(\d{2}\) \d{5}\-\d{4}$/, {
      message: "Formato inválido (use (XX) XXXXX-XXXX)"
    }),
  email: z.string()
    .email({ message: "Email inválido" })
    .max(100, { message: "Email não pode exceder 100 caracteres" }),
  descricao: z.string()
    .min(10, { message: "Descrição deve ter pelo menos 10 caracteres" })
    .max(500, { message: "Descrição não pode exceder 500 caracteres" }),
  horarioFuncionamento: z.string()
    .min(5, { message: "Horário inválido" })
    .max(50, { message: "Horário não pode exceder 50 caracteres" }),
})

export default function CadastroOficina() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Inicialização CORRETA do form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      cnpj: "",
      endereco: "",
      telefone: "",
      email: "",
      descricao: "",
      horarioFuncionamento: ""
    }
  })

  // Formatadores
  const formatCNPJ = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 18)
  }

  const formatTelefone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15)
  }

  // Submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true)
      
      const user = auth.currentUser
      if (!user) {
        toast.error("Você precisa estar logado para cadastrar uma oficina")
        return router.push("/login?from=/cadastro-oficina")
      }

      const oficinaData = {
        ...values,
        userId: user.uid,
        createdAt: serverTimestamp(),
        status: "pendente",
        ultimaAtualizacao: serverTimestamp()
      }

      await setDoc(doc(db, "oficinas", user.uid), oficinaData)

      toast.success("Oficina cadastrada com sucesso! Aguarde aprovação.")
      router.push("/dashboard")
    } catch (error) {
      console.error("Erro ao cadastrar oficina:", error)
      toast.error(
        error instanceof Error 
          ? error.message 
          : "Erro ao cadastrar. Tente novamente."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-rose-600">
                Cadastre sua Oficina
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Faça parte da nossa rede e aumente sua visibilidade
              </p>
            </div>

            {/* Formulário com form passado corretamente */}
            <Form form={form} onSubmit={onSubmit}>
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome da Oficina *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Oficina Mecânica Exemplo" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cnpj"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CNPJ *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="XX.XXX.XXX/XXXX-XX" 
                            {...field}
                            onChange={(e) => {
                              field.onChange(formatCNPJ(e.target.value))
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endereco"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Endereço Completo *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Rua Exemplo, 123 - Bairro - Cidade/UF" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="telefone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="(XX) XXXXX-XXXX" 
                            {...field}
                            onChange={(e) => {
                              field.onChange(formatTelefone(e.target.value))
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email para Contato *</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="contato@oficina.com" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="horarioFuncionamento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Horário de Funcionamento *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Seg-Sex: 8h-18h, Sáb: 8h-12h" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="descricao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição da Oficina *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Descreva os serviços oferecidos, especialidades, tempo no mercado, etc."
                          rows={5}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-rose-600 hover:bg-rose-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processando...
                      </span>
                    ) : (
                      "Cadastrar Oficina"
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={() => router.back()}
                  >
                    Voltar
                  </Button>
                </div>

                <p className="text-sm text-gray-500 text-center">
                  Já possui cadastro? {' '}
                  <Link href="/login" className="font-medium text-rose-600 hover:text-rose-500">
                    Faça login aqui
                  </Link>
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}