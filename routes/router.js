const router = require('express').Router();
const path = require('path');

router.get('/', function (req, res) {
    //res.send('Olá mundo! Site Barbearia');
    res.sendFile(path.resolve() + '/views/index.html');
});

router.get('/cadastro-barbearia', function (req, res) {
    res.sendFile(path.resolve() + '/views/cadastro-barbearia.html');
});

router.post('/cadastro-barbearia', function (req, res) {
    var requisicao = req.body;
    console.log(requisicao);
    res.send( JSON.stringify(requisicao) );
});

router.get('/agenda-horario', function (req, res) {
    //res.send('Olá mundo! Site Barbearia');
    res.sendFile(path.resolve() + '/views/agenda-horario.html');
});

module.exports = router;