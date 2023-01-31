const homepage = async () => {
    var url = '../src/controllers/homepage.php';

    var allResources = await getAllResources(url)
    .then(function (result) {
        return result;
    });

    var userResources = await getCurrentUserResources(url+"?user")
    .then(function(result) {
        return result;
    });

    var cols = [];
            
    for (var i = 0; i < allResources.length; i++) {
        for (var k in allResources[i]) {
            if (cols.indexOf(k) === -1) {
                if (k == 'resource_id' || k == 'max_readers' || k == 'current_readers') {
                    continue;
                }
                cols.push(k);
            }
        }
    }
    
    cols.push('');
    cols.push('');
    
    var table = document.createElement("table");
    table.setAttribute("id","resources_table");

    var tr = table.insertRow(-1);

    for (var i = 0; i < cols.length; i++) {
        var theader = document.createElement("th");
        theader.innerHTML = cols[i];

        tr.appendChild(theader);
    }

    for (var i = 0; i < allResources.length; i++) {   
        var takeButtonTag = '';
        var deleteButtonTag = '<button type=\"button\" onclick=\"deleteResource(' + allResources[i]['resource_id'] + ')\">Delete</button>';

        if (isAlreadyTaken(allResources[i],userResources)) {
            takeButtonTag = '<button type=\"button\" disabled=true>Already Taken</button>';
        }
        else if (allResources[i].current_readers >= allResources[i].max_readers) {
            takeButtonTag = '<button type=\"button\" disabled=true>Unavailable</button>';
        }
        else {
            takeButtonTag = '<button type=\"button\" onclick=\"take(' + allResources[i]['resource_id'] + ',' + (i+1) + ')\">Take</button>';
        }
        
        insertResourceInTable(cols, allResources[i], table, takeButtonTag, deleteButtonTag);
    }

    var el = document.getElementById("resources");
    el.innerHTML = "";
    el.appendChild(table);
}

function insertResourceInTable(cols, resource, table, takeButtonTag, deleteButtonTag) {
    trow = table.insertRow(-1);
    for (var j = 0; j < cols.length; j++) {
        var cell = trow.insertCell(-1);
        
        if (j == cols.length - 2) {
            cell.innerHTML = takeButtonTag;
        } else if (j == cols.length - 1) {
            cell.innerHTML = deleteButtonTag;
        } else {
            cell.innerHTML = resource[cols[j]];
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
        location.reload();
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
