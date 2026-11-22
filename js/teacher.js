const subjects = load("subjects");
const students = load("student_registry");
const curriculum = load("curriculum_mapping");
const grades = load("grades");

const subjectSelect =
    document.getElementById("subjectSelect");

subjects.forEach(subject => {
    subjectSelect.innerHTML += `
        <option value="${subject.subject_code}">
            ${subject.name}
        </option>
    `;
});

subjectSelect.addEventListener(
    "change",
    displayStudents
);


function displayStudents()
{   
    const subjectCode =
        subjectSelect.value;

    const mapping =
        curriculum.find(
            item => item.subject_code === subjectCode
        );

    const container =
        document.getElementById("studentTable");

    container.innerHTML = "";

    if(!mapping) return;

    let html = `
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Grade</th>
        </tr>
    `;

    mapping.stud_id.forEach(id => {

        const student =
            students.find(
                s => s.stud_id === id
            );

        const grade =
            grades.find(
                g =>
                g.stud_id === id &&
                g.subject_code === subjectCode
            );

        html += `
        <tr>
            <td>${student.stud_id}</td>
            <td>${student.stud_name}</td>
            <td>
                <input
                    type="number"
                    value="${grade ? grade.score : 0}"
                    id="grade-${id}">
            </td>
        </tr>
        `;
    });

    html += "</table>";

    html += `
        <button
            class="btn-primary"
            onclick="saveGrades()">
            Save Grades
        </button>
    `;

    container.innerHTML = html;
}

function saveGrades()
{
    const subjectCode =
        subjectSelect.value;

    const mapping =
        curriculum.find(
            item => item.subject_code === subjectCode
        );

    mapping.stud_id.forEach(id => {

        const input =
            document.getElementById(`grade-${id}`);

        const newScore =
            Number(input.value);

        const gradeRecord =
            grades.find(
                g =>
                g.stud_id === id &&
                g.subject_code === subjectCode
            );

        if(gradeRecord)
        {
            gradeRecord.score =
                newScore;
        }
    });

    save("grades", grades);

    alert("Grades Saved");
}

const studentSelect =
    document.getElementById("studentSelect");

    students.forEach(student => {

        studentSelect.innerHTML += `
            <option value="${student.stud_id}">
                ${student.stud_name}
            </option>
        `;
    });

    document.getElementById("reportBtn")
    .addEventListener(
        "click",
        generateReport
);

function generateReport()
{
    const studentID =
        studentSelect.value;

    const student =
        students.find(
            s => s.stud_id === studentID
        );

    const studentGrades =
        grades.filter(
            g => g.stud_id === studentID
        );

    let total = 0;

    let html = `
        <h3>${student.stud_name}</h3>
    `;

    studentGrades.forEach(record => {

        const subject =
            subjects.find(
                s =>
                s.subject_code ===
                record.subject_code
            );

        total += record.score;

        html += `
            <p>
                ${subject.name}:
                ${record.score}
            </p>
        `;
    });

    const average =
        total / studentGrades.length;

    html += `
        <p>Average:
            ${average.toFixed(2)}
        </p>

        <p>Grade:
            ${letterGrade(average)}
        </p>
    `;

    document
        .getElementById("reportCard")
        .innerHTML = html;
}

function letterGrade(avg)
{
    if(avg >= 80) return "A";
    if(avg >= 70) return "B";
    if(avg >= 60) return "C";
    if(avg >= 50) return "D";

    return "F";
}