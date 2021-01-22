const fs = require('fs')
const filerrors = require('../exceptions/file_exceptions')

exports.readJsonFile = function readJsonFile(filePath){
    try{
    fileContents = fs.readFileSync(filePath)
    }catch(err){
        throw new filerrors.AssetFileReadError(`Unable to find ${filePath}. Please contact an admin or the developeer to review the error`)
    }
    try{
        return JSON.parse(fileContents)
    }catch(err){
        throw new filerrors.JSONParseError(`Unable to read ${filePath}. Please contact an admin or the developer. Make sure the file is formatted in the correct JSON format as mentioned in the docs`)
    }

}

exports.writeJsonFile = async function writeJsonToFile(filePath, fileContent){
    try{
        let data = JSON.stringify(fileContent)
        fs.writeFileSync("./bot_downloaded_content/"+filePath, data)
        return true
    }catch(err){
        throw new filerrors.JSONParseError(`Was unable to write to file ${filePath}`)
    }
}

