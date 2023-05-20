
const fs = require("fs");
const workFolder = 'WORK_DIRECTORY_HERE'

function readJson(filePath) {
    const fileData = fs.readFileSync(filePath);
    return JSON.parse(fileData);
}

// like WaniKani Katakana For On'yomi userscript
function toKatakana(str) {
    var hiraToKata = {"め": "メ", "む": "ム", "ゃ": "ャ", "も": "モ", "ゅ": "ュ", "や": "ヤ", "ょ": "ョ", "ゆ": "ユ", "ら": "ラ", "よ": "ヨ", "る": "ル", "り": "リ", "ろ": "ロ", "れ": "レ", "わ": "ワ", "ん": "ン", "を": "ヲ", "あ": "ア", "い": "イ", "う": "ウ", "え": "エ", "か": "カ", "お": "オ", "き": "キ", "が": "ガ", "く": "ク", "ぎ": "ギ", "け": "ケ", "ぐ": "グ", "こ": "コ", "げ": "ゲ", "さ": "サ", "ご": "ゴ", "し": "シ", "ざ": "ザ", "す": "ス", "じ": "ジ", "せ": "セ", "ず": "ズ", "そ": "ソ", "ぜ": "ゼ", "た": "タ", "ぞ": "ゾ", "ち": "チ", "だ": "ダ", "っ": "ッ", "ぢ": "ヂ", "づ": "ヅ", "つ": "ツ", "で": "デ", "て": "テ", "ど": "ド", "と": "ト", "に": "ニ", "な": "ナ", "ね": "ネ", "ぬ": "ヌ", "は": "ハ", "の": "ノ", "ぱ": "パ", "ば": "バ", "び": "ビ", "ひ": "ヒ", "ふ": "フ", "ぴ": "ピ", "ぷ": "プ", "ぶ": "ブ", "べ": "ベ", "へ": "ヘ", "ほ": "ホ", "ぺ": "ペ", "ぽ": "ポ", "ぼ": "ボ", "み": "ミ", "ま": "マ"};
    var result = "";
    for (const c of str) {
        result += hiraToKata[c] || c;
    }
    return result;
}

const k1 = readJson(workFolder + "/k1.json");
const k2 = readJson(workFolder + "/k2.json");
const k3 = readJson(workFolder + "/k3.json");


var result = {};
for (const kanjiFullInfo of k1.data.concat(k2.data, k3.data)) {
    const data = kanjiFullInfo.data;

    const charachter = data.characters;
    const level = data.level;
    const primaryReading = data.readings.find(v => v.primary === true);
    const reading = primaryReading.type === 'onyomi' ?
        toKatakana(primaryReading.reading) : primaryReading.reading;
    const meaning = data.meanings.find(v => v.primary === true).meaning;
    result[charachter] = {
        "level": level,
        "reading": reading,
        "meaning": meaning
    }
}

const jsonResult = JSON.stringify(result);
//console.log(jsonResult)
fs.writeFileSync(workFolder + '/kanji_data.json', jsonResult);
