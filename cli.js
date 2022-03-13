const rson = require("./index.js")
const fs = require("fs")

switch (process.argv[2].toLowerCase()) {
    case "tojson":
        if(!process.argv[3]) {
            console.log("No RSON file provided")
            break
        }
        let rsonText = fs.readFileSync(process.argv[3], "utf8")
        // console.dir(rson.toJSON(rsonText))
        fs.writeFileSync('test.json', JSON.stringify(rson.toJSON(rsonText), null, 4), 'utf8')
        break
    default:
        console.log("No method provided")
}