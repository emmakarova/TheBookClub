const notifications = () => {
    var url = '../src/controllers/notifications.php';
    notificationsCall(url);
}

function notificationsCall(url) {
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
                if (cols.indexOf(k) === -1) {
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

        // // create column for 'release resource' button
        // var theader = document.createElement("th");
        // theader.innerHTML = "Return the resource";
        // tr.appendChild(theader);
            
        // Adding the data to the table
        for (var i = 0; i < list.length; i++) {       
            // Create a new row
            trow = table.insertRow(-1);

            // insert id of this user's notifications
            var cell = trow.insertCell(-1);
            cell.innerHTML = list[i][0];

            // insert received_at and notification
            for (var j = 1; j < cols.length - 1; j++) {
                var cell = trow.insertCell(-1);
                    
                // Inserting the cell at particular place
                cell.innerHTML = list[i][cols[j]];
            }

            // add Mark as read button
            var cell = trow.insertCell(-1);
            var id = "readBtn" + i;
            if (list[i]["seen"]) {
                cell.innerHTML = '<input type="submit" id="' + id + '" name="markAsRead" class="btn btn-primary" ' +
                    'value="Read" disabled=true">';
            } else {
                cell.innerHTML = '<input type="submit" id="' + id + '" name="markAsRead" id class="btn btn-primary" ' +
                    'value="Mark as read" onclick="markAsRead(\'' + list[i]["notification_id"] + '\', \'' + id + '\')">';
                console.log(cell.innerHTML);
            }
        }
        
        var el = document.getElementById("notifications");
        el.innerHTML = "";
        el.appendChild(table);
    }
}

const markAsRead = (notificationId, btnId) => {
    var url = '../src/controllers/notifications.php';
    markAsReadCall(url, notificationId, btnId);
}

function markAsReadCall(url, notificationId, btnId) {
    console.log("notificationId = ", notificationId, btnId);
   
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
        
    var d = 'notification_id=' + notificationId;
    console.log("d = ", d);

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
        
        var readBtn = document.getElementById(btnId);
        readBtn.disabled = true;
        readBtn.innerHTML = "Read";

        location.reload();
    }
}
