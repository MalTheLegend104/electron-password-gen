let fs = require('fs')
let $ = require('jquery')

$('#saveButton').on('click', () => {
    updateSettings();
});
$('#resetButton').on('click', () => {
    resetSettings();
});

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
    console.log(finalJSON)
    fs.writeFileSync('./config.json', `${finalJSON}`, function(err) {
        if (err) {
            alert(`Unexpected error occured: \n${err}\nErrors like this should not occur.\nPlease report this error as an issue on the github repo, along with a screenshot of this error message.`)
            return console.error(err);
        }
        console.log("Data written successfully!");
    });
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
    fs.writeFileSync('./config.json', `${finalJSON}`, function(err) {
        if (err) {
            alert(`An expected error occured: \n${err}\nErrors like this should not occur.\nPlease report this error as an issue on the github repo, along with a screenshot of this error message.`)
            return console.error(err);
        }
        console.log("Data written successfully!");
    });
}