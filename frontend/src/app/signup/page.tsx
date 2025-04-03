"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import "./signup.css";

const SignupPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validateFields = () => {
    if (nome.trim().length < 3) {
      setError("Digite um nome válido.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Digite um email válido.");
      return false;
    }

    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return false;
    }

    if (password !== confirmSenha) {
      setError("As senhas não coincidem.");
      return false;
    }

    return true;
  };

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateFields()) return;

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);

      await setDoc(doc(db, "users", user.uid), {
        nome,
        email,
        role: "user",
        createdAt: serverTimestamp(),
      });

      setSuccess("Conta criada com sucesso! Verifique seu email.");
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (err: any) {
      console.error(err);
      setError("Erro ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="signup-container">
      <h1 className="signup-title">Criar Conta</h1>

      <form onSubmit={handleSignup} className="signup-form">
        <div>
          <label>Nome</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>

        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div>
          <label>Senha</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <small className="password-tip">Mínimo de 6 caracteres.</small>
        </div>

        <div>
          <label>Confirme sua senha</label>
          <input
            type="password"
            value={confirmSenha}
            onChange={(e) => setConfirmSenha(e.target.value)}
            required
          />
        </div>

        {error && <p className="signup-error">{error}</p>}
        {success && <p className="signup-success">{success}</p>}

        <button type="submit" className="signup-button" disabled={loading}>
          {loading ? "Criando..." : "Criar Conta"}
        </button>
      </form>

      <div className="divider">ou</div>

      <button onClick={() => alert("Google ainda não ativado")} className="google-button">
        <img src="/google-icon.svg" alt="Google" className="google-icon" />
        Criar conta com Google
      </button>

      <p className="signup-link">
        Já tem conta? <a href="/login">Faça login</a>
      </p>
    </div>
  );
};

export default SignupPage;
