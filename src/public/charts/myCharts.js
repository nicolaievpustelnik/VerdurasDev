
let ctx = document.getElementById("myChart").getContext("2d");
let myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ['Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
            {
                label: 'Ganancias',
                data: [40, 90, 65, 35, 50, 80],
                backgroundColor: 'rgb(42, 159, 214, 0.7)',
                borderWidth: 2,
                borderRadius: 90,
                borderSkipped: false,
            },
            {
                label: 'Perdidas',
                data: [15, 45, 25, 15, 20, 30],
                backgroundColor: 'rgb(204, 0, 0, 0.7)',
                borderWidth: 2,
                borderRadius: 90,
                borderSkipped: false,
            }]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    color: "rgb(173, 175, 174)",
                    font: {
                        size: 16
                    }
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    color: "rgb(173, 175, 174)",
                    font: {
                        size: 13,
                    }
                }
            },
            x: {
                ticks: {
                    color: "rgb(173, 175, 174)",
                    font: {
                        size: 12
                    }
                }
            }
        }
    }
});

let ctx2 = document.getElementById("myChart2").getContext("2d");
let myChart2 = new Chart(ctx2, {
    type: "pie",
    data: {
        labels: ['Frutas', 'Verduras', 'Liquidos', 'Condimentos', 'Huevos', 'Otros'],
        datasets: [{
            data: [40, 90, 65, 35, 50, 80],
            backgroundColor: [
                'rgb(42, 159, 214)',
                'rgb(153, 51, 204)',
                'rgb(119, 179, 0)',
                'rgb(255, 136, 0)',
                'rgb(204, 0, 0)',
                'rgb(237, 0, 131)',
            ],
        }]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    color: "rgb(173, 175, 174)",
                    font: {
                        size: 20
                    }
                }
            }
        }
    }
});

