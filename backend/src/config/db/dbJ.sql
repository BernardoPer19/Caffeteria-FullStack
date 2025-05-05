CREATE TABLE users_tb(
	user_id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL,
	email VARCHAR(50) UNIQUE NOT NULL,
	contraseña VARCHAR(100) NOT NULL,
	fecha_creacion DATE NOT NULL 
	
);

CREATE TABLE ordenes_tb(
	orden_id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
	total DECIMAL(2,1) NOT NULL,
	estado ENUM('pendiente' , 'pagado', 'enviado')NOT NULL DEFAULT('pendiente'),
	fecha_creacion DATE NOT NULL
);

CREATE TABLE reservas_tb (
	reserva_id INT AUTO_INCREMENT PRIMARY KEY,
	plan_id INT NOT NULL,
	fecha_inicio DATE NOT NULL ,
	fecha_fin DATE NOT NULL ,
	user_id INT NOT NULL ,
	estado ENUM('pendiente' , 'aceptada','cancelada') NOT NULL DEFAULT('pendiente')
);

CREATE TABLE planes_tb(
	plan_id INT AUTO_INCREMENT PRIMARY KEY,
	descricion VARCHAR(250) NOT NULL 
);




// OBTENER TODAS LAS RESERVAS DEL USUARIO
SELECT u.nombre , p.descripcion, r.fecha_inicio,r.fecha_fin , r.estado FROM reservas_tb r
INNER JOIN users_tb u ON r.user_id = u.user_id
INNER JOIN planes_tb p ON r.plan_id = p.plan_id 
WHERE u.user_id = ?;



// CREAR Y VALIDAR FECHAS PARA LA RESERVA 
DELIMITER //
	CREATE PROCEDURE sp_crear_reserva(
	IN i_user_id INT,
	IN i_plan_id INT,
	IN i_fecha_inicio VARCHAR(30),
	IN i_fecha_fin VARCHAR(30),
	OUT o_salida VARCHAR(50)
	);
		BEGIN 
			IF EXISTS(
				SELECT 1 FROM reservas_tb WHERE fecha_inicio = i_fecha_inicio AND fecha_fin = i_fecha_fin
			)THEN
				SET o_salida = "ya hay una reserva en essa fecha";
			 ELSE 
			 	INSERT INTO reservas_tb(user_id, plan_id , fecha_inicio , fecha_fin, estado)
			 	VALUES(i_user_id,i_plan_id,i_fecha_inicio,i_fecha_fin,'pendiente');
			SET o_salida = "se hizo la reserva con exito";
		 END IF;
 	END //
DELIMITER ;