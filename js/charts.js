function drawChart(canvasId, x, y) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: x,
      datasets: [{
        label: 'Št. sporočil',
        data: y,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
