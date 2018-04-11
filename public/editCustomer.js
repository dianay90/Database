
var address_dropRequest = new XMLHttpRequest();

address_dropRequest.open('GET', "http://flip3.engr.oregonstate.edu:9666/address_dropdown", true);
address_dropRequest.addEventListener('load', function () {
    if (address_dropRequest.status >= 200 && address_dropRequest.status < 400) {

        var response = JSON.parse(address_dropRequest.responseText);

        var payment_address = document.getElementById("editAddress");

        for (var i = 0; i < response.length; i++) {
            optionElem3 = document.createElement("option");
            optionElem3.value = response[i]["address_id"];
            optionElem3.innerHTML = response[i]["street"] + " " + response[i]["city"] + " " + response[i]["zipcode"] + " " + response[i]["state"]
            payment_address.append(optionElem3)
        }
    } else {
        console.log("Error in network request: " + address_dropRequest.statusText);
    }
});
address_dropRequest.send(null);

updateEditTable();

var ID, Item;
function updateEditTable() {

    // get the part of the url with the id to retrieve id number 

    //Cite:https://stackoverflow.com/questions/3730359/get-id-from-url-with-jquery

    var url = location.href;
    var idTransform = url.substring(url.lastIndexOf('=') + 1);
    ID = parseInt(idTransform);

    var req = new XMLHttpRequest();
    req.addEventListener("load", function (data) {
        Item = JSON.parse(this.responseText)[0]
     
            document.getElementById('editFirstName').value = Item.first_name
            document.getElementById('editLastName').value = Item.last_name
            document.getElementById('editAddress').value = Item.address_id    
    });
    req.open("GET", "http://flip3.engr.oregonstate.edu:9666/itemCustomer/" + ID, true);


    req.send();

}

function editCustomerSubmit() {

    var body = { }
    var validData = true

    var content =['editFirstName', 'editLastName', 'editAddress'];

// checking if at least one of values is empty

    content.forEach(function (item) {
        if (!document.getElementById(item).value) {
            validData = false;
        }

        else {
            //collect edit information from input form 
           body.first_name= document.getElementById('editFirstName').value 
           body.last_name=  document.getElementById('editLastName').value 
           body.address_id= document.getElementById('editAddress').value 
       }
    })
//isvalid is false

    if (validData) {

        var req = new XMLHttpRequest();

//update items in server with newly entered inputs 

        req.open("POST", "http://flip3.engr.oregonstate.edu:9666/update_customer/" + ID, true);
        console.log("updatecalled ")
        req.addEventListener("load", function (data) {
			if (req.status >= 200 && req.status < 400) {
                window.open("http://flip3.engr.oregonstate.edu:9666/storeDatabase.html", "_self");
           }
});

        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify(body));

    } else {
        alert('You got empty fields or you did not put in the correct data type!')
    }
    
}