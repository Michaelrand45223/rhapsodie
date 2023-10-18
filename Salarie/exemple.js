// Liste des jours fériés pour chaque année
const holidays = {
    2023: ["2023-01-01", "2023-04-10", "2023-05-01", "2023-05-08", "2023-05-18", "2023-07-14", "2023-08-15", "2023-11-01", "2023-11-11", "2023-12-25"],
    2024: ["2024-01-01", "2024-03-31", "2024-04-01", "2024-05-01", "2024-05-08", "2024-05-09", "2024-05-19", "2024-07-14", "2024-08-15", "2024-11-01", "2024-11-11", "2024-12-25"],
    2025: ["2025-01-01", "2025-04-21", "2025-05-01", "2025-05-08", "2025-05-29", "2025-07-14", "2025-08-15", "2025-11-01", "2025-11-11", "2025-12-25"]
};

const form = document.getElementById("activity-form");
const tableBody = document.querySelector("#report-table tbody");
const totalWorkedDays = document.getElementById("total-worked-days");
const totalAbsences = document.getElementById("total-absences");
const captureButton = document.getElementById("capture-button");
const totalOvertimes = document.getElementById("total-overtimes");

function formatDate(date) {
    // Récupérer les composantes de la date
    var year = date.getFullYear();
    var month = date.getMonth() + 1; // Les mois commencent à partir de zéro, donc on ajoute 1
    var day = date.getDate();

    // Ajouter un zéro devant le mois et le jour si nécessaire
    month = (month < 10) ? "0" + month : month;
    day = (day < 10) ? "0" + day : day;

    // Créer la chaîne de date au format "yyyy-mm-dd"
    var formattedDate = year + "-" + month + "-" + day;

    return formattedDate;
}
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Réinitialise le tableau et les totaux
    tableBody.innerHTML = "";
    totalWorkedDays.textContent = "0";
    totalAbsences.textContent = "0";

    const month = parseInt(document.getElementById("month").value);
    const year = parseInt(document.getElementById("year").value);
    const selectedDate = new Date(year, month - 1, 1);

    const lastDay = new Date(year, month, 0).getDate();

    while (selectedDate.getMonth() + 1 === month) {
        const dateString = formatDate(selectedDate)
        const day = selectedDate.getDate();
        const isHoliday = holidays[year].includes(dateString);
        const isWeekend = selectedDate.getDay() === 0 || selectedDate.getDay() === 6;

        console.log({ selectedDate, isHoliday, isWeekend, dateString })
        if (!isHoliday && !isWeekend) {

            console.log({ OUVRABLE: selectedDate })

            const row = document.createElement("tr");

            const dateCell = document.createElement("td");
            dateCell.textContent = day;
            row.appendChild(dateCell);

            const workedDaysCell = document.createElement("td");
            const workedDaysInput = document.createElement("input");
            workedDaysInput.className = "workedDays"
            workedDaysInput.type = "number";
            workedDaysInput.min = "0";
            workedDaysInput.max = "1";
            workedDaysInput.step = "0.5";
            workedDaysInput.value = "1";
            workedDaysInput.addEventListener("change", updateTotals);
            workedDaysCell.appendChild(workedDaysInput);
            row.appendChild(workedDaysCell);

            const absencesCell = document.createElement("td");
            const absencesSelect = document.createElement("select");
            absencesSelect.disabled = true;
            const absenceOptions = ["", "congé payé", "arrêt maladie", "autre"];
            absenceOptions.forEach(function (option) {
                const optionElement = document.createElement("option");
                optionElement.value = option;
                optionElement.textContent = option;
                absencesSelect.appendChild(optionElement);
            });
            absencesSelect.addEventListener("change", updateTotals);
            absencesCell.appendChild(absencesSelect);
            row.appendChild(absencesCell);

            const hoursCell = document.createElement("td");
            const hoursInput = document.createElement("input");
            hoursInput.className = "overtimes"
            hoursInput.type = "number";
            hoursInput.min = "0";
            hoursInput.max = "4";
            hoursInput.value = "0";
            hoursInput.addEventListener("change", updateOvertimeTotals);
            hoursCell.appendChild(hoursInput);
            row.appendChild(hoursCell);

            const commentsCell = document.createElement("td");
            const commentsInput = document.createElement("input");
            commentsInput.type = "text";
            commentsCell.appendChild(commentsInput);
            row.appendChild(commentsCell);

            tableBody.appendChild(row);
        }

        selectedDate.setDate(day + 1);
    }

    updateTotals();
});

function updateTotals() {
    const workedDaysInputs = document.querySelectorAll("#report-table .workedDays");
    const workDaysTotals = workedDaysInputs.length
    const totalWorkedDaysValue = Array.from(workedDaysInputs).reduce((sum, input) => sum + parseFloat(input.value), 0);
    totalWorkedDays.textContent = totalWorkedDaysValue.toFixed(1);
    const totalAbsencesValue = workDaysTotals - totalWorkedDaysValue
    totalAbsences.textContent = totalAbsencesValue.toFixed(1);

    [...workedDaysInputs].forEach((element, index) => {
        const absencesSelect = element.parentNode.nextElementSibling.firstChild;
        if (element.value === "1") {
            absencesSelect.value = "";
            absencesSelect.disabled = true;
        }
        else {
            absencesSelect.disabled = false;
        }
    });

}

function updateOvertimeTotals() {
    const overtimeInputs = document.querySelectorAll("#report-table .overtimes");
    const totalOvertimeInputsValue = Array.from(overtimeInputs).reduce((sum, input) => sum + parseFloat(input.value), 0);
    totalOvertimes.textContent = totalOvertimeInputsValue.toFixed(1);
}

document.getElementById('download').addEventListener('click', function () {
    var opt = {
        margin: 1,
        filename: 'rapport_activite.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }

    };

    // New Promise-based usage:
    html2pdf().set(opt).from(document.body).save();

    // Old monolithic-style usage:
    // html2pdf(document.body, opt);
});

// code pour les signature
var canvas = document.querySelector("#signature-pad");
var signaturePad = new SignaturePad(canvas);

// Ajuster la taille du canevas...
var ratio = Math.max(window.devicePixelRatio || 1, 1);
canvas.width = canvas.offsetWidth * ratio;
canvas.height = canvas.offsetHeight * ratio;
canvas.getContext("2d").scale(ratio, ratio);

document.getElementById('clear').addEventListener('click', function () {
    signaturePad.clear();
});

document.getElementById('save').addEventListener('click', function () {
    if (signaturePad.isEmpty()) {
        alert("Veuillez fournir une signature d'abord.");
    } else {
        var dataURL = signaturePad.toDataURL();
        // enregistrez le dataURL dans votre base de données
    }
});
