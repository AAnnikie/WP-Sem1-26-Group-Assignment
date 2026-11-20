
<!-- Tashea Thompson 2401109 Wed (6-8)- Financial Accounting and Reporting
   CIT2011 Group Project
-->

// Load the group's student and financial records
let financeStudents = load("student_registry");
let financeLedger = load("ledger");

 // Check the logged-in user
let currentUser = null;

try {
    currentUser = JSON.parse(
        sessionStorage.getItem("current_user")
    );
} catch (error) {
    currentUser = null;
}

// Allow only recognized logged-in users
if (!currentUser ||
    !["Admin", "Teacher", "Viewer"].includes(currentUser.role)) {
    window.location.replace("login.html");
}


// Load saved payment transactions
let transactions = [];

try {
    const savedTransactions = JSON.parse(
        localStorage.getItem("financeTransactions")
    );

    if (Array.isArray(savedTransactions)) {
        transactions = savedTransactions;
    }
} catch (error) {
    console.log("Could not load payment transactions.");
}

// Save payment transactions
function saveTransactions() {
    save("financeTransactions", transactions);
}

// Calculate the amount already paid
function calculatePaid(record) {
    return record.tuition - record.balance;
}

// Determine the payment status
function getPaymentStatus(record) {
    if (record.balance <= 0) {
        return "Paid";
    } else if (calculatePaid(record) > 0) {
        return "Pending";
    } else {
        return "Outstanding";
    }
}

// Format amounts as Jamaican dollars
function formatMoney(amount) {
    return "J$" + amount.toLocaleString("en-JM", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Find a student's name using the student ID
function getStudentName(studentId) {
    const student = financeStudents.find(function(record) {
        return record.stud_id === studentId;
    });

    if (student) {
        return student.stud_name;
    }

    return "Unknown Student";
}

// Display student financial records
function displayLedger() {
    const ledgerBody = document.getElementById("ledger-body");
    ledgerBody.innerHTML = "";

    const searchText = document.getElementById("student-search")
        .value.toLowerCase().trim();

    const selectedStatus = document.getElementById("status-filter").value;

    financeLedger.forEach(function(record) {
        const studentName = getStudentName(record.stud_id);
        const status = getPaymentStatus(record);

        const matchesSearch =
            studentName.toLowerCase().includes(searchText) ||
            record.stud_id.toLowerCase().includes(searchText);

        const matchesStatus =
            selectedStatus === "all" || status === selectedStatus;

        if (matchesSearch && matchesStatus) {
            const row = document.createElement("tr");

            const values = [
                record.stud_id,
                studentName,
                formatMoney(record.tuition),
                formatMoney(calculatePaid(record)),
                formatMoney(record.balance),
                status
            ];

            values.forEach(function(value) {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

            ledgerBody.appendChild(row);
        }
    });
}

// Display financial totals
function displayTotals() {
    let totalTuition = 0;
    let totalPayments = 0;
    let totalBalance = 0;

    financeLedger.forEach(function(record) {
        totalTuition += record.tuition;
        totalPayments += calculatePaid(record);
        totalBalance += record.balance;
    });

    document.getElementById("total-tuition").textContent =
        formatMoney(totalTuition);

    document.getElementById("total-payments").textContent =
        formatMoney(totalPayments);

    document.getElementById("total-balance").textContent =
        formatMoney(totalBalance);
}

// Add students to the payment dropdown
function loadPaymentStudents() {
    const studentSelect = document.getElementById("payment-student");

    studentSelect.innerHTML = '<option value="">Choose a student</option>';

    financeLedger.forEach(function(record) {
        const option = document.createElement("option");

        option.value = record.stud_id;
        option.textContent =
            getStudentName(record.stud_id) + " (" + record.stud_id + ")";

        studentSelect.appendChild(option);
    });
}

// Record a payment
function recordPayment(event) {
    event.preventDefault();

    // Only administrators can record payments
    if (!currentUser || currentUser.role !== "Admin") {
        alert("Only administrators can record payments.");
        return;
    }

    const studentId = document.getElementById("payment-student").value;
    const amount = Number(document.getElementById("payment-amount").value);
    const message = document.getElementById("payment-message");

    const record = financeLedger.find(function(item) {
        return item.stud_id === studentId;
    });

    if (!record) {
        message.textContent = "Please select a student.";
        return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
        message.textContent = "Enter a valid payment amount.";
        return;
    }

    if (Math.round(amount * 100) > Math.round(record.balance * 100)) {
        message.textContent = "Payment exceeds the outstanding balance.";
        return;
    }

    // Update the outstanding balance
    record.balance = Math.round((record.balance - amount) * 100) / 100;

    // Save the updated shared ledger
    save("ledger", financeLedger);

    // Create a payment transaction
    const transaction = {
        id: "TX" + Date.now(),
        date: new Date().toLocaleDateString("en-GB"),
        studentId: record.stud_id,
        studentName: getStudentName(record.stud_id),
        amount: amount
    };

    transactions.push(transaction);
    saveTransactions();

    // Refresh the financial information
    displayLedger();
    displayTotals();
    displayTransactions();

    message.textContent = "Payment recorded successfully.";

    document.getElementById("payment-form").reset();
}

// Display payment transaction history
function displayTransactions() {
    const transactionBody = document.getElementById("transaction-body");
    transactionBody.innerHTML = "";

    transactions.forEach(function(transaction) {
        const row = document.createElement("tr");

        const values = [
            transaction.id,
            transaction.date,
            transaction.studentId,
            transaction.studentName,
            formatMoney(transaction.amount)
        ];

        values.forEach(function(value) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        transactionBody.appendChild(row);
    });
}

// Search and filter records
document.getElementById("student-search")
    .addEventListener("input", displayLedger);

document.getElementById("status-filter")
    .addEventListener("change", displayLedger);

// Record payments
document.getElementById("payment-form")
    .addEventListener("submit", recordPayment);

// Print financial information
document.getElementById("print-report")
    .addEventListener("click", function() {
        window.print();
    });

// Show payment controls to administrators only
function checkFinancePermissions() {
    const paymentSection = document.getElementById("payments");

    if (currentUser && currentUser.role === "Admin") {
        paymentSection.hidden = false;
    } else {
        paymentSection.hidden = true;
    }
}

checkFinancePermissions();

// Load the financial information
displayLedger();
displayTotals();
loadPaymentStudents();
displayTransactions();
