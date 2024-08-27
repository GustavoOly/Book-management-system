import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/logo-ipameri-min.png?asset';
import db from '../../database/database.js';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minHeight: 600,
    minWidth: 900,
    show: false,
    autoHideMenuBar: true,
    frame: true,
    ...(process.platform === 'linux' || process.platform === 'win32' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    }
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  autoUpdater.checkForUpdatesAndNotify();

  autoUpdater.on('update-available', () => {
    dialog.showMessageBox(mainWindow, {
      type: 'info',
      title: 'Atualização disponível',
      message: 'Uma nova versão está disponível. Ela será baixada em segundo plano.',
    });
  });

  autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox(mainWindow, {
      type: 'info',
      title: 'Atualização pronta',
      message: 'A nova versão foi baixada. O aplicativo será atualizado após reiniciar.',
      buttons: ['Reiniciar agora', 'Mais tarde'],
      defaultId: 0,
    }).then((result) => {
      if (result.response === 0) {  // O usuário clicou em "Reiniciar agora"
        autoUpdater.quitAndInstall();
      }
    });
  });
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron');

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  ipcMain.handle('get-emprestimos', async () => {
    const stmt = db.prepare('SELECT * FROM emprestimos');
    const items = stmt.all();
    console.log('Emprestimos carregados:', items);
    return items;
  });

  ipcMain.handle('update-emprestimo', (event, item) => {
    const stmt = db.prepare('UPDATE emprestimos SET nome = ?, telefone = ?, livros = ?, dataEmprestimo = ?, dataDevolucao = ? WHERE id = ?');
    const info = stmt.run(item.nome, item.telefone, item.livros, item.dataEmprestimo, item.dataDevolucao, item.id);
    console.log('Emprestimo atualizado:', item);
    return { changes: info.changes };
  });

  ipcMain.handle('update-estado-emprestimo', (event, item) => {
    console.log('Atualizando item:', item);
    const stmt = db.prepare('UPDATE emprestimos SET estado = ? WHERE id = ?');
    const info = stmt.run(item.estado, item.id);
    console.log('Mudanças feitas:', info.changes);
    return { changes: info.changes };
  });


  ipcMain.handle('delete-emprestimo', (event, id) => {
    event.sender.send('delete-emprestimo', id);
    const stmt = db.prepare('DELETE FROM emprestimos WHERE id = ?');
    const info = stmt.run(id);
    console.log('Emprestimo deletado:', id);
    return { changes: info.changes };
  });

  ipcMain.handle('add-emprestimo', (event, item) => {
    event.preventDefault();
    const currentDate = new Date();
    const returnDate = new Date(item.dataDevolucao);
    let estado = 'Em andamento';

    if (currentDate > returnDate) {
      estado = 'Atrasado';
    } else if (currentDate.toDateString() === returnDate.toDateString()) {
      estado = 'Em andamento';
    }
    const stmt = db.prepare('INSERT INTO emprestimos (nome, telefone, livros, dataEmprestimo, dataDevolucao, estado) VALUES (?, ?, ?, ?, ?, ?)');
    const info = stmt.run(item.nome, item.telefone, item.livros, item.dataEmprestimo, item.dataDevolucao, estado);
    return { id: info.lastInsertRowid };
  });

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
