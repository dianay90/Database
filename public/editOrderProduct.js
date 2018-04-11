
//displayTables();

var ID, Item;

var itemQuantity; 

function updateEditTable() {

    // get the part of the url with the id to retrieve id number 

    //Cite:https://stackoverflow.com/questions/3730359/get-id-from-url-with-jquery

    var url = location.href;
    var idTransform = url.substring(url.lastIndexOf('=') + 1);
    var idTransform2 = url.substring(url.lastIndexOf('?') + 4);
    ID = parseInt(idTransform);
    OID = parseInt(idTransform2);

    var req = new XMLHttpRequest();
    req.addEventListener("load", function (data) {
        Item = JSON.parse(this.responseText)[0]
        //restore data inside input fields  
       // document.getElementById('editPayment').value = Item.payment_id
        document.getElementById('editOrderID').value = Item.order_id
        document.getElementById('editProductID').value = Item.product_id
        document.getElementById('editQuantity').value = Item.product_quantity
        itemQuantity = parseInt(Item.product_quantity); 

    });



    req.open("GET", "http://flip3.engr.oregonstate.edu:9666/itemOrderProduct/" + OID +'/'+ID, true);
    req.send();

}



updateEditTable();

var newQ;

var body2; 

function editOrderProductSubmit() {

    var body = { }
    var quant= {}
    var validData = true
    var content =['editOrderID', 'editProductID', 'editQuantity'];


    content.forEach(function (item) {
        if (!document.getElementById(item).value) {
            validData = false;
        }

        else {
            body2= parseInt(document.getElementById('editQuantity').value)
            body.product_quantity = document.getElementById('editQuantity').value
                }

    })



    //ADDED
    var moveOn = 0;
    var response;
    var amount;
    var amount2;
    var quantity2 = document.getElementById('editQuantity').value;

    console.log("quantity2")
    console.log(quantity2)

    var quantity3 = parseInt(quantity2);

    console.log("quantity3")

    console.log(quantity3)

    var quantityCheck = new XMLHttpRequest();

    quantityCheck.open('GET', "http://flip3.engr.oregonstate.edu:9666/product_quantity?id=" + ID, true);
    quantityCheck.addEventListener('load',function(){
        if (quantityCheck.status >= 200 && quantityCheck.status < 400) {

             response = JSON.parse(quantityCheck.responseText);
             console.log(response[0].quantity);
           
            amount = response[0].quantity;
            amount2 = parseInt(amount);


            // if (quantity3 > amount2)
            if (quantity3 - itemQuantity > amount2)

            {
                alert("Not enough of that item! Please try again.");
               
            }


            else {

                if (validData) {
                    //   if (validData && quantity3 < amount2) {

                    console.log("hELLLLOO")

                    var req = new XMLHttpRequest();

                    //UPDATE ORDER PRODUCT TABLE 

                    req.open("POST",
                        "http://flip3.engr.oregonstate.edu:9666/update_orderproduct/" + OID + '/' + ID,
                        true);
                    req.addEventListener("load",
                        function(data) {

                            //  window.location = 'http://flip3.engr.oregonstate.edu:9666/'

                        });

                    req.setRequestHeader("Content-Type", "application/json");
                    req.send(JSON.stringify(body));
                    //above works 



                    //UPDATE EXISTING 
                    //newQ = amount2 - quantity3;
                    newQ = amount2 - (body2 - itemQuantity); 
                    quant.quantity = newQ;

                    console.log("newQ" + newQ);

                    var update = new XMLHttpRequest();
                    update.open("POST", "http://flip3.engr.oregonstate.edu:9666/update_product_quantity/" + ID, true);
                    update.addEventListener("load",
                        function(data) {

                            if (update.status >= 200 && update.status < 400) {

                                window.open("http://flip3.engr.oregonstate.edu:9666/storeDatabase.html", "_self");
                            }
                            //  window.location = 'http://flip3.engr.oregonstate.edu:9666/'


                        });

                    update.setRequestHeader("Content-Type", "application/json");
                    update.send(JSON.stringify(quant));

                }

            }

         
        }
});
        quantityCheck.send(null);



       
    
    
    


}






