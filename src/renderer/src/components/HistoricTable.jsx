import React, { useState, useEffect } from 'react';
import { GoTrash } from "react-icons/go";
import Cadastrar from "./Cadastrar";

export default function HistoricTable() {
    const tHeader = ["Nome", "Telefone", "Livro", "Data", "Prazo de devolução", "Estado"];
    const th = "p-2 max-w-5 text-center";

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [deletedRow, setDeletedRow] = useState(null);
    const [restoreTimeout, setRestoreTimeout] = useState(null);
    const [secondsRemaining, setSecondsRemaining] = useState(5);
    const [filterPending, setFilterPending] = useState(false);
    const [filterOverdue, setFilterOverdue] = useState(false);
    const [showAll, setShowAll] = useState(true);

    useEffect(() => {
        if (deletedRow !== null) {
            setSecondsRemaining(5);
            const interval = setInterval(() => {
                setSecondsRemaining(prev => prev - 1);
            }, 1000);
            const timeout = setTimeout(() => {
                setDeletedRow(null);
            }, 5000);
            setRestoreTimeout(timeout);
            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
            };
        }
    }, [deletedRow]);

    const getStatus = (item) => {
        if (new Date(item.dataDevolucao) < new Date()) {
            return "Atrasado";
        }
        return "Em andamento";
    };

    const updateOverdueStatus = (data) => {
        return data.map(item => {
            if (new Date(item.dataDevolucao) < new Date() && item.status === "Em andamento") {
                return { ...item, status: "Atrasado" };
            }
            return item;
        });
    };

    const handleSubmit = (newItem) => {
        newItem.status = getStatus(newItem);
        const updatedData = updateOverdueStatus([...data, newItem]);
        setData(updatedData);
    };

    const handleComplete = (index) => {
        const newData = [...data];
        newData[index].status = newData[index].status === "Devolvido" ? getStatus(newData[index]) : "Devolvido";
        setData(updateOverdueStatus(newData));
    };

    const handleDelete = (index) => {
        setDeletedRow({ ...data[index], index });
        const newData = data.filter((_, i) => i !== index);
        setData(updateOverdueStatus(newData));
    };

    const handleRestore = () => {
        if (deletedRow !== null) {
            const newData = [...data];
            newData.splice(deletedRow.index, 0, deletedRow);
            setData(updateOverdueStatus(newData));
            setDeletedRow(null);
            clearTimeout(restoreTimeout);
        }
    };

    const filteredRows = data.filter((row) => {
        const isPending = row.status === "Em andamento";
        const isOverdue = row.status === "Atrasado";
        const matchesSearchTerm = row.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.livros.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.dataEmprestimo.includes(searchTerm) ||
            row.dataDevolucao.includes(searchTerm);

        if (showAll) {
            return matchesSearchTerm;
        } else if (filterPending && filterOverdue) {
            return matchesSearchTerm && (isPending || isOverdue);
        } else if (filterPending) {
            return matchesSearchTerm && isPending;
        } else if (filterOverdue) {
            return matchesSearchTerm && isOverdue;
        } else {
            return matchesSearchTerm;
        }
    });

    return (
        <section className="w-full h-auto">
            <Cadastrar data={data} onSubmit={handleSubmit} />
            <div className="max-w-7xl min-h-lvh  px-2 m-auto">
                <div className="w-full py-4 flex justify-between items-center gap-2">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="w-6/12 p-2 border-2 border-tertiary rounded"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div>
                        <button
                            onClick={() => {
                                setShowAll(true);
                                setFilterPending(false);
                                setFilterOverdue(false);
                            }}
                            className={`p-2 rounded ${showAll ? "bg-tertiary" : ""}`}
                        >
                            Todos
                        </button>
                        <button
                            onClick={() => {
                                setShowAll(false);
                                setFilterPending(true);
                                setFilterOverdue(false);
                            }}
                            className={`p-2 rounded ${filterPending ? "bg-tertiary" : ""}`}
                        >
                            Pendentes
                        </button>
                        <button
                            onClick={() => {
                                setShowAll(false);
                                setFilterPending(false);
                                setFilterOverdue(true);
                            }}
                            className={`p-2 rounded ${filterOverdue ? "bg-tertiary" : ""}`}
                        >
                            Atrasados
                        </button>
                    </div>
                </div>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-primary text-secundary">
                            {tHeader.map((header, index) => (
                                <th key={index} className={th}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRows.map((row, index) => (
                            <tr className="even:bg-quinary" key={index}>
                                <td className={th}>{row.nome}</td>
                                <td className={th}>{row.telefone}</td>
                                <td className={th}>{row.livros}</td>
                                <td className={th}>{row.dataEmprestimo}</td>
                                <td className={th}>{row.dataDevolucao}</td>
                                <td className={th}>
                                    <div className="flex justify-between gap-2">
                                        <button
                                            onClick={() => handleComplete(index)}
                                            className={`w-10/12 p-2 rounded text-white hover:opacity-85 `}
                                        >
                                            {row.status}
                                        </button>
                                        <button onClick={() => handleDelete(index)} className="p-2 rounded bg-red text-secundary hover:opacity-85">
                                            <GoTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {deletedRow && (
                    <div className="fixed bottom-4 left-4 bg-primary text-secundary p-4 rounded animate-fade-right ">
                        <p>{secondsRemaining} segundos para Restaurar.</p>
                        <button onClick={handleRestore} className="bg-blue-500 text-white p-2 rounded mt-2">Restaurar</button>
                    </div>
                )}
            </div>
        </section >
    );
}
