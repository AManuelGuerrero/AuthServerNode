const express= require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config(); 

console.log(process.env);

//Crear el servidor/aplicacion de express
const app = express();

//Base de datos
dbConnection();

//Directorio público
app.use(express.static('public'));

//CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());


//Rutas

app.use('/api/auth', require('./routes/auth'));


app.listen(process.env.PORT,()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});