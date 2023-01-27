const homepage = () => {
    var url = '../src/controllers/homepage.php';
    homepageCall(url);
}

function homepageCall(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = "json";

    // send request
    xhr.send();

    // listen for `load` event
    xhr.onload = () => {
        console.log(xhr.response,"resp");
        var list = xhr.response;

        var cols = [];
                
        for (var i = 0; i < list.length; i++) {
            for (var k in list[i]) {
                if (cols.indexOf(k) === -1) {
                    // Push all keys to the array
                   if (k == 'resource_id') {
                    continue;
                   }
                    cols.push(k);
                }
            }
        }

        cols.push('');

        // Create a table element
        var table = document.createElement("table");
        table.setAttribute("id","resources_table");
        // Create table row tr element of a table
        var tr = table.insertRow(-1);
            
        for (var i = 0; i < cols.length; i++) {
            // Create the table header th element
            var theader = document.createElement("th");
            theader.innerHTML = cols[i];
                
            // Append columnName to the table row
            tr.appendChild(theader);
        }
            
        // Adding the data to the table
        for (var i = 0; i < list.length; i++) {   
            // Create a new row
            trow = table.insertRow(-1);
            for (var j = 0; j < cols.length; j++) {
                var cell = trow.insertCell(-1);
                
                if (j == cols.length - 1) {
                    console.log(list[i]['resource_id'], i);
                    cell.innerHTML = '<button type=\"button\" onclick=\"take(' + list[i]['resource_id'] + ',' + (i+1) + ')\">Take</button>';
                }else {
                    // Inserting the cell at particular place
                    cell.innerHTML = list[i][cols[j]];
                }
            }
        }

        var el = document.getElementById("resources");
        el.innerHTML = "";
        el.appendChild(table);
    }
}

function take(id,row) {
    console.log("Take it", id, row);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '../src/controllers/homepage.php');

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  
    var idq = "resource_id="+id;
    // send request
    console.log(idq);
    xhr.send(idq);

    xhr.onload = () => {
        console.log("resp " + xhr.response);
        if (xhr.status == 500) {
            console.log("Oh no");
            var p = document.createElement('p');
            var err = document.createTextNode(xhr.response);
            p.appendChild(err);
            document.body.appendChild(p);
        }
        if (xhr.status == 200) {
            console.log(document.getElementById("resources_table"));
            var table = document.getElementById("resources_table");
            table.deleteRow(row);
        }
    }
}
