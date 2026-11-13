/*
Zane Bryce 2404207 Wednesday 6-8pm




CIT2011 Group Project: School Portal
File Purpose: Acts as the doorway to localStorage, which only stores text, while the data is an array of objects. 
Prevents members from having to individually parse/stringify code which can break data if not handled well. 
*/


function load(key){
    const savedText = localStorage.getItem(key);
    if (savedText !== null){
        return JSON.parse(savedText);
    }
    else{
        return [];
    }
}


function save(key, value){
    const valueAsString = JSON.stringify(value);
    localStorage.setItem(key, valueAsString);
}