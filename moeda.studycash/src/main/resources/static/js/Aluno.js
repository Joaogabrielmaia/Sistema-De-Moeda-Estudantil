        const email = sessionStorage.getItem("email");
        if (!email) window.location.href = "Login.html";

        document.getElementById("alunoEmail").textContent = email;

        function carregarSaldo() {
            fetch(`http://localhost:8080/api/aluno/saldo/${email}`)
                .then(res => res.json())
                .then(data => {
                    document.getElementById("saldo").textContent = data + " moedas";
                })
                .catch(error => {
                    console.error("Erro ao carregar saldo:", error);
                    document.getElementById("saldo").textContent = "Erro ao carregar";
                });
        }

        function carregarVantagens() {
            fetch("http://localhost:8080/api/aluno/vantagens")
                .then(res => res.json())
                .then(data => {
                    const container = document.getElementById("vantagensContainer");
                    
                    if (data.length === 0) {
                        container.innerHTML = "<p>Nenhuma vantagem disponível no momento.</p>";
                        return;
                    }
                    
                    container.innerHTML = "";
                    data.forEach(v => {
                        const card = document.createElement("div");
                        card.className = "vantagem-card";
                        card.innerHTML = `
                            <img src="${v.imagemUrl || 'https://via.placeholder.com/300x180?text=Sem+Imagem'}" class="vantagem-imagem" alt="${v.nome}">
                            <div class="vantagem-content">
                                <h3 class="vantagem-title">${v.nome}</h3>
                                <div class="vantagem-empresa">
                                    <i class="fas fa-building"></i> ${v.empresaEmail}
                                </div>
                                <div class="vantagem-footer">
                                    <div class="vantagem-preco">${v.precoEmMoedas} moedas</div>
                                    <button class="btn btn-primary" onclick="trocar(${v.id})">
                                        <i class="fas fa-exchange-alt"></i> Trocar
                                    </button>
                                </div>
                            </div>
                        `;
                        container.appendChild(card);
                    });
                })
                .catch(error => {
                    console.error("Erro ao carregar vantagens:", error);
                    document.getElementById("vantagensContainer").innerHTML = 
                        "<p>Erro ao carregar as vantagens. Tente novamente mais tarde.</p>";
                });
        }

        function trocar(idVantagem) {
            if (!confirm("Deseja realmente trocar suas moedas por esta vantagem?")) return;
            
            fetch("http://localhost:8080/api/aluno/trocar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, idVantagem })
            })
                .then(res => {
                    if (!res.ok) {
                        return res.text().then(t => { throw new Error(t) });
                    }
                    return res.text();
                })
                .then(cupom => {
                    alert(`Troca realizada com sucesso!\n\nCódigo do cupom: ${cupom}\n\nAnote este código para resgatar sua vantagem.`);
                    carregarSaldo();
                    carregarVantagens();
                    carregarHistorico();
                })
                .catch(err => {
                    alert("Erro ao realizar troca: " + err.message);
                });
        }

        function carregarHistorico() {
            fetch(`http://localhost:8080/api/aluno/trocas/${email}`)
                .then(res => res.json())
                .then(data => {
                    const table = document.querySelector("#trocasTable");
                    
                    if (data.length === 0) {
                        table.innerHTML = '<tr><td colspan="5">Nenhuma troca realizada ainda.</td></tr>';
                        return;
                    }
                    
                    table.innerHTML = "";
                    data.forEach(t => {
                        const tr = document.createElement("tr");
                        tr.innerHTML = `
                            <td>${t.vantagem}</td>
                            <td>${t.empresa}</td>
                            <td>${new Date(t.data).toLocaleDateString()}</td>
                            <td>${t.custo} moedas</td>
                            <td><span class="cupom-code">${t.codigoCupom}</span></td>
                        `;
                        table.appendChild(tr);
                    });
                })
                .catch(error => {
                    console.error("Erro ao carregar histórico:", error);
                    document.querySelector("#trocasTable").innerHTML = 
                        '<tr><td colspan="5">Erro ao carregar histórico de trocas.</td></tr>';
                });
        }

        carregarSaldo();
        carregarVantagens();
        carregarHistorico();