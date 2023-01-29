function searchResource() {
    var input = document.getElementById('search').value
   
    input = input.toLowerCase();
    var table = document.getElementById("resources_table");
    var visibleRowsCounter = table.rows.length - 1;
 
    for (var i = 1, row; row = table.rows[i];  i++) {
        var hide = true;
        for (var j = 0; j < 3; j++) {
            var col = row.cells[j]
            if (!col) {
                continue;
            }
          
            if (col.innerHTML.toLowerCase().includes(input)) {
                hide = false;
            }
        }  

        if (hide) {
            row.style.display = "none";
            visibleRowsCounter--;
        }
        else {
            row.style.display = "table-row";
            if (document.contains(document.getElementById("no-resources")) && visibleRowsCounter > 1) {
                document.getElementById("no-resources").remove();
            } 
        }
    }

    if (visibleRowsCounter === 0) {
        var noDataRow = table.insertRow(-1);
        noDataRow.innerHTML = "<td id=\"no-resources\" colspan=5 style=\"text-align:center;\">No resources found</td>";
    }
}
