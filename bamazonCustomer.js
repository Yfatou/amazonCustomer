var mysql = require("mysql");
var inquirer = require("inquirer");
 
// call once somewhere in the beginning of the app
//https://www.npmjs.com/package/console.table
const cTable = require('console.table');


// Create the connection with the sql database 
var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "yayefatou",

  password: "Yafgueye4&",
  database: "bamazon"
});

// Connection to the database
connection.connect(function(err) {
  if (err) throw err;
  // Once the connection is done, we start by displaying all the available items
  start();
});

// Function that start the program
// It displays all the available items to the customer
function start() {
    connection.query("SELECT item_id ID, product_name PRODUCT, department_name DEPARTMENT, price PRICE FROM products", 
    function(err, res){
        if (err) throw err;

        console.log("---------WELCOME TO OUR WEB STORE-------------");
        console.log("----------------------------------------------");
        console.log("----------------------------------------------");
        console.table(res);
        purchase();
    });
}

//Function for the customer purchase action
//It updates the table products and calculate the price of the purchase
function purchase() {
    inquirer
        .prompt ([
            {
                name: "productId",
                type: "input",
                message: "What is the ID of the product you would like to buy?"
            },
            {
                name: "numberOfItems",
                type: "input",
                message: "How many units would you like to buy?"
            }
        ]).then(function(answer) {
            connection.query("SELECT stock_quantity, price FROM products WHERE ?", 
            { 
                item_id: answer.productId 
            },
            function(err, res) {
                //the current stock of the choosen product is stocked in a variable
                var currentStock = res[0].stock_quantity;
            
                //the prise of the choosen product is stocked in a variable
                var price = res[0].price;

                //Test if there is enough stock
                //If the stock is insufficient
                if ((parseInt(currentStock)) < (parseInt(answer.numberOfItems))){
                    console.log("Insufficient quantity!!");
                    start();
                }
                else {//there is enough stock
                    //calculate the new stock
                    var newStock = parseInt(currentStock) - parseInt(answer.numberOfItems);
                    
                    //Update the table products with the new stock
                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newStock
                            },
                            {
                                item_id: answer.productId            
                            }
                        ],
                        function(error) {
                            if (error) throw err;
                            
                            //calcuate the order total
                            var order = parseInt(price) * parseInt(answer.numberOfItems);
                            //and display it to the customer
                            console.log("The cost of your purchase is: " + order + "$. Thank you!!");
                            //start again
                            start();
                        }
                    );              
                }
            }
            );
        });
    //connection.end();
}
        