
const mysql = require("mysql");
const chalk = require("chalk");

//create a connection
const connection = mysql.createConnection({
  host: "127.0.0.1",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "whatever your mysql password is",
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
      console.log(`${r.id} | ${chalk.green(r.product_name)} | ${chalk.red(r.department_name)}, | ${r.price} 
      | ${r.stock_quantity}`);
      console.log(`----------------`);
    })
  }