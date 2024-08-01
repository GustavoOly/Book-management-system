import { Dropbox } from 'dropbox';
import fetch from 'node-fetch'; // `node-fetch` pode ser necessário se estiver usando Node.js

// Configure o token de acesso
const dbx = new Dropbox({ accessToken: 'SEU_TOKEN_DE_ACESSO', fetch });

// Caminho do arquivo local e caminho no Dropbox
const localFilePath = 'path/to/local/file.db';
const dropboxFilePath = '/path/in/dropbox/file.db';

// Função para fazer upload de um arquivo para o Dropbox
async function uploadFile() {
  try {
    const fileContents = await fs.promises.readFile(localFilePath);
    await dbx.filesUpload({ path: dropboxFilePath, contents: fileContents });
    console.log('Arquivo enviado para o Dropbox com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar arquivo para o Dropbox:', error);
  }
}

// Função para fazer download de um arquivo do Dropbox
async function downloadFile() {
  try {
    const response = await dbx.filesDownload({ path: dropboxFilePath });
    const fileContents = response.fileBinary;
    await fs.promises.writeFile(localFilePath, fileContents);
    console.log('Arquivo baixado do Dropbox com sucesso!');
  } catch (error) {
    console.error('Erro ao baixar arquivo do Dropbox:', error);
  }
}

uploadFile(); // Envia o arquivo para o Dropbox
downloadFile(); // Baixa o arquivo do Dropbox
