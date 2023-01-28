function upload() {
    var url = '../src/controllers/upload.php';
    uploadCall(url);
}

function uploadCall(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('FILES', url);
    
    // const form = document.querySelector('#upload-form');
    // let data = new FormData(form);
    // const values = [...data.entries()];

    // var d = "";

    // // skip resource-type=on and link/file
    // for (let i = 2; i < values.length; i++) {
    //     d += '&' + values[i][0] + '=' + values[i][1];
    // }
    // d = d.substring(1);

    // console.log(d);

    // // set headers
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    
    // send request
    xhr.send();
    
    // listen for `load` event
    xhr.onload = () => {
        if (xhr.status != 200) {
            console.log("response = ", xhr.responseText, "\nstatus = ", xhr.status);
            return;
        }

        console.log("resp = ", xhr.responseText);

        // form.reset();
    }
}

const allowChoosenInput = () => {
    var linkBtn = document.getElementById("link-btn");
    var fileBtn = document.getElementById("file-btn");
    var link = document.getElementById("link");
    var file = document.getElementById("file");

    link.disabled = !linkBtn.checked;
    link.style.display = linkBtn.checked ? "block" : "none";

    file.disabled = !fileBtn.checked;
    file.style.display = fileBtn.checked ? "block" : "none";
}
