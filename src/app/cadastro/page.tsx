'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';

export default function Cadastro() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login/login'); // Redireciona para login se não estiver autenticado
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null; // Evita renderizar antes de redirecionar

  return (
    <div className="container-cadastropage">
            <div className="fundo">
                <h1>Comércio</h1>
                <p>Escolha uma das opções abaixo para fazer o comércio de ENERGIA:</p>
                <div className='flex flex-col items-center md:flex-row'>
                    <Link href="/comercios/cad-cumunidades">
                        <button className='botao'>Cadastrar Comunidade</button>
                    </Link>
                    <Link href="/armazenamentos/cad-unidades">
                        <button className='botao'>Cadastrar Unidade</button>
                    </Link>
                </div>
                <button onClick={logout} className="mt-8 px-4 py-2 text-black bg-gray-200 rounded hover:bg-red-700 mb-6">Sair</button>
            </div>
        </div>
  );
}
