// Importar o Mongoose
const mongoose = require('mongoose');

// String de conexão do MongoDB Atlas
const MONGO_URI = 'mongodb+srv://root:root@cluster0.karmm9u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Definir a estrutura da coleção funcionários
const funcionarioEstrutura = new mongoose.Schema({
    nomeCompleto: String,
    cpf: String,
    cargo: String,
    funcao: String,
    dataAdmissao: Date
});

// Cria o model a partir da Estrutura funcionario
const Funcionario = mongoose.model('Funcionario', funcionarioEstrutura);

// Função principal para conectar e inserir os dados
async function criarPrimeiroFuncionario(){
    try{
        // Conecta ao MongoDB
        await mongoose.connect(MONGO_URI);
        console.log('Conexão com o MongDB estabelecida com sucesso!');

        // Cria uma instancia do primeiro funcionario
        const primeiroFuncionario = new Funcionario({
            nomeCompleto: 'Yan Chaves',
            cpf: '123.456.789-00',
            cargo: 'Cuidador de Idosos',
            funcao: 'Cuidados diários, acompanhamento em atividades',
            dataAdmissao: new Date() // new Date() pega a hora e data atuais
        });

        // Salva a instancia no banco de dados
        await primeiroFuncionario.save();
        console.log('Primeiro funcionário inserido com sucesso!');
        console.log(primeiroFuncionario);

    } catch (error){
        console.error('Erro ao conectar ou inserir dados:',error);
    } finally {
        // Fecha a conexao com banco de dados ao final do processo
        mongoose.connection.close();
        console.log('Conexão com MongoDB fechada.')
    }
}

// Executar a função
criarPrimeiroFuncionario();