
/*
Zane Bryce 2404207 Wednesday 6-8pm
Adriana Pinnock 2401828 Wednesday 6-8pm
Tashea Thompson 2401109 Wednesday 6-8pm
Alex Annikie 2208624 Wednesday 6-8pm
Joel Clarke 2407184 Wednesday 6-8pm

CIT2011 Group Project: School Portal
File Purpose: Shows and edits student grades by subject for the chosen semester
*/

// Page elements used by the matrix, and the current academic year
const matrixHeading = document.querySelector("#matrixHeading");
const matrixBody = document.querySelector("#matrixBody");
const matrixSemester = document.querySelector("#matrixSemester");
const matrixMessage = document.querySelector("#matrixMessage");
const currentAcademicYear = "AY26/27";

// Check if the logged-in user is an Admin
const matrixUser = JSON.parse(sessionStorage.getItem("current_user") || "null");
const matrixIsAdmin = matrixUser && matrixUser.role === "Admin";

// Viewers see the Viewer dashboard link instead of the Admin one
if (!matrixIsAdmin) {
    document.querySelector("#adminDashboardLink").hidden = true;
    document.querySelector("#viewerDashboardLink").hidden = false;
}

// Find a student's saved score for one subject and semester ("" if none)
function findScore(studentId, subjectCode, semester) {
    for (const grade of load("grades")) {
        if (grade.stud_id === studentId &&
            grade.subject_code === subjectCode &&
            grade.semester === semester &&
            grade.academic_year === currentAcademicYear) {
            return grade.score;
        }
    }
    return "";
}

// Add one cell (td, or th for headings) to a table row
function addCell(row, text, tag) {
    const cell = document.createElement(tag || "td");
    cell.textContent = text;
    row.appendChild(cell);
}

// Build the grade grid: one row per student, one column per subject
function loadMatrix() {
    const subjects = load("subjects");
    const semester = matrixSemester.value;

    let title = semester;
    if (semester === "All") {
        title = "All Semesters";
    }

    document.querySelector("#matrixTitle").textContent =
        "Grades for " + title + " (" + currentAcademicYear + ")";

    matrixMessage.textContent = "";
    matrixHeading.innerHTML = "";
    matrixBody.innerHTML = "";

    // Heading row: ID, Name, each subject, and Actions for Admins
    const headingRow = document.createElement("tr");
    addCell(headingRow, "ID", "th");
    addCell(headingRow, "Name", "th");

    for (const subject of subjects) {
        addCell(headingRow, subject.name, "th");
    }

    if (matrixIsAdmin) {
        addCell(headingRow, "Actions", "th");
    }

    matrixHeading.appendChild(headingRow);

    // One row per student in the chosen semester
    for (const student of load("student_registry")) {
        if (semester !== "All" && student.semester !== semester) {
            continue;
        }

        const row = document.createElement("tr");
        addCell(row, student.stud_id);
        addCell(row, student.stud_name);

        for (const subject of subjects) {
            // Each score sits in a read-only box until the row is edited
            const scoreBox = document.createElement("input");
            scoreBox.type = "text";
            scoreBox.value = findScore(
                student.stud_id,
                subject.subject_code,
                student.semester
            );
            scoreBox.readOnly = true;
            scoreBox.dataset.id = student.stud_id;
            scoreBox.dataset.subject = subject.subject_code;
            scoreBox.dataset.semester = student.semester;

            const scoreCell = document.createElement("td");
            scoreCell.appendChild(scoreBox);
            row.appendChild(scoreCell);
        }

        // Only Admins get an Edit button on each row
        if (matrixIsAdmin) {
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.dataset.action = "edit";

            const buttonCell = document.createElement("td");
            buttonCell.appendChild(editButton);
            row.appendChild(buttonCell);
        }

        matrixBody.appendChild(row);
    }
}

// Edit: unlock the row's score boxes and turn the button into Save
function startEditingRow(button) {
    if (!matrixIsAdmin) return;

    const row = button.parentElement.parentElement;

    for (const box of row.querySelectorAll("input")) {
        box.readOnly = false;
    }

    button.textContent = "Save";
    button.dataset.action = "save";
    matrixMessage.textContent = "";
}

// Update one score: change it, remove it if cleared, or add a new record
function updateGrade(grades, studentId, subjectCode, semester, scoreText) {
    if (!matrixIsAdmin) return;

    for (let i = 0; i < grades.length; i++) {
        const grade = grades[i];

        if (grade.stud_id === studentId &&
            grade.subject_code === subjectCode &&
            grade.semester === semester &&
            grade.academic_year === currentAcademicYear) {

            if (scoreText === "") {
                grades.splice(i, 1);
            } else {
                grade.score = Number(scoreText);
            }
            return;
        }
    }

    if (scoreText !== "") {
        grades.push({
            stud_id: studentId,
            subject_code: subjectCode,
            score: Number(scoreText),
            academic_year: currentAcademicYear,
            semester: semester
        });
    }
}

// Save: every score must be a whole number from 0 to 100, then all are saved and the grid reloads
function saveRow(button) {
    if (!matrixIsAdmin) return;

    const row = button.parentElement.parentElement;
    const boxes = row.querySelectorAll("input");

    for (const box of boxes) {
        const scoreText = box.value.trim();

        if (scoreText !== "" &&
            (!/^[0-9]{1,3}$/.test(scoreText) || Number(scoreText) > 100)) {
            matrixMessage.textContent =
                "Scores must be whole numbers from 0 to 100.";
            return;
        }
    }

    const grades = load("grades");

    for (const box of boxes) {
        updateGrade(
            grades,
            box.dataset.id,
            box.dataset.subject,
            box.dataset.semester,
            box.value.trim()
        );
    }

    save("grades", grades);
    loadMatrix();
}

// One click listener on the grid handles every Edit and Save button
matrixBody.addEventListener("click", function (event) {
    if (!matrixIsAdmin) return;

    const action = event.target.dataset.action;

    if (action === "edit") {
        startEditingRow(event.target);
    } else if (action === "save") {
        saveRow(event.target);
    }
});

// Reload the grid when the semester filter changes, and show it on load
matrixSemester.addEventListener("change", loadMatrix);

loadMatrix();
