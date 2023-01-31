const myreading = () => {
    var url = '../src/controllers/myreading.php';
    myreadingCall(url);
}

function myreadingCall(url) {
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
        theader.innerHTML = "Return the resource";
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
            cell.innerHTML = '<input type="submit" name="returnResource" class="btn btn-primary" ' +
                'value="Return" onclick="returnResource(\'' + list[i]["resource_id"] + '\')">';
        }
        
        var el = document.getElementById("resources");
        el.innerHTML = "";
        el.appendChild(table);
    }
}

const returnResource = (resourceId) => {
    var url = '../src/controllers/myreading.php';
    returnResourceCall(url, resourceId);
}

function returnResourceCall(url, resourceId) {
    let rate;
    let ratePrompt = prompt("Please rate the resource (1-5):", "5");
    if (ratePrompt == null || ratePrompt == "") {
        console.log("User cancelled the prompt.");
        return;
    } else {
        rate = ratePrompt;
    }
   
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
        
    var d = 'resource_id=' + resourceId + '&rate=' + rate;

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
