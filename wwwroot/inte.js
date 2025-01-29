// script.js

const API_URL = 'https://api.exchangerate-api.com/v4/latest/BRL'; // Exemplo de API para taxas de câmbio

// Função para carregar as taxas de câmbio e desenhar o gráfico
async function loadExchangeRates() {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.rates;
}

// Função para criar o gráfico de taxas de câmbio
async function createChart() {
    const rates = await loadExchangeRates();

    const ctx = document.getElementById('exchangeRateChart').getContext('2d');

    const currencies = Object.keys(rates);
    const ratesValues = Object.values(rates);

    const exchangeRateChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: currencies,
            datasets: [{
                label: 'Taxas de Câmbio em Relação ao BRL',
                data: ratesValues,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Taxa de Câmbio'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Moedas'
                    }
                }
            }
        }
    });
}

// Função para converter moedas
document.getElementById('converter-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    
    // Exemplo simples de conversão de moedas
    const exchangeRates = {
        'BRL': { 'USD': 0.19, 'EUR': 0.18, 'JPY': 25.07 },
        'USD': { 'BRL': 5.29, 'EUR': 0.94, 'JPY': 132.78 },
        'EUR': { 'BRL': 5.57, 'USD': 1.06, 'JPY': 140.72 },
        'JPY': { 'BRL': 0.04, 'USD': 0.0075, 'EUR': 0.0071 }
    };

    // Validação da moeda
    if (!exchangeRates[fromCurrency] || !exchangeRates[fromCurrency][toCurrency]) {
        document.getElementById('result').innerText = "Conversão não disponível.";
        return;
    }

    const result = amount * exchangeRates[fromCurrency][toCurrency];
    document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
});

// Carregar o gráfico ao iniciar a página
document.addEventListener('DOMContentLoaded', createChart);
