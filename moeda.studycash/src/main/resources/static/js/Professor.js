        const professorEmail = sessionStorage.getItem('email') || prompt("Informe seu e-mail para simular login:");
        document.getElementById('professorEmail').textContent = professorEmail;

        function carregarSaldo() {
            fetch(`http://localhost:8080/api/professor/saldo/${professorEmail}`)
                .then(response => response.json())
                .then(saldo => {
                    document.getElementById('saldo').textContent = saldo + ' moedas';
                })
                .catch(error => {
                    console.error('Erro ao carregar saldo:', error);
                    document.getElementById('saldo').textContent = 'Erro ao carregar';
                });
        }

        function carregarExtrato() {
            fetch(`http://localhost:8080/api/professor/transacoes/${professorEmail}`)
                .then(response => response.json())
                .then(transacoes => {
                    const extrato = document.getElementById('extrato');
                    
                    if (transacoes.length === 0) {
                        extrato.innerHTML = '<p>Nenhuma transação encontrada.</p>';
                        return;
                    }
                    
                    extrato.innerHTML = '';
                    transacoes.forEach(t => {
                        const transactionDiv = document.createElement('div');
                        transactionDiv.className = 'transaction';
                        
                        transactionDiv.innerHTML = `
                            <div class="transaction-header">
                                <span><strong>Para:</strong> ${t.alunoEmail}</span>
                                <span class="transaction-amount">-${t.quantidade} moedas</span>
                            </div>
                            <div class="transaction-date">${new Date(t.data).toLocaleString()}</div>
                            <div class="transaction-message">
                                <strong>Mensagem:</strong> ${t.mensagem}
                            </div>
                        `;
                        
                        extrato.appendChild(transactionDiv);
                    });
                })
                .catch(error => {
                    console.error('Erro ao carregar extrato:', error);
                    extrato.innerHTML = '<p>Erro ao carregar transações.</p>';
                });
        }

        document.getElementById('formEnvio').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const dados = {
                professorEmail,
                alunoEmail: formData.get('alunoEmail'),
                quantidade: parseInt(formData.get('quantidade')),
                mensagem: formData.get('mensagem')
            };

            fetch('http://localhost:8080/api/professor/enviar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Erro ao enviar moedas');
                }
            })
            .then(msg => {
                alert(msg);
                carregarSaldo();
                carregarExtrato();
                this.reset();
            })
            .catch(error => {
                alert(error.message);
            });
        });

        carregarSaldo();
        carregarExtrato();