DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER (11) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price INTEGER (10),
    stock_quantity INTEGER (10),
    PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "macbook", "electronics", 500.00, 25),
			   (2, "notebook", "office_supplies", 5.00, 100),
               (3, "Converse Lowtops", "shoes", 50.00, 42),
               (4, "dog harness","pet_supplies", 12.00, 15),
               (5, "skillet", "kitchenware", 20.49, 30),
               (6, "oil paints", "art_supplies", 22.75, 40),
               (7, "coldbrew coffee", "beverages", 1.50, 300),
               (8, "Lego Pirate Ship", "toys", 80.88, 150),
               (9, "Heavy Punching Bag", "fitness_equipment", 130.25, 75),
               (10, "Electric Toothbrush", "personal_care", 65.00, 225);

