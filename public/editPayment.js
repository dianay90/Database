var customer_Address = document.getElementById("customer_address");

//Set up all customer dropdowns
var cust_dropRequest = new XMLHttpRequest();

cust_dropRequest.open('GET', "http://flip3.engr.oregonstate.edu:9666/customer_dropdown", true);
cust_dropRequest.addEventListener('load', function () {
    if (cust_dropRequest.status >= 200 && cust_dropRequest.status < 400) {

        var response = JSON.parse(cust_dropRequest.responseText);
        console.log(response)

        var payment_customer = document.getElementById("editCustomer");

        for (var i = 0; i < response.length; i++) {

            optionElem2 = document.createElement("option");
            optionElem2.value = response[i]["customer_id"];
            optionElem2.innerHTML = response[i]["first_name"] + " " + response[i]["last_name"]
            payment_customer.append(optionElem2)
        }


    } else {
        console.log("Error in network request: " + cust_dropRequest.statusText);
    }
});
cust_dropRequest.send(null);

var address_dropRequest = new XMLHttpRequest();

address_dropRequest.open('GET', "http://flip3.engr.oregonstate.edu:9666/address_dropdown", true);
address_dropRequest.addEventListener('load', function () {
    if (address_dropRequest.status >= 200 && address_dropRequest.status < 400) {

        var response = JSON.parse(address_dropRequest.responseText);
        console.log(response)

     
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
        //restore data inside input fields  

        document.getElementById('editCustomer').value = Item.customer_id
        document.getElementById('editAddress').value = Item.address_id
        document.getElementById('editType').value = Item.payment_type
        document.getElementById('editPaymentNumber').value = Item.payment_number
        document.getElementById('editAmount').value = Item.amount
    });
    req.open("GET", "http://flip3.engr.oregonstate.edu:9666/itemPayment/" + ID, true);
    req.send();

}

function editPaymentSubmit() {

    var body = { }
    var validData = true

    var content =['editCustomer', 'editAddress', 'editType', 'editPaymentNumber', 'editAmount'];

// checking if at least one of values is empty

    content.forEach(function (item) {
        if (!document.getElementById(item).value) {
            validData = false;
        }

        else {

//collect edit information from input form 
            body.customer_id = document.getElementById('editCustomer').value;
            body.address_id= document.getElementById('editAddress').value 
            body.payment_type= document.getElementById('editType').value 
            body.payment_number= document.getElementById('editPaymentNumber').value 
            body.amount = document.getElementById('editAmount').value 
        }

    })
//isvalid is false

    if (validData) {

        var req = new XMLHttpRequest();

//update items in server with newly entered inputs 

        req.open("POST", "http://flip3.engr.oregonstate.edu:9666/update_payment/" +ID, true);
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