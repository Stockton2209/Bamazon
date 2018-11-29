
const mysql = require("mysql");
const inquirer = require("inquirer");
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
    });
  }

//display all of the items available for sale. Include the ids, names, and prices of products for sale.
function displayProducts(err, result){
    result.forEach(function(r){
      console.log(`---------------`)
      console.log(`${r.id} | ${chalk.green(r.product_name)} | ${chalk.red(r.department_name)}, | ${chalk.yellow(r.price)} 
      | ${r.stock_quantity}`);
      console.log(`----------------`);
    })
  }
// The app should then prompt users with two messages.

//  * The first should ask them the ID of the product they would like to buy.
//  * The second message should ask how many units of the product they would like to buy.

// make a function to make sure that the user is supplying only positive integers for their inputs
  function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
      return true;
    } else {
      return 'Please enter a positive, whole number.';
    }
  }

