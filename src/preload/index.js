import { contextBridge } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

const api = {
  getEmprestimos: async () => {
    return window.electron.invoke('get-emprestimos');
  },
  addEmprestimo: async (item) => {
    return window.electron.invoke('add-emprestimo', item);
  },
  deleteEmprestimo: async (id) => {
    return window.electron.invoke('delete-emprestimo', id);
  },
  updateEmprestimo: async (item) => {
    return window.electron.invoke('update-emprestimo', item); 
  },
  updateEstadoEmprestimo: async (item) => {
    return window.electron.invoke('update-estado-emprestimo', item);
  }
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api);
    contextBridge.exposeInMainWorld('electron', electronAPI);
  } catch (error) {
    console.error('Failed to expose APIs:', error);
  }
} else {
  window.api = api;
  window.electron = electronAPI;
}
