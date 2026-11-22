/*
Zane Bryce 2404207 Wednesday 6-8pm
Adriana Pinnock 2401828



CIT2011 Group Project: School Portal
File Purpose: Handles the security of each role dashboard.
*/

function checkAccess(){
    const userText = sessionStorage.getItem("current_user");

    // Route boundary: opening any dashboard directly with no saved data redirects to login.html
    if (userText === null){ // The user would have no information so it routes to the home page 
        window.location.href = "login.html";
    }else{
        const user = JSON.parse(userText); // (W3Schools: "JSON.parse())"
        const allowedRoles = document.querySelector("body").dataset.role.split(" ");
        if(!allowedRoles.includes(user.role)){
            window.location.href = "login.html";
        }
    }
}
checkAccess();

window.addEventListener("pageshow",function(event){
    if (event.persisted === true){
        checkAccess();
    }   
});
const logOut = document.querySelector("#logout");
    logOut.addEventListener("click",function(event){
        sessionStorage.removeItem("current_user");
        window.location.href = "login.html";
});
