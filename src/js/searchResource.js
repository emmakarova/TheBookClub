function searchResource() {
    var input = document.getElementById('search').value

    input = input.toLowerCase();
    var table = document.getElementById("resources_table");
  
    for (var i = 1, row; row = table.rows[i]; i++) {
        var hide = true;
        for (var j = 0; j < 3; j++) {
            var col = row.cells[j]
        
            if (col.innerHTML.toLowerCase().includes(input)) {
                hide = false;
            }
        }  

        if (hide) {
            row.style.display = "none";
        }
        else {
            row.style.display = "table-row";
        }
    }
}
