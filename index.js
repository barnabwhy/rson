function toJSON(rsonText) {
    let json = []
    let lines = rsonRemoveWhitespace(rsonText)

    let current = 0
    while(current < lines.length) {
        let line = lines[current]
        
        let part = {}

        if(line.startsWith('When:')) {
            part.type = "condition"
            part.value = line.split('When:')[1].trim().replace(/\"/g, '')
            part.sub = {}

            let offset = 1
            while(lines[current+offset] != '') {
                let lineO = lines[current+offset]
                let key = lineO.split(':')[0].trim()
                let value = (lineO.split(':')[1] || '').trim()
                if(value != '') {
                    part.sub[key] = value
                    offset++
                } else {
                    let values = []
                    offset++
                    let arrayTraversed = false
                    let arrayStarted = false
                    while(!arrayTraversed) {
                        lineO = lines[current+offset]
                        if(!arrayStarted) {
                            if(lineO.trim() == '[') {
                                arrayStarted = true
                            } else {
                                part.sub[key] = lineO.trim()
                                arrayTraversed = true
                            }
                        } else {
                            if(lineO.trim() == ']') {
                                part.sub[key] = values
                                arrayTraversed = true
                            } else {
                                values.push(lineO.trim())
                            }
                        }
                        offset++
                    }
                }
            }
            current += offset
        } else {
            
        }

        if(line.trim() != '') json.push(part)
        current++
    }

    return json
}
function fromJSON(json) {
    return json
}

function rsonRemoveWhitespace(rsonText) {
    let lines = rsonText.split("\n").map(l => l.replace(/^[\r\n]+|[\r\n]+$/g, ''));
    let linesNoWhiteSpace = []
    isMultilineComment = false
    for(line of lines) {
        if(line.match(/\/\*/g)) isMultilineComment = true
        if(line.match(/\*\//g)) {
            isMultilineComment = false
            continue
        }
        if(isMultilineComment) continue
        // if(line.trim() == '') continue
        if(line.trim().startsWith('//')) continue

        let commentSplitLine = line.split('//')

        linesNoWhiteSpace.push(commentSplitLine[0])
    }
    return linesNoWhiteSpace
}

module.exports = {
    toJSON,
    fromJSON
}