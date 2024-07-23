import React, { useState, useEffect } from 'react';

export default function Cadastrar({ data, onSubmit }) {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [livros, setLivros] = useState('');
    const [dataEmprestimo, setDataEmprestimo] = useState('');
    const [dataDevolucao, setDataDevolucao] = useState('');

    useEffect(() => {
        if (Array.isArray(data) && data.length > 0) {
            const { nome, telefone, livros, dataEmprestimo, dataDevolucao } = data[0];
            setNome(nome);
            setTelefone(telefone);
            setLivros(livros);
            setDataEmprestimo(dataEmprestimo);
            setDataDevolucao(dataDevolucao);
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newItem = {
            nome,
            telefone,
            livros,
            dataEmprestimo,
            dataDevolucao,
        };

        
        const result = await window.electron.ipcRenderer.invoke('add-emprestimo', newItem);
        console.log('Item added with ID:', result.id);

        if (onSubmit) {
            onSubmit(newItem);
        }
    };

    return (
        <section className="max-w-7xl px-2 py-7 m-auto">
            <form onSubmit={handleSubmit} className="">
                <div className="mb-4">
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
                    <input
                        id="nome"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="mt-1 block w-full p-2 border border-tertiary rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">Telefone</label>
                    <input
                        id="telefone"
                        type="text"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        className="mt-1 block w-full p-2 border border-tertiary rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="livros" className="block text-sm font-medium text-gray-700">Livro</label>
                    <input
                        id="livros"
                        type="text"
                        value={livros}
                        onChange={(e) => setLivros(e.target.value)}
                        className="mt-1 block w-full p-2 border border-tertiary rounded"
                        required
                    />
                </div>
                <div className="mb-4 flex gap-3">
                    <div>
                        <label htmlFor="dataEmprestimo" className="block text-sm font-medium text-gray-700">Data de Empréstimo</label>
                        <input
                            id="dataEmprestimo"
                            type="date"
                            value={dataEmprestimo}
                            onChange={(e) => setDataEmprestimo(e.target.value)}
                            className="mt-1 block p-2 border border-tertiary rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="dataDevolucao" className="block text-sm font-medium text-gray-700">Prazo de Devolução</label>
                        <input
                            id="dataDevolucao"
                            type="date"
                            value={dataDevolucao}
                            onChange={(e) => setDataDevolucao(e.target.value)}
                            className="mt-1 block p-2 border border-tertiary rounded"
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-40 p-2 rounded hover:opacity-85 bg-primary text-secundary"
                >
                    Adicionar Item
                </button>
            </form>
        </section>
    );
}
