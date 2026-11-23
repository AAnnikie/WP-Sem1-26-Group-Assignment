
/*
Zane Bryce 2404207 Wednesday 6-8pm
Adriana Pinnock 2401828 Wednesday 6-8pm
Tashea Thompson 2401109 Wednesday 6-8pm
Alex Annikie 2208624 Wednesday 6-8pm
Joel Clarke 2407184 Wednesday 6-8pm

CIT2011 Group Project: School Portal
File Purpose: Financial Accounting and Reporting
*/

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
// Allow Admin and Viewer access to finance
if (!currentUser ||
    !["Admin", "Viewer"].includes(currentUser.role)) {
    window.location.replace("titchfield-high-22-fort-george-st-port-antonio-login.html");
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
    const ledgerBody = document.getElementById("ledgerBody");
    ledgerBody.innerHTML = "";

    const searchText = document.getElementById("studentSearch")
        .value.toLowerCase().trim();

    const selectedStatus = document.getElementById("statusFilter").value;

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

    document.getElementById("totalTuition").textContent =
        formatMoney(totalTuition);

    document.getElementById("totalPayments").textContent =
        formatMoney(totalPayments);

    document.getElementById("totalBalance").textContent =
        formatMoney(totalBalance);
}

// Add students to the payment dropdown
function loadPaymentStudents() {
    const studentSelect = document.getElementById("paymentStudent");

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

    const studentId = document.getElementById("paymentStudent").value;
    const amount = Number(document.getElementById("paymentAmount").value);
    const message = document.getElementById("paymentMessage");

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

    document.getElementById("paymentForm").reset();
}

// Display payment transaction history
function displayTransactions() {
    const transactionBody = document.getElementById("transactionBody");
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
document.getElementById("studentSearch")
    .addEventListener("input", displayLedger);

document.getElementById("statusFilter")
    .addEventListener("change", displayLedger);

// Record payments
document.getElementById("paymentForm")
    .addEventListener("submit", recordPayment);

// Print financial information
document.getElementById("printReport")
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
// Show payment controls and Admin link to administrators only
function checkFinancePermissions() {
    const paymentSection = document.getElementById("payments");
    const adminLink = document.getElementById("adminLink");

    if (currentUser && currentUser.role === "Admin") {
        paymentSection.hidden = false;
        adminLink.hidden = false;
    } else {
        paymentSection.hidden = true;
        adminLink.hidden = true;
    }
}
