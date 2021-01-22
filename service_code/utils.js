const configReader = require('./configs_service')

exports.getCallSign = async function getCallsign(message){
    var value = ""
     await message.guild.members.fetch(message.author.id).then(data => {
        var rxPattern = /.*AFKLM(\d\d\d).*/
        var arr = rxPattern.exec(data.displayName)
        var x= "AFKLM" + arr[1]
        value = x;
    }).catch(console.log)
    return value
}

exports.getLink = async function getLink(message){
    let links = await configReader.getBotLinks()
    let args = message.content.split(' ')
    let responseObj = {}
    if(args.length === 1 || !(args[1].toUpperCase() in links)){
        responseObj["response"] = `I am sorry I don't have this. I have the links for ** ${Object.keys(links).join(", ")}**. You may try one of these. The command is not case sensitive`
        responseObj["success"] = false
        return responseObj
    }
    responseObj["response"] = `Here's what you requested for. Happy flying!! \n${links[args[1].toUpperCase()]}`
    responseObj["success"] = true
    return responseObj
}

exports.getLearn = async function getLearn(message){
    let links = await configReader.getBotLearn()
    let args = message.content.split(' ')
    let responseObj = {}
    if(args.length === 1 || !(args[1].toUpperCase() in links)){
        responseObj["response"] = `I am sorry I don't have this. I have the links for ** ${Object.keys(links).join(", ")}**. You may try one of these. The command is not case sensitive`
        responseObj["success"] = false
        return responseObj
    }
    responseObj["response"] = `Here you go. Happy learning bossman!\n${links[args[1].toUpperCase()]}`
    responseObj["success"] = true
    return responseObj
}

