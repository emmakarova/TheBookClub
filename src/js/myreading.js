const myreading = () => {
    var url = '../src/controllers/myreading.php';
    showSuccessMessage();
    myreadingCall(url);
}

function showSuccessMessage() {
    if (sessionStorage.reloadAfterPageLoad != 'true') {
        return;
    }

    let message = sessionStorage.getItem("return-message");
    var success = document.getElementById("return-response-message");
    success.innerHTML = message;
    success.style.padding = "0.5%";

    sessionStorage.reloadAfterPageLoad = 'false';
    sessionStorage.removeItem("return-message");

    setTimeout(() => {
        success.style.display = "none";
        success.style.padding = "0%";
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

        if (list == null || list.length == 0) {
            var message = document.getElementById("empty-message-myreading");
            message.style.display = "block";
            return;
        }

        var message = document.getElementById("empty-message-myreading");
        message.style.display = "none";

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
                    label = 'Линк към ресурса';
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

                switch(cols[j]) {
                    case 'date':
                        cell.className = "number-cell";
                        break;
                    case 'rate':
                        cell.className = "number-cell";
                        var floatRate = parseFloat(cell.innerHTML);
                        cell.innerHTML = floatRate.toPrecision(3);
                        break;
                    default:
                        break;
                }

                if (cols[j] == 'rate' && list[i][cols[j]] == null) {
                    cell.innerHTML = '--';
                }

                console.log('cols', cols[j]);
            }
            var cell = trow.insertCell(-1);
            var link = list[i]["link"];

            if (link.startsWith("uploadedFiles")) {
                link = '../' + link;
            }

            cell.innerHTML = '<button class="action-btn" type=\"button\" ' +
            'onclick=\"window.open(\'' + link + '\')\">Виж</button>';
            var cell = trow.insertCell(-1);
            cell.innerHTML = '<button class="action-btn" type=\"button\" ' +
            'onclick=\"returnResource(\'' + list[i]["resource_id"] + '\')\">Върни</button>';
            console.log(list[i]);
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

const seeResource = (link) => {
    console.log(link);

    window.location.href = link;

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

        sessionStorage.reloadAfterPageLoad = 'true';
        sessionStorage.setItem("return-message", xhr.responseText);
        
        location.reload();
    }
}
