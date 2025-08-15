async function cadastrarAluno(event) {
    event.preventDefault();

    const aluno = {
        
        nome: document.getElementById("aluno-nome").value,
        telefone: document.getElementById("aluno-telefone").value,
        email: document.getElementById("aluno-email").value,
        cpf: document.getElementById("aluno-cpf").value,
        rg: document.getElementById("aluno-rg").value,
        genero: document.getElementById("aluno-genero").value,
        data_de_nascimento: document.getElementById("aluno-data-nascimento").value,
        cep: document.getElementById("aluno-cep").value,
        logradouro: document.getElementById("aluno-logradouro").value,
        numero: document.getElementById("aluno-numero").value,
        complemento: document.getElementById("aluno-complemento").value,
        cidade: document.getElementById("aluno-cidade").value,
        bairro: document.getElementById("aluno-bairro").value,
        estado: document.getElementById("aluno-estado").value,
        numero_de_matricula: document.getElementById("aluno-matricula").value,
        curso: document.getElementById("aluno-curso").value,
        periodo: document.getElementById("aluno-periodo").value,
        turno: document.getElementById("aluno-turno").value,
        nome_responsavel: document.getElementById("resp0-nome").value,
        telefone_responsavel: document.getElementById("resp0-telefone").value,
        parentesco_responsavel: document.getElementById("resp0-parentesco").value,
        cpf_responsavel: document.getElementById("resp0-cpf").value,
        email_responsavel: document.getElementById("resp0-email").value
    }
       
    try {
        const response = await fetch('/aluno', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(aluno)
        });

        const result = await response.json();
        if (response.ok) {
            alert("Aluno cadastrado com sucesso!");
            document.getElementById("aluno-form").reset();
        } else {
            alert(`Erro: ${result.message}`);cpf
        }
    } catch (err) {
        console.error("Erro na solicitação:", err);
        alert("Erro ao cadastrar aluno.");
    }
}
// Função para listar todos os clientes ou buscar clientes por CPF
async function listarAlunos() {
    const cpf = document.getElementById('cpf').value.trim();  // Pega o valor do CPF digitado no input

    let url = '/aluno';  // URL padrão para todos os clientes

    if (cpf) {
        // Se CPF foi digitado, adiciona o parâmetro de consulta
        url += `?cpf=${cpf}`;
    }

    try {
        const response = await fetch(url);
        const aluno = await response.json();

        const tabela = document.getElementById('tabela-aluno');
        tabela.innerHTML = ''; // Limpa a tabela antes de preencher

        if (aluno.length === 0) {
            // Caso não encontre clientes, exibe uma mensagem
            tabela.innerHTML = '<tr><td colspan="6">Nenhum aluno encontrado.</td></tr>';
        } else {
            aluno.forEach(aluno => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${aluno.id}</td>
                    <td>${aluno.nome}</td>
                    <td>${aluno.cpf}</td>
                    <td>${aluno.email}</td>
                    <td>${aluno.telefone}</td>
                    <td>${aluno.endereco}</td>
                `;
                tabela.appendChild(linha);
            });
        }
    } catch (error) {
        console.error('Erro ao listar alunos:', error);
    }
}
// Função para atualizar as informações do cliente
async function atualizarAluno() {
    nome: document.getElementById("aluno-nome").value;
    telefone: document.getElementById("aluno-telefone").value;
    email: document.getElementById("aluno-email").value;
    cpf: document.getElementById("aluno-cpf").value;
    rg: document.getElementById("aluno-rg").value;
    genero: document.getElementById("aluno-genero").value;
    data_de_nascimento: document.getElementById("aluno-data-nascimento").value;
    cep: document.getElementById("aluno-cep").value;
    logradouro: document.getElementById("aluno-logradouro").value;
    numero: document.getElementById("aluno-numero").value;
    complemento: document.getElementById("aluno-complemento").value;
    cidade: document.getElementById("aluno-cidade").value;
    bairro: document.getElementById("aluno-bairro").value;
    estado: document.getElementById("aluno-estado").value;
    numero_de_matricula: document.getElementById("aluno-matricula").value;
    curso: document.getElementById("aluno-curso").value;
    periodo: document.getElementById("aluno-periodo").value;
    turno: document.getElementById("aluno-turno").value;
    nome_responsavel: document.getElementById("resp0-nome").value;
    telefone_responsavel: document.getElementById("resp0-telefone").value;
    parentesco_responsavel: document.getElementById("resp0-parentesco").value;
    cpf_responsavel: document.getElementById("resp0-cpf").value;
    email_responsavel: document.getElementById("resp0-email").value

    const alunoAtualizado = {
        nome,telefone, email, cpf, rg, genero, data_de_nascimento, cep, logradouro, numero, complemento, cidade, bairro, estado, numero_de_matricula, curso, periodo, turno, nome_responsavel, telefone_responsavel, parentesco_responsavel, cpf_responsavel,   email_responsavel

    };

    try {
        const response = await fetch(`/aluno/cpf/${cpf}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(alunoAtualizado)
        });

        if (response.ok) {
            alert('Aluno atualizado com sucesso!');
        } else {
            const errorMessage = await response.text();
            alert('Erro ao atualizar aluno: ' + errorMessage);
        }
    } catch (error) {
        console.error('Erro ao atualizar aluno:', error);
        alert('Erro ao atualizar aluno.');
    }
}


async function limpaAluno() {
    document.getElementById('aluno-nome').value = '';
    document.getElementById('aluno-data-nascimento').value = '';
    document.getElementById('aluno-cpf').value = '';
    document.getElementById('aluno-rg').value = '';
    document.getElementById('aluno-genero').value = '';
    document.getElementById('aluno-email').value = '';
    document.getElementById('aluno-cep').value = '';
    document.getElementById('aluno-logradouro').value = '';
    document.getElementById('aluno-numero').value = '';
    document.getElementById('aluno-complemento').value = '';
    document.getElementById('aluno-bairro').value = '';
    document.getElementById('aluno-cidade').value = '';
    document.getElementById('aluno-estado').value = '';
    document.getElementById('aluno-matricula').value = '';
    document.getElementById('aluno-curso').value = '';
    document.getElementById('aluno-periodo').value = '';
    document.getElementById('aluno-turno').value = '';
    document.getElementById('resp0-nome').value = '';
    document.getElementById('resp0-parentesco').value = '';
    document.getElementById('resp0-cpf').value = '';
    document.getElementById('resp0-telefone').value = '';
    document.getElementById('resp0-email').value = '';

}