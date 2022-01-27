const jsontoxml = require('jsontoxml');

class Serializador {

    jsonToXml(dados, tagSingular, tagPlural) {
      let tag = tagSingular;
      
        if (Array.isArray(dados)) {
          tag = tagPlural
          dados = dados.map((item) => {
            return {
              [tagSingular]: item
            }
          });
        }

        return jsontoxml({ [tag]: dados });
    }

}

module.exports = new Serializador;