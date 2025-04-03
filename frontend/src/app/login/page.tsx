"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';  // ajuste o path conforme onde está seu firebase.ts

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Se der tudo certo, redirecione para o dashboard ou home
      router.push('/dashboard'); 
    } catch (err: any) {
      console.error(err);
      setError('Falha ao fazer login. Verifique seus dados e tente novamente.');
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Senha</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Entrar</button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Não tem conta? <a href="/signup">Crie aqui</a>
      </p>
    </div>
  );
};

export default LoginPage;
