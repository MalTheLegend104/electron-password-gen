function onSubmit(){
    getDefaultValue();
}

function getDefaultValue() {

    fetch('config.json').then(function (response){
        return response.json();
    })
    .then(function (data){
        preloadValues(data);
    })
    .catch(function (err){
        data = 8;
        preloadValues(data);
        console.log(err);
        alert(`Unexpected error occured: \n${err}\nErrors like this should not occur.\nPlease report this error as an issue on the github repo, along with a screenshot of this error message.`)
    })
}

function preloadValues(data){
    var chars = parseInt(document.getElementById('chars').value);
    var nums = document.querySelector('#nums').checked;
    var special = document.querySelector('#special').checked;
    var defaultValue = data[2].value;
    makePass(chars, nums, special, defaultValue);
}

function makePass(chars, nums, special, defaultValue){
    chars = parseInt(chars);
    hasNums = Boolean(nums);
    hasSpecial = Boolean(special);
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
    finalList += alpha;
    if (hasNums === true){
        finalList += numbers;
    }
    if (hasSpecial === true){
        finalList += specialChars;
    }
    var password = "";
    for (i = 0; i < finalChars; i++){
        password += finalList.charAt(Math.floor(Math.random() * finalList.length));
    }
    checkAutoCopy();
    showCopy();
    document.getElementById("outputField").value = password;
}

function checkAutoCopy(){
    fetch('config.json').then(function (response){
        return response.json();
    })
    .then(function (data){
        autoCopy(data);
    })
    .catch(function (err){
        console.log(err);
        alert(`Unexpected error occured: \n${err}\nErrors like this should not occur.\nPlease report this error as an issue on the github repo, along with a screenshot of this error message.`)
    })
}

function autoCopy(data){
    if (data[1].value == "True"){
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