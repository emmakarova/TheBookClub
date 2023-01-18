
const test = () => {
    console.log("hi from js");
    var url = 'src/connect.php'; // same domain var callback = function (text) {
        // console.log(text); // do something with the data };
       
    ajax(url, {success: "hihi"});
};

function ajax(url, settings){
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
      if (xhr.status == 200) {
    
        console.log(settings.success);
        console.log(xhr.response);
  } else {
        console.error(xhr.responseText);
  } };
    xhr.open("GET", url, /* async */ true);
    xhr.send();
  }
  