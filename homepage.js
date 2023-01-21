const xhr = new XMLHttpRequest();
xhr.open('GET', 'src/homepage.php');

// set headers
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

// send request
xhr.send();

// listen for `load` event
xhr.onload = () => {
    console.log(xhr.response,"resp");
    const newDiv = document.createElement("table");

    // and give it some content
    const newContent = document.createTextNode(xhr.response);
  
    // add the text node to the newly created div
    newDiv.appendChild(newContent);

    const currentDiv = document.getElementById("h1");
    document.body.insertBefore(newDiv, currentDiv);
    
    // var t = document.getElementById("resources");
    // var d = xhr.response;
    
    // for(let i = 0; i < d.length; i++) {
    //     console.log(d.length);
    // }
}
