import { useState } from 'react';
import { getStatus, updateOverdueStatus } from './useHistoricTable';

export const useEditingHandler = (data, setData, updateEmprestimo) => {
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleEdit = (index) => {
    setEditingRowIndex(index);
    setEditFormData(data[index]);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const newData = [...data];
    newData[editingRowIndex] = { ...editFormData, status: getStatus(editFormData) };
    setData(updateOverdueStatus(newData));
    setEditingRowIndex(null);
    setEditFormData({});

    try {
      const editItem = await window.electron.ipcRenderer.invoke('update-emprestimo', newData[editingRowIndex]);
      if (editItem.changes > 0) {
        console.log('Item editado com sucesso');
      } else {
        console.log('Erro ao editar o item');
      }
    } catch (error) {
      console.error('Erro ao invocar edit-emprestimo:', error);
    }
  };



  return {
    editingRowIndex,
    editFormData,
    handleEdit,
    handleEditChange,
    handleEditSubmit
  };
};
