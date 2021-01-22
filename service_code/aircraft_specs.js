var loadJSONFile = require('./file_handler')
const Discord = require('discord.js')

exports.getAircraftSpecs = function getAircraftSpecs(message){
    let messageChunk = message.split(' ');
    setTimeout(test, 3000)
    aircraftPerformanceFileContent = loadJSONFile.readJsonFile('./bot_downloaded_content/aircraft-performances.json')
    
    //Check if message contains a specified aircraft. If not returns list of aircraft available
    if(messageChunk.length <=1){
        return loadAircraftPerformanceHelp(aircraftPerformanceFileContent)
    }
    let responseObject = messageChunk[1] in aircraftPerformanceFileContent ? getAircraftPerformanceString(messageChunk[1], aircraftPerformanceFileContent) : loadAircraftPerformanceHelp(aircraftPerformanceFileContent)
    return responseObject
}

function loadAircraftPerformanceHelp(aircraftsJSON){
    availableAircrafts = Object.keys(aircraftsJSON)
    var helpMessage = new Discord.MessageEmbed()
            .setTitle("List of Aircrafts Available")
            .setAuthor("TheAirplaneExperimentBot")
            .setDescription("Sorry I was unable to find the aircraft you specified. Please choose one of the aircrafts listed below")
            .addField('Available Aircrafts', availableAircrafts.join(', '))
            .setTimestamp()
            .setFooter("Apologies! Try again with one of these.")
    return helpMessage
}

function getAircraftPerformanceString(aircraft, aircraftsList){
    let aircraftData = aircraftsList[aircraft]
    var aircraftDetailsResponse = new Discord.MessageEmbed()
                .setTitle(`Aircraft Performance Spec of ${aircraft}`)
                .addFields(
                    {name: 'MTOW', value: aircraftData["MTOW"], inline: true},
                    {name: 'MLW', value: aircraftData["MLW"], inline: true}
                )
                .addField('Range', aircraftData["Typical Range"],true)
                .addField('Service Ceiling', aircraftData["Ceiling"],true)
                .addFields(
                    {name: 'Climb To 5000ft', value: aircraftData["Climb to 5000ft"], inline:true},
                    {name: 'Climb To 15000ft', value: aircraftData["Climb to 15000ft"], inline:true},
                    {name: 'Climb To 24000ft', value: aircraftData["Climb to 24000ft"], inline:true},
                    {name: 'Mach Climb', value: aircraftData["Mach Climb"], inline:true},
                    {name: 'Cruise Speed', value: aircraftData["Cruise Speed"], inline:true},
                    {name: 'Descent to 24000ft', value: aircraftData["Descend to 24000ft"], inline:true},
                    {name: 'Descent to 10000ft', value: aircraftData["Descend to 10000ft"], inline:true},
                    {name: 'Approach / MCS speed', value: aircraftData["Approach / MCS"], inline:true},
                    {name: 'Landing speed', value: aircraftData["Landing"], inline:true},
                    {name: 'Flap Speeds', value: aircraftData["Flaps at descend"]},

                )
    return aircraftDetailsResponse;

}

function test(){
    console.log('executed');
}