class AssetFileReadError extends Error{
    constructor(message){
        super(message);
        this.name = "AssetFileReadError"
    }
}
class JSONParseError extends Error{
    constructor(message){
        super(message);
        this.name = "JSONParseError"
    }
}

exports.AssetFileReadError = AssetFileReadError;
exports.JSONParseError = JSONParseError;