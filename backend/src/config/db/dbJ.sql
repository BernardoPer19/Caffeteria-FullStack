CREATE TABLE users_tb(
	user_id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL,
	email VARCHAR(50) UNIQUE NOT NULL,
	contraseña VARCHAR(100) NOT NULL,
	fechaCreacion DATE NOT NULL 
	
);

CREATE TABLE ordenesUser_tb(
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
	hora_cita TIME NOT NULL,
	fecha_fin DATE NOT NULL ,
	user_id INT NOT NULL ,
	estado ENUM('pendiente' , 'aceptada','cancelada') NOT NULL DEFAULT('pendiente')
);

CREATE TABLE planes_tb(
	plan_id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCAHR(50) NOT NULL,
	descripcion VARCHAR(250) NOT NULL 
);




// OBTENER TODAS LAS RESERVAS DEL USUARIO
SELECT u.nombre , p.descripcion, r.fecha_inicio,r.hora_cita,r.fecha_fin , r.estado FROM reservas_tb r
INNER JOIN users_tb u ON r.user_id = u.user_id
INNER JOIN planes_tb p ON r.plan_id = p.plan_id 
WHERE u.user_id = ?;



// CREAR Y VALIDAR FECHAS PARA LA RESERVA 
DELIMITER //
	CREATE PROCEDURE sp_crear_reserva(
	IN i_user_id INT,
	IN i_plan_id INT,
	IN i_fecha_inicio VARCHAR(30),
	IN i_hora_cita TIME,
	IN i_fecha_fin VARCHAR(30),
	OUT o_salida VARCHAR(50)
	)
		BEGIN 
			IF EXISTS(
				SELECT 1 FROM reservas_tb WHERE fecha_inicio = i_fecha_inicio AND hora_cita = i_hora_cita
			)THEN
				SET o_salida = "ya hay una reserva en esa fecha y hora ";
			 ELSE 
			 	INSERT INTO reservas_tb(user_id, plan_id , fecha_inicio ,hora_cita, fecha_fin, estado)
			 	VALUES(i_user_id,i_plan_id,i_fecha_inicio,i_hora_cita,i_fecha_fin,'pendiente');
			SET o_salida = "se hizo la reserva con exito";
		 END IF;
 	END //
DELIMITER ;






// datos para insertar en planes
INSERT INTO planes_tb (nombre, descripcion) VALUES
('Café Básico', 'Incluye un café americano y una galleta diaria.'),
('Café Ilimitado', 'Café americano ilimitado durante el mes.'),
('Café + Snack', 'Un café y un snack (pan o galleta) diario.'),
('Plan Doble Espresso', 'Dos cafés espresso diarios durante 30 días.'),
('Café Helado Premium', 'Incluye dos cafés helados personalizados por semana.'),
('Plan Ejecutivo', 'Un café premium y un sándwich cada mañana de lunes a viernes.'),
('Plan Fin de Semana', 'Dos cafés grandes solo sábado y domingo.'),
('Plan Dulce Mañana', 'Un café mediano y una pieza de pastelería cada día.'),
('Plan Despertar', 'Café americano y jugo natural cada mañana.'),
('Plan Amigo', 'Dos cafés medianos por día para compartir.');