const login = () => {
    var url = '../src/controllers/login.php';
    loginCall(url);
}

// TODO: Fix later?
// let loginForm = document.getElementById("login-form");
// if (loginForm) {
//     console.log("-----");
//     loginForm.addEventListener("submit", function (e) {
//         if (e.key === 'Enter') {
//             login();
//         }
//     });
// }

function loginCall(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    const form = document.querySelector('#login-form');
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
        if (xhr.status == 405) {
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
  