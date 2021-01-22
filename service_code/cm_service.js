'use strict'
var fileHandler = require('./file_handler')
var airtableConnection = require('./airtable_connection_cm')
const Discord = require('discord.js')

exports.loadCmStats = async function loadCmStats(callsign){
    let cmEmbeddings = fileHandler.readJsonFile('./bot_downloaded_content/cm_pilot_embeddings.json');
    var response;
    if(callsign.toUpperCase() in cmEmbeddings){
        response = await airtableConnection.retrieveRecord(cmEmbeddings[callsign.toUpperCase()])
    }else{
        airtableConnection.createCmBindings()
        return "Sorry I couldn't find your routes. I am resyncing the details from airtable. Try again in a few seconds :slight_frown:"
    }
    return generateFormat(response)

}

function generateFormat(responseObj){
    let time_left_str = (Math.floor(responseObj['Required hours to next aircraft']/3600)).toString() + ":"
    time_left_str += (Math.floor((responseObj['Required hours to next aircraft'] % 3600) /60)).toString().length === 1? "0"+ (Math.floor((responseObj['Required hours to next aircraft'] % 3600) /60)).toString() : (Math.floor((responseObj['Required hours to next aircraft'] % 3600) /60)).toString()

    let time_done_str = (Math.floor(responseObj['Total CM Hours']/3600)).toString() + ":"
    time_done_str += (Math.floor((responseObj['Total CM Hours'] % 3600) /60)).toString().length === 1? "0"+ (Math.floor((responseObj['Total CM Hours'] % 3600) /60)).toString() : (Math.floor((responseObj['Total CM Hours'] % 3600) /60)).toString()
    var cmStats = new Discord.MessageEmbed()
            .setTitle(`Career mode stats for ${responseObj["Callsign"]}`)
            .setAuthor("TheAirplaneExperimentBot")
            .setDescription("Here I lay your CM stats in a platter")
            .addFields(
                {name: "Time till Next Aircraft", value: time_left_str, inline:true},
                {name: "Total Time Achieved", value: time_done_str, inline: true},
                {name: "Total Passengers Carried", value: responseObj['Total passengers carried'], inline: true},
                {name: "Flighlines Assigned", value: responseObj['Assigned Routes'].join(", ")}
            )
            .setTimestamp()
            .setFooter(`In case you forgot you are flying the ${responseObj["Airline"]} ${responseObj["Aircraft"]}`);
    return cmStats;
}