const uploadResource = () => {
    var url = '../src/controllers/upload.php';
    uploadResourceCall(url);
}

function uploadResourceCall(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    
    const form = document.querySelector('#upload-form');
    let data = new FormData(form);
    const values = [...data.entries()];
    
    var d = "";

    // form link path and upload file (if existent)
    var fileBtn = document.getElementById("file-btn");
    if (fileBtn.checked) {
        if (!uploadFile(url)) {
            return;
        }
        d = "link=uploadedFiles/" + file.files[0].name;
    } else {
        d = "link=" + values[1][1];
    }

    // skip resource-type=on, and link/fileupload
    for (let i = 2; i < values.length; i++) {
        d += '&' + values[i][0] + '=' + values[i][1];
    }

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    
    // send request
    xhr.send(d);
    
    // listen for `load` event
    xhr.onload = () => {
        var uploadErrors = document.getElementById("upload-error");
        if (xhr.status != 200) {
            uploadErrors.innerHTML = xhr.responseText;
            return;
        }

        uploadErrors.innerHTML = "";
        var success = document.getElementById("success-message");
        success.innerHTML = xhr.responseText;
        $('#success-message').show(1).delay(5000).hide(1);

        form.reset();
    }
}

async function uploadFile() {
    let formData = new FormData();           
    formData.append("file", file.files[0]);

    let response = await fetch('../src/controllers/uploadFile.php', {
        method: "POST", 
        body: formData
    });    
    if (!response.ok) {
        console.log("response = ", response.text(), "\nstatus = ", response.status);
        return false;
    }
    return true;
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
