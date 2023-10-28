//getting the current year
var date = new Date()
var currentYear = date.getFullYear()

//ddl godina
var ddlAge = document.querySelector("#ddlAge")

for(let i = 1940; i<=currentYear; i++){
    var html = `<option value="${i}">${i}</option>`

    ddlAge.innerHTML += html
}

// obj for storing user data
var userData = {
    ime: '',
    prezime: '',
    pol: '',
    godina: '',
    adresa: '',
    grad: ''
};

//regex patterns
var reFirstOrLastName = /^[A-ZŽŠČĆĐ][a-zžščćđ]{2,}$/
var reAddress = /^(([A-ZŽŠČĆĐ][a-zžščćđ]{1,15}(\.)?)|([1-9][0-9]{0,2}(\.)?))[a-zA-Z0-9\s\/\-]+$/

//function for checking input elements
function checkField(element, regex = /[^0]/){
    //getting the element value
    var elValue = element.value
    //getting userData key from data-key
    var objKey = element.dataset.key

    //if value doesn't match the regex pattern
    if(!regex.test(elValue)){
        element.classList.add("error")
        element.nextElementSibling.classList.remove("hide")
        return 1
    }
    // if value does match the regex pattern
    else{
        element.classList.remove("error")
        element.nextElementSibling.classList.add("hide")
        userData[objKey] = elValue
        return 0
    }
}

//getting all the form elements
var firstName = document.querySelector("#tbFirstName")
var lastName = document.querySelector("#tbLastName")
var gender = document.getElementsByName("rbGender")
var age = document.querySelector("#ddlAge")
var address = document.querySelector("#taAddress")
var city = document.querySelector("#ddlCity")

var btnPosalji = document.querySelector("#btnSend");

function checkRadio(elements){
    var checkedRadioValue
    var gendersDiv = document.querySelector("#gender-div")
    for (i = 0; i < elements.length; i++) {
        if (elements[i].checked){
            checkedRadioValue = elements[i].value
            break
        }
    }

    if(checkedRadioValue){
        userData.pol = checkedRadioValue
        gendersDiv.classList.remove("error")
        gendersDiv.nextElementSibling.classList.add("hide")
        return 0
    }
    else{
        gendersDiv.classList.add("error")
        gendersDiv.nextElementSibling.classList.remove("hide")
        return 1
    }
}


//check the entire form
function checkForm(){
    var errors;

    //getting all the elements
    var resFirstName = checkField(firstName, reFirstOrLastName)
    var resLastName = checkField(lastName, reFirstOrLastName)
    var resAge = checkField(age)
    var resAddress = checkField(address, reAddress)
    var resCity = checkField(city)
    var resGender = checkRadio(gender)
   

    //errors should be 0
    errors = resFirstName + resLastName + resAge + resAddress + resCity + resGender

    if(!errors){
        // $.ajax({
        //     url: "obrada.php",
        //     method: "post",
        //     dataType: 'json',
        //     data: userData,
        //     success: function(result){
        //         console.log(result);
        //     },
        //     error: function(xhr){
        //         console.log(xhr);
        //     }
        // })


        // show data instead of the form
        var html = ''
        for(let key in userData){
            html += `<p>${key}: ${userData[key]}</p>`
        }
        document.querySelector("#data-rez").innerHTML = html
        document.querySelector("#data-rez").parentElement.classList.remove("hide")
        document.querySelector("form").classList.add("hide")
    }
}

btnPosalji.addEventListener("click", checkForm)
