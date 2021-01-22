var utils = require('./utils')
var Airtable = require('airtable')
var configService = require('./configs_service')
var filehandler = require('./file_handler')


exports.retrieveRecord = async function loadCmData(recordId){
    var cm_configs = await configService.getCmConfigs()
    var base = new Airtable({apiKey: process.env.MASTER_AIRTABLE_API_KEY}).base(process.env.CAREER_MODE_BASE_ID)
    var airtableData;
    await base(cm_configs["cmTableName"]).find(recordId).then(data => {
        airtableData = data["fields"]
    })
    return airtableData
}

exports.createCmBindings = async function createCmBindings(){
    var cm_configs = await configService.getCmConfigs()
    var base = new Airtable({apiKey: process.env.MASTER_AIRTABLE_API_KEY}).base(process.env.CAREER_MODE_BASE_ID)
    var airtableData;
    await base(cm_configs["cmTableName"]).select().all().then(data => {
        airtableData = data
    })
    var pilot_list = {}
    airtableData.forEach(pilot => {
        let callsign = pilot['fields']['Callsign'].replace(' ', '')
         pilot_list[callsign]= pilot['id']
        })
    filehandler.writeJsonFile('cm_pilot_embeddings.json', pilot_list)
    
}