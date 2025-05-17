document.addEventListener('DOMContentLoaded', () => {

    const empresaForm = document.getElementById('empresa-form');
    const vantagensContainer = document.getElementById('vantagens-container');
    const addVantagemBtn = document.getElementById('add-vantagem');
    const refreshBtn = document.getElementById('refresh-btn');
    const empresasList = document.getElementById('empresas-list');
    const cancelBtn = document.getElementById('cancel-btn');
    const submitBtn = document.getElementById('submit-btn');

    const API_URL = 'http://localhost:8080/api/empresas';

    addVantagemBtn.addEventListener('click', () => {
        const vantagemId = Date.now();

        const div = document.createElement('div');
        div.className = 'vantagem-item';
        div.dataset.id = vantagemId;

        div.innerHTML = `
    <div class="form-section">
        <h4>Vantagem #${document.querySelectorAll('.vantagem-item').length + 1}</h4>
        
        <div class="form-group">
            <label>Descrição*</label>
            <input type="text" class="vantagem-descricao" required placeholder="Ex: Desconto de 20%">
        </div>
        
        <div class="form-group">
            <label>Custo em Moedas*</label>
            <input type="number" class="vantagem-custo" required min="0" step="1" placeholder="Ex: 50">
        </div>
        
        <div class="form-group">
            <label>URL da Imagem</label>
            <input type="text" class="vantagem-foto" placeholder="Cole a URL da imagem">
        </div>
        
        <div class="form-group">
            <button type="button" class="remove-vantagem">Remover Vantagem</button>
        </div>
    </div>
`;

        vantagensContainer.appendChild(div);
    });

    vantagensContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-vantagem')) {
            e.target.closest('.vantagem-item').remove();
            atualizarNumeracaoVantagens();
        }
    });

    function coletarVantagens() {
        return Array.from(document.querySelectorAll('.vantagem-item')).map(item => ({
            descricao: item.querySelector('.vantagem-descricao').value,
            custoMoedas: parseFloat(item.querySelector('.vantagem-custo').value),
            fotoProduto: item.querySelector('.vantagem-foto').value || null
        }));
    }

    function validarFormulario() {
    const camposObrigatorios = [
        'empresa-nome',
        'empresa-cnpj',
        'empresa-email',
        'empresa-endereco'
    ];

    for (const campoId of camposObrigatorios) {
        const campo = document.getElementById(campoId);
        if (!campo.value.trim()) {
            alert(`O campo "${campo.previousElementSibling.textContent}" é obrigatório!`);
            campo.focus();
            return false;
        }
    }

    const cnpj = document.getElementById('empresa-cnpj').value.replace(/\D/g, '');
    if (cnpj.length !== 14) {
        alert('CNPJ deve ter exatamente 14 dígitos numéricos!');
        document.getElementById('empresa-cnpj').focus();
        return false;
    }

    if (document.querySelectorAll('.vantagem-item').length === 0) {
        alert('Adicione pelo menos uma vantagem!');
        return false;
    }

    return true;
}

    function atualizarNumeracaoVantagens() {
        document.querySelectorAll('.vantagem-item h4').forEach((titulo, index) => {
            titulo.textContent = `Vantagem #${index + 1}`;
        });
    }

    function resetForm() {
        empresaForm.reset();
        document.getElementById('empresa-id').value = '';
        document.querySelectorAll('.vantagem-item').forEach(item => item.remove());
        submitBtn.textContent = 'Cadastrar Empresa';
    }

    async function carregarEmpresas() {
        try {
            const response = await fetch(API_URL);
            const empresas = await response.json();

            empresasList.innerHTML = '';

            empresas.forEach(empresa => {
                const li = document.createElement('li');
                li.className = 'empresa-item';
                li.innerHTML = `
                    <div class="empresa-header">
                        <div>
                            <strong>${empresa.nome}</strong>
                            <small>CNPJ: ${empresa.cnpj}</small>
                        </div>
                        <div class="empresa-actions">
                            <button class="btn-editar" data-id="${empresa.id}">Editar</button>
                            <button class="btn-excluir" data-id="${empresa.id}">Excluir</button>
                        </div>
                    </div>
                    <div class="empresa-details">
                        <div><i class="fas fa-envelope"></i> ${empresa.email}</div>
                        <div><i class="fas fa-map-marker-alt"></i> ${empresa.endereco}</div>
                        <div><i class="fas fa-gift"></i> ${empresa.vantagens.length} vantagens</div>
                    </div>
                `;
                empresasList.appendChild(li);
            });

            document.querySelectorAll('.btn-editar').forEach(btn => {
                btn.addEventListener('click', () => editarEmpresa(btn.dataset.id));
            });

            document.querySelectorAll('.btn-excluir').forEach(btn => {
                btn.addEventListener('click', () => excluirEmpresa(btn.dataset.id));
            });

            document.querySelectorAll('.btn-pagar').forEach(btn => {
                btn.addEventListener('click', () => pagarEmpresa(btn.dataset.id));
            });

        } catch (error) {
            console.error('Erro ao carregar empresas:', error);
            alert('Erro ao carregar empresas. Verifique o console para mais detalhes.');
        }
    }

    async function editarEmpresa(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) throw new Error('Empresa não encontrada');

            const empresa = await response.json();

            document.getElementById('empresa-id').value = empresa.id;
            document.getElementById('empresa-nome').value = empresa.nome;
            document.getElementById('empresa-cnpj').value = empresa.cnpj;
            document.getElementById('empresa-email').value = empresa.email;
            document.getElementById('empresa-endereco').value = empresa.endereco;

            document.querySelectorAll('.vantagem-item').forEach(item => item.remove());

            empresa.vantagens.forEach(vantagem => {
                addVantagemBtn.click();
                const lastVantagem = document.querySelector('.vantagem-item:last-child');
                lastVantagem.querySelector('.vantagem-descricao').value = vantagem.descricao;
                lastVantagem.querySelector('.vantagem-custo').value = vantagem.custoMoedas;
                lastVantagem.querySelector('.vantagem-foto').value = vantagem.fotoProduto || '';
            });

            submitBtn.textContent = 'Atualizar Empresa';

            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (error) {
            console.error('Erro ao editar empresa:', error);
            alert(`Erro ao carregar empresa para edição: ${error.message}`);
        }
    }

    async function excluirEmpresa(id) {
        if (!confirm('Tem certeza que deseja excluir esta empresa?')) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Erro ao excluir empresa');

            alert('Empresa excluída com sucesso!');
            carregarEmpresas();

        } catch (error) {
            console.error('Erro ao excluir empresa:', error);
            alert(`Erro ao excluir empresa: ${error.message}`);
        }
    }

    async function pagarEmpresa(id) {

        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) throw new Error('Empresa não encontrada');

            const empresa = await response.json();


            alert(`Iniciando processo de pagamento para: ${empresa.nome}\n\nVocê será redirecionado para o gateway de pagamento.`);

            console.log('Processando pagamento para:', empresa);

        } catch (error) {
            console.error('Erro ao processar pagamento:', error);
            alert(`Erro ao processar pagamento: ${error.message}`);
        }
    }

    empresaForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    const empresaId = document.getElementById('empresa-id').value;
    const metodo = empresaId ? 'PUT' : 'POST';
    const url = empresaId ? `${API_URL}/${empresaId}` : API_URL;

    const empresa = {
        nome: document.getElementById('empresa-nome').value,
        cnpj: document.getElementById('empresa-cnpj').value.replace(/\D/g, ''), // Remove formatação
        email: document.getElementById('empresa-email').value,
        endereco: document.getElementById('empresa-endereco').value,
        vantagens: coletarVantagens()
    };

        try {
            const response = await fetch(url, {
                method: metodo,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(empresa)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro na requisição');
            }

            const data = await response.json();
            console.log('Sucesso:', data);
            alert(`Empresa ${empresaId ? 'atualizada' : 'cadastrada'} com sucesso!`);

            resetForm();
            carregarEmpresas();

        } catch (error) {
            console.error('Erro:', error);
            alert(`Erro: ${error.message}`);
        }
    });

    refreshBtn.addEventListener('click', carregarEmpresas);
    cancelBtn.addEventListener('click', resetForm);

    carregarEmpresas();
});

// Validação do CNPJ
const cnpjInput = document.getElementById('empresa-cnpj');

cnpjInput.addEventListener('input', function(e) {
    // Remove tudo que não é dígito
    let value = this.value.replace(/\D/g, '');
    
    // Limita a 14 caracteres
    if (value.length > 14) {
        value = value.substring(0, 14);
    }
    
    // Atualiza o valor do campo
    this.value = value;
});

// Opcional: Adicionar máscara visual (formatação)
cnpjInput.addEventListener('keyup', function(e) {
    let value = this.value.replace(/\D/g, '');
    
    // Aplica a máscara: 00.000.000/0000-00
    if (value.length > 12) {
        value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
    } else if (value.length > 8) {
        value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})$/, '$1.$2.$3/$4');
    } else if (value.length > 5) {
        value = value.replace(/^(\d{2})(\d{3})(\d{3})$/, '$1.$2.$3');
    } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{3})$/, '$1.$2');
    }
    
    this.value = value;
});