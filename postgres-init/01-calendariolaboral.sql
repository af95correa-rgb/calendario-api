-- Se ejecuta automáticamente la primera vez que arranca dockerbdcalendario
-- (la BD calendariolaboral ya la crea POSTGRES_DB)

CREATE TABLE Tipo(
  Id SERIAL PRIMARY KEY,
  Tipo VARCHAR(100) NOT NULL
);

CREATE UNIQUE INDEX ixTipo ON Tipo(Tipo);

CREATE TABLE Calendario(
  Id SERIAL PRIMARY KEY,
  Fecha DATE NOT NULL,
  IdTipo INT NOT NULL,
  CONSTRAINT fkCalendario_Tipo FOREIGN KEY (IdTipo) REFERENCES Tipo(Id),
  Descripcion VARCHAR(100) NULL
);

CREATE UNIQUE INDEX ixCalendario ON Calendario(Fecha);

-- Mismos valores del Examen 1 (incluyen el espacio final tal cual se insertó)
INSERT INTO Tipo(Id, Tipo) VALUES(1, 'Día laboral');
INSERT INTO Tipo(Id, Tipo) VALUES(2, 'Fin de Semana ');
INSERT INTO Tipo(Id, Tipo) VALUES(3, 'Día festivo ');

-- Como se insertó Id manualmente, se alinea la secuencia
SELECT setval(pg_get_serial_sequence('tipo','id'), 3);
