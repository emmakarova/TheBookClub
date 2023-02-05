const mypage = () => {
    var url = '../src/controllers/mypage.php';
    showSuccessMessage();
    myProfileCall(url+"?user");
    myResourcesCall(url);
}

function showSuccessMessage() {
    var success = document.getElementById("success-message");
    if (!success) {
        return;
    }
    console.log("------", success.innerHTML);
    console.log(success.style.display);
    var smth = success.style.display;
    if (success.style.display == "block") {
        setTimeout(() => {
            success.style.display == "none";
        }, 5000);
    }
}

function myProfileCall(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = "json";

    // send request
    xhr.send();

    xhr.onload = () => {
        if (xhr.status != 200) {
            console.log("response = ", xhr.response, "\nstatus = ", xhr.status);
            return;
        }

        var list = xhr.response;

        var names = document.createElement("p");
        names.innerHTML = "<strong>Име:</strong> " + list[0]["names"];

        var username = document.createElement("p");
        username.innerHTML = "<strong>Потребителско име:</strong> " + list[0]["username"];

        var profileType = document.createElement("p");
        profileType.innerHTML = "<strong>Вид на профила:</strong> ";
        if (list[0]["admin_rights"]) {
            profileType.innerHTML += "admin";
        } else {
            profileType.innerHTML += "user";
        }

        var myProfile = document.getElementById("myInfo");
        // myProfile.innerHTML = "";
        myProfile.append(names, username, profileType);
    }
}

function myResourcesCall(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = "json";

    // send request
    xhr.send();

    // listen for `load` event
    xhr.onload = () => {
        if (xhr.status != 200) {
            console.log("response = ", xhr.response, "\nstatus = ", xhr.status);
            return;
        }

        console.log(xhr.response);
        var list = xhr.response;

        if (list == null) {
            return;
        }

        var cols = [];
                
        for (var i = 0; i < list.length; i++) {
            for (var k in list[i]) {
                if (cols.indexOf(k) === -1 && k != "resource_id") {
                    // Push all keys to the array
                    cols.push(k);
                }
            }
        }

        var labeledCols = [];
        for (var i = 0; i < cols.length; i++) {
            var col = cols[i];
            var label = '';
            switch(col) {
                case 'title':
                    label = 'Заглавие';
                    break;
                case 'author':
                    label = 'Автор';
                    break;
                case 'link':
                    label= 'Линк към ресурса';
                    break;
                case 'times_read':
                    label = 'Брой заемания';
                    break;
                default:
                    break;
            }

            labeledCols.push(label);
        }

        // Create a table element
        var table = document.createElement("table");
            
        // Create table row tr element of a table
        var tr = table.insertRow(-1);
            
        for (var i = 0; i < labeledCols.length; i++) {        
            // Create the table header th element
            var theader = document.createElement("th");
            theader.innerHTML = labeledCols[i];
                
            // Append columnName to the table row
            tr.appendChild(theader);
        }
            
        // Adding the data to the table
        for (var i = 0; i < list.length; i++) {       
            // Create a new row
            trow = table.insertRow(-1);
            for (var j = 0; j < cols.length; j++) {
                var cell = trow.insertCell(-1);
                    
                // Inserting the cell at particular place
                cell.innerHTML = list[i][cols[j]];

                switch(cols[j]) {
                    case 'times_read':
                        cell.className = "number-cell";
                        break;
                    default:
                        break;
                }   
            }

            var cell = trow.insertCell(-1);
            cell.innerHTML = '<button class="action-btn" type=\"button\" ' +
                'onclick=\"deleteResource(\'' + list[i]["resource_id"] + '\')\">Изтрий</button>';
        }
        
        var myResources = document.getElementById("resources");
        myResources.appendChild(table);
    }
}

const deleteResource = (resourceId) => {
    var url = '../src/controllers/mypage.php';
    deleteResourceCall(url, resourceId);
}

function deleteResourceCall(url, resourceId) {
    console.log("resource_id = ", resourceId);
   
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
        
    var d = 'resource_id=' + resourceId;

    // set headers
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      
    // send request
    xhr.send(d);
      
    // listen for `load` event
    xhr.onload = () => {
        if (xhr.status != 200) {
            console.log("response = ", xhr.responseText,  "\nstatus = ", xhr.status);
            return;
        }

        var success = document.createElement("p");
        success.innerHTML = xhr.responseText;
        success.setAttribute("id", "success-message");
        success.style.display = "block";
        var smth = success.style.display;
        console.log("########", success.style.display);

        // const body = document.body;
        console.log(document.body.children);
        document.body.insertBefore(success, document.body.children[1]);

        location.reload();
    }
}
