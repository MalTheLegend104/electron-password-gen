let fs = require('fs')

function updateSettings(){
    var theme = document.getElementById('theme').value;
    var copySetting = document.getElementById('copySettings').value;
    var defaultValue = document.getElementById('chars').value;
    if (defaultValue == ""){
        defaultValue = 8;
    } else {
        defaultValue = defaultValue;
    }
var finalJSON = 
`
[
    {
        "id": "theme",
        "value": "${theme}"
    },
    {
        "id": "copySettings",
        "value": "${copySetting}"
    },
    {
        "id": "defaultValue",
        "value": "${defaultValue}"
    }
]
`
    try{
        writeToFile(finalJSON);
    } catch (err) {
        alert(`Unexpected error occured: \n${err}\nErrors like this should not occur.\nPlease report this error as an issue on the github repo, along with a screenshot of this error message.`)
    }
    
    
}

function writeToFile(finalJSON){
    fs.writeFileSync('./resources/app/config.json', `${finalJSON}`, function(err) {
        if (err) {
            alert(`Unexpected error occured: \n${err}\nErrors like this should not occur.\nPlease report this error as an issue on the github repo, along with a screenshot of this error message.`)
            return console.error(err);
        }
        console.log("Data written successfully!");
    });  

    window.location.reload(true); 
}

function resetSettings(){
var finalJSON = 
`
[
    {
        "id": "theme",
        "value": "Dark"
    },
    {
        "id": "copySettings",
        "value": "True"
    },
    {
        "id": "defaultValue",
        "value": "8"
    }
]
`
    writeToFile(finalJSON);
    window.location.reload(true); 
}