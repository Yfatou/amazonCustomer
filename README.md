# amazonCustomer

## Description
This bamazon app is a commanad line application build with Node.
It creates and use a MySql database.
bamazon is an Amazon-like storefront. It will take in orders from customers and deplete stock from the store's inventory. 
It also allows the manager of the store to:
    - View Products for Sale
    - View Low Inventory
    - Add to Inventory
    - Add New Product

## Technologies used
* Javascript
* Node js
* MySql

## How to use bamazon
Since it is a command line app, bamazon can't be deployed but you can still use it. To do so, the following steps will be necessary: 

 1. Install node by typing the command **"npm install"** on the terminal. The terminal should be opened in the project directory
 2. Now you can use bamazon. 
 
    *  __To use it as a customer__
         type : **"node bamazonCustomer.js"** in your command line and the following informations will be displayed:
         - list of the items available for sale with their unique id number, their name, their department and their price
         - then, you will be asked to enter the ID of the product you would like to buy and the number of items wanted
         - if there is not enough stock for this product, a message is displayed
         - if ther is enough stock, the purchase is made and a message with the total amount of the order is displayed

    *  __To use it as a manager__ 
        type : **"node bamazonManager.js"** in your command line and a menu with alist of actions will be displayed. You can choose to:  
        - View the products for Sale : all the products currently available will be displayed with their unique id, their name, their price and their quantity
        - View low inventory: all the products with a stock lower than 5 will be displayed
        - Add to inventory: will allow the manager to add more of any item currently in stock
        - Add new product: will allow the manager to add a new product

    ![](concert-this.gif)
    ![](concert-this2.gif)

    





