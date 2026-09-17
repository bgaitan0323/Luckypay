SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ============================================
-- Schema: luckypay
-- ============================================

CREATE SCHEMA IF NOT EXISTS `luckypay` DEFAULT CHARACTER SET utf8mb4 ;
USE `luckypay` ;

-- Usuarios

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `tipo_documento` ENUM('Cédula de ciudadanía','Cédula de extranjería') NOT NULL DEFAULT 'Cédula de ciudadanía',
  `documento` int (10) NOT NULL, 
  `email` VARCHAR(150) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `rol` VARCHAR(20) NOT NULL DEFAULT 'empleado',
  `fecha_registro` DATE NULL DEFAULT curdate(),
  `estado` VARCHAR(20) NULL DEFAULT 'activo',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insumos / Compras / Gastos fijos 

DROP TABLE IF EXISTS `proveedores`;
CREATE TABLE IF NOT EXISTS `proveedores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(150) NOT NULL,
  `telefono` VARCHAR(20) NULL DEFAULT NULL,
  `email` VARCHAR(150) NULL DEFAULT NULL,
  `direccion` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `insumos`;
CREATE TABLE IF NOT EXISTS `insumos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(150) NOT NULL,
  `unidad_medida` VARCHAR(20) NOT NULL,
  `stock_actual` DECIMAL(10,2) NULL DEFAULT '0.00',
  `stock_minimo` DECIMAL(10,2) NULL DEFAULT '0.00',
  `costo_unitario_promedio` DECIMAL(10,2) NULL DEFAULT '0.00',
  `estado` VARCHAR(20) NULL DEFAULT 'activo',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `compras_insumos`;
CREATE TABLE IF NOT EXISTS `compras_insumos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `proveedor_id` INT NULL DEFAULT NULL,
  `fecha_compra` DATE NULL DEFAULT curdate(),
  `total` DECIMAL(10,2) NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `proveedor_id` (`proveedor_id`),
  CONSTRAINT `compras_insumos_ibfk_1` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedores` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `detalle_compras`;
CREATE TABLE IF NOT EXISTS `detalle_compras` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `compra_id` INT NOT NULL,
  `insumo_id` INT NOT NULL,
  `cantidad` DECIMAL(10,2) NOT NULL,
  `costo_unitario` DECIMAL(10,2) NOT NULL,
  `subtotal` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `compra_id` (`compra_id`),
  KEY `insumo_id` (`insumo_id`),
  CONSTRAINT `detalle_compras_ibfk_1` FOREIGN KEY (`compra_id`) REFERENCES `compras_insumos` (`id`),
  CONSTRAINT `detalle_compras_ibfk_2` FOREIGN KEY (`insumo_id`) REFERENCES `insumos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `movimientos_stock`;
CREATE TABLE IF NOT EXISTS `movimientos_stock` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `insumo_id` INT NOT NULL,
  `tipo_movimiento` VARCHAR(20) NOT NULL,
  `origen` VARCHAR(20) NOT NULL,
  `referencia_id` INT NULL DEFAULT NULL,
  `cantidad` DECIMAL(10,2) NOT NULL,
  `fecha` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `insumo_id` (`insumo_id`),
  CONSTRAINT `movimientos_stock_ibfk_1` FOREIGN KEY (`insumo_id`) REFERENCES `insumos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `gastos_fijos_plantillas`;
CREATE TABLE IF NOT EXISTS `gastos_fijos_plantillas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(150) NOT NULL,
  `monto` DECIMAL(10,2) NOT NULL,
  `frecuencia` VARCHAR(20) NOT NULL,
  `dia_generacion` INT NULL DEFAULT NULL,
  `activo` TINYINT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `gastos_fijos`;
CREATE TABLE IF NOT EXISTS `gastos_fijos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `plantilla_id` INT NULL DEFAULT NULL,
  `nombre` VARCHAR(150) NOT NULL,
  `monto` DECIMAL(10,2) NOT NULL,
  `fecha_pago` DATE NULL DEFAULT curdate(),
  `estado` VARCHAR(20) NULL DEFAULT 'pagado',
  PRIMARY KEY (`id`),
  KEY `plantilla_id` (`plantilla_id`),
  CONSTRAINT `gastos_fijos_ibfk_1` FOREIGN KEY (`plantilla_id`) REFERENCES `gastos_fijos_plantillas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Productos / Producción / Ventas 

DROP TABLE IF EXISTS `productos`;
CREATE TABLE IF NOT EXISTS `productos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(150) NOT NULL,
  `precio_venta` DECIMAL(10,2) NOT NULL,
  `tipo_produccion` VARCHAR(20) NOT NULL DEFAULT 'stock',
  `stock_actual` DECIMAL(10,2) NULL DEFAULT '0.00',
  `estado` VARCHAR(20) NULL DEFAULT 'activo',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `receta_productos`;
CREATE TABLE IF NOT EXISTS `receta_productos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `producto_id` INT NOT NULL,
  `insumo_id` INT NOT NULL,
  `cantidad_requerida` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `producto_id` (`producto_id`, `insumo_id`),
  KEY `insumo_id` (`insumo_id`),
  CONSTRAINT `receta_productos_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`),
  CONSTRAINT `receta_productos_ibfk_2` FOREIGN KEY (`insumo_id`) REFERENCES `insumos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `producciones`;
CREATE TABLE IF NOT EXISTS `producciones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `producto_id` INT NOT NULL,
  `cantidad_producida` DECIMAL(10,2) NOT NULL,
  `costo_total` DECIMAL(10,2) NOT NULL,
  `fecha_produccion` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `producciones_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `ventas`;
CREATE TABLE IF NOT EXISTS `ventas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  `cliente` VARCHAR(150) NULL DEFAULT NULL,
  `fecha_venta` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `total` DECIMAL(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `detalle_ventas`;
CREATE TABLE IF NOT EXISTS `detalle_ventas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `venta_id` INT NOT NULL,
  `producto_id` INT NOT NULL,
  `cantidad` DECIMAL(10,2) NOT NULL,
  `precio_unitario` DECIMAL(10,2) NOT NULL,
  `costo_produccion_unitario` DECIMAL(10,2) NOT NULL,
  `subtotal` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `venta_id` (`venta_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `detalle_ventas_ibfk_1` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`),
  CONSTRAINT `detalle_ventas_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Configuración / Caja / Recordatorios 

DROP TABLE IF EXISTS `configuracion`;
CREATE TABLE IF NOT EXISTS `configuracion` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `clave` VARCHAR(100) NOT NULL,
  `valor` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `clave` (`clave`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `movimientos_caja`;
CREATE TABLE IF NOT EXISTS `movimientos_caja` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(20) NOT NULL,
  `origen` VARCHAR(30) NOT NULL,
  `referencia_id` INT NULL DEFAULT NULL,
  `monto` DECIMAL(10,2) NOT NULL,
  `fecha` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `recordatorios`;
CREATE TABLE IF NOT EXISTS `recordatorios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  `titulo` VARCHAR(150) NOT NULL,
  `descripcion` VARCHAR(500) NULL DEFAULT NULL,
  `fecha_recordatorio` DATE NOT NULL,
  `estado` VARCHAR(20) NULL DEFAULT 'pendiente',
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `recordatorios_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================
-- Seguridad de contraseñas con SHA2
-- ============================================

DELIMITER $$

-- Registrar usuario: la contraseña se hashea antes de guardarse
DROP PROCEDURE IF EXISTS sp_registrar_usuario $$
CREATE PROCEDURE sp_registrar_usuario (
  IN p_nombre VARCHAR(100),
  IN p_tipo_documento ENUM('Cédula de ciudadanía','Cédula de extranjería'),
  IN p_documento INT,
  IN p_email VARCHAR(150),
  IN p_password VARCHAR(255),
  IN p_rol VARCHAR(20)
)
BEGIN
  INSERT INTO usuarios (nombre, tipo_documento, documento, email, password_hash, rol)
  VALUES (
    p_nombre,
    p_tipo_documento,
    p_documento,
    p_email,
    SHA2(p_password, 256),   -- <<< AQUÍ SE GUARDA LA CONTRASEÑA HASHEADA
    p_rol
  );
END $$

-- Verificar login: compara la contraseña hasheada
DROP PROCEDURE IF EXISTS sp_verificar_login $$
CREATE PROCEDURE sp_verificar_login (
  IN p_email VARCHAR(150),
  IN p_password VARCHAR(255)
)
BEGIN
  SELECT id, nombre, email, rol, estado
  FROM usuarios
  WHERE email = p_email
    AND password_hash = SHA2(p_password, 256)   -- <<< AQUÍ SE VERIFICA LA CONTRASEÑA
  LIMIT 1;
END $$

DELIMITER ;

SET FOREIGN_KEY_CHECKS = 1;
