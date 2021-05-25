const electron = require('electron');
const userDataPath = (electron.app || electron.remote.app).getPath('userData');
var dir = userDataPath + '/config/config.json';
const config = require(dir)

document.addEventListener("DOMContentLoaded", function(){
    readConfig();
});

function readConfig(){
    setTheme();
    setDefaultValue();
    setCheckBoxes();
}

function setTheme(){
    var currentSelect = config.theme.current;
    var body = document.getElementById("body")
    if (currentSelect == "Light"){
        body.classList.add("Light");
    } else if (currentSelect == "Dark"){
        body.classList.add("Dark");
    } else if (currentSelect == "Custom"){
        document.body.style.backgroundColor = config.theme.userCustom;
        document.body.style.color = config.theme.text;
    }
}

function setDefaultValue(){
    let defaultValue = config.settings.defaultValue;
    if (defaultValue == ""){
        defaultValue = 8;
    }
    document.getElementById("chars").value = defaultValue;
}

function setCheckBoxes(){
    let numbersCheck = config.checkboxes.numbers;
    let specialCheck = config.checkboxes.special;
    let alphaCheck = config.checkboxes.letters;
    let nums = document.getElementById("nums")
    let special = document.getElementById("special")
    let letters = document.getElementById("letters")
    if (numbersCheck === "True"){
        nums.checked = true;
    }
    if (specialCheck === "True"){
        special.checked = true;
    }
    if (alphaCheck === "True"){
        letters.checked = true;
    } 
}

function onSubmit(){
    preloadValues();
}

function preloadValues(){
    var chars = parseInt(document.getElementById('chars').value);
    var nums = document.querySelector('#nums').checked;
    var special = document.querySelector('#special').checked;
    var letters = document.querySelector('#letters').checked;
    var defaultValue = config.settings.defaultValue;
    makePass(chars, nums, special, letters, defaultValue);
}

function makePass(chars, nums, special, letters, defaultValue){
    chars = parseInt(chars);
    hasNums = Boolean(nums);
    hasSpecial = Boolean(special);
    hasLetters = Boolean(letters);
    if (chars > 4096){
        finalChars = 4096;
    } else if (chars < 1){
        finalChars = defaultValue;
    } else if (isNaN(chars)){
        finalChars = defaultValue;
    } else {
        finalChars = chars;
    }
    var finalList = "";
    const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "1234567890";
    const specialChars = ",<.>/?!@#$%^&*()_-+=:;\"\u2215|~`'";
    if (hasLetters === true){
        finalList += alpha;
    }
    if (hasNums === true){
        finalList += numbers;
    }
    if (hasSpecial === true){
        finalList += specialChars;
    }
    if(finalList === ""){
        finalList += alpha;
    }
    var password = "";
    for (i = 0; i < finalChars; i++){
        password += finalList.charAt(Math.floor(Math.random() * finalList.length));
    }
    autoCopy();
    showCopy();
    document.getElementById("outputField").value = password;
}


function autoCopy(){
    if (config.settings.autoCopy == "True"){
        var output = document.getElementById("outputField");
        output.select();
        document.execCommand("copy");
        var copyTag = document.getElementById('copyTag');
        copyTag.classList.remove("invisible");
        setTimeout(() => {
            copyTag.classList.add("invisible")
        }, 2500);
    }
}

function showCopy(){
    var copyButton = document.getElementById("copyButton");
    copyButton.classList.remove("invisible");
    var outputField = document.getElementById('outputField');
    outputField.classList.remove("invisible");
}

function copyPass(){
    var output = document.getElementById("outputField");
    output.select();
    document.execCommand("copy");
    var copyTag = document.getElementById('copyTag');
    copyTag.classList.remove("invisible");
    setTimeout(() => {
        copyTag.classList.add("invisible")
    }, 2500);
}