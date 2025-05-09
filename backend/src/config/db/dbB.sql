INSERT INTO public.productos(
    cafe_id, nombre, descripcion, sabor, img, categoria_id, pais, user_id, precio)
VALUES
-- 15 CAFÉS
(1, 'Espresso', 'Shot intenso de café puro', 'Amargo', 
'https://unsplash.com/photos/espresso-on-table-FbRGK2rZs8g', 1, 'Italia', 1, 2.50),
(2, 'Doppio Espresso', 'Doble shot para mayor intensidad', 'Amargo', 
'https://unsplash.com/photos/an-espresso-machine-making-a-cup-of-coffee-gAupM8cimJg', 1, 'Italia', 1, 3.50),
(3, 'Americano', 'Espresso alargado con agua caliente', 'Suave', 
'https://unsplash.com/photos/coffee-latte-LzzjUDSwYdM', 1, 'Estados Unidos', 1, 3.00),
(4, 'Cappuccino', 'Espresso con leche espumosa en proporción 1:1', 'Cremoso', 
'https://unsplash.com/photos/coffee-latte-0SwrXvH3rL0', 1, 'Italia', 1, 3.75),
(5, 'Latte', 'Leche caliente con una fina capa de espuma', 'Suave', 
'https://unsplash.com/photos/coffee-latte-LzzjUDSwYdM', 1, 'Italia', 1, 4.00),
(6, 'Flat White', 'Leche microespumada sobre espresso', 'Cremoso', 
'https://unsplash.com/photos/vzNFLMC6ghg', 1, 'Australia', 1, 4.25),
(7, 'Mocha', 'Mezcla de espresso, chocolate y leche', 'Dulce', 
'https://unsplash.com/s/photos/mokka', 1, 'Yemen', 1, 4.75),
(8, 'Macchiato', 'Espresso “manchado” con un toque de leche', 'Equilibrado', 
'https://unsplash.com/s/photos/latte-macchiato', 1, 'Italia', 1, 3.80),
(9, 'Cortado', 'Mitad espresso, mitad leche caliente', 'Suave-amargo', 
'https://unsplash.com/s/photos/cortado', 1, 'España', 1, 3.60),
(10, 'Ristretto', 'Shot corto y concentrado de espresso', 'Intenso', 
'https://unsplash.com/s/photos/ristretto', 1, 'Italia', 1, 2.75),
(11, 'Long Black', 'Agua caliente sobre un doble espresso', 'Aromático', 
'https://unsplash.com/s/photos/long-black', 1, 'Australia', 1, 3.10),
(12, 'Irish Coffee', 'Café con whisky, azúcar y nata montada', 'Dulce-fuerte', 
'https://unsplash.com/s/photos/irish-coffee', 1, 'Irlanda', 1, 6.00),
(13, 'Affogato', 'Espresso servido sobre helado de vainilla', 'Dulce-amargo', 
'https://unsplash.com/s/photos/affogato', 1, 'Italia', 1, 5.50),
(14, 'Frappé', 'Café batido frío con hielo y espuma', 'Refrescante', 
'https://unsplash.com/s/photos/coffee-frappe', 1, 'Grecia', 1, 4.50),
(15, 'Cold Brew', 'Café infusionado en frío por 12 horas', 'Suave', 
'https://unsplash.com/s/photos/cold-brew', 1, 'Estados Unidos', 1, 4.80),

-- 10 TORTAS
(16, 'Torta de Chocolate', 'Bizcocho esponjoso con ganache de cacao', 'Chocolate', 
'https://unsplash.com/s/photos/torta-de-chocolate', 2, 'Francia', 1, 5.00),
(17, 'Torta de Zanahoria', 'Con nueces y crema de queso', 'Especiada', 
'https://unsplash.com/s/photos/carrot-cake', 2, 'Reino Unido', 1, 4.50),
(18, 'Torta de Queso', 'Clásica cheesecake sobre galleta', 'Dulce', 
'https://unsplash.com/s/photos/cheesecake', 2, 'Estados Unidos', 1, 5.25),
(19, 'Torta Red Velvet', 'Bizcocho rojo con betún de queso crema', 'Suave', 
'https://unsplash.com/s/photos/red-velvet-cake', 2, 'Estados Unidos', 1, 5.75),
(20, 'Torta de Manzana', 'Con láminas de manzana y canela', 'Frutal', 
'https://unsplash.com/s/photos/apple-cake', 2, 'Alemania', 1, 4.25),
(21, 'Torta Selva Negra', 'Chocolate, cerezas y nata montada', 'Chocolate-cereza', 
'https://unsplash.com/s/photos/black-forest-cake', 2, 'Alemania', 1, 6.00),
(22, 'Torta Tres Leches', 'Bizcocho bañado en tres tipos de leche', 'Lácteo', 
'https://unsplash.com/s/photos/three-milk-cake', 2, 'México', 1, 5.50),
(23, 'Torta de Limón', 'Rellena de crema de limón y merengue', 'Ácido', 
'https://unsplash.com/s/photos/lemon-cake', 2, 'Estados Unidos', 1, 4.75),
(24, 'Torta de Fresa', 'Con fresas frescas y crema chantilly', 'Frutal', 
'https://unsplash.com/s/photos/strawberry-cake', 2, 'Francia', 1, 5.25),
(25, 'Torta de Coco', 'Bizcocho con ralladura de coco y crema', 'Coco', 
'https://unsplash.com/s/photos/coconut-cake', 2, 'Brasil', 1, 5.00),

-- 7 DESAYUNOS
(26, 'Desayuno Continental', 'Pan, mantequilla, mermelada y café', 'Variado', 
'https://unsplash.com/s/photos/breakfast', 3, 'Internacional', 1, 7.00),
(27, 'Desayuno Americano', 'Huevos, bacon, tostadas y café', 'Salado', 
'https://unsplash.com/s/photos/breakfast-food', 3, 'Estados Unidos', 1, 8.50),
(28, 'Tostadas Francesas', 'Pan bañado en huevo con miel y fruta', 'Dulce', 
'https://unsplash.com/s/photos/french-toast', 3, 'Francia', 1, 7.25),
(29, 'Omelette', 'Huevos batidos con queso y verduras', 'Salado', 
'https://unsplash.com/s/photos/omelette', 3, 'Francia', 1, 6.75),
(30, 'Panqueques', 'Torre de panqueques con jarabe de arce', 'Dulce', 
'https://unsplash.com/s/photos/pancakes', 3, 'Estados Unidos', 1, 7.50),
(31, 'Bagel con Salmón', 'Bagel relleno de queso crema y salmón ahumado', 'Salado', 
'https://unsplash.com/s/photos/bagel', 3, 'Estados Unidos', 1, 8.00),
(32, 'Bowl de Açaí', 'Purée de açaí con frutas y granola', 'Frutal', 
'https://unsplash.com/s/photos/acai-bowl', 3, 'Brasil', 1, 9.00),

-- 5 ESPECIALES
(33, 'Nitro Cold Brew', 'Cold brew con infusión de nitrógeno', 'Suave-cremoso', 
'https://unsplash.com/photos/starbucks-reserve-roastery-sign-and-logo-QqawUdT35jw', 4, 'Estados Unidos', 1, 5.50),
(34, 'Matcha Latte', 'Té matcha con leche espumosa', 'Herbal', 
'https://unsplash.com/s/photos/matcha-latte', 4, 'Japón', 1, 4.80),
(35, 'Golden Latte', 'Leche con cúrcuma, jengibre y miel', 'Especiado', 
'https://unsplash.com/s/photos/golden-latte', 4, 'India', 1, 4.95),
(36, 'Charcoal Latte', 'Leche con carbón activado y miel', 'Suave', 
'https://unsplash.com/s/photos/charcoal-latte', 4, 'Internacional', 1, 5.20),
(37, 'Beetroot Latte', 'Leche con polvo de remolacha y especias', 'Terroso', 
'https://unsplash.com/s/photos/beetroot-latte', 4, 'Internacional', 1, 5.30),



INSERT INTO public.productos(
    cafe_id, nombre, descripcion, sabor, img, categoria_id, pais, user_id, precio)
VALUES
-- 5 DESAYUNOS ADICIONALES
(38, 'Desayuno Vegano', 'Tofu revuelto con espinacas, aguacate y pan integral', 'Salado-fresco', 
 'https://images.unsplash.com/photo-1556911220-e15b29be8c82', 3, 'Internacional', 1, 8.50),
(39, 'Chilaquiles Verdes', 'Totopos bañados en salsa verde, queso, crema y huevo estrellado', 'Picante', 
 'https://images.unsplash.com/photo-1606755962775-3b6a76f6f1cd', 3, 'México', 1, 9.00),
(40, 'Huevos Rancheros', 'Tortilla con frijoles, huevos estrellados y salsa ranchera', 'Salado-picante', 
 'https://images.unsplash.com/photo-1617196032278-a8700f2a5dc1', 3, 'México', 1, 9.25),
(41, 'Pan con Aguacate', 'Rebanadas de aguacate sobre pan artesanal, semillas y tomate', 'Fresco', 
 'https://images.unsplash.com/photo-1516684669134-de6bbf4cb1e1', 3, 'España', 1, 7.75),
(42, 'Smoothie Bowl', 'Yogur griego, frutas frescas y granola casera', 'Dulce-frutal', 
 'https://images.unsplash.com/photo-1505253716365-01e2763a6b4e', 3, 'Brasil', 1, 8.25),

-- 3 ESPECIALES ADICIONALES
(43, 'Lavender Latte', 'Espresso con leche y sirope de lavanda', 'Floral', 
 'https://images.unsplash.com/photo-1511920170033-f8396924c348', 4, 'Francia', 1, 5.60),
(44, 'Pumpkin Spice Latte', 'Espresso con especias de calabaza y leche espumosa', 'Especiado', 
 'https://images.unsplash.com/photo-1495450135198-52c93f07a5a6', 4, 'Estados Unidos', 1, 5.90),
(45, 'Turmeric Chai Latte', 'Mezcla de chai y cúrcuma con leche vegetal', 'Especiado', 
 'https://images.unsplash.com/photo-1594007650240-10ea26e7b2fb', 4, 'India', 1, 5.70);


INSERT INTO public.categorias (categoria_id, nombre) VALUES
    (1, 'Café'),
    (2, 'Torta'),
    (3, 'Desayuno'),
    (4, 'Especial');








-----------------


--! JOIN PARA LOS FILTROS Y QUIERY DE EXPRESS
SELECT 
	p.nombre,
	p.descripcion,
	p.sabor,
	p.img,
	c.nombre ,
	p.pais,
	p.precio
FROM 
	productos p
INNER JOIN categorias c ON p.categoria_id =  c.categoria_id
WHERE   c.nombre = 'Torta'


SELECT 
	p.nombre,
	p.descripcion,
	p.sabor,
	p.img,
	c.nombre ,
	p.pais,
	p.precio
FROM 
	productos p
INNER JOIN categorias c ON p.categoria_id =  c.categoria_id
WHERE   c.nombre = 'Café'


SELECT 
	p.nombre,
	p.descripcion,
	p.sabor,
	p.img,
	c.nombre ,
	p.pais,
	p.precio
FROM 
	productos p
INNER JOIN categorias c ON p.categoria_id =  c.categoria_id
WHERE   c.nombre = 'Especial'



SELECT 
	p.nombre,
	p.descripcion,
	p.sabor,
	p.img,
	c.nombre ,
	p.pais,
	p.precio
FROM 
	productos p
INNER JOIN categorias c ON p.categoria_id =  c.categoria_id
WHERE   c.nombre = 'Desayuno'



CREATE OR REPLACE FUNCTION sp_crear_reserva(
  i_user_id INT,
  i_plan_id INT,
  i_fecha_inicio DATE,
  i_hora_cita TIME,
  i_fecha_fin DATE
) RETURNS TEXT AS $$
DECLARE
  yaExiste BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM reservas_tb
    WHERE fecha_inicio = i_fecha_inicio AND hora_cita = i_hora_cita
  ) INTO yaExiste;

  IF yaExiste THEN
    RETURN 'ya hay una reserva en esa fecha y hora';
  ELSE
    INSERT INTO reservas_tb (user_id, plan_id, fecha_inicio, hora_cita, fecha_fin, estado)
    VALUES (i_user_id, i_plan_id, i_fecha_inicio, i_hora_cita, i_fecha_fin, 'pendiente');
    RETURN 'se hizo la reserva con éxito';
  END IF;
END;
$$ LANGUAGE plpgsql;






