document.addEventListener('DOMContentLoaded', function () {

    updateStats();


    initCharts();


    setInterval(updateStats, 5000);
});

function updateStats() {

    document.getElementById('total-alunos').textContent = Math.floor(1200 + Math.random() * 100).toLocaleString();
    document.getElementById('total-empresas').textContent = Math.floor(40 + Math.random() * 5);
    document.getElementById('total-moedas').textContent = Math.floor(85000 + Math.random() * 2000).toLocaleString();
    document.getElementById('total-beneficios').textContent = Math.floor(320 + Math.random() * 20);
}

function initCharts() {

    const moedasCtx = document.getElementById('moedasChart').getContext('2d');
    const moedasChart = new Chart(moedasCtx, {
        type: 'doughnut',
        data: {
            labels: ['Excelência Acadêmica', 'Participação em Eventos', 'Comportamento', 'Projetos Especiais'],
            datasets: [{
                data: [35, 25, 20, 20],
                backgroundColor: [
                    '#3498db',
                    '#2ecc71',
                    '#f39c12',
                    '#e74c3c'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });


    const resgatesCtx = document.getElementById('resgatesChart').getContext('2d');
    const resgatesChart = new Chart(resgatesCtx, {
        type: 'bar',
        data: {
            labels: ['Descontos', 'Cursos', 'Livros', 'Eventos', 'Outros'],
            datasets: [{
                label: 'Resgates',
                data: [45, 30, 25, 15, 10],
                backgroundColor: '#3498db',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}