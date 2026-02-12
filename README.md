Dashboard Preview CSV / Excel
## Panoramica
Questo progetto è una semplice applicazione web full-stack che permette di caricare file CSV o Excel e lavorare su una loro anteprima direttamente dal browser.

In particolare consente di:
- caricare file CSV/XLS/XLSX tramite interfaccia web
- visualizzare una preview tabellare delle prime righe
- assegnare manualmente un tipo (text, number, date) alle colonne
- salvare tali informazioni su database
- recuperare file già caricati e modificare i tipi assegnati

Nel backend sono presenti anche endpoint iniziali per autenticazione utente (login, creazione utenti e autorizzazioni), impostati come base per estensioni future.
L’obiettivo principale dell’implementazione è stato mantenere il codice semplice, leggibile ed estendibile, piuttosto che coprire scenari avanzati.

## Tecnologie utilizzate BE
Node.js
Express
MongoDB + Mongoose
Multer (gestione upload)
csv-parser
xlsx (lettura file Excel)
JSON Web Token (autenticazione)
Swagger / OpenAPI (documentazione API)

## Tecnologie utilizzate FE
Angular (Standalone Components)
Angular Material
RxJS

## Struttura del progetto
root/
  ── be/    Backend Express
  ── fe/    Frontend Angular

## Avvio in locale
## Requisiti
Node.js 18+
MongoDB locale oppure remoto

## Configurazione database
Di default il backend tenta la connessione a:

mongodb://localhost:27017/csv_uploader

Per usare una connessione diversa creare un file .env dentro be/:
MONGO_URI=<stringa_connessione>
JWT_SECRET=<segreto_token>

## Avvio BE
cd be
npm install
npm run dev

Server disponibile su:
http://localhost:3000

## Avvio FE
cd fe
npm install
ng serve

Applicazione disponibile su:
http://localhost:4200

## Documentazione API
È disponibile tramite Swagger:
http://localhost:3000/api-docs

* Da qui è possibile:
- consultare gli endpoint
- vedere payload richiesti
- testare le chiamate

## Scelte architetturali BE
Separazione dei livelli
Controller → gestione HTTP
Service → logica applicativa
Repository → accesso al database

## Repository Pattern
Incapsula le operazioni Mongo
Facilita eventuali cambi di datastore
Gestione file
Upload temporaneo su filesystem
Parsing CSV/Excel tramite servizi dedicati
Persistenza preview su Mongo
Eliminazione automatica del file dopo il parsing
Parsing estendibile
Dispatcher basato sull’estensione
Facile aggiunta nuovi formati
Autenticazione
Login JWT
Middleware di autorizzazione
Base per protezione endpoint
Documentazione
Swagger integrato per esplorazione API

## Scelte architetturali FE
Componenti standalone Angular
Servizi separati dalla UI
Gestione stato reattiva con RxJS
Angular Material per UI consistente
Feedback utente tramite snackbar
Stati di errore gestiti esplicitamente
L’approccio adottato punta a mantenere la UI prevedibile e facilmente estendibile.

## Gestione errori BE
Gestione base per:
- upload non valido
- file mancante
- formato non supportato
- risorsa non trovata
- errori server generici
Con restituzione di codici HTTP coerenti.

## Gestione errori FE
-messaggi errore
-stati vuoti
-feedback operazioni riuscite

## Limitazioni e assunzioni
L’anteprima mostra solo un sottoinsieme dei dati
Sistema di autenticazione non completo
Nessuna gestione utenti lato frontend
Nessuna containerizzazione Docker (per vincoli temporali)
Assenza di test automatizzati

## Possibili sviluppi futuri
Protezione endpoint tramite auth
UI di login
Eliminazione file
Paginazione preview
Upload drag & drop
Test automatici
Dockerizzazione

## Note finali
L’applicazione è eseguibile completamente in locale seguendo le istruzioni sopra riportate.