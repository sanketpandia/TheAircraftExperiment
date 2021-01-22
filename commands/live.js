const utils = require('../service_code/utils')

module.exports = {
    name: "live",
    description: "Returns the active AFKLM flights in the expert server",
    async execute(message){
        try{
            let response;
            await utils.getLink(message).then(data => {
                response = data
            })
            if(response.success){
            message.author.send(response.response)
            }else{
                message.reply(response.response)
            }
        }catch(err){
            message.channel.send("Something went wrong. Contact dev")
            console.log(err)
        }
    }
}