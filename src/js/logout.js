const logout = () => {
    var url = '../src/controllers/logout.php';
    logoutCall(url);
}

function logoutCall(url){
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    
    // send request
    xhr.send();
    
    // listen for `load` event
    xhr.onload = () => {
        window.location.href = xhr.responseText;
    }
}
  