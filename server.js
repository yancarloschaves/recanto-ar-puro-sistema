require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

// Cria a aplicação Express
const app = express();
app.use(express.json()); // Para Express ler JSON no corpo das requisições
const PORT = 3001; // Porta em que o servidor vai rodar

// Script conexao com MongoDB
const MONGO_URI = process.env.MONGO_URI;

// Definição do model Funcionario
const funcionarioSchema = new mongoose.Schema({
    nomeCompleto: String,
    cpf: String,
    cargo: String,
    funcao: String,
    dataAdmissao: Date
});

const Funcionario = mongoose.model('Funcionario', funcionarioSchema);

// <--- Conexão com Banco de Dados --->
mongoose.connect(MONGO_URI)
.then(() => {
    console.log('Conectado ao MongoDB com sucesso!');

    // Assim que conexão é estabelecida com sucesso começa a ouvir requisições
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
})
.catch((err) => {
    console.log('Erro ao conectar ao MongoDB', err);
});

// <--- Rotas da API --->

// Rota de teste para ver se o servidor está no ar
app.get('/', (req, res) => {
    res.json({message: 'API do Recanto Ar Puro está funcionando!'});
});

// Rota para buscar funcionarios (GET)
app.get('/api/funcionarios', async (req, res) => {
    try{
        // Usa o model Funcionario para encontrar todos os documentos na coleção
        const funcionarios = await Funcionario.find();

        // Retorna a lista de funcionários como JSON com o status 200
        res.status(200).json(funcionarios);

    } catch (error) {
        // Se der algum erro, informa no console e retorna um erro 500
        console.error('Erro ao buscar funcionários:', error);
        res.status(500).json({message: 'Ocorreu um erro ao buscar os funcionários.'});
    }
});

// Rota para criar funcionarios (POST)
app.post('/api/funcionarios', async (req, res) => {
    try{
        // req.body contem os dados enviador no corpo da requisição
        const novoFuncionario = new Funcionario(req.body);

        // Salva o novo documento no banco de dados
        await novoFuncionario.save();

        // Retorna o documento recém-criado com status 201
        res.status(201).json(novoFuncionario);
    
    } catch (error){
        // Se der erro, retorna erro 400 (bad request)
        console.error('Erro ao criar funcionário', error);
        res.status(400).json({message: 'Erro ao criar novo funcionário.', error: error.message});
    }
});