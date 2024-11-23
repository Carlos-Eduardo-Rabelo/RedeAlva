"use client";

import { TipoComercio} from "@/types/types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";


export default function Comercios() {
    const navigate = useRouter();

    const [comercios, setComercios] = useState<TipoComercio[]>([]); 

    const chamadaApi = async () => {
        try {
            const response = await fetch("http://localhost:8080/distribuicao");
            const data = await response.json();
            setComercios(data);
        } catch (error) {
            console.error("Falha ao listar comercio: ", error);
        }
    };

    useEffect(() => {
        chamadaApi();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8080/distribuicao/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Comercio deletado com sucesso!");
                setComercios(comercios.filter(comercio => comercio.idComunidade !== id)); 
            }
        } catch (error) {
            console.error("Falha ao remover o comercio.", error);
        }
    };


    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Comercios</h1>
            {comercios.length === 0 ? (
                <p className="text-red-500">Nenhum comercio encontrada.</p>
            ) : (
                <table className="w-full mt-8 border-[#011625] border-8">
                    <thead className="bg-[#011625]">
                        <tr className="border-b border-[#1b3040]">
                        <th className="p-4 text-white">ID comercio</th>
                            <th className="p-4 text-white">ID comunidade</th>
                            <th className="p-4 text-white">ID da unidade vendedora</th>
                            <th className="p-4 text-white">ID da unidade compradora</th>
                            <th className="p-4 text-white">Quantidade KwH</th>
                            <th className="p-4 text-white">Data</th>
                            <th className="p-4 text-white">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#001d31]">
                        {comercios.map((comercio) => (
                            <tr key={comercio.idComercio} className="hover:bg-[#004a7d] transition-all duration-300">
                                <td className="p-4 text-white">{comercio.idComercio}</td>
                                <td className="p-4 text-white">{comercio.idComunidade}</td>
                                <td className="p-4 text-white">{comercio.unidadeVedendoraId}</td>
                                <td className="p-4 text-white">{comercio.unidadeCompradoraId}</td>
                                <td className="p-4 text-white">{comercio.quantidade}</td>
                                <td className="p-4 text-white">{comercio.dataHora}</td>
                                <td className="p-4 text-white flex justify-evenly items-center w-full h-full">
                            
                                    <Link href={`/comercios/edit-comercio/${comercio.idComercio}`}>
                                        <span className="hover:scale-125 cursor-pointer transition-all duration-300">
                                            <BiEdit size={30} color="#4300ff" />
                                        </span>
                                    </Link>
                                    <button onClick={() => handleDelete(comercio.idComercio!)} className="hover:scale-125 cursor-pointer transition-all duration-300">
                                        <MdDelete size={30} color="#a43400" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={6} className="p-4 text-black text-center">Total de comercios: {comercios.length}</td>
                        </tr>
                    </tfoot>
                </table>
            )}
        </div>
    );
}
