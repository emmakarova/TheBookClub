const myreading = () => {
    var url = '../src/controllers/myreading.php';
    showSuccessMessage();
    myreadingCall(url);
}

function showSuccessMessage() {
    console.log(sessionStorage.reloadAfterPageLoad);
    if (!sessionStorage.reloadAfterPageLoad) {
        return;
    }

    let message = sessionStorage.getItem("return-message");
    var success = document.getElementById("return-response-message");
    success.innerHTML = message;
    document.body.insertBefore(success, document.body.children[1]);

    sessionStorage.reloadAfterPageLoad = false;
    sessionStorage.removeItem("return-message");

    setTimeout(() => {
        success.style.display = "none";
    }, 5000);
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
                case 'date':
                    label= 'Дата за връщане';
                    break;
                case 'rate':
                    label = 'Оценка';
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
                if (cols[j] == 'rate' && list[i][cols[j]] == null) {
                    cell.innerHTML = '--';
                }

                switch(cols[j]) {
                    case 'date':
                    case 'rate':
                        cell.className = "number-cell";
                        break;
                    default:
                        break;
                }
            }

            var cell = trow.insertCell(-1);
            cell.innerHTML = '<button class="action-btn" type=\"button\" ' +
                'onclick=\"returnResource(\'' + list[i]["resource_id"] + '\')\">Върни</button>';
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

        sessionStorage.reloadAfterPageLoad = true;
        sessionStorage.setItem("return-message", xhr.responseText);
        
        location.reload();
    }
}
