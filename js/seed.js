/*
Zane Bryce 2404207 Wednesday 6-8pm
Adriana Pinnock 2401828




CIT2011 Group Project: School Portal
File Purpose: Fills the fresh page's empty keys with sample records based on the data shape, allowing instant tests and sample logins.
*/


const student_registry=
[
    {stud_name: "John Doe", stud_id: "A0000", stud_DOB: "2015-10-20", academic_year: "AY26/27", semester: "Semester 1", stud_status: "Active", stud_email:"john.doe@gmail.com", stud_phone: "8764567890", stud_address: "123 Main St, Kingston"},
    {stud_name: "Jane Dow", stud_id: "B0001", stud_DOB: "2014-11-21", academic_year: "AY26/27", semester: "Semester 1", stud_status: "Active", stud_email:"jane.dow@yahoo.com", stud_phone: "6587654321", stud_address: "456 Oak Ave, St.Andrew"},
    {stud_name: "Jack Sparrow", stud_id: "C0002", stud_DOB: "2013-09-19", academic_year: "AY26/27", semester: "Semester 1", stud_status: "Active", stud_email:"jack.sparrow@gmail.com", stud_phone: "6585577555", stud_address: "789 Pine Rd, Mandeville"},
    {stud_name: "Patrick Jane", stud_id: "D0003", stud_DOB: "2015-01-22", academic_year: "AY26/27", semester: "Semester 1", stud_status: "Active", stud_email:"patrick.jane@gmail.com", stud_phone: "8764444444", stud_address: "321 Elm St, Spanish Town, St.Catherine"},
    {stud_name: "Red John", stud_id: "E0004", stud_DOB: "2014-05-30", academic_year: "AY26/27", semester: "Semester 1", stud_status: "Active", stud_email:"red.john@gmail.com", stud_phone: "8763333333", stud_address: "654 Maple Dr, Townsville"},
    {stud_name: "Dexter Morgan", stud_id: "F0005", stud_DOB: "2013-12-03", academic_year: "AY26/27", semester: "Semester 1", stud_status: "Active", stud_email:"dexter.morgan@icloud.com", stud_phone: "8762223422", stud_address: "987 Cedar Ln, Villagetown"},
    {stud_name: "James Doakes", stud_id: "G0006", stud_DOB: "2015-09-14", academic_year: "AY26/27", semester: "Semester 1", stud_status: "Active", stud_email:"james.doakes@gmail.com", stud_phone: "8761178111", stud_address: "321 Oak Ave, Cityville"},
    {stud_name: "Walter White", stud_id: "H0007", stud_DOB: "2014-04-24", academic_year: "AY26/27", semester: "Semester 1", stud_status: "Active", stud_email:"walter.white@gmail.com", stud_phone: "6582692222", stud_address: "654 Pine Rd, Townsville"},
    {stud_name: "Jesse Pinkman", stud_id: "I0008", stud_DOB: "2013-08-06", academic_year: "AY26/27", semester: "Semester 1", stud_status: "Active", stud_email:"jesse.pinkman@gmail.com", stud_phone: "8763345333", stud_address: "987 Maple Dr, Villagetown"},
    {stud_name: "Skylar Black", stud_id: "J0009", stud_DOB: "2014-02-03", academic_year: "AY26/27", semester: "Semester 1", stud_status: "Active", stud_email:"skylar.black@yahoo.com", stud_phone: "8764444467", stud_address: "123 Elm St, Cityville"},
    
    {stud_name: "Mike Stalm", stud_id: "K0010", stud_DOB: "2014-03-15", academic_year: "AY26/27", semester: "Semester 2", stud_status: "Active", stud_email: "mike.e@gmail.com", stud_phone: "8765550101", stud_address: "12 Hope Rd, Kingston"},
    {stud_name: "Saul Goodman", stud_id: "L0011", stud_DOB: "2013-07-08", academic_year: "AY26/27", semester: "Semester 2", stud_status: "Active", stud_email: "saul.g@gmail.com", stud_phone: "6585550102", stud_address: "45 Palm Ave, Spanish Town"},
    {stud_name: "Gus Fringe", stud_id: "M0012", stud_DOB: "2015-01-30", academic_year: "AY26/27", semester: "Semester 2", stud_status: "Active", stud_email: "gus.f@yahoo.com", stud_phone: "8765550103", stud_address: "8 Cedar Ln, Portmore"},
    {stud_name: "Hank Schrader", stud_id: "N0013", stud_DOB: "2014-09-12", academic_year: "AY26/27", semester: "Semester 2", stud_status: "Active", stud_email: "hank.s@gmail.com", stud_phone: "8765550104", stud_address: "230 Mango St, Mandeville"},
    {stud_name: "Marie Dore", stud_id: "O0014", stud_DOB: "2013-11-25", academic_year: "AY26/27", semester: "Semester 2", stud_status: "Active", stud_email: "marie.s@gmail.com", stud_phone: "6585550105", stud_address: "67 Orange Rd, Montego Bay"}
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
    {subject_code: "CHM1", stud_id: ["E0004", "G0006", "J0009", "H0007", "I0008"], academic_year: "AY26/27", semester: "Semester 1"},

    {subject_code: "MAT1", stud_id: ["K0010", "O0014"], academic_year: "AY26/27", semester: "Semester 2"},
    {subject_code: "ENG1", stud_id: ["K0010", "L0011"], academic_year: "AY26/27", semester: "Semester 2"},
    {subject_code: "BIO1", stud_id: ["L0011", "M0012"], academic_year: "AY26/27", semester: "Semester 2"},
    {subject_code: "PHY1", stud_id: ["M0012", "N0013"], academic_year: "AY26/27", semester: "Semester 2"},
    {subject_code: "CHM1", stud_id: ["N0013", "O0014"], academic_year: "AY26/27", semester: "Semester 2"}
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
    {stud_id: "B0001", subject_code: "BIO1", score: 81, academic_year: "AY26/27", semester: "Semester 1"},

    {stud_id: "K0010", subject_code: "MAT1", score: 72, academic_year: "AY26/27", semester: "Semester 2"},
    {stud_id: "K0010", subject_code: "ENG1", score: 65, academic_year: "AY26/27", semester: "Semester 2"},
    {stud_id: "L0011", subject_code: "ENG1", score: 88, academic_year: "AY26/27", semester: "Semester 2"},
    {stud_id: "L0011", subject_code: "BIO1", score: 91, academic_year: "AY26/27", semester: "Semester 2"},
    {stud_id: "M0012", subject_code: "BIO1", score: 54, academic_year: "AY26/27", semester: "Semester 2"},
    {stud_id: "M0012", subject_code: "PHY1", score: 60, academic_year: "AY26/27", semester: "Semester 2"},
    {stud_id: "N0013", subject_code: "PHY1", score: 79, academic_year: "AY26/27", semester: "Semester 2"},
    {stud_id: "N0013", subject_code: "CHM1", score: 83, academic_year: "AY26/27", semester: "Semester 2"},
    {stud_id: "O0014", subject_code: "CHM1", score: 95, academic_year: "AY26/27", semester: "Semester 2"},
    {stud_id: "O0014", subject_code: "MAT1", score: 77, academic_year: "AY26/27", semester: "Semester 2"},
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
    {stud_id: "J0009", ledger_id: "ABCDEFGHIJK8", academic_year: "AY26/27", semester: "Semester 1", tuition: 40000.00, balance: 30000.00},
    
    {stud_id: "K0010", ledger_id: "LDGK0010A1B2", academic_year: "AY26/27", semester: "Semester 2", tuition: 60000.00, balance: 0.00},
    {stud_id: "L0011", ledger_id: "LDGL0011C3D4", academic_year: "AY26/27", semester: "Semester 2", tuition: 60000.00, balance: 30000.00},
    {stud_id: "M0012", ledger_id: "LDGM0012E5F6", academic_year: "AY26/27", semester: "Semester 2", tuition: 60000.00, balance: 60000.00},
    {stud_id: "N0013", ledger_id: "LDGN0013G7H8", academic_year: "AY26/27", semester: "Semester 2", tuition: 60000.00, balance: 15000.00},
    {stud_id: "O0014", ledger_id: "LDGO0014I9J0", academic_year: "AY26/27", semester: "Semester 2", tuition: 60000.00, balance: 0.00}
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