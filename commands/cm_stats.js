"use strict"

var cm_service = require('../service_code/cm_service')
var utils = require('../service_code/utils')


module.exports = {
    name: "cm_stats",
    description: "Returns the statistics of the author's career mode progress",
    async execute(message){
        try{
            var callsign = await utils.getCallSign(message)
            var x = await cm_service.loadCmStats(callsign)
            message.channel.send(x)
           
        }catch(err){
            message.channel.send("Something went wrong. Contact dev")
            console.log(err)
        }
    }
}