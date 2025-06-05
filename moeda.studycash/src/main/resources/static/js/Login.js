document.getElementById('formLogin').addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => data[key] = value);

            fetch('http://localhost:8080/api/usuarios/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Credenciais inválidas');
                }
            })
            .then(usuario => {
                sessionStorage.setItem("email", usuario.email);
                if (usuario.tipoConta === 'Aluno') {
                    window.location.href = 'Aluno.html';
                } else if (usuario.tipoConta === 'Professor') {
                    window.location.href = 'Professor.html';
                } else {
                    window.location.href = 'Empresas.html';
                }
            })
            .catch(error => alert(error.message));
        });