"use client";

import { TipoArmazenamento} from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CadComunidades() {
    const navigate = useRouter(); // Redirecionamento para home

    const [armazenamneto, setArmazenamneto] = useState<TipoArmazenamento>({
        idComunidade: 0,
        idUnidade: 0,
        tipoGeracao: "",
        quantidade: 0.0
    });

    const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evento.target;
        setArmazenamneto({ ...armazenamneto, [name]: value });
    };

    const handleSubmit = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/armazenamento", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(armazenamneto)
            });

            if (response.ok) {
                alert("Comunidade cadastrada com sucesso!");
                setArmazenamneto({
                    idComunidade: 0,
                    idUnidade: 0,
                    tipoGeracao: "",
                    quantidade: 0.0
                });
                navigate.push("/comercio"); // Redireciona após cadastro
            }
        } catch (error) {
            console.error("Falha no armazenamento: ", error);
        }
    };

    return (
        <div className="container-armazenamento">
            <h1 className="titulo">CADASTRO DO ARMAZENAMENTO</h1>
            <div className="form-armazenamento">
            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="idCom">ID Comunidade</label>
                    <input type="number" name="idComunidade" id="idCom" value={armazenamneto.idComunidade} onChange={handleChange}
                        placeholder="digite o id da sua comunidade" required />
                </div>

                <div>
                    <label htmlFor="idUnidade">ID da Unidade</label>
                    <input type="number" name="idUnidade" id="idUnidade" value={armazenamneto.idUnidade} onChange={handleChange}
                        placeholder="digite o id da unidade que deseja transferir a energia" required />
                </div>

                <div>
                    <fieldset>
                        <legend>Tipo de Transação</legend>
                        <div className="radio-group">
                            <label htmlFor="idTransacaoVenda">Doar</label>
                            <input
                                type="radio"
                                name="tipoGeracao"
                                id="idTransacaoVenda"
                                value="dar"
                                checked={armazenamneto.tipoGeracao === "dar"}
                                onChange={handleChange}
                            />
                            <label htmlFor="idTransacaoCompra">Pegar</label>
                            <input
                                type="radio"
                                name="tipoGeracao"
                                id="idTransacaoCompra"
                                value="pegar"
                                checked={armazenamneto.tipoGeracao === "pegar"}
                                onChange={handleChange}
                            />
                        </div>
                    </fieldset>
                </div>


                <div>
                    <label htmlFor="idQtd">Quantidade Energia</label>
                    <input type="number" name="quantidade" id="idQtd" value={armazenamneto.quantidade} onChange={handleChange}
                        placeholder="digite a quantidade que irá ser trocada" required />
                </div>

                <div>
                    <button type="submit" className="submit-btn">REGISTRAR</button>
                </div>
            </form>
            </div>
            
        </div>
    );
}
