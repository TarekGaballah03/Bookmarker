//declaration 
var SiteNameInput = document.getElementById('SiteName');
var SiteURLInput = document.getElementById('SiteURL');
var Data = document.getElementById('Data');
var box = document.getElementById('box');
var close = document.getElementById('close');
urlList = [];

//check if array is empty
if (localStorage.getItem('urls') == null) {
    urlList = [];
} else {
    urlList = JSON.parse(localStorage.getItem('urls'));
    display();

}

//function to add to list
function addToList() {
    if (SiteNameInput.value == '' || SiteURLInput.value == '') {
        box.classList.replace('d-none', 'd-flex');
        return;
    }
    if (ValidateName() && ValidateUrl()) {
        var urls = {
            name: SiteNameInput.value,
            url: SiteURLInput.value,
        }
        urlList.push(urls);
        reset();
        localStorage.setItem('urls', JSON.stringify(urlList));
        SiteNameInput.classList.remove('is-valid', 'is-invalid'); // Remove validation classes
        SiteURLInput.classList.remove('is-valid', 'is-invalid');// Remove validation classes
        display();
    }
    else {
        box.classList.replace('d-none', 'd-flex');
    }
}


//reset and delete all values added
function reset() {
    SiteNameInput.value = "";
    SiteURLInput.value = "";
}

//function to display the list
function display() {
    var string = '';
    for (var i = 0; i < urlList.length; i++) {
        string += `
        <div class="text-center bg-light p-2 border-bottom"> 
         <div  class="row gy-2">
        <div class="col-3 d-flex justify-content-center align-items-center">
                <h6>${[i + 1]}</h6>
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
                <h6>${urlList[i].name}</h6>
            </div>
            <div class="col-3">
                <button id="VisitBtn" class="btn btn-success"><a href="${"https://"+urlList[i].url}" target="_blank" class="text-light text-decoration-none"><i class="fas fa-eye pe-2"></i>Visit</a></button>
            </div>
            <div class="col-3">
                <button onclick=" remove(${i})" id="DeleteBtn" class="btn btn-danger"><i class="fas fa-trash-can pe-2"></i>Delete</button>
            </div>
            </div>
            </div>
        
        `;
    }
    Data.innerHTML = string;
}

//function to delete
function remove(i) {
    urlList.splice(i, 1);
    display();
    localStorage.setItem('urls', JSON.stringify(urlList));
}
//two functions two validate inputs
function ValidateName() {
    var NameRegex = /[a-z]{3,7}/;
    var isValid = NameRegex.test(SiteNameInput.value);
    SiteNameInput.classList.remove('is-valid', 'is-invalid');
    if (isValid) {
        SiteNameInput.classList.add('is-valid');
        return true;
    }
    else {
        SiteNameInput.classList.add('is-invalid');
        return false;
    }

}
function ValidateUrl() {
    var UrlRegex = /^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3}/;
    var isValid = UrlRegex.test(SiteURLInput.value);
    SiteURLInput.classList.remove('is-valid', 'is-invalid');
    if (isValid) {
        SiteURLInput.classList.add('is-valid');
        return true;
    }
    else {
        SiteURLInput.classList.add('is-invalid');
        return false;
    }

}
//function to close alert box
close.addEventListener('click', function () {
    box.classList.replace('d-flex', 'd-none');
})