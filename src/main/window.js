import { BrowserWindow, shell } from 'electron';
import { join } from 'path';
import { autoUpdater } from 'electron-updater';
import { is } from '@electron-toolkit/utils';
import icon from '../../resources/logo-ipameri-min.png?asset';

const WINDOW_OPTIONS = {
  width: 1200,
  height: 800,
  minHeight: 600,
  minWidth: 900,
  show: false,
  autoHideMenuBar: true,
  frame: true,
  webPreferences: {
    preload: join(__dirname, '../preload/index.js'),
    sandbox: false,
    contextIsolation: true,
    enableRemoteModule: false,
    nodeIntegration: false,
  }
};

export function createWindow() {
  const mainWindow = new BrowserWindow({
    ...WINDOW_OPTIONS,
    ...(process.platform === 'linux' || process.platform === "win32" ? { icon } : {}),
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

  autoUpdater.on('update-downloaded', () => {
    autoUpdater.quitAndInstall();
  });
}
