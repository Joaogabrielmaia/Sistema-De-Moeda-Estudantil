        const empresaEmail = localStorage.getItem('email') || prompt("Informe o e-mail da empresa para simular login:");
        localStorage.setItem('email', empresaEmail);
        document.getElementById('empresaEmail').textContent = empresaEmail;

        function carregarVantagens() {
            fetch(`http://localhost:8080/api/vantagens/empresa/${empresaEmail}`)
                .then(response => response.json())
                .then(vantagens => {
                    const lista = document.getElementById('listaVantagens');
                    
                    if (vantagens.length === 0) {
                        lista.innerHTML = `
                            <div class="empty-state">
                                <i class="fas fa-box-open"></i>
                                <p>Nenhuma vantagem cadastrada ainda</p>
                            </div>
                        `;
                        return;
                    }
                    
                    lista.innerHTML = '';
                    vantagens.forEach(v => {
                        const card = document.createElement('div');
                        card.className = 'vantagem-card';
                        card.innerHTML = `
                            <img src="${v.imagemUrl}" class="vantagem-imagem" onerror="this.src='https://via.placeholder.com/300x180?text=Imagem+Indispon%C3%ADvel'">
                            <div class="vantagem-body">
                                <h3 class="vantagem-nome">${v.nome}</h3>
                                <div class="vantagem-preco">${v.precoEmMoedas} moedas</div>
                                <div class="vantagem-acoes">
                                    <button class="btn btn-success btn-sm" onclick="editar(${v.id}, '${v.nome.replace(/'/g, "\\'")}', '${v.imagemUrl.replace(/'/g, "\\'")}', ${v.precoEmMoedas})">
                                        <i class="fas fa-edit"></i> Editar
                                    </button>
                                    <button class="btn btn-danger btn-sm" onclick="excluir(${v.id})">
                                        <i class="fas fa-trash-alt"></i> Excluir
                                    </button>
                                </div>
                            </div>
                        `;
                        lista.appendChild(card);
                    });
                })
                .catch(error => {
                    console.error('Erro ao carregar vantagens:', error);
                    document.getElementById('listaVantagens').innerHTML = `
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle"></i>
                            <p>Erro ao carregar vantagens</p>
                        </div>
                    `;
                });
        }

        function editar(id, nome, imagemUrl, precoEmMoedas) {
            const novoNome = prompt("Novo nome:", nome);
            if (novoNome === null) return;
            
            const novaImagem = prompt("Nova imagem URL:", imagemUrl);
            if (novaImagem === null) return;
            
            const novoPreco = prompt("Novo preço em moedas:", precoEmMoedas);
            if (novoPreco === null) return;

            fetch(`http://localhost:8080/api/vantagens/editar/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    nome: novoNome, 
                    imagemUrl: novaImagem, 
                    precoEmMoedas: parseInt(novoPreco), 
                    empresaEmail 
                })
            })
            .then(response => response.text())
            .then(() => {
                carregarVantagens();
            })
            .catch(error => {
                console.error('Erro ao editar vantagem:', error);
                alert('Erro ao editar vantagem');
            });
        }

        function excluir(id) {
            if (!confirm('Tem certeza que deseja excluir esta vantagem?')) return;
            
            fetch(`http://localhost:8080/api/vantagens/excluir/${id}`, {
                method: 'DELETE'
            })
            .then(response => response.text())
            .then(() => {
                carregarVantagens();
            })
            .catch(error => {
                console.error('Erro ao excluir vantagem:', error);
                alert('Erro ao excluir vantagem');
            });
        }

        document.getElementById('formVantagem').addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            const dados = {};
            formData.forEach((v, k) => dados[k] = v);
            dados.empresaEmail = empresaEmail;

            fetch('http://localhost:8080/api/vantagens/cadastrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            })
            .then(response => response.text())
            .then(() => {
                this.reset();
                carregarVantagens();
            })
            .catch(error => {
                console.error('Erro ao cadastrar vantagem:', error);
                alert('Erro ao cadastrar vantagem');
            });
        });

        carregarVantagens();