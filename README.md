Benutzerkonto für DB anlegen:
user = mobiltechadmin
pw = mobiltechadmin

Datenbank mobiltechdb anlegen.

Adminkonto:
Username: admin
Passwort: admin
E-Mail: admin@admin.at

Userkonto:
Username: user
Passwort: 1
E-Mail: user@mail.com



<!-- 
 -- Insert new order into orders table
INSERT INTO `orders` (`o_datum`, `endpreis`, `u_id`, `anzahl`) VALUES (CURRENT_TIMESTAMP(), 100.00, 1, 5);

-- Retrieve the generated order ID
SET @order_id = LAST_INSERT_ID();

-- Insert order items into verlauf table
INSERT INTO `verlauf` (`order_id`, `produkt_id`, `menge`, `preis`)
VALUES
    (@order_id, 2, 3, 50),  -- Product 1
    (@order_id, 3, 2, 40),  -- Product 2
    (@order_id, 4, 1, 30);  -- Product 3 
-->
