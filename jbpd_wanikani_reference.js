// ==UserScript==
// @name         JPDB wanikani references
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://jpdb.io/review*
// @match        https://jpdb.io/vocabulary*
// @grant        none
// ==/UserScript==

(function() {

    // sorry for so bad code, but for me it's enough right now
    // inspired by https://gist.github.com/luizbafilho/bf0ff14ce595ba009f2d4ac92e7cc6da

    'use strict';

    const kanjiData = loadKanjiData();

    let vocab = document.querySelector('.plain').cloneNode(true)
    let rts = vocab.querySelectorAll('rt')
    rts.forEach(function(rt) { rt.remove() })

    console.log("Searching vocab point for: ", vocab.innerText)

    var used = [];
    for (const c of vocab.innerText) {
        if (c in kanjiData) {
            const d = kanjiData[c];
            used.push({
                "char": c,
                "reading": d.reading,
                "meaning": d.meaning,
                "level": d.level
            });
        }
    }

    waitForElm('.subsection-meanings .subsection').then((elm) => {
        if (used.length === 0) {
            return;
        }

        let elements = '';
        for (const k of used) {
            elements += `
                <li style='min-width: 4rem'>
                  <a href='https://www.wanikani.com/kanji/${k.char}'
                     style='display:flex; color:#000;text-decoration: none; align-items: center; flex-direction: column'>
                    <span lang='ja' style='font-size: 250%'>${k.char}</span>
                    <ul style='list-style: none; margin: 0; padding: 0; border: 0; font-size: 100%'>
                    <li lang='ja' style='text-align: center; margin: 0;padding: 0; font-size: 100%'>${k.reading}</li>
                    <li lang='ja' style='text-align: center; margin: 0;padding: 0; font-size: 100%'>${k.meaning}</li>
                  </ul>
                  </a>
                </li>`;
        }
        let div = document.createElement('div');
        div.innerHTML = `
        <h6 class='subsection-label'>Wanikani</h6>
        <div class='subsection' style='padding: 0'>
            <ul style='box-sizing: border-box; display: flex; flex-wrap: wrap; align-items: center; 
                       list-style: none; margin: 0;padding: 0;border: 0'>
            ${elements}
            </ul>
        </div>`;

        document.querySelector('.subsection-meanings').insertAdjacentElement('afterend', div)
    });
})();


function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

function loadKanjiData() {
    const kanjiData = {
        "一": {
            "level": 1,
            "reading": "イチ",
            "meaning": "One"
        },
        "二": {
            "level": 1,
            "reading": "ニ",
            "meaning": "Two"
        },
        "九": {
            "level": 1,
            "reading": "ク",
            "meaning": "Nine"
        },
        "七": {
            "level": 1,
            "reading": "シチ",
            "meaning": "Seven"
        },
        "人": {
            "level": 1,
            "reading": "ニン",
            "meaning": "Person"
        },
        "入": {
            "level": 1,
            "reading": "ニュウ",
            "meaning": "Enter"
        },
        "八": {
            "level": 1,
            "reading": "ハチ",
            "meaning": "Eight"
        },
        "力": {
            "level": 1,
            "reading": "リョク",
            "meaning": "Power"
        },
        "十": {
            "level": 1,
            "reading": "ジュウ",
            "meaning": "Ten"
        },
        "三": {
            "level": 1,
            "reading": "サン",
            "meaning": "Three"
        },
        "上": {
            "level": 1,
            "reading": "ジョウ",
            "meaning": "Above"
        },
        "下": {
            "level": 1,
            "reading": "カ",
            "meaning": "Below"
        },
        "口": {
            "level": 1,
            "reading": "コウ",
            "meaning": "Mouth"
        },
        "大": {
            "level": 1,
            "reading": "タイ",
            "meaning": "Big"
        },
        "女": {
            "level": 1,
            "reading": "ジョ",
            "meaning": "Woman"
        },
        "山": {
            "level": 1,
            "reading": "サン",
            "meaning": "Mountain"
        },
        "川": {
            "level": 1,
            "reading": "かわ",
            "meaning": "River"
        },
        "工": {
            "level": 1,
            "reading": "コウ",
            "meaning": "Construction"
        },
        "刀": {
            "level": 2,
            "reading": "トウ",
            "meaning": "Sword"
        },
        "土": {
            "level": 2,
            "reading": "ド",
            "meaning": "Dirt"
        },
        "千": {
            "level": 2,
            "reading": "セン",
            "meaning": "Thousand"
        },
        "夕": {
            "level": 2,
            "reading": "ゆう",
            "meaning": "Evening"
        },
        "子": {
            "level": 2,
            "reading": "シ",
            "meaning": "Child"
        },
        "小": {
            "level": 2,
            "reading": "ショウ",
            "meaning": "Small"
        },
        "丁": {
            "level": 2,
            "reading": "チョウ",
            "meaning": "Street"
        },
        "了": {
            "level": 2,
            "reading": "リョウ",
            "meaning": "Finish"
        },
        "又": {
            "level": 51,
            "reading": "また",
            "meaning": "Again"
        },
        "丸": {
            "level": 2,
            "reading": "まる",
            "meaning": "Circle"
        },
        "才": {
            "level": 2,
            "reading": "サイ",
            "meaning": "Genius"
        },
        "中": {
            "level": 2,
            "reading": "チュウ",
            "meaning": "Middle"
        },
        "五": {
            "level": 2,
            "reading": "ゴ",
            "meaning": "Five"
        },
        "六": {
            "level": 2,
            "reading": "ロク",
            "meaning": "Six"
        },
        "円": {
            "level": 2,
            "reading": "エン",
            "meaning": "Yen"
        },
        "天": {
            "level": 2,
            "reading": "テン",
            "meaning": "Heaven"
        },
        "手": {
            "level": 2,
            "reading": "て",
            "meaning": "Hand"
        },
        "文": {
            "level": 2,
            "reading": "ブン",
            "meaning": "Writing"
        },
        "日": {
            "level": 2,
            "reading": "ニチ",
            "meaning": "Sun"
        },
        "月": {
            "level": 2,
            "reading": "ゲツ",
            "meaning": "Moon"
        },
        "木": {
            "level": 2,
            "reading": "モク",
            "meaning": "Tree"
        },
        "水": {
            "level": 2,
            "reading": "スイ",
            "meaning": "Water"
        },
        "火": {
            "level": 2,
            "reading": "カ",
            "meaning": "Fire"
        },
        "犬": {
            "level": 2,
            "reading": "いぬ",
            "meaning": "Dog"
        },
        "王": {
            "level": 2,
            "reading": "オウ",
            "meaning": "King"
        },
        "出": {
            "level": 2,
            "reading": "シュツ",
            "meaning": "Exit"
        },
        "右": {
            "level": 2,
            "reading": "ユウ",
            "meaning": "Right"
        },
        "四": {
            "level": 2,
            "reading": "シ",
            "meaning": "Four"
        },
        "左": {
            "level": 2,
            "reading": "サ",
            "meaning": "Left"
        },
        "本": {
            "level": 2,
            "reading": "ホン",
            "meaning": "Book"
        },
        "正": {
            "level": 2,
            "reading": "セイ",
            "meaning": "Correct"
        },
        "玉": {
            "level": 2,
            "reading": "たま",
            "meaning": "Ball"
        },
        "田": {
            "level": 2,
            "reading": "た",
            "meaning": "Rice Paddy"
        },
        "白": {
            "level": 2,
            "reading": "ハク",
            "meaning": "White"
        },
        "目": {
            "level": 2,
            "reading": "め",
            "meaning": "Eye"
        },
        "石": {
            "level": 4,
            "reading": "セキ",
            "meaning": "Stone"
        },
        "立": {
            "level": 2,
            "reading": "リツ",
            "meaning": "Stand"
        },
        "万": {
            "level": 3,
            "reading": "マン",
            "meaning": "Ten Thousand"
        },
        "久": {
            "level": 32,
            "reading": "キュウ",
            "meaning": "Long Time"
        },
        "今": {
            "level": 3,
            "reading": "コン",
            "meaning": "Now"
        },
        "元": {
            "level": 3,
            "reading": "ゲン",
            "meaning": "Origin"
        },
        "公": {
            "level": 10,
            "reading": "コウ",
            "meaning": "Public"
        },
        "内": {
            "level": 3,
            "reading": "ナイ",
            "meaning": "Inside"
        },
        "分": {
            "level": 3,
            "reading": "ブン",
            "meaning": "Part"
        },
        "切": {
            "level": 3,
            "reading": "セツ",
            "meaning": "Cut"
        },
        "午": {
            "level": 3,
            "reading": "ゴ",
            "meaning": "Noon"
        },
        "友": {
            "level": 3,
            "reading": "ユウ",
            "meaning": "Friend"
        },
        "太": {
            "level": 3,
            "reading": "タイ",
            "meaning": "Fat"
        },
        "少": {
            "level": 3,
            "reading": "ショウ",
            "meaning": "Few"
        },
        "引": {
            "level": 3,
            "reading": "ひ",
            "meaning": "Pull"
        },
        "心": {
            "level": 3,
            "reading": "シン",
            "meaning": "Heart"
        },
        "戸": {
            "level": 3,
            "reading": "と",
            "meaning": "Door"
        },
        "方": {
            "level": 3,
            "reading": "ホウ",
            "meaning": "Direction"
        },
        "牛": {
            "level": 3,
            "reading": "ギュウ",
            "meaning": "Cow"
        },
        "父": {
            "level": 3,
            "reading": "ちち",
            "meaning": "Father"
        },
        "毛": {
            "level": 3,
            "reading": "モウ",
            "meaning": "Fur"
        },
        "止": {
            "level": 3,
            "reading": "シ",
            "meaning": "Stop"
        },
        "兄": {
            "level": 5,
            "reading": "キョウ",
            "meaning": "Older Brother"
        },
        "冬": {
            "level": 3,
            "reading": "ふゆ",
            "meaning": "Winter"
        },
        "北": {
            "level": 3,
            "reading": "ホク",
            "meaning": "North"
        },
        "半": {
            "level": 3,
            "reading": "ハン",
            "meaning": "Half"
        },
        "古": {
            "level": 3,
            "reading": "コ",
            "meaning": "Old"
        },
        "台": {
            "level": 3,
            "reading": "ダイ",
            "meaning": "Machine"
        },
        "外": {
            "level": 3,
            "reading": "ガイ",
            "meaning": "Outside"
        },
        "市": {
            "level": 3,
            "reading": "シ",
            "meaning": "City"
        },
        "広": {
            "level": 3,
            "reading": "ひろ",
            "meaning": "Wide"
        },
        "母": {
            "level": 3,
            "reading": "はは",
            "meaning": "Mother"
        },
        "用": {
            "level": 3,
            "reading": "ヨウ",
            "meaning": "Task"
        },
        "矢": {
            "level": 3,
            "reading": "や",
            "meaning": "Arrow"
        },
        "世": {
            "level": 4,
            "reading": "セイ",
            "meaning": "World"
        },
        "主": {
            "level": 4,
            "reading": "シュ",
            "meaning": "Master"
        },
        "他": {
            "level": 4,
            "reading": "タ",
            "meaning": "Other"
        },
        "代": {
            "level": 4,
            "reading": "ダイ",
            "meaning": "Substitute"
        },
        "写": {
            "level": 4,
            "reading": "シャ",
            "meaning": "Copy"
        },
        "去": {
            "level": 4,
            "reading": "キョ",
            "meaning": "Past"
        },
        "号": {
            "level": 4,
            "reading": "ゴウ",
            "meaning": "Number"
        },
        "央": {
            "level": 4,
            "reading": "オウ",
            "meaning": "Center"
        },
        "平": {
            "level": 4,
            "reading": "ヘイ",
            "meaning": "Flat"
        },
        "打": {
            "level": 4,
            "reading": "ダ",
            "meaning": "Hit"
        },
        "氷": {
            "level": 4,
            "reading": "こおり",
            "meaning": "Ice"
        },
        "申": {
            "level": 4,
            "reading": "もう",
            "meaning": "Say Humbly"
        },
        "皮": {
            "level": 5,
            "reading": "ヒ",
            "meaning": "Skin"
        },
        "皿": {
            "level": 4,
            "reading": "さら",
            "meaning": "Plate"
        },
        "礼": {
            "level": 4,
            "reading": "レイ",
            "meaning": "Thanks"
        },
        "休": {
            "level": 4,
            "reading": "キュウ",
            "meaning": "Rest"
        },
        "先": {
            "level": 4,
            "reading": "セン",
            "meaning": "Previous"
        },
        "名": {
            "level": 4,
            "reading": "メイ",
            "meaning": "Name"
        },
        "字": {
            "level": 4,
            "reading": "ジ",
            "meaning": "Letter"
        },
        "年": {
            "level": 4,
            "reading": "ネン",
            "meaning": "Year"
        },
        "早": {
            "level": 4,
            "reading": "ソウ",
            "meaning": "Early"
        },
        "気": {
            "level": 4,
            "reading": "キ",
            "meaning": "Energy"
        },
        "百": {
            "level": 4,
            "reading": "ヒャク",
            "meaning": "Hundred"
        },
        "竹": {
            "level": 4,
            "reading": "たけ",
            "meaning": "Bamboo"
        },
        "糸": {
            "level": 4,
            "reading": "いと",
            "meaning": "Thread"
        },
        "耳": {
            "level": 4,
            "reading": "みみ",
            "meaning": "Ear"
        },
        "虫": {
            "level": 4,
            "reading": "むし",
            "meaning": "Insect"
        },
        "村": {
            "level": 4,
            "reading": "むら",
            "meaning": "Village"
        },
        "男": {
            "level": 4,
            "reading": "ダン",
            "meaning": "Man"
        },
        "町": {
            "level": 4,
            "reading": "チョウ",
            "meaning": "Town"
        },
        "花": {
            "level": 4,
            "reading": "はな",
            "meaning": "Flower"
        },
        "見": {
            "level": 4,
            "reading": "み",
            "meaning": "See"
        },
        "貝": {
            "level": 4,
            "reading": "かい",
            "meaning": "Shellfish"
        },
        "赤": {
            "level": 4,
            "reading": "あか",
            "meaning": "Red"
        },
        "足": {
            "level": 4,
            "reading": "ソク",
            "meaning": "Foot"
        },
        "車": {
            "level": 4,
            "reading": "シャ",
            "meaning": "Car"
        },
        "不": {
            "level": 4,
            "reading": "フ",
            "meaning": "Not"
        },
        "仕": {
            "level": 4,
            "reading": "シ",
            "meaning": "Doing"
        },
        "交": {
            "level": 5,
            "reading": "コウ",
            "meaning": "Mix"
        },
        "会": {
            "level": 5,
            "reading": "カイ",
            "meaning": "Meet"
        },
        "光": {
            "level": 5,
            "reading": "コウ",
            "meaning": "Sunlight"
        },
        "同": {
            "level": 5,
            "reading": "ドウ",
            "meaning": "Same"
        },
        "回": {
            "level": 5,
            "reading": "カイ",
            "meaning": "Times"
        },
        "多": {
            "level": 5,
            "reading": "タ",
            "meaning": "Many"
        },
        "当": {
            "level": 5,
            "reading": "トウ",
            "meaning": "Correct"
        },
        "毎": {
            "level": 5,
            "reading": "マイ",
            "meaning": "Every"
        },
        "池": {
            "level": 8,
            "reading": "チ",
            "meaning": "Pond"
        },
        "米": {
            "level": 5,
            "reading": "ベイ",
            "meaning": "Rice"
        },
        "羽": {
            "level": 5,
            "reading": "はね",
            "meaning": "Feather"
        },
        "考": {
            "level": 5,
            "reading": "コウ",
            "meaning": "Think"
        },
        "肉": {
            "level": 5,
            "reading": "ニク",
            "meaning": "Meat"
        },
        "自": {
            "level": 5,
            "reading": "ジ",
            "meaning": "Self"
        },
        "色": {
            "level": 5,
            "reading": "いろ",
            "meaning": "Color"
        },
        "行": {
            "level": 5,
            "reading": "コウ",
            "meaning": "Go"
        },
        "西": {
            "level": 5,
            "reading": "セイ",
            "meaning": "West"
        },
        "何": {
            "level": 5,
            "reading": "なに",
            "meaning": "What"
        },
        "体": {
            "level": 5,
            "reading": "タイ",
            "meaning": "Body"
        },
        "作": {
            "level": 5,
            "reading": "サク",
            "meaning": "Make"
        },
        "図": {
            "level": 5,
            "reading": "ズ",
            "meaning": "Diagram"
        },
        "声": {
            "level": 5,
            "reading": "こえ",
            "meaning": "Voice"
        },
        "売": {
            "level": 9,
            "reading": "バイ",
            "meaning": "Sell"
        },
        "弟": {
            "level": 5,
            "reading": "ダイ",
            "meaning": "Younger Brother"
        },
        "形": {
            "level": 5,
            "reading": "ケイ",
            "meaning": "Shape"
        },
        "来": {
            "level": 5,
            "reading": "ライ",
            "meaning": "Come"
        },
        "社": {
            "level": 5,
            "reading": "シャ",
            "meaning": "Company"
        },
        "角": {
            "level": 5,
            "reading": "カク",
            "meaning": "Angle"
        },
        "言": {
            "level": 5,
            "reading": "ゲン",
            "meaning": "Say"
        },
        "谷": {
            "level": 5,
            "reading": "たに",
            "meaning": "Valley"
        },
        "走": {
            "level": 5,
            "reading": "ソウ",
            "meaning": "Run"
        },
        "近": {
            "level": 5,
            "reading": "キン",
            "meaning": "Near"
        },
        "里": {
            "level": 5,
            "reading": "さと",
            "meaning": "Hometown"
        },
        "麦": {
            "level": 5,
            "reading": "むぎ",
            "meaning": "Wheat"
        },
        "学": {
            "level": 5,
            "reading": "ガク",
            "meaning": "Study"
        },
        "林": {
            "level": 5,
            "reading": "はやし",
            "meaning": "Forest"
        },
        "空": {
            "level": 5,
            "reading": "クウ",
            "meaning": "Sky"
        },
        "金": {
            "level": 5,
            "reading": "キン",
            "meaning": "Gold"
        },
        "雨": {
            "level": 5,
            "reading": "あめ",
            "meaning": "Rain"
        },
        "青": {
            "level": 5,
            "reading": "セイ",
            "meaning": "Blue"
        },
        "草": {
            "level": 5,
            "reading": "くさ",
            "meaning": "Grass"
        },
        "音": {
            "level": 5,
            "reading": "オン",
            "meaning": "Sound"
        },
        "化": {
            "level": 6,
            "reading": "カ",
            "meaning": "Change"
        },
        "地": {
            "level": 6,
            "reading": "チ",
            "meaning": "Earth"
        },
        "両": {
            "level": 6,
            "reading": "リョウ",
            "meaning": "Both"
        },
        "全": {
            "level": 6,
            "reading": "ゼン",
            "meaning": "All"
        },
        "向": {
            "level": 6,
            "reading": "コウ",
            "meaning": "Yonder"
        },
        "安": {
            "level": 6,
            "reading": "アン",
            "meaning": "Relax"
        },
        "州": {
            "level": 6,
            "reading": "シュウ",
            "meaning": "State"
        },
        "曲": {
            "level": 6,
            "reading": "キョク",
            "meaning": "Music"
        },
        "有": {
            "level": 6,
            "reading": "ユウ",
            "meaning": "Have"
        },
        "次": {
            "level": 6,
            "reading": "ジ",
            "meaning": "Next"
        },
        "死": {
            "level": 6,
            "reading": "シ",
            "meaning": "Death"
        },
        "羊": {
            "level": 6,
            "reading": "ヨウ",
            "meaning": "Sheep"
        },
        "血": {
            "level": 6,
            "reading": "ケツ",
            "meaning": "Blood"
        },
        "京": {
            "level": 6,
            "reading": "キョウ",
            "meaning": "Capital"
        },
        "国": {
            "level": 6,
            "reading": "コク",
            "meaning": "Country"
        },
        "夜": {
            "level": 6,
            "reading": "ヤ",
            "meaning": "Night"
        },
        "妹": {
            "level": 6,
            "reading": "マイ",
            "meaning": "Younger Sister"
        },
        "姉": {
            "level": 6,
            "reading": "シ",
            "meaning": "Older Sister"
        },
        "店": {
            "level": 6,
            "reading": "テン",
            "meaning": "Shop"
        },
        "明": {
            "level": 6,
            "reading": "メイ",
            "meaning": "Bright"
        },
        "東": {
            "level": 6,
            "reading": "トウ",
            "meaning": "East"
        },
        "歩": {
            "level": 6,
            "reading": "ホ",
            "meaning": "Walk"
        },
        "画": {
            "level": 6,
            "reading": "ガ",
            "meaning": "Drawing"
        },
        "直": {
            "level": 6,
            "reading": "チョク",
            "meaning": "Fix"
        },
        "知": {
            "level": 6,
            "reading": "チ",
            "meaning": "Know"
        },
        "長": {
            "level": 6,
            "reading": "チョウ",
            "meaning": "Long"
        },
        "前": {
            "level": 6,
            "reading": "ゼン",
            "meaning": "Front"
        },
        "南": {
            "level": 6,
            "reading": "ナン",
            "meaning": "South"
        },
        "室": {
            "level": 6,
            "reading": "シツ",
            "meaning": "Room"
        },
        "後": {
            "level": 6,
            "reading": "ゴ",
            "meaning": "Behind"
        },
        "思": {
            "level": 6,
            "reading": "おも",
            "meaning": "Think"
        },
        "星": {
            "level": 6,
            "reading": "セイ",
            "meaning": "Star"
        },
        "活": {
            "level": 6,
            "reading": "カツ",
            "meaning": "Lively"
        },
        "海": {
            "level": 6,
            "reading": "カイ",
            "meaning": "Sea"
        },
        "点": {
            "level": 6,
            "reading": "テン",
            "meaning": "Point"
        },
        "科": {
            "level": 6,
            "reading": "カ",
            "meaning": "Course"
        },
        "茶": {
            "level": 6,
            "reading": "チャ",
            "meaning": "Tea"
        },
        "食": {
            "level": 6,
            "reading": "ショク",
            "meaning": "Eat"
        },
        "首": {
            "level": 6,
            "reading": "くび",
            "meaning": "Neck"
        },
        "欠": {
            "level": 7,
            "reading": "ケツ",
            "meaning": "Lack"
        },
        "氏": {
            "level": 7,
            "reading": "シ",
            "meaning": "Family Name"
        },
        "由": {
            "level": 7,
            "reading": "ユウ",
            "meaning": "Reason"
        },
        "札": {
            "level": 7,
            "reading": "サツ",
            "meaning": "Bill"
        },
        "民": {
            "level": 7,
            "reading": "ミン",
            "meaning": "Peoples"
        },
        "辺": {
            "level": 7,
            "reading": "ヘン",
            "meaning": "Area"
        },
        "付": {
            "level": 7,
            "reading": "つ",
            "meaning": "Attach"
        },
        "以": {
            "level": 7,
            "reading": "イ",
            "meaning": "From"
        },
        "失": {
            "level": 7,
            "reading": "シツ",
            "meaning": "Fault"
        },
        "必": {
            "level": 7,
            "reading": "ヒツ",
            "meaning": "Certain"
        },
        "未": {
            "level": 7,
            "reading": "ミ",
            "meaning": "Not Yet"
        },
        "末": {
            "level": 7,
            "reading": "マツ",
            "meaning": "End"
        },
        "校": {
            "level": 7,
            "reading": "コウ",
            "meaning": "School"
        },
        "夏": {
            "level": 7,
            "reading": "なつ",
            "meaning": "Summer"
        },
        "家": {
            "level": 7,
            "reading": "カ",
            "meaning": "House"
        },
        "弱": {
            "level": 7,
            "reading": "ジャク",
            "meaning": "Weak"
        },
        "時": {
            "level": 7,
            "reading": "ジ",
            "meaning": "Time"
        },
        "紙": {
            "level": 7,
            "reading": "かみ",
            "meaning": "Paper"
        },
        "記": {
            "level": 7,
            "reading": "キ",
            "meaning": "Write Down"
        },
        "通": {
            "level": 7,
            "reading": "ツウ",
            "meaning": "Pass Through"
        },
        "高": {
            "level": 7,
            "reading": "コウ",
            "meaning": "Tall"
        },
        "強": {
            "level": 7,
            "reading": "キョウ",
            "meaning": "Strong"
        },
        "教": {
            "level": 7,
            "reading": "キョウ",
            "meaning": "Teach"
        },
        "理": {
            "level": 7,
            "reading": "リ",
            "meaning": "Reason"
        },
        "組": {
            "level": 7,
            "reading": "ソ",
            "meaning": "Group"
        },
        "船": {
            "level": 7,
            "reading": "セン",
            "meaning": "Boat"
        },
        "週": {
            "level": 7,
            "reading": "シュウ",
            "meaning": "Week"
        },
        "雪": {
            "level": 7,
            "reading": "ゆき",
            "meaning": "Snow"
        },
        "魚": {
            "level": 7,
            "reading": "ギョ",
            "meaning": "Fish"
        },
        "鳥": {
            "level": 7,
            "reading": "チョウ",
            "meaning": "Bird"
        },
        "黄": {
            "level": 7,
            "reading": "き",
            "meaning": "Yellow"
        },
        "黒": {
            "level": 7,
            "reading": "コク",
            "meaning": "Black"
        },
        "支": {
            "level": 8,
            "reading": "シ",
            "meaning": "Support"
        },
        "住": {
            "level": 8,
            "reading": "ジュウ",
            "meaning": "Dwell"
        },
        "助": {
            "level": 8,
            "reading": "ジョ",
            "meaning": "Help"
        },
        "医": {
            "level": 8,
            "reading": "イ",
            "meaning": "Medicine"
        },
        "君": {
            "level": 8,
            "reading": "クン",
            "meaning": "Buddy"
        },
        "対": {
            "level": 8,
            "reading": "タイ",
            "meaning": "Versus"
        },
        "局": {
            "level": 8,
            "reading": "キョク",
            "meaning": "Bureau"
        },
        "役": {
            "level": 8,
            "reading": "ヤク",
            "meaning": "Service"
        },
        "投": {
            "level": 8,
            "reading": "トウ",
            "meaning": "Throw"
        },
        "決": {
            "level": 8,
            "reading": "ケツ",
            "meaning": "Decide"
        },
        "究": {
            "level": 8,
            "reading": "キュウ",
            "meaning": "Research"
        },
        "身": {
            "level": 8,
            "reading": "シン",
            "meaning": "Somebody"
        },
        "者": {
            "level": 8,
            "reading": "シャ",
            "meaning": "Someone"
        },
        "研": {
            "level": 8,
            "reading": "ケン",
            "meaning": "Sharpen"
        },
        "馬": {
            "level": 8,
            "reading": "バ",
            "meaning": "Horse"
        },
        "森": {
            "level": 8,
            "reading": "もり",
            "meaning": "Forest"
        },
        "場": {
            "level": 8,
            "reading": "ジョウ",
            "meaning": "Location"
        },
        "朝": {
            "level": 8,
            "reading": "あさ",
            "meaning": "Morning"
        },
        "番": {
            "level": 8,
            "reading": "バン",
            "meaning": "Number In A Series"
        },
        "答": {
            "level": 8,
            "reading": "こた",
            "meaning": "Answer"
        },
        "絵": {
            "level": 8,
            "reading": "エ",
            "meaning": "Drawing"
        },
        "買": {
            "level": 8,
            "reading": "か",
            "meaning": "Buy"
        },
        "道": {
            "level": 8,
            "reading": "ドウ",
            "meaning": "Road"
        },
        "間": {
            "level": 8,
            "reading": "カン",
            "meaning": "Interval"
        },
        "雲": {
            "level": 8,
            "reading": "くも",
            "meaning": "Cloud"
        },
        "数": {
            "level": 8,
            "reading": "スウ",
            "meaning": "Count"
        },
        "楽": {
            "level": 8,
            "reading": "ラク",
            "meaning": "Comfort"
        },
        "話": {
            "level": 8,
            "reading": "ワ",
            "meaning": "Talk"
        },
        "電": {
            "level": 8,
            "reading": "デン",
            "meaning": "Electricity"
        },
        "所": {
            "level": 8,
            "reading": "ショ",
            "meaning": "Place"
        },
        "事": {
            "level": 9,
            "reading": "ジ",
            "meaning": "Action"
        },
        "使": {
            "level": 9,
            "reading": "シ",
            "meaning": "Use"
        },
        "具": {
            "level": 9,
            "reading": "グ",
            "meaning": "Tool"
        },
        "受": {
            "level": 9,
            "reading": "ジュ",
            "meaning": "Accept"
        },
        "和": {
            "level": 9,
            "reading": "ワ",
            "meaning": "Peace"
        },
        "始": {
            "level": 10,
            "reading": "シ",
            "meaning": "Begin"
        },
        "定": {
            "level": 9,
            "reading": "テイ",
            "meaning": "Determine"
        },
        "実": {
            "level": 9,
            "reading": "ジツ",
            "meaning": "Truth"
        },
        "服": {
            "level": 9,
            "reading": "フク",
            "meaning": "Clothes"
        },
        "泳": {
            "level": 9,
            "reading": "およ",
            "meaning": "Swim"
        },
        "物": {
            "level": 9,
            "reading": "ブツ",
            "meaning": "Thing"
        },
        "苦": {
            "level": 9,
            "reading": "ク",
            "meaning": "Suffering"
        },
        "表": {
            "level": 9,
            "reading": "ヒョウ",
            "meaning": "Express"
        },
        "部": {
            "level": 9,
            "reading": "ブ",
            "meaning": "Part"
        },
        "乗": {
            "level": 9,
            "reading": "の",
            "meaning": "Ride"
        },
        "客": {
            "level": 9,
            "reading": "キャク",
            "meaning": "Guest"
        },
        "屋": {
            "level": 9,
            "reading": "や",
            "meaning": "Roof"
        },
        "度": {
            "level": 9,
            "reading": "ド",
            "meaning": "Degree"
        },
        "待": {
            "level": 12,
            "reading": "タイ",
            "meaning": "Wait"
        },
        "持": {
            "level": 9,
            "reading": "ジ",
            "meaning": "Hold"
        },
        "界": {
            "level": 9,
            "reading": "カイ",
            "meaning": "World"
        },
        "発": {
            "level": 9,
            "reading": "ハツ",
            "meaning": "Departure"
        },
        "相": {
            "level": 9,
            "reading": "ソウ",
            "meaning": "Mutual"
        },
        "県": {
            "level": 9,
            "reading": "ケン",
            "meaning": "Prefecture"
        },
        "美": {
            "level": 9,
            "reading": "ビ",
            "meaning": "Beauty"
        },
        "負": {
            "level": 9,
            "reading": "フ",
            "meaning": "Lose"
        },
        "送": {
            "level": 9,
            "reading": "ソウ",
            "meaning": "Send"
        },
        "重": {
            "level": 9,
            "reading": "ジュウ",
            "meaning": "Heavy"
        },
        "談": {
            "level": 9,
            "reading": "ダン",
            "meaning": "Discuss"
        },
        "要": {
            "level": 9,
            "reading": "ヨウ",
            "meaning": "Need"
        },
        "勝": {
            "level": 9,
            "reading": "ショウ",
            "meaning": "Win"
        },
        "仮": {
            "level": 9,
            "reading": "カ",
            "meaning": "Temporary"
        },
        "起": {
            "level": 10,
            "reading": "お",
            "meaning": "Wake Up"
        },
        "速": {
            "level": 10,
            "reading": "ソク",
            "meaning": "Fast"
        },
        "配": {
            "level": 10,
            "reading": "ハイ",
            "meaning": "Distribute"
        },
        "酒": {
            "level": 10,
            "reading": "シュ",
            "meaning": "Alcohol"
        },
        "院": {
            "level": 10,
            "reading": "イン",
            "meaning": "Institution"
        },
        "終": {
            "level": 10,
            "reading": "シュウ",
            "meaning": "End"
        },
        "習": {
            "level": 10,
            "reading": "シュウ",
            "meaning": "Learn"
        },
        "転": {
            "level": 10,
            "reading": "テン",
            "meaning": "Revolve"
        },
        "進": {
            "level": 10,
            "reading": "シン",
            "meaning": "Advance"
        },
        "落": {
            "level": 10,
            "reading": "ラク",
            "meaning": "Fall"
        },
        "葉": {
            "level": 10,
            "reading": "は",
            "meaning": "Leaf"
        },
        "軽": {
            "level": 10,
            "reading": "かる",
            "meaning": "Lightweight"
        },
        "運": {
            "level": 10,
            "reading": "ウン",
            "meaning": "Carry"
        },
        "開": {
            "level": 10,
            "reading": "カイ",
            "meaning": "Open"
        },
        "集": {
            "level": 10,
            "reading": "シュウ",
            "meaning": "Collect"
        },
        "飲": {
            "level": 10,
            "reading": "の",
            "meaning": "Drink"
        },
        "業": {
            "level": 10,
            "reading": "ギョウ",
            "meaning": "Business"
        },
        "漢": {
            "level": 10,
            "reading": "カン",
            "meaning": "Chinese"
        },
        "路": {
            "level": 10,
            "reading": "ロ",
            "meaning": "Road"
        },
        "農": {
            "level": 10,
            "reading": "ノウ",
            "meaning": "Farming"
        },
        "鉄": {
            "level": 10,
            "reading": "テツ",
            "meaning": "Iron"
        },
        "歌": {
            "level": 10,
            "reading": "カ",
            "meaning": "Song"
        },
        "算": {
            "level": 10,
            "reading": "サン",
            "meaning": "Calculate"
        },
        "聞": {
            "level": 10,
            "reading": "ブン",
            "meaning": "Hear"
        },
        "語": {
            "level": 10,
            "reading": "ゴ",
            "meaning": "Language"
        },
        "読": {
            "level": 10,
            "reading": "よ",
            "meaning": "Read"
        },
        "鳴": {
            "level": 10,
            "reading": "な",
            "meaning": "Chirp"
        },
        "線": {
            "level": 10,
            "reading": "セン",
            "meaning": "Line"
        },
        "横": {
            "level": 10,
            "reading": "よこ",
            "meaning": "Side"
        },
        "調": {
            "level": 10,
            "reading": "チョウ",
            "meaning": "Investigate"
        },
        "親": {
            "level": 10,
            "reading": "シン",
            "meaning": "Parent"
        },
        "頭": {
            "level": 10,
            "reading": "あたま",
            "meaning": "Head"
        },
        "顔": {
            "level": 10,
            "reading": "かお",
            "meaning": "Face"
        },
        "病": {
            "level": 10,
            "reading": "ビョウ",
            "meaning": "Sick"
        },
        "最": {
            "level": 10,
            "reading": "サイ",
            "meaning": "Most"
        },
        "争": {
            "level": 11,
            "reading": "ソウ",
            "meaning": "Conflict"
        },
        "仲": {
            "level": 11,
            "reading": "なか",
            "meaning": "Relationship"
        },
        "伝": {
            "level": 11,
            "reading": "デン",
            "meaning": "Transmit"
        },
        "共": {
            "level": 11,
            "reading": "キョウ",
            "meaning": "Together"
        },
        "好": {
            "level": 11,
            "reading": "コウ",
            "meaning": "Like"
        },
        "成": {
            "level": 11,
            "reading": "セイ",
            "meaning": "Become"
        },
        "老": {
            "level": 11,
            "reading": "ロウ",
            "meaning": "Elderly"
        },
        "位": {
            "level": 11,
            "reading": "イ",
            "meaning": "Rank"
        },
        "低": {
            "level": 11,
            "reading": "テイ",
            "meaning": "Low"
        },
        "初": {
            "level": 11,
            "reading": "ショ",
            "meaning": "First"
        },
        "別": {
            "level": 11,
            "reading": "ベツ",
            "meaning": "Separate"
        },
        "利": {
            "level": 11,
            "reading": "リ",
            "meaning": "Profit"
        },
        "努": {
            "level": 11,
            "reading": "ド",
            "meaning": "Toil"
        },
        "労": {
            "level": 11,
            "reading": "ロウ",
            "meaning": "Labor"
        },
        "命": {
            "level": 11,
            "reading": "メイ",
            "meaning": "Fate"
        },
        "岸": {
            "level": 11,
            "reading": "ガン",
            "meaning": "Coast"
        },
        "放": {
            "level": 11,
            "reading": "ホウ",
            "meaning": "Release"
        },
        "昔": {
            "level": 11,
            "reading": "むかし",
            "meaning": "Long Ago"
        },
        "波": {
            "level": 11,
            "reading": "ハ",
            "meaning": "Wave"
        },
        "注": {
            "level": 11,
            "reading": "チュウ",
            "meaning": "Pour"
        },
        "育": {
            "level": 11,
            "reading": "イク",
            "meaning": "Nurture"
        },
        "拾": {
            "level": 11,
            "reading": "ひろ",
            "meaning": "Pick Up"
        },
        "指": {
            "level": 11,
            "reading": "シ",
            "meaning": "Finger"
        },
        "洋": {
            "level": 11,
            "reading": "ヨウ",
            "meaning": "Western Style"
        },
        "神": {
            "level": 11,
            "reading": "シン",
            "meaning": "God"
        },
        "秒": {
            "level": 11,
            "reading": "ビョウ",
            "meaning": "Second"
        },
        "級": {
            "level": 11,
            "reading": "キュウ",
            "meaning": "Level"
        },
        "追": {
            "level": 11,
            "reading": "お",
            "meaning": "Follow"
        },
        "戦": {
            "level": 11,
            "reading": "セン",
            "meaning": "War"
        },
        "競": {
            "level": 11,
            "reading": "キョウ",
            "meaning": "Compete"
        },
        "良": {
            "level": 11,
            "reading": "リョウ",
            "meaning": "Good"
        },
        "功": {
            "level": 11,
            "reading": "コウ",
            "meaning": "Achievement"
        },
        "特": {
            "level": 11,
            "reading": "トク",
            "meaning": "Special"
        },
        "便": {
            "level": 11,
            "reading": "ベン",
            "meaning": "Convenience"
        },
        "働": {
            "level": 11,
            "reading": "ドウ",
            "meaning": "Work"
        },
        "令": {
            "level": 11,
            "reading": "レイ",
            "meaning": "Orders"
        },
        "意": {
            "level": 11,
            "reading": "イ",
            "meaning": "Idea"
        },
        "味": {
            "level": 11,
            "reading": "ミ",
            "meaning": "Flavor"
        },
        "勉": {
            "level": 12,
            "reading": "ベン",
            "meaning": "Exertion"
        },
        "庭": {
            "level": 12,
            "reading": "テイ",
            "meaning": "Garden"
        },
        "息": {
            "level": 12,
            "reading": "ソク",
            "meaning": "Breath"
        },
        "旅": {
            "level": 12,
            "reading": "リョ",
            "meaning": "Trip"
        },
        "根": {
            "level": 12,
            "reading": "コン",
            "meaning": "Root"
        },
        "流": {
            "level": 12,
            "reading": "リュウ",
            "meaning": "Stream"
        },
        "消": {
            "level": 12,
            "reading": "ショウ",
            "meaning": "Extinguish"
        },
        "倍": {
            "level": 12,
            "reading": "バイ",
            "meaning": "Double"
        },
        "員": {
            "level": 12,
            "reading": "イン",
            "meaning": "Member"
        },
        "島": {
            "level": 12,
            "reading": "しま",
            "meaning": "Island"
        },
        "祭": {
            "level": 12,
            "reading": "サイ",
            "meaning": "Festival"
        },
        "章": {
            "level": 12,
            "reading": "ショウ",
            "meaning": "Chapter"
        },
        "第": {
            "level": 12,
            "reading": "ダイ",
            "meaning": "Ordinal Number Prefix"
        },
        "都": {
            "level": 12,
            "reading": "ト",
            "meaning": "Metropolis"
        },
        "動": {
            "level": 12,
            "reading": "ドウ",
            "meaning": "Move"
        },
        "商": {
            "level": 12,
            "reading": "ショウ",
            "meaning": "Merchandise"
        },
        "悪": {
            "level": 12,
            "reading": "アク",
            "meaning": "Bad"
        },
        "族": {
            "level": 12,
            "reading": "ゾク",
            "meaning": "Tribe"
        },
        "深": {
            "level": 12,
            "reading": "シン",
            "meaning": "Deep"
        },
        "球": {
            "level": 12,
            "reading": "キュウ",
            "meaning": "Sphere"
        },
        "童": {
            "level": 12,
            "reading": "ドウ",
            "meaning": "Juvenile"
        },
        "陽": {
            "level": 12,
            "reading": "ヨウ",
            "meaning": "Sunshine"
        },
        "階": {
            "level": 12,
            "reading": "カイ",
            "meaning": "Floor"
        },
        "寒": {
            "level": 12,
            "reading": "さむ",
            "meaning": "Cold"
        },
        "悲": {
            "level": 17,
            "reading": "ヒ",
            "meaning": "Sad"
        },
        "暑": {
            "level": 12,
            "reading": "あつ",
            "meaning": "Hot"
        },
        "期": {
            "level": 12,
            "reading": "キ",
            "meaning": "Period Of Time"
        },
        "植": {
            "level": 12,
            "reading": "ショク",
            "meaning": "Plant"
        },
        "歯": {
            "level": 12,
            "reading": "は",
            "meaning": "Tooth"
        },
        "温": {
            "level": 12,
            "reading": "オン",
            "meaning": "Warm"
        },
        "港": {
            "level": 12,
            "reading": "コウ",
            "meaning": "Harbor"
        },
        "湯": {
            "level": 12,
            "reading": "ゆ",
            "meaning": "Hot Water"
        },
        "登": {
            "level": 12,
            "reading": "トウ",
            "meaning": "Climb"
        },
        "着": {
            "level": 12,
            "reading": "チャク",
            "meaning": "Wear"
        },
        "短": {
            "level": 12,
            "reading": "タン",
            "meaning": "Short"
        },
        "野": {
            "level": 12,
            "reading": "ヤ",
            "meaning": "Field"
        },
        "泉": {
            "level": 12,
            "reading": "セン",
            "meaning": "Spring"
        },
        "生": {
            "level": 3,
            "reading": "セイ",
            "meaning": "Life"
        },
        "亡": {
            "level": 6,
            "reading": "ボウ",
            "meaning": "Death"
        },
        "合": {
            "level": 12,
            "reading": "ゴウ",
            "meaning": "Suit"
        },
        "風": {
            "level": 7,
            "reading": "フウ",
            "meaning": "Wind"
        },
        "予": {
            "level": 9,
            "reading": "ヨ",
            "meaning": "Beforehand"
        },
        "反": {
            "level": 8,
            "reading": "ハン",
            "meaning": "Anti"
        },
        "々": {
            "level": 2,
            "reading": "のま",
            "meaning": "Repeater"
        },
        "新": {
            "level": 9,
            "reading": "シン",
            "meaning": "New"
        },
        "返": {
            "level": 9,
            "reading": "ヘン",
            "meaning": "Return"
        },
        "問": {
            "level": 13,
            "reading": "モン",
            "meaning": "Problem"
        },
        "宿": {
            "level": 13,
            "reading": "シュク",
            "meaning": "Lodge"
        },
        "想": {
            "level": 13,
            "reading": "ソウ",
            "meaning": "Concept"
        },
        "感": {
            "level": 13,
            "reading": "カン",
            "meaning": "Feeling"
        },
        "整": {
            "level": 13,
            "reading": "セイ",
            "meaning": "Arrange"
        },
        "暗": {
            "level": 13,
            "reading": "アン",
            "meaning": "Dark"
        },
        "様": {
            "level": 13,
            "reading": "さま",
            "meaning": "Formal Name Title"
        },
        "橋": {
            "level": 13,
            "reading": "はし",
            "meaning": "Bridge"
        },
        "福": {
            "level": 15,
            "reading": "フク",
            "meaning": "Luck"
        },
        "緑": {
            "level": 13,
            "reading": "みどり",
            "meaning": "Green"
        },
        "練": {
            "level": 13,
            "reading": "レン",
            "meaning": "Practice"
        },
        "詩": {
            "level": 13,
            "reading": "シ",
            "meaning": "Poem"
        },
        "銀": {
            "level": 13,
            "reading": "ギン",
            "meaning": "Silver"
        },
        "題": {
            "level": 13,
            "reading": "ダイ",
            "meaning": "Topic"
        },
        "館": {
            "level": 13,
            "reading": "カン",
            "meaning": "Public Building"
        },
        "駅": {
            "level": 13,
            "reading": "エキ",
            "meaning": "Station"
        },
        "億": {
            "level": 13,
            "reading": "オク",
            "meaning": "Hundred Million"
        },
        "器": {
            "level": 13,
            "reading": "キ",
            "meaning": "Container"
        },
        "士": {
            "level": 13,
            "reading": "シ",
            "meaning": "Samurai"
        },
        "料": {
            "level": 13,
            "reading": "リョウ",
            "meaning": "Fee"
        },
        "標": {
            "level": 13,
            "reading": "ヒョウ",
            "meaning": "Signpost"
        },
        "殺": {
            "level": 13,
            "reading": "サツ",
            "meaning": "Kill"
        },
        "然": {
            "level": 13,
            "reading": "ゼン",
            "meaning": "Nature"
        },
        "熱": {
            "level": 13,
            "reading": "ネツ",
            "meaning": "Heat"
        },
        "課": {
            "level": 13,
            "reading": "カ",
            "meaning": "Section"
        },
        "賞": {
            "level": 13,
            "reading": "ショウ",
            "meaning": "Prize"
        },
        "輪": {
            "level": 13,
            "reading": "リン",
            "meaning": "Wheel"
        },
        "選": {
            "level": 13,
            "reading": "セン",
            "meaning": "Choose"
        },
        "鏡": {
            "level": 13,
            "reading": "かがみ",
            "meaning": "Mirror"
        },
        "願": {
            "level": 13,
            "reading": "ガン",
            "meaning": "Request"
        },
        "養": {
            "level": 13,
            "reading": "ヨウ",
            "meaning": "Foster"
        },
        "像": {
            "level": 13,
            "reading": "ゾウ",
            "meaning": "Statue"
        },
        "情": {
            "level": 13,
            "reading": "ジョウ",
            "meaning": "Feeling"
        },
        "謝": {
            "level": 13,
            "reading": "シャ",
            "meaning": "Apologize"
        },
        "映": {
            "level": 13,
            "reading": "エイ",
            "meaning": "Reflect"
        },
        "疑": {
            "level": 13,
            "reading": "ギ",
            "meaning": "Doubt"
        },
        "皆": {
            "level": 13,
            "reading": "みな",
            "meaning": "All"
        },
        "例": {
            "level": 14,
            "reading": "レイ",
            "meaning": "Example"
        },
        "卒": {
            "level": 14,
            "reading": "ソツ",
            "meaning": "Graduate"
        },
        "協": {
            "level": 14,
            "reading": "キョウ",
            "meaning": "Cooperation"
        },
        "参": {
            "level": 14,
            "reading": "サン",
            "meaning": "Participate"
        },
        "周": {
            "level": 14,
            "reading": "シュウ",
            "meaning": "Circumference"
        },
        "囲": {
            "level": 14,
            "reading": "イ",
            "meaning": "Surround"
        },
        "固": {
            "level": 14,
            "reading": "コ",
            "meaning": "Hard"
        },
        "季": {
            "level": 14,
            "reading": "キ",
            "meaning": "Seasons"
        },
        "完": {
            "level": 14,
            "reading": "カン",
            "meaning": "Perfect"
        },
        "希": {
            "level": 14,
            "reading": "キ",
            "meaning": "Wish"
        },
        "念": {
            "level": 14,
            "reading": "ネン",
            "meaning": "Thought"
        },
        "折": {
            "level": 14,
            "reading": "セツ",
            "meaning": "Fold"
        },
        "望": {
            "level": 14,
            "reading": "ボウ",
            "meaning": "Hope"
        },
        "材": {
            "level": 14,
            "reading": "ザイ",
            "meaning": "Lumber"
        },
        "束": {
            "level": 14,
            "reading": "ソク",
            "meaning": "Bundle"
        },
        "松": {
            "level": 14,
            "reading": "まつ",
            "meaning": "Pine"
        },
        "残": {
            "level": 14,
            "reading": "ザン",
            "meaning": "Remainder"
        },
        "求": {
            "level": 10,
            "reading": "キュウ",
            "meaning": "Request"
        },
        "的": {
            "level": 14,
            "reading": "テキ",
            "meaning": "Target"
        },
        "約": {
            "level": 14,
            "reading": "ヤク",
            "meaning": "Promise"
        },
        "芸": {
            "level": 14,
            "reading": "ゲイ",
            "meaning": "Art"
        },
        "基": {
            "level": 14,
            "reading": "キ",
            "meaning": "Foundation"
        },
        "性": {
            "level": 14,
            "reading": "セイ",
            "meaning": "Gender"
        },
        "技": {
            "level": 15,
            "reading": "ギ",
            "meaning": "Skill"
        },
        "格": {
            "level": 14,
            "reading": "カク",
            "meaning": "Status"
        },
        "能": {
            "level": 14,
            "reading": "ノウ",
            "meaning": "Ability"
        },
        "術": {
            "level": 15,
            "reading": "ジュツ",
            "meaning": "Technique"
        },
        "私": {
            "level": 6,
            "reading": "シ",
            "meaning": "I"
        },
        "骨": {
            "level": 14,
            "reading": "コツ",
            "meaning": "Bone"
        },
        "妥": {
            "level": 14,
            "reading": "ダ",
            "meaning": "Gentle"
        },
        "雰": {
            "level": 14,
            "reading": "フン",
            "meaning": "Atmosphere"
        },
        "頑": {
            "level": 14,
            "reading": "ガン",
            "meaning": "Stubborn"
        },
        "寺": {
            "level": 15,
            "reading": "てら",
            "meaning": "Temple"
        },
        "岩": {
            "level": 15,
            "reading": "いわ",
            "meaning": "Boulder"
        },
        "帰": {
            "level": 15,
            "reading": "かえ",
            "meaning": "Return"
        },
        "春": {
            "level": 15,
            "reading": "はる",
            "meaning": "Spring"
        },
        "昼": {
            "level": 15,
            "reading": "ひる",
            "meaning": "Noon"
        },
        "晴": {
            "level": 15,
            "reading": "は",
            "meaning": "Clear Up"
        },
        "秋": {
            "level": 15,
            "reading": "あき",
            "meaning": "Autumn"
        },
        "計": {
            "level": 15,
            "reading": "ケイ",
            "meaning": "Measure"
        },
        "列": {
            "level": 15,
            "reading": "レツ",
            "meaning": "Row"
        },
        "区": {
            "level": 15,
            "reading": "ク",
            "meaning": "District"
        },
        "坂": {
            "level": 15,
            "reading": "さか",
            "meaning": "Slope"
        },
        "式": {
            "level": 15,
            "reading": "シキ",
            "meaning": "Ritual"
        },
        "信": {
            "level": 15,
            "reading": "シン",
            "meaning": "Believe"
        },
        "勇": {
            "level": 15,
            "reading": "ユウ",
            "meaning": "Courage"
        },
        "単": {
            "level": 15,
            "reading": "タン",
            "meaning": "Simple"
        },
        "司": {
            "level": 15,
            "reading": "シ",
            "meaning": "Director"
        },
        "変": {
            "level": 15,
            "reading": "ヘン",
            "meaning": "Change"
        },
        "夫": {
            "level": 15,
            "reading": "フウ",
            "meaning": "Husband"
        },
        "建": {
            "level": 15,
            "reading": "ケン",
            "meaning": "Build"
        },
        "昨": {
            "level": 15,
            "reading": "サク",
            "meaning": "Previous"
        },
        "毒": {
            "level": 15,
            "reading": "ドク",
            "meaning": "Poison"
        },
        "法": {
            "level": 15,
            "reading": "ホウ",
            "meaning": "Method"
        },
        "泣": {
            "level": 15,
            "reading": "な",
            "meaning": "Cry"
        },
        "浅": {
            "level": 15,
            "reading": "あさ",
            "meaning": "Shallow"
        },
        "紀": {
            "level": 15,
            "reading": "キ",
            "meaning": "Account"
        },
        "英": {
            "level": 15,
            "reading": "エイ",
            "meaning": "England"
        },
        "軍": {
            "level": 15,
            "reading": "グン",
            "meaning": "Army"
        },
        "飯": {
            "level": 15,
            "reading": "ハン",
            "meaning": "Meal"
        },
        "仏": {
            "level": 15,
            "reading": "ブツ",
            "meaning": "Buddha"
        },
        "築": {
            "level": 15,
            "reading": "チク",
            "meaning": "Construct"
        },
        "晩": {
            "level": 15,
            "reading": "バン",
            "meaning": "Night"
        },
        "猫": {
            "level": 15,
            "reading": "ねこ",
            "meaning": "Cat"
        },
        "園": {
            "level": 16,
            "reading": "エン",
            "meaning": "Garden"
        },
        "曜": {
            "level": 16,
            "reading": "ヨウ",
            "meaning": "Weekday"
        },
        "書": {
            "level": 16,
            "reading": "ショ",
            "meaning": "Write"
        },
        "遠": {
            "level": 16,
            "reading": "エン",
            "meaning": "Far"
        },
        "門": {
            "level": 16,
            "reading": "モン",
            "meaning": "Gates"
        },
        "係": {
            "level": 16,
            "reading": "ケイ",
            "meaning": "Connection"
        },
        "取": {
            "level": 16,
            "reading": "シュ",
            "meaning": "Take"
        },
        "品": {
            "level": 16,
            "reading": "ヒン",
            "meaning": "Product"
        },
        "守": {
            "level": 16,
            "reading": "ス",
            "meaning": "Protect"
        },
        "幸": {
            "level": 16,
            "reading": "コウ",
            "meaning": "Happiness"
        },
        "急": {
            "level": 16,
            "reading": "キュウ",
            "meaning": "Hurry"
        },
        "真": {
            "level": 16,
            "reading": "シン",
            "meaning": "Reality"
        },
        "箱": {
            "level": 16,
            "reading": "はこ",
            "meaning": "Box"
        },
        "荷": {
            "level": 16,
            "reading": "に",
            "meaning": "Luggage"
        },
        "面": {
            "level": 16,
            "reading": "メン",
            "meaning": "Face"
        },
        "典": {
            "level": 16,
            "reading": "テン",
            "meaning": "Rule"
        },
        "喜": {
            "level": 17,
            "reading": "キ",
            "meaning": "Rejoice"
        },
        "府": {
            "level": 16,
            "reading": "フ",
            "meaning": "Government"
        },
        "治": {
            "level": 16,
            "reading": "ジ",
            "meaning": "Cure"
        },
        "浴": {
            "level": 16,
            "reading": "ヨク",
            "meaning": "Bathe"
        },
        "笑": {
            "level": 16,
            "reading": "わら",
            "meaning": "Laugh"
        },
        "辞": {
            "level": 16,
            "reading": "ジ",
            "meaning": "Quit"
        },
        "関": {
            "level": 16,
            "reading": "カン",
            "meaning": "Related"
        },
        "保": {
            "level": 9,
            "reading": "ホ",
            "meaning": "Preserve"
        },
        "弁": {
            "level": 16,
            "reading": "ベン",
            "meaning": "Dialect"
        },
        "政": {
            "level": 16,
            "reading": "セイ",
            "meaning": "Politics"
        },
        "留": {
            "level": 16,
            "reading": "ル",
            "meaning": "Detain"
        },
        "証": {
            "level": 16,
            "reading": "ショウ",
            "meaning": "Evidence"
        },
        "険": {
            "level": 16,
            "reading": "ケン",
            "meaning": "Risky"
        },
        "危": {
            "level": 16,
            "reading": "キ",
            "meaning": "Dangerous"
        },
        "存": {
            "level": 16,
            "reading": "ソン",
            "meaning": "Exist"
        },
        "専": {
            "level": 16,
            "reading": "セン",
            "meaning": "Specialty"
        },
        "冒": {
            "level": 16,
            "reading": "ボウ",
            "meaning": "Dare"
        },
        "冗": {
            "level": 16,
            "reading": "ジョウ",
            "meaning": "Superfluous"
        },
        "阪": {
            "level": 16,
            "reading": "ハン",
            "meaning": "Heights"
        },
        "原": {
            "level": 17,
            "reading": "ゲン",
            "meaning": "Original"
        },
        "細": {
            "level": 17,
            "reading": "サイ",
            "meaning": "Thin"
        },
        "薬": {
            "level": 17,
            "reading": "ヤク",
            "meaning": "Medicine"
        },
        "鼻": {
            "level": 17,
            "reading": "はな",
            "meaning": "Nose"
        },
        "側": {
            "level": 17,
            "reading": "がわ",
            "meaning": "Side"
        },
        "兵": {
            "level": 17,
            "reading": "ヘイ",
            "meaning": "Soldier"
        },
        "堂": {
            "level": 17,
            "reading": "ドウ",
            "meaning": "Hall"
        },
        "塩": {
            "level": 17,
            "reading": "しお",
            "meaning": "Salt"
        },
        "席": {
            "level": 17,
            "reading": "セキ",
            "meaning": "Seat"
        },
        "敗": {
            "level": 17,
            "reading": "ハイ",
            "meaning": "Failure"
        },
        "果": {
            "level": 17,
            "reading": "カ",
            "meaning": "Fruit"
        },
        "栄": {
            "level": 17,
            "reading": "エイ",
            "meaning": "Prosper"
        },
        "梅": {
            "level": 17,
            "reading": "うめ",
            "meaning": "Ume"
        },
        "無": {
            "level": 17,
            "reading": "ム",
            "meaning": "Nothing"
        },
        "結": {
            "level": 17,
            "reading": "ケツ",
            "meaning": "Bind"
        },
        "因": {
            "level": 17,
            "reading": "イン",
            "meaning": "Cause"
        },
        "常": {
            "level": 17,
            "reading": "ジョウ",
            "meaning": "Normal"
        },
        "識": {
            "level": 17,
            "reading": "シキ",
            "meaning": "Discerning"
        },
        "非": {
            "level": 17,
            "reading": "ヒ",
            "meaning": "Injustice"
        },
        "干": {
            "level": 17,
            "reading": "カン",
            "meaning": "Dry"
        },
        "是": {
            "level": 17,
            "reading": "ゼ",
            "meaning": "Absolutely"
        },
        "渉": {
            "level": 17,
            "reading": "ショウ",
            "meaning": "Ford"
        },
        "虚": {
            "level": 17,
            "reading": "キョ",
            "meaning": "Void"
        },
        "官": {
            "level": 17,
            "reading": "カン",
            "meaning": "Government"
        },
        "察": {
            "level": 17,
            "reading": "サツ",
            "meaning": "Guess"
        },
        "底": {
            "level": 17,
            "reading": "そこ",
            "meaning": "Bottom"
        },
        "愛": {
            "level": 17,
            "reading": "アイ",
            "meaning": "Love"
        },
        "署": {
            "level": 17,
            "reading": "ショ",
            "meaning": "Government Office"
        },
        "警": {
            "level": 17,
            "reading": "ケイ",
            "meaning": "Warn"
        },
        "恋": {
            "level": 17,
            "reading": "レン",
            "meaning": "Romance"
        },
        "覚": {
            "level": 17,
            "reading": "カク",
            "meaning": "Memorize"
        },
        "説": {
            "level": 17,
            "reading": "セツ",
            "meaning": "Theory"
        },
        "幻": {
            "level": 17,
            "reading": "ゲン",
            "meaning": "Illusion"
        },
        "訓": {
            "level": 18,
            "reading": "クン",
            "meaning": "Instruction"
        },
        "試": {
            "level": 9,
            "reading": "シ",
            "meaning": "Try"
        },
        "弓": {
            "level": 18,
            "reading": "キュウ",
            "meaning": "Bow"
        },
        "告": {
            "level": 18,
            "reading": "コク",
            "meaning": "Announce"
        },
        "種": {
            "level": 18,
            "reading": "シュ",
            "meaning": "Kind"
        },
        "達": {
            "level": 18,
            "reading": "タツ",
            "meaning": "Attain"
        },
        "類": {
            "level": 18,
            "reading": "ルイ",
            "meaning": "Type"
        },
        "報": {
            "level": 18,
            "reading": "ホウ",
            "meaning": "News"
        },
        "祈": {
            "level": 18,
            "reading": "キ",
            "meaning": "Pray"
        },
        "等": {
            "level": 18,
            "reading": "トウ",
            "meaning": "Equal"
        },
        "汽": {
            "level": 18,
            "reading": "キ",
            "meaning": "Steam"
        },
        "借": {
            "level": 18,
            "reading": "シャク",
            "meaning": "Borrow"
        },
        "焼": {
            "level": 18,
            "reading": "や",
            "meaning": "Bake"
        },
        "座": {
            "level": 18,
            "reading": "ザ",
            "meaning": "Sit"
        },
        "忘": {
            "level": 18,
            "reading": "ボウ",
            "meaning": "Forget"
        },
        "洗": {
            "level": 18,
            "reading": "セン",
            "meaning": "Wash"
        },
        "胸": {
            "level": 18,
            "reading": "むね",
            "meaning": "Chest"
        },
        "脳": {
            "level": 18,
            "reading": "ノウ",
            "meaning": "Brain"
        },
        "僧": {
            "level": 18,
            "reading": "ソウ",
            "meaning": "Priest"
        },
        "禅": {
            "level": 18,
            "reading": "ゼン",
            "meaning": "Zen"
        },
        "験": {
            "level": 9,
            "reading": "ケン",
            "meaning": "Test"
        },
        "可": {
            "level": 18,
            "reading": "カ",
            "meaning": "Possible"
        },
        "許": {
            "level": 18,
            "reading": "キョ",
            "meaning": "Permit"
        },
        "枚": {
            "level": 18,
            "reading": "マイ",
            "meaning": "Flat Objects Counter"
        },
        "静": {
            "level": 18,
            "reading": "セイ",
            "meaning": "Quiet"
        },
        "句": {
            "level": 18,
            "reading": "ク",
            "meaning": "Paragraph"
        },
        "禁": {
            "level": 18,
            "reading": "キン",
            "meaning": "Prohibit"
        },
        "喫": {
            "level": 18,
            "reading": "キツ",
            "meaning": "Consume"
        },
        "煙": {
            "level": 18,
            "reading": "エン",
            "meaning": "Smoke"
        },
        "加": {
            "level": 19,
            "reading": "カ",
            "meaning": "Add"
        },
        "節": {
            "level": 19,
            "reading": "セツ",
            "meaning": "Season"
        },
        "減": {
            "level": 19,
            "reading": "ゲン",
            "meaning": "Decrease"
        },
        "順": {
            "level": 19,
            "reading": "ジュン",
            "meaning": "Order"
        },
        "容": {
            "level": 19,
            "reading": "ヨウ",
            "meaning": "Form"
        },
        "布": {
            "level": 19,
            "reading": "フ",
            "meaning": "Cloth"
        },
        "易": {
            "level": 19,
            "reading": "イ",
            "meaning": "Easy"
        },
        "財": {
            "level": 19,
            "reading": "サイ",
            "meaning": "Wealth"
        },
        "若": {
            "level": 19,
            "reading": "わか",
            "meaning": "Young"
        },
        "詞": {
            "level": 19,
            "reading": "シ",
            "meaning": "Part Of Speech"
        },
        "昆": {
            "level": 19,
            "reading": "コン",
            "meaning": "Insect"
        },
        "閥": {
            "level": 19,
            "reading": "バツ",
            "meaning": "Clique"
        },
        "歴": {
            "level": 19,
            "reading": "レキ",
            "meaning": "Continuation"
        },
        "舌": {
            "level": 19,
            "reading": "した",
            "meaning": "Tongue"
        },
        "冊": {
            "level": 19,
            "reading": "サツ",
            "meaning": "Book Counter"
        },
        "宇": {
            "level": 19,
            "reading": "ウ",
            "meaning": "Outer Space"
        },
        "宙": {
            "level": 19,
            "reading": "チュウ",
            "meaning": "Midair"
        },
        "忙": {
            "level": 19,
            "reading": "ボウ",
            "meaning": "Busy"
        },
        "履": {
            "level": 19,
            "reading": "リ",
            "meaning": "Boots"
        },
        "団": {
            "level": 19,
            "reading": "ダン",
            "meaning": "Group"
        },
        "暴": {
            "level": 19,
            "reading": "ボウ",
            "meaning": "Violence"
        },
        "混": {
            "level": 19,
            "reading": "コン",
            "meaning": "Mix"
        },
        "乱": {
            "level": 19,
            "reading": "ラン",
            "meaning": "Riot"
        },
        "徒": {
            "level": 19,
            "reading": "ト",
            "meaning": "Junior"
        },
        "得": {
            "level": 19,
            "reading": "トク",
            "meaning": "Acquire"
        },
        "改": {
            "level": 19,
            "reading": "カイ",
            "meaning": "Renew"
        },
        "続": {
            "level": 19,
            "reading": "ゾク",
            "meaning": "Continue"
        },
        "連": {
            "level": 19,
            "reading": "レン",
            "meaning": "Take Along"
        },
        "善": {
            "level": 19,
            "reading": "ゼン",
            "meaning": "Morally Good"
        },
        "困": {
            "level": 20,
            "reading": "コン",
            "meaning": "Distressed"
        },
        "絡": {
            "level": 19,
            "reading": "ラク",
            "meaning": "Entangle"
        },
        "比": {
            "level": 19,
            "reading": "ヒ",
            "meaning": "Compare"
        },
        "災": {
            "level": 20,
            "reading": "サイ",
            "meaning": "Disaster"
        },
        "機": {
            "level": 20,
            "reading": "キ",
            "meaning": "Machine"
        },
        "率": {
            "level": 20,
            "reading": "リツ",
            "meaning": "Percent"
        },
        "飛": {
            "level": 20,
            "reading": "ヒ",
            "meaning": "Fly"
        },
        "害": {
            "level": 20,
            "reading": "ガイ",
            "meaning": "Damage"
        },
        "余": {
            "level": 20,
            "reading": "ヨ",
            "meaning": "Surplus"
        },
        "難": {
            "level": 20,
            "reading": "ナン",
            "meaning": "Difficult"
        },
        "妨": {
            "level": 20,
            "reading": "ボウ",
            "meaning": "Obstruct"
        },
        "被": {
            "level": 20,
            "reading": "ヒ",
            "meaning": "Incur"
        },
        "裕": {
            "level": 20,
            "reading": "ユウ",
            "meaning": "Abundant"
        },
        "震": {
            "level": 20,
            "reading": "シン",
            "meaning": "Earthquake"
        },
        "尻": {
            "level": 20,
            "reading": "しり",
            "meaning": "Butt"
        },
        "尾": {
            "level": 20,
            "reading": "ビ",
            "meaning": "Tail"
        },
        "械": {
            "level": 20,
            "reading": "カイ",
            "meaning": "Contraption"
        },
        "確": {
            "level": 20,
            "reading": "カク",
            "meaning": "Certain"
        },
        "嫌": {
            "level": 20,
            "reading": "ケン",
            "meaning": "Dislike"
        },
        "個": {
            "level": 20,
            "reading": "コ",
            "meaning": "Individual"
        },
        "圧": {
            "level": 20,
            "reading": "アツ",
            "meaning": "Pressure"
        },
        "在": {
            "level": 20,
            "reading": "ザイ",
            "meaning": "Exist"
        },
        "夢": {
            "level": 20,
            "reading": "ム",
            "meaning": "Dream"
        },
        "産": {
            "level": 20,
            "reading": "サン",
            "meaning": "Give Birth"
        },
        "倒": {
            "level": 20,
            "reading": "トウ",
            "meaning": "Overthrow"
        },
        "臭": {
            "level": 20,
            "reading": "くさ",
            "meaning": "Stinking"
        },
        "厚": {
            "level": 20,
            "reading": "あつ",
            "meaning": "Thick"
        },
        "妻": {
            "level": 20,
            "reading": "サイ",
            "meaning": "Wife"
        },
        "議": {
            "level": 20,
            "reading": "ギ",
            "meaning": "Deliberation"
        },
        "犯": {
            "level": 20,
            "reading": "ハン",
            "meaning": "Crime"
        },
        "罪": {
            "level": 20,
            "reading": "ザイ",
            "meaning": "Guilt"
        },
        "防": {
            "level": 20,
            "reading": "ボウ",
            "meaning": "Prevent"
        },
        "穴": {
            "level": 20,
            "reading": "あな",
            "meaning": "Hole"
        },
        "論": {
            "level": 20,
            "reading": "ロン",
            "meaning": "Theory"
        },
        "経": {
            "level": 20,
            "reading": "ケイ",
            "meaning": "Passage of Time"
        },
        "笛": {
            "level": 19,
            "reading": "テキ",
            "meaning": "Flute"
        },
        "史": {
            "level": 19,
            "reading": "シ",
            "meaning": "History"
        },
        "敵": {
            "level": 21,
            "reading": "テキ",
            "meaning": "Enemy"
        },
        "済": {
            "level": 21,
            "reading": "サイ",
            "meaning": "Come To An End"
        },
        "委": {
            "level": 21,
            "reading": "イ",
            "meaning": "Committee"
        },
        "挙": {
            "level": 21,
            "reading": "キョ",
            "meaning": "Raise"
        },
        "判": {
            "level": 21,
            "reading": "ハン",
            "meaning": "Judge"
        },
        "制": {
            "level": 21,
            "reading": "セイ",
            "meaning": "Control"
        },
        "務": {
            "level": 21,
            "reading": "ム",
            "meaning": "Task"
        },
        "査": {
            "level": 21,
            "reading": "サ",
            "meaning": "Inspect"
        },
        "総": {
            "level": 21,
            "reading": "ソウ",
            "meaning": "Whole"
        },
        "設": {
            "level": 21,
            "reading": "セツ",
            "meaning": "Establish"
        },
        "資": {
            "level": 21,
            "reading": "シ",
            "meaning": "Resources"
        },
        "権": {
            "level": 21,
            "reading": "ケン",
            "meaning": "Rights"
        },
        "件": {
            "level": 21,
            "reading": "ケン",
            "meaning": "Matter"
        },
        "派": {
            "level": 21,
            "reading": "ハ",
            "meaning": "Sect"
        },
        "岡": {
            "level": 21,
            "reading": "おか",
            "meaning": "Hill"
        },
        "素": {
            "level": 21,
            "reading": "ソ",
            "meaning": "Element"
        },
        "断": {
            "level": 21,
            "reading": "ダン",
            "meaning": "Cut Off"
        },
        "評": {
            "level": 21,
            "reading": "ヒョウ",
            "meaning": "Evaluate"
        },
        "批": {
            "level": 21,
            "reading": "ヒ",
            "meaning": "Criticism"
        },
        "任": {
            "level": 21,
            "reading": "ニン",
            "meaning": "Duty"
        },
        "検": {
            "level": 21,
            "reading": "ケン",
            "meaning": "Examine"
        },
        "審": {
            "level": 21,
            "reading": "シン",
            "meaning": "Judge"
        },
        "条": {
            "level": 21,
            "reading": "ジョウ",
            "meaning": "Clause"
        },
        "責": {
            "level": 21,
            "reading": "セキ",
            "meaning": "Blame"
        },
        "省": {
            "level": 21,
            "reading": "ショウ",
            "meaning": "Conserve"
        },
        "増": {
            "level": 21,
            "reading": "ゾウ",
            "meaning": "Increase"
        },
        "税": {
            "level": 21,
            "reading": "ゼイ",
            "meaning": "Tax"
        },
        "解": {
            "level": 21,
            "reading": "カイ",
            "meaning": "Untie"
        },
        "際": {
            "level": 21,
            "reading": "サイ",
            "meaning": "Occasion"
        },
        "認": {
            "level": 21,
            "reading": "ニン",
            "meaning": "Recognize"
        },
        "企": {
            "level": 21,
            "reading": "キ",
            "meaning": "Plan"
        },
        "義": {
            "level": 21,
            "reading": "ギ",
            "meaning": "Righteousness"
        },
        "罰": {
            "level": 22,
            "reading": "バツ",
            "meaning": "Penalty"
        },
        "誕": {
            "level": 22,
            "reading": "タン",
            "meaning": "Birth"
        },
        "脱": {
            "level": 22,
            "reading": "ダツ",
            "meaning": "Undress"
        },
        "過": {
            "level": 22,
            "reading": "カ",
            "meaning": "Surpass"
        },
        "坊": {
            "level": 22,
            "reading": "ボウ",
            "meaning": "Monk"
        },
        "寝": {
            "level": 22,
            "reading": "ね",
            "meaning": "Lie Down"
        },
        "宮": {
            "level": 22,
            "reading": "みや",
            "meaning": "Shinto Shrine"
        },
        "各": {
            "level": 22,
            "reading": "カク",
            "meaning": "Each"
        },
        "案": {
            "level": 22,
            "reading": "アン",
            "meaning": "Plan"
        },
        "置": {
            "level": 22,
            "reading": "チ",
            "meaning": "Put"
        },
        "費": {
            "level": 22,
            "reading": "ヒ",
            "meaning": "Expense"
        },
        "価": {
            "level": 22,
            "reading": "カ",
            "meaning": "Value"
        },
        "勢": {
            "level": 22,
            "reading": "セイ",
            "meaning": "Force"
        },
        "営": {
            "level": 22,
            "reading": "エイ",
            "meaning": "Manage"
        },
        "示": {
            "level": 22,
            "reading": "ジ",
            "meaning": "Indicate"
        },
        "統": {
            "level": 22,
            "reading": "トウ",
            "meaning": "Unite"
        },
        "領": {
            "level": 22,
            "reading": "リョウ",
            "meaning": "Territory"
        },
        "策": {
            "level": 22,
            "reading": "サク",
            "meaning": "Plan"
        },
        "藤": {
            "level": 22,
            "reading": "ふじ",
            "meaning": "Wisteria"
        },
        "副": {
            "level": 22,
            "reading": "フク",
            "meaning": "Vice"
        },
        "観": {
            "level": 22,
            "reading": "カン",
            "meaning": "View"
        },
        "値": {
            "level": 22,
            "reading": "チ",
            "meaning": "Value"
        },
        "吸": {
            "level": 22,
            "reading": "キュウ",
            "meaning": "Suck"
        },
        "域": {
            "level": 22,
            "reading": "イキ",
            "meaning": "Region"
        },
        "姿": {
            "level": 22,
            "reading": "シ",
            "meaning": "Figure"
        },
        "応": {
            "level": 22,
            "reading": "オウ",
            "meaning": "Respond"
        },
        "提": {
            "level": 22,
            "reading": "テイ",
            "meaning": "Present"
        },
        "援": {
            "level": 22,
            "reading": "エン",
            "meaning": "Aid"
        },
        "状": {
            "level": 22,
            "reading": "ジョウ",
            "meaning": "Condition"
        },
        "態": {
            "level": 22,
            "reading": "タイ",
            "meaning": "Appearance"
        },
        "賀": {
            "level": 22,
            "reading": "ガ",
            "meaning": "Congratulations"
        },
        "収": {
            "level": 23,
            "reading": "シュウ",
            "meaning": "Obtain"
        },
        "停": {
            "level": 23,
            "reading": "テイ",
            "meaning": "Halt"
        },
        "革": {
            "level": 23,
            "reading": "カク",
            "meaning": "Leather"
        },
        "職": {
            "level": 23,
            "reading": "ショク",
            "meaning": "Employment"
        },
        "鬼": {
            "level": 23,
            "reading": "キ",
            "meaning": "Demon"
        },
        "規": {
            "level": 23,
            "reading": "キ",
            "meaning": "Standard"
        },
        "護": {
            "level": 23,
            "reading": "ゴ",
            "meaning": "Defend"
        },
        "割": {
            "level": 23,
            "reading": "わり",
            "meaning": "Divide"
        },
        "裁": {
            "level": 23,
            "reading": "サイ",
            "meaning": "Judge"
        },
        "崎": {
            "level": 23,
            "reading": "さき",
            "meaning": "Cape"
        },
        "演": {
            "level": 23,
            "reading": "エン",
            "meaning": "Acting"
        },
        "律": {
            "level": 23,
            "reading": "リツ",
            "meaning": "Law"
        },
        "師": {
            "level": 23,
            "reading": "シ",
            "meaning": "Teacher"
        },
        "看": {
            "level": 23,
            "reading": "カン",
            "meaning": "Watch Over"
        },
        "準": {
            "level": 23,
            "reading": "ジュン",
            "meaning": "Standard"
        },
        "則": {
            "level": 23,
            "reading": "ソク",
            "meaning": "Rule"
        },
        "備": {
            "level": 23,
            "reading": "ビ",
            "meaning": "Provide"
        },
        "導": {
            "level": 23,
            "reading": "ドウ",
            "meaning": "Lead"
        },
        "幹": {
            "level": 23,
            "reading": "カン",
            "meaning": "Tree Trunk"
        },
        "張": {
            "level": 23,
            "reading": "チョウ",
            "meaning": "Stretch"
        },
        "優": {
            "level": 23,
            "reading": "ユウ",
            "meaning": "Superior"
        },
        "宅": {
            "level": 23,
            "reading": "タク",
            "meaning": "House"
        },
        "沢": {
            "level": 23,
            "reading": "タク",
            "meaning": "Swamp"
        },
        "贅": {
            "level": 23,
            "reading": "ゼイ",
            "meaning": "Luxury"
        },
        "施": {
            "level": 23,
            "reading": "シ",
            "meaning": "Carry Out"
        },
        "現": {
            "level": 23,
            "reading": "ゲン",
            "meaning": "Present Time"
        },
        "乳": {
            "level": 23,
            "reading": "ニュウ",
            "meaning": "Milk"
        },
        "呼": {
            "level": 23,
            "reading": "よ",
            "meaning": "Call"
        },
        "城": {
            "level": 23,
            "reading": "しろ",
            "meaning": "Castle"
        },
        "俳": {
            "level": 23,
            "reading": "ハイ",
            "meaning": "Haiku"
        },
        "秀": {
            "level": 23,
            "reading": "シュウ",
            "meaning": "Excel"
        },
        "担": {
            "level": 24,
            "reading": "タン",
            "meaning": "Carry"
        },
        "額": {
            "level": 24,
            "reading": "ガク",
            "meaning": "Amount"
        },
        "製": {
            "level": 24,
            "reading": "セイ",
            "meaning": "Manufacture"
        },
        "違": {
            "level": 24,
            "reading": "ちが",
            "meaning": "Different"
        },
        "輸": {
            "level": 24,
            "reading": "ユ",
            "meaning": "Transport"
        },
        "燃": {
            "level": 24,
            "reading": "ネン",
            "meaning": "Burn"
        },
        "祝": {
            "level": 24,
            "reading": "シュク",
            "meaning": "Celebrate"
        },
        "届": {
            "level": 24,
            "reading": "とど",
            "meaning": "Deliver"
        },
        "狭": {
            "level": 24,
            "reading": "せま",
            "meaning": "Narrow"
        },
        "肩": {
            "level": 24,
            "reading": "かた",
            "meaning": "Shoulder"
        },
        "腕": {
            "level": 24,
            "reading": "うで",
            "meaning": "Arm"
        },
        "腰": {
            "level": 24,
            "reading": "こし",
            "meaning": "Waist"
        },
        "触": {
            "level": 24,
            "reading": "ショク",
            "meaning": "Touch"
        },
        "載": {
            "level": 24,
            "reading": "サイ",
            "meaning": "Publish"
        },
        "層": {
            "level": 24,
            "reading": "ソウ",
            "meaning": "Layer"
        },
        "型": {
            "level": 24,
            "reading": "ケイ",
            "meaning": "Model"
        },
        "庁": {
            "level": 24,
            "reading": "チョウ",
            "meaning": "Agency"
        },
        "視": {
            "level": 24,
            "reading": "シ",
            "meaning": "Look At"
        },
        "差": {
            "level": 24,
            "reading": "サ",
            "meaning": "Distinction"
        },
        "管": {
            "level": 24,
            "reading": "カン",
            "meaning": "Pipe"
        },
        "象": {
            "level": 24,
            "reading": "ゾウ",
            "meaning": "Elephant"
        },
        "量": {
            "level": 24,
            "reading": "リョウ",
            "meaning": "Quantity"
        },
        "境": {
            "level": 24,
            "reading": "キョウ",
            "meaning": "Boundary"
        },
        "環": {
            "level": 24,
            "reading": "カン",
            "meaning": "Loop"
        },
        "武": {
            "level": 24,
            "reading": "ブ",
            "meaning": "Military"
        },
        "質": {
            "level": 24,
            "reading": "シツ",
            "meaning": "Quality"
        },
        "述": {
            "level": 24,
            "reading": "ジュツ",
            "meaning": "Mention"
        },
        "供": {
            "level": 24,
            "reading": "キョウ",
            "meaning": "Servant"
        },
        "展": {
            "level": 24,
            "reading": "テン",
            "meaning": "Expand"
        },
        "販": {
            "level": 24,
            "reading": "ハン",
            "meaning": "Sell"
        },
        "株": {
            "level": 24,
            "reading": "かぶ",
            "meaning": "Stocks"
        },
        "限": {
            "level": 25,
            "reading": "ゲン",
            "meaning": "Limit"
        },
        "与": {
            "level": 25,
            "reading": "ヨ",
            "meaning": "Give"
        },
        "含": {
            "level": 25,
            "reading": "ガン",
            "meaning": "Include"
        },
        "影": {
            "level": 25,
            "reading": "エイ",
            "meaning": "Shadow"
        },
        "況": {
            "level": 25,
            "reading": "キョウ",
            "meaning": "Condition"
        },
        "渡": {
            "level": 25,
            "reading": "わた",
            "meaning": "Transit"
        },
        "響": {
            "level": 25,
            "reading": "キョウ",
            "meaning": "Echo"
        },
        "票": {
            "level": 25,
            "reading": "ヒョウ",
            "meaning": "Ballot"
        },
        "景": {
            "level": 25,
            "reading": "ケイ",
            "meaning": "Scene"
        },
        "抜": {
            "level": 25,
            "reading": "ぬ",
            "meaning": "Extract"
        },
        "訴": {
            "level": 25,
            "reading": "ソ",
            "meaning": "Sue"
        },
        "訟": {
            "level": 25,
            "reading": "ショウ",
            "meaning": "Lawsuit"
        },
        "逮": {
            "level": 25,
            "reading": "タイ",
            "meaning": "Apprehend"
        },
        "補": {
            "level": 25,
            "reading": "ホ",
            "meaning": "Supplement"
        },
        "候": {
            "level": 25,
            "reading": "コウ",
            "meaning": "Climate"
        },
        "構": {
            "level": 25,
            "reading": "コウ",
            "meaning": "Set Up"
        },
        "模": {
            "level": 25,
            "reading": "モ",
            "meaning": "Imitation"
        },
        "捕": {
            "level": 25,
            "reading": "ホ",
            "meaning": "Catch"
        },
        "鮮": {
            "level": 25,
            "reading": "セン",
            "meaning": "Fresh"
        },
        "効": {
            "level": 25,
            "reading": "コウ",
            "meaning": "Effective"
        },
        "属": {
            "level": 25,
            "reading": "ゾク",
            "meaning": "Belong"
        },
        "慣": {
            "level": 25,
            "reading": "カン",
            "meaning": "Accustomed"
        },
        "豊": {
            "level": 25,
            "reading": "ホウ",
            "meaning": "Plentiful"
        },
        "満": {
            "level": 25,
            "reading": "マン",
            "meaning": "Full"
        },
        "肥": {
            "level": 25,
            "reading": "ヒ",
            "meaning": "Obese"
        },
        "巻": {
            "level": 25,
            "reading": "カン",
            "meaning": "Scroll"
        },
        "捜": {
            "level": 25,
            "reading": "ソウ",
            "meaning": "Search"
        },
        "絞": {
            "level": 25,
            "reading": "コウ",
            "meaning": "Strangle"
        },
        "輩": {
            "level": 25,
            "reading": "ハイ",
            "meaning": "Comrade"
        },
        "隠": {
            "level": 25,
            "reading": "イン",
            "meaning": "Hide"
        },
        "掛": {
            "level": 25,
            "reading": "か",
            "meaning": "Hang"
        },
        "替": {
            "level": 25,
            "reading": "か",
            "meaning": "Replace"
        },
        "居": {
            "level": 25,
            "reading": "キョ",
            "meaning": "Alive"
        },
        "造": {
            "level": 26,
            "reading": "ゾウ",
            "meaning": "Create"
        },
        "授": {
            "level": 26,
            "reading": "ジュ",
            "meaning": "Instruct"
        },
        "印": {
            "level": 26,
            "reading": "イン",
            "meaning": "Seal"
        },
        "創": {
            "level": 26,
            "reading": "ソウ",
            "meaning": "Create"
        },
        "復": {
            "level": 26,
            "reading": "フク",
            "meaning": "Restore"
        },
        "往": {
            "level": 26,
            "reading": "オウ",
            "meaning": "Journey"
        },
        "較": {
            "level": 26,
            "reading": "カク",
            "meaning": "Contrast"
        },
        "筆": {
            "level": 26,
            "reading": "ヒツ",
            "meaning": "Writing Brush"
        },
        "鉛": {
            "level": 26,
            "reading": "エン",
            "meaning": "Lead"
        },
        "貯": {
            "level": 26,
            "reading": "チョ",
            "meaning": "Savings"
        },
        "故": {
            "level": 26,
            "reading": "コ",
            "meaning": "Circumstance"
        },
        "障": {
            "level": 26,
            "reading": "ショウ",
            "meaning": "Hinder"
        },
        "従": {
            "level": 26,
            "reading": "ジュウ",
            "meaning": "Obey"
        },
        "我": {
            "level": 26,
            "reading": "ガ",
            "meaning": "I"
        },
        "激": {
            "level": 26,
            "reading": "ゲキ",
            "meaning": "Fierce"
        },
        "刺": {
            "level": 26,
            "reading": "シ",
            "meaning": "Stab"
        },
        "励": {
            "level": 26,
            "reading": "レイ",
            "meaning": "Encourage"
        },
        "討": {
            "level": 26,
            "reading": "トウ",
            "meaning": "Chastise"
        },
        "郵": {
            "level": 26,
            "reading": "ユウ",
            "meaning": "Mail"
        },
        "針": {
            "level": 26,
            "reading": "シン",
            "meaning": "Needle"
        },
        "徴": {
            "level": 26,
            "reading": "チョウ",
            "meaning": "Indication"
        },
        "怪": {
            "level": 26,
            "reading": "カイ",
            "meaning": "Suspicious"
        },
        "獣": {
            "level": 26,
            "reading": "ジュウ",
            "meaning": "Beast"
        },
        "突": {
            "level": 26,
            "reading": "トツ",
            "meaning": "Stab"
        },
        "菓": {
            "level": 26,
            "reading": "カ",
            "meaning": "Cake"
        },
        "河": {
            "level": 26,
            "reading": "カ",
            "meaning": "River"
        },
        "振": {
            "level": 26,
            "reading": "シン",
            "meaning": "Shake"
        },
        "汗": {
            "level": 26,
            "reading": "あせ",
            "meaning": "Sweat"
        },
        "豚": {
            "level": 26,
            "reading": "ぶた",
            "meaning": "Pork"
        },
        "再": {
            "level": 26,
            "reading": "サ",
            "meaning": "Again"
        },
        "接": {
            "level": 26,
            "reading": "セツ",
            "meaning": "Adjoin"
        },
        "独": {
            "level": 26,
            "reading": "ドク",
            "meaning": "Alone"
        },
        "占": {
            "level": 26,
            "reading": "セン",
            "meaning": "Fortune"
        },
        "招": {
            "level": 27,
            "reading": "ショウ",
            "meaning": "Beckon"
        },
        "段": {
            "level": 27,
            "reading": "ダン",
            "meaning": "Steps"
        },
        "胃": {
            "level": 27,
            "reading": "イ",
            "meaning": "Stomach"
        },
        "腹": {
            "level": 27,
            "reading": "フク",
            "meaning": "Belly"
        },
        "痛": {
            "level": 27,
            "reading": "ツウ",
            "meaning": "Pain"
        },
        "退": {
            "level": 27,
            "reading": "タイ",
            "meaning": "Retreat"
        },
        "屈": {
            "level": 27,
            "reading": "クツ",
            "meaning": "Yield"
        },
        "悩": {
            "level": 27,
            "reading": "なや",
            "meaning": "Worry"
        },
        "暇": {
            "level": 27,
            "reading": "カ",
            "meaning": "Spare Time"
        },
        "織": {
            "level": 27,
            "reading": "シキ",
            "meaning": "Weave"
        },
        "貸": {
            "level": 27,
            "reading": "か",
            "meaning": "Lend"
        },
        "迷": {
            "level": 27,
            "reading": "メイ",
            "meaning": "Astray"
        },
        "惑": {
            "level": 27,
            "reading": "ワク",
            "meaning": "Misguided"
        },
        "誘": {
            "level": 27,
            "reading": "ユウ",
            "meaning": "Invite"
        },
        "就": {
            "level": 27,
            "reading": "シュウ",
            "meaning": "Settle In"
        },
        "訪": {
            "level": 27,
            "reading": "ホウ",
            "meaning": "Visit"
        },
        "怒": {
            "level": 27,
            "reading": "ド",
            "meaning": "Angry"
        },
        "昇": {
            "level": 27,
            "reading": "ショウ",
            "meaning": "Ascend"
        },
        "眠": {
            "level": 27,
            "reading": "ミン",
            "meaning": "Sleep"
        },
        "睡": {
            "level": 27,
            "reading": "スイ",
            "meaning": "Drowsy"
        },
        "症": {
            "level": 27,
            "reading": "ショウ",
            "meaning": "Symptom"
        },
        "締": {
            "level": 27,
            "reading": "テイ",
            "meaning": "Tighten"
        },
        "迫": {
            "level": 27,
            "reading": "ハク",
            "meaning": "Urge"
        },
        "靴": {
            "level": 27,
            "reading": "くつ",
            "meaning": "Shoes"
        },
        "濃": {
            "level": 27,
            "reading": "ノウ",
            "meaning": "Thick"
        },
        "端": {
            "level": 27,
            "reading": "タン",
            "meaning": "Edge"
        },
        "極": {
            "level": 27,
            "reading": "キョク",
            "meaning": "Extreme"
        },
        "途": {
            "level": 27,
            "reading": "ト",
            "meaning": "Route"
        },
        "健": {
            "level": 27,
            "reading": "ケン",
            "meaning": "Healthy"
        },
        "康": {
            "level": 27,
            "reading": "コウ",
            "meaning": "Ease"
        },
        "郎": {
            "level": 27,
            "reading": "ロウ",
            "meaning": "Guy"
        },
        "給": {
            "level": 27,
            "reading": "キュウ",
            "meaning": "Salary"
        },
        "逆": {
            "level": 28,
            "reading": "ギャク",
            "meaning": "Reverse"
        },
        "巨": {
            "level": 28,
            "reading": "キョ",
            "meaning": "Giant"
        },
        "庫": {
            "level": 28,
            "reading": "コ",
            "meaning": "Storage"
        },
        "児": {
            "level": 28,
            "reading": "ジ",
            "meaning": "Child"
        },
        "冷": {
            "level": 28,
            "reading": "レイ",
            "meaning": "Cool"
        },
        "凍": {
            "level": 28,
            "reading": "トウ",
            "meaning": "Frozen"
        },
        "幼": {
            "level": 28,
            "reading": "ヨウ",
            "meaning": "Infancy"
        },
        "稚": {
            "level": 28,
            "reading": "チ",
            "meaning": "Immature"
        },
        "処": {
            "level": 28,
            "reading": "ショ",
            "meaning": "Deal With"
        },
        "博": {
            "level": 28,
            "reading": "ハク",
            "meaning": "Exhibition"
        },
        "清": {
            "level": 28,
            "reading": "セイ",
            "meaning": "Pure"
        },
        "潔": {
            "level": 28,
            "reading": "ケツ",
            "meaning": "Pure"
        },
        "録": {
            "level": 28,
            "reading": "ロク",
            "meaning": "Record"
        },
        "隊": {
            "level": 28,
            "reading": "タイ",
            "meaning": "Squad"
        },
        "修": {
            "level": 28,
            "reading": "シュウ",
            "meaning": "Discipline"
        },
        "券": {
            "level": 28,
            "reading": "ケン",
            "meaning": "Ticket"
        },
        "婦": {
            "level": 28,
            "reading": "フ",
            "meaning": "Wife"
        },
        "奇": {
            "level": 28,
            "reading": "キ",
            "meaning": "Odd"
        },
        "妙": {
            "level": 28,
            "reading": "ミョウ",
            "meaning": "Strange"
        },
        "麗": {
            "level": 28,
            "reading": "レイ",
            "meaning": "Lovely"
        },
        "微": {
            "level": 28,
            "reading": "ビ",
            "meaning": "Delicate"
        },
        "益": {
            "level": 28,
            "reading": "エキ",
            "meaning": "Benefit"
        },
        "移": {
            "level": 28,
            "reading": "イ",
            "meaning": "Shift"
        },
        "程": {
            "level": 28,
            "reading": "テイ",
            "meaning": "Extent"
        },
        "精": {
            "level": 28,
            "reading": "セイ",
            "meaning": "Spirit"
        },
        "絶": {
            "level": 28,
            "reading": "ゼツ",
            "meaning": "Extinction"
        },
        "並": {
            "level": 28,
            "reading": "ヘイ",
            "meaning": "Line Up"
        },
        "憲": {
            "level": 28,
            "reading": "ケン",
            "meaning": "Constitution"
        },
        "衆": {
            "level": 28,
            "reading": "シュウ",
            "meaning": "Populace"
        },
        "傘": {
            "level": 28,
            "reading": "かさ",
            "meaning": "Umbrella"
        },
        "浜": {
            "level": 28,
            "reading": "はま",
            "meaning": "Beach"
        },
        "撃": {
            "level": 28,
            "reading": "ゲキ",
            "meaning": "Attack"
        },
        "攻": {
            "level": 28,
            "reading": "コウ",
            "meaning": "Aggression"
        },
        "監": {
            "level": 29,
            "reading": "カン",
            "meaning": "Oversee"
        },
        "杯": {
            "level": 29,
            "reading": "ハイ",
            "meaning": "Cup Of Liquid"
        },
        "乾": {
            "level": 29,
            "reading": "カン",
            "meaning": "Dry"
        },
        "催": {
            "level": 29,
            "reading": "サイ",
            "meaning": "Sponsor"
        },
        "促": {
            "level": 29,
            "reading": "ソク",
            "meaning": "Urge"
        },
        "欧": {
            "level": 29,
            "reading": "オウ",
            "meaning": "Europe"
        },
        "江": {
            "level": 29,
            "reading": "え",
            "meaning": "Inlet"
        },
        "請": {
            "level": 29,
            "reading": "セイ",
            "meaning": "Request"
        },
        "雄": {
            "level": 29,
            "reading": "ユウ",
            "meaning": "Male"
        },
        "韓": {
            "level": 29,
            "reading": "カン",
            "meaning": "Korea"
        },
        "壊": {
            "level": 29,
            "reading": "カイ",
            "meaning": "Break"
        },
        "診": {
            "level": 29,
            "reading": "シン",
            "meaning": "Diagnose"
        },
        "閣": {
            "level": 29,
            "reading": "カク",
            "meaning": "The Cabinet"
        },
        "僚": {
            "level": 29,
            "reading": "リョウ",
            "meaning": "Colleague"
        },
        "積": {
            "level": 29,
            "reading": "セキ",
            "meaning": "Accumulate"
        },
        "督": {
            "level": 29,
            "reading": "トク",
            "meaning": "Coach"
        },
        "臣": {
            "level": 29,
            "reading": "シン",
            "meaning": "Servant"
        },
        "略": {
            "level": 29,
            "reading": "リャク",
            "meaning": "Abbreviation"
        },
        "航": {
            "level": 29,
            "reading": "コウ",
            "meaning": "Navigation"
        },
        "寄": {
            "level": 29,
            "reading": "キ",
            "meaning": "Approach"
        },
        "板": {
            "level": 29,
            "reading": "バン",
            "meaning": "Board"
        },
        "街": {
            "level": 29,
            "reading": "ガイ",
            "meaning": "Street"
        },
        "宗": {
            "level": 29,
            "reading": "シュウ",
            "meaning": "Religion"
        },
        "緊": {
            "level": 29,
            "reading": "キン",
            "meaning": "Tense"
        },
        "娘": {
            "level": 29,
            "reading": "むすめ",
            "meaning": "Daughter"
        },
        "宴": {
            "level": 29,
            "reading": "エン",
            "meaning": "Banquet"
        },
        "怖": {
            "level": 29,
            "reading": "フ",
            "meaning": "Scary"
        },
        "恐": {
            "level": 29,
            "reading": "キョウ",
            "meaning": "Fear"
        },
        "添": {
            "level": 29,
            "reading": "テン",
            "meaning": "Append"
        },
        "猛": {
            "level": 29,
            "reading": "モウ",
            "meaning": "Fierce"
        },
        "烈": {
            "level": 29,
            "reading": "レツ",
            "meaning": "Violent"
        },
        "索": {
            "level": 29,
            "reading": "サク",
            "meaning": "Search"
        },
        "詰": {
            "level": 29,
            "reading": "つ",
            "meaning": "Stuffed"
        },
        "詳": {
            "level": 17,
            "reading": "ショウ",
            "meaning": "Detailed"
        },
        "魅": {
            "level": 30,
            "reading": "ミ",
            "meaning": "Alluring"
        },
        "渇": {
            "level": 30,
            "reading": "かわ",
            "meaning": "Dry Up"
        },
        "系": {
            "level": 30,
            "reading": "ケイ",
            "meaning": "Lineage"
        },
        "婚": {
            "level": 30,
            "reading": "コン",
            "meaning": "Marriage"
        },
        "遊": {
            "level": 30,
            "reading": "ユウ",
            "meaning": "Play"
        },
        "旗": {
            "level": 30,
            "reading": "キ",
            "meaning": "Flag"
        },
        "照": {
            "level": 30,
            "reading": "ショウ",
            "meaning": "Illuminate"
        },
        "快": {
            "level": 30,
            "reading": "カイ",
            "meaning": "Pleasant"
        },
        "版": {
            "level": 30,
            "reading": "ハン",
            "meaning": "Edition"
        },
        "貧": {
            "level": 30,
            "reading": "ビン",
            "meaning": "Poor"
        },
        "乏": {
            "level": 30,
            "reading": "ボウ",
            "meaning": "Scarce"
        },
        "適": {
            "level": 30,
            "reading": "テキ",
            "meaning": "Suitable"
        },
        "預": {
            "level": 30,
            "reading": "ヨ",
            "meaning": "Deposit"
        },
        "延": {
            "level": 30,
            "reading": "エン",
            "meaning": "Prolong"
        },
        "翌": {
            "level": 30,
            "reading": "ヨク",
            "meaning": "The Next"
        },
        "覧": {
            "level": 30,
            "reading": "ラン",
            "meaning": "Look At"
        },
        "懐": {
            "level": 30,
            "reading": "なつ",
            "meaning": "Nostalgia"
        },
        "押": {
            "level": 30,
            "reading": "お",
            "meaning": "Push"
        },
        "更": {
            "level": 30,
            "reading": "コウ",
            "meaning": "Again"
        },
        "枕": {
            "level": 30,
            "reading": "まくら",
            "meaning": "Pillow"
        },
        "浮": {
            "level": 30,
            "reading": "う",
            "meaning": "Float"
        },
        "漏": {
            "level": 30,
            "reading": "ロウ",
            "meaning": "Leak"
        },
        "符": {
            "level": 30,
            "reading": "フ",
            "meaning": "Token"
        },
        "購": {
            "level": 30,
            "reading": "コウ",
            "meaning": "Subscription"
        },
        "越": {
            "level": 30,
            "reading": "エツ",
            "meaning": "Go Beyond"
        },
        "飾": {
            "level": 30,
            "reading": "ショク",
            "meaning": "Decorate"
        },
        "騒": {
            "level": 30,
            "reading": "ソウ",
            "meaning": "Boisterous"
        },
        "背": {
            "level": 30,
            "reading": "ハイ",
            "meaning": "Back"
        },
        "撮": {
            "level": 30,
            "reading": "サツ",
            "meaning": "Photograph"
        },
        "盗": {
            "level": 30,
            "reading": "トウ",
            "meaning": "Steal"
        },
        "離": {
            "level": 31,
            "reading": "リ",
            "meaning": "Detach"
        },
        "融": {
            "level": 31,
            "reading": "ユウ",
            "meaning": "Dissolve"
        },
        "編": {
            "level": 31,
            "reading": "ヘン",
            "meaning": "Knit"
        },
        "華": {
            "level": 31,
            "reading": "カ",
            "meaning": "Showy"
        },
        "既": {
            "level": 31,
            "reading": "キ",
            "meaning": "Previously"
        },
        "普": {
            "level": 31,
            "reading": "フ",
            "meaning": "Normal"
        },
        "豪": {
            "level": 31,
            "reading": "ゴウ",
            "meaning": "Exceptional"
        },
        "鑑": {
            "level": 31,
            "reading": "カン",
            "meaning": "Model"
        },
        "除": {
            "level": 31,
            "reading": "ジョ",
            "meaning": "Exclude"
        },
        "尋": {
            "level": 31,
            "reading": "ジン",
            "meaning": "Inquire"
        },
        "幾": {
            "level": 31,
            "reading": "いく",
            "meaning": "How Many"
        },
        "廊": {
            "level": 31,
            "reading": "ロウ",
            "meaning": "Corridor"
        },
        "掃": {
            "level": 31,
            "reading": "ソウ",
            "meaning": "Sweep"
        },
        "泥": {
            "level": 31,
            "reading": "デイ",
            "meaning": "Mud"
        },
        "棒": {
            "level": 31,
            "reading": "ボウ",
            "meaning": "Pole"
        },
        "驚": {
            "level": 31,
            "reading": "キョウ",
            "meaning": "Surprised"
        },
        "嘆": {
            "level": 31,
            "reading": "タン",
            "meaning": "Sigh"
        },
        "倉": {
            "level": 31,
            "reading": "ソウ",
            "meaning": "Warehouse"
        },
        "孫": {
            "level": 31,
            "reading": "ソン",
            "meaning": "Grandchild"
        },
        "巣": {
            "level": 31,
            "reading": "す",
            "meaning": "Nest"
        },
        "帯": {
            "level": 31,
            "reading": "タイ",
            "meaning": "Belt"
        },
        "径": {
            "level": 31,
            "reading": "ケイ",
            "meaning": "Diameter"
        },
        "救": {
            "level": 31,
            "reading": "キュウ",
            "meaning": "Rescue"
        },
        "散": {
            "level": 31,
            "reading": "サン",
            "meaning": "Scatter"
        },
        "粉": {
            "level": 31,
            "reading": "フン",
            "meaning": "Powder"
        },
        "脈": {
            "level": 31,
            "reading": "ミャク",
            "meaning": "Vein"
        },
        "菜": {
            "level": 31,
            "reading": "サイ",
            "meaning": "Vegetable"
        },
        "貨": {
            "level": 31,
            "reading": "カ",
            "meaning": "Freight"
        },
        "陸": {
            "level": 31,
            "reading": "リク",
            "meaning": "Land"
        },
        "似": {
            "level": 31,
            "reading": "に",
            "meaning": "Resemble"
        },
        "均": {
            "level": 31,
            "reading": "キン",
            "meaning": "Equal"
        },
        "墓": {
            "level": 31,
            "reading": "ボ",
            "meaning": "Grave"
        },
        "富": {
            "level": 31,
            "reading": "フ",
            "meaning": "Rich"
        },
        "徳": {
            "level": 31,
            "reading": "トク",
            "meaning": "Virtue"
        },
        "探": {
            "level": 31,
            "reading": "タン",
            "meaning": "Look For"
        },
        "偵": {
            "level": 31,
            "reading": "テイ",
            "meaning": "Spy"
        },
        "綺": {
            "level": 28,
            "reading": "キ",
            "meaning": "Beautiful"
        },
        "序": {
            "level": 32,
            "reading": "ジョ",
            "meaning": "Preface"
        },
        "迎": {
            "level": 32,
            "reading": "ゲイ",
            "meaning": "Welcome"
        },
        "志": {
            "level": 32,
            "reading": "シ",
            "meaning": "Intention"
        },
        "恩": {
            "level": 32,
            "reading": "オン",
            "meaning": "Kindness"
        },
        "採": {
            "level": 32,
            "reading": "サイ",
            "meaning": "Gather"
        },
        "桜": {
            "level": 32,
            "reading": "さくら",
            "meaning": "Sakura"
        },
        "永": {
            "level": 32,
            "reading": "エイ",
            "meaning": "Eternity"
        },
        "液": {
            "level": 32,
            "reading": "エキ",
            "meaning": "Fluid"
        },
        "眼": {
            "level": 32,
            "reading": "ガン",
            "meaning": "Eyeball"
        },
        "祖": {
            "level": 32,
            "reading": "ソ",
            "meaning": "Ancestor"
        },
        "績": {
            "level": 32,
            "reading": "セキ",
            "meaning": "Exploits"
        },
        "興": {
            "level": 32,
            "reading": "キョウ",
            "meaning": "Interest"
        },
        "衛": {
            "level": 32,
            "reading": "エイ",
            "meaning": "Defense"
        },
        "複": {
            "level": 32,
            "reading": "フク",
            "meaning": "Duplicate"
        },
        "雑": {
            "level": 32,
            "reading": "ザツ",
            "meaning": "Random"
        },
        "賛": {
            "level": 32,
            "reading": "サン",
            "meaning": "Agree"
        },
        "酸": {
            "level": 32,
            "reading": "サン",
            "meaning": "Acid"
        },
        "銭": {
            "level": 32,
            "reading": "セン",
            "meaning": "Coin"
        },
        "飼": {
            "level": 32,
            "reading": "か",
            "meaning": "Domesticate"
        },
        "傷": {
            "level": 32,
            "reading": "ショウ",
            "meaning": "Wound"
        },
        "党": {
            "level": 32,
            "reading": "トウ",
            "meaning": "Party"
        },
        "卵": {
            "level": 32,
            "reading": "たまご",
            "meaning": "Egg"
        },
        "厳": {
            "level": 32,
            "reading": "ゲン",
            "meaning": "Strict"
        },
        "捨": {
            "level": 32,
            "reading": "す",
            "meaning": "Throw Away"
        },
        "込": {
            "level": 32,
            "reading": "こ",
            "meaning": "Crowded"
        },
        "密": {
            "level": 32,
            "reading": "ミツ",
            "meaning": "Secrecy"
        },
        "汚": {
            "level": 32,
            "reading": "オ",
            "meaning": "Dirty"
        },
        "欲": {
            "level": 32,
            "reading": "ヨク",
            "meaning": "Want"
        },
        "暖": {
            "level": 32,
            "reading": "ダン",
            "meaning": "Warm"
        },
        "机": {
            "level": 32,
            "reading": "つくえ",
            "meaning": "Desk"
        },
        "秘": {
            "level": 32,
            "reading": "ヒ",
            "meaning": "Secret"
        },
        "訳": {
            "level": 32,
            "reading": "ヤク",
            "meaning": "Translation"
        },
        "染": {
            "level": 32,
            "reading": "セン",
            "meaning": "Dye"
        },
        "簡": {
            "level": 33,
            "reading": "カン",
            "meaning": "Simplicity"
        },
        "閉": {
            "level": 33,
            "reading": "ヘイ",
            "meaning": "Closed"
        },
        "誌": {
            "level": 33,
            "reading": "シ",
            "meaning": "Magazine"
        },
        "窓": {
            "level": 33,
            "reading": "まど",
            "meaning": "Window"
        },
        "否": {
            "level": 33,
            "reading": "ヒ",
            "meaning": "No"
        },
        "筋": {
            "level": 33,
            "reading": "キン",
            "meaning": "Muscle"
        },
        "垂": {
            "level": 33,
            "reading": "スイ",
            "meaning": "Dangle"
        },
        "宝": {
            "level": 4,
            "reading": "ホウ",
            "meaning": "Treasure"
        },
        "宣": {
            "level": 33,
            "reading": "セン",
            "meaning": "Proclaim"
        },
        "尊": {
            "level": 33,
            "reading": "ソン",
            "meaning": "Revered"
        },
        "忠": {
            "level": 33,
            "reading": "チュウ",
            "meaning": "Loyalty"
        },
        "拡": {
            "level": 33,
            "reading": "カク",
            "meaning": "Extend"
        },
        "操": {
            "level": 33,
            "reading": "ソウ",
            "meaning": "Manipulate"
        },
        "敬": {
            "level": 33,
            "reading": "ケイ",
            "meaning": "Respect"
        },
        "暮": {
            "level": 33,
            "reading": "ボ",
            "meaning": "Livelihood"
        },
        "灰": {
            "level": 33,
            "reading": "はい",
            "meaning": "Ash"
        },
        "熟": {
            "level": 33,
            "reading": "ジュク",
            "meaning": "Ripen"
        },
        "異": {
            "level": 33,
            "reading": "イ",
            "meaning": "Differ"
        },
        "皇": {
            "level": 33,
            "reading": "コウ",
            "meaning": "Emperor"
        },
        "盛": {
            "level": 33,
            "reading": "セイ",
            "meaning": "Pile"
        },
        "砂": {
            "level": 33,
            "reading": "サ",
            "meaning": "Sand"
        },
        "漠": {
            "level": 33,
            "reading": "バク",
            "meaning": "Desert"
        },
        "糖": {
            "level": 33,
            "reading": "トウ",
            "meaning": "Sugar"
        },
        "納": {
            "level": 33,
            "reading": "ノウ",
            "meaning": "Supply"
        },
        "肺": {
            "level": 33,
            "reading": "ハイ",
            "meaning": "Lung"
        },
        "著": {
            "level": 33,
            "reading": "チョ",
            "meaning": "Author"
        },
        "蒸": {
            "level": 33,
            "reading": "ジョウ",
            "meaning": "Steam"
        },
        "蔵": {
            "level": 33,
            "reading": "ゾウ",
            "meaning": "Storehouse"
        },
        "装": {
            "level": 33,
            "reading": "ソウ",
            "meaning": "Attire"
        },
        "裏": {
            "level": 33,
            "reading": "うら",
            "meaning": "Backside"
        },
        "諸": {
            "level": 33,
            "reading": "ショ",
            "meaning": "Various"
        },
        "賃": {
            "level": 33,
            "reading": "チン",
            "meaning": "Rent"
        },
        "誤": {
            "level": 34,
            "reading": "ゴ",
            "meaning": "Mistake"
        },
        "臓": {
            "level": 34,
            "reading": "ゾウ",
            "meaning": "Internal Organs"
        },
        "貴": {
            "level": 34,
            "reading": "キ",
            "meaning": "Valuable"
        },
        "降": {
            "level": 34,
            "reading": "コウ",
            "meaning": "Descend"
        },
        "丼": {
            "level": 34,
            "reading": "どん",
            "meaning": "Rice Bowl"
        },
        "吐": {
            "level": 34,
            "reading": "は",
            "meaning": "Throw Up"
        },
        "奴": {
            "level": 34,
            "reading": "ド",
            "meaning": "Dude"
        },
        "隷": {
            "level": 34,
            "reading": "レイ",
            "meaning": "Slave"
        },
        "芋": {
            "level": 34,
            "reading": "いも",
            "meaning": "Potato"
        },
        "縮": {
            "level": 34,
            "reading": "シュク",
            "meaning": "Shrink"
        },
        "純": {
            "level": 34,
            "reading": "ジュン",
            "meaning": "Pure"
        },
        "縦": {
            "level": 34,
            "reading": "たて",
            "meaning": "Vertical"
        },
        "粋": {
            "level": 34,
            "reading": "スイ",
            "meaning": "Stylish"
        },
        "聖": {
            "level": 34,
            "reading": "セイ",
            "meaning": "Holy"
        },
        "磁": {
            "level": 34,
            "reading": "ジ",
            "meaning": "Magnet"
        },
        "紅": {
            "level": 34,
            "reading": "コウ",
            "meaning": "Deep Red"
        },
        "射": {
            "level": 34,
            "reading": "シャ",
            "meaning": "Shoot"
        },
        "幕": {
            "level": 34,
            "reading": "マク",
            "meaning": "Curtain"
        },
        "拝": {
            "level": 34,
            "reading": "ハイ",
            "meaning": "Worship"
        },
        "薦": {
            "level": 34,
            "reading": "セン",
            "meaning": "Recommend"
        },
        "推": {
            "level": 34,
            "reading": "スイ",
            "meaning": "Infer"
        },
        "揮": {
            "level": 34,
            "reading": "キ",
            "meaning": "Brandish"
        },
        "沿": {
            "level": 34,
            "reading": "エン",
            "meaning": "Run Alongside"
        },
        "源": {
            "level": 34,
            "reading": "ゲン",
            "meaning": "Origin"
        },
        "劇": {
            "level": 17,
            "reading": "ゲキ",
            "meaning": "Drama"
        },
        "勤": {
            "level": 34,
            "reading": "キン",
            "meaning": "Work"
        },
        "歓": {
            "level": 34,
            "reading": "カン",
            "meaning": "Delight"
        },
        "承": {
            "level": 34,
            "reading": "ショウ",
            "meaning": "Consent"
        },
        "損": {
            "level": 34,
            "reading": "ソン",
            "meaning": "Loss"
        },
        "枝": {
            "level": 34,
            "reading": "シ",
            "meaning": "Branch"
        },
        "爪": {
            "level": 34,
            "reading": "つめ",
            "meaning": "Claw"
        },
        "豆": {
            "level": 34,
            "reading": "トウ",
            "meaning": "Beans"
        },
        "刻": {
            "level": 34,
            "reading": "コク",
            "meaning": "Carve"
        },
        "腐": {
            "level": 34,
            "reading": "フ",
            "meaning": "Rot"
        },
        "遅": {
            "level": 35,
            "reading": "チ",
            "meaning": "Slow"
        },
        "彫": {
            "level": 35,
            "reading": "チョウ",
            "meaning": "Carve"
        },
        "測": {
            "level": 35,
            "reading": "ソク",
            "meaning": "Measure"
        },
        "破": {
            "level": 35,
            "reading": "ハ",
            "meaning": "Tear"
        },
        "舎": {
            "level": 35,
            "reading": "シャ",
            "meaning": "Cottage"
        },
        "講": {
            "level": 35,
            "reading": "コウ",
            "meaning": "Lecture"
        },
        "滞": {
            "level": 35,
            "reading": "タイ",
            "meaning": "Stagnate"
        },
        "紹": {
            "level": 35,
            "reading": "ショウ",
            "meaning": "Introduce"
        },
        "介": {
            "level": 35,
            "reading": "カイ",
            "meaning": "Jammed In"
        },
        "己": {
            "level": 35,
            "reading": "コ",
            "meaning": "Oneself"
        },
        "厄": {
            "level": 35,
            "reading": "ヤク",
            "meaning": "Unlucky"
        },
        "亀": {
            "level": 35,
            "reading": "かめ",
            "meaning": "Turtle"
        },
        "互": {
            "level": 35,
            "reading": "ゴ",
            "meaning": "Mutual"
        },
        "剣": {
            "level": 35,
            "reading": "ケン",
            "meaning": "Sword"
        },
        "寿": {
            "level": 35,
            "reading": "ジュ",
            "meaning": "Lifespan"
        },
        "彼": {
            "level": 35,
            "reading": "かれ",
            "meaning": "He"
        },
        "恥": {
            "level": 35,
            "reading": "は",
            "meaning": "Shame"
        },
        "杉": {
            "level": 35,
            "reading": "すぎ",
            "meaning": "Cedar"
        },
        "汁": {
            "level": 35,
            "reading": "ジュウ",
            "meaning": "Soup"
        },
        "噌": {
            "level": 35,
            "reading": "ソ",
            "meaning": "Boisterous"
        },
        "炎": {
            "level": 35,
            "reading": "エン",
            "meaning": "Flame"
        },
        "為": {
            "level": 35,
            "reading": "イ",
            "meaning": "Sake"
        },
        "熊": {
            "level": 35,
            "reading": "くま",
            "meaning": "Bear"
        },
        "獄": {
            "level": 35,
            "reading": "ゴク",
            "meaning": "Prison"
        },
        "酔": {
            "level": 35,
            "reading": "スイ",
            "meaning": "Drunk"
        },
        "酢": {
            "level": 35,
            "reading": "す",
            "meaning": "Vinegar"
        },
        "鍋": {
            "level": 35,
            "reading": "なべ",
            "meaning": "Pot"
        },
        "湖": {
            "level": 35,
            "reading": "コ",
            "meaning": "Lake"
        },
        "銅": {
            "level": 35,
            "reading": "ドウ",
            "meaning": "Copper"
        },
        "払": {
            "level": 15,
            "reading": "はら",
            "meaning": "Pay"
        },
        "油": {
            "level": 35,
            "reading": "ユ",
            "meaning": "Oil"
        },
        "醤": {
            "level": 35,
            "reading": "ショウ",
            "meaning": "Soy Sauce"
        },
        "旧": {
            "level": 36,
            "reading": "キュウ",
            "meaning": "Former"
        },
        "姓": {
            "level": 36,
            "reading": "セイ",
            "meaning": "Family Name"
        },
        "貿": {
            "level": 36,
            "reading": "ボウ",
            "meaning": "Trade"
        },
        "将": {
            "level": 36,
            "reading": "ショウ",
            "meaning": "Commander"
        },
        "盟": {
            "level": 36,
            "reading": "メイ",
            "meaning": "Alliance"
        },
        "遺": {
            "level": 36,
            "reading": "イ",
            "meaning": "Leave Behind"
        },
        "伸": {
            "level": 36,
            "reading": "の",
            "meaning": "Stretch"
        },
        "債": {
            "level": 36,
            "reading": "サイ",
            "meaning": "Debt"
        },
        "及": {
            "level": 36,
            "reading": "キュウ",
            "meaning": "Reach"
        },
        "奈": {
            "level": 36,
            "reading": "ナ",
            "meaning": "Nara"
        },
        "幅": {
            "level": 36,
            "reading": "はば",
            "meaning": "Width"
        },
        "廃": {
            "level": 36,
            "reading": "ハイ",
            "meaning": "Obsolete"
        },
        "甘": {
            "level": 36,
            "reading": "あま",
            "meaning": "Sweet"
        },
        "換": {
            "level": 36,
            "reading": "カン",
            "meaning": "Exchange"
        },
        "摘": {
            "level": 36,
            "reading": "テキ",
            "meaning": "Pluck"
        },
        "核": {
            "level": 36,
            "reading": "カク",
            "meaning": "Nucleus"
        },
        "沖": {
            "level": 36,
            "reading": "おき",
            "meaning": "Open Sea"
        },
        "縄": {
            "level": 36,
            "reading": "ジョウ",
            "meaning": "Rope"
        },
        "津": {
            "level": 36,
            "reading": "つ",
            "meaning": "Haven"
        },
        "献": {
            "level": 36,
            "reading": "ケン",
            "meaning": "Offer"
        },
        "療": {
            "level": 36,
            "reading": "リョウ",
            "meaning": "Heal"
        },
        "継": {
            "level": 36,
            "reading": "ケイ",
            "meaning": "Inherit"
        },
        "維": {
            "level": 36,
            "reading": "イ",
            "meaning": "Maintain"
        },
        "舞": {
            "level": 36,
            "reading": "ブ",
            "meaning": "Dance"
        },
        "伎": {
            "level": 36,
            "reading": "キ",
            "meaning": "Deed"
        },
        "踏": {
            "level": 36,
            "reading": "トウ",
            "meaning": "Step"
        },
        "般": {
            "level": 36,
            "reading": "ハン",
            "meaning": "Generally"
        },
        "頼": {
            "level": 36,
            "reading": "ライ",
            "meaning": "Trust"
        },
        "依": {
            "level": 36,
            "reading": "イ",
            "meaning": "Reliant"
        },
        "鹿": {
            "level": 36,
            "reading": "か",
            "meaning": "Deer"
        },
        "諾": {
            "level": 36,
            "reading": "ダク",
            "meaning": "Agreement"
        },
        "牙": {
            "level": 36,
            "reading": "ゲ",
            "meaning": "Fang"
        },
        "跳": {
            "level": 37,
            "reading": "チョウ",
            "meaning": "Hop"
        },
        "昭": {
            "level": 37,
            "reading": "ショウ",
            "meaning": "Shining"
        },
        "漁": {
            "level": 37,
            "reading": "ギョ",
            "meaning": "Fishing"
        },
        "償": {
            "level": 37,
            "reading": "ショウ",
            "meaning": "Reparation"
        },
        "刑": {
            "level": 37,
            "reading": "ケイ",
            "meaning": "Punish"
        },
        "募": {
            "level": 37,
            "reading": "ボ",
            "meaning": "Recruit"
        },
        "執": {
            "level": 37,
            "reading": "シュウ",
            "meaning": "Tenacious"
        },
        "塁": {
            "level": 37,
            "reading": "ルイ",
            "meaning": "Base"
        },
        "崩": {
            "level": 37,
            "reading": "ホウ",
            "meaning": "Crumble"
        },
        "患": {
            "level": 37,
            "reading": "カン",
            "meaning": "Afflicted"
        },
        "戻": {
            "level": 37,
            "reading": "もど",
            "meaning": "Return"
        },
        "抗": {
            "level": 37,
            "reading": "コウ",
            "meaning": "Confront"
        },
        "抵": {
            "level": 37,
            "reading": "テイ",
            "meaning": "Resist"
        },
        "旬": {
            "level": 37,
            "reading": "シュン",
            "meaning": "In Season"
        },
        "湾": {
            "level": 37,
            "reading": "ワン",
            "meaning": "Gulf"
        },
        "爆": {
            "level": 37,
            "reading": "バク",
            "meaning": "Explode"
        },
        "弾": {
            "level": 37,
            "reading": "ダン",
            "meaning": "Bullet"
        },
        "聴": {
            "level": 37,
            "reading": "チョウ",
            "meaning": "Listen"
        },
        "跡": {
            "level": 37,
            "reading": "セキ",
            "meaning": "Traces"
        },
        "遣": {
            "level": 37,
            "reading": "ケン",
            "meaning": "Dispatch"
        },
        "闘": {
            "level": 37,
            "reading": "トウ",
            "meaning": "Struggle"
        },
        "陣": {
            "level": 37,
            "reading": "ジン",
            "meaning": "Army Base"
        },
        "香": {
            "level": 37,
            "reading": "コウ",
            "meaning": "Fragrance"
        },
        "兆": {
            "level": 37,
            "reading": "チョウ",
            "meaning": "Omen"
        },
        "臨": {
            "level": 37,
            "reading": "リン",
            "meaning": "Look To"
        },
        "削": {
            "level": 37,
            "reading": "サク",
            "meaning": "Whittle Down"
        },
        "契": {
            "level": 37,
            "reading": "ケイ",
            "meaning": "Pledge"
        },
        "恵": {
            "level": 37,
            "reading": "エ",
            "meaning": "Favor"
        },
        "抱": {
            "level": 37,
            "reading": "だ",
            "meaning": "Hug"
        },
        "掲": {
            "level": 37,
            "reading": "ケイ",
            "meaning": "Display"
        },
        "狙": {
            "level": 37,
            "reading": "ソ",
            "meaning": "Aim"
        },
        "葬": {
            "level": 37,
            "reading": "ソウ",
            "meaning": "Burial"
        },
        "需": {
            "level": 38,
            "reading": "ジュ",
            "meaning": "Demand"
        },
        "齢": {
            "level": 38,
            "reading": "レイ",
            "meaning": "Age"
        },
        "宜": {
            "level": 38,
            "reading": "よろ",
            "meaning": "Best Regards"
        },
        "繰": {
            "level": 38,
            "reading": "く",
            "meaning": "Spin"
        },
        "避": {
            "level": 38,
            "reading": "ヒ",
            "meaning": "Dodge"
        },
        "妊": {
            "level": 38,
            "reading": "ニン",
            "meaning": "Pregnant"
        },
        "娠": {
            "level": 38,
            "reading": "シン",
            "meaning": "Pregnant"
        },
        "致": {
            "level": 38,
            "reading": "チ",
            "meaning": "Do"
        },
        "刊": {
            "level": 38,
            "reading": "カン",
            "meaning": "Edition"
        },
        "奏": {
            "level": 38,
            "reading": "ソウ",
            "meaning": "Play Music"
        },
        "伴": {
            "level": 38,
            "reading": "ハン",
            "meaning": "Accompany"
        },
        "併": {
            "level": 38,
            "reading": "ヘイ",
            "meaning": "Join"
        },
        "傾": {
            "level": 38,
            "reading": "ケイ",
            "meaning": "Lean"
        },
        "却": {
            "level": 38,
            "reading": "キャク",
            "meaning": "Contrary"
        },
        "奥": {
            "level": 38,
            "reading": "おく",
            "meaning": "Interior"
        },
        "慮": {
            "level": 38,
            "reading": "リョ",
            "meaning": "Consider"
        },
        "懸": {
            "level": 38,
            "reading": "ケン",
            "meaning": "Suspend"
        },
        "房": {
            "level": 38,
            "reading": "ボウ",
            "meaning": "Cluster"
        },
        "扱": {
            "level": 38,
            "reading": "あつか",
            "meaning": "Handle"
        },
        "抑": {
            "level": 38,
            "reading": "ヨク",
            "meaning": "Suppress"
        },
        "択": {
            "level": 38,
            "reading": "タク",
            "meaning": "Select"
        },
        "描": {
            "level": 38,
            "reading": "ビョウ",
            "meaning": "Draw"
        },
        "盤": {
            "level": 38,
            "reading": "バン",
            "meaning": "Tray"
        },
        "称": {
            "level": 38,
            "reading": "ショウ",
            "meaning": "Title"
        },
        "緒": {
            "level": 38,
            "reading": "ショ",
            "meaning": "Together"
        },
        "緩": {
            "level": 38,
            "reading": "ゆる",
            "meaning": "Loose"
        },
        "託": {
            "level": 38,
            "reading": "タク",
            "meaning": "Consign"
        },
        "賄": {
            "level": 38,
            "reading": "ワイ",
            "meaning": "Bribe"
        },
        "賂": {
            "level": 38,
            "reading": "ロ",
            "meaning": "Bribe"
        },
        "贈": {
            "level": 38,
            "reading": "ゾウ",
            "meaning": "Presents"
        },
        "逃": {
            "level": 38,
            "reading": "トウ",
            "meaning": "Escape"
        },
        "還": {
            "level": 38,
            "reading": "カン",
            "meaning": "Send Back"
        },
        "超": {
            "level": 36,
            "reading": "チョウ",
            "meaning": "Ultra"
        },
        "邦": {
            "level": 39,
            "reading": "ホウ",
            "meaning": "Home Country"
        },
        "鈴": {
            "level": 39,
            "reading": "リン",
            "meaning": "Buzzer"
        },
        "阜": {
            "level": 39,
            "reading": "フ",
            "meaning": "Mound"
        },
        "岐": {
            "level": 39,
            "reading": "キ",
            "meaning": "Branch Off"
        },
        "隆": {
            "level": 39,
            "reading": "リュウ",
            "meaning": "Prosperity"
        },
        "雇": {
            "level": 39,
            "reading": "コ",
            "meaning": "Employ"
        },
        "控": {
            "level": 39,
            "reading": "ひか",
            "meaning": "Abstain"
        },
        "壁": {
            "level": 39,
            "reading": "かべ",
            "meaning": "Wall"
        },
        "棋": {
            "level": 39,
            "reading": "キ",
            "meaning": "Chess Piece"
        },
        "渋": {
            "level": 39,
            "reading": "ジュウ",
            "meaning": "Bitter"
        },
        "片": {
            "level": 39,
            "reading": "かた",
            "meaning": "One Sided"
        },
        "群": {
            "level": 39,
            "reading": "グン",
            "meaning": "Flock"
        },
        "仙": {
            "level": 39,
            "reading": "セン",
            "meaning": "Hermit"
        },
        "充": {
            "level": 39,
            "reading": "ジュウ",
            "meaning": "Allocate"
        },
        "免": {
            "level": 39,
            "reading": "メン",
            "meaning": "Excuse"
        },
        "勧": {
            "level": 39,
            "reading": "カン",
            "meaning": "Recommend"
        },
        "圏": {
            "level": 39,
            "reading": "ケン",
            "meaning": "Range"
        },
        "埋": {
            "level": 39,
            "reading": "う",
            "meaning": "Bury"
        },
        "埼": {
            "level": 39,
            "reading": "さい",
            "meaning": "Cape"
        },
        "奪": {
            "level": 39,
            "reading": "うば",
            "meaning": "Rob"
        },
        "御": {
            "level": 39,
            "reading": "ゴ",
            "meaning": "Honorable"
        },
        "慎": {
            "level": 39,
            "reading": "シン",
            "meaning": "Humility"
        },
        "拒": {
            "level": 39,
            "reading": "キョ",
            "meaning": "Refuse"
        },
        "枠": {
            "level": 39,
            "reading": "わく",
            "meaning": "Frame"
        },
        "甲": {
            "level": 39,
            "reading": "コウ",
            "meaning": "Turtle Shell"
        },
        "斐": {
            "level": 39,
            "reading": "イ",
            "meaning": "Patterned"
        },
        "祉": {
            "level": 39,
            "reading": "シ",
            "meaning": "Welfare"
        },
        "稲": {
            "level": 39,
            "reading": "いね",
            "meaning": "Rice Plant"
        },
        "譲": {
            "level": 39,
            "reading": "ジョウ",
            "meaning": "Defer"
        },
        "謙": {
            "level": 39,
            "reading": "ケン",
            "meaning": "Modesty"
        },
        "躍": {
            "level": 39,
            "reading": "ヤク",
            "meaning": "Leap"
        },
        "銃": {
            "level": 39,
            "reading": "ジュウ",
            "meaning": "Gun"
        },
        "項": {
            "level": 39,
            "reading": "コウ",
            "meaning": "Paragraph"
        },
        "鋼": {
            "level": 39,
            "reading": "コウ",
            "meaning": "Steel"
        },
        "顧": {
            "level": 40,
            "reading": "コ",
            "meaning": "Review"
        },
        "駐": {
            "level": 40,
            "reading": "チュウ",
            "meaning": "Resident"
        },
        "駆": {
            "level": 40,
            "reading": "か",
            "meaning": "Gallop"
        },
        "柱": {
            "level": 40,
            "reading": "チュウ",
            "meaning": "Pillar"
        },
        "唱": {
            "level": 40,
            "reading": "ショウ",
            "meaning": "Chant"
        },
        "孝": {
            "level": 40,
            "reading": "コウ",
            "meaning": "Filial Piety"
        },
        "俊": {
            "level": 40,
            "reading": "シュン",
            "meaning": "Genius"
        },
        "兼": {
            "level": 40,
            "reading": "ケン",
            "meaning": "Concurrently"
        },
        "剤": {
            "level": 40,
            "reading": "ザイ",
            "meaning": "Dose"
        },
        "吹": {
            "level": 40,
            "reading": "ふ",
            "meaning": "Blow"
        },
        "堀": {
            "level": 40,
            "reading": "ほり",
            "meaning": "Ditch"
        },
        "巡": {
            "level": 40,
            "reading": "ジュン",
            "meaning": "Patrol"
        },
        "戒": {
            "level": 40,
            "reading": "カイ",
            "meaning": "Commandment"
        },
        "排": {
            "level": 40,
            "reading": "ハイ",
            "meaning": "Reject"
        },
        "携": {
            "level": 40,
            "reading": "ケイ",
            "meaning": "Portable"
        },
        "敏": {
            "level": 40,
            "reading": "ビン",
            "meaning": "Alert"
        },
        "鋭": {
            "level": 40,
            "reading": "エイ",
            "meaning": "Sharp"
        },
        "敷": {
            "level": 40,
            "reading": "しき",
            "meaning": "Spread"
        },
        "殿": {
            "level": 40,
            "reading": "デン",
            "meaning": "Milord"
        },
        "犠": {
            "level": 40,
            "reading": "ギ",
            "meaning": "Sacrifice"
        },
        "獲": {
            "level": 40,
            "reading": "カク",
            "meaning": "Seize"
        },
        "茂": {
            "level": 40,
            "reading": "モ",
            "meaning": "Luxuriant"
        },
        "繁": {
            "level": 40,
            "reading": "ハン",
            "meaning": "Overgrown"
        },
        "頻": {
            "level": 40,
            "reading": "ヒン",
            "meaning": "Frequent"
        },
        "殖": {
            "level": 40,
            "reading": "ショク",
            "meaning": "Multiply"
        },
        "薄": {
            "level": 40,
            "reading": "ハク",
            "meaning": "Dilute"
        },
        "衝": {
            "level": 40,
            "reading": "ショウ",
            "meaning": "Collide"
        },
        "誉": {
            "level": 40,
            "reading": "ヨ",
            "meaning": "Honor"
        },
        "褒": {
            "level": 40,
            "reading": "ホウ",
            "meaning": "Praise"
        },
        "透": {
            "level": 40,
            "reading": "トウ",
            "meaning": "Transparent"
        },
        "隣": {
            "level": 40,
            "reading": "リン",
            "meaning": "Neighbor"
        },
        "雅": {
            "level": 40,
            "reading": "ガ",
            "meaning": "Elegant"
        },
        "遜": {
            "level": 41,
            "reading": "ソン",
            "meaning": "Humble"
        },
        "伺": {
            "level": 41,
            "reading": "うかが",
            "meaning": "Pay Respects"
        },
        "徹": {
            "level": 41,
            "reading": "テツ",
            "meaning": "Penetrate"
        },
        "瀬": {
            "level": 41,
            "reading": "せ",
            "meaning": "Rapids"
        },
        "撤": {
            "level": 41,
            "reading": "テツ",
            "meaning": "Withdrawal"
        },
        "措": {
            "level": 41,
            "reading": "ソ",
            "meaning": "Set Aside"
        },
        "拠": {
            "level": 41,
            "reading": "キョ",
            "meaning": "Based On"
        },
        "儀": {
            "level": 41,
            "reading": "ギ",
            "meaning": "Ceremony"
        },
        "樹": {
            "level": 41,
            "reading": "ジュ",
            "meaning": "Wood"
        },
        "棄": {
            "level": 41,
            "reading": "キ",
            "meaning": "Abandon"
        },
        "虎": {
            "level": 41,
            "reading": "とら",
            "meaning": "Tiger"
        },
        "蛍": {
            "level": 41,
            "reading": "ほたる",
            "meaning": "Firefly"
        },
        "蜂": {
            "level": 41,
            "reading": "はち",
            "meaning": "Bee"
        },
        "酎": {
            "level": 41,
            "reading": "チュウ",
            "meaning": "Sake"
        },
        "蜜": {
            "level": 41,
            "reading": "ミツ",
            "meaning": "Honey"
        },
        "墟": {
            "level": 41,
            "reading": "キョ",
            "meaning": "Ruins"
        },
        "艦": {
            "level": 41,
            "reading": "カン",
            "meaning": "Warship"
        },
        "潜": {
            "level": 41,
            "reading": "セン",
            "meaning": "Conceal"
        },
        "拳": {
            "level": 41,
            "reading": "ケン",
            "meaning": "Fist"
        },
        "炭": {
            "level": 41,
            "reading": "タン",
            "meaning": "Charcoal"
        },
        "畑": {
            "level": 41,
            "reading": "はたけ",
            "meaning": "Field"
        },
        "包": {
            "level": 41,
            "reading": "ホウ",
            "meaning": "Wrap"
        },
        "衣": {
            "level": 41,
            "reading": "イ",
            "meaning": "Clothes"
        },
        "仁": {
            "level": 41,
            "reading": "ジン",
            "meaning": "Humanity"
        },
        "鉱": {
            "level": 41,
            "reading": "コウ",
            "meaning": "Mineral"
        },
        "至": {
            "level": 41,
            "reading": "シ",
            "meaning": "Attain"
        },
        "誠": {
            "level": 41,
            "reading": "セイ",
            "meaning": "Sincerity"
        },
        "郷": {
            "level": 41,
            "reading": "キョウ",
            "meaning": "Hometown"
        },
        "侵": {
            "level": 41,
            "reading": "シン",
            "meaning": "Invade"
        },
        "偽": {
            "level": 41,
            "reading": "ギ",
            "meaning": "Fake"
        },
        "克": {
            "level": 42,
            "reading": "コク",
            "meaning": "Overcome"
        },
        "到": {
            "level": 42,
            "reading": "トウ",
            "meaning": "Arrival"
        },
        "双": {
            "level": 42,
            "reading": "ソウ",
            "meaning": "Pair"
        },
        "哲": {
            "level": 42,
            "reading": "テツ",
            "meaning": "Philosophy"
        },
        "喪": {
            "level": 42,
            "reading": "ソウ",
            "meaning": "Mourning"
        },
        "堅": {
            "level": 42,
            "reading": "かた",
            "meaning": "Solid"
        },
        "床": {
            "level": 42,
            "reading": "ショウ",
            "meaning": "Floor"
        },
        "括": {
            "level": 42,
            "reading": "カツ",
            "meaning": "Fasten"
        },
        "弧": {
            "level": 42,
            "reading": "コ",
            "meaning": "Arc"
        },
        "挑": {
            "level": 42,
            "reading": "チョウ",
            "meaning": "Challenge"
        },
        "掘": {
            "level": 42,
            "reading": "クツ",
            "meaning": "Dig"
        },
        "揚": {
            "level": 42,
            "reading": "あ",
            "meaning": "Hoist"
        },
        "握": {
            "level": 42,
            "reading": "アク",
            "meaning": "Grip"
        },
        "揺": {
            "level": 42,
            "reading": "ヨウ",
            "meaning": "Shake"
        },
        "斎": {
            "level": 42,
            "reading": "サイ",
            "meaning": "Purification"
        },
        "暫": {
            "level": 42,
            "reading": "ザン",
            "meaning": "Temporarily"
        },
        "析": {
            "level": 42,
            "reading": "セキ",
            "meaning": "Analysis"
        },
        "枢": {
            "level": 42,
            "reading": "スウ",
            "meaning": "Hinge"
        },
        "軸": {
            "level": 42,
            "reading": "ジク",
            "meaning": "Axis"
        },
        "柄": {
            "level": 42,
            "reading": "がら",
            "meaning": "Pattern"
        },
        "泊": {
            "level": 42,
            "reading": "ハク",
            "meaning": "Overnight"
        },
        "滑": {
            "level": 42,
            "reading": "カツ",
            "meaning": "Slippery"
        },
        "潟": {
            "level": 42,
            "reading": "かた",
            "meaning": "Lagoon"
        },
        "焦": {
            "level": 42,
            "reading": "ショウ",
            "meaning": "Char"
        },
        "範": {
            "level": 42,
            "reading": "ハン",
            "meaning": "Example"
        },
        "紛": {
            "level": 42,
            "reading": "フン",
            "meaning": "Distract"
        },
        "糾": {
            "level": 42,
            "reading": "キュウ",
            "meaning": "Twist"
        },
        "綱": {
            "level": 42,
            "reading": "つな",
            "meaning": "Cable"
        },
        "網": {
            "level": 42,
            "reading": "モウ",
            "meaning": "Netting"
        },
        "肝": {
            "level": 42,
            "reading": "カン",
            "meaning": "Liver"
        },
        "芝": {
            "level": 42,
            "reading": "しば",
            "meaning": "Lawn"
        },
        "荒": {
            "level": 42,
            "reading": "あ",
            "meaning": "Wild"
        },
        "袋": {
            "level": 42,
            "reading": "ふくろ",
            "meaning": "Sack"
        },
        "誰": {
            "level": 43,
            "reading": "だれ",
            "meaning": "Who"
        },
        "珍": {
            "level": 43,
            "reading": "チン",
            "meaning": "Rare"
        },
        "裂": {
            "level": 43,
            "reading": "レツ",
            "meaning": "Split"
        },
        "襲": {
            "level": 43,
            "reading": "シュウ",
            "meaning": "Attack"
        },
        "貢": {
            "level": 43,
            "reading": "コウ",
            "meaning": "Tribute"
        },
        "趣": {
            "level": 43,
            "reading": "シュ",
            "meaning": "Charm"
        },
        "距": {
            "level": 43,
            "reading": "キョ",
            "meaning": "Distance"
        },
        "籍": {
            "level": 43,
            "reading": "セキ",
            "meaning": "Enroll"
        },
        "露": {
            "level": 43,
            "reading": "ロ",
            "meaning": "Expose"
        },
        "牧": {
            "level": 43,
            "reading": "ボク",
            "meaning": "Pasture"
        },
        "刷": {
            "level": 43,
            "reading": "サツ",
            "meaning": "Printing"
        },
        "朗": {
            "level": 43,
            "reading": "ロウ",
            "meaning": "Bright"
        },
        "潮": {
            "level": 43,
            "reading": "チョウ",
            "meaning": "Tide"
        },
        "即": {
            "level": 43,
            "reading": "ソク",
            "meaning": "Instant"
        },
        "垣": {
            "level": 43,
            "reading": "かき",
            "meaning": "Hedge"
        },
        "威": {
            "level": 43,
            "reading": "イ",
            "meaning": "Majesty"
        },
        "封": {
            "level": 43,
            "reading": "フウ",
            "meaning": "Seal"
        },
        "筒": {
            "level": 43,
            "reading": "トウ",
            "meaning": "Cylinder"
        },
        "岳": {
            "level": 45,
            "reading": "ガク",
            "meaning": "Peak"
        },
        "慰": {
            "level": 43,
            "reading": "イ",
            "meaning": "Consolation"
        },
        "懇": {
            "level": 43,
            "reading": "コン",
            "meaning": "Courteous"
        },
        "懲": {
            "level": 43,
            "reading": "チョウ",
            "meaning": "Chastise"
        },
        "摩": {
            "level": 43,
            "reading": "マ",
            "meaning": "Chafe"
        },
        "擦": {
            "level": 43,
            "reading": "サツ",
            "meaning": "Rub"
        },
        "撲": {
            "level": 43,
            "reading": "ボク",
            "meaning": "Slap"
        },
        "斉": {
            "level": 43,
            "reading": "セイ",
            "meaning": "Simultaneous"
        },
        "旨": {
            "level": 43,
            "reading": "シ",
            "meaning": "Point"
        },
        "柔": {
            "level": 43,
            "reading": "ジュウ",
            "meaning": "Gentle"
        },
        "沈": {
            "level": 43,
            "reading": "チン",
            "meaning": "Sink"
        },
        "沼": {
            "level": 28,
            "reading": "ぬま",
            "meaning": "Bog"
        },
        "泰": {
            "level": 43,
            "reading": "タイ",
            "meaning": "Peace"
        },
        "滅": {
            "level": 43,
            "reading": "メツ",
            "meaning": "Destroy"
        },
        "滋": {
            "level": 43,
            "reading": "ジ",
            "meaning": "Nourishing"
        },
        "炉": {
            "level": 43,
            "reading": "ロ",
            "meaning": "Furnace"
        },
        "琴": {
            "level": 43,
            "reading": "こと",
            "meaning": "Harp"
        },
        "寸": {
            "level": 44,
            "reading": "スン",
            "meaning": "Measurement"
        },
        "竜": {
            "level": 44,
            "reading": "リュウ",
            "meaning": "Dragon"
        },
        "縁": {
            "level": 44,
            "reading": "エン",
            "meaning": "Edge"
        },
        "翼": {
            "level": 44,
            "reading": "ヨク",
            "meaning": "Wing"
        },
        "吉": {
            "level": 44,
            "reading": "キツ",
            "meaning": "Good Luck"
        },
        "刃": {
            "level": 44,
            "reading": "は",
            "meaning": "Blade"
        },
        "忍": {
            "level": 44,
            "reading": "ニン",
            "meaning": "Endure"
        },
        "桃": {
            "level": 44,
            "reading": "もも",
            "meaning": "Peach"
        },
        "辛": {
            "level": 44,
            "reading": "シン",
            "meaning": "Spicy"
        },
        "謎": {
            "level": 44,
            "reading": "なぞ",
            "meaning": "Riddle"
        },
        "侍": {
            "level": 44,
            "reading": "さむらい",
            "meaning": "Samurai"
        },
        "俺": {
            "level": 44,
            "reading": "おれ",
            "meaning": "I"
        },
        "叱": {
            "level": 44,
            "reading": "しか",
            "meaning": "Scold"
        },
        "娯": {
            "level": 44,
            "reading": "ゴ",
            "meaning": "Recreation"
        },
        "斗": {
            "level": 44,
            "reading": "ト",
            "meaning": "Ladle"
        },
        "朱": {
            "level": 44,
            "reading": "シュ",
            "meaning": "Vermilion"
        },
        "丘": {
            "level": 44,
            "reading": "キュウ",
            "meaning": "Hill"
        },
        "梨": {
            "level": 44,
            "reading": "なし",
            "meaning": "Pear"
        },
        "僕": {
            "level": 12,
            "reading": "ボク",
            "meaning": "I"
        },
        "匹": {
            "level": 15,
            "reading": "ひき",
            "meaning": "Small Animal"
        },
        "叫": {
            "level": 44,
            "reading": "キョウ",
            "meaning": "Shout"
        },
        "釣": {
            "level": 44,
            "reading": "つ",
            "meaning": "Fishing"
        },
        "髪": {
            "level": 44,
            "reading": "かみ",
            "meaning": "Hair"
        },
        "嵐": {
            "level": 44,
            "reading": "あらし",
            "meaning": "Storm"
        },
        "笠": {
            "level": 44,
            "reading": "かさ",
            "meaning": "Conical Hat"
        },
        "涙": {
            "level": 44,
            "reading": "ルイ",
            "meaning": "Teardrop"
        },
        "缶": {
            "level": 44,
            "reading": "カン",
            "meaning": "Can"
        },
        "姫": {
            "level": 44,
            "reading": "ひめ",
            "meaning": "Princess"
        },
        "棚": {
            "level": 23,
            "reading": "たな",
            "meaning": "Shelf"
        },
        "粒": {
            "level": 44,
            "reading": "リュウ",
            "meaning": "Grains"
        },
        "砲": {
            "level": 44,
            "reading": "ホウ",
            "meaning": "Cannon"
        },
        "雷": {
            "level": 44,
            "reading": "ライ",
            "meaning": "Thunder"
        },
        "芽": {
            "level": 44,
            "reading": "め",
            "meaning": "Sprout"
        },
        "塔": {
            "level": 44,
            "reading": "トウ",
            "meaning": "Tower"
        },
        "澄": {
            "level": 45,
            "reading": "す",
            "meaning": "Lucidity"
        },
        "矛": {
            "level": 45,
            "reading": "ム",
            "meaning": "Spear"
        },
        "肌": {
            "level": 45,
            "reading": "はだ",
            "meaning": "Skin"
        },
        "舟": {
            "level": 45,
            "reading": "ふね",
            "meaning": "Boat"
        },
        "鐘": {
            "level": 45,
            "reading": "ショウ",
            "meaning": "Bell"
        },
        "凶": {
            "level": 45,
            "reading": "キョウ",
            "meaning": "Villain"
        },
        "塊": {
            "level": 45,
            "reading": "かたまり",
            "meaning": "Lump"
        },
        "狩": {
            "level": 45,
            "reading": "か",
            "meaning": "Hunt"
        },
        "頃": {
            "level": 45,
            "reading": "ころ",
            "meaning": "Approximate"
        },
        "魂": {
            "level": 45,
            "reading": "コン",
            "meaning": "Soul"
        },
        "脚": {
            "level": 45,
            "reading": "キャク",
            "meaning": "Leg"
        },
        "也": {
            "level": 45,
            "reading": "なり",
            "meaning": "Considerably"
        },
        "井": {
            "level": 45,
            "reading": "ショウ",
            "meaning": "Well"
        },
        "呪": {
            "level": 45,
            "reading": "のろ",
            "meaning": "Curse"
        },
        "嬢": {
            "level": 45,
            "reading": "ジョウ",
            "meaning": "Miss"
        },
        "暦": {
            "level": 45,
            "reading": "レキ",
            "meaning": "Calendar"
        },
        "曇": {
            "level": 45,
            "reading": "くも",
            "meaning": "Cloudy"
        },
        "眺": {
            "level": 45,
            "reading": "チョウ",
            "meaning": "Stare"
        },
        "裸": {
            "level": 45,
            "reading": "ラ",
            "meaning": "Naked"
        },
        "賭": {
            "level": 45,
            "reading": "か",
            "meaning": "Gamble"
        },
        "疲": {
            "level": 45,
            "reading": "ヒ",
            "meaning": "Exhausted"
        },
        "塾": {
            "level": 45,
            "reading": "ジュク",
            "meaning": "Cram School"
        },
        "卓": {
            "level": 45,
            "reading": "タク",
            "meaning": "Table"
        },
        "磨": {
            "level": 45,
            "reading": "みが",
            "meaning": "Polish"
        },
        "菌": {
            "level": 45,
            "reading": "キン",
            "meaning": "Bacteria"
        },
        "陰": {
            "level": 45,
            "reading": "イン",
            "meaning": "Shade"
        },
        "霊": {
            "level": 45,
            "reading": "レイ",
            "meaning": "Ghost"
        },
        "湿": {
            "level": 45,
            "reading": "シツ",
            "meaning": "Damp"
        },
        "硬": {
            "level": 45,
            "reading": "コウ",
            "meaning": "Stiff"
        },
        "稼": {
            "level": 45,
            "reading": "カ",
            "meaning": "Earnings"
        },
        "嫁": {
            "level": 45,
            "reading": "よめ",
            "meaning": "Bride"
        },
        "溝": {
            "level": 45,
            "reading": "コウ",
            "meaning": "Gutter"
        },
        "滝": {
            "level": 45,
            "reading": "たき",
            "meaning": "Waterfall"
        },
        "狂": {
            "level": 45,
            "reading": "キョウ",
            "meaning": "Lunatic"
        },
        "翔": {
            "level": 45,
            "reading": "かけ",
            "meaning": "Fly"
        },
        "墨": {
            "level": 46,
            "reading": "すみ",
            "meaning": "Black Ink"
        },
        "鳩": {
            "level": 46,
            "reading": "はと",
            "meaning": "Dove"
        },
        "穏": {
            "level": 46,
            "reading": "オン",
            "meaning": "Calm"
        },
        "鈍": {
            "level": 46,
            "reading": "ドン",
            "meaning": "Dull"
        },
        "魔": {
            "level": 46,
            "reading": "マ",
            "meaning": "Devil"
        },
        "寮": {
            "level": 46,
            "reading": "リョウ",
            "meaning": "Dormitory"
        },
        "盆": {
            "level": 46,
            "reading": "ボン",
            "meaning": "Lantern Festival"
        },
        "棟": {
            "level": 46,
            "reading": "トウ",
            "meaning": "Pillar"
        },
        "吾": {
            "level": 46,
            "reading": "わが",
            "meaning": "I"
        },
        "斬": {
            "level": 46,
            "reading": "ザン",
            "meaning": "Slice"
        },
        "寧": {
            "level": 46,
            "reading": "ネイ",
            "meaning": "Rather"
        },
        "椅": {
            "level": 46,
            "reading": "イ",
            "meaning": "Chair"
        },
        "歳": {
            "level": 46,
            "reading": "サイ",
            "meaning": "Years Old"
        },
        "涼": {
            "level": 46,
            "reading": "リョウ",
            "meaning": "Cool"
        },
        "猿": {
            "level": 46,
            "reading": "さる",
            "meaning": "Monkey"
        },
        "瞳": {
            "level": 46,
            "reading": "ドウ",
            "meaning": "Pupil"
        },
        "鍵": {
            "level": 46,
            "reading": "かぎ",
            "meaning": "Key"
        },
        "零": {
            "level": 46,
            "reading": "レイ",
            "meaning": "Zero"
        },
        "碁": {
            "level": 46,
            "reading": "ゴ",
            "meaning": "Go"
        },
        "租": {
            "level": 46,
            "reading": "ソ",
            "meaning": "Tariff"
        },
        "幽": {
            "level": 46,
            "reading": "ユウ",
            "meaning": "Secluded"
        },
        "泡": {
            "level": 46,
            "reading": "ホウ",
            "meaning": "Bubbles"
        },
        "癖": {
            "level": 46,
            "reading": "くせ",
            "meaning": "Habit"
        },
        "鍛": {
            "level": 46,
            "reading": "タン",
            "meaning": "Forge"
        },
        "錬": {
            "level": 46,
            "reading": "レン",
            "meaning": "Tempering"
        },
        "穂": {
            "level": 46,
            "reading": "ほ",
            "meaning": "Head of Plant"
        },
        "帝": {
            "level": 46,
            "reading": "テイ",
            "meaning": "Sovereign"
        },
        "瞬": {
            "level": 46,
            "reading": "シュン",
            "meaning": "Blink"
        },
        "菊": {
            "level": 46,
            "reading": "キク",
            "meaning": "Chrysanthemum"
        },
        "誇": {
            "level": 46,
            "reading": "コ",
            "meaning": "Pride"
        },
        "庄": {
            "level": 46,
            "reading": "ショウ",
            "meaning": "Manor"
        },
        "阻": {
            "level": 46,
            "reading": "ソ",
            "meaning": "Thwart"
        },
        "黙": {
            "level": 46,
            "reading": "モク",
            "meaning": "Shut Up"
        },
        "俵": {
            "level": 46,
            "reading": "ヒョウ",
            "meaning": "Sack"
        },
        "綿": {
            "level": 46,
            "reading": "メン",
            "meaning": "Cotton"
        },
        "架": {
            "level": 46,
            "reading": "カ",
            "meaning": "Shelf"
        },
        "砕": {
            "level": 47,
            "reading": "サイ",
            "meaning": "Smash"
        },
        "粘": {
            "level": 47,
            "reading": "ネン",
            "meaning": "Sticky"
        },
        "粧": {
            "level": 47,
            "reading": "ショウ",
            "meaning": "Cosmetics"
        },
        "欺": {
            "level": 47,
            "reading": "ギ",
            "meaning": "Deceit"
        },
        "詐": {
            "level": 47,
            "reading": "サ",
            "meaning": "Lie"
        },
        "霧": {
            "level": 47,
            "reading": "きり",
            "meaning": "Fog"
        },
        "柳": {
            "level": 47,
            "reading": "リュウ",
            "meaning": "Willow"
        },
        "伊": {
            "level": 47,
            "reading": "イ",
            "meaning": "Italy"
        },
        "佐": {
            "level": 47,
            "reading": "サ",
            "meaning": "Help"
        },
        "尺": {
            "level": 47,
            "reading": "シャク",
            "meaning": "Shaku"
        },
        "哀": {
            "level": 47,
            "reading": "アイ",
            "meaning": "Pathetic"
        },
        "唇": {
            "level": 47,
            "reading": "くちびる",
            "meaning": "Lips"
        },
        "塀": {
            "level": 47,
            "reading": "ヘイ",
            "meaning": "Fence"
        },
        "墜": {
            "level": 47,
            "reading": "ツイ",
            "meaning": "Crash"
        },
        "如": {
            "level": 47,
            "reading": "ジョ",
            "meaning": "Likeness"
        },
        "婆": {
            "level": 47,
            "reading": "バ",
            "meaning": "Old Woman"
        },
        "崖": {
            "level": 47,
            "reading": "ガイ",
            "meaning": "Cliff"
        },
        "帽": {
            "level": 47,
            "reading": "ボウ",
            "meaning": "Hat"
        },
        "幣": {
            "level": 47,
            "reading": "ヘイ",
            "meaning": "Cash"
        },
        "恨": {
            "level": 47,
            "reading": "コン",
            "meaning": "Grudge"
        },
        "憎": {
            "level": 47,
            "reading": "ゾウ",
            "meaning": "Hate"
        },
        "憩": {
            "level": 47,
            "reading": "ケイ",
            "meaning": "Rest"
        },
        "扇": {
            "level": 47,
            "reading": "セン",
            "meaning": "Folding Fan"
        },
        "扉": {
            "level": 47,
            "reading": "ヒ",
            "meaning": "Front Door"
        },
        "挿": {
            "level": 47,
            "reading": "ソウ",
            "meaning": "Insert"
        },
        "掌": {
            "level": 47,
            "reading": "ショウ",
            "meaning": "Manipulate"
        },
        "滴": {
            "level": 47,
            "reading": "テキ",
            "meaning": "Drip"
        },
        "炊": {
            "level": 47,
            "reading": "スイ",
            "meaning": "Cook"
        },
        "爽": {
            "level": 47,
            "reading": "さわ",
            "meaning": "Refreshing"
        },
        "畳": {
            "level": 47,
            "reading": "ジョウ",
            "meaning": "Tatami Mat"
        },
        "瞭": {
            "level": 47,
            "reading": "リョウ",
            "meaning": "Clear"
        },
        "箸": {
            "level": 47,
            "reading": "はし",
            "meaning": "Chopsticks"
        },
        "胴": {
            "level": 47,
            "reading": "ドウ",
            "meaning": "Torso"
        },
        "芯": {
            "level": 47,
            "reading": "シン",
            "meaning": "Wick"
        },
        "虹": {
            "level": 47,
            "reading": "にじ",
            "meaning": "Rainbow"
        },
        "帳": {
            "level": 48,
            "reading": "チョウ",
            "meaning": "Notebook"
        },
        "蚊": {
            "level": 48,
            "reading": "か",
            "meaning": "Mosquito"
        },
        "蛇": {
            "level": 48,
            "reading": "へび",
            "meaning": "Snake"
        },
        "貼": {
            "level": 48,
            "reading": "は",
            "meaning": "Paste"
        },
        "辱": {
            "level": 48,
            "reading": "ジョク",
            "meaning": "Humiliate"
        },
        "鉢": {
            "level": 48,
            "reading": "ハチ",
            "meaning": "Bowl"
        },
        "闇": {
            "level": 48,
            "reading": "やみ",
            "meaning": "Darkness"
        },
        "隙": {
            "level": 48,
            "reading": "すき",
            "meaning": "Crevice"
        },
        "霜": {
            "level": 48,
            "reading": "しも",
            "meaning": "Frost"
        },
        "飢": {
            "level": 48,
            "reading": "キ",
            "meaning": "Starve"
        },
        "餓": {
            "level": 48,
            "reading": "ガ",
            "meaning": "Starve"
        },
        "畜": {
            "level": 48,
            "reading": "チク",
            "meaning": "Livestock"
        },
        "迅": {
            "level": 48,
            "reading": "ジン",
            "meaning": "Swift"
        },
        "騎": {
            "level": 48,
            "reading": "キ",
            "meaning": "Horse Riding"
        },
        "蓄": {
            "level": 48,
            "reading": "チク",
            "meaning": "Amass"
        },
        "尽": {
            "level": 48,
            "reading": "ジン",
            "meaning": "Use Up"
        },
        "彩": {
            "level": 48,
            "reading": "サイ",
            "meaning": "Coloring"
        },
        "憶": {
            "level": 48,
            "reading": "オク",
            "meaning": "Recollection"
        },
        "溶": {
            "level": 48,
            "reading": "ヨウ",
            "meaning": "Melt"
        },
        "耐": {
            "level": 48,
            "reading": "タイ",
            "meaning": "Resistant"
        },
        "踊": {
            "level": 48,
            "reading": "おど",
            "meaning": "Dance"
        },
        "賢": {
            "level": 48,
            "reading": "ケン",
            "meaning": "Clever"
        },
        "輝": {
            "level": 48,
            "reading": "キ",
            "meaning": "Radiance"
        },
        "脅": {
            "level": 48,
            "reading": "キョウ",
            "meaning": "Threaten"
        },
        "麻": {
            "level": 48,
            "reading": "マ",
            "meaning": "Hemp"
        },
        "灯": {
            "level": 48,
            "reading": "トウ",
            "meaning": "Lamp"
        },
        "咲": {
            "level": 48,
            "reading": "さ",
            "meaning": "Blossom"
        },
        "培": {
            "level": 48,
            "reading": "バイ",
            "meaning": "Cultivate"
        },
        "悔": {
            "level": 48,
            "reading": "カイ",
            "meaning": "Regret"
        },
        "脇": {
            "level": 48,
            "reading": "わき",
            "meaning": "Armpit"
        },
        "遂": {
            "level": 48,
            "reading": "スイ",
            "meaning": "Accomplish"
        },
        "班": {
            "level": 48,
            "reading": "ハン",
            "meaning": "Squad"
        },
        "塗": {
            "level": 48,
            "reading": "ト",
            "meaning": "Paint"
        },
        "斜": {
            "level": 48,
            "reading": "シャ",
            "meaning": "Diagonal"
        },
        "殴": {
            "level": 48,
            "reading": "オウ",
            "meaning": "Assault"
        },
        "盾": {
            "level": 48,
            "reading": "ジュン",
            "meaning": "Shield"
        },
        "穫": {
            "level": 48,
            "reading": "カク",
            "meaning": "Harvest"
        },
        "巾": {
            "level": 47,
            "reading": "キン",
            "meaning": "Towel"
        },
        "駒": {
            "level": 49,
            "reading": "こま",
            "meaning": "Chess Piece"
        },
        "紫": {
            "level": 49,
            "reading": "シ",
            "meaning": "Purple"
        },
        "抽": {
            "level": 49,
            "reading": "チュウ",
            "meaning": "Pluck"
        },
        "誓": {
            "level": 49,
            "reading": "セイ",
            "meaning": "Vow"
        },
        "悟": {
            "level": 49,
            "reading": "ゴ",
            "meaning": "Comprehension"
        },
        "拓": {
            "level": 49,
            "reading": "タク",
            "meaning": "Cultivation"
        },
        "拘": {
            "level": 49,
            "reading": "コウ",
            "meaning": "Arrest"
        },
        "礎": {
            "level": 49,
            "reading": "ソ",
            "meaning": "Foundation"
        },
        "鶴": {
            "level": 49,
            "reading": "つる",
            "meaning": "Crane"
        },
        "刈": {
            "level": 49,
            "reading": "か",
            "meaning": "Prune"
        },
        "剛": {
            "level": 49,
            "reading": "ゴウ",
            "meaning": "Sturdy"
        },
        "唯": {
            "level": 49,
            "reading": "ユイ",
            "meaning": "Solely"
        },
        "壇": {
            "level": 49,
            "reading": "ダン",
            "meaning": "Podium"
        },
        "尼": {
            "level": 49,
            "reading": "ニ",
            "meaning": "Nun"
        },
        "概": {
            "level": 49,
            "reading": "ガイ",
            "meaning": "Approximation"
        },
        "浸": {
            "level": 49,
            "reading": "シン",
            "meaning": "Immersed"
        },
        "淡": {
            "level": 49,
            "reading": "タン",
            "meaning": "Faint"
        },
        "煮": {
            "level": 49,
            "reading": "に",
            "meaning": "Boil"
        },
        "覆": {
            "level": 49,
            "reading": "フク",
            "meaning": "Capsize"
        },
        "謀": {
            "level": 49,
            "reading": "ボウ",
            "meaning": "Conspire"
        },
        "陶": {
            "level": 49,
            "reading": "トウ",
            "meaning": "Pottery"
        },
        "隔": {
            "level": 49,
            "reading": "カク",
            "meaning": "Isolate"
        },
        "征": {
            "level": 49,
            "reading": "セイ",
            "meaning": "Subjugate"
        },
        "陛": {
            "level": 49,
            "reading": "ヘイ",
            "meaning": "Highness"
        },
        "俗": {
            "level": 49,
            "reading": "ゾク",
            "meaning": "Vulgar"
        },
        "桑": {
            "level": 49,
            "reading": "くわ",
            "meaning": "Mulberry"
        },
        "潤": {
            "level": 49,
            "reading": "ジュン",
            "meaning": "Watered"
        },
        "珠": {
            "level": 49,
            "reading": "シュ",
            "meaning": "Pearl"
        },
        "衰": {
            "level": 49,
            "reading": "スイ",
            "meaning": "Decline"
        },
        "奨": {
            "level": 49,
            "reading": "ショウ",
            "meaning": "Encourage"
        },
        "劣": {
            "level": 49,
            "reading": "レツ",
            "meaning": "Inferiority"
        },
        "勘": {
            "level": 49,
            "reading": "カン",
            "meaning": "Intuition"
        },
        "妃": {
            "level": 49,
            "reading": "ヒ",
            "meaning": "Princess"
        },
        "丈": {
            "level": 15,
            "reading": "ジョウ",
            "meaning": "Height"
        },
        "峰": {
            "level": 50,
            "reading": "ホウ",
            "meaning": "Summit"
        },
        "巧": {
            "level": 50,
            "reading": "コウ",
            "meaning": "Adept"
        },
        "邪": {
            "level": 50,
            "reading": "ジャ",
            "meaning": "Wicked"
        },
        "駄": {
            "level": 50,
            "reading": "ダ",
            "meaning": "Burdensome"
        },
        "唐": {
            "level": 50,
            "reading": "トウ",
            "meaning": "China"
        },
        "廷": {
            "level": 50,
            "reading": "テイ",
            "meaning": "Courts"
        },
        "鬱": {
            "level": 50,
            "reading": "ウツ",
            "meaning": "Gloom"
        },
        "鰐": {
            "level": 50,
            "reading": "わに",
            "meaning": "Alligator"
        },
        "蟹": {
            "level": 50,
            "reading": "かに",
            "meaning": "Crab"
        },
        "簿": {
            "level": 50,
            "reading": "ボ",
            "meaning": "Record Book"
        },
        "彰": {
            "level": 50,
            "reading": "ショウ",
            "meaning": "Clear"
        },
        "漫": {
            "level": 50,
            "reading": "マン",
            "meaning": "Manga"
        },
        "訂": {
            "level": 50,
            "reading": "テイ",
            "meaning": "Revise"
        },
        "諮": {
            "level": 50,
            "reading": "シ",
            "meaning": "Consult"
        },
        "銘": {
            "level": 50,
            "reading": "メイ",
            "meaning": "Inscription"
        },
        "堰": {
            "level": 50,
            "reading": "せき",
            "meaning": "Dam"
        },
        "堤": {
            "level": 50,
            "reading": "テイ",
            "meaning": "Embankment"
        },
        "漂": {
            "level": 50,
            "reading": "ヒョウ",
            "meaning": "Drift"
        },
        "翻": {
            "level": 50,
            "reading": "ホン",
            "meaning": "Flip"
        },
        "軌": {
            "level": 50,
            "reading": "キ",
            "meaning": "Rut"
        },
        "后": {
            "level": 50,
            "reading": "コウ",
            "meaning": "Empress"
        },
        "奮": {
            "level": 50,
            "reading": "フン",
            "meaning": "Stirred Up"
        },
        "亭": {
            "level": 50,
            "reading": "テイ",
            "meaning": "Restaurant"
        },
        "仰": {
            "level": 50,
            "reading": "ギョウ",
            "meaning": "Look Up To"
        },
        "伯": {
            "level": 50,
            "reading": "ハク",
            "meaning": "Chief"
        },
        "偶": {
            "level": 50,
            "reading": "グウ",
            "meaning": "Accidentally"
        },
        "淀": {
            "level": 50,
            "reading": "よど",
            "meaning": "Eddy"
        },
        "墳": {
            "level": 50,
            "reading": "フン",
            "meaning": "Tomb"
        },
        "壮": {
            "level": 50,
            "reading": "ソウ",
            "meaning": "Robust"
        },
        "把": {
            "level": 50,
            "reading": "ハ",
            "meaning": "Bundle"
        },
        "搬": {
            "level": 50,
            "reading": "ハン",
            "meaning": "Transport"
        },
        "晶": {
            "level": 50,
            "reading": "ショウ",
            "meaning": "Crystal"
        },
        "洞": {
            "level": 50,
            "reading": "ドウ",
            "meaning": "Cave"
        },
        "涯": {
            "level": 50,
            "reading": "ガイ",
            "meaning": "Horizon"
        },
        "疫": {
            "level": 50,
            "reading": "エキ",
            "meaning": "Epidemic"
        },
        "孔": {
            "level": 46,
            "reading": "コウ",
            "meaning": "Cavity"
        },
        "偉": {
            "level": 51,
            "reading": "イ",
            "meaning": "Greatness"
        },
        "頂": {
            "level": 51,
            "reading": "チョウ",
            "meaning": "Summit"
        },
        "召": {
            "level": 51,
            "reading": "ショウ",
            "meaning": "Call"
        },
        "挟": {
            "level": 51,
            "reading": "はさ",
            "meaning": "Between"
        },
        "枯": {
            "level": 51,
            "reading": "コ",
            "meaning": "Wither"
        },
        "沸": {
            "level": 51,
            "reading": "フツ",
            "meaning": "Boil"
        },
        "濯": {
            "level": 51,
            "reading": "タク",
            "meaning": "Wash"
        },
        "燥": {
            "level": 51,
            "reading": "ソウ",
            "meaning": "Dry Up"
        },
        "瓶": {
            "level": 51,
            "reading": "ビン",
            "meaning": "Bottle"
        },
        "耕": {
            "level": 51,
            "reading": "コウ",
            "meaning": "Plow"
        },
        "肯": {
            "level": 51,
            "reading": "コウ",
            "meaning": "Agreement"
        },
        "脂": {
            "level": 51,
            "reading": "シ",
            "meaning": "Fat"
        },
        "膚": {
            "level": 51,
            "reading": "フ",
            "meaning": "Skin"
        },
        "軒": {
            "level": 51,
            "reading": "ケン",
            "meaning": "House Counter"
        },
        "軟": {
            "level": 51,
            "reading": "ナン",
            "meaning": "Soft"
        },
        "郊": {
            "level": 51,
            "reading": "コウ",
            "meaning": "Suburbs"
        },
        "隅": {
            "level": 51,
            "reading": "すみ",
            "meaning": "Corner"
        },
        "隻": {
            "level": 51,
            "reading": "セキ",
            "meaning": "Ship Counter"
        },
        "邸": {
            "level": 51,
            "reading": "テイ",
            "meaning": "Residence"
        },
        "郡": {
            "level": 51,
            "reading": "グン",
            "meaning": "County"
        },
        "釈": {
            "level": 51,
            "reading": "シャク",
            "meaning": "Explanation"
        },
        "肪": {
            "level": 51,
            "reading": "ボウ",
            "meaning": "Obese"
        },
        "喚": {
            "level": 51,
            "reading": "カン",
            "meaning": "Scream"
        },
        "媛": {
            "level": 51,
            "reading": "ひめ",
            "meaning": "Princess"
        },
        "貞": {
            "level": 51,
            "reading": "テイ",
            "meaning": "Chastity"
        },
        "玄": {
            "level": 51,
            "reading": "ゲン",
            "meaning": "Mysterious"
        },
        "苗": {
            "level": 51,
            "reading": "ミョウ",
            "meaning": "Seedling"
        },
        "渦": {
            "level": 51,
            "reading": "カ",
            "meaning": "Whirlpool"
        },
        "慈": {
            "level": 51,
            "reading": "ジ",
            "meaning": "Mercy"
        },
        "襟": {
            "level": 51,
            "reading": "えり",
            "meaning": "Collar"
        },
        "蓮": {
            "level": 51,
            "reading": "レン",
            "meaning": "Lotus"
        },
        "亮": {
            "level": 51,
            "reading": "リョウ",
            "meaning": "Clear"
        },
        "聡": {
            "level": 51,
            "reading": "ソウ",
            "meaning": "Wise"
        },
        "浦": {
            "level": 51,
            "reading": "うら",
            "meaning": "Bay"
        },
        "塚": {
            "level": 51,
            "reading": "つか",
            "meaning": "Mound"
        },
        "陥": {
            "level": 52,
            "reading": "カン",
            "meaning": "Cave In"
        },
        "貫": {
            "level": 52,
            "reading": "カン",
            "meaning": "Pierce"
        },
        "覇": {
            "level": 52,
            "reading": "ハ",
            "meaning": "Leadership"
        },
        "呂": {
            "level": 52,
            "reading": "ロ",
            "meaning": "Bath"
        },
        "茨": {
            "level": 52,
            "reading": "いばら",
            "meaning": "Briar"
        },
        "擁": {
            "level": 52,
            "reading": "ヨウ",
            "meaning": "Embrace"
        },
        "孤": {
            "level": 52,
            "reading": "コ",
            "meaning": "Orphan"
        },
        "賠": {
            "level": 52,
            "reading": "バイ",
            "meaning": "Compensation"
        },
        "鎖": {
            "level": 52,
            "reading": "サ",
            "meaning": "Chain"
        },
        "噴": {
            "level": 52,
            "reading": "フン",
            "meaning": "Erupt"
        },
        "祥": {
            "level": 52,
            "reading": "ショウ",
            "meaning": "Auspicious"
        },
        "牲": {
            "level": 52,
            "reading": "セイ",
            "meaning": "Offering"
        },
        "秩": {
            "level": 52,
            "reading": "チツ",
            "meaning": "Order"
        },
        "唆": {
            "level": 52,
            "reading": "サ",
            "meaning": "Instigate"
        },
        "膨": {
            "level": 52,
            "reading": "ボウ",
            "meaning": "Swell"
        },
        "芳": {
            "level": 52,
            "reading": "ホウ",
            "meaning": "Perfume"
        },
        "恒": {
            "level": 52,
            "reading": "コウ",
            "meaning": "Constant"
        },
        "倫": {
            "level": 52,
            "reading": "リン",
            "meaning": "Ethics"
        },
        "陳": {
            "level": 52,
            "reading": "チン",
            "meaning": "Exhibit"
        },
        "須": {
            "level": 52,
            "reading": "ス",
            "meaning": "Necessary"
        },
        "偏": {
            "level": 52,
            "reading": "ヘン",
            "meaning": "Biased"
        },
        "遇": {
            "level": 52,
            "reading": "グウ",
            "meaning": "Treatment"
        },
        "糧": {
            "level": 52,
            "reading": "リョウ",
            "meaning": "Provisions"
        },
        "殊": {
            "level": 52,
            "reading": "シュ",
            "meaning": "Especially"
        },
        "慢": {
            "level": 52,
            "reading": "マン",
            "meaning": "Ridicule"
        },
        "没": {
            "level": 52,
            "reading": "ボツ",
            "meaning": "Die"
        },
        "怠": {
            "level": 52,
            "reading": "タイ",
            "meaning": "Lazy"
        },
        "遭": {
            "level": 52,
            "reading": "ソウ",
            "meaning": "Encounter"
        },
        "惰": {
            "level": 52,
            "reading": "ダ",
            "meaning": "Lazy"
        },
        "猟": {
            "level": 52,
            "reading": "リョウ",
            "meaning": "Hunting"
        },
        "乃": {
            "level": 52,
            "reading": "の",
            "meaning": "From"
        },
        "綾": {
            "level": 52,
            "reading": "あや",
            "meaning": "Design"
        },
        "颯": {
            "level": 52,
            "reading": "サツ",
            "meaning": "Quick"
        },
        "隼": {
            "level": 52,
            "reading": "はやぶさ",
            "meaning": "Falcon"
        },
        "輔": {
            "level": 52,
            "reading": "すけ",
            "meaning": "Help"
        },
        "寛": {
            "level": 53,
            "reading": "カン",
            "meaning": "Tolerance"
        },
        "胞": {
            "level": 53,
            "reading": "ホウ",
            "meaning": "Cell"
        },
        "浄": {
            "level": 53,
            "reading": "ジョウ",
            "meaning": "Cleanse"
        },
        "随": {
            "level": 53,
            "reading": "ズイ",
            "meaning": "All"
        },
        "稿": {
            "level": 53,
            "reading": "コウ",
            "meaning": "Draft"
        },
        "丹": {
            "level": 53,
            "reading": "タン",
            "meaning": "Rust Colored"
        },
        "壌": {
            "level": 53,
            "reading": "ジョウ",
            "meaning": "Soil"
        },
        "舗": {
            "level": 53,
            "reading": "ホ",
            "meaning": "Shop"
        },
        "騰": {
            "level": 53,
            "reading": "トウ",
            "meaning": "Inflation"
        },
        "緯": {
            "level": 53,
            "reading": "イ",
            "meaning": "Latitude"
        },
        "艇": {
            "level": 53,
            "reading": "テイ",
            "meaning": "Rowboat"
        },
        "披": {
            "level": 53,
            "reading": "ヒ",
            "meaning": "Expose"
        },
        "錦": {
            "level": 53,
            "reading": "にしき",
            "meaning": "Brocade"
        },
        "准": {
            "level": 53,
            "reading": "ジュン",
            "meaning": "Semi"
        },
        "剰": {
            "level": 53,
            "reading": "ジョウ",
            "meaning": "Surplus"
        },
        "繊": {
            "level": 53,
            "reading": "セン",
            "meaning": "Fiber"
        },
        "諭": {
            "level": 53,
            "reading": "ユ",
            "meaning": "Admonish"
        },
        "惨": {
            "level": 53,
            "reading": "サン",
            "meaning": "Disaster"
        },
        "虐": {
            "level": 53,
            "reading": "ギャク",
            "meaning": "Oppress"
        },
        "据": {
            "level": 53,
            "reading": "す",
            "meaning": "Install"
        },
        "徐": {
            "level": 53,
            "reading": "ジョ",
            "meaning": "Gently"
        },
        "搭": {
            "level": 53,
            "reading": "トウ",
            "meaning": "Board"
        },
        "蒙": {
            "level": 53,
            "reading": "モウ",
            "meaning": "Darkness"
        },
        "鯉": {
            "level": 53,
            "reading": "こい",
            "meaning": "Carp"
        },
        "戴": {
            "level": 53,
            "reading": "タイ",
            "meaning": "Receive"
        },
        "緋": {
            "level": 53,
            "reading": "ヒ",
            "meaning": "Scarlet"
        },
        "曙": {
            "level": 53,
            "reading": "あけぼの",
            "meaning": "Dawn"
        },
        "胡": {
            "level": 53,
            "reading": "コ",
            "meaning": "Barbarian"
        },
        "瓜": {
            "level": 53,
            "reading": "カ",
            "meaning": "Melon"
        },
        "帥": {
            "level": 53,
            "reading": "スイ",
            "meaning": "Commander"
        },
        "啓": {
            "level": 53,
            "reading": "ケイ",
            "meaning": "Enlighten"
        },
        "葵": {
            "level": 53,
            "reading": "あおい",
            "meaning": "Hollyhock"
        },
        "駿": {
            "level": 53,
            "reading": "シュン",
            "meaning": "Speed"
        },
        "諒": {
            "level": 53,
            "reading": "リョウ",
            "meaning": "Comprehend"
        },
        "莉": {
            "level": 53,
            "reading": "リ",
            "meaning": "Jasmine"
        },
        "鯨": {
            "level": 54,
            "reading": "ゲイ",
            "meaning": "Whale"
        },
        "荘": {
            "level": 54,
            "reading": "ソウ",
            "meaning": "Villa"
        },
        "栽": {
            "level": 54,
            "reading": "サイ",
            "meaning": "Planting"
        },
        "拐": {
            "level": 54,
            "reading": "カイ",
            "meaning": "Kidnap"
        },
        "冠": {
            "level": 54,
            "reading": "カン",
            "meaning": "Crown"
        },
        "勲": {
            "level": 54,
            "reading": "クン",
            "meaning": "Merit"
        },
        "酬": {
            "level": 54,
            "reading": "シュウ",
            "meaning": "Repay"
        },
        "紋": {
            "level": 54,
            "reading": "モン",
            "meaning": "Family Crest"
        },
        "卸": {
            "level": 54,
            "reading": "おろし",
            "meaning": "Wholesale"
        },
        "欄": {
            "level": 54,
            "reading": "ラン",
            "meaning": "Column"
        },
        "逸": {
            "level": 54,
            "reading": "イツ",
            "meaning": "Deviate"
        },
        "尚": {
            "level": 54,
            "reading": "ショウ",
            "meaning": "Furthermore"
        },
        "顕": {
            "level": 54,
            "reading": "ケン",
            "meaning": "Appear"
        },
        "粛": {
            "level": 54,
            "reading": "シュク",
            "meaning": "Solemn"
        },
        "愚": {
            "level": 54,
            "reading": "グ",
            "meaning": "Foolish"
        },
        "庶": {
            "level": 54,
            "reading": "ショ",
            "meaning": "All"
        },
        "践": {
            "level": 54,
            "reading": "セン",
            "meaning": "Practice"
        },
        "呈": {
            "level": 54,
            "reading": "テイ",
            "meaning": "Present"
        },
        "疎": {
            "level": 54,
            "reading": "ソ",
            "meaning": "Neglect"
        },
        "疾": {
            "level": 54,
            "reading": "シツ",
            "meaning": "Rapidly"
        },
        "謡": {
            "level": 54,
            "reading": "ヨウ",
            "meaning": "Noh Chanting"
        },
        "鎌": {
            "level": 54,
            "reading": "かま",
            "meaning": "Sickle"
        },
        "酷": {
            "level": 54,
            "reading": "コク",
            "meaning": "Cruel"
        },
        "叙": {
            "level": 54,
            "reading": "ジョ",
            "meaning": "Describe"
        },
        "且": {
            "level": 54,
            "reading": "か",
            "meaning": "Also"
        },
        "痴": {
            "level": 54,
            "reading": "チ",
            "meaning": "Stupid"
        },
        "呆": {
            "level": 54,
            "reading": "ホウ",
            "meaning": "Shock"
        },
        "哺": {
            "level": 54,
            "reading": "ホ",
            "meaning": "Suckle"
        },
        "傲": {
            "level": 54,
            "reading": "ゴウ",
            "meaning": "Proud"
        },
        "茎": {
            "level": 54,
            "reading": "くき",
            "meaning": "Stem"
        },
        "阿": {
            "level": 54,
            "reading": "ア",
            "meaning": "Flatter"
        },
        "悠": {
            "level": 54,
            "reading": "ユウ",
            "meaning": "Leisure"
        },
        "杏": {
            "level": 54,
            "reading": "あんず",
            "meaning": "Apricot"
        },
        "茜": {
            "level": 54,
            "reading": "あかね",
            "meaning": "Red Dye"
        },
        "栞": {
            "level": 54,
            "reading": "しおり",
            "meaning": "Bookmark"
        },
        "伏": {
            "level": 55,
            "reading": "フク",
            "meaning": "Bow"
        },
        "鎮": {
            "level": 55,
            "reading": "チン",
            "meaning": "Tranquilize"
        },
        "奉": {
            "level": 55,
            "reading": "ホウ",
            "meaning": "Dedicate"
        },
        "憂": {
            "level": 55,
            "reading": "ユウ",
            "meaning": "Grief"
        },
        "朴": {
            "level": 55,
            "reading": "ボク",
            "meaning": "Simple"
        },
        "栃": {
            "level": 55,
            "reading": "とち",
            "meaning": "Horse Chestnut"
        },
        "惜": {
            "level": 55,
            "reading": "セキ",
            "meaning": "Frugal"
        },
        "佳": {
            "level": 55,
            "reading": "カ",
            "meaning": "Excellent"
        },
        "悼": {
            "level": 55,
            "reading": "トウ",
            "meaning": "Grieve"
        },
        "該": {
            "level": 55,
            "reading": "ガイ",
            "meaning": "The Above"
        },
        "赴": {
            "level": 55,
            "reading": "フ",
            "meaning": "Proceed"
        },
        "髄": {
            "level": 55,
            "reading": "ズイ",
            "meaning": "Marrow"
        },
        "傍": {
            "level": 55,
            "reading": "ボウ",
            "meaning": "Nearby"
        },
        "累": {
            "level": 55,
            "reading": "ルイ",
            "meaning": "Accumulate"
        },
        "癒": {
            "level": 55,
            "reading": "ユ",
            "meaning": "Healing"
        },
        "郭": {
            "level": 55,
            "reading": "カク",
            "meaning": "Enclosure"
        },
        "尿": {
            "level": 55,
            "reading": "ニョウ",
            "meaning": "Urine"
        },
        "賓": {
            "level": 55,
            "reading": "ヒン",
            "meaning": "VIP"
        },
        "虜": {
            "level": 55,
            "reading": "リョ",
            "meaning": "Captive"
        },
        "憾": {
            "level": 55,
            "reading": "カン",
            "meaning": "Remorse"
        },
        "弥": {
            "level": 55,
            "reading": "や",
            "meaning": "Increasing"
        },
        "粗": {
            "level": 55,
            "reading": "ソ",
            "meaning": "Coarse"
        },
        "循": {
            "level": 55,
            "reading": "ジュン",
            "meaning": "Circulation"
        },
        "凝": {
            "level": 55,
            "reading": "ギョウ",
            "meaning": "Congeal"
        },
        "脊": {
            "level": 55,
            "reading": "セキ",
            "meaning": "Stature"
        },
        "昌": {
            "level": 55,
            "reading": "ショウ",
            "meaning": "Prosperous"
        },
        "旦": {
            "level": 55,
            "reading": "タン",
            "meaning": "Dawn"
        },
        "愉": {
            "level": 55,
            "reading": "ユ",
            "meaning": "Pleasant"
        },
        "抹": {
            "level": 55,
            "reading": "マツ",
            "meaning": "Erase"
        },
        "栓": {
            "level": 55,
            "reading": "セン",
            "meaning": "Cork"
        },
        "之": {
            "level": 55,
            "reading": "これ",
            "meaning": "This"
        },
        "龍": {
            "level": 55,
            "reading": "リュウ",
            "meaning": "Imperial"
        },
        "遼": {
            "level": 55,
            "reading": "リョウ",
            "meaning": "Distant"
        },
        "瑛": {
            "level": 55,
            "reading": "エイ",
            "meaning": "Crystal"
        },
        "那": {
            "level": 55,
            "reading": "ナ",
            "meaning": "What"
        },
        "拍": {
            "level": 56,
            "reading": "ハク",
            "meaning": "Beat"
        },
        "猶": {
            "level": 56,
            "reading": "ユウ",
            "meaning": "Still"
        },
        "宰": {
            "level": 56,
            "reading": "サイ",
            "meaning": "Manager"
        },
        "寂": {
            "level": 56,
            "reading": "ジャク",
            "meaning": "Lonely"
        },
        "縫": {
            "level": 56,
            "reading": "ホウ",
            "meaning": "Sew"
        },
        "呉": {
            "level": 56,
            "reading": "ゴ",
            "meaning": "Give"
        },
        "凡": {
            "level": 56,
            "reading": "ボン",
            "meaning": "Mediocre"
        },
        "恭": {
            "level": 56,
            "reading": "うやうや",
            "meaning": "Respect"
        },
        "錯": {
            "level": 56,
            "reading": "サク",
            "meaning": "Confused"
        },
        "穀": {
            "level": 56,
            "reading": "コク",
            "meaning": "Grain"
        },
        "陵": {
            "level": 56,
            "reading": "リョウ",
            "meaning": "Mausoleum"
        },
        "弊": {
            "level": 56,
            "reading": "ヘイ",
            "meaning": "Evil"
        },
        "舶": {
            "level": 56,
            "reading": "ハク",
            "meaning": "Ship"
        },
        "窮": {
            "level": 56,
            "reading": "キュウ",
            "meaning": "Destitute"
        },
        "悦": {
            "level": 56,
            "reading": "エツ",
            "meaning": "Delight"
        },
        "縛": {
            "level": 56,
            "reading": "バク",
            "meaning": "Bind"
        },
        "轄": {
            "level": 56,
            "reading": "カツ",
            "meaning": "Control"
        },
        "弦": {
            "level": 56,
            "reading": "ゲン",
            "meaning": "Chord"
        },
        "窒": {
            "level": 56,
            "reading": "チツ",
            "meaning": "Suffocate"
        },
        "洪": {
            "level": 56,
            "reading": "コウ",
            "meaning": "Flood"
        },
        "摂": {
            "level": 56,
            "reading": "セツ",
            "meaning": "In Addition"
        },
        "飽": {
            "level": 56,
            "reading": "ホウ",
            "meaning": "Bored"
        },
        "紳": {
            "level": 56,
            "reading": "シン",
            "meaning": "Gentleman"
        },
        "庸": {
            "level": 56,
            "reading": "ヨウ",
            "meaning": "Common"
        },
        "靖": {
            "level": 56,
            "reading": "やす",
            "meaning": "Peaceful"
        },
        "嘉": {
            "level": 56,
            "reading": "カ",
            "meaning": "Esteem"
        },
        "搾": {
            "level": 56,
            "reading": "サク",
            "meaning": "Squeeze"
        },
        "蝶": {
            "level": 56,
            "reading": "チョウ",
            "meaning": "Butterfly"
        },
        "碑": {
            "level": 56,
            "reading": "ヒ",
            "meaning": "Tombstone"
        },
        "尉": {
            "level": 56,
            "reading": "イ",
            "meaning": "Military Officer"
        },
        "凛": {
            "level": 56,
            "reading": "リン",
            "meaning": "Cold"
        },
        "匠": {
            "level": 56,
            "reading": "ショウ",
            "meaning": "Artisan"
        },
        "遥": {
            "level": 56,
            "reading": "はる",
            "meaning": "Far Off"
        },
        "智": {
            "level": 56,
            "reading": "チ",
            "meaning": "Wisdom"
        },
        "柴": {
            "level": 56,
            "reading": "しば",
            "meaning": "Brushwood"
        },
        "賊": {
            "level": 57,
            "reading": "ゾク",
            "meaning": "Robber"
        },
        "鼓": {
            "level": 57,
            "reading": "コ",
            "meaning": "Drum"
        },
        "旋": {
            "level": 57,
            "reading": "セン",
            "meaning": "Rotation"
        },
        "腸": {
            "level": 57,
            "reading": "チョウ",
            "meaning": "Intestines"
        },
        "槽": {
            "level": 57,
            "reading": "ソウ",
            "meaning": "Tank"
        },
        "伐": {
            "level": 57,
            "reading": "バツ",
            "meaning": "Fell"
        },
        "漬": {
            "level": 57,
            "reading": "つ",
            "meaning": "Pickle"
        },
        "坪": {
            "level": 57,
            "reading": "つぼ",
            "meaning": "Two Mat Area"
        },
        "紺": {
            "level": 57,
            "reading": "コン",
            "meaning": "Navy Blue"
        },
        "羅": {
            "level": 57,
            "reading": "ラ",
            "meaning": "Spread Out"
        },
        "峡": {
            "level": 57,
            "reading": "キョウ",
            "meaning": "Ravine"
        },
        "俸": {
            "level": 57,
            "reading": "ホウ",
            "meaning": "Salary"
        },
        "醸": {
            "level": 57,
            "reading": "ジョウ",
            "meaning": "Brew"
        },
        "弔": {
            "level": 57,
            "reading": "チョウ",
            "meaning": "Condolence"
        },
        "乙": {
            "level": 57,
            "reading": "オツ",
            "meaning": "Latter"
        },
        "遍": {
            "level": 57,
            "reading": "ヘン",
            "meaning": "Universal"
        },
        "衡": {
            "level": 57,
            "reading": "コウ",
            "meaning": "Equilibrium"
        },
        "款": {
            "level": 60,
            "reading": "カン",
            "meaning": "Article"
        },
        "閲": {
            "level": 57,
            "reading": "エツ",
            "meaning": "Inspection"
        },
        "喝": {
            "level": 57,
            "reading": "カツ",
            "meaning": "Scold"
        },
        "敢": {
            "level": 57,
            "reading": "カン",
            "meaning": "Daring"
        },
        "膜": {
            "level": 57,
            "reading": "マク",
            "meaning": "Membrane"
        },
        "盲": {
            "level": 57,
            "reading": "モウ",
            "meaning": "Blind"
        },
        "胎": {
            "level": 57,
            "reading": "タイ",
            "meaning": "Womb"
        },
        "酵": {
            "level": 57,
            "reading": "コウ",
            "meaning": "Fermentation"
        },
        "堕": {
            "level": 57,
            "reading": "ダ",
            "meaning": "Degenerate"
        },
        "遮": {
            "level": 57,
            "reading": "シャ",
            "meaning": "Intercept"
        },
        "烏": {
            "level": 57,
            "reading": "からす",
            "meaning": "Crow"
        },
        "凸": {
            "level": 57,
            "reading": "トツ",
            "meaning": "Convex"
        },
        "凹": {
            "level": 57,
            "reading": "オウ",
            "meaning": "Concave"
        },
        "楓": {
            "level": 57,
            "reading": "かえで",
            "meaning": "Maple"
        },
        "哉": {
            "level": 57,
            "reading": "や",
            "meaning": "Question Mark"
        },
        "蒼": {
            "level": 57,
            "reading": "ソウ",
            "meaning": "Pale"
        },
        "瑠": {
            "level": 58,
            "reading": "ル",
            "meaning": "Lapis Lazuli"
        },
        "萌": {
            "level": 57,
            "reading": "ホウ",
            "meaning": "Sprout"
        },
        "硫": {
            "level": 58,
            "reading": "リュウ",
            "meaning": "Sulfur"
        },
        "赦": {
            "level": 58,
            "reading": "シャ",
            "meaning": "Pardon"
        },
        "窃": {
            "level": 58,
            "reading": "セツ",
            "meaning": "Steal"
        },
        "慨": {
            "level": 58,
            "reading": "ガイ",
            "meaning": "Sigh"
        },
        "扶": {
            "level": 58,
            "reading": "フ",
            "meaning": "Aid"
        },
        "戯": {
            "level": 58,
            "reading": "ギ",
            "meaning": "Play"
        },
        "忌": {
            "level": 59,
            "reading": "キ",
            "meaning": "Mourning"
        },
        "濁": {
            "level": 58,
            "reading": "ダク",
            "meaning": "Muddy"
        },
        "奔": {
            "level": 58,
            "reading": "ホン",
            "meaning": "Run"
        },
        "肖": {
            "level": 58,
            "reading": "ショウ",
            "meaning": "Resemblance"
        },
        "朽": {
            "level": 58,
            "reading": "キュウ",
            "meaning": "Rot"
        },
        "殻": {
            "level": 58,
            "reading": "カク",
            "meaning": "Husk"
        },
        "享": {
            "level": 58,
            "reading": "キョウ",
            "meaning": "Receive"
        },
        "藩": {
            "level": 58,
            "reading": "ハン",
            "meaning": "Fiefdom"
        },
        "媒": {
            "level": 58,
            "reading": "バイ",
            "meaning": "Mediator"
        },
        "鶏": {
            "level": 58,
            "reading": "ケイ",
            "meaning": "Chicken"
        },
        "嘱": {
            "level": 58,
            "reading": "ショク",
            "meaning": "Request"
        },
        "迭": {
            "level": 58,
            "reading": "テツ",
            "meaning": "Alternate"
        },
        "椎": {
            "level": 58,
            "reading": "ツイ",
            "meaning": "Spine"
        },
        "絹": {
            "level": 58,
            "reading": "ケン",
            "meaning": "Silk"
        },
        "陪": {
            "level": 58,
            "reading": "バイ",
            "meaning": "Accompany"
        },
        "剖": {
            "level": 58,
            "reading": "ボウ",
            "meaning": "Divide"
        },
        "譜": {
            "level": 58,
            "reading": "フ",
            "meaning": "Genealogy"
        },
        "淑": {
            "level": 58,
            "reading": "シュク",
            "meaning": "Graceful"
        },
        "帆": {
            "level": 58,
            "reading": "ハン",
            "meaning": "Sail"
        },
        "憤": {
            "level": 58,
            "reading": "フン",
            "meaning": "Resent"
        },
        "酌": {
            "level": 58,
            "reading": "シャク",
            "meaning": "Serve"
        },
        "暁": {
            "level": 58,
            "reading": "あかつき",
            "meaning": "Dawn"
        },
        "傑": {
            "level": 58,
            "reading": "ケツ",
            "meaning": "Greatness"
        },
        "錠": {
            "level": 58,
            "reading": "ジョウ",
            "meaning": "Lock"
        },
        "凌": {
            "level": 58,
            "reading": "しの",
            "meaning": "Endure"
        },
        "瑞": {
            "level": 58,
            "reading": "みず",
            "meaning": "Congratulations"
        },
        "菅": {
            "level": 58,
            "reading": "すが",
            "meaning": "Sedge"
        },
        "漣": {
            "level": 60,
            "reading": "レン",
            "meaning": "Ripples"
        },
        "璃": {
            "level": 58,
            "reading": "リ",
            "meaning": "Glassy"
        },
        "遷": {
            "level": 59,
            "reading": "セン",
            "meaning": "Transition"
        },
        "拙": {
            "level": 59,
            "reading": "セツ",
            "meaning": "Clumsy"
        },
        "峠": {
            "level": 59,
            "reading": "とうげ",
            "meaning": "Peak"
        },
        "篤": {
            "level": 59,
            "reading": "トク",
            "meaning": "Deliberate"
        },
        "叔": {
            "level": 59,
            "reading": "お",
            "meaning": "Uncle"
        },
        "雌": {
            "level": 59,
            "reading": "めす",
            "meaning": "Female"
        },
        "堪": {
            "level": 59,
            "reading": "こら",
            "meaning": "Endure"
        },
        "吟": {
            "level": 59,
            "reading": "ギン",
            "meaning": "Recital"
        },
        "甚": {
            "level": 59,
            "reading": "ジン",
            "meaning": "Very"
        },
        "崇": {
            "level": 59,
            "reading": "スウ",
            "meaning": "Worship"
        },
        "漆": {
            "level": 59,
            "reading": "シツ",
            "meaning": "Lacquer"
        },
        "岬": {
            "level": 59,
            "reading": "みさき",
            "meaning": "Cape"
        },
        "紡": {
            "level": 59,
            "reading": "ボウ",
            "meaning": "Spinning"
        },
        "礁": {
            "level": 59,
            "reading": "ショウ",
            "meaning": "Reef"
        },
        "屯": {
            "level": 59,
            "reading": "トン",
            "meaning": "Barracks"
        },
        "姻": {
            "level": 59,
            "reading": "イン",
            "meaning": "Marry"
        },
        "擬": {
            "level": 59,
            "reading": "ギ",
            "meaning": "Imitate"
        },
        "睦": {
            "level": 59,
            "reading": "ボク",
            "meaning": "Friendly"
        },
        "閑": {
            "level": 59,
            "reading": "カン",
            "meaning": "Leisure"
        },
        "曹": {
            "level": 59,
            "reading": "ソウ",
            "meaning": "Official"
        },
        "詠": {
            "level": 59,
            "reading": "エイ",
            "meaning": "Compose"
        },
        "卑": {
            "level": 59,
            "reading": "ヒ",
            "meaning": "Lowly"
        },
        "侮": {
            "level": 59,
            "reading": "ブ",
            "meaning": "Despise"
        },
        "鋳": {
            "level": 59,
            "reading": "チュウ",
            "meaning": "Cast"
        },
        "蔑": {
            "level": 59,
            "reading": "ベツ",
            "meaning": "Scorn"
        },
        "胆": {
            "level": 59,
            "reading": "タン",
            "meaning": "Guts"
        },
        "浪": {
            "level": 59,
            "reading": "ロウ",
            "meaning": "Wander"
        },
        "禍": {
            "level": 59,
            "reading": "カ",
            "meaning": "Evil"
        },
        "酪": {
            "level": 59,
            "reading": "ラク",
            "meaning": "Dairy"
        },
        "憧": {
            "level": 59,
            "reading": "あこが",
            "meaning": "Long For"
        },
        "慶": {
            "level": 59,
            "reading": "ケイ",
            "meaning": "Congratulate"
        },
        "亜": {
            "level": 59,
            "reading": "ア",
            "meaning": "Asia"
        },
        "汰": {
            "level": 59,
            "reading": "タ",
            "meaning": "Select"
        },
        "梓": {
            "level": 59,
            "reading": "あずさ",
            "meaning": "Japanese Birch"
        },
        "沙": {
            "level": 59,
            "reading": "サ",
            "meaning": "Sand"
        },
        "逝": {
            "level": 60,
            "reading": "セイ",
            "meaning": "Die"
        },
        "匿": {
            "level": 60,
            "reading": "トク",
            "meaning": "Hide"
        },
        "寡": {
            "level": 60,
            "reading": "カ",
            "meaning": "Widow"
        },
        "痢": {
            "level": 60,
            "reading": "リ",
            "meaning": "Diarrhea"
        },
        "坑": {
            "level": 60,
            "reading": "コウ",
            "meaning": "Pit"
        },
        "藍": {
            "level": 60,
            "reading": "あい",
            "meaning": "Indigo"
        },
        "畔": {
            "level": 60,
            "reading": "ハン",
            "meaning": "Shore"
        },
        "唄": {
            "level": 60,
            "reading": "うた",
            "meaning": "Shamisen Song"
        },
        "拷": {
            "level": 60,
            "reading": "ゴウ",
            "meaning": "Torture"
        },
        "渓": {
            "level": 60,
            "reading": "ケイ",
            "meaning": "Valley"
        },
        "廉": {
            "level": 60,
            "reading": "レン",
            "meaning": "Bargain"
        },
        "謹": {
            "level": 60,
            "reading": "キン",
            "meaning": "Humble"
        },
        "湧": {
            "level": 60,
            "reading": "ユウ",
            "meaning": "Well"
        },
        "醜": {
            "level": 60,
            "reading": "シュウ",
            "meaning": "Ugly"
        },
        "升": {
            "level": 60,
            "reading": "ます",
            "meaning": "Grid"
        },
        "殉": {
            "level": 60,
            "reading": "ジュン",
            "meaning": "Martyr"
        },
        "煩": {
            "level": 60,
            "reading": "ハン",
            "meaning": "Annoy"
        },
        "劾": {
            "level": 60,
            "reading": "ガイ",
            "meaning": "Censure"
        },
        "桟": {
            "level": 60,
            "reading": "サン",
            "meaning": "Jetty"
        },
        "婿": {
            "level": 60,
            "reading": "むこ",
            "meaning": "Groom"
        },
        "慕": {
            "level": 60,
            "reading": "ボ",
            "meaning": "Yearn For"
        },
        "罷": {
            "level": 60,
            "reading": "ヒ",
            "meaning": "Quit"
        },
        "矯": {
            "level": 60,
            "reading": "キョウ",
            "meaning": "Correct"
        },
        "某": {
            "level": 60,
            "reading": "ボウ",
            "meaning": "Certain"
        },
        "囚": {
            "level": 39,
            "reading": "シュウ",
            "meaning": "Criminal"
        },
        "泌": {
            "level": 60,
            "reading": "ヒ",
            "meaning": "Secrete"
        },
        "漸": {
            "level": 60,
            "reading": "ようや",
            "meaning": "Gradually"
        },
        "藻": {
            "level": 60,
            "reading": "ソウ",
            "meaning": "Seaweed"
        },
        "妄": {
            "level": 60,
            "reading": "モウ",
            "meaning": "Reckless"
        },
        "蛮": {
            "level": 60,
            "reading": "バン",
            "meaning": "Barbarian"
        },
        "倹": {
            "level": 60,
            "reading": "ケン",
            "meaning": "Thrifty"
        },
        "狐": {
            "level": 60,
            "reading": "きつね",
            "meaning": "Fox"
        },
        "匂": {
            "level": 30,
            "reading": "にお",
            "meaning": "Scent"
        },
        "嬉": {
            "level": 40,
            "reading": "キ",
            "meaning": "Glad"
        },
        "嘘": {
            "level": 41,
            "reading": "うそ",
            "meaning": "Lie"
        },
        "串": {
            "level": 37,
            "reading": "くし",
            "meaning": "Skewer"
        },
        "喉": {
            "level": 18,
            "reading": "コウ",
            "meaning": "Throat"
        },
        "叩": {
            "level": 18,
            "reading": "コウ",
            "meaning": "Tap"
        },
        "飴": {
            "level": 18,
            "reading": "あめ",
            "meaning": "Candy"
        },
        "噂": {
            "level": 33,
            "reading": "うわさ",
            "meaning": "Rumor"
        },
        "諦": {
            "level": 22,
            "reading": "あきら",
            "meaning": "Give Up"
        },
        "捉": {
            "level": 25,
            "reading": "とら",
            "meaning": "Catch"
        },
        "膝": {
            "level": 38,
            "reading": "ひざ",
            "meaning": "Knee"
        },
        "眉": {
            "level": 37,
            "reading": "ミ",
            "meaning": "Eyebrows"
        },
        "濡": {
            "level": 30,
            "reading": "ぬ",
            "meaning": "Wet"
        },
        "痩": {
            "level": 34,
            "reading": "ソウ",
            "meaning": "Thin"
        },
        "羨": {
            "level": 21,
            "reading": "セン",
            "meaning": "Envy"
        },
        "慌": {
            "level": 49,
            "reading": "コウ",
            "meaning": "Confused"
        },
        "挨": {
            "level": 44,
            "reading": "アイ",
            "meaning": "Push Open"
        },
        "拶": {
            "level": 44,
            "reading": "サツ",
            "meaning": "Draw Close"
        },
        "斤": {
            "level": 5,
            "reading": "キン",
            "meaning": "Axe"
        },
        "袖": {
            "level": 22,
            "reading": "シュウ",
            "meaning": "Sleeve"
        },
        "凄": {
            "level": 41,
            "reading": "セイ",
            "meaning": "Amazing"
        },
        "妖": {
            "level": 40,
            "reading": "ヨウ",
            "meaning": "Supernatural"
        },
        "喋": {
            "level": 35,
            "reading": "しゃべ",
            "meaning": "Chat"
        },
        "鮭": {
            "level": 36,
            "reading": "さけ",
            "meaning": "Salmon"
        },
        "宛": {
            "level": 39,
            "reading": "あて",
            "meaning": "Address"
        },
        "蹴": {
            "level": 49,
            "reading": "け",
            "meaning": "Kick"
        },
        "喧": {
            "level": 41,
            "reading": "ケン",
            "meaning": "Noisy"
        },
        "嘩": {
            "level": 41,
            "reading": "カ",
            "meaning": "Rowdy"
        },
        "麺": {
            "level": 40,
            "reading": "メン",
            "meaning": "Noodles"
        },
        "苺": {
            "level": 14,
            "reading": "いちご",
            "meaning": "Strawberry"
        },
        "股": {
            "level": 33,
            "reading": "コ",
            "meaning": "Crotch"
        },
        "柵": {
            "level": 30,
            "reading": "サク",
            "meaning": "Fence"
        },
        "噛": {
            "level": 38,
            "reading": "か",
            "meaning": "Bite"
        },
        "狼": {
            "level": 14,
            "reading": "おおかみ",
            "meaning": "Wolf"
        },
        "咳": {
            "level": 34,
            "reading": "せき",
            "meaning": "Cough"
        },
        "拉": {
            "level": 40,
            "reading": "ラ",
            "meaning": "Abduct"
        },
        "苛": {
            "level": 18,
            "reading": "いじ",
            "meaning": "Frustration"
        },
        "煎": {
            "level": 47,
            "reading": "セン",
            "meaning": "Roast"
        },
        "戚": {
            "level": 35,
            "reading": "セキ",
            "meaning": "Relatives"
        },
        "餅": {
            "level": 42,
            "reading": "もち",
            "meaning": "Mochi"
        },
        "屁": {
            "level": 33,
            "reading": "へ",
            "meaning": "Flatulence"
        },
        "璧": {
            "level": 38,
            "reading": "ヘキ",
            "meaning": "Disc"
        },
        "痒": {
            "level": 23,
            "reading": "かゆ",
            "meaning": "Itchy"
        },
        "冥": {
            "level": 60,
            "reading": "メイ",
            "meaning": "Underworld"
        },
        "莫": {
            "level": 25,
            "reading": "バク",
            "meaning": "Endless"
        },
        "頁": {
            "level": 10,
            "reading": "ページ",
            "meaning": "Page"
        },
        "勿": {
            "level": 55,
            "reading": "モチ",
            "meaning": "Must Not"
        }
    };
    return kanjiData;
}
