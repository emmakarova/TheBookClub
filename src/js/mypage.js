const mypage = () => {
    var url = '../src/controllers/mypage.php';
    myProfileCall(url+"?user");
    myResourcesCall(url);
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
        names.innerHTML = "Names: " + list[0]["names"];

        var username = document.createElement("p");
        username.innerHTML = "Username: " + list[0]["username"];

        var profileType = document.createElement("p");
        profileType.innerHTML = "Profile type: ";
        if (list[0]["admin_rights"]) {
            profileType.innerHTML += "admin";
        } else {
            profileType.innerHTML += "user";
        }

        var myProfile = document.getElementById("myProfile");
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

        // Create a table element
        var table = document.createElement("table");
            
        // Create table row tr element of a table
        var tr = table.insertRow(-1);
            
        for (var i = 0; i < cols.length; i++) {        
            // Create the table header th element
            var theader = document.createElement("th");
            theader.innerHTML = cols[i];
                
            // Append columnName to the table row
            tr.appendChild(theader);
        }

        // create column for 'release resource' button
        var theader = document.createElement("th");
        theader.innerHTML = "Delete the resource";
        tr.appendChild(theader);
            
        // Adding the data to the table
        for (var i = 0; i < list.length; i++) {       
            // Create a new row
            trow = table.insertRow(-1);
            for (var j = 0; j < cols.length; j++) {
                var cell = trow.insertCell(-1);
                    
                // Inserting the cell at particular place
                cell.innerHTML = list[i][cols[j]];
            }
            var cell = trow.insertCell(-1);
            cell.innerHTML = '<input type="submit" name="deleteResource" class="btn btn-primary" ' +
                'value="Delete" onclick="deleteResource(\'' + list[i]["resource_id"] + '\')">';
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
        
        location.reload();
    }
}
