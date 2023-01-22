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
                    cols.push(k);
                    console.log(k);
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
            
        // Adding the data to the table
        for (var i = 0; i < list.length; i++) {       
            // Create a new row
            trow = table.insertRow(-1);
            for (var j = 0; j < cols.length; j++) {
                var cell = trow.insertCell(-1);
                    
                // Inserting the cell at particular place
                cell.innerHTML = list[i][cols[j]];
            }
        }

        var el = document.getElementById("resources");
        el.innerHTML = "";
        el.appendChild(table);
    }
}
