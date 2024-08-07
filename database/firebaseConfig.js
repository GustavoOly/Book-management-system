import Database from 'better-sqlite3';
import { resolve } from 'path';
import fs from 'fs';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getBytes } from 'firebase/storage';
import 'dotenv/config'

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const dbPath = resolve('./database.db');
const db = new Database(dbPath);

const createTable = `
  CREATE TABLE IF NOT EXISTS emprestimos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    telefone TEXT NOT NULL,
    livros TEXT NOT NULL,
    dataEmprestimo TEXT NOT NULL,
    dataDevolucao TEXT NOT NULL,
    estado TEXT
  )
`;

db.exec(createTable);
console.log("Tabela 'emprestimos' criada/verificada com sucesso.");

const uploadDatabase = async () => {
  const file = fs.readFileSync(dbPath);
  const storageRef = ref(storage, 'database.db'); 

  try {
    await uploadBytes(storageRef, file);
    console.log('Arquivo enviado com sucesso.');
  } catch (error) {
    console.error('Erro ao enviar o arquivo:', error);
  }
};

const downloadDatabase = async () => {
  const file = fs.readFileSync(dbPath);
  const storageRef = ref(storage, 'database.db'); 

  try {
    const fileBytes = await getBytes(storageRef);
    fs.writeFileSync(file, fileBytes);
    console.log('Arquivo baixado com sucesso');
  } catch (error) {
    console.error('Erro ao baixar o arquivo:', error);
  }
};

const syncDatabase = async () => {
  await downloadDatabase();
  await uploadDatabase();
};

uploadDatabase().then(() => {
  syncDatabase();
});

export default db;
export { uploadDatabase, downloadDatabase };
