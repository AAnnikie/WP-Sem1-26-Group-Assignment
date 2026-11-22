/*
Zane Bryce 2404207 Wednesday 6-8pm
Adriana Pinnock 2401828 Wednesday 6-8pm
Tashea Thompson 2401109 Wednesday 6-8pm
Alex Annikie 2208624 Wednesday 6-8pm
Joel Clarke 2407184 Wednesday 6-8pm

CIT2011 Group Project: School Portal
File Purpose: Shows student grades by subject for the chosen semester
*/

const matrixHeading = document.querySelector("#matrixHeading");
const matrixBody = document.querySelector("#matrixBody");
const matrixSemester = document.querySelector("#matrixSemester");
const currentAcademicYear = "AY26/27";


// Finds one student's score for one subject. Returns "" if there isn't one.
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

// Adds one cell with some text to a row (a heading cell if tag is "th")
function addCell(row, text, tag) {
    const cell = document.createElement(tag || "td");
    cell.textContent = text;
    row.appendChild(cell);
}


// Builds the grid: a heading row, then one row per student in the chosen semester
function loadMatrix() {
    const subjects = load("subjects");
    const semester = matrixSemester.value;

    document.querySelector("#matrixTitle").textContent = "Grades for " + semester + " (" + currentAcademicYear + ")";
    matrixHeading.innerHTML = "";
    matrixBody.innerHTML = "";

    const headingRow = document.createElement("tr");
    addCell(headingRow, "ID", "th");
    addCell(headingRow, "Name", "th");
    for (const subject of subjects) {
        addCell(headingRow, subject.name, "th");
    }
    matrixHeading.appendChild(headingRow);

    for (const student of load("student_registry")) {
        if (semester !== "All" && student.semester !== semester) {
            continue;   // skip students who aren't in this semester
        }

        const row = document.createElement("tr");
        addCell(row, student.stud_id);
        addCell(row, student.stud_name);

        for (const subject of subjects) {
            const scoreBox = document.createElement("input");
            scoreBox.type = "text";
            scoreBox.value = findScore(student.stud_id, subject.subject_code, student.semester);            scoreBox.readOnly = true;
            scoreBox.style.pointerEvents = "none";//so that they cant click in the box

            const scoreCell = document.createElement("td");
            scoreCell.appendChild(scoreBox);
            row.appendChild(scoreCell);
        }

        matrixBody.appendChild(row);
    }
}


// Redraw the grid when the semester changes
matrixSemester.addEventListener("change", loadMatrix);

loadMatrix();