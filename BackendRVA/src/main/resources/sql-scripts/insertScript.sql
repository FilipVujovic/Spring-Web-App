INSERT INTO "nacionalnost"("id", "naziv", "skracenica") values (nextval('nacionalnost_seq'), 'Engleska', 'ENG');
INSERT INTO "nacionalnost"("id", "naziv", "skracenica") values (nextval('nacionalnost_seq'), 'Nemacka', 'GER');
INSERT INTO "nacionalnost"("id", "naziv", "skracenica") values (nextval('nacionalnost_seq'), 'Srpska', 'SRB');
INSERT INTO "nacionalnost"("id", "naziv", "skracenica") values (nextval('nacionalnost_seq'), 'Spanska', 'ESP');

INSERT INTO "liga"("id", "naziv", "oznaka") values (nextval('liga_seq'), 'Bundes Liga', 'DBL');
INSERT INTO "liga"("id", "naziv", "oznaka") values (nextval('liga_seq'), 'Premier League', 'EPL');
INSERT INTO "liga"("id", "naziv", "oznaka") values (nextval('liga_seq'), 'La Liga', 'ELL');
INSERT INTO "liga"("id", "naziv", "oznaka") values (nextval('liga_seq'), 'UEFA Champions League', 'UCL');


INSERT INTO "tim"("id", "naziv", "osnovan", "sediste", "liga") values (nextval('tim_seq'), 'Bayern Munchen', '02.07.1900', 'Munchen', 1);
INSERT INTO "tim"("id", "naziv", "osnovan", "sediste", "liga") values (nextval('tim_seq'), 'Borrusia Dortmund', '12.19.1907','Dortmund',1);
INSERT INTO "tim"("id", "naziv", "osnovan", "sediste", "liga") values (nextval('tim_seq'), 'Liverpool FC', '01.01.1892', 'Liverpool',4 );
INSERT INTO "tim"("id", "naziv", "osnovan", "sediste", "liga") values (nextval('tim_seq'), 'Chelsea FC', '03.10.1905','London', 4);


INSERT INTO "igrac"("id", "ime", "prezime", "broj_reg", "datum_rodjenja", "nacionalnost", "tim") values (nextval('igrac_seq'), 'Manuel', 'Neuer', '01', '03.27.1989',2, 1 );
INSERT INTO "igrac"("id", "ime", "prezime", "broj_reg", "datum_rodjenja", "nacionalnost", "tim") values (nextval('igrac_seq'), 'Joshua', 'Kimich', '32', '02.08.1995',2, 1 );
INSERT INTO "igrac"("id", "ime", "prezime", "broj_reg", "datum_rodjenja", "nacionalnost", "tim") values (nextval('igrac_seq'), 'Mason', 'Greenwood', '26', '08.01.2001',3, 3 );
INSERT INTO "igrac"("id", "ime", "prezime", "broj_reg", "datum_rodjenja", "nacionalnost", "tim") values (nextval('igrac_seq'), 'Harry', 'Maguire', '05', '03.05.1993',3, 3 );






