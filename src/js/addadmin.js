const addAdmin = () => {
    var firstNameErrors = document.getElementById("first-name-error");
    firstNameErrors.innerHTML = "";

    var lastNameErrors = document.getElementById("last-name-error");
    lastNameErrors.innerHTML = "";

    var passwordErrors = document.getElementById("password-error");
    passwordErrors.innerHTML = "";

    var usernameErrors = document.getElementById("username-error");
    usernameErrors.innerHTML = "";

    if (!validateInput()) {
        return;
    }

    var url = '../src/controllers/register.php';
    registerCall(url);
}


function validateInput() {
    var validInput = true;

    var firstName = String(document.querySelector('#first-name').value);

    if (firstName == null || firstName.length == 0) {
        var firstNameErrors = document.getElementById("first-name-error");
        firstNameErrors.innerHTML = 'Моля попълни полето за име!';
        validInput = false;
    }

    var lastName = String(document.querySelector('#last-name').value);

    if (lastName == null || lastName.length == 0) {
        var lastNameErrors = document.getElementById("last-name-error");
        lastNameErrors.innerHTML = 'Моля попълни полето за фамилия!';

        validInput = false;
    }

    var username = String(document.querySelector('#username').value);

    if (username == null || username.length == 0) {
        var usernameErrors = document.getElementById("username-error");
        usernameErrors.innerHTML = 'Моля попълни полето за потребителско име!';

        validInput = false;
    }

    var password = String(document.querySelector('#password').value);
   
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
   
    if (password == null || !pattern.test(password)) {
        var passwordErrors = document.getElementById("password-error");
        passwordErrors.innerHTML = 'Паролата трябва да съдържа поне 6 символа,<br> цифра, главна и малка буква!';

        validInput = false;
    }

    return validInput;
}

function registerCall(url){
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    
    const form = document.querySelector('#register-form');
    let data = new FormData(form);
    const values = [...data.entries()];

    var d = "";
    for (const i of values) {
        d += '&' + i[0] + '=' + i[1];
    }

    d += '&admin_rights=true';

    d = d.substring(1);

    // set headers
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    
    // send request
    xhr.send(d);
    
    // listen for `load` event
    xhr.onload = () => {
        if (xhr.status == 409) {
            var usernameErrors = document.getElementById("username-error");
            usernameErrors.innerHTML = xhr.responseText;
            return;
        }

        // + == 403
        if (xhr.status != 200) {
            var passwordErrors = document.getElementById("password-error");
            passwordErrors.innerHTML = xhr.responseText;
            return;
        }

        window.location.href = xhr.responseText;
    }
}
  