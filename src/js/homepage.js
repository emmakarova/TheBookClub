const homepage = async () => {
    var url = '../src/controllers/homepage.php';

    showSuccessMessage();

    var allResources = await getAllResources(url)
    .then(function (result) {
        console.log(result);
        return result;
    });

    var userResources = await getCurrentUserResources(url+"?user")
    .then(function(result) {
        return result;
    });
    
    if (allResources == null || allResources.length == 0) {
        var message = document.getElementById("empty-message-homepage");
        message.style.display = "block";
        return;
    }

    var message = document.getElementById("empty-message-homepage");
    message.style.display = "none";

    var cols = [];
    console.log(allResources);
    for (var i = 0; i < allResources.length; i++) {
        for (var k in allResources[i]) {
            if (cols.indexOf(k) === -1) {
                if (k == 'resource_id' || k == 'max_readers' || k == 'current_readers' || k == 'link') {
                    continue;
                }
                cols.push(k);
            }
        }
    }

    cols.push('');

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
            case 'max_reading_days':
                label = 'Дни за четене';
                break;
            case 'times_read':
                label = 'Брой заемания';
                break;
            case 'rate':
                label = 'Оценка';
                break;
            default:
                break;
        }

        labeledCols.push(label);
    }
    
    var table = document.createElement("table");
    table.setAttribute("id","resources_table");

    var tr = table.insertRow(-1);

    for (var i = 0; i < labeledCols.length; i++) {
        var theader = document.createElement("th");
        theader.innerText = labeledCols[i];

        tr.appendChild(theader);
    }

    for (var i = 0; i < allResources.length; i++) {   
        var buttonTag = '';

        if (isAlreadyTaken(allResources[i],userResources)) {
            buttonTag = '<button class="action-btn btn-taken" type=\"button\" disabled=true>Зает от мен</button>';
        } else if (allResources[i].current_readers >= allResources[i].max_readers) {
            buttonTag = '<button class="action-btn btn-taken" type=\"button\" disabled=true>Неналичен</button>';
        } else {
            buttonTag = '<button class="action-btn" type=\"button\" onclick=\"take(' + allResources[i]['resource_id'] + ',' + (i+1) + ')\">Заеми</button>';
        }
        
        insertResourceInTable(cols, allResources[i], table, buttonTag);
    }

    var el = document.getElementById("resources");
    el.innerHTML = "";
    el.appendChild(table);
}

function insertResourceInTable(cols, resource, table, buttonTag) {
    trow = table.insertRow(-1);
    for (var j = 0; j < cols.length; j++) {
        var cell = trow.insertCell(-1);
        
        if (j == cols.length - 1) {
            cell.innerHTML = buttonTag;
        } else {
            cell.innerHTML = resource[cols[j]];
        }

        switch(cols[j]) {
            case 'rate':
                cell.className = "number-cell";
                var floatRate = parseFloat(cell.innerHTML);
                cell.innerHTML = floatRate.toPrecision(3);
                break;
            case 'max_reading_days':
            case 'times_read':
                cell.className = "number-cell";
                break;
            default:
                break;
        }

        if (cols[j] == 'rate' && resource[cols[j]] == null) {
            cell.innerHTML = '--';
        } 
    }
}

function isAlreadyTaken(resource, userResources) {
    for (var j = 0; j < userResources.length; j++) {
        if (resource.resource_id === userResources[j].resource_id) {
            return true;
        }
    }

    return false;
}

/* 
    Return Promise so that the response can be handled outside getAllResources function. 
    This is practice when there are async functions and the response has to be assigned to a variable
*/ 
function getAllResources(url) {
    return new Promise(function(resolve) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = "json";
    
        xhr.onload = () => {
            resolve(xhr.response);
        }

        xhr.send();
        
    });
}

function getCurrentUserResources(url) {
    return new Promise(function(resolve) {
        xhr = new XMLHttpRequest();
        xhr.open('GET', url+"?user");
        xhr.responseType = "json";
        
        xhr.onload = () => {
            resolve(xhr.response);
        }
        xhr.send();
    });
}


function take(id) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '../src/controllers/homepage.php');

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  
    var idq = "resource_id="+id;

    xhr.send(idq);

    xhr.onload = () => {
        console.log("resp " + xhr.response);
    
        if (xhr.status != 200) {
           console.log("err", xhr.response);
        }

        sessionStorage.reloadAfterPageLoad = 'true';
        sessionStorage.setItem("return-message", xhr.responseText);
        
        location.reload();
    }
}

function showSuccessMessage() {
    if (sessionStorage.reloadAfterPageLoad != 'true') {
        return;
    }

    let message = sessionStorage.getItem("return-message");
    var success = document.getElementById("homepage-response-message");
    success.innerHTML = message;
    success.style.padding = "0.5%";

    sessionStorage.reloadAfterPageLoad = 'false';
    sessionStorage.removeItem("return-message");

    setTimeout(() => {
        success.style.display = "none";
        success.style.padding = "0%";
    }, 5000);
}
