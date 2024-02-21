# Générateur de facture et devis en PDF

# Installation

## Avec Docker Compose

Lancer Docker Desktop si besoin

```bash
git clone https://github.com/LinelinLove/hetic-ts-crud
make run-dev
```

```bash
mkdir mysql-data
```

Sur le terminal après que le conteneur a été généré

```bash
docker exec -it invoice_db mysql -u root -p
```

Mot de passe : `root`

```sql
CREATE DATABASE hetic;

USE hetic;

CREATE TABLE invoice (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    firstname VARCHAR(150) NOT NULL,
    lastname VARCHAR(150) NOT NULL,
    address VARCHAR(150) NOT NULL,
    country VARCHAR(150) NOT NULL,
    town VARCHAR(150) NOT NULL,
    postal_code INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    price INT NOT NULL,
    quantity INT NOT NULL,
    tva INT NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

Consultez en local la version de dévelopement sur le port :5173

Si besoin
Renommez `env.sample` en `.env`
Changer le DB_HOST par l'adresse ip du conteneur de invoice_db et relancer la commande :

```bash
make run-dev
```

## Sans Docker Compose

Necessite Docker Desktop pour la base de données

```bash
git clone https://github.com/LinelinLove/hetic-ts-crud
```

Installer le conteneur MySQL

```bash
docker run --name hetic-project --env MYSQL_ROOT_PASSWORD=root -d -p 3306:3306 mysql:latest
docker exec -it invoice_db mysql -u root -p
```

Mot de passe : `root`

```sql
CREATE DATABASE hetic;

USE hetic;

CREATE TABLE invoice (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    firstname VARCHAR(150) NOT NULL,
    lastname VARCHAR(150) NOT NULL,
    address VARCHAR(150) NOT NULL,
    country VARCHAR(150) NOT NULL,
    town VARCHAR(150) NOT NULL,
    postal_code INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    price INT NOT NULL,
    quantity INT NOT NULL,
    tva INT NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

Pour le frontend
Renommez `env.sample` en `.env`

```bash
cd ./frontend/
npm install
npm run dev
```

Pour le backend

Renommez `env.sample` en `.env`
Changer le DB_HOST par localhost

```bash
cd ./backend/
npm install
npm run server
```

# Langages et outils

- Express Nodejs
- Typescript
- Vite ReactJS
- PdfKit
- MySQL
- Docker

# API REST

## GET

### /invoices

Pour récupérer toutes les factures

### /invoice/download/id

Pour télécharger le PDF

### /invoice/:id

Pour récupérer la facture selon l'ID

## POST

### /invoices

Pour créer les données de la facture

## UPDATE

### /invoice/:id

Pour modifier la facture

## DELETE

### /invoice/:id

Pour supprimer une facture selon l'ID
