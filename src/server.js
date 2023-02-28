import express from 'express';
import { ConexaoFirebase } from "./config.js";
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

const port = 4000;

const db = ConexaoFirebase();

const membros = db.collection('membros');
const treinos = db.collection('treinos');
const produtos = db.collection('produtos');

/*MEMBROS*/
app.get('/membros', (request, response) => {
  membros.get()
        .then(snapshot => {
          const res = snapshot.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id
          }));
          response.json(res);
        });
});

app.get('/membros/:id', (request, response) => {
  const id = request.params.id;
  membros.doc(id)
        .get()
        .then(snapshot => {
          response.json(snapshot.data());
        });
});

app.post('/membros', async (request, response) => {
  try{
    const data = request.body;
    if(data.uid){
      const uid = data.uid;
      delete data.uid;
      await membros.doc(uid).update(data);
    }else{
      await membros.add(data);
    }
    response.send(true)
  } catch(error) {
    response.send(false);
  }
});

app.post('/membros/delete', async (request, response) => {
  try{
    const data = request.body;
    await membros.doc(data.uid).delete();
    response.send(true)
  } catch(error) {
    response.send(false);
  }
});


/*TREINOS*/
app.get('/treinos', (request, response) => {
  treinos.get()
        .then(snapshot => {
          const res = snapshot.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id
          }));
          response.json(res);
        });
});

app.get('/treinos/:id', (request, response) => {
  const id = request.params.id;
  treinos.doc(id)
        .get()
        .then(snapshot => {
          response.json(snapshot.data());
        });
});

app.post('/treinos', async (request, response) => {
  try{
    const data = request.body
    if(data.uid){
      const uid = data.uid;
      delete data.uid;
      await treinos.doc(uid).update(data);
    }else{
      await treinos.add(data);
    }
    response.send(true)
  } catch(error) {
    response.send(false);
  }
});

app.post('/treinos/delete', async (request, response) => {
  try{
    const data = request.body;
    await treinos.doc(data.uid).delete();
    response.send(true)
  } catch(error) {
    response.send(false);
  }
});

/*PRODUTOS*/
app.get('/produtos', (request, response) => {
  produtos.get()
        .then(snapshot => {
          const res = snapshot.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id
          }));
          response.json(res);
        });
});

app.get('/produtos/:id', (request, response) => {
  const id = request.params.id;
  produtos.doc(id)
        .get()
        .then(snapshot => {
          response.json(snapshot.data());
        });
});

app.post('/produtos', async (request, response) => {
  try{
    const data = request.body;
    if(data.uid){
      const uid = data.uid;
      delete data.uid;
      await produtos.doc(uid).update(data);
    }else{
      await produtos.add(data);
    }
    response.send(true)
  } catch(error) {
    response.send(false);
  }
});

app.post('/produtos/delete', async (request, response) => {
  try{
    const data = request.body;
    await produtos.doc(data.uid).delete();
    response.send(true)
  } catch(error) {
    response.send(false);
  }
});

/*LOGIN*/
app.post('/login', async (request, response) => {
  const data = request.body;
  if(data.email == "imperialufla@gmail.com" && data.senha == "imperialufla"){
    response.send(true);
  }else{
    response.send(false);
  }
});

app.listen(port, () => console.log("Api rest iniciada em http://localhost:4000"))