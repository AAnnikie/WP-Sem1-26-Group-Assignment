/*
Zane Bryce 2404207 Wednesday 6-8pm
Adriana Pinnock 2401828 Wednesday 6-8pm
Tashea Thompson 2401109 Wednesday 6-8pm
Alex Annikie 2208624 Wednesday 6-8pm
Joel Clarke 2407184 Wednesday 6-8pm

CIT2011 Group Project: School Portal
File Purpose: Handles the functionality of the teacher dashboard, including subject selection,
student grade management, and report generation.
*/
// Load the saved data this page needs from localStorage
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

// Display enrolled students the selected subject as well as have access to edit grades
function displayStudents()
{   
    const subjectCode = subjectSelect.value;

    const semester = semesterSelect.value;



    // Find the curriculum mapping for the selected subject
    const mappings = loadedCurriculum.filter(
        item =>
        item.subject_code === subjectCode &&
        item.semester ===semester
    );

    const container =
        document.getElementById("studentTable");

    container.innerHTML = "";

    // Stop if no students take this subject in the chosen semester
    if(mappings.length == 0) {return;}

    // Build the grade table: one row per enrolled student, with the current score in a number box
    let html = `
    <table>
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
                        id="grade${id}">
                </td>
            </tr>
            `;
        });
    });

    // Add the Save button under the table
    html += "</table>";

    html += `
        <button
            class="btn-primary"
            id="saveGradesBtn">
            Save Grades
        </button>
    `;

    container.innerHTML = html;
    
    // Connect the new Save button to saveGrades
    document.getElementById("saveGradesBtn").addEventListener("click", saveGrades);

}

// Save the grades entered after validation 
function saveGrades()
{
    const semester = semesterSelect.value;
    
    const subjectCode = subjectSelect.value;

    const mapping = loadedCurriculum.filter(
        item => 
            item.subject_code === subjectCode &&
            item.semester === semester
    );

    // First pass: every score must be filled in and be a number from 0 to 100
    let hasError = false;

mapping.forEach(item => {
    item.stud_id.forEach(id => {

        const input =
            document.getElementById(`grade${id}`);

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

// Stop and warn if any score is invalid
if(hasError)
{
    alert("Please correct invalid grade before saving.");
    return;
} 

// Second pass: update the existing grade record, or add a new one
mapping.forEach(item => {
    item.stud_id.forEach(id => {

        const input =
            document.getElementById(`grade${id}`);

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
        }else {
            const student =
                loadedStudents.find(
                    s => s.stud_id === id
                );

            loadedGrades.push({
                stud_id: id,
                subject_code: subjectCode,
                score: newScore,
                academic_year: student.academic_year,
                semester: student.semester
            });
        }
    });
});



// Save all grades back to localStorage
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

// Semester dropdown (filters the student table with the subject)
const semesterSelect =
    document.getElementById(
        "semesterSelect"
    );

    // Reload the student table when the subject or semester changes
    subjectSelect.addEventListener(
        "change",
        displayStudents
    );

    semesterSelect.addEventListener(
        "change",
        displayStudents
    );

// Generate report card
    document.getElementById("reportBtn")
        .addEventListener(
            "click",
            generateReport
        );


function generateReport()
{
    const studentID =
        studentSelect.value;

    // A student must be chosen first
    if(!studentID)
    {
        alert("Please select a student.");
        return;
    }

    const student =
        loadedStudents.find(
            s => s.stud_id === studentID
        );

    // Collect every grade saved for this student
    const studentGrades =
        loadedGrades.filter(
            g => g.stud_id === studentID
        );

    // No grades yet: show the name and a message
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

    // Add up the scores and list each subject
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

    // Average of all subjects to 2 decimal places, plus the letter grade
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
