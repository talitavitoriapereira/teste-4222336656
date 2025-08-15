const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();


const app = express();
const port = process.env.PORT || 3000;

// Serve os arquivos estáticos da pasta "public"
app.use(express.static('public'));

// Configura o body-parser para ler JSON
app.use(bodyParser.json());

// Conexão com o banco de dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Criação das tabelas
db.serialize(() => {
    db.run(`
        CREATE table if not EXISTS aluno(
        id_aluno, 
  cgm integer PRIMARY KEY  NOT null UNIQUE,
  nome varchar (400) not NULL,
  nascimento date not NULL, 
  cpf_aluno varchar (11) not NULL UNIQUE,
  rg varchar (9) NOT NULL unique,
  genero text,
  email_aluno varchar (800),
  telefone_aluno varchar (15),
  endereço varchar (500),
  cep varchar (9),
  numero integer,
  complemento varchar (200),
  bairro varchar (100),
  cidade varchar (250),
  estado varchar (150),
  curso varchar (50) not null ,
  turno varchar (20) NOT NULL,
  turma varchar (10) not NULL,
  responsavel varchar (500),
  grau_parentesco varchar (40),
  cpf_responsavel varchar (11) not NULL UNIQUE,
  telefone_responsavel varchar (15),
  email_responsavel varchar (800)
  );
    `);


    console.log('Tabelas criadas com sucesso.');
});


///////////////////////////// Rotas para Clientes /////////////////////////////
///////////////////////////// Rotas para Clientes /////////////////////////////
///////////////////////////// Rotas para Clientes /////////////////////////////

// Cadastrar cliente
app.post('/aluno', (req, res) => {
    const {  nome,telefone, email, cpf, rg, genero, data_de_nascimento, cep, logradouro, numero, complemento, cidade, bairro, estado, numero_de_matrícul, curso, periodo, turno, nome_responsavel, telefone_responsavel, parentesco_responsavel, cpf_responsavel,   email_responsavel

    } = req.body;

    if (!nome || !cpf) {
        return res.status(400).send('Nome e CPF são obrigatórios.');
    }

    const query = `INSERT INTO aluno ( nome,telefone, email, cpf, rg, genero, data_de_nascimento, cep, logradouro, numero, complemento, cidade, bairro, estado, numero_de_matrícul, curso, periodo, turno, nome_responsavel, telefone_responsavel, parentesco_responsavel, cpf_responsavel,   email_responsavel (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
`;
    db.run(query, [ nome,telefone, email, cpf, rg, genero, data_de_nascimento, cep, logradouro, numero, complemento, cidade, bairro, estado, numero_de_matrícul, curso, periodo, turno, nome_responsavel, telefone_responsavel, parentesco_responsavel, cpf_responsavel,   email_responsavel

    ], function (err) {
        if (err) {
            return res.status(500).send('Erro ao cadastrar aluno.');
        }
        res.status(201).send({ id: this.lastID, message: 'Aluno cadastrado com sucesso.' });
    });
});

// Listar clientes
// Endpoint para listar todos os clientes ou buscar por CPF
app.get('/aluno', (req, res) => {
    const cpf = req.query.cpf || '';  // Recebe o CPF da query string (se houver)

    if (cpf) {
        // Se CPF foi passado, busca clientes que possuam esse CPF ou parte dele
        const query = `SELECT * FROM aluno WHERE cpf LIKE ?`;

        db.all(query, [`%${cpf}%`], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erro ao buscar aluno.' });
            }
            res.json(rows);  // Retorna os clientes encontrados ou um array vazio
        });
    } else {
        // Se CPF não foi passado, retorna todos os clientes
        const query = `SELECT * FROM aluno`;

        db.all(query, (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erro ao buscar aluno.' });
            }
            res.json(rows);  // Retorna todos os clientes
        });
    }
});



// Atualizar cliente
app.put('/aluno/cpf/:cpf', (req, res) => {
    const { cpf } = req.params;
    const {  nome,telefone, email, rg, genero, data_de_nascimento, cep, logradouro, numero, complemento, cidade, bairro, estado, numero_de_matrícul, curso, periodo, turno, nome_responsavel, telefone_responsavel, parentesco_responsavel, cpf_responsavel,   email_responsavel

    } = req.body;

    const query = `UPDATE aluno SET nome = ?, email = ?, telefone = ?, endereco = ? WHERE cpf = ?`;
    db.run(query, [ nome,telefone, email, cpf, rg, genero, data_de_nascimento, cep, logradouro, numero, complemento, cidade, bairro, estado, numero_de_matrícul, curso, periodo, turno, nome_responsavel, telefone_responsavel, parentesco_responsavel, cpf_responsavel,   email_responsavel

    ], function (err) {
        if (err) {
            return res.status(500).send('Erro ao atualizar aluno.');
        }
        if (this.changes === 0) {
            return res.status(404).send('Aluno não encontrado.');
        }
        res.send('Aluno atualizado com sucesso.');
    });
});





// Teste para verificar se o servidor está rodando
app.get('/', (req, res) => {
    res.send('Servidor está rodando e tabelas criadas!');
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});