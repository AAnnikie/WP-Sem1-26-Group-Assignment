/*
Zane Bryce 2404207 Wednesday 6-8pm




CIT2011 Group Project: School Portal
File Purpose: Handles the security of each role dashboard.
*/

const userText = sessionStorage.getItem("current_user");
// Route boundary: opening any dashboard directly with no saved data redirects to login.html
if (userText === null){ // The user would have no information so it routes to the home page 
    window.location.href = "login.html";
}else{
    const user = JSON.parse(userText); // (W3Schools: "JSON.parse())"
    const roleText = document.querySelector("body").id;
    if(user.role !== roleText){
        window.location.href = "login.html";
    }
}
const logOut = document.querySelector("#logout");
logOut.addEventListener("click",function(event){
    sessionStorage.removeItem("current_user");
    window.location.href = "login.html";
});