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
        if (xhr.status != 200) {
            console.log("response = ", xhr.responseText, "\nstatus = ", xhr.status);
            return;
        }

        window.location.href = xhr.responseText;
    }
}
  