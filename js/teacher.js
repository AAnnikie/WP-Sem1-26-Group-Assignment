const loadedSubjects = load("subjects");
const loadedStudents = load("student_registry");
const loadedCurriculum = load("curriculum_mapping");
const loadedGrades = load("grades");


//reference and populate the subject selection dropdown
const subjectSelect =
    document.getElementById("subjectSelect");

// Populate the subject selection dropdown
loadedSubjects.forEach(subject => {
    subjectSelect.innerHTML += `
        <option value="${subject.subject_code}">
            ${subject.name}
        </option>
    `;
});
// Display students when a subject is selected
subjectSelect.addEventListener(
    "change",
    displayStudents
);

// Display enrolled students the selected subject as well as have access to edit gardes
function displayStudents()
{   
    console.log("displayStudents called");

    const subjectCode = subjectSelect.value;

    console.log("Selected subject code:", subjectCode);

    // Find the curriculum mapping for the selected subject
    const mappings =
        loadedCurriculum.filter(
            item => item.subject_code === subjectCode
        );

    console.log("Mappings found:", mappings);
    const container =
        document.getElementById("studentTable");

    container.innerHTML = "";

    if(mappings.length == 0) {
        console.log("No students enrolled in this subject.");
        return;
    }

    let html = `
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Grade</th>
        </tr>
    `;
    // Create tables for each student enrolled in the selected subject
    mappings.forEach(mapping => {
        mapping.stud_id.forEach(id => {

            const student =
                loadedStudents.find(
                    s => s.stud_id === id
                );

            const grade =
                loadedGrades.find(
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

// Save the grades entered after validation 
function saveGrades()
{
    const subjectCode = subjectSelect.value;

    const mapping = loadedCurriculum.filter(item => item.subject_code === subjectCode);

    let hasError = false;

mapping.forEach(item => {
    item.stud_id.forEach(id => {

        const input =
            document.getElementById(`grade-${id}`);

        if(input.value.trim() === "")
        {
            hasError = true;
        }

        const newScore =
            Number(input.value);

        if(isNaN(newScore))
        {
            hasError = true;
        }

        if(newScore < 0 || newScore > 100)
        {
            hasError = true;
        }

    });
});

if(hasError)
{
    alert("Please correct invalid grade before saving.");
    return;
} 

mapping.forEach(item => {
    item.stud_id.forEach(id => {

        const input =
            document.getElementById(`grade-${id}`);

        const newScore =
            Number(input.value);

        const gradeRecord =
            loadedGrades.find(
                g =>
                g.stud_id === id &&
                g.subject_code === subjectCode
            );

        if(gradeRecord)
        {
            gradeRecord.score = newScore;
        }
        else
        {
            loadedGrades.push({
                stud_id: id,
                subject_code: subjectCode,
                score: newScore
            });
        }

    });
});



save("grades", loadedGrades);

alert("Grades Saved Successfully!");
}

// Student dropdown
const studentSelect =
    document.getElementById("studentSelect");

// Populate student dropdown
loadedStudents.forEach(student => {

    studentSelect.innerHTML += `
        <option value="${student.stud_id}">
            ${student.stud_name}
        </option>
    `;
});

// Report button event
document.getElementById("reportBtn")
    .addEventListener(
        "click",
        generateReport
    );

// Generate report card
function generateReport()
{
    const studentID =
        studentSelect.value;

    if(!studentID)
    {
        alert("Please select a student.");
        return;
    }

    const student =
        loadedStudents.find(
            s => s.stud_id === studentID
        );

    const studentGrades =
        loadedGrades.filter(
            g => g.stud_id === studentID
        );

    if(studentGrades.length === 0)
    {
        document
            .getElementById("reportCard")
            .innerHTML = `
                <h3>${student.stud_name}</h3>
                <p>No grades available.</p>
            `;

        return;
    }

    let total = 0;

    let html = `
        <h3>${student.stud_name}</h3>
    `;

    studentGrades.forEach(record => {

        const subject =
            loadedSubjects.find(
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
        <p>
            Average:
            ${average.toFixed(2)}
        </p>

        <p>
            Grade:
            ${letterGrade(average)}
        </p>
    `;

    document
        .getElementById("reportCard")
        .innerHTML = html;
}

// Letter grade calculation
function letterGrade(avg)
{
    if(avg >= 80) return "A";
    if(avg >= 70) return "B";
    if(avg >= 60) return "C";
    if(avg >= 50) return "D";

    return "F";
}
