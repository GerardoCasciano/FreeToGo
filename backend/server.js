/* eslint-env node */

import express from "express";
import cors from 'cors';
import 'dotenv/config';
import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
//configurazione Firebase Admin
try{
admin.initializeApp();
console.log("Firebase Admin SDK inizializzato!!");
}catch(error){
console.error("ERRORE:Assicurati che il file  JSON delle credenziali sia specificato correttamente tramite GOOGLE_APPLICATION_CREDENTIALS.", error)
}

//Inizializzo il client Firestore
const db = getFirestore();
//Conf Express
const app = express();
//Conf CORS
app.use(cors({
origin:'*',
methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
credentials:true
}));

//Analisi del formato JSON
app.use(express.json());
//Analisi delle richieste URL-enocded
app.use(express.urlencoded({extended:true}));


app.get("/", (req, res) => {
  res.json({message:"Server backend FreeToGO attivo per la richiesta API."});
});
//Rotta per il db per ottenere tutti gli utenti
app.get("/api/users",async(req,res)=>{
try{
const usersRef = db.collection("users");
const snapshot = await usersRef.get();

if(snapshot.empty){
return res.status(404).json({message:"Nessun utente trovato"});
}
const users = snapshot.docs.map(doc=>({
id: doc.id,
...doc.data()
}));
res.status(200).json(users);
}catch(error){
console.error("Errore nel recuper utenti;", error);
res.status(500).json({message:"Erroe interno del server durante il recupero degli utenti."});
}
});


const port = process.env.port || 3009;

app.listen(port, () => {
    console.log(`\n=================================================`);
    console.log(`Server avviato sulla porta: ${port}`);
    console.log(`Accedi a http://localhost:${port}`);
    console.log(`=================================================\n`);
});