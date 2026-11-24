/*
Zane Bryce 2404207 Wednesday 6-8pm
Adriana Pinnock 2401828 Wednesday 6-8pm
Tashea Thompson 2401109 Wednesday 6-8pm
Alex Annikie 2208624 Wednesday 6-8pm
Joel Clarke 2407184 Wednesday 6-8pm

CIT2011 Group Project: School Portal
File Purpose: Contact page regex/email validation
*/


// Check the email format when the form is submitted
document.getElementById("contactForm").addEventListener("submit", function (e) {

    const email = document.getElementById("email").value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Stop the form from sending and warn if the email is not valid
    if (!emailRegex.test(email)) {
        e.preventDefault();
        alert("Please enter a valid email address.");
    }
});