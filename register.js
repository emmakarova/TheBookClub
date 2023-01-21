const register = () => {
    var url = 'src/register.php';
    registerCall(url);
}

function registerCall(url){
    const form = document.querySelector('#register-form');
 
    form.addEventListener('submit', event => {
        event.preventDefault();

        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
      
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
            console.log(xhr.responseText,"resp");
        }
    })
}
  