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
  // Once the connection is done, we start by displaying all the menu options
  managerTasks();
});

//Function to display the list of all the menu options
function managerTasks() {
    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to inventory",
        "Add New Product"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Products for Sale":
        productsForSale();
        break;

      case "View Low Inventory":
        lowInventory();
        break;

      case "Add to inventory":
        addToInventory();
        break;

      case "Add New Product":
        addProduct();
        break;
      }
    });
}

//Function to list all the products in the catalogue
function productsForSale() {
    var query = "SELECT item_id ID, product_name PRODUCT, price PRICE, stock_quantity QUANTITY FROM products WHERE stock_quantity > 0";
    connection.query(query, function(err, res) {
        console.table(res);
        //call the menu function
        managerTasks();
    });
}

//Function to list all the products with low inventory
//This function will display all the products which stock-quantity lower than 5
function lowInventory() {
    var query = "SELECT item_id ID, product_name PRODUCT, price PRICE, stock_quantity QUANTITY FROM products WHERE stock_quantity < 5";
    connection.query(query, function(err, res) {
        console.table(res);
       
        if (res.length === 0) {
            console.log("There is no product with a low inventory!");
        }
        //call the menu function
        managerTasks();
    });
}

//Function to allow the manager to add inventory for a choosen product
function addToInventory() {
    inquirer
        .prompt([
            {
                name: "itemToAdd",
                type: "input",
                message: "Enter the number of the item: "
            },
            {
                name: "numberOfProductsToAdd",
                type: "input",
                message: "How many items do you want to add to the inventory?",
                //Make sure that the user input is a number
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function(answer) {
            //start by selecting the current stock of the product
            connection.query("SELECT stock_quantity FROM products WHERE ?",
            {
                item_id: answer.itemToAdd
            },
            function(err, res){
                //access to the value 
                var currentStock = res[0].stock_quantity;

                //Add the current stock to the new stock
                //Before, convert the current stock and the number entered by the user in integer
                var updatedStock = parseInt(currentStock) + parseInt(answer.numberOfProductsToAdd);
                console.log(updatedStock);

                //we update the data
                connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: updatedStock
                    },
                    {
                        item_id: answer.itemToAdd
                    }
                ],
                function(error) {
                    if (error) throw err;
                    console.log("Products successfully added to Inventory");
                    managerTasks();
                }
                )
            }
            )    
        });
}


//Function to add a new product to the catalogue
function addProduct() {
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What is the product you would like to add?"
            },
            {
                name: "department",
                type: "input",
                message: "What will be the department of this product?"
            },
            {
                name: "price",
                type: "input",
                message: "What is the price of this product?",
                //Make sure that the user input is a number
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "How many items do you want to add?",
                //Make sure that the user input is a number
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function(answer) {
            connection.query("INSERT INTO products SET ?",
                {
                    product_name: answer.item,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quantity: answer.quantity
                },
                function(err) {
                    if (err) throw err;
                    console.log("Your product has been successfully added!");
                    managerTasks();
                }
            );
        });
}