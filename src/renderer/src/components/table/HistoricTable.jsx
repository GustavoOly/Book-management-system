import React from 'react';
import { GoTrash, GoPencil } from "react-icons/go";
import Cadastrar from "../Cadastrar";
import { useHistoricTable } from './hooks/useHistoricTable';
import { useEditingHandler } from './hooks/useEditingHandler';
import Modal from 'react-modal';

export default function HistoricTable() {
    const {
        data,
        setData,
        searchTerm,
        setSearchTerm,
        filterPending,
        setFilterPending,
        filterOverdue,
        setFilterOverdue,
        showAll,
        handleSubmit,
        setShowAll,
        handleComplete,
        handleDelete,
        filteredRows
    } = useHistoricTable();

    const { editingRowIndex, editFormData, handleEdit, handleEditChange, handleEditSubmit } = useEditingHandler(data, setData);

    const tHeader = ["Nome", "Telefone", "Livro", "Data", "Prazo de devolução", "Estado", ""];
    const th = "p-2 max-w-5 text-center";

    const getStatusClass = (estado) => {
        switch (estado) {
            case "Em andamento":
                return "bg-quartenary text-secundary";
            case "Atrasado":
                return "bg-red text-secundary";
            case "Devolvido":
                return "bg-green text-secundary";
            default:
                return "bg-tertiary";
        }
    };

    return (
        <section className="w-full h-auto">
            <Cadastrar data={data} onSubmit={handleSubmit} />
            <div className="max-w-7xl min-h-svh  px-2 m-auto">
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
                            <tr className="even:bg-quinary" key={row}>
                                <td className={th}>{row.nome}</td>
                                <td className={th}>{row.telefone}</td>
                                <td className="p-2 max-w-5 text-center break-words">{row.livros}</td>
                                <td className={th}>{row.dataEmprestimo}</td>
                                <td className={th}>{row.dataDevolucao}</td>
                                <td className="p-2 max-w-5">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => handleComplete(index)}
                                            className={`w-10/12 p-2 rounded hover:opacity-85 ${getStatusClass(row.estado)}`}
                                        >
                                            {row.estado}
                                        </button>
                                    </div>
                                </td>
                                <td className="p-2 max-w-30 w-0">
                                    <div className='flex gap-2 justify-center'>
                                        <button onClick={() => handleEdit(index)} className="p-2 rounded bg-green text-secundary hover:opacity-85">
                                            <GoPencil />
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
                <Modal
                    isOpen={editingRowIndex !== null}
                    onRequestClose={() => setEditingRowIndex(null)}
                    style={{
                        overlay: {  
                            backgroundColor: 'rgba(0, 0, 0, 0.75)'
                        },
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)'
                        }
                    }}
                    contentLabel="Editar Item"
                >
                    <h3>Editando {editingRowIndex !== null && data[editingRowIndex].nome}</h3>
                    <form onSubmit={handleEditSubmit} className=' text-black'>
                        <input
                            type="text"
                            name="nome"
                            value={editFormData.nome || ''}
                            onChange={handleEditChange}
                            className="w-full p-2 border-2 border-tertiary rounded mt-2"
                        />
                        <input
                            type="text"
                            name="telefone"
                            value={editFormData.telefone || ''}
                            onChange={handleEditChange}
                            className="w-full p-2 border-2 border-tertiary rounded mt-2"
                        />
                        <input
                            type="text"
                            name="livros"
                            value={editFormData.livros || ''}
                            onChange={handleEditChange}
                            className="w-full p-2 border-2 border-tertiary rounded mt-2"
                        />
                        <div className='flex'>
                            <input
                                type="date"
                                name="dataEmprestimo"
                                value={editFormData.dataEmprestimo || ''}
                                onChange={handleEditChange}
                                className="p-2 border-2 border-tertiary rounded mt-2"
                            />
                            <input
                                type="date"
                                name="dataDevolucao"
                                value={editFormData.dataDevolucao || ''}
                                onChange={handleEditChange}
                                className="p-2 border-2 border-tertiary rounded mt-2"
                            />
                        </div>
                        <button type="submit" className="w-2/12 bg-green text-secundary p-2 rounded mt-2">Salvar</button>
                    </form>
                </Modal>
            </div>
        </section>
    );
}
