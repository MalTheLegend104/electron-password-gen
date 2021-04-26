document.addEventListener("DOMContentLoaded", function(){
    readConfig();
});

function readConfig(){
    fetch('config.json').then(function (response){
        return response.json();
    })
    .then(function (data){
        setTheme(data);
        setDefaultValue(data);
        try {
            setDropDowns(data);
        } catch(err) {
            alert(`${err}`);
        }
    })
    .catch(function (err){
        console.log(err);
        alert(`Unexpected error occured: \n${err}\nErrors like this should not occur.\nPlease report this error as an issue on the github repo, along with a screenshot of this error message.`)
    });
}

function setTheme(data){
    var body = document.getElementById("body")
    if (data[0].value == "Light"){
        body.classList.add("Light");
    } else if (data[0].value == "Dark"){
        body.classList.add("Dark");
    }
}

function setDefaultValue(data){
    defaultValue = data[2].value;
    if (data[2].value == ""){
        defaultValue = 8;
    }
    document.getElementById("chars").value = defaultValue;
}

function setDropDowns(data){
    let copySetting;
    let themeSetting;
    if (data[0].value == "Dark"){
        themeSetting = 0;
    } else if (data[0].value == "Light") {
        themeSetting = 1; 
    } else {
        themeSetting = 0;
        alert(`Unexpected error occured: \nFailed to load theme from config.\nErrors like this should not occur.\nPlease report this error as an issue on the github repo, along with a screenshot of this error message.`)
    }
    if (data[1].value == "False"){
        copySetting = 0;
    } else if (data[1].value == "True") {
        copySetting = 1; 
    } else {
        copySetting = 0;
        alert(`Unexpected error occured: \nFailed to load AutoCopy from config.\nErrors like this should not occur.\nPlease report this error as an issue on the github repo, along with a screenshot of this error message.`)
    }
    document.getElementById("copySettings").selectedIndex = copySetting;
    document.getElementById("theme").selectedIndex = themeSetting;
}