let fs = require('fs')
const electron = require('electron')
const userDataPath = (electron.app || electron.remote.app).getPath('userData');
var dir = userDataPath + '/config/config.json';

document.addEventListener("DOMContentLoaded", function(){
    readConfig();
});

const config = require(dir);
function readConfig(){
    setTheme();
    setDefaultValue();
    setDropDowns();
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
        console.log(config.theme.text)
        document.body.style.color = `${config.theme.text}`;
    }
}

function setDefaultValue(){
    defaultValue = config.settings.defaultValue;
    if (defaultValue == ""){
        defaultValue = 8;
    }
    document.getElementById("chars").value = defaultValue;
}

function setDropDowns(){
    let copySetting;
    let themeSetting;
    const themeValue = config.theme.current;
    const autoCopySetting = config.settings.autoCopy; 
    if (themeValue == "Dark"){
        themeSetting = 0;
    } else if (themeValue == "Light") {
        themeSetting = 1; 
    } else if (themeValue == "Custom") {
        themeSetting = 2;
        document.getElementById("customColor").value = config.theme.userCustom;
        document.getElementById("customColorDiv").classList.remove("completelyGone");
        const textValue = config.theme.text;
        if (textValue == "black"){
            document.getElementById("text").selectedIndex = 0;
        } else {
            document.getElementById("text").selectedIndex = 1;
        }
    } else {
        themeSetting = 0;
        alert(`Unexpected error occured: \nFailed to load theme from config.\nErrors like this should not occur.\nPlease report this error as an issue on the github repo, along with a screenshot of this error message.`)
    } 
    if (autoCopySetting == "False"){
        copySetting = 0;
    } else if (autoCopySetting == "True") {
        copySetting = 1; 
    } else {
        copySetting = 0;
        alert(`Unexpected error occured: \nFailed to load AutoCopy from config.\nErrors like this should not occur.\nPlease report this error as an issue on the github repo, along with a screenshot of this error message.`)
    }
    document.getElementById("copySettings").selectedIndex = copySetting;
    document.getElementById("theme").selectedIndex = themeSetting;
}

function setCheckBoxes(){
    const numVal = config.checkboxes.numbers;
    const specialVal = config.checkboxes.special;
    const lettersVal = config.checkboxes.letters;
    if (numVal === "False"){
        document.getElementById("numbersCheck").selectedIndex = 0;
    } else {
        document.getElementById("numbersCheck").selectedIndex = 1;
    }
    if (specialVal === "False"){
        document.getElementById("specialCheck").selectedIndex = 0;
    } else {
        document.getElementById("specialCheck").selectedIndex = 1;
    }
    if (lettersVal === "False"){
        document.getElementById("letterCheck").selectedIndex = 0;
    } else {
        document.getElementById("letterCheck").selectedIndex = 1;
    }
}

function updateSettings(){
    var theme = document.getElementById('theme').value;
    var copySetting = document.getElementById('copySettings').value;
    var defaultValue = document.getElementById('chars').value;
    //checkboxes
    var numbersCheckValue = document.getElementById('numbersCheck').value;
    var specialCheckValue = document.getElementById('specialCheck').value;
    var letterCheckValue = document.getElementById('letterCheck').value;
    if (defaultValue == ""){
        defaultValue = 8;
    } else {
        defaultValue = defaultValue;
    }
    if (theme == "Custom"){
        var customColor = getCustomColor();
        var textColor = getTextColor();
    } else {
        var customColor = "null";
    }
var finalJSON = 
`{
    "theme": {
        "current": "${theme}",
        "userCustom": "${customColor}",
        "text": "${textColor}"
    },
    "checkboxes": {
        "numbers": "${numbersCheckValue}",
        "special": "${specialCheckValue}",
        "letters": "${letterCheckValue}"
    },
    "settings": {
        "autoCopy": "${copySetting}",
        "defaultValue": "${defaultValue}"
    }
}`
    try{
        writeToFile(finalJSON);
    } catch (err) {
        alert(`Unexpected error occured: \n${err}\nErrors like this should not occur.\nPlease report this error as an issue on the github repo, along with a screenshot of this error message.`)
    }
    
    
}

function writeToFile(finalJSON){
    fs.writeFileSync(dir, `${finalJSON}`, function(err) {
        if (err) {
            alert(`Unexpected error occured: \n${err}\nErrors like this should not occur.\nPlease report this error as an issue on the github repo, along with a screenshot of this error message.`)
            return console.error(err);
        }
        console.log("Data written successfully!");
    });  
    window.location.reload(); 
}

function resetSettings(){
var finalJSON = 
`{
    "theme": {
        "current": "Dark",
        "userCustom": "null",
        "text": "ffffff"
    },
    "checkboxes": {
        "numbers": "True",
        "special": "True",
        "letters": "True"
    },
    "settings": {
        "autoCopy": "False",
        "defaultValue": "8"
    }
}`
    writeToFile(finalJSON);
    window.location.reload(); 
}

function getCustomColor(){
    var bgColor = document.getElementById("customColor").value
    return bgColor;
}

function getTextColor(){
    var text = document.getElementById('text').value
    if (text == "Black"){
        color = 'black'
    } else {
        color = 'white'
    }
    return color;
}