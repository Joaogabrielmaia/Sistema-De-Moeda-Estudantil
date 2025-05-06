const API_URL = 'http://localhost:8080/api/alunos';
    const INSTITUICOES_URL = `${API_URL}/instituicoes`;
    
    // Elementos do DOM
    const form = document.getElementById('aluno-form');
    const idInput = document.getElementById('aluno-id');
    const nomeInput = document.getElementById('aluno-nome');
    const emailInput = document.getElementById('aluno-email');
    const cpfInput = document.getElementById('aluno-cpf');
    const rgInput = document.getElementById('aluno-rg');
    const enderecoInput = document.getElementById('aluno-endereco');
    const cursoInput = document.getElementById('aluno-curso');
    const instituicaoSelect = document.getElementById('aluno-instituicao');
    const submitBtn = document.getElementById('submit-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const refreshBtn = document.getElementById('refresh-btn');
    const alunosList = document.getElementById('alunos-list');
    
    let isEditing = false;
    let instituicoes = [];
    
    // Inicialização
    document.addEventListener('DOMContentLoaded', () => {
        carregarInstituicoes();
        carregarAlunos();
        
        // Máscara para CPF
        cpfInput.addEventListener('input', formatarCPF);
    });
    
    // Eventos
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const alunoData = {
            nome: nomeInput.value,
            email: emailInput.value,
            cpf: cpfInput.value.replace(/\D/g, ''),
            rg: rgInput.value,
            endereco: enderecoInput.value,
            curso: cursoInput.value,
            instituicao: instituicaoSelect.value
        };
        
        try {
            if (isEditing) {
                await atualizarAluno(idInput.value, alunoData);
            } else {
                await cadastrarAluno(alunoData);
            }
            resetForm();
            carregarAlunos();
        } catch (error) {
            console.error('Erro:', error);
            alert('Ocorreu um erro. Verifique o console para mais detalhes.');
        }
    });
    
    cancelBtn.addEventListener('click', resetForm);
    refreshBtn.addEventListener('click', carregarAlunos);
    
    // Funções
    function formatarCPF(e) {
        let cpf = e.target.value.replace(/\D/g, '');
        
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        
        e.target.value = cpf;
    }
    
    async function carregarInstituicoes() {
        try {
            const response = await fetch(INSTITUICOES_URL);
            instituicoes = await response.json();
            
            instituicaoSelect.innerHTML = '<option value="">Selecione uma instituição</option>';
            
            instituicoes.forEach(instituicao => {
                const option = document.createElement('option');
                option.value = instituicao;
                option.textContent = instituicao;
                instituicaoSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Erro ao carregar instituições:', error);
        }
    }
    
    async function carregarAlunos() {
        try {
            const response = await fetch(API_URL);
            const alunos = await response.json();
            
            alunosList.innerHTML = '';
            
            if (alunos.length === 0) {
                alunosList.innerHTML = '<li>Nenhum aluno cadastrado</li>';
                return;
            }
            
            alunos.forEach(aluno => {
                const li = document.createElement('li');
                li.className = 'aluno-card';
                
                li.innerHTML = `
                    <div class="aluno-header">
                        <span class="aluno-nome">${aluno.nome}</span>
                        <div class="aluno-actions">
                            <button class="action-btn edit-btn" data-id="${aluno.id}">Editar</button>
                            <button class="action-btn delete-btn" data-id="${aluno.id}">Excluir</button>
                        </div>
                    </div>
                    <div class="aluno-details">
                        <div class="detail-item">
                            <span class="detail-label">E-mail</span>
                            <span class="detail-value">${aluno.email}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">CPF</span>
                            <span class="detail-value">${formatarCPFDisplay(aluno.cpf)}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">RG</span>
                            <span class="detail-value">${aluno.rg}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Curso</span>
                            <span class="detail-value">${aluno.curso}</span>
                        </div>
                        <div class="instituicao-info">
                            <span class="detail-label">Instituição</span>
                            <span class="detail-value">${aluno.instituicao}</span>
                        </div>
                    </div>
                `;
                
                alunosList.appendChild(li);
            });
            
            // Adicionar eventos aos botões
            document.querySelectorAll('.edit-btn').forEach(btn => {
                btn.addEventListener('click', () => editarAluno(btn.dataset.id));
            });
            
            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', () => deletarAluno(btn.dataset.id));
            });
            
        } catch (error) {
            console.error('Erro ao carregar alunos:', error);
        }
    }
    
    function formatarCPFDisplay(cpf) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    
    async function cadastrarAluno(alunoData) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: alunoData.nome,
                    email: alunoData.email,
                    cpf: alunoData.cpf,
                    rg: alunoData.rg,
                    endereco: alunoData.endereco,
                    curso: alunoData.curso,
                    instituicao: alunoData.instituicao // Garantir que está sendo enviado
                })
            });
            
            if (!response.ok) {
                throw new Error('Erro ao cadastrar aluno');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }
    
    async function atualizarAluno(id, alunoData) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: alunoData.nome,
                email: alunoData.email,
                cpf: alunoData.cpf,
                rg: alunoData.rg,
                endereco: alunoData.endereco,
                curso: alunoData.curso,
                instituicao: alunoData.instituicao
            })
        });
        
        if (!response.ok) {
            throw new Error('Erro ao atualizar aluno');
        }
        
        return await response.json();
    }
    
    async function deletarAluno(id) {
        if (confirm('Tem certeza que deseja excluir este aluno?')) {
            try {
                await fetch(`${API_URL}/${id}`, {
                    method: 'DELETE'
                });
                carregarAlunos();
            } catch (error) {
                console.error('Erro ao deletar aluno:', error);
            }
        }
    }
    
    async function editarAluno(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            const aluno = await response.json();
            
            idInput.value = aluno.id;
            nomeInput.value = aluno.nome;
            emailInput.value = aluno.email;
            cpfInput.value = formatarCPFDisplay(aluno.cpf);
            rgInput.value = aluno.rg;
            enderecoInput.value = aluno.endereco;
            cursoInput.value = aluno.curso;
            instituicaoSelect.value = aluno.instituicao;
            
            submitBtn.textContent = 'Atualizar';
            cancelBtn.style.display = 'block';
            isEditing = true;
            
            // Rolando para o formulário
            document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error('Erro ao buscar aluno para edição:', error);
        }
    }
    
    function resetForm() {
        form.reset();
        idInput.value = '';
        submitBtn.textContent = 'Cadastrar';
        cancelBtn.style.display = 'none';
        isEditing = false;
    }