import { useState, useEffect } from 'react';

export const getStatus = (item) => {
    if (new Date(item.dataDevolucao) < new Date()) {
        return "Atrasado";
    }
    return "Em andamento";
};

export const updateOverdueStatus = (data) => {
    return data.map(item => {
        if (new Date(item.dataDevolucao) < new Date() && item.estado === "Em andamento") {
            return { ...item, estado: "Atrasado" };
        }
        return item;
    });
};

export const handleSicronize = () => {
    getStatus.JSON.stringify();
    console.log(getStatus);
    return parseInt(getStatus);
}

export const useHistoricTable = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterPending, setFilterPending] = useState(false);
    const [filterOverdue, setFilterOverdue] = useState(false);
    const [showAll, setShowAll] = useState(true);
    const [deletedRow, setDeletedRow] = useState(null);

    useEffect(() => {
        const getEmprestimos = async () => {
            const viewTable = await window.api.getEmprestimos();
            setData(viewTable);
        }
        getEmprestimos();
    }, []);


    useEffect(() => {
        if (deletedRow) {
            const updatedData = [...data];
            updatedData.splice(deletedRow.index, 1);
            setData(updatedData);
            setDeletedRow(null);
        }
    }, [])

    const handleSubmit = (newItem) => {
        newItem.estado = getStatus(newItem);
        const updatedData = updateOverdueStatus([...data, newItem]);
        setData(updatedData);
    };

    const handleComplete = async (index) => {
        const newData = [...data];
        newData[index].estado = newData[index].estado === "Devolvido" ? getStatus(newData[index]) : "Devolvido";
        setData(updateOverdueStatus(newData));

        try {
            const editItem = await window.api.updateEstadoEmprestimo(newData[index]);
            if (editItem.changes > 0) {
                console.log('Item atualizado com sucesso');
            } else {
                console.log('Erro ao atualizar o item');
            }
        } catch (error) {
            console.error('Erro ao invocar update-estado-emprestimo:', error);
        }
    };

    const handleDelete = async (index) => {
        setDeletedRow({ ...data[index], index });
        const newData = data.filter((_, i) => i !== index);
        setData(updateOverdueStatus(newData));

        const idToDelete = data[index].id;

        try {
            const deleteItem = await window.api.deleteEmprestimo(idToDelete);
            if (deleteItem.changes > 0) {
                console.log('Item deletado com sucesso');
            } else {
                console.log('Erro ao deletar o item');
            }
        } catch (error) {
            console.error('Erro ao invocar delete-emprestimo:', error);
        }
    };

    const filteredRows = data.filter((row) => {
        const isPending = row.estado === "Em andamento";
        const isOverdue = row.estado === "Atrasado";
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

    return {
        data,
        setData,
        searchTerm,
        setSearchTerm,
        filterPending,
        setFilterPending,
        filterOverdue,
        setFilterOverdue,
        showAll,
        setShowAll,
        handleSubmit,
        handleComplete,
        handleDelete,
        filteredRows
    };
};
