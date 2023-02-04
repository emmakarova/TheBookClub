const register = () => {
    var url = '../src/controllers/register.php';
    registerCall(url);
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
            var passwordErrors = document.getElementById("password-error");
            passwordErrors.innerHTML = "";
            return;
        }

        // + == 403
        if (xhr.status != 200) {
            var usernameErrors = document.getElementById("username-error");
            usernameErrors.innerHTML = "";
            var passwordErrors = document.getElementById("password-error");
            passwordErrors.innerHTML = xhr.responseText;
            return;
        }

        window.location.href = xhr.responseText;
    }
}
  