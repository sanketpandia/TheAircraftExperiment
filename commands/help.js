module.exports = {
    name: "help",
    description: "Returns the list of available commands",
    execute(message){
        try{
            message.channel.send("This will return the help in the future")
        }catch(err){
            message.channel.send("Something went wrong. Contact dev")
            console.log(err)
        }
    }
}