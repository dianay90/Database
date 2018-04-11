var express = require('express');
var mysql = require('./dbcon.js');
const bodyParser = require('body-parser')

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);

app.get('/',function(req,res,next){
	var context = {};
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Acess-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	
	var allRows;
	mysql.pool.query('SELECT * FROM product', function(err, rows, fields){
		context.product = JSON.stringify(rows);
		mysql.pool.query('SELECT * FROM `order`', function(err, rows, fields){
			context.order = JSON.stringify(rows);
			mysql.pool.query('SELECT * FROM customer', function(err, rows, fields){
				context.customer = JSON.stringify(rows);
				mysql.pool.query('SELECT * FROM payment', function(err, rows, fields){
					context.payment = JSON.stringify(rows);
					mysql.pool.query('SELECT * FROM address', function(err, rows, fields){
						context.address = JSON.stringify(rows);
						res.render('home',context);
					});
				});
			});
		});
	});
});

// Requests for all data from given table
app.get('/product',function(req,res,next){
	var context = {};
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Acess-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

	var queryString  = 'SELECT product_id AS `ID Number`, product_name AS Name, product_type AS Type, quantity AS Quantity, description AS Description, price AS Price FROM product';
	mysql.pool.query(queryString, function(err, rows, fields){
		res.send(rows)
	});
});

app.get('/customer',function(req,res,next){
	var context = {};
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Acess-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
	var queryString = "SELECT customer_id AS `ID Number`, first_name AS `First Name`, last_name AS `Last Name`, address.street AS `Street Address`, " +
						"address.city AS City, address.zipcode AS `Zip Code`, address.state AS State FROM customer " +
						"LEFT JOIN address ON customer.address_id = address.address_id";
	mysql.pool.query(queryString, function(err, rows, fields){
		res.send(rows)
	});
});

app.get('/address',function(req,res,next){
	var context = {};
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Acess-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
	var queryString = "SELECT address_id AS `ID Number`, street AS Street, city AS City, zipcode AS `Zip Code`, state AS State FROM address"
	mysql.pool.query(queryString, function(err, rows, fields){
		res.send(rows)
	});
});

app.get('/order',function(req,res,next){
	var context = {};
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Acess-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
	var queryString = "SELECT order_id AS `ID Number`, order_number AS `Order Number`, order_date AS `Order Date`, customer.first_name AS `First Name`, customer.last_name AS `Last Name`, " +
						"address.street AS `Street Address`, address.city AS City, address.zipcode AS `Zip Code`, address.state AS State, payment.payment_number AS `Payment Number` FROM `order` " +
						"LEFT JOIN customer ON order.customer_id = customer.customer_id " +
						"LEFT JOIN address ON order.shipping_address_id = address.address_id " +
						"LEFT JOIN payment on order.payment_id = payment.payment_id";
	mysql.pool.query(queryString, function(err, rows, fields){
		if(err){
			console.log(err);
		}
		for(var i = 0; i < rows.length; i++){
			rows[i]["Order Date"] = rows[i]["Order Date"].toISOString().slice(0,10);
		}
		res.send(rows)
	});
});

app.get('/payment',function(req,res,next){
	var context = {};
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Acess-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
	var queryString = "SELECT payment_id AS `ID Number`, payment_type AS `Payment Type`, payment_number AS `Payment Number`, amount AS `Payment Amount`, customer.first_name AS `First Name`, customer.last_name AS `Last Name`, " +
						"address.street AS `Street Address`, address.city AS City, address.zipcode AS `Zip Code`, address.state AS State FROM payment " +
						"LEFT JOIN customer ON payment.customer_id = customer.customer_id " +
						"LEFT JOIN address ON payment.address_id = address.address_id";
	mysql.pool.query(queryString, function(err, rows, fields){
		if(err){
			console.log(err);
		}
		res.send(rows)
	});
});

app.get('/order_products',function(req,res,next){
	var context = {};
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Acess-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
	var queryString = "SELECT order_products.order_id AS `Order ID`, order.order_number AS `Order Number`, order_products.product_id AS `Product ID`, product.product_name AS `Product Name`, order_products.product_quantity AS `Product Quantity` FROM order_products " +
						"LEFT JOIN `order` ON order_products.order_id = order.order_id " +
						"LEFT JOIN product ON order_products.product_id = product.product_id";
	mysql.pool.query(queryString, function(err, rows, fields){
		if(err){
			console.log(err);
		}
		res.send(rows)
	});
});


//Requests for deleting from given table
app.get('/product_delete',function(req,res,next){
	var context = {};
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Acess-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
	mysql.pool.query('DELETE FROM product WHERE product_id=?', [req.query.id], function(err, rows, fields){
		res.send(rows)
	});
});

app.get('/customer_delete',function(req,res,next){
	var context = {};
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Acess-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
	mysql.pool.query('DELETE FROM customer WHERE customer_id=?', [req.query.id], function(err, rows, fields){
		res.send(rows)
	});
});

app.get('/address_delete',function(req,res,next){
	var context = {};
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Acess-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
	mysql.pool.query('DELETE FROM address WHERE address_id=?', [req.query.id], function(err, rows, fields){
		res.send(rows)
	});
});

app.get('/order_delete',function(req,res,next){
	var context = {};
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Acess-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
	mysql.pool.query('DELETE FROM `order` WHERE order_id=?', [req.query.id], function(err, rows, fields){
		res.send(rows)
	});
});

app.get('/payment_delete',function(req,res,next){
	var context = {};
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Acess-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
	mysql.pool.query('DELETE FROM payment WHERE payment_id=?', [req.query.id], function(err, rows, fields){
		res.send(rows)
	});
});

app.get('/order_products_delete',function(req,res,next){
	var context = {};
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Acess-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
	mysql.pool.query('DELETE FROM order_products WHERE order_id=? AND product_id=?', [req.query.id, req.query.product_id], function(err, rows, fields){
		res.send(rows)
	});
});


// Requests for inserting into tables
app.get('/product_insert',function(req,res,next){
	var context = {};
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Acess-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
	mysql.pool.query('INSERT INTO product (product_name, product_type, quantity, description, price) VALUES (?,?,?,?,?)', [req.query.name, req.query.type, req.query.quantity, req.query.description, req.query.price], function(err, rows, fields){
		res.send(rows);
	});
});

app.get('/address_insert',function(req,res,next){
	var context = {};
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Acess-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
	mysql.pool.query('INSERT INTO address (street, city, zipcode, state) VALUES (?,?,?,?)', [req.query.street, req.query.city, req.query.zipcode, req.query.state], function(err, rows, fields){
		res.send(rows);
	});
});

app.get('/customer_insert',function(req,res,next){
	var context = {};
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Acess-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
	mysql.pool.query('INSERT INTO customer (first_name, last_name, address_id) VALUES (?,?,?)', [req.query.fname, req.query.lname, req.query.address], function(err, rows, fields){
		res.send(rows);
	});
});

app.get('/order_insert',function(req,res,next){
	var context = {};
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Acess-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
	mysql.pool.query('INSERT INTO `order` (order_number, customer_id, shipping_address_id, order_date, payment_id) VALUES (?,?,?,?,?)', [req.query.number, req.query.customer, req.query.address, req.query.date, req.query.payment], function(err, rows, fields){
		res.send(rows);
	});
});


app.get('/payment_insert',function(req,res,next){
	var context = {};
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Acess-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
	mysql.pool.query('INSERT INTO payment (customer_id, address_id, payment_type, payment_number, amount) VALUES (?,?,?,?,?)', [req.query.customer, req.query.address, req.query.type, req.query.number, req.query.amount], function(err, rows, fields){
		res.send(rows);
	});
});

app.get('/product_quantity',function(req,res,next){
	var context = {};
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Acess-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
	var queryString = "SELECT quantity FROM product WHERE product_id=?";
	mysql.pool.query(queryString, [req.query.id], function(err, rows, fields){
		if(err){
			console.log(err);
		}
		res.send(rows)
	});
});


app.get('/orderproducts_insert',function(req,res,next){
	var context = {};
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Acess-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
	mysql.pool.query('INSERT INTO order_products (order_id, product_id, product_quantity) VALUES (?,?,?)', [req.query.order, req.query.product, req.query.quantity], function(err, rows, fields){
		res.send(rows);
		if(err){
		
		}
	});
	
	var queryString = "UPDATE product SET quantity=quantity - ? WHERE product_id=?";
	mysql.pool.query(queryString, [req.query.quantity, req.query.product], function(err, rows, fields){

	});
});

app.get('/itemPayment', function (req, res, next) {

    mysql.pool.query("SELECT * FROM `payment` WHERE payment_id = ?", [req.query.id],
        function (err, rows) {
            if (err) {
                return next(err);
            } else {
				res.send(rows);
                
            }
        });


})




app.get('/item/:id', function (req, res, next) {

   mysql.pool.query("SELECT * FROM `customer` WHERE id = ?", [req.params.id],
        function (err, rows) {
            if (err) {
                return next(err);
            } else {
                res.status(200).json(rows)
            }
        });


})


app.get('/item/:id', function (req, res, next) {

   mysql.pool.query("SELECT * FROM `address` WHERE id = ?", [req.params.id],
        function (err, rows) {
            if (err) {
                return next(err);
            } else {
                res.status(200).json(rows)
            }
        });


})



app.get('/item/:id', function (req, res, next) {

   mysql.pool.query("SELECT * FROM `product` WHERE id = ?", [req.params.id],
        function (err, rows) {
            if (err) {
                return next(err);
            } else {
                res.status(200).json(rows)
            }
        });


})



app.get('/item/:id', function (req, res, next) {

   mysql.pool.query("SELECT * FROM `order` WHERE id = ?", [req.params.id],
        function (err, rows) {
            if (err) {
                return next(err);
            } else {
                res.status(200).json(rows)
            }
        });


})


app.get('/customer_dropdown',function(req,res,next){
	var context = {};
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Acess-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
	var queryString = "SELECT customer_id, first_name, last_name FROM customer";
	mysql.pool.query(queryString, function(err, rows, fields){
		if(err){
			console.log(err);
		}
		res.send(rows)
	});
});

app.get('/address_dropdown',function(req,res,next){
	var context = {};
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Acess-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
	var queryString = "SELECT address_id, street, city, zipcode, state FROM address";
	mysql.pool.query(queryString, function(err, rows, fields){
		if(err){
			console.log(err);
		}
		res.send(rows)
	});
});

app.get('/payment_dropdown',function(req,res,next){
	var context = {};
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Acess-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
	var queryString = "SELECT payment_id, first_name, last_name, amount, payment_number FROM payment " + 
						"INNER JOIN customer ON payment.customer_id = customer.customer_id";
	mysql.pool.query(queryString, function(err, rows, fields){
		if(err){
			console.log(err);
		}
		res.send(rows)
	});
});

app.get('/order_dropdown',function(req,res,next){
	var context = {};
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Acess-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
	var queryString = "SELECT order_id, order_number FROM `order`";
	mysql.pool.query(queryString, function(err, rows, fields){
		if(err){
			console.log(err);
		}
		res.send(rows)
	});
});

app.get('/product_dropdown',function(req,res,next){
	var context = {};
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Acess-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
	var queryString = "SELECT product_id, product_name FROM product";
	mysql.pool.query(queryString, function(err, rows, fields){
		if(err){
			console.log(err);
		}
		res.send(rows)
	});
});

app.get('/product_type',function(req,res,next){
	var context = {};
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Acess-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
	var queryString = "SELECT product_type FROM product";
	mysql.pool.query(queryString, function(err, rows, fields){
		if(err){
			console.log(err);
		}
		res.send(rows)
	});
});

app.get('/products_by_type',function(req,res,next){
	var context = {};
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Acess-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
	var queryString  = 'SELECT product_id AS `ID Number`, product_name AS Name, product_type AS Type, quantity AS Quantity, description AS Description, price AS Price FROM product WHERE product_type=?';
	mysql.pool.query(queryString, [req.query.type], function(err, rows, fields){
		if(err){
			console.log(err);
		}
		res.send(rows)
	});
});


app.post('/productPriceGreater', function (req, res, next) {

   mysql.pool.query("SELECT product_name AS `Name`, price AS `Price` FROM product WHERE price > ?", [req.body.price], function (err, result) {
		res.send(result);
        if (err) {
			console.log(err);
            next(err);
            return;
        }
    });
});


app.post('/productPriceLess', function (req, res, next) {


   mysql.pool.query("SELECT product_name AS `Name`, price AS `Price` FROM product WHERE price < ?", [req.body.price], function (err, result) {
       

		res.send(result);
        if (err) {
            next(err);
            return;
        }
    });
});





app.post('/productQuantityGreater', function (req, res, next) {

   mysql.pool.query("SELECT product_name AS `Name`, quantity AS `Quantity` FROM product WHERE quantity > ?", [req.body.quantity], function (err, result) {

		res.send(result);
        if (err) {
            next(err);
            return;
        }
    });
});


app.post('/productQuantityLess', function (req, res, next) {


   mysql.pool.query("SELECT product_name AS `Name`, quantity AS `Quantity` FROM product WHERE quantity < ?", [req.body.quantity], function (err, result) {

		res.send(result);
        if (err) {
            next(err);
            return;
        }
    });
});




app.post('/paymentGreaterThan', function (req, res, next) {

   mysql.pool.query("SELECT payment_number AS `Payment Number`, payment_type AS `Payment Type`, amount AS `Payment Amount` FROM payment WHERE amount > ?", [req.body.amount], function (err, result) {
		res.send(result);
        if (err) {
            next(err);
            return;
        }
    });
});

app.post('/paymentLessThan', function (req, res, next) {


   mysql.pool.query("SELECT payment_number AS `Payment Number`, payment_type AS `Payment Type`, amount AS `Payment Amount` FROM payment WHERE amount < ?", [req.body.amount], function (err, result) {

		res.send(result);
        if (err) {
            next(err);
            return;
        }
    });
});

app.post('/viewCustomerNames', function (req, res, next) {


   mysql.pool.query("SELECT first_name AS `First Name`, last_name AS `Last Name` FROM customer", function (err, result) {

		res.send(result);
        if (err) {
            next(err);
            return;
        }
    });
});


app.post('/distinctStates', function (req, res, next) {


   mysql.pool.query("select DISTINCT state AS `State` from address", function (err, result) {

		res.send(result);
        if (err) {
            next(err);
            return;
        }
    });
});



app.post('/update_customer/:id', function (req, res, next) {

    mysql.pool.query("UPDATE customer SET first_name=?,last_name=?,address_id=? WHERE customer_id = ?", [req.body.first_name, req.body.last_name, req.body.address_id, req.params.id], function (err, result) {

		res.send(null);
        if (err) {
            next(err);
            return;
        }
    });
});

app.post('/update_orderproduct/:id/:product_id', function (req, res, next) {

    mysql.pool.query("UPDATE `order_products` SET product_quantity=? WHERE order_id = ? && product_id = ?", [req.body.product_quantity, req.params.id, req.params.product_id], function (err, result) {
       
		res.send(null);
        if (err) {
            next(err);
            return;
        }
    });
});


app.get('/itemOrderProduct/:id/:product_id', function (req, res, next) {

    mysql.pool.query("SELECT * FROM `order_products` WHERE order_id = ? && product_id= ?", [req.params.id, req.params.product_id],
        function (err, rows) {
            if (err) {
                return next(err);
            } else {
                res.status(200).json(rows)
            }
        });


})



app.get('/itemProduct/:id', function (req, res, next) {

    mysql.pool.query("SELECT * FROM `product` WHERE product_id = ?", [req.params.id],
        function (err, rows) {
            if (err) {
                return next(err);
            } else {
                res.status(200).json(rows)
            }
        });


})



app.get('/itemCustomer/:id', function (req, res, next) {

    mysql.pool.query("SELECT * FROM `customer` WHERE customer_id = ?", [req.params.id],
        function (err, rows) {
            if (err) {
                return next(err);
            } else {
                res.status(200).json(rows)
            }
        });


})




app.get('/itemAddress/:id', function (req, res, next) {

    mysql.pool.query("SELECT * FROM `address` WHERE address_id = ?", [req.params.id],
        function (err, rows) {
            if (err) {
                return next(err);
            } else {
                res.status(200).json(rows)
            }
        });


})

app.get('/itemPayment/:id', function (req, res, next) {

    mysql.pool.query("SELECT * FROM `payment` WHERE payment_id = ?", [req.params.id],
        function (err, rows) {
            if (err) {
                return next(err);
            } else {
                res.status(200).json(rows)
            }
        });
})

app.get('/itemOrder/:id', function (req, res, next) {

    mysql.pool.query("SELECT * FROM `order` WHERE order_id = ?", [req.params.id],

        function (err, rows) {
            if (err) {
                return next(err);
            } else {
                res.status(200).json(rows)
            }
        });
})


app.post('/update_order/:id', function (req, res, next) {

    mysql.pool.query("UPDATE `order` SET order_number=?,customer_id=?,shipping_address_id=?,order_date=?,payment_id=? WHERE order_id =?", [req.body.order_number, req.body.customer_id, req.body.shipping_address_id, req.body.order_date, req.body.payment_id, req.params.id], function (err, result) {
        
		res.send(null);
        if (err) {
            next(err);
            return;
        }
    });
});


app.post('/update_product/:id', function (req, res, next) {

    mysql.pool.query("UPDATE product SET product_name=?,product_type=?,quantity=?,description=?,price=? WHERE product_id=?", [req.body.product_name, req.body.product_type, req.body.quantity, req.body.description, req.body.price, req.params.id], function (err, result) {

		res.send(null);
        if (err) {
            next(err);
            return;
        }
    });
});


app.post('/update_product_quantity/:id', function (req, res, next) {

    mysql.pool.query("UPDATE product SET quantity=? WHERE product_id=?", [req.body.quantity, req.params.id], function (err, result) {
		
		res.send(null);
        if (err) {
            next(err);
            return;
        }
    });
});




app.post('/update_payment/:id', function (req, res, next) {


    mysql.pool.query("UPDATE payment SET customer_id=?,address_id=?,payment_type=?,payment_number=?,amount=? WHERE payment_id=?",
        [req.body.customer_id, req.body.address_id, req.body.payment_type, req.body.payment_number, req.body.amount, req.params.id], function (err, result) {

			res.send(null);
            if (err) {
                next(err);
                return;
            }
        });
});



app.post('/update_address/:id', function (req, res, next) {

    mysql.pool.query("UPDATE address SET street=?, city=?, zipcode=?, state=? WHERE address_id=?",
        [req.body.street, req.body.city, req.body.zipcode, req.body.state, req.params.id], function (err, result) {

			res.send(null);
            if (err) {
                next(err);
                return;
            }
        });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
