## Installations

```
Installer NodeJs
Installer NPM (globally)
Installer nodemon (globally)
Installer sequelize (globally)
Installer Vue (globally)
Installer MySQL
```

### Lancer l'application

```
Lancer mysql : mysql -u root -p

Installer les dépendances : cd backend > npm install, cd frontend > npm install (si erreur voir si dessous)

Creer un fichier .env dans le backend et ajouter des mots de passe : 
JWT_SECRET = XXX 
JWT_EXPIRATION = "XXh" 
EMAIL_SECRET = XXX

Creer un dossier "images" dans le backend

Lier mySQL avec le config.json : remplir les champs username et password

Migrer la base de donnée vers mySQL : sequelize db:create puis sequelize db:migrate

Lancer les servers : cd backend > npm run start, cd frontend > npm run serve
```

### Important

```
Dans le frontend si une erreur est présente avec la commande "npm install" veuillez installer nvm https://github.com/nvm-sh/nvm puis changer la version de node à v14.18.1 :

Nvm install 14.18.1
Nvm use 14.18.1

Puis : cd frontend, npm install
```