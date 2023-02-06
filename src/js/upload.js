const uploadResource = () => {
    var linkErrors = document.getElementById("link-error");
    linkErrors.innerHTML = "";

    var titleErrors = document.getElementById("title-error");
    titleErrors.innerHTML = "";

    var authorErrors = document.getElementById("author-error");
    authorErrors.innerHTML = "";

    var readersErrors = document.getElementById("readers-error");
    readersErrors.innerHTML = "";

    var daysErrors = document.getElementById("days-error");
    daysErrors.innerHTML = "";

    var uploadErrors = document.getElementById("upload-error");
    uploadErrors.innerHTML = "";

    if (!validateInput()) {
        return;
    }
   
    var url = '../src/controllers/upload.php';
    uploadResourceCall(url);
}

function validateInput() {
    var validInput = true;

    var link = document.getElementById("link");
   
    if (link.style.display == 'block' && (link.value == null || link.value.length == 0)) {
        var linkErrors = document.getElementById("link-error");
        linkErrors.innerHTML = 'Моля попълни полето за линк!';
        validInput = false;
    }

    if (link.style.display == 'block') {
        try {
            new URL(link.value);
        } catch (err) {
            var linkErrors = document.getElementById("link-error");
            linkErrors.innerHTML = 'Линкът е невалиден!';
            validInput = false;
        }
    }

    var title = String(document.querySelector('#title').value);

    if (title == null || title.length == 0) {
        var titleErrors = document.getElementById("title-error");
        titleErrors.innerHTML = 'Моля попълни полето за заглавие!';
        validInput = false;
    }

    var author = String(document.querySelector('#author').value);

    if (author == null || author.length == 0) {
        var authorErrors = document.getElementById("author-error");
        authorErrors.innerHTML = 'Моля попълни полето за автор!';
        validInput = false;
    }

    var readers = String(document.querySelector('#max-readers').value);

    if (readers == null || readers == 0) {
        var readersErrors = document.getElementById("readers-error");
        readersErrors.innerHTML = 'Моля попълни полето за брой читатели!';
        validInput = false;
    }

    var days = String(document.querySelector('#max-days').value);

    if (days == null || days == 0) {
        var daysErrors = document.getElementById("days-error");
        daysErrors.innerHTML = 'Моля попълни полето за дни за заемане!';
        validInput = false;
    }

    return validInput;
}

function showSuccessMessage(message) {
    var success = document.getElementById("upload-response-message");
    success.innerHTML = message;
    success.style.padding = "0.5%";

    setTimeout(() => {
        success.style.display = "none";
        success.style.padding = "0%";
    }, 5000);
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

        showSuccessMessage(xhr.responseText);
        form.reset();
        allowChoosenInput();
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
    
    if (linkBtn.checked) {
        link.style.display = "block";
    } else {
        var linkErrors = document.getElementById("link-error");
        linkErrors.innerHTML = "";
        link.style.display = "none";
    }
    file.disabled = !fileBtn.checked;
    file.style.display = fileBtn.checked ? "block" : "none";
}
