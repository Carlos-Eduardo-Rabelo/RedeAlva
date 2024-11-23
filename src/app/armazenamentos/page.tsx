"use client";

import { TipoArmazenamento} from "@/types/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";


export default function Armazenamento() {
    const navigate = useRouter(); // redirecionamento para home

    const [armazenamentos, setArmazenamentos] = useState<TipoArmazenamento[]>([]); // chamar a lista

    const chamadaApi = async () => {
        try {
            const response = await fetch("http://localhost:8080/armazenamento");
            const data = await response.json();
            setArmazenamentos(data);
        } catch (error) {
            console.error("Falha ao listar comunidades: ", error);
        }
    };

    useEffect(() => {
        chamadaApi();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8080/armazenamento/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Comunidade deletada com sucesso!");
                setArmazenamentos(armazenamentos.filter(armazenamento => armazenamento.idArmazenamento !== id)); // Atualiza a lista após exclusão
            }
        } catch (error) {
            console.error("Falha ao remover o armazenamento.", error);
        }
    };


    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Armazenamento</h1>
            {armazenamentos.length === 0 ? (
                <p className="text-red-500">Nenhuma comunidade encontrada.</p>
            ) : (
                <table className="w-full mt-8 border-[#011625] border-8">
                    <thead className="bg-[#011625]">
                        <tr className="border-b border-[#1b3040]">
                        <th className="p-4 text-white">ID armazenamento</th>
                            <th className="p-4 text-white">ID comunidade</th>
                            <th className="p-4 text-white">ID unidade</th>
                            <th className="p-4 text-white">Tipo Geração</th>
                            <th className="p-4 text-white">Quantidade</th>
                            <th className="p-4 text-white">Data</th>
                            <th className="p-4 text-white">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#001d31]">
                        {armazenamentos.map((armazenamento) => (
                            <tr key={armazenamento.idArmazenamento} className="hover:bg-[#004a7d] transition-all duration-300">
                                <td className="p-4 text-white">{armazenamento.idArmazenamento}</td>
                                <td className="p-4 text-white">{armazenamento.idComunidade}</td>
                                <td className="p-4 text-white">{armazenamento.idUnidade}</td>
                                <td className="p-4 text-white">{armazenamento.tipoGeracao}</td>
                                <td className="p-4 text-white">{armazenamento.quantidade}</td>
                                <td className="p-4 text-white">{armazenamento.dataHora}</td>
                                <td className="p-4 text-white flex justify-evenly items-center w-full h-full">
                            
                                    <Link href={`/armazenamentos/edit-armazenamento/${armazenamento.idArmazenamento}`}>
                                        <span className="hover:scale-125 cursor-pointer transition-all duration-300">
                                            <BiEdit size={30} color="#4300ff" />
                                        </span>
                                    </Link>
                                    <button onClick={() => handleDelete(armazenamento.idArmazenamento!)} className="hover:scale-125 cursor-pointer transition-all duration-300">
                                        <MdDelete size={30} color="#a43400" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={6} className="p-4 text-black text-center">Total de armazenamentos: {armazenamentos.length}</td>
                        </tr>
                    </tfoot>
                </table>
            )}
        </div>
    );
}
