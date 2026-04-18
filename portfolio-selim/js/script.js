new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['BPV', 'SLB', 'Lesgeven'],
        datasets: [{
            label: 'Score',
            data: [4.6, 4.2, 4.3],
            backgroundColor: ['#38bdf8', '#0ea5e9', '#0284c7']
        }]
    },
    options: {
        plugins: {
            legend: { labels: { color: 'white' } }
        },
        scales: {
            y: {
                ticks: { color: 'white' },
                grid: { color: '#334155' },
                max: 5
            },
            x: {
                ticks: { color: 'white' }
            }
        }
    }
});