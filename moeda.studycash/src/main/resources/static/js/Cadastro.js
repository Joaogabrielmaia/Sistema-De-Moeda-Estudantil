const tipoConta = document.getElementById('tipoConta');
        const alunoCampos = document.getElementById('alunoCampos');
        const professorCampos = document.getElementById('professorCampos');

        tipoConta.addEventListener('change', () => {
            if (tipoConta.value === 'Aluno') {
                alunoCampos.style.display = 'block';
                professorCampos.style.display = 'none';
            } else if (tipoConta.value === 'Professor') {
                alunoCampos.style.display = 'none';
                professorCampos.style.display = 'block';
            } else {
                alunoCampos.style.display = 'none';
                professorCampos.style.display = 'none';
            }
        });

        document.getElementById('formCadastro').addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => data[key] = value);

            fetch('http://localhost:8080/api/usuarios/cadastro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => response.text())
            .then(result => alert(result));
        });