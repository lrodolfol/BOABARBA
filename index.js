const config = require('config'); //arquivo de config na raiz/config/default.json
const port = config.get('api-config.port');
const express = require('express');
const app = express();
const DadosInvalidos = require('./useClass/errorClass/DadosInvalidos.js');

const router = require('./routes/router.js');

app.listen(port, () => {
    console.log('Server Running on port ' + port);
})

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use('/', router);
app.use((erro, req, res, middleware) => {
    if(erro instanceof DadosInvalidos) {
        const dadosInvalidos = erro.camposInvalidos;
        res.send('Dados Inválidos no cadastro: ' + JSON.stringify(dadosInvalidos));
    }
});