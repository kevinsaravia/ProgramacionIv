-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-04-2020 a las 22:05:09
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_sistema_peliculas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alquiler`
--

CREATE TABLE `alquiler` (
  `idAlquiler` int(10) NOT NULL,
  `idCliente` int(10) NOT NULL,
  `idPelicula` int(10) NOT NULL,
  `fechaPrestamo` date NOT NULL,
  `fechaDevolucion` date NOT NULL,
  `valor` char(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `alquiler`
--

INSERT INTO `alquiler` (`idAlquiler`, `idCliente`, `idPelicula`, `fechaPrestamo`, `fechaDevolucion`, `valor`) VALUES
(1, 1, 1, '2020-04-01', '2020-04-30', '10'),
(2, 2, 2, '2020-04-02', '2020-04-30', '15'),
(3, 3, 3, '2020-04-03', '2020-04-30', '10'),
(4, 4, 4, '2020-04-06', '2020-05-05', '25'),
(5, 5, 5, '2020-04-15', '2020-05-30', '35'),
(6, 6, 6, '2020-05-04', '2020-07-08', '65');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `idCliente` int(10) NOT NULL,
  `nombre` char(100) NOT NULL,
  `direccion` char(65) NOT NULL,
  `telefono` char(9) NOT NULL,
  `dui` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`idCliente`, `nombre`, `direccion`, `telefono`, `dui`) VALUES
(1, 'Angeles', 'Sata Ana', '0909-0909', '04587898-8'),
(2, 'Gorge', 'San pedro', '9900-0019', '04587898-7'),
(3, 'Juan', 'Sata Ana', '0909-0902', '04587898-6'),
(4, 'Carlos', 'San miguel', '9900-0093', '04587898-5'),
(5, 'Jesus', 'Sata Ana', '0909-0904', '04587898-4'),
(6, 'Maria', 'usulutan', '9900-0095', '04587898-3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peliculas`
--

CREATE TABLE `peliculas` (
  `idPelicula` int(10) NOT NULL,
  `descripcion` char(200) NOT NULL,
  `sinopsis` char(100) NOT NULL,
  `genero` char(45) NOT NULL,
  `duracion` char(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `peliculas`
--

INSERT INTO `peliculas` (`idPelicula`, `descripcion`, `sinopsis`, `genero`, `duracion`) VALUES
(1, 'tras un macabro plan para hacesinar al actor este hace lo imposible por no morir', 'el actor trata de escapar de la muerte', 'Escalofriante', '2 horas'),
(2, 'despues de haber entrado al ocultismo, satan posee la vida del curioso', 'hay que expulsar a satan', 'terror', '3 horas'),
(3, 'delincuentes matan a sangre fria a su hermano y este se venga', 'se venga de la muerte de su hermano', 'accion', '2 horas'),
(4, 'tras ser ascendido sus compañeros quieren hacerle daño', 'jefe de policia', 'policial', '1 hora'),
(5, 'el pajaro emprende su vuelo explorando el mundo', 'bonita para compartir en el hogar', 'familiares', '2h:30m'),
(6, 'descubre el mundo de los seres vivos', 'exploran la naturaleza salvaje de africa', 'documentales', '1 hora');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alquiler`
--
ALTER TABLE `alquiler`
  ADD PRIMARY KEY (`idAlquiler`),
  ADD KEY `clientes` (`idCliente`),
  ADD KEY `peliculas` (`idPelicula`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`idCliente`);

--
-- Indices de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  ADD PRIMARY KEY (`idPelicula`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alquiler`
--
ALTER TABLE `alquiler`
  MODIFY `idAlquiler` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `idCliente` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  MODIFY `idPelicula` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alquiler`
--
ALTER TABLE `alquiler`
  ADD CONSTRAINT `clientes` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`idCliente`),
  ADD CONSTRAINT `peliculas` FOREIGN KEY (`idPelicula`) REFERENCES `peliculas` (`idPelicula`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
