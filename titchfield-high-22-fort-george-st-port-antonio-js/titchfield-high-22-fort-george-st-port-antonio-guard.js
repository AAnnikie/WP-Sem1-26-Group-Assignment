/*
Zane Bryce 2404207 Wednesday 6-8pm
Adriana Pinnock 2401828 Wednesday 6-8pm
Tashea Thompson 2401109 Wednesday 6-8pm
Alex Annikie 2208624 Wednesday 6-8pm
Joel Clarke 2407184 Wednesday 6-8pm

CIT2011 Group Project: School Portal
File Purpose: Handles the security of each role dashboard.
*/

// Checks the logged-in user against the roles allowed on this page (W3Schools: "Window sessionStorage")
function checkAccess(){
    const userText = sessionStorage.getItem("current_user");

    // Route boundary: opening any dashboard directly with no saved data redirects to titchfield-high-22-fort-george-st-port-antonio-login.html
    if (userText === null){ // The user would have no information so it routes to the home page 
        window.location.href = "titchfield-high-22-fort-george-st-port-antonio-login.html";
    }else{
        const user = JSON.parse(userText); // (W3Schools: "JSON.parse())"
        // Reads the allowed roles from the body's data-role attribute (MDN: "HTMLElement: dataset property")
        const allowedRoles = document.querySelector("body").dataset.role.split(" ");
        if(!allowedRoles.includes(user.role)){
            window.location.href = "titchfield-high-22-fort-george-st-port-antonio-login.html";
        }
    }
}
// Runs the check as soon as the page loads
checkAccess();

// Re-checks when the page is restored from the back/forward cache, e.g. pressing Back after logging out (MDN: "Window: pageshow event")
window.addEventListener("pageshow",function(event){
    if (event.persisted === true){
        checkAccess();
    }   
});
// Log out: clears the session and returns to the login page
const logOut = document.querySelector("#logout");
    logOut.addEventListener("click",function(event){
        sessionStorage.removeItem("current_user");
        window.location.href = "titchfield-high-22-fort-george-st-port-antonio-login.html";
});
