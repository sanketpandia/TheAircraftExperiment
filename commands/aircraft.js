var aircraftSpecs =  require('../service_code/aircraft_specs');

module.exports = {
    name: "aircraft",
    description: "Returns the performance spec of the aircraft spcified",
    execute(message){
        try{
            message.channel.send(aircraftSpecs.getAircraftSpecs(message.content))
        }catch(err){
            message.channel.send("Something went wrong. Contact dev")
            console.log(err)
        }
    }
}