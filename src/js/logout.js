const logout = () => {
    var url = '../src/controllers/logout.php';
    logoutCall(url);
}

function logoutCall(url){
    const form = document.querySelector('#form');

    form.addEventListener('submit', event => {
        event.preventDefault();

        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
      
        // send request
        xhr.send();
      
        // listen for `load` event
        xhr.onload = () => {
            window.location.href = xhr.responseText;
        }
    })
}
  