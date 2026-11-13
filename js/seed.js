/*
Zane Bryce 2404207 Wednesday 6-8pm




CIT2011 Group Project: School Portal
File Purpose: Fills the fresh page's empty keys with sample records based on the data shape, allowing instant tests and sample logins.
*/


const student_registry=
[
    {stud_name: "John Doe", stud_id: "A0000", stud_DOB: "2005-10-20"},
    {stud_name: "Jane Dow", stud_id: "B0001", stud_DOB: "2004-11-21"},
    {stud_name: "Jack Sparrow", stud_id: "C0002", stud_DOB: "2006-09-19"},
    {stud_name: "Patrick Jane", stud_id: "D0003", stud_DOB: "2006-09-19"},
    {stud_name: "Red John", stud_id: "E0004", stud_DOB: "2006-09-19"},
    {stud_name: "Dexter Morgan", stud_id: "F0005", stud_DOB: "2006-09-19"},
    {stud_name: "James Doakes", stud_id: "G0006", stud_DOB: "2006-09-19"},
    {stud_name: "Walter White", stud_id: "H0007", stud_DOB: "2006-09-19"},
    {stud_name: "Jesse Pinkman", stud_id: "I0008", stud_DOB: "2006-09-19"},
    {stud_name: "Skylar Black", stud_id: "J0009", stud_DOB: "2006-09-19"}
];
const logins=
[   
    {username: "DWade", password: "Whateverfitstheregex_123", role: "Teacher"},
    {username: "James12", password: "Whateverfitstheregex_123", role: "Admin"},
    {username: "Jessie34", password: "Whateverfitstheregex_123", role: "Viewer"}
];
const subjects= 
[
    {name: "Mathematics", subject_code: "MAT1"},
    {name: "English", subject_code: "ENG1"},
    {name: "Biology", subject_code: "BIO1"},
    {name: "Physics", subject_code: "PHY1"},
    {name: "Chemistry", subject_code: "CHM1"}
]
const curriculum_mapping= 
[
    {subject_code: "MAT1", stud_id: ["A0000", "D0003", "E0004", "F0005", "H0007"], academic_year: "AY26/27", semester: "Semester 1"},
    {subject_code: "ENG1", stud_id: ["B0001", "A0000", "C0002", "F0005", "I0008"], academic_year: "AY26/27", semester: "Semester 1"},
    {subject_code: "BIO1", stud_id: ["C0002", "A0000", "B0001", "F0005", "I0008"], academic_year: "AY26/27", semester: "Semester 1"},
    {subject_code: "PHY1", stud_id: ["D0003", "E0004", "B0001", "H0007", "I0008"], academic_year: "AY26/27", semester: "Semester 1"},
    {subject_code: "CHM1", stud_id: ["E0004", "G0006", "J0009", "H0007", "I0008"], academic_year: "AY26/27", semester: "Semester 1"}
]
const grades= 
[
    {stud_id: "A0000", subject_code: "MAT1", score: 0, academic_year: "AY26/27", semester: "Semester 1"},
    {stud_id: "B0001", subject_code: "ENG1", score: 100, academic_year: "AY26/27", semester: "Semester 1"},
    {stud_id: "C0002", subject_code: "BIO1", score: 90, academic_year: "AY26/27", semester: "Semester 1"},
    {stud_id: "D0003", subject_code: "PHY1", score: 10, academic_year: "AY26/27", semester: "Semester 1"},
    {stud_id: "E0004", subject_code: "CHM1", score: 80, academic_year: "AY26/27", semester: "Semester 1"},
    {stud_id: "F0005", subject_code: "MAT1", score: 70, academic_year: "AY26/27", semester: "Semester 1"},
    {stud_id: "G0006", subject_code: "CHM1", score: 20, academic_year: "AY26/27", semester: "Semester 1"},
    {stud_id: "H0007", subject_code: "PHY1", score: 100, academic_year: "AY26/27", semester: "Semester 1"},
    {stud_id: "I0008", subject_code: "PHY1", score: 40, academic_year: "AY26/27", semester: "Semester 1"},
    {stud_id: "J0009", subject_code: "CHM1", score: 55, academic_year: "AY26/27", semester: "Semester 1"},
    {stud_id: "A0000", subject_code: "ENG1", score: 0, academic_year: "AY26/27", semester: "Semester 1"},
    {stud_id: "B0001", subject_code: "PHY1", score: 75, academic_year: "AY26/27", semester: "Semester 1"},
    {stud_id: "C0002", subject_code: "ENG1", score: 100, academic_year: "AY26/27", semester: "Semester 1"},
    {stud_id: "D0003", subject_code: "MAT1", score: 65, academic_year: "AY26/27", semester: "Semester 1"},
    {stud_id: "E0004", subject_code: "PHY1", score: 100, academic_year: "AY26/27", semester: "Semester 1"},
    {stud_id: "F0005", subject_code: "ENG1", score: 30, academic_year: "AY26/27", semester: "Semester 1"},
    {stud_id: "A0000", subject_code: "BIO1", score: 10, academic_year: "AY26/27", semester: "Semester 1"},
    {stud_id: "H0007", subject_code: "MAT1", score: 42, academic_year: "AY26/27", semester: "Semester 1"},
    {stud_id: "I0008", subject_code: "CHM1", score: 67, academic_year: "AY26/27", semester: "Semester 1"},
    {stud_id: "B0001", subject_code: "BIO1", score: 81, academic_year: "AY26/27", semester: "Semester 1"}
]
const ledger= 
[
    {stud_id: "A0000", ledger_id: "A1B2C3D4E5F6", academic_year: "AY26/27", semester: "Semester 1", tuition: 60000.00, balance: 60000.00},
    {stud_id: "B0001", ledger_id: "ABCDEFGHIJKL", academic_year: "AY26/27", semester: "Semester 1", tuition: 50000.00, balance: 20000.00},
    {stud_id: "C0002", ledger_id: "ABCDEFGHIJK1", academic_year: "AY26/27", semester: "Semester 1", tuition: 40000.00, balance: 20000.00},
    {stud_id: "D0003", ledger_id: "ABCDEFGHIJK2", academic_year: "AY26/27", semester: "Semester 1", tuition: 30000.00, balance: 30000.00},
    {stud_id: "E0004", ledger_id: "ABCDEFGHIJK3", academic_year: "AY26/27", semester: "Semester 1", tuition: 20000.00, balance: 0.00},
    {stud_id: "F0005", ledger_id: "ABCDEFGHIJK4", academic_year: "AY26/27", semester: "Semester 1", tuition: 70000.00, balance: 5000.00},
    {stud_id: "G0006", ledger_id: "ABCDEFGHIJK5", academic_year: "AY26/27", semester: "Semester 1", tuition: 60000.00, balance: 60000.00},
    {stud_id: "H0007", ledger_id: "ABCDEFGHIJK6", academic_year: "AY26/27", semester: "Semester 1", tuition: 50000.00, balance: 10000.00},
    {stud_id: "I0008", ledger_id: "ABCDEFGHIJK7", academic_year: "AY26/27", semester: "Semester 1", tuition: 40000.00, balance: 0.00},
    {stud_id: "J0009", ledger_id: "ABCDEFGHIJK8", academic_year: "AY26/27", semester: "Semester 1", tuition: 40000.00, balance: 30000.00}
]
if (load("student_registry").length === 0){
    save("student_registry", student_registry);
}
if (load("logins").length === 0){
    save("logins", logins);
}
if (load("subjects").length === 0){
    save("subjects", subjects);
}
if (load("curriculum_mapping").length === 0){
    save("curriculum_mapping",curriculum_mapping);
}
if (load("grades").length === 0){
    save("grades", grades);
}
if (load("ledger").length === 0){
    save("ledger", ledger);
}