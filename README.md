<img width=100% src="https://capsule-render.vercel.app/api?type=waving&color=34495e&height=120&section=header"/>

[![Typing SVG](https://readme-typing-svg.herokuapp.com/?color=fff&size=35&center=true&vCenter=true&width=1000&lines=Study+Cash)](https://git.io/typing-svg)

# Diagrama de Caso de Uso
<img width="2992" alt="Image" src="/Artefatos/Diagramas/Diagrama de Caso de Uso.png" />

# Diagrama de Classe
<img width="2992" alt="Image" src="/Artefatos/Diagramas/Diagrama de Classes.png" />

# Diagrama ER
<img width="2992" alt="Image" src="/Artefatos/Diagramas/Diagrama ER.png" />

# Diagrama de Componentes
<img width="2992" alt="Image" src="https://github.com/user-attachments/assets/68119d09-9121-4100-80de-27c81c10d661" />

# Histórias de Usuário
| ID  | História de Usuário |
|----|--------------------|
| UC1  | Como aluno, quero me cadastrar no sistema, para que eu possa participar do programa de mérito estudantil. |
| UC2  | Como aluno, quero fazer login com meu email e senha, para acessar minha conta com segurança. |
| UC3  | Como aluno, quero receber moedas de professores, para que meu bom desempenho seja reconhecido. |
| UC4  | Como aluno, quero receber notificações por email quando ganhar moedas, para acompanhar meu reconhecimento. |
| UC5  | Como aluno, quero consultar meu extrato de moedas, para visualizar meu saldo e histórico de transações. |
| UC6  | Como aluno, quero trocar minhas moedas por vantagens, para obter benefícios como descontos e produtos. |
| UC7  | Como aluno, quero receber por email um cupom com código ao trocar moedas, para utilizar na empresa parceira. |
| UC8  | Como professor, quero estar pré-cadastrado pela instituição, para que meu acesso ao sistema já esteja disponível. | 
| UC9  | Como professor, quero fazer login com minhas credenciais, para gerenciar o envio de moedas. | 
| UC10  | Como professor, quero receber 1.000 moedas a cada semestre com saldo acumulável, para distribuir aos alunos. |
| UC11  | Como professor, quero enviar moedas a um aluno com um motivo obrigatório, para reconhecer seu desempenho de forma personalizada. |
| UC12  | Como professor, quero consultar meu extrato de envios, para acompanhar meu saldo e as transações realizadas. |
| UC13  | Como empresa parceira, quero me cadastrar no sistema, para oferecer vantagens aos alunos. |
| UC14  | Como empresa parceira, quero fazer login com segurança, para acessar minha área e gerenciar vantagens. |
| UC15  | Como empresa parceira, quero cadastrar vantagens com descrição, foto e custo, para que os alunos possam trocá-las por moedas. |
| UC16  | Como empresa parceira, quero receber por email o cupom e código das trocas realizadas pelos alunos, para validar a troca. |
| UC17  | Como usuário do sistema, quero realizar login com autenticação, para garantir a segurança das ações no sistema. | 
| UC18  | Como administrador, quero que o sistema envie notificações automáticas por email, para manter os usuários informados sobre ações importantes. | 
| UC19  | Como usuário, quero que o sistema gere um código único para cada troca, para que o processo de conferência com as empresas seja confiável. |
| UC20  | Como administrador, quero manter um CRUD das instituições de ensino, para garantir que apenas instituições parceiras estejam disponíveis. | 
| UC21  | Como aluno, quero consultar as vantagens disponíveis para troca, para escolher as melhores opções conforme meu saldo. |

# Estrutura dos Diretórios

```
studycash/
│
└── src/
    │
    └── main/
        │
        ├── java/
        │   └── com/
        │       └── studycash/
        │               │
        │               ├── controller
        │               │   └── AlunoController.java
        │               │   └── EmpresaController.java
        │               │
        │               ├── dao
        │               │   └── AlunoDAO.java
        │               │   └── AlunoDAOImpl.java
        │               │   └── EmpresaDAO.java
        │               │   └── EmpresaDAOImpl.java
        │               │
        │               ├── model/
        │               │   └── AlunoDAO.java
        │               │   └── AlunoDAOImpl.java
        │               │   └── EmpresaDAO.java
        │               │   └── EmpresaDAOImpl.java
        │               │
        │               │
        │               ├── service/
        │               │   └── AlunoService.java
        │               │   └── EmpresaService.java
        │               │   
        │               │
        │               └── StudycashApplication.java
        │
        └── resources/
            │
            ├── application.properties
            │
            ├── static/
            │   ├── Aluno.html
            │   ├── Dashboard.html
            │   ├── Empresa.html
            │   │
            │   ├── css/
            │   │   ├── aluno.css
            │   │   ├── dashboard.css
            │   │   ├── empresa.css
            │   │   ├── navbar.css
            │   │
            │   └── js/
            │       ├── aluno.js
            │       ├── dashboard.js
            │       ├── empresa.js
            │       ├── navbar.js
```

# Link dos slides
https://www.canva.com/design/DAGn2Sy5p6g/6NceNi2YpmaalUo-rZddmw/edit?utm_content=DAGn2Sy5p6g&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

<img width=100% src="https://capsule-render.vercel.app/api?type=waving&color=34495db&height=120&section=footer"/>