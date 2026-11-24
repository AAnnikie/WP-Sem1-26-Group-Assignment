/*
Zane Bryce 2404207 Wednesday 6-8pm
Adriana Pinnock 2401828 Wednesday 6-8pm
Tashea Thompson 2401109 Wednesday 6-8pm
Alex Annikie 2208624 Wednesday 6-8pm
Joel Clarke 2407184 Wednesday 6-8pm

CIT2011 Group Project: School Portal
File Purpose: Handles the validation of the login page.
*/

const myForm = document.querySelector("form");
myForm.addEventListener("submit",function(event){ // Without stopping the "submit" event, the form would submit and the page would refresh
    event.preventDefault(); // w3schools: Event preventDefault()
    // Username: required and cannot consist of empty spaces
    const usernameBox = document.querySelector("#username");
    const usernameError = document.querySelector("#usernameError");
    if (usernameBox.value.trim() === ""){   // .trim() cuts trailing and leading spaces from a string (W3Schools: JavaScript String trim())
        usernameError.textContent = "Please type in your username.";
    }else{
        usernameError.textContent = "";
    }
    // Password: required and cannot consist of empty spaces
    const passwordBox = document.querySelector("#password");
    const passwordError = document.querySelector("#passwordError");
    if (passwordBox.value.trim() === ""){   // .trim() cuts trailing and leading spaces from a string (W3Schools: JavaScript String trim())
        passwordError.textContent = "Please type in your password.";
    }else{
        passwordError.textContent = "";
    }
    // Each failed rule has already written an in-place error label; any non-empty label stops the form
    let everythingValid = true;    // Begins as true as any missing value flips to false and fails validation.
    if (usernameError.textContent !== ""){
        everythingValid = false;
    }
    if (passwordError.textContent !== ""){
        everythingValid = false;
    }
    // Compare the typed details with the saved logins
    if (everythingValid){
        const logins = load("logins");
        let found = null;
        for (const l of logins){
            if (l.username === usernameBox.value.trim() && l.password === passwordBox.value){
                found = true;
                // Saves who logged in for this tab only (W3Schools: "Window sessionStorage")
                const value  = {role: l.role, username: l.username};
                const valueAsString = JSON.stringify(value);
                sessionStorage.setItem("current_user", valueAsString);
                // Send the user to the dashboard for their role
                if (l.role === "Admin"){
                    window.location.href = "titchfield-high-22-fort-george-st-port-antonio-admin.html"; // W3Schools: "JavaScript Window Location"
                }else if(l.role === "Teacher"){
                    window.location.href = "titchfield-high-22-fort-george-st-port-antonio-teacher.html";
                }else if(l.role === "Viewer"){
                    window.location.href = "titchfield-high-22-fort-george-st-port-antonio-viewer.html";
                }
            }
        }
        // No matching account: one message, without saying which field was wrong
        if (found === null){
            passwordError.textContent = "Incorrect username or password";
        }
    }
});