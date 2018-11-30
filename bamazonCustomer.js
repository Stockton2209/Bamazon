//using mysql (workbench) for database
const mysql = require("mysql");
//using inquirer for the prompt in the command line
const inquirer = require("inquirer");
//using chalk to provide color to console content
const chalk = require("chalk");

//create a connection
const connection = mysql.createConnection({
  host: "127.0.0.1",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Coders11",
  database: "Bamazon"
});

//Connect
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    runQueries();
  });

function runQueries() {
    connection.query("SELECT * FROM products", function(err, result) {
      displayProducts(err, result);
      promptCustomer();
    });
  }

//display all of the items available for sale. Include the ids, names, and prices of products for sale.
function displayProducts(err, result){
    if (err) throw err;
    result.forEach(function(r){
      console.log(`---------------`)
      console.log(`${r.item_id} | ${chalk.green(r.product_name)} | ${chalk.red(r.department_name)}, | 
      ${chalk.yellow(r.price)} | ${r.stock_quantity}`);
      console.log(`----------------`);
    })
  }
// The app should then prompt users with two messages.

//need a function to create the prompt for user input (promptCustomer) 
  function promptCustomer() {

    // The first should ask them the ID of the product they would like to buy.
    inquirer.prompt([
      {
        type: "input",
        name: "item_id",
        message: "Please enter the ID number of the item you would like to purchase.",
        validate: validateInput,
        filter: Number
      },
    //  * The second message should ask how many units of the product they would like to buy.
      {
        type: "input",
        name: "quantity",
        message: "How many would you like to purchase?",
        validate: validateInput,
        filter: Number
      }
    //Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer"s request.
    ]).then(function(input) {
      // variables to access each item and it"s quantity value
      var item = input.item_id;
      var quantity = input.quantity;
      // Query the database to confirm the item ID they picked exists and has enough quantity
      var query = connection.query(
        "SELECT * FROM products WHERE ?", 
          {item_id: item}, 
          function(err, data) {
            if (err) throw err;
      //if the user inputs an invalid id, the dataset will be empty and an error message will run
            if (data.length === 0) {
              console.log("ERROR: Invalid Item ID. Please select a valid Item ID.");
              displayProducts();
            } else {
              var productData = data[0];
      
      // Compare to see if the user-input quantity requested by the user is less than or equal the store"s stock
              if (quantity <= productData.stock_quantity) {
                console.log("Your requested product is in stock! Placing order now");
      
          // if it is, update the query string so we can then update the stock quantities
                var updateQueryStr = "UPDATE products SET stock_quantity = " + 
                                    (productData.stock_quantity - quantity) + 
                                    " WHERE item_id = " + item;
      
          // Update the stock quantities with the new updated query
                connection.query(updateQueryStr, function(err, data) {
                  if (err) throw err;
                  
          //Print out the successful order message and their total
                  console.log("Thank you for your order! Your total is $" + productData.price * quantity);
                  console.log("Enjoy your purchase. Come see us again soon!");
                  // End the database connection
                  connection.end();
                })
          //and if we do not have what the customer desires in stock we politely inform them 
              } else {
                console.log("Oh no! It seems there is not enough of that product in stock.");
                console.log("Please modify your order.")
              //call promptCustomer to start the process over
                promptCustomer();
              }
            }
          })
        })
      }
// a function to make sure that the user is supplying only positive integers for their inputs
function validateInput(value) {
  var integer = Number.isInteger(parseFloat(value));
  var sign = Math.sign(value);

  if (integer && (sign === 1)) {
    return true;
  } else {
    return "Please enter a positive, whole number.";
  }
}

