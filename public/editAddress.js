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
        document.getElementById('editStreet').value = Item.street
        document.getElementById('editCity').value = Item.city
        document.getElementById('editZip').value = Item.zipcode
        document.getElementById('editState').value = Item.state
    });
	
    req.open("GET", "http://flip3.engr.oregonstate.edu:9666/itemAddress/" + ID, true);
    req.send();

}

function editAddressSubmit() {

    var body = { }
    var validData = true

    var content =['editStreet', 'editCity', 'editZip', 'editState'];

// checking if at least one of values is empty

    content.forEach(function (item) {
        if (!document.getElementById(item).value) {
            validData = false;
        }

        else {

//collect edit information from input form 

            body.street= document.getElementById('editStreet').value 
            body.city= document.getElementById('editCity').value 
            body.zipcode= document.getElementById('editZip').value 
            body.state= document.getElementById('editState').value 

        }
    })
//isvalid is false

    if (validData) {

        var req = new XMLHttpRequest();

//update items in server with newly entered inputs 

        req.open("POST", "http://flip3.engr.oregonstate.edu:9666/update_address/" +ID, true);
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