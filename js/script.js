/**
 * Portfolio Selim Serik 2026
 * Script voor het visualiseren van lesevaluaties via Chart.js
 */

const ctx = document.getElementById('myChart');

// De data is direct gebaseerd op Portfolio V10.4 en bijlagen 11 & 12
const evaluationChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['BPV-Begeleiding', 'SLB-Begeleiding', 'Vakinhoudelijk/Lesgeven'],
        datasets: [{
            label: 'Gemiddelde Score (1-5)',
            // 4.6 komt uit de BPV-evaluatie (Bijlage 11)
            // 4.3 en 4.4 zijn gebaseerd op de SLB-evaluatie (Bijlage 12)
            data: [4.6, 4.3, 4.4], 
            backgroundColor: [
                '#38bdf8', // Lichtblauw (Samen-Boven stijl)
                '#0ea5e9', 
                '#0284c7'
            ],
            borderColor: '#f8fafc',
            borderWidth: 1,
            borderRadius: 5
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: 'white',
                    font: { size: 14 }
                }
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    // Voegt een extra regel toe aan de tooltip voor bewijsvoering
                    afterLabel: function(context) {
                        const labels = [
                            'Zie Bijlage 11: BPV-Evaluatie', 
                            'Zie Bijlage 12: SLB-Evaluatie', 
                            'Zie Bijlage 5: Collega Feedback'
                        ];
                        return labels[context.dataIndex];
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 5,
                ticks: { 
                    color: 'white',
                    stepSize: 1
                },
                grid: { 
                    color: '#334155' 
                },
                title: {
                    display: true,
                    text: 'Waardering studenten',
                    color: 'white'
                }
            },
            x: {
                ticks: { 
                    color: 'white',
                    font: { weight: 'bold' }
                },
                grid: { 
                    display: false 
                }
            }
        },
        // Maakt de staven aanklikbaar om direct de PDF te openen
        onClick: (e) => {
            const points = evaluationChart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
            if (points.length) {
                const firstPoint = points[0];
                const label = evaluationChart.data.labels[firstPoint.index];
                
                // Koppeling naar de mappenstructuur assets/docs/
                if (label === 'BPV-Begeleiding') {
                    window.open('assets/docs/Bijlage_11_BPV_Evaluatie.pdf', '_blank');
                } else if (label === 'SLB-Begeleiding') {
                    window.open('assets/docs/Bijlage_12_SLB_Evaluatie.pdf', '_blank');
                }
            }
        }
    }
});
