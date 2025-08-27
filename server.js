import express from 'express'; //importing express module for use
import publicRoutes from './routes/public.js'; //importa as rotas públicas do arquivo public.js - na importação coloco o nome que eu quiser 
import privateRoutes from './routes/private.js'; //importa as rotas privadas do arquivo private.js
import auth from './middlewares/auth.js';
const app = express(); //guarda o express na variável app
app.use(express.json()); //middleware para interpretar o corpo da requisição como JSON


/*create routes for the server(3):
Public routes: register and login.


Private: list users
*/

app.use('/users', publicRoutes); //todas as rotas que começam com /usuarios vão ser tratadas pelo publicRoutes
app.use('/users', auth, privateRoutes);







//escolher uma porta para o servidor

app.listen(3000, () => {console.log('Servidor rodando na porta 3000');}); //inicia o servidor na porta 3000