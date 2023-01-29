const login = () => {
    var url = '../src/controllers/login.php';
    loginCall(url);
}

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
    console.log("HERE");
    // listen for `load` event
    xhr.onload = () => {
        if (xhr.status != 200) {
            console.log("response = ", xhr.responseText,  "\nstatus = ", xhr.status);
            return;
        }
        console.log("response = ", xhr.responseText,  "\nstatus = ", xhr.status);
        window.location.href = xhr.responseText;
    }
}
  