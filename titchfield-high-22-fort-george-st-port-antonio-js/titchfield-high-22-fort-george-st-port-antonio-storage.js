/*
Zane Bryce 2404207 Wednesday 6-8pm
Adriana Pinnock 2401828 Wednesday 6-8pm
Tashea Thompson 2401109 Wednesday 6-8pm
Alex Annikie 2208624 Wednesday 6-8pm
Joel Clarke 2407184 Wednesday 6-8pm

CIT2011 Group Project: School Portal
File Purpose: Acts as the doorway to localStorage, which only stores text, while the data is an array of objects. 
Prevents members from having to individually parse/stringify code which can break data if not handled well. 
*/


// Load: reads a key from localStorage and turns the saved text back into an array (W3Schools: "JSON.parse()")
function load(key){
    const savedText = localStorage.getItem(key);
    if (savedText !== null){
        return JSON.parse(savedText);
    }
    // Nothing saved under this key yet, so an empty array is returned
    else{
        return [];
    }
}


// Save: turns the array into text and stores it under the key (W3Schools: "JSON.stringify()" and "Window localStorage")
function save(key, value){
    const valueAsString = JSON.stringify(value);
    localStorage.setItem(key, valueAsString);
}