
/*
Zane Bryce 2404207 Wednesday 6-8pm
Adriana Pinnock 2401828 Wednesday 6-8pm
Tashea Thompson 2401109 Wednesday 6-8pm
Alex Annikie 2208624 Wednesday 6-8pm
Joel Clarke 2407184 Wednesday 6-8pm

CIT2011 Group Project: School Portal
File Purpose: Admins can add, edit and delete students
*/

// Page elements used by the registry
const studentForm = document.querySelector("#studentForm");
const tableBody = document.querySelector("#studentTableBody");
const semesterFilter = document.querySelector("#semesterFilter");

// Check if the logged-in user is an Admin
const registryUser = JSON.parse(sessionStorage.getItem("current_user") || "null");
const registryIsAdmin = registryUser && registryUser.role === "Admin";

// Viewers get a read-only page: hide the form and action column, show the Viewer dashboard link
if (!registryIsAdmin) {
    document.querySelector("#formSection").hidden = true;
    document.querySelector("#studentActionsHeading").hidden = true;
    document.querySelector("#adminDashboardLink").hidden = true;
    document.querySelector("#viewerDashboardLink").hidden = false;
}

// Fill the table with saved students, filtered by the chosen semester
function loadStudentRegistry() {
    const students = load("student_registry");
    const chosenSemester = semesterFilter.value;

    tableBody.innerHTML = "";

    for (const student of students) {
        if (chosenSemester !== "All" && student.semester !== chosenSemester) {
            continue;
        }

        const row = document.createElement("tr");

        const columnValues = [
            student.stud_id,
            student.stud_name,
            student.stud_DOB,
            student.stud_email || "",
            student.stud_phone || "",
            student.semester || "",
            student.stud_status || ""
        ];

        for (const value of columnValues) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        }

        // Only Admins get Edit and Delete buttons on each row
        if (registryIsAdmin) {
            const actionButton = document.createElement("td");

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.dataset.action = "edit";
            editButton.dataset.id = student.stud_id;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.dataset.action = "delete";
            deleteButton.dataset.id = student.stud_id;

            actionButton.appendChild(editButton);
            actionButton.appendChild(deleteButton);
            row.appendChild(actionButton);
        }

        tableBody.appendChild(row);
    }
}

// Show or clear the error message under a form field
function showError(fieldId, message) {
    document.querySelector("#" + fieldId + "Error").textContent = message;
}

function clearError(fieldId) {
    document.querySelector("#" + fieldId + "Error").textContent = "";
}

// Clear every error message on the form
function clearAllErrors() {
    const errorParagraphs = document.querySelectorAll(".error");

    for (const errorParagraph of errorParagraphs) {
        errorParagraph.textContent = "";
    }
}

// ID: required, one capital letter + 4 digits, and not already registered
function validateStudentId() {
    const idValue = document.querySelector("#studentId").value.trim();
    const editingId = document.querySelector("#editingStudentId").value;

    if (idValue === "") {
        showError("studentId", "Please enter a student ID.");
        return false;
    }

    if (!/^[A-Z][0-9]{4}$/.test(idValue)) {
        showError("studentId", "ID must be one capital letter followed by 4 digits (e.g. A0000).");
        return false;
    }

    for (const savedStudent of load("student_registry")) {
        if (savedStudent.stud_id === idValue && idValue !== editingId) {
            showError("studentId", "That student ID is already registered.");
            return false;
        }
    }

    clearError("studentId");
    return true;
}

// Name: required, 2-60 characters, letters and . ' - only
function validateStudentName() {
    const nameValue = document.querySelector("#studentName").value.trim();

    if (nameValue === "") {
        showError("studentName", "Please enter the student's full name");
        return false;
    }

    if (nameValue.length < 2 || nameValue.length > 60) {
        showError("studentName", "Name must be between 2 and 60 characters");
        return false;
    }

    if (!/^[A-Za-z .'\-]+$/.test(nameValue)) {
        showError("studentName", "Name can only contain letters, spaces, dots, apostrophes and hyphens");
        return false;
    }

    clearError("studentName");
    return true;
}

// Date of birth: required, not in the future, age 11-18
function validateStudentDob() {
    const dobValue = document.querySelector("#studentDob").value;
    const todayDate = new Date().toISOString().split("T")[0];

    if (dobValue === "") {
        showError("studentDob", "Please enter the date of birth");
        return false;
    }

    if (dobValue > todayDate) {
        showError("studentDob", "Date of birth cannot be in the future");
        return false;
    }

    const birthYear = Number(dobValue.slice(0, 4));
    const age = new Date().getFullYear() - birthYear;

    if (age < 11 || age > 18) {
        showError("studentDob", "Student must be between 11 and 18 years old");
        return false;
    }

    clearError("studentDob");
    return true;
}

// Phone: required, exactly 10 digits
function validateStudentPhone() {
    const phoneValue = document.querySelector("#studentPhone").value.trim();

    if (phoneValue === "") {
        showError("studentPhone", "Please enter a phone number");
        return false;
    }

    if (!/^[0-9]{10}$/.test(phoneValue)) {
        showError("studentPhone", "Phone number must be exactly 10 digits (numbers only).");
        return false;
    }

    clearError("studentPhone");
    return true;
}

// Email: required and in a valid email format
function validateStudentEmail() {
    const emailValue = document.querySelector("#studentEmail").value.trim();

    if (emailValue === "") {
        showError("studentEmail", "Please enter an email address");
        return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        showError("studentEmail", "Enter a valid email address");
        return false;
    }

    clearError("studentEmail");
    return true;
}

// Address: required, 5-100 characters
function validateStudentAddress() {
    const addressValue = document.querySelector("#studentAddress").value.trim();

    if (addressValue === "") {
        showError("studentAddress", "Please enter the home address");
        return false;
    }

    if (addressValue.length < 5 || addressValue.length > 100) {
        showError("studentAddress", "Address must be between 5 and 100 characters.");
        return false;
    }

    clearError("studentAddress");
    return true;
}

// Dropdowns: an option must be chosen
function validateDropdown(fieldId, label) {
    const chosenValue = document.querySelector("#" + fieldId).value;

    if (chosenValue === "") {
        showError(fieldId, "Please choose a " + label);
        return false;
    }

    clearError(fieldId);
    return true;
}

// Run every check so all errors show at once; true only if all pass
function validateStudentForm() {
    const okId = validateStudentId();
    const okName = validateStudentName();
    const okDob = validateStudentDob();
    const okPhone = validateStudentPhone();
    const okEmail = validateStudentEmail();
    const okAddress = validateStudentAddress();
    const okSemester = validateDropdown("studentSemester", "semester");
    const okStatus = validateDropdown("studentStatus", "status");

    return okId && okName && okDob && okPhone &&
        okEmail && okAddress && okSemester && okStatus;
}

// Add: build a new student record from the form and save it
function addStudent() {
    if (!registryIsAdmin) return;

    const students = load("student_registry");

    const newStudent = {
        stud_id: document.querySelector("#studentId").value.trim(),
        stud_name: document.querySelector("#studentName").value.trim(),
        stud_DOB: document.querySelector("#studentDob").value,
        academic_year: document.querySelector("#academicYear").value,
        semester: document.querySelector("#studentSemester").value,
        stud_email: document.querySelector("#studentEmail").value.trim(),
        stud_phone: document.querySelector("#studentPhone").value.trim(),
        stud_address: document.querySelector("#studentAddress").value.trim(),
        stud_status: document.querySelector("#studentStatus").value
    };

    students.push(newStudent);
    save("student_registry", students);
}

// Edit: copy the chosen student into the form and lock the ID field
function startEditing(studentId) {
    if (!registryIsAdmin) return;

    for (const student of load("student_registry")) {
        if (student.stud_id === studentId) {
            document.querySelector("#studentId").value = student.stud_id;
            document.querySelector("#studentName").value = student.stud_name;
            document.querySelector("#studentDob").value = student.stud_DOB;
            document.querySelector("#studentPhone").value = student.stud_phone || "";
            document.querySelector("#studentEmail").value = student.stud_email || "";
            document.querySelector("#studentAddress").value = student.stud_address || "";
            document.querySelector("#academicYear").value = student.academic_year || "";
            document.querySelector("#studentSemester").value = student.semester || "";
            document.querySelector("#studentStatus").value = student.stud_status || "";

            document.querySelector("#editingStudentId").value = student.stud_id;
            document.querySelector("#studentId").readOnly = true;
            document.querySelector("#saveStudentButton").textContent = "Update Student";

            clearAllErrors();
        }
    }
}

// Update: save the form values over the student being edited
function updateStudent() {
    if (!registryIsAdmin) return;

    const students = load("student_registry");
    const editingId = document.querySelector("#editingStudentId").value;

    for (const student of students) {
        if (student.stud_id === editingId) {
            student.stud_name = document.querySelector("#studentName").value.trim();
            student.stud_DOB = document.querySelector("#studentDob").value;
            student.academic_year = document.querySelector("#academicYear").value;
            student.semester = document.querySelector("#studentSemester").value;
            student.stud_email = document.querySelector("#studentEmail").value.trim();
            student.stud_phone = document.querySelector("#studentPhone").value.trim();
            student.stud_address = document.querySelector("#studentAddress").value.trim();
            student.stud_status = document.querySelector("#studentStatus").value;
        }
    }

    save("student_registry", students);
}

// Put the form back into "Add Student" mode
function exitEditMode() {
    document.querySelector("#editingStudentId").value = "";
    document.querySelector("#studentId").readOnly = false;
    document.querySelector("#saveStudentButton").textContent = "Add Student";
}

// Delete: blocked if the student has grades or a ledger record, otherwise asks to confirm
function deleteStudent(studentId) {
    if (!registryIsAdmin) return;

    for (const grade of load("grades")) {
        if (grade.stud_id === studentId) {
            alert("Cannot delete: this student has grades.");
            return;
        }
    }

    for (const entry of load("ledger")) {
        if (entry.stud_id === studentId) {
            alert("Cannot delete: this student has a ledger record.");
            return;
        }
    }

    if (!confirm("Delete student " + studentId + "?")) {
        return;
    }

    const remainingStudents = [];

    for (const student of load("student_registry")) {
        if (student.stud_id !== studentId) {
            remainingStudents.push(student);
        }
    }

    save("student_registry", remainingStudents);
    loadStudentRegistry();
}

// Submit: validate, then add or update depending on the mode
studentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!registryIsAdmin) return;

    if (validateStudentForm()) {
        if (document.querySelector("#editingStudentId").value === "") {
            addStudent();
        } else {
            updateStudent();
        }

        loadStudentRegistry();
        studentForm.reset();
    }
});

// Reset: clear errors and leave edit mode
studentForm.addEventListener("reset", function () {
    clearAllErrors();
    exitEditMode();
});

// One click listener on the table handles every Edit and Delete button
tableBody.addEventListener("click", function (event) {
    if (!registryIsAdmin) return;

    const action = event.target.dataset.action;
    const studentId = event.target.dataset.id;

    if (action === "edit") {
        startEditing(studentId);
    } else if (action === "delete") {
        deleteStudent(studentId);
    }
});

// Reload the table when the semester filter changes
semesterFilter.addEventListener("change", loadStudentRegistry);

// Show the table on load, and again when the page is restored with Back
loadStudentRegistry();
window.addEventListener("pageshow", loadStudentRegistry);
