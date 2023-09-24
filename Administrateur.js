// Données fictives des salariés
const employees = [
    { name: "Alice", absences: 2, daysWorked: 20, sickLeaves: 1, paidLeaves: 1 },
    { name: "Bob", absences: 0, daysWorked: 22, sickLeaves: 0, paidLeaves: 2 },
    // Ajoutez plus de salariés ici
];

// Fonction pour afficher les données dans le tableau
function displayEmployees() {
    const table = document.getElementById("employeeTable");

    for (const employee of employees) {
        const row = table.insertRow(-1);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        const cell6 = row.insertCell(5);

        cell1.innerHTML = employee.name;
        cell2.innerHTML = employee.absences;
        cell3.innerHTML = employee.daysWorked;
        cell4.innerHTML = employee.sickLeaves;
        cell5.innerHTML = employee.paidLeaves;
        cell6.innerHTML = `<button onclick="validate('${employee.name}')">Valider</button>`;
    }
}

// Fonction pour valider les données d'un salarié
function validate(name) {
    alert(`Les données de ${name} ont été validées.`);
}

// Afficher les données lorsque la page est chargée
window.onload = displayEmployees;
