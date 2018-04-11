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
            document.getElementById('editName').value = Item.product_name
            document.getElementById('editType').value = Item.product_type
            document.getElementById('editQuantity').value = Item.quantity
            document.getElementById('editDescription').value = Item.description
            document.getElementById('editPrice').value = Item.price    
    });



    req.open("GET", "http://flip3.engr.oregonstate.edu:9666/itemProduct/" + ID, true);
    req.send();

}

function editProductSubmit() {

    var body = { }
    var validData = true

    var content =['editName', 'editType', 'editQuantity', 'editDescription', 'editPrice'];

// checking if at least one of values is empty

    content.forEach(function (item) {
        if (!document.getElementById(item).value) {
            validData = false;
        }

        else {

            //collect edit information from input form 
            body.product_name = document.getElementById('editName').value 
            body.product_type= document.getElementById('editType').value
            body.quantity= document.getElementById('editQuantity').value 
            body.description= document.getElementById('editDescription').value 
            body.price= document.getElementById('editPrice').value
        }
    })
//isvalid is false

    if (validData) {

        var req = new XMLHttpRequest();

//update items in server with newly entered inputs 

        req.open("POST", "http://flip3.engr.oregonstate.edu:9666/update_product/" + ID, true);
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