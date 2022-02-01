class ScheduleExists extends Error {
    constructor(){
        super('Schedule is already in use');
        this.nome = 'Schedule is already in use';
        this.codeError = 1;
    }
}

module.exports = ScheduleExists;