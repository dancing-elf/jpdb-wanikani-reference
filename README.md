# jpdb-wanikani-reference

Basic imlementation that allow to add refrences to wanikani kanji to jpdb review/voculabrary pages.

Click by kanji in "Wanikani" section open kanji page at [wanikani.com](https://www.wanikani.com/).

<img src="review_example.jpg" width="50%" height="50%">

# Part for developers
Sorry for such awfull code :( But it works and now it is more than enough for me.

For simplicity kanji data are hardcoded in the script. 
If you want to participate you may want to regenerate this data.
To regenrate it you can do steps bellow.
1) Get data from wanikani with curl (maybe check page_after_id)
```
curl "https://api.wanikani.com/v2/subjects?types=kanji" \
-H "Authorization: Bearer WANIKANI_TOKEN" > k1.json

curl "https://api.wanikani.com/v2/subjects?types=kanji&page_after_id=1439" \
-H "Authorization: Bearer WANIKANI_TOKEN" > k2.json

curl "https://api.wanikani.com/v2/subjects?types=kanji&page_after_id=2439" \
-H "Authorization: Bearer WANIKANI_TOKEN" > k3.json
```
2) Generate json structure for using in script.
```
const fs = require("fs");
const workFolder = 'YOUR_FOLDER HERE'

function readJson(filePath) {
    const fileData = fs.readFileSync(filePath);
    return JSON.parse(fileData);
}

const k1 = readJson(workFolder + "/k1.json");
const k2 = readJson(workFolder + "/k2.json");
const k3 = readJson(workFolder + "/k3.json");

var result = {};
for (const kanjiFullInfo of k1.data.concat(k2.data, k3.data)) {
    const data = kanjiFullInfo.data;

    //console.log(data);

    const charachter = data.characters;
    const level = data.level;
    const reading = data.readings.find(v => v.primary = 'true').reading;
    const meaning = data.meanings.find(v => v.primary = 'true').meaning;
    result[charachter] = {
        "level": level,
        "reading": reading,
        "meaning": meaning
    }
}

const jsonResult = JSON.stringify(result);
fs.writeFileSync(workFolder + '/kanji_data.json', jsonResult);
```

