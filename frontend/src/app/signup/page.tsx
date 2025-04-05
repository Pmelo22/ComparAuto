"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "@/firebase";  // Usando o alias @/
import { Eye, EyeOff, AlertCircle } from "lucide-react"
import "./signup.css"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
    confirmSenha: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateFields = () => {
    if (formData.nome.trim().length < 3) {
      setError("Digite um nome válido com pelo menos 3 caracteres.")
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Digite um email válido.")
      return false
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.")
      return false
    }

    if (formData.password !== formData.confirmSenha) {
      setError("As senhas não coincidem.")
      return false
    }

    return true
  }

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!validateFields()) return

    try {
      setLoading(true)
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      const user = userCredential.user

      await sendEmailVerification(user)

      await setDoc(doc(db, "users", user.uid), {
        nome: formData.nome,
        email: formData.email,
        role: "user",
        createdAt: serverTimestamp(),
      })

      setSuccess("Conta criada com sucesso! Verifique seu email.")
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (err: any) {
      console.error(err)
      if (err.code === "auth/email-already-in-use") {
        setError("Este email já está em uso. Tente outro ou faça login.")
      } else {
        setError("Erro ao criar conta. Tente novamente.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    try {
      setLoading(true)
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Verificar se o usuário já existe no Firestore
      await setDoc(
        doc(db, "users", user.uid),
        {
          nome: user.displayName,
          email: user.email,
          role: "user",
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      )

      router.push("/")
    } catch (err) {
      console.error(err)
      setError("Erro ao entrar com Google. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Criar Conta</h1>
          <p className="auth-subtitle">Preencha os campos abaixo para criar sua conta</p>
        </div>

        {error && (
          <div className="auth-alert error">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="auth-alert success">
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSignup} className="auth-form">
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              name="nome"
              type="text"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Digite seu nome completo"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <div className="password-input">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínimo de 6 caracteres"
                required
              />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <small className="password-tip">Mínimo de 6 caracteres.</small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmSenha">Confirme sua senha</label>
            <div className="password-input">
              <input
                id="confirmSenha"
                name="confirmSenha"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmSenha}
                onChange={handleChange}
                placeholder="Digite a senha novamente"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="checkbox-container">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              Eu concordo com os{" "}
              <Link href="/terms" className="terms-link">
                Termos de Uso
              </Link>{" "}
              e{" "}
              <Link href="/privacy" className="terms-link">
                Política de Privacidade
              </Link>
            </label>
          </div>

          <button type="submit" className="auth-button primary" disabled={loading}>
            {loading ? "Criando..." : "Criar Conta"}
          </button>
        </form>

        <div className="auth-divider">
          <span>ou</span>
        </div>

        <button onClick={handleGoogleSignup} className="auth-button google" disabled={loading}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            />
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            />
          </svg>
          Criar conta com Google
        </button>

        <p className="auth-link">
          Já tem conta?{" "}
          <Link href="/login" className="link">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  )
}

