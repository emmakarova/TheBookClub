const register = () => {
    var url = 'src/register.php'; // same domain var callback = function (text) {
        // console.log(text); // do something with the data };
       
    registerCall(url, {success: "hihi"});
}

function registerCall(url, settings){
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
      if (xhr.status == 200) {
    
        // console.log(settings.success);
        console.log(xhr.response,"resp");
  } else {
        console.error(xhr.responseText);
  } };

  var username = document.getElementById("username");
//   var password = document.getElementById("password");
  var data = 'username='+username.value;
  console.log(data);

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(data);
}
  