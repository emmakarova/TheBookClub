const navigate = () => {
    var url = '../src/controllers/isAdmin.php';
    navigateCall(url);
    showFooter();
}

function navigateCall(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = "json";

    // send request
    xhr.send();

    xhr.onload = () => {
        if (xhr.status != 200) {
            console.log("response = ", xhr.response, "\nstatus = ", xhr.status);
            return;
        }

        let isAdmin = xhr.response;
        if (isAdmin) {
            navigateAdmin();
        } else {
            navigateUser();
        }
    }
}

const navigateUser = () => {
    $("#nav-placeholder").load("../../public/navigation.html");
}

const navigateAdmin = () => {
    $("#nav-placeholder").load("../../public/adminNavigation.html");
}

const showFooter = () => {
    $("#footer").load("../../public/footer.html");
}
