DROP TABLE IF EXISTS igrac CASCADE;
DROP TABLE IF EXISTS tim CASCADE;
DROP TABLE IF EXISTS nacionalnost CASCADE;
DROP TABLE IF EXISTS liga CASCADE;

DROP SEQUENCE IF EXISTS igrac_seq;
DROP SEQUENCE IF EXISTS tim_seq;
DROP SEQUENCE IF EXISTS nacionalnost_seq;
DROP SEQUENCE IF EXISTS liga_seq;

CREATE TABLE igrac(
	id integer not null,
    ime varchar(50) not null,
    prezime varchar(50) not null,
	broj_reg varchar(50) not null,
	datum_rodjenja varchar(50) not null,
	nacionalnost integer not null,
	tim integer not null
);

CREATE TABLE nacionalnost(
	id integer not null,
    naziv varchar(100) not null,
    skracenica varchar(50) not null
);

CREATE TABLE liga(
    id integer not null,
    naziv varchar(100) not null,
    oznaka varchar(50) not null
);

CREATE TABLE tim(
	id integer not null,
    naziv varchar(100) not null,
    osnovan date not null,
    sediste varchar(100) not null,
    liga integer not null
);

ALTER TABLE igrac ADD CONSTRAINT
PK_Igrac PRIMARY KEY(id);
ALTER TABLE nacionalnost ADD CONSTRAINT
PK_Nacionalnost PRIMARY KEY(id);
ALTER TABLE liga ADD CONSTRAINT
PK_Liga PRIMARY KEY(id);
ALTER TABLE tim ADD CONSTRAINT
PK_Tim PRIMARY KEY(id);

ALTER TABLE igrac ADD CONSTRAINT
FK_Igrac_Nacionalnost FOREIGN KEY(nacionalnost) REFERENCES nacionalnost(id);
ALTER TABLE igrac ADD CONSTRAINT
FK_Igrac_Tim FOREIGN KEY(tim) REFERENCES tim(id);
ALTER TABLE tim ADD CONSTRAINT
FK_Tim_Liga FOREIGN KEY(liga) REFERENCES liga(id);

CREATE INDEX IDXFK_Igrac_Nacionalnost
ON igrac(nacionalnost);
CREATE INDEX IDXFK_Igrac_Tim
ON igrac(tim);
CREATE INDEX IDXFK_Tim_Liga
ON tim(liga);

CREATE SEQUENCE igrac_seq
INCREMENT 1;
CREATE SEQUENCE nacionalnost_seq
INCREMENT 1;
CREATE SEQUENCE liga_seq
INCREMENT 1;
CREATE SEQUENCE tim_seq
INCREMENT 1;