var customer_Address = document.getElementById("customer_address");

//Set up all customer dropdowns
var cust_dropRequest = new XMLHttpRequest();

cust_dropRequest.open('GET', "http://flip3.engr.oregonstate.edu:9666/customer_dropdown", true);
cust_dropRequest.addEventListener('load', function () {
    if (cust_dropRequest.status >= 200 && cust_dropRequest.status < 400) {

        var response = JSON.parse(cust_dropRequest.responseText);
        console.log(response)

        var order_customer = document.getElementById("editCustomer");

        for (var i = 0; i < response.length; i++) {
            optionElem = document.createElement("option");
            optionElem.value = response[i]["customer_id"];
            optionElem.innerHTML = response[i]["first_name"] + " " + response[i]["last_name"]
            order_customer.append(optionElem)

        }


    } else {
        console.log("Error in network request: " + cust_dropRequest.statusText);
    }
});
cust_dropRequest.send(null);


//Set up all address dropdowns
var address_dropRequest = new XMLHttpRequest();

address_dropRequest.open('GET', "http://flip3.engr.oregonstate.edu:9666/address_dropdown", true);
address_dropRequest.addEventListener('load', function () {
    if (address_dropRequest.status >= 200 && address_dropRequest.status < 400) {

        var response = JSON.parse(address_dropRequest.responseText);
        console.log(response)

        var order_address = document.getElementById("editAddress");

        for (var i = 0; i < response.length; i++) {
            optionElem2 = document.createElement("option");
            optionElem2.value = response[i]["address_id"];
            optionElem2.innerHTML = response[i]["street"] + " " + response[i]["city"] + " " + response[i]["zipcode"] + " " + response[i]["state"]
            order_address.append(optionElem2)
        }


    } else {
        console.log("Error in network request: " + address_dropRequest.statusText);
    }
});
address_dropRequest.send(null);


//Set up the payment dropdown
var payment_dropRequest = new XMLHttpRequest();

payment_dropRequest.open('GET', "http://flip3.engr.oregonstate.edu:9666/payment_dropdown", true);
payment_dropRequest.addEventListener('load', function () {
    if (payment_dropRequest.status >= 200 && payment_dropRequest.status < 400) {

        var response = JSON.parse(payment_dropRequest.responseText);
        console.log(response)

        var order_payment = document.getElementById("editPayment");

        for (var i = 0; i < response.length; i++) {

            optionElem = document.createElement("option");
            optionElem.value = response[i]["payment_id"];
            optionElem.innerHTML = response[i]["first_name"] + " " + response[i]["last_name"] + " " + response[i]["amount"] + " "
            if (response[i]["payment_number"] == "NULL") {
                optionElem.innerHTML += "Cash"
            }
            else {
                optionElem.innerHTML += "Card number: " + response[i]["payment_number"]
            }
            order_payment.append(optionElem)
        }

    } else {
        console.log("Error in network request: " + payment_dropRequest.statusText);
    }
});
payment_dropRequest.send(null);


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
       // document.getElementById('editPayment').value = Item.payment_id
        document.getElementById('editOrderNumber').value = Item.order_number
        document.getElementById('editCustomer').value = Item.customer_id
        document.getElementById('editAddress').value = Item.shipping_address_id
        document.getElementById('editDate').value = Item.order_date.slice(0, 10);
        document.getElementById('editPayment').value = Item.payment_id
    });



    req.open("GET", "http://flip3.engr.oregonstate.edu:9666/itemOrder/" + ID, true);
    req.send();

}

updateEditTable();

var ID, Item;

function editOrderSubmit() {

    var body = { }
    var validData = true

    var content =['editOrderNumber', 'editCustomer', 'editAddress', 'editDate', 'editPayment'];

// checking if at least one of values is empty

    content.forEach(function (item) {
        if (!document.getElementById(item).value) {
            validData = false;
        }

        else {
//collect edit information from input form 
            body.order_number=document.getElementById('editOrderNumber').value 
            body.customer_id=document.getElementById('editCustomer').value 
			body.shipping_address_id= document.getElementById('editAddress').value 
            body.order_date= document.getElementById('editDate').value 
            body.payment_id = document.getElementById('editPayment').value
        }

    })
//isvalid is false

    if (validData) {

        var req = new XMLHttpRequest();

//update items in server with newly entered inputs 

        req.open("POST", "http://flip3.engr.oregonstate.edu:9666/update_order/" +ID, true);
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