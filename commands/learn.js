const utils = require('../service_code/utils')

module.exports = {
    name: "learn",
    description: "Returns the URL of a learning material specified in configs/bot_configs.json",
    async execute(message){
        try{
            let response;
            await utils.getLearn(message).then(data => {
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