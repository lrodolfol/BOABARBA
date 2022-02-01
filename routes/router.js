const router = require('express').Router();
const path = require('path');
const jsontoxml = require('../config/Serializador.js');

const BarberShopModel = require('../dataBase/model/BarberShopModel.js');
const ScheculeModel = require('../dataBase/model/ScheduleModel');

router.get('/', function (req, res) {
    //res.send('Olá mundo! Site Barbearia');
    res.sendFile(path.resolve() + '/views/index.html');
});


//=====REGISTER BARBERSHOPS==========
router.get('/cadastro-barbearia', function (req, res) {
    res.sendFile(path.resolve() + '/views/cadastro-barbearia.html');
});
router.post('/cadastro-barbearia', async function (req, res, middleware) {
    try {
        var requisicao = req.body;
        var barbershop = new BarberShopModel(requisicao);
        var response = await barbershop.register();
        if (response == 'success') {
            res.send('Barbearia cadastrada com sucesso');
        } else {
            res.send('Erro ao cadastrar barbearia - ' + response);
        }
    } catch (error) {
        middleware(error);
    }
});

//========MAKE SCHEDULE============
router.get('/agenda-horario', function (req, res) {
    res.sendFile(path.resolve() + '/views/agenda-horario.html');
});
router.post('/agenda-horario', async function (req, res, middleware) {
    var msg = '';
    var statusCode = 0;
    try {
        var requisicao = req.body;
        var schedule = new ScheculeModel(requisicao);

        if (await schedule.register()) {
            console.log(`Novo agendamento criado / ${schedule.id}`)
            msg = `Seu agendamento foi marcado na ${schedule.barbershop}! Guarde seu código para consulta: ${schedule.id}`;
            statusCode = 201;
        } else {
            console.log('Schedule is already in use');
            msg = schedule.msgError;
            statusCode = 200;
        }
    } catch (error) {
        middleware(error);
    }
});


//========SHOW SCHEDULES============
router.get('/verificar-horario', (req, res) => {
    res.sendFile(path.resolve() + '/views/verificar-horario.html');
});
router.post('/verificar-horario', async (req, res) => {
    const idSchedule = req.body.id;
    console.log(idSchedule);
    const schedule = new ScheculeModel({ id: idSchedule });
    const dadosSchedule = await schedule.selectSheduleById();
    //const dadosScheduleXml = jsontoxml.jsonToXml(dadosSchedule, 'dado', 'dados');

    res.send(dadosSchedule);
});

module.exports = router;