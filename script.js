// Charts with COLORS (finally not depressing)

let chart1 = new Chart(document.getElementById("chart1"), {
    type: 'doughnut',
    data: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [
                '#ff6384',
                '#36a2eb',
                '#ffce56',
                '#4bc0c0',
                '#9966ff',
                '#ff9f40'
            ]
        }]
    }
});

let chart2 = new Chart(document.getElementById("chart2"), {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Sales',
            data: [],
            backgroundColor: '#36a2eb'
        }]
    }
});

let chart3 = new Chart(document.getElementById("chart3"), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Profit',
            data: [],
            borderColor: '#00ffcc',
            fill: false
        }]
    }
});

// Fetch USER data (clean logic)

async function fetchData() {

    const res = await fetch('https://dummyjson.com/users');
    const json = await res.json();
    const users = json.users;

    let totalUsers = users.length;
    let totalSales = 0;
    let totalProfit = 0;

    let departmentMap = {};

    users.forEach(u => {

        let randomFactor = Math.floor(Math.random() * 20);

        totalSales += u.age + randomFactor;
        totalProfit += (u.age + randomFactor) * 0.5;

        let dept = u.company.department;

        if (!departmentMap[dept]) {
            departmentMap[dept] = 0;
        }

        departmentMap[dept] += u.age + randomFactor;
    });

    document.getElementById("sales").innerText = (totalSales / 10).toFixed(1) + "K";
    document.getElementById("quantity").innerText = totalUsers;
    document.getElementById("profit").innerText = (totalProfit / 10).toFixed(1) + "K";

    let labels = Object.keys(departmentMap);
    let values = Object.values(departmentMap);

    chart1.data.labels = labels;
    chart1.data.datasets[0].data = values;

    chart2.data.labels = labels;
    chart2.data.datasets[0].data = values;

    chart3.data.labels = labels;
    chart3.data.datasets[0].data = values.map(v => v * 0.5);

    chart1.update();
    chart2.update();
    chart3.update();
}   

// Button trigger
function updateData() {
    fetchData();
}

// Initial load
fetchData();