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
router.post('/cadastro-barbearia',  async function (req, res) {
    var requisicao = req.body;
    var barbershop = new BarberShopModel(requisicao);
    var response = await barbershop.register();
    if(response == 'success') {
        res.send('Barbearia cadastrada com sucesso');
    }else{
        res.send('Erro ao cadastrar barbearia - ' + response);
    }
});

//========MAKE SCHEDULE============
router.get('/agenda-horario', function (req, res) {
    res.sendFile(path.resolve() + '/views/agenda-horario.html');
});
router.post('/agenda-horario', async function (req, res) {
    console.log(req.body);
    var requisicao = req.body;
    var schedule = new ScheculeModel(requisicao);
    await schedule.register();
    console.log(`Novo agendamento criado / ${schedule.id}`)
    const msg = `Seu agendamento foi marcado na ${schedule.barbershop}! Guarde seu código para consulta: ${schedule.id}`;
    res.status(201);
    res.send(msg);
    /*
    if(response == 'success') {
        res.send('Seu horário foi agendado');
    }else{
        res.send('Erro para agendar horário - ' + response);
    }
    */
});


//========SHOW SCHEDULES============
router.get('/verificar-horario', (req, res) => {
    res.sendFile(path.resolve() + '/views/verificar-horario.html');
});
router.post('/verificar-horario', async (req, res) => {
    const idSchedule = req.body.id;
    console.log(idSchedule);
    const schedule = new ScheculeModel({id: idSchedule});
    const dadosSchedule = await schedule.selectSheduleById();
    const dadosScheduleXml = jsontoxml.jsonToXml(dadosSchedule, 'dado', 'dados');
    
    res.send(dadosScheduleXml);
});

module.exports = router;