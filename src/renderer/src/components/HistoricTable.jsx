import React, { useState } from 'react';

export default function HistoricTable() {
    const tHeader = ["Alugueis", "Nome", "Telefone", "Livro", "Data", "Prazo de devolução"];
    const th = " p-2 max-w-5";
    const tr = [
        {
            nome: "João Poucas Ideia",
            livros: "Como assaltar bancos sem violência, de Roderic  Knowles.",
            data: "2024-07-18",
            dataDevolucao: "2024-07-25",
            autor: "Autor A",
            genero: "Ficção",
            isbn: "978-3-16-148410-0",
            status: "Em andamento",
            telefone: "(64) 6666-6666"
        },
        {
            nome: "Maria Das Colves",
            livros: "Como começar seu próprio país, de Erwin S. Strauss.",
            data: "2024-07-19",
            dataDevolucao: "2024-07-26",
            autor: "Autor B",
            genero: "Não-ficção",
            isbn: "978-1-23-456789-0",
            status: "Devolvido",
            telefone: "(84) desconhecido"
        },
        {
            nome: "Jaison Mendes",
            livros: "Caixões: Faça você mesmo, de Dale Power.",
            data: "2024-07-20",
            dataDevolucao: "2024-07-27",
            autor: "Autor C",
            genero: "Ficção Científica",
            isbn: "978-1-84-749217-8",
            status: "Em andamento",
            telefone: "4567-8910"
        },
        {
            nome: "Anna Clara Com Dois Enês",
            livros: "Como se tornar esquizofrênico, de Jhon Modrow",
            data: "2024-07-21",
            dataDevolucao: "2024-07-28",
            autor: "Autor D",
            genero: "Biografia",
            isbn: "978-0-14-017739-8",
            status: "Devolvido",
            telefone: "3210-9876"
        },
        {
            nome: "Paula Tejando Almeida",
            livros: "Como defecar na floresta, de Kathleen Meyer",
            data: "2024-07-22",
            dataDevolucao: "2024-07-29",
            autor: "Autor E",
            genero: "História",
            isbn: "978-0-06-224854-8",
            status: "Em andamento",
            telefone: "6789-0123"
        }
    ];


    const [searchTerm, setSearchTerm] = useState("");

    const filteredRows = tr.filter((row) =>
        row.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.livros.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.data.includes(searchTerm) ||
        row.dataDevolucao.includes(searchTerm)
    );


    return (
        <section className="w-full h-auto">
            <div className="max-w-6xl px-2 m-auto">
                <div className="w-full  py-4">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="w-full p-2 border-b-2  border-tertiary rounded"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <table className="w-full  border-collapse">
                    <thead className="">
                        <tr className="bg-primary text-secundary">
                            {tHeader.map((header, index) => (
                                <th key={index} className={th}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRows.map((row, index) => (
                            <tr className="even:bg-quinary" key={index}>
                                <th className={th}>{filteredRows.length - index}</th>
                                <th className={th}>{row.nome}</th>
                                <th className={th}>{row.telefone}</th>
                                <th className={th}>{row.livros}</th>
                                <th className={th}>{row.data}</th>
                                <th className={th}>{row.dataDevolucao}</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}