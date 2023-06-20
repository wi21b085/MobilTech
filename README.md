# MobilTech – Der #1 Smartphone-Onlineshop

## Setup

- GitHub-Repo herunterladen und im htdocs-Ordner hinterlegen - [Link zum Repo](https://github.com/wi21b085/MobilTech)
- Datenbank _mobiltechdb_ (`utf8_general_ci`) in phpmyadmin anlegen, dann SQL-Datei "/backend/config/db/mobiltechdb.sql" in Datenbank importieren

- Benutzerkonto für Datenbank hinzufügen (mit globalen Rechten):
  - Benutzername: mobiltechadmin
  - Passwort: mobiltechadmin


## Login-Daten zum Testen

  | Username | E-Mail                     | Passwort |
  | -------- | -------------------------- | -------- |
  | admin    | admin@admin.at             | 1        |
  | user     | user@mail.com              | 1        |
  | wi21b025 | wi21b025@technikum-wien.at | 1        |
  | wi21b085 | wi21b085@technikum-wien.at | 1        |
  | wi21b089 | wi21b089@technikum-wien.at | 1        |

- Zum einfacheren Einloggen wurden leichte Passwörter bei diesen Konten eingestellt.
- Beim Erstellen neuer Konten und Ändern der Passwörter gelten jedoch strengere Passwort-Richtlinien:
  - mind. 8 Zeichen, 1 Großbuchstabe, 1 Kleinbuchstabe, 1 Ziffer, 1 Sonderzeichen
- Einloggen ist mit Username oder E-Mail möglich

## Besonderheiten

- Startseite hat ein Carousel, das eine Auswahl der Produkte interaktiv darstellt.
- Auf der Startseite wird außerdem von jeder vertretenen Firma ein Beispielprodukt angezeigt.
- In der Mitte der Startseite gibt es ein dynamisches Feld, wo IHRE Werbung stehen könnte!
- Die Suchfunktion funktioniert auf jeder Seite und dadurch auch das Hinzufügen in den Warenkorb.

## Projektstruktur

- /backend - Backend-Komponenten
  - /config - Zugriffkomponenten
    - /db - Datenbank-Datei & -Schema
  - /logic - Funktionslogik
  - /models - Klassenmodelle
  - /products - Produktbilder
- /frontend - Frontend-Komponenten
  - /js - Skripte
  - /res
    - /css - Styling
    - /img - Grafiken ...
      - /bg - ... für Hintergründe
      - /footer ... für Footer
  - /sites - HTML-Seiten

© 2023 MobilTech GmbH