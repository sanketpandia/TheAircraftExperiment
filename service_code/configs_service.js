const fileHandler = require('./file_handler')

exports.getCmConfigs = async function getCmConfigs(){
    var fileContent = fileHandler.readJsonFile('./configs/airtable_config.json')
    return fileContent["Career Mode"]
}

exports.getBotLinks = async function getBotLinks(){
    var fileContent = fileHandler.readJsonFile('./configs/bot_config.json')
    return fileContent["links"]
}

exports.getBotLearn = async function getBotLearn(){
    var fileContent = fileHandler.readJsonFile('./configs/bot_config.json')
    return fileContent["learn"]
}
