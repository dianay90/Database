//Anthony Clemente
//Diana Oh


displayTables();


var tables = ["product", "address", "customer", "order", "payment", "orderproducts"];

tables.forEach(setUpShowFormsButtons);


//How to add options to select thingy.
var customer_Address = document.getElementById("customer_address");


//Set up all customer dropdowns
var cust_dropRequest = new XMLHttpRequest();
		
		cust_dropRequest.open('GET', "http://flip3.engr.oregonstate.edu:9666/customer_dropdown", true);
		cust_dropRequest.addEventListener('load',function(){
		  if(cust_dropRequest.status >= 200 && cust_dropRequest.status < 400){
			
			var response = JSON.parse(cust_dropRequest.responseText);
			
			var order_customer = document.getElementById("order_customer");
			var payment_customer = document.getElementById("payment_customer");
		
		for(var i = 0; i < response.length; i++){
			
			optionElem = document.createElement("option");
			optionElem.value = response[i]["customer_id"];
			optionElem.innerHTML = response[i]["first_name"] + " " + response[i]["last_name"]
			order_customer.append(optionElem)
			
			optionElem2 = document.createElement("option");
			optionElem2.value = response[i]["customer_id"];
			optionElem2.innerHTML = response[i]["first_name"] + " " + response[i]["last_name"]
			payment_customer.append(optionElem2)
		}
		
			
		  } else {
			console.log("Error in network request: " + cust_dropRequest.statusText);
		  }});
		cust_dropRequest.send(null);
		
		
//Set up all address dropdowns
var address_dropRequest = new XMLHttpRequest();
		
		address_dropRequest.open('GET', "http://flip3.engr.oregonstate.edu:9666/address_dropdown", true);
		address_dropRequest.addEventListener('load',function(){
		  if(address_dropRequest.status >= 200 && address_dropRequest.status < 400){
			
			var response = JSON.parse(address_dropRequest.responseText);
			
			var customer_address = document.getElementById("customer_address");
			var order_address = document.getElementById("order_address");
			var payment_address = document.getElementById("payment_address");
		
		for(var i = 0; i < response.length; i++){
			
			optionElem = document.createElement("option");
			optionElem.value = response[i]["address_id"];
			optionElem.innerHTML = response[i]["street"] + ", " + response[i]["city"] + ", " + response[i]["zipcode"] + ", " + response[i]["state"]
			customer_address.append(optionElem)
			
			optionElem2 = document.createElement("option");
			optionElem2.value = response[i]["address_id"];
			optionElem2.innerHTML = response[i]["street"] + ", " + response[i]["city"] + ", " + response[i]["zipcode"] + ", " + response[i]["state"]
			order_address.append(optionElem2)
			
			optionElem3 = document.createElement("option");
			optionElem3.value = response[i]["address_id"];
			optionElem3.innerHTML = response[i]["street"] + ", " + response[i]["city"] + ", " + response[i]["zipcode"] + ", " + response[i]["state"]
			payment_address.append(optionElem3)

		}
		
			
		  } else {
			console.log("Error in network request: " + address_dropRequest.statusText);
		  }});
		address_dropRequest.send(null);


//Set up the payment dropdown
var payment_dropRequest = new XMLHttpRequest();
		
		payment_dropRequest.open('GET', "http://flip3.engr.oregonstate.edu:9666/payment_dropdown", true);
		payment_dropRequest.addEventListener('load',function(){
		  if(payment_dropRequest.status >= 200 && payment_dropRequest.status < 400){
			
			var response = JSON.parse(payment_dropRequest.responseText);
			
			var order_payment = document.getElementById("order_payment");
		
		for(var i = 0; i < response.length; i++){
			
			optionElem = document.createElement("option");
			optionElem.value = response[i]["payment_id"];
			optionElem.innerHTML = response[i]["first_name"] + " " + response[i]["last_name"] + ", Amount: " + response[i]["amount"] + ", " 
			if(response[i]["payment_number"] == "NULL"){
				optionElem.innerHTML += "Cash"
			}
			else{
				optionElem.innerHTML += "Card number: " + response[i]["payment_number"]
			}
			order_payment.append(optionElem)

		}
		
			
		  } else {
			console.log("Error in network request: " + payment_dropRequest.statusText);
		  }});
		payment_dropRequest.send(null);

		
//Set up order dropdown
var order_dropRequest = new XMLHttpRequest();
		
		order_dropRequest.open('GET', "http://flip3.engr.oregonstate.edu:9666/order_dropdown", true);
		order_dropRequest.addEventListener('load',function(){
		  if(order_dropRequest.status >= 200 && order_dropRequest.status < 400){
			
			var response = JSON.parse(order_dropRequest.responseText);
			
			var order_orderproducts = document.getElementById("orderproducts_order");
		
		for(var i = 0; i < response.length; i++){
			
			optionElem = document.createElement("option");
			optionElem.value = response[i]["order_id"];
			optionElem.innerHTML = response[i]["order_number"];

			order_orderproducts.append(optionElem);

		}
		
			
		  } else {
			console.log("Error in network request: " + order_dropRequest.statusText);
		  }});
		order_dropRequest.send(null);

//Set up product dropdown
var product_dropRequest = new XMLHttpRequest();
		
		product_dropRequest.open('GET', "http://flip3.engr.oregonstate.edu:9666/product_dropdown", true);
		product_dropRequest.addEventListener('load',function(){
		  if(product_dropRequest.status >= 200 && product_dropRequest.status < 400){
			
			var response = JSON.parse(product_dropRequest.responseText);
			
			var product_orderproducts = document.getElementById("orderproducts_product");
		
		for(var i = 0; i < response.length; i++){
			
			optionElem = document.createElement("option");
			optionElem.value = response[i]["product_id"];
			optionElem.innerHTML = response[i]["product_name"];

			product_orderproducts.append(optionElem);

		}
		
			
		  } else {
			console.log("Error in network request: " + product_dropRequest.statusText);
		  }});
		product_dropRequest.send(null);		

		
function setUpShowFormsButtons(t){	

	document.getElementById("add" + t).addEventListener("click", function(event){
		
		event.preventDefault();
		var allForms = document.getElementsByTagName("form");
		for (var i = 0; i < allForms.length; i++){
			allForms[i].style.display = "none";
			
		}
		var currForm = document.getElementById(t + "_form");
		currForm.style.display = "block";
		
	});
}

populateProductFilter();

function populateProductFilter(){
	
	var getProductTypeRequest = new XMLHttpRequest();
	getProductTypeRequest.open('GET', "http://flip3.engr.oregonstate.edu:9666/product_type", true);
	getProductTypeRequest.addEventListener('load',function(){
		if(getProductTypeRequest.status >= 200 && getProductTypeRequest.status < 400){
			
			var response = JSON.parse(getProductTypeRequest.responseText);
			var typeDropdown = document.getElementById("product_types");
			
			var typeArray = [];
	
			for(var i = 0; i < response.length; i++){
				if(typeArray.indexOf(response[i]["product_type"]) < 0){
					typeArray.push(response[i]["product_type"]);
				}
			}

			for(var i = 0; i < typeArray.length; i++){
				optionElem = document.createElement("option");
				optionElem.value = typeArray[i];
				optionElem.innerHTML = typeArray[i];

				typeDropdown.append(optionElem);	
			}
			
		} else {
			console.log("Error in network request: " + getProductTypeRequest.statusText);
		}});
	getProductTypeRequest.send(null);	
	
}


//Set up filtering
document.getElementById("filterProducts").addEventListener("click", function(event){
	
	event.preventDefault();
	if(document.getElementById("product_types").value != 1){
		
		var typeSelect = document.getElementById("product_types");
		var type = typeSelect.options[typeSelect.selectedIndex].value;
		
		var productByType = new XMLHttpRequest();
		
		productByType.open('GET', "http://flip3.engr.oregonstate.edu:9666/products_by_type?type=" + type, true);
		productByType.addEventListener('load',function(){
		  if(productByType.status >= 200 && productByType.status < 400){
			
			var response = JSON.parse(productByType.responseText);
			
			var table = document.createElement("table");
			var thead = document.createElement("thead");
			var tr = document.createElement("tr");

			for(var prop in response[0]){
				var th = document.createElement("th");
				th.style.border = "1px solid black";
				th.textContent = prop;
				tr.appendChild(th);
			}
			
			thead.appendChild(tr);
			var tbody = document.createElement("tbody");
			for(var i = 0; i < response.length; i++){
				var tr = document.createElement("tr"); 
				for(var prop in response[i]){
					var td = document.createElement("td");
					td.style.border = "1px solid black";
					td.textContent = response[i][prop];
					tr.appendChild(td);
				}
				tbody.appendChild(tr);
			}
			table.appendChild(thead);
			table.appendChild(tbody);

			table.style.border = "1px solid black";

			document.body.insertBefore(table, document.getElementById("producttable"));
			document.getElementById("producttable").remove();
			table.id = "producttable";
			
			
		  } else {
			console.log("Error in network request: " + productByType.statusText);
		  }});
		productByType.send(null);
	}
	else{
		location = location;
	}
	
});


document.getElementById("insertproduct").addEventListener("click", function(event){
	
		event.preventDefault();
		var name = document.getElementById("product_name").value;
		var type = document.getElementById("product_type").value;
		var quantity = document.getElementById("product_quantity").value;
		var description = document.getElementById("product_description").value;
		var price = document.getElementById("product_price").value;
		
		
		var getRequest = new XMLHttpRequest();
		
		getRequest.open('GET', "http://flip3.engr.oregonstate.edu:9666/product_insert?name=" + name + "&type=" + type + "&quantity=" + quantity + "&description=" + description + "&price=" + price, true);
		getRequest.addEventListener('load',function(){
		  if(getRequest.status >= 200 && getRequest.status < 400){
			
			location = location;
			
		  } else {
			console.log("Error in network request: " + getRequest.statusText);
		  }});
		getRequest.send(null);
});

document.getElementById("insertaddress").addEventListener("click", function(event){
	
		event.preventDefault();
		var street = document.getElementById("address_street").value;
		var city = document.getElementById("address_city").value;
		var zipcode = document.getElementById("address_zip").value;
		var state = document.getElementById("address_state").value;
		
		
		var getRequest = new XMLHttpRequest();
		
		getRequest.open('GET', "http://flip3.engr.oregonstate.edu:9666/address_insert?street=" + street + "&city=" + city + "&zipcode=" + zipcode + "&state=" + state, true);
		getRequest.addEventListener('load',function(){
		  if(getRequest.status >= 200 && getRequest.status < 400){
			
			location = location;
			
		  } else {
			console.log("Error in network request: " + getRequest.statusText);
		  }});
		getRequest.send(null);
});

document.getElementById("insertcustomer").addEventListener("click", function(event){
	
		event.preventDefault();
		var fname = document.getElementById("customer_firstname").value;
		var lname = document.getElementById("customer_lastname").value;
		var select_address = document.getElementById("customer_address");
		//SELECTELEM.options[SELECTELEM.selectedIndex].value;
		var address = select_address.options[select_address.selectedIndex].value;
		console.log(address);
		
		
		var getRequest = new XMLHttpRequest();
		
		getRequest.open('GET', "http://flip3.engr.oregonstate.edu:9666/customer_insert?fname=" + fname + "&lname=" + lname + "&address=" + address, true);
		getRequest.addEventListener('load',function(){
		  if(getRequest.status >= 200 && getRequest.status < 400){
			
			location = location;
			
		  } else {
			console.log("Error in network request: " + getRequest.statusText);
		  }});
		getRequest.send(null);
});

document.getElementById("insertorder").addEventListener("click", function(event){
	
		event.preventDefault();
		var number = document.getElementById("order_number").value;
		
		var customer_select = document.getElementById("order_customer");
		var customer = customer_select.options[customer_select.selectedIndex].value;
		
		var address_select = document.getElementById("order_address");
		var address = address_select.options[address_select.selectedIndex].value;
		
		var date = document.getElementById("order_date").value;
		
		var payment_select = document.getElementById("order_payment");
		var payment = payment_select.options[payment_select.selectedIndex].value;
		
		
		
		var getRequest = new XMLHttpRequest();
		
		getRequest.open('GET', "http://flip3.engr.oregonstate.edu:9666/order_insert?number=" + number + "&customer=" + customer + "&address=" + address + "&date=" + date + "&payment=" + payment, true);
		getRequest.addEventListener('load',function(){
		  if(getRequest.status >= 200 && getRequest.status < 400){
			
			location = location;
			
		  } else {
			console.log("Error in network request: " + getRequest.statusText);
		  }});
		getRequest.send(null);
});

document.getElementById("insertpayment").addEventListener("click", function(event){
	
		event.preventDefault();
		var customer_select = document.getElementById("payment_customer");
		var customer = customer_select.options[customer_select.selectedIndex].value;
		
		var address_select = document.getElementById("payment_address");
		var address = address_select.options[address_select.selectedIndex].value;
		
		var type = document.getElementById("payment_type").value;
		var number = document.getElementById("payment_number").value;
		var amount = document.getElementById("payment_amount").value;
		
		var getRequest = new XMLHttpRequest();
		
		getRequest.open('GET', "http://flip3.engr.oregonstate.edu:9666/payment_insert?customer=" + customer + "&address=" + address + "&type=" + type + "&number=" + number + "&amount=" + amount, true);
		getRequest.addEventListener('load',function(){
		  if(getRequest.status >= 200 && getRequest.status < 400){
			
			location = location;
			
		  } else {
			console.log("Error in network request: " + getRequest.statusText);
		  }});
		getRequest.send(null);
});

document.getElementById("insertorderproducts").addEventListener("click", function(event){
	
		event.preventDefault();
		
		var quantity = document.getElementById("orderproducts_quantity").value;
		
		var product_select = document.getElementById("orderproducts_product");
		var product = product_select.options[product_select.selectedIndex].value;
		
		var quantityCheck = new XMLHttpRequest();
		
		quantityCheck.open('GET', "http://flip3.engr.oregonstate.edu:9666/product_quantity?id=" + product, true);
		quantityCheck.addEventListener('load',function(){
		  if(quantityCheck.status >= 200 && quantityCheck.status < 400){
			
			var response = JSON.parse(quantityCheck.responseText);
			console.log(response[0].quantity);
			if(quantity > response[0].quantity){
				alert("Not enough of that item!");
			}
			else{
				var order_select = document.getElementById("orderproducts_order");
				var order = order_select.options[order_select.selectedIndex].value;
		
				var getRequest = new XMLHttpRequest();
		
				getRequest.open('GET', "http://flip3.engr.oregonstate.edu:9666/orderproducts_insert?order=" + order + "&product=" + product + "&quantity=" + quantity, true);
				getRequest.addEventListener('load',function(){
				if(getRequest.status >= 200 && getRequest.status < 400){
			
					location = location;
			
				} else {
					console.log("Error in network request: " + getRequest.statusText);
				}});
				getRequest.send(null);	
			}
			
		  } else {
			console.log("Error in network request: " + quantityCheck.statusText);
		  }});
		quantityCheck.send(null);				
});


function displayTables(){
	
	var productRequest = new XMLHttpRequest();
	productRequest.open('GET', "http://flip3.engr.oregonstate.edu:9666/product", true);
	productRequest.addEventListener('load',function(){
	  if(productRequest.status >= 200 && productRequest.status < 400){
		var response = JSON.parse(productRequest.responseText);
		
		var currentTable = document.getElementsByTagName("table")[0];
		
		if(currentTable){
			console.log(currentTable);
			var currentTableParent = currentTable.parentNode;
			currentTableParent.removeChild(currentTable);
		}

		makeTable(response, "product");
		
		var customerRequest = new XMLHttpRequest();
		customerRequest.open('GET', "http://flip3.engr.oregonstate.edu:9666/customer", true);
		customerRequest.addEventListener('load',function(){
		if(customerRequest.status >= 200 && customerRequest.status < 400){
			var response = JSON.parse(customerRequest.responseText);
		
			var currentTable = document.getElementsByTagName("table")[1];
		
			if(currentTable){
				console.log(currentTable);
				var currentTableParent = currentTable.parentNode;
				currentTableParent.removeChild(currentTable);
			}

			makeTable(response, "customer");
			
			var addressRequest = new XMLHttpRequest();
			addressRequest.open('GET', "http://flip3.engr.oregonstate.edu:9666/address", true);
			addressRequest.addEventListener('load',function(){
			if(addressRequest.status >= 200 && addressRequest.status < 400){
				var response = JSON.parse(addressRequest.responseText);
		
				var currentTable = document.getElementsByTagName("table")[2];
		
				if(currentTable){
					console.log(currentTable);
					var currentTableParent = currentTable.parentNode;
					currentTableParent.removeChild(currentTable);
				}

				makeTable(response, "address");

				var orderRequest = new XMLHttpRequest();
				orderRequest.open('GET', "http://flip3.engr.oregonstate.edu:9666/order", true);
				orderRequest.addEventListener('load',function(){
				if(orderRequest.status >= 200 && orderRequest.status < 400){
					var response = JSON.parse(orderRequest.responseText);
			
					var currentTable = document.getElementsByTagName("table")[3];
			
					if(currentTable){
						console.log(currentTable);
						var currentTableParent = currentTable.parentNode;
						currentTableParent.removeChild(currentTable);
					}

					makeTable(response, "order");
					
					var paymentRequest = new XMLHttpRequest();
					paymentRequest.open('GET', "http://flip3.engr.oregonstate.edu:9666/payment", true);
					paymentRequest.addEventListener('load',function(){
					if(paymentRequest.status >= 200 && paymentRequest.status < 400){
						var response = JSON.parse(paymentRequest.responseText);
				
						var currentTable = document.getElementsByTagName("table")[4];
				
						if(currentTable){
							console.log(currentTable);
							var currentTableParent = currentTable.parentNode;
							currentTableParent.removeChild(currentTable);
						}

						makeTable(response, "payment");

						var order_productRequest = new XMLHttpRequest();
						order_productRequest.open('GET', "http://flip3.engr.oregonstate.edu:9666/order_products", true);
						order_productRequest.addEventListener('load',function(){
						if(order_productRequest.status >= 200 && order_productRequest.status < 400){
							var response = JSON.parse(order_productRequest.responseText);
					
							var currentTable = document.getElementsByTagName("table")[5];
					
							if(currentTable){
								console.log(currentTable);
								var currentTableParent = currentTable.parentNode;
								currentTableParent.removeChild(currentTable);
							}

							makeTable(response, "order_products");
							addProductInteraction();
							addCustomerInteraction();
							addAddressInteraction();
							addPaymentInteraction();
							
						} else {
						console.log("Error in network request: " + order_productRequest.statusText);
						}});
						order_productRequest.send(null);											
						
					} else {
					console.log("Error in network request: " + paymentRequest.statusText);
					}});
					paymentRequest.send(null);					
					
					
				} else {
				console.log("Error in network request: " + orderRequest.statusText);
				}});
				orderRequest.send(null);	
				
				
		
			} else {
			console.log("Error in network request: " + addressRequest.statusText);
			}});
			addressRequest.send(null);
		
		
		} else {
		console.log("Error in network request: " + customerRequest.statusText);
		}});
		customerRequest.send(null);
		
		
	  } else {
		console.log("Error in network request: " + productRequest.statusText);
	  }});
	productRequest.send(null);
	
	

}


function makeTable(response, tableName){
	
	var br = document.createElement("br");
	var label = document.createElement("label");
	
	if(tableName == "order_products"){
		label.innerHTML = "Products and Orders:";
	}
	else{
		label.innerHTML = tableName.charAt(0).toUpperCase() + tableName.slice(1) + ":";
	}
	
	document.body.appendChild(br);
	document.body.appendChild(label);
	
	// Create a table element, a thead element and a tr element
	// for the first row (the header row)
	var table = document.createElement("table");
	table.id = tableName + "table";
	
	var thead = document.createElement("thead");
	var tr = document.createElement("tr");

	// Set up a loop to run, creating a th element
	// with proper styling and text and append this to the first row
	for(var prop in response[0]){
		var th = document.createElement("th");
		th.style.border = "1px solid black";
		th.textContent = prop;
		tr.appendChild(th);
	}

	// Add the completed header row to the thead element
	thead.appendChild(tr);

	// Create a tbody element for the rest of the cells
	var tbody = document.createElement("tbody");

	
	for(var i = 0; i < response.length; i++){
	   
		// For each row create a new row element
		var tr = document.createElement("tr");
	   
		for(var prop in response[i]){
		   
			// Create a td element with appropriate styling and
			// text and append this to the current row
			var td = document.createElement("td");
			td.style.border = "1px solid black";
			//console.log(response[i]["name"]);
			td.textContent = response[i][prop];
			tr.appendChild(td);
			
		}
		
		var deleteButton = document.createElement("button");
		
		deleteButton.textContent = "Delete";
		
		var rowId;
		if (tableName === "order_products"){
			rowId = response[i]["Order ID"].toString();
			rowId += "&product_id=";
			rowId += response[i]["Product ID"].toString();
		}
		else{
			rowId = response[i]["ID Number"];
		}		
		//Set up to go to a given table based upon the input table name
		
		function setUpDeleteButton(rowId){
			deleteButton.addEventListener('click', function(event){
				var deleteRequest = new XMLHttpRequest();
					
				console.log("this request is using id: " + rowId);	
				deleteRequest.open('GET', "http://flip3.engr.oregonstate.edu:9666/" + tableName + "_delete?id=" + rowId, true);
				deleteRequest.addEventListener('load',function(){
				  if(deleteRequest.status >= 200 && deleteRequest.status < 400){
					
					location = location;
					
				  } else {
					console.log("Error in network request: " + deleteRequest.statusText);
				  }});
				deleteRequest.send(null);
				event.preventDefault();
			});
		};
		
		setUpDeleteButton(rowId);
		
		var editButton = document.createElement("button");
		
		editButton.textContent = "Edit";
		
		function setUpEditButton(rowId){
			editButton.addEventListener('click', function(event){
				
			    if (tableName=== "product") {
			        window.open("http://flip3.engr.oregonstate.edu:9666/editProduct.html?id=" + rowId, "_self");
			    }

			    if (tableName === "customer") {
			        window.open("http://flip3.engr.oregonstate.edu:9666/editCustomer.html?id=" + rowId, "_self");
			    }
			    if (tableName === "order") {
			        window.open("http://flip3.engr.oregonstate.edu:9666/editOrder.html?id=" + rowId, "_self");
			    }
			    if (tableName === "address") {
			        window.open("http://flip3.engr.oregonstate.edu:9666/editAddress.html?id=" + rowId, "_self");
			    }
			    if (tableName === "payment") {
			        window.open("http://flip3.engr.oregonstate.edu:9666/editPayment.html?id=" + rowId, "_self");
			    }

			    if (tableName === "order_products") {
			        window.open("http://flip3.engr.oregonstate.edu:9666/editOrderProduct.html?id=" + rowId, "_self");
			    }
			});
		};
		
		setUpEditButton(rowId);		
		
	    
	    tr.appendChild(deleteButton);
		
		tr.appendChild(editButton);
		
		// Add the new row to the body of the table before looping
		// again (if required)
		tbody.appendChild(tr);
	}

	//Add the completed head and body to the table
	table.appendChild(thead);
	table.appendChild(tbody);

	// Style the entire table with a border
	table.style.border = "1px solid black";

	// Add this table to the page
	document.body.appendChild(table);
}


function addProductInteraction(){
	
	//Create elements needed and set appropriate properties
	var priceGreaterLabel = document.createElement("label");
	priceGreaterLabel.innerHTML = "Enter a price to find all products with higher cost: ";
	
	var prodPriceGreater = document.createElement("button");
	prodPriceGreater.innerHTML = "Show products";
	
	var priceInput = document.createElement("input")
	priceInput.setAttribute("type", "number");
	
	var productTable = document.getElementById("producttable");
	
	var br = document.createElement("br");
	
	prodPriceGreater.addEventListener("click", function(event){
		
		event.preventDefault();
		var priceGreaterRequest = new XMLHttpRequest();
					

		priceGreaterRequest.open('POST', "http://flip3.engr.oregonstate.edu:9666/productPriceGreater", true);
		priceGreaterRequest.addEventListener('load',function(){
			if(priceGreaterRequest.status >= 200 && priceGreaterRequest.status < 400){
				
				var response = JSON.parse(priceGreaterRequest.responseText);
				
				var table = document.createElement("table");
				var thead = document.createElement("thead");
				var tr = document.createElement("tr");

				for(var prop in response[0]){
					var th = document.createElement("th");
					th.style.border = "1px solid black";
					th.textContent = prop;
					tr.appendChild(th);
				}
				
				thead.appendChild(tr);
				var tbody = document.createElement("tbody");
				for(var i = 0; i < response.length; i++){
					var tr = document.createElement("tr"); 
					for(var prop in response[i]){
						var td = document.createElement("td");
						td.style.border = "1px solid black";
						td.textContent = response[i][prop];
						tr.appendChild(td);
					}
					tbody.appendChild(tr);
				}
				table.appendChild(thead);
				table.appendChild(tbody);

				table.style.border = "1px solid black";
				table.id = "productManipTable"
				
				//document.body.appendChild(table);
				//Node you want to insert after.parentNode.insertBefore(node you want to add, node you want to insert after.nextSibling)
				if(document.getElementById("productManipTable")){
					
					document.getElementById("productManipTable").remove();
					
				}
				
				prodQuantityLesser.parentNode.insertBefore(table, prodQuantityLesser.nextSibling)
				
				//document.body.insertBefore(table, document.getElementById("producttable"));
				//document.getElementById("producttable").remove();		
			
			} else {
				console.log("Error in network request: " + priceGreaterRequest.statusText);
			}});
		var body = {};
		body.price = priceInput.value;
		priceGreaterRequest.setRequestHeader("Content-Type", "application/json");
		priceGreaterRequest.send(JSON.stringify(body));		
		
	});
	
	//Node you want to insert after.parentNode.insertBefore(node you want to add, node you want to insert after.nextSibling)
	productTable.parentNode.insertBefore(priceGreaterLabel, productTable.nextSibling);
	priceGreaterLabel.parentNode.insertBefore(priceInput, priceGreaterLabel.nextSibling);
	priceInput.parentNode.insertBefore(prodPriceGreater, priceInput.nextSibling);
	prodPriceGreater.parentNode.insertBefore(br, prodPriceGreater.nextSibling);
	
	
	//Create elements needed and set appropriate properties
	var priceLesserLabel = document.createElement("label");
	priceLesserLabel.innerHTML = "Enter a price to find all products with lower cost: ";
	
	var prodPriceLesser = document.createElement("button");
	prodPriceLesser.innerHTML = "Show products";
	
	var priceInputLesser = document.createElement("input")
	priceInputLesser.setAttribute("type", "number");
	
	var br2 = document.createElement("br");
	
	prodPriceLesser.addEventListener("click", function(event){
		
		event.preventDefault();
		var priceLesserRequest = new XMLHttpRequest();
					

		priceLesserRequest.open('POST', "http://flip3.engr.oregonstate.edu:9666/productPriceLess", true);
		priceLesserRequest.addEventListener('load',function(){
			if(priceLesserRequest.status >= 200 && priceLesserRequest.status < 400){
				
				var response = JSON.parse(priceLesserRequest.responseText);
				
				var table = document.createElement("table");
				var thead = document.createElement("thead");
				var tr = document.createElement("tr");

				for(var prop in response[0]){
					var th = document.createElement("th");
					th.style.border = "1px solid black";
					th.textContent = prop;
					tr.appendChild(th);
				}
				
				thead.appendChild(tr);
				var tbody = document.createElement("tbody");
				for(var i = 0; i < response.length; i++){
					var tr = document.createElement("tr"); 
					for(var prop in response[i]){
						var td = document.createElement("td");
						td.style.border = "1px solid black";
						td.textContent = response[i][prop];
						tr.appendChild(td);
					}
					tbody.appendChild(tr);
				}
				table.appendChild(thead);
				table.appendChild(tbody);

				table.style.border = "1px solid black";
				table.id = "productManipTable"
				
				//document.body.appendChild(table);
				//Node you want to insert after.parentNode.insertBefore(node you want to add, node you want to insert after.nextSibling)
				if(document.getElementById("productManipTable")){
					
					document.getElementById("productManipTable").remove();
					
				}
				
				prodQuantityLesser.parentNode.insertBefore(table, prodQuantityLesser.nextSibling)	
			
			} else {
				console.log("Error in network request: " + priceLesserRequest.statusText);
			}});
		var body = {};
		body.price = priceInputLesser.value;
		priceLesserRequest.setRequestHeader("Content-Type", "application/json");
		priceLesserRequest.send(JSON.stringify(body));		
		
	});
	
	//Node you want to insert after.parentNode.insertBefore(node you want to add, node you want to insert after.nextSibling)
	br.parentNode.insertBefore(priceLesserLabel, br.nextSibling);
	priceLesserLabel.parentNode.insertBefore(priceInputLesser, priceLesserLabel.nextSibling);
	priceInputLesser.parentNode.insertBefore(prodPriceLesser, priceInputLesser.nextSibling);
	prodPriceLesser.parentNode.insertBefore(br2, prodPriceLesser.nextSibling);
	

	//Create elements needed and set appropriate properties
	var prodQuantityGreaterLabel = document.createElement("label");
	prodQuantityGreaterLabel.innerHTML = "Enter a quantity to find all products with greater quantity: ";
	
	var prodQuantityGreater = document.createElement("button");
	prodQuantityGreater.innerHTML = "Show products";
	
	var quantityInputGreater = document.createElement("input")
	quantityInputGreater.setAttribute("type", "number");
	
	var br3 = document.createElement("br");
	
	prodQuantityGreater.addEventListener("click", function(event){
		
		event.preventDefault();
		var quantityGreaterRequest = new XMLHttpRequest();
					

		quantityGreaterRequest.open('POST', "http://flip3.engr.oregonstate.edu:9666/productQuantityGreater", true);
		quantityGreaterRequest.addEventListener('load',function(){
			if(quantityGreaterRequest.status >= 200 && quantityGreaterRequest.status < 400){
				
				var response = JSON.parse(quantityGreaterRequest.responseText);
				console.log(response);
				
				var table = document.createElement("table");
				var thead = document.createElement("thead");
				var tr = document.createElement("tr");

				for(var prop in response[0]){
					var th = document.createElement("th");
					th.style.border = "1px solid black";
					th.textContent = prop;
					tr.appendChild(th);
				}
				
				thead.appendChild(tr);
				var tbody = document.createElement("tbody");
				for(var i = 0; i < response.length; i++){
					var tr = document.createElement("tr"); 
					for(var prop in response[i]){
						var td = document.createElement("td");
						td.style.border = "1px solid black";
						td.textContent = response[i][prop];
						tr.appendChild(td);
					}
					tbody.appendChild(tr);
				}
				table.appendChild(thead);
				table.appendChild(tbody);

				table.style.border = "1px solid black";
				table.id = "productManipTable";
				
				//document.body.appendChild(table);
				//Node you want to insert after.parentNode.insertBefore(node you want to add, node you want to insert after.nextSibling)
				if(document.getElementById("productManipTable")){
					
					document.getElementById("productManipTable").remove();
					
				}
				
				prodQuantityLesser.parentNode.insertBefore(table, prodQuantityLesser.nextSibling)
				
			
			} else {
				console.log("Error in network request: " + quantityGreaterRequest.statusText);
			}});
		var body = {};
		body.quantity = quantityInputGreater.value;
		quantityGreaterRequest.setRequestHeader("Content-Type", "application/json");
		quantityGreaterRequest.send(JSON.stringify(body));		
		
	});
	
	//Node you want to insert after.parentNode.insertBefore(node you want to add, node you want to insert after.nextSibling)
	br2.parentNode.insertBefore(prodQuantityGreaterLabel, br2.nextSibling);
	prodQuantityGreaterLabel.parentNode.insertBefore(quantityInputGreater, prodQuantityGreaterLabel.nextSibling);
	quantityInputGreater.parentNode.insertBefore(prodQuantityGreater, quantityInputGreater.nextSibling);
	prodQuantityGreater.parentNode.insertBefore(br3, prodQuantityGreater.nextSibling);
	
	
	//Create elements needed and set appropriate properties
	var prodQuantityLesserLabel = document.createElement("label");
	prodQuantityLesserLabel.innerHTML = "Enter a quantity to find all products with lesser quantity: ";
	
	var prodQuantityLesser = document.createElement("button");
	prodQuantityLesser.innerHTML = "Show products";
	
	var quantityInputLesser = document.createElement("input")
	quantityInputLesser.setAttribute("type", "number");
	
	//var  = document.getElementById("producttable");
	
	var br4 = document.createElement("br");
	
	prodQuantityLesser.addEventListener("click", function(event){
		
		event.preventDefault();
		var quantityLesserRequest = new XMLHttpRequest();
					

		quantityLesserRequest.open('POST', "http://flip3.engr.oregonstate.edu:9666/productQuantityLess", true);
		quantityLesserRequest.addEventListener('load',function(){
			if(quantityLesserRequest.status >= 200 && quantityLesserRequest.status < 400){
				
				var response = JSON.parse(quantityLesserRequest.responseText);
				console.log(response);
				
				var table = document.createElement("table");
				var thead = document.createElement("thead");
				var tr = document.createElement("tr");

				for(var prop in response[0]){
					var th = document.createElement("th");
					th.style.border = "1px solid black";
					th.textContent = prop;
					tr.appendChild(th);
				}
				
				thead.appendChild(tr);
				var tbody = document.createElement("tbody");
				for(var i = 0; i < response.length; i++){
					var tr = document.createElement("tr"); 
					for(var prop in response[i]){
						var td = document.createElement("td");
						td.style.border = "1px solid black";
						td.textContent = response[i][prop];
						tr.appendChild(td);
					}
					tbody.appendChild(tr);
				}
				table.appendChild(thead);
				table.appendChild(tbody);

				table.style.border = "1px solid black";
				table.id = "productManipTable";
				
				//document.body.appendChild(table);
				//Node you want to insert after.parentNode.insertBefore(node you want to add, node you want to insert after.nextSibling)
				if(document.getElementById("productManipTable")){
					
					document.getElementById("productManipTable").remove();
					
				}
				
				prodQuantityLesser.parentNode.insertBefore(table, prodQuantityLesser.nextSibling)	
			
			} else {
				console.log("Error in network request: " + quantityLesserRequest.statusText);
			}});
		var body = {};
		body.quantity = quantityInputLesser.value;
		quantityLesserRequest.setRequestHeader("Content-Type", "application/json");
		quantityLesserRequest.send(JSON.stringify(body));		
		
	});
	
	//Node you want to insert after.parentNode.insertBefore(node you want to add, node you want to insert after.nextSibling)
	br3.parentNode.insertBefore(prodQuantityLesserLabel, br3.nextSibling);
	prodQuantityLesserLabel.parentNode.insertBefore(quantityInputLesser, prodQuantityLesserLabel.nextSibling);
	quantityInputLesser.parentNode.insertBefore(prodQuantityLesser, quantityInputLesser.nextSibling);
	prodQuantityLesser.parentNode.insertBefore(br4, prodQuantityLesser.nextSibling);
}




function addCustomerInteraction(){
	
	var customerNamesButton = document.createElement("button");
	customerNamesButton.innerHTML = "Show Customers";
	
	var customerTable = document.getElementById("customertable");
	
	var br = document.createElement("br");
	
	customerNamesButton.addEventListener("click", function(event){
		
		event.preventDefault();
		var customerNamesRequest = new XMLHttpRequest();
					

		customerNamesRequest.open('POST', "http://flip3.engr.oregonstate.edu:9666/viewCustomerNames", true);
		customerNamesRequest.addEventListener('load',function(){
			if(customerNamesRequest.status >= 200 && customerNamesRequest.status < 400){
				
				var response = JSON.parse(customerNamesRequest.responseText);
				
				var table = document.createElement("table");
				var thead = document.createElement("thead");
				var tr = document.createElement("tr");

				for(var prop in response[0]){
					var th = document.createElement("th");
					th.style.border = "1px solid black";
					th.textContent = prop;
					tr.appendChild(th);
				}
				
				thead.appendChild(tr);
				var tbody = document.createElement("tbody");
				for(var i = 0; i < response.length; i++){
					var tr = document.createElement("tr"); 
					for(var prop in response[i]){
						var td = document.createElement("td");
						td.style.border = "1px solid black";
						td.textContent = response[i][prop];
						tr.appendChild(td);
					}
					tbody.appendChild(tr);
				}
				table.appendChild(thead);
				table.appendChild(tbody);

				table.style.border = "1px solid black";
				table.id = "customerManipTable"
				
				//document.body.appendChild(table);
				//Node you want to insert after.parentNode.insertBefore(node you want to add, node you want to insert after.nextSibling)
				if(document.getElementById("customerManipTable")){
					
					document.getElementById("customerManipTable").remove();
					
				}
				
				customerNamesButton.parentNode.insertBefore(table, customerNamesButton.nextSibling)
			
			} else {
				console.log("Error in network request: " + customerNamesRequest.statusText);
			}});
		var body = {};
		//body.price = priceInput.value;
		customerNamesRequest.setRequestHeader("Content-Type", "application/json");
		customerNamesRequest.send(JSON.stringify(body));		
		
	});
	
	//Node you want to insert after.parentNode.insertBefore(node you want to add, node you want to insert after.nextSibling)
	customerTable.parentNode.insertBefore(customerNamesButton, customerTable.nextSibling);
	customerNamesButton.parentNode.insertBefore(br, customerNamesButton.nextSibling);
}

function addAddressInteraction(){
	
	
	var addressStatesButton = document.createElement("button");
	addressStatesButton.innerHTML = "Show Distinct States";

	var addressTable = document.getElementById("addresstable");
	
	var br = document.createElement("br");
	
	addressStatesButton.addEventListener("click", function(event){
		
		event.preventDefault();
		var addressStatesRequest = new XMLHttpRequest();
					

		addressStatesRequest.open('POST', "http://flip3.engr.oregonstate.edu:9666/distinctStates", true);
		addressStatesRequest.addEventListener('load',function(){
			if(addressStatesRequest.status >= 200 && addressStatesRequest.status < 400){
				
				var response = JSON.parse(addressStatesRequest.responseText);
				
				var table = document.createElement("table");
				var thead = document.createElement("thead");
				var tr = document.createElement("tr");

				for(var prop in response[0]){
					var th = document.createElement("th");
					th.style.border = "1px solid black";
					th.textContent = prop;
					tr.appendChild(th);
				}
				
				thead.appendChild(tr);
				var tbody = document.createElement("tbody");
				for(var i = 0; i < response.length; i++){
					var tr = document.createElement("tr"); 
					for(var prop in response[i]){
						var td = document.createElement("td");
						td.style.border = "1px solid black";
						td.textContent = response[i][prop];
						tr.appendChild(td);
					}
					tbody.appendChild(tr);
				}
				table.appendChild(thead);
				table.appendChild(tbody);

				table.style.border = "1px solid black";
				table.id = "addressManipTable"
				
				//document.body.appendChild(table);
				//Node you want to insert after.parentNode.insertBefore(node you want to add, node you want to insert after.nextSibling)
				if(document.getElementById("addressManipTable")){
					
					document.getElementById("addressManipTable").remove();
					
				}
				
				addressStatesButton.parentNode.insertBefore(table, addressStatesButton.nextSibling)	
			
			} else {
				console.log("Error in network request: " + addressStatesRequest.statusText);
			}});
		var body = {};
		addressStatesRequest.setRequestHeader("Content-Type", "application/json");
		addressStatesRequest.send(JSON.stringify(body));		
		
	});
	
	//Node you want to insert after.parentNode.insertBefore(node you want to add, node you want to insert after.nextSibling)
	addressTable.parentNode.insertBefore(addressStatesButton, addressTable.nextSibling);
	addressStatesButton.parentNode.insertBefore(br, addressStatesButton.nextSibling);
}


function addPaymentInteraction(){
	
	var paymentGreaterLabel = document.createElement("label");
    paymentGreaterLabel.innerHTML = "Enter an amount to find payments with higher amount: ";
	
	var paymentGreater = document.createElement("button")
	paymentGreater.innerHTML = "Show payments"
	
	var paymentInput = document.createElement("input")
	paymentInput.setAttribute("type", "number");

	var paymentTable = document.getElementById("paymenttable");

	var br = document.createElement("br");
	
	paymentGreater.addEventListener("click", function(event) {
		
		event.preventDefault();

		var paymentGreaterRequest = new XMLHttpRequest();
		
		paymentGreaterRequest.open('POST', "http://flip3.engr.oregonstate.edu:9666/paymentGreaterThan", true);
		paymentGreaterRequest.addEventListener('load', function() {
		
		if (paymentGreaterRequest.status >= 200 && paymentGreaterRequest.status < 400) {


			var response = JSON.parse(paymentGreaterRequest.responseText);

			var table = document.createElement("table");
			var thead = document.createElement("thead");
			var tr = document.createElement("tr");

			for (var prop in response[0]) {
				var th = document.createElement("th");
				th.style.border = "1px solid black";
				th.textContent = prop;
				tr.appendChild(th);
			}

			thead.appendChild(tr);
			var tbody = document.createElement("tbody");
			for (var i = 0; i < response.length; i++) {
				var tr = document.createElement("tr");
				for (var prop in response[i]) {
					var td = document.createElement("td");
					td.style.border = "1px solid black";
					td.textContent = response[i][prop];
					tr.appendChild(td);
				}
				tbody.appendChild(tr);
			}
			table.appendChild(thead);
			table.appendChild(tbody);

			table.style.border = "1px solid black";
			table.id = "paymentManipTable"


			if (document.getElementById("paymentManipTable")) {
				document.getElementById("paymentManipTable").remove();
			}

			// prodPriceGreater.parentNode.insertBefore(table, prodPriceGreater.nextSibling)
			paymentLesser.parentNode.insertBefore(table, paymentLesser.nextSibling)


		}
		else {
			console.log("Error in network request: " + paymentGreaterRequest.statusText);
		}});


		var body = {};
		body.amount = paymentInput.value;
		paymentGreaterRequest.setRequestHeader("Content-Type", "application/json");
		paymentGreaterRequest.send(JSON.stringify(body));

	});

	paymentTable.parentNode.insertBefore(paymentGreaterLabel, paymentTable.nextSibling);
	paymentGreaterLabel.parentNode.insertBefore(paymentInput, paymentGreaterLabel.nextSibling);
	paymentInput.parentNode.insertBefore(paymentGreater, paymentInput.nextSibling);
	paymentGreater.parentNode.insertBefore(br, paymentGreater.nextSibling);
	
	
	var paymentLesserLabel = document.createElement("label");
    paymentLesserLabel.innerHTML = "Enter an amount to find payments with lesser amount: ";
	
	var paymentLesser = document.createElement("button")
	paymentLesser.innerHTML = "Show payments"
	
	var paymentInputLesser = document.createElement("input")
	paymentInputLesser.setAttribute("type", "number");

	var br2 = document.createElement("br");
	
	paymentLesser.addEventListener("click", function(event) {
		
		event.preventDefault();

		var paymentLesserRequest = new XMLHttpRequest();
		
		paymentLesserRequest.open('POST', "http://flip3.engr.oregonstate.edu:9666/paymentLessThan", true);
		paymentLesserRequest.addEventListener('load', function() {
		
		if (paymentLesserRequest.status >= 200 && paymentLesserRequest.status < 400) {


			var response = JSON.parse(paymentLesserRequest.responseText);

			var table = document.createElement("table");
			var thead = document.createElement("thead");
			var tr = document.createElement("tr");

			for (var prop in response[0]) {
				var th = document.createElement("th");
				th.style.border = "1px solid black";
				th.textContent = prop;
				tr.appendChild(th);
			}

			thead.appendChild(tr);
			var tbody = document.createElement("tbody");
			for (var i = 0; i < response.length; i++) {
				var tr = document.createElement("tr");
				for (var prop in response[i]) {
					var td = document.createElement("td");
					td.style.border = "1px solid black";
					td.textContent = response[i][prop];
					tr.appendChild(td);
				}
				tbody.appendChild(tr);
			}
			table.appendChild(thead);
			table.appendChild(tbody);

			table.style.border = "1px solid black";
			table.id = "paymentManipTable"


			if (document.getElementById("paymentManipTable")) {
				document.getElementById("paymentManipTable").remove();
			}

			// prodPriceGreater.parentNode.insertBefore(table, prodPriceGreater.nextSibling)
			paymentLesser.parentNode.insertBefore(table, paymentLesser.nextSibling)


		}
		else {
			console.log("Error in network request: " + paymentLesserRequest.statusText);
		}});


		var body = {};
		body.amount = paymentInputLesser.value;
		paymentLesserRequest.setRequestHeader("Content-Type", "application/json");
		paymentLesserRequest.send(JSON.stringify(body));

	});

	br.parentNode.insertBefore(paymentLesserLabel, br.nextSibling);
	paymentLesserLabel.parentNode.insertBefore(paymentInputLesser, paymentLesserLabel.nextSibling);
	paymentInputLesser.parentNode.insertBefore(paymentLesser, paymentInputLesser.nextSibling);
	paymentLesser.parentNode.insertBefore(br2, paymentLesser.nextSibling);
}