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
        // background-color: #f0a
        let div = document.createElement('div');
        // div.style.paddingTop = "0.5rem";
        let innerHTML = "<h6 class='subsection-label'>Wanikani</h6>"
        innerHTML += "<div class='subsection'><ul style='box-sizing: border-box; display: flex; flex-wrap: wrap; align-items: center; list-style: none; margin: 0;padding: 0;border: 0'>";
        for (const k of used) {
            let html = "<li style='width: 15%; flex: 0 0 15%'>" +
                "<a href='https://www.wanikani.com/kanji/" + k.char + "'" +
                " style='display:flex; color:#000;text-decoration: none; align-items: center; flex-direction: column'>" +
                "<span lang='ja' style='font-size: 250%'>" + k.char + "</span>" +
                "<ul style='list-style: none; margin: 0; padding: 0; border: 0; font-size: 100%'>" +
                "<li lang='ja' style='text-align: center; margin: 0;padding: 0; font-size: 100%'>" + k.reading + "</li>" +
                "<li lang='ja' style='text-align: center; margin: 0;padding: 0; font-size: 100%'>" + k.meaning + "</li>" +
                "</ul>" +
                "</a></li>";
            innerHTML += html;
        }
        innerHTML += "</ul></div>"
        div.innerHTML = innerHTML;

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
            "reading": "いち",
            "meaning": "One"
        },
        "二": {
            "level": 1,
            "reading": "に",
            "meaning": "Two"
        },
        "九": {
            "level": 1,
            "reading": "く",
            "meaning": "Nine"
        },
        "七": {
            "level": 1,
            "reading": "しち",
            "meaning": "Seven"
        },
        "人": {
            "level": 1,
            "reading": "にん",
            "meaning": "Person"
        },
        "入": {
            "level": 1,
            "reading": "にゅう",
            "meaning": "Enter"
        },
        "八": {
            "level": 1,
            "reading": "はち",
            "meaning": "Eight"
        },
        "力": {
            "level": 1,
            "reading": "りょく",
            "meaning": "Power"
        },
        "十": {
            "level": 1,
            "reading": "じゅう",
            "meaning": "Ten"
        },
        "三": {
            "level": 1,
            "reading": "さん",
            "meaning": "Three"
        },
        "上": {
            "level": 1,
            "reading": "じょう",
            "meaning": "Above"
        },
        "下": {
            "level": 1,
            "reading": "か",
            "meaning": "Below"
        },
        "口": {
            "level": 1,
            "reading": "こう",
            "meaning": "Mouth"
        },
        "大": {
            "level": 1,
            "reading": "たい",
            "meaning": "Big"
        },
        "女": {
            "level": 1,
            "reading": "じょ",
            "meaning": "Woman"
        },
        "山": {
            "level": 1,
            "reading": "さん",
            "meaning": "Mountain"
        },
        "川": {
            "level": 1,
            "reading": "せん",
            "meaning": "River"
        },
        "工": {
            "level": 1,
            "reading": "こう",
            "meaning": "Construction"
        },
        "刀": {
            "level": 2,
            "reading": "とう",
            "meaning": "Sword"
        },
        "土": {
            "level": 2,
            "reading": "ど",
            "meaning": "Dirt"
        },
        "千": {
            "level": 2,
            "reading": "せん",
            "meaning": "Thousand"
        },
        "夕": {
            "level": 2,
            "reading": "せき",
            "meaning": "Evening"
        },
        "子": {
            "level": 2,
            "reading": "し",
            "meaning": "Child"
        },
        "小": {
            "level": 2,
            "reading": "しょう",
            "meaning": "Small"
        },
        "丁": {
            "level": 2,
            "reading": "ちょう",
            "meaning": "Street"
        },
        "了": {
            "level": 2,
            "reading": "りょう",
            "meaning": "Finish"
        },
        "又": {
            "level": 51,
            "reading": "また",
            "meaning": "Again"
        },
        "丸": {
            "level": 2,
            "reading": "がん",
            "meaning": "Circle"
        },
        "才": {
            "level": 2,
            "reading": "さい",
            "meaning": "Genius"
        },
        "中": {
            "level": 2,
            "reading": "ちゅう",
            "meaning": "Middle"
        },
        "五": {
            "level": 2,
            "reading": "ご",
            "meaning": "Five"
        },
        "六": {
            "level": 2,
            "reading": "ろく",
            "meaning": "Six"
        },
        "円": {
            "level": 2,
            "reading": "えん",
            "meaning": "Yen"
        },
        "天": {
            "level": 2,
            "reading": "てん",
            "meaning": "Heaven"
        },
        "手": {
            "level": 2,
            "reading": "しゅ",
            "meaning": "Hand"
        },
        "文": {
            "level": 2,
            "reading": "ぶん",
            "meaning": "Writing"
        },
        "日": {
            "level": 2,
            "reading": "にち",
            "meaning": "Sun"
        },
        "月": {
            "level": 2,
            "reading": "げつ",
            "meaning": "Moon"
        },
        "木": {
            "level": 2,
            "reading": "もく",
            "meaning": "Tree"
        },
        "水": {
            "level": 2,
            "reading": "すい",
            "meaning": "Water"
        },
        "火": {
            "level": 2,
            "reading": "か",
            "meaning": "Fire"
        },
        "犬": {
            "level": 2,
            "reading": "けん",
            "meaning": "Dog"
        },
        "王": {
            "level": 2,
            "reading": "おう",
            "meaning": "King"
        },
        "出": {
            "level": 2,
            "reading": "しゅつ",
            "meaning": "Exit"
        },
        "右": {
            "level": 2,
            "reading": "ゆう",
            "meaning": "Right"
        },
        "四": {
            "level": 2,
            "reading": "し",
            "meaning": "Four"
        },
        "左": {
            "level": 2,
            "reading": "さ",
            "meaning": "Left"
        },
        "本": {
            "level": 2,
            "reading": "ほん",
            "meaning": "Book"
        },
        "正": {
            "level": 2,
            "reading": "せい",
            "meaning": "Correct"
        },
        "玉": {
            "level": 2,
            "reading": "ぎょく",
            "meaning": "Ball"
        },
        "田": {
            "level": 2,
            "reading": "でん",
            "meaning": "Rice Paddy"
        },
        "白": {
            "level": 2,
            "reading": "はく",
            "meaning": "White"
        },
        "目": {
            "level": 2,
            "reading": "もく",
            "meaning": "Eye"
        },
        "石": {
            "level": 4,
            "reading": "せき",
            "meaning": "Stone"
        },
        "立": {
            "level": 2,
            "reading": "りつ",
            "meaning": "Stand"
        },
        "万": {
            "level": 3,
            "reading": "まん",
            "meaning": "Ten Thousand"
        },
        "久": {
            "level": 32,
            "reading": "きゅう",
            "meaning": "Long Time"
        },
        "今": {
            "level": 3,
            "reading": "こん",
            "meaning": "Now"
        },
        "元": {
            "level": 3,
            "reading": "げん",
            "meaning": "Origin"
        },
        "公": {
            "level": 10,
            "reading": "こう",
            "meaning": "Public"
        },
        "内": {
            "level": 3,
            "reading": "ない",
            "meaning": "Inside"
        },
        "分": {
            "level": 3,
            "reading": "ぶん",
            "meaning": "Part"
        },
        "切": {
            "level": 3,
            "reading": "せつ",
            "meaning": "Cut"
        },
        "午": {
            "level": 3,
            "reading": "ご",
            "meaning": "Noon"
        },
        "友": {
            "level": 3,
            "reading": "ゆう",
            "meaning": "Friend"
        },
        "太": {
            "level": 3,
            "reading": "たい",
            "meaning": "Fat"
        },
        "少": {
            "level": 3,
            "reading": "しょう",
            "meaning": "Few"
        },
        "引": {
            "level": 3,
            "reading": "いん",
            "meaning": "Pull"
        },
        "心": {
            "level": 3,
            "reading": "しん",
            "meaning": "Heart"
        },
        "戸": {
            "level": 3,
            "reading": "こ",
            "meaning": "Door"
        },
        "方": {
            "level": 3,
            "reading": "ほう",
            "meaning": "Direction"
        },
        "牛": {
            "level": 3,
            "reading": "ぎゅう",
            "meaning": "Cow"
        },
        "父": {
            "level": 3,
            "reading": "ふ",
            "meaning": "Father"
        },
        "毛": {
            "level": 3,
            "reading": "もう",
            "meaning": "Fur"
        },
        "止": {
            "level": 3,
            "reading": "し",
            "meaning": "Stop"
        },
        "兄": {
            "level": 5,
            "reading": "きょう",
            "meaning": "Older Brother"
        },
        "冬": {
            "level": 3,
            "reading": "とう",
            "meaning": "Winter"
        },
        "北": {
            "level": 3,
            "reading": "ほく",
            "meaning": "North"
        },
        "半": {
            "level": 3,
            "reading": "はん",
            "meaning": "Half"
        },
        "古": {
            "level": 3,
            "reading": "こ",
            "meaning": "Old"
        },
        "台": {
            "level": 3,
            "reading": "だい",
            "meaning": "Machine"
        },
        "外": {
            "level": 3,
            "reading": "がい",
            "meaning": "Outside"
        },
        "市": {
            "level": 3,
            "reading": "し",
            "meaning": "City"
        },
        "広": {
            "level": 3,
            "reading": "こう",
            "meaning": "Wide"
        },
        "母": {
            "level": 3,
            "reading": "ぼ",
            "meaning": "Mother"
        },
        "用": {
            "level": 3,
            "reading": "よう",
            "meaning": "Task"
        },
        "矢": {
            "level": 3,
            "reading": "し",
            "meaning": "Arrow"
        },
        "世": {
            "level": 4,
            "reading": "せい",
            "meaning": "World"
        },
        "主": {
            "level": 4,
            "reading": "しゅ",
            "meaning": "Master"
        },
        "他": {
            "level": 4,
            "reading": "た",
            "meaning": "Other"
        },
        "代": {
            "level": 4,
            "reading": "だい",
            "meaning": "Substitute"
        },
        "写": {
            "level": 4,
            "reading": "しゃ",
            "meaning": "Copy"
        },
        "去": {
            "level": 4,
            "reading": "きょ",
            "meaning": "Past"
        },
        "号": {
            "level": 4,
            "reading": "ごう",
            "meaning": "Number"
        },
        "央": {
            "level": 4,
            "reading": "おう",
            "meaning": "Center"
        },
        "平": {
            "level": 4,
            "reading": "へい",
            "meaning": "Flat"
        },
        "打": {
            "level": 4,
            "reading": "だ",
            "meaning": "Hit"
        },
        "氷": {
            "level": 4,
            "reading": "ひょう",
            "meaning": "Ice"
        },
        "申": {
            "level": 4,
            "reading": "しん",
            "meaning": "Say Humbly"
        },
        "皮": {
            "level": 5,
            "reading": "ひ",
            "meaning": "Skin"
        },
        "皿": {
            "level": 4,
            "reading": "さら",
            "meaning": "Plate"
        },
        "礼": {
            "level": 4,
            "reading": "れい",
            "meaning": "Thanks"
        },
        "休": {
            "level": 4,
            "reading": "きゅう",
            "meaning": "Rest"
        },
        "先": {
            "level": 4,
            "reading": "せん",
            "meaning": "Previous"
        },
        "名": {
            "level": 4,
            "reading": "めい",
            "meaning": "Name"
        },
        "字": {
            "level": 4,
            "reading": "じ",
            "meaning": "Letter"
        },
        "年": {
            "level": 4,
            "reading": "ねん",
            "meaning": "Year"
        },
        "早": {
            "level": 4,
            "reading": "そう",
            "meaning": "Early"
        },
        "気": {
            "level": 4,
            "reading": "き",
            "meaning": "Energy"
        },
        "百": {
            "level": 4,
            "reading": "ひゃく",
            "meaning": "Hundred"
        },
        "竹": {
            "level": 4,
            "reading": "たけ",
            "meaning": "Bamboo"
        },
        "糸": {
            "level": 4,
            "reading": "し",
            "meaning": "Thread"
        },
        "耳": {
            "level": 4,
            "reading": "じ",
            "meaning": "Ear"
        },
        "虫": {
            "level": 4,
            "reading": "ちゅう",
            "meaning": "Insect"
        },
        "村": {
            "level": 4,
            "reading": "そん",
            "meaning": "Village"
        },
        "男": {
            "level": 4,
            "reading": "だん",
            "meaning": "Man"
        },
        "町": {
            "level": 4,
            "reading": "ちょう",
            "meaning": "Town"
        },
        "花": {
            "level": 4,
            "reading": "か",
            "meaning": "Flower"
        },
        "見": {
            "level": 4,
            "reading": "けん",
            "meaning": "See"
        },
        "貝": {
            "level": 4,
            "reading": "かい",
            "meaning": "Shellfish"
        },
        "赤": {
            "level": 4,
            "reading": "せき",
            "meaning": "Red"
        },
        "足": {
            "level": 4,
            "reading": "そく",
            "meaning": "Foot"
        },
        "車": {
            "level": 4,
            "reading": "しゃ",
            "meaning": "Car"
        },
        "不": {
            "level": 4,
            "reading": "ふ",
            "meaning": "Not"
        },
        "仕": {
            "level": 4,
            "reading": "し",
            "meaning": "Doing"
        },
        "交": {
            "level": 5,
            "reading": "こう",
            "meaning": "Mix"
        },
        "会": {
            "level": 5,
            "reading": "かい",
            "meaning": "Meet"
        },
        "光": {
            "level": 5,
            "reading": "こう",
            "meaning": "Sunlight"
        },
        "同": {
            "level": 5,
            "reading": "どう",
            "meaning": "Same"
        },
        "回": {
            "level": 5,
            "reading": "かい",
            "meaning": "Times"
        },
        "多": {
            "level": 5,
            "reading": "た",
            "meaning": "Many"
        },
        "当": {
            "level": 5,
            "reading": "とう",
            "meaning": "Correct"
        },
        "毎": {
            "level": 5,
            "reading": "まい",
            "meaning": "Every"
        },
        "池": {
            "level": 8,
            "reading": "ち",
            "meaning": "Pond"
        },
        "米": {
            "level": 5,
            "reading": "べい",
            "meaning": "Rice"
        },
        "羽": {
            "level": 5,
            "reading": "う",
            "meaning": "Feather"
        },
        "考": {
            "level": 5,
            "reading": "こう",
            "meaning": "Think"
        },
        "肉": {
            "level": 5,
            "reading": "にく",
            "meaning": "Meat"
        },
        "自": {
            "level": 5,
            "reading": "じ",
            "meaning": "Self"
        },
        "色": {
            "level": 5,
            "reading": "しき",
            "meaning": "Color"
        },
        "行": {
            "level": 5,
            "reading": "こう",
            "meaning": "Go"
        },
        "西": {
            "level": 5,
            "reading": "せい",
            "meaning": "West"
        },
        "何": {
            "level": 5,
            "reading": "か",
            "meaning": "What"
        },
        "体": {
            "level": 5,
            "reading": "たい",
            "meaning": "Body"
        },
        "作": {
            "level": 5,
            "reading": "さく",
            "meaning": "Make"
        },
        "図": {
            "level": 5,
            "reading": "ず",
            "meaning": "Diagram"
        },
        "声": {
            "level": 5,
            "reading": "せい",
            "meaning": "Voice"
        },
        "売": {
            "level": 9,
            "reading": "ばい",
            "meaning": "Sell"
        },
        "弟": {
            "level": 5,
            "reading": "だい",
            "meaning": "Younger Brother"
        },
        "形": {
            "level": 5,
            "reading": "けい",
            "meaning": "Shape"
        },
        "来": {
            "level": 5,
            "reading": "らい",
            "meaning": "Come"
        },
        "社": {
            "level": 5,
            "reading": "しゃ",
            "meaning": "Company"
        },
        "角": {
            "level": 5,
            "reading": "かく",
            "meaning": "Angle"
        },
        "言": {
            "level": 5,
            "reading": "げん",
            "meaning": "Say"
        },
        "谷": {
            "level": 5,
            "reading": "こく",
            "meaning": "Valley"
        },
        "走": {
            "level": 5,
            "reading": "そう",
            "meaning": "Run"
        },
        "近": {
            "level": 5,
            "reading": "きん",
            "meaning": "Near"
        },
        "里": {
            "level": 5,
            "reading": "り",
            "meaning": "Hometown"
        },
        "麦": {
            "level": 5,
            "reading": "ばく",
            "meaning": "Wheat"
        },
        "学": {
            "level": 5,
            "reading": "がく",
            "meaning": "Study"
        },
        "林": {
            "level": 5,
            "reading": "りん",
            "meaning": "Forest"
        },
        "空": {
            "level": 5,
            "reading": "くう",
            "meaning": "Sky"
        },
        "金": {
            "level": 5,
            "reading": "きん",
            "meaning": "Gold"
        },
        "雨": {
            "level": 5,
            "reading": "う",
            "meaning": "Rain"
        },
        "青": {
            "level": 5,
            "reading": "せい",
            "meaning": "Blue"
        },
        "草": {
            "level": 5,
            "reading": "そう",
            "meaning": "Grass"
        },
        "音": {
            "level": 5,
            "reading": "おん",
            "meaning": "Sound"
        },
        "化": {
            "level": 6,
            "reading": "か",
            "meaning": "Change"
        },
        "地": {
            "level": 6,
            "reading": "ち",
            "meaning": "Earth"
        },
        "両": {
            "level": 6,
            "reading": "りょう",
            "meaning": "Both"
        },
        "全": {
            "level": 6,
            "reading": "ぜん",
            "meaning": "All"
        },
        "向": {
            "level": 6,
            "reading": "こう",
            "meaning": "Yonder"
        },
        "安": {
            "level": 6,
            "reading": "あん",
            "meaning": "Relax"
        },
        "州": {
            "level": 6,
            "reading": "しゅう",
            "meaning": "State"
        },
        "曲": {
            "level": 6,
            "reading": "きょく",
            "meaning": "Music"
        },
        "有": {
            "level": 6,
            "reading": "ゆう",
            "meaning": "Have"
        },
        "次": {
            "level": 6,
            "reading": "じ",
            "meaning": "Next"
        },
        "死": {
            "level": 6,
            "reading": "し",
            "meaning": "Death"
        },
        "羊": {
            "level": 6,
            "reading": "よう",
            "meaning": "Sheep"
        },
        "血": {
            "level": 6,
            "reading": "けつ",
            "meaning": "Blood"
        },
        "京": {
            "level": 6,
            "reading": "きょう",
            "meaning": "Capital"
        },
        "国": {
            "level": 6,
            "reading": "こく",
            "meaning": "Country"
        },
        "夜": {
            "level": 6,
            "reading": "や",
            "meaning": "Night"
        },
        "妹": {
            "level": 6,
            "reading": "まい",
            "meaning": "Younger Sister"
        },
        "姉": {
            "level": 6,
            "reading": "し",
            "meaning": "Older Sister"
        },
        "店": {
            "level": 6,
            "reading": "てん",
            "meaning": "Shop"
        },
        "明": {
            "level": 6,
            "reading": "めい",
            "meaning": "Bright"
        },
        "東": {
            "level": 6,
            "reading": "とう",
            "meaning": "East"
        },
        "歩": {
            "level": 6,
            "reading": "ほ",
            "meaning": "Walk"
        },
        "画": {
            "level": 6,
            "reading": "が",
            "meaning": "Drawing"
        },
        "直": {
            "level": 6,
            "reading": "ちょく",
            "meaning": "Fix"
        },
        "知": {
            "level": 6,
            "reading": "ち",
            "meaning": "Know"
        },
        "長": {
            "level": 6,
            "reading": "ちょう",
            "meaning": "Long"
        },
        "前": {
            "level": 6,
            "reading": "ぜん",
            "meaning": "Front"
        },
        "南": {
            "level": 6,
            "reading": "なん",
            "meaning": "South"
        },
        "室": {
            "level": 6,
            "reading": "しつ",
            "meaning": "Room"
        },
        "後": {
            "level": 6,
            "reading": "ご",
            "meaning": "Behind"
        },
        "思": {
            "level": 6,
            "reading": "し",
            "meaning": "Think"
        },
        "星": {
            "level": 6,
            "reading": "せい",
            "meaning": "Star"
        },
        "活": {
            "level": 6,
            "reading": "かつ",
            "meaning": "Lively"
        },
        "海": {
            "level": 6,
            "reading": "かい",
            "meaning": "Sea"
        },
        "点": {
            "level": 6,
            "reading": "てん",
            "meaning": "Point"
        },
        "科": {
            "level": 6,
            "reading": "か",
            "meaning": "Course"
        },
        "茶": {
            "level": 6,
            "reading": "ちゃ",
            "meaning": "Tea"
        },
        "食": {
            "level": 6,
            "reading": "しょく",
            "meaning": "Eat"
        },
        "首": {
            "level": 6,
            "reading": "しゅ",
            "meaning": "Neck"
        },
        "欠": {
            "level": 7,
            "reading": "けつ",
            "meaning": "Lack"
        },
        "氏": {
            "level": 7,
            "reading": "し",
            "meaning": "Family Name"
        },
        "由": {
            "level": 7,
            "reading": "ゆう",
            "meaning": "Reason"
        },
        "札": {
            "level": 7,
            "reading": "さつ",
            "meaning": "Bill"
        },
        "民": {
            "level": 7,
            "reading": "みん",
            "meaning": "Peoples"
        },
        "辺": {
            "level": 7,
            "reading": "へん",
            "meaning": "Area"
        },
        "付": {
            "level": 7,
            "reading": "ふ",
            "meaning": "Attach"
        },
        "以": {
            "level": 7,
            "reading": "い",
            "meaning": "From"
        },
        "失": {
            "level": 7,
            "reading": "しつ",
            "meaning": "Fault"
        },
        "必": {
            "level": 7,
            "reading": "ひつ",
            "meaning": "Certain"
        },
        "未": {
            "level": 7,
            "reading": "み",
            "meaning": "Not Yet"
        },
        "末": {
            "level": 7,
            "reading": "まつ",
            "meaning": "End"
        },
        "校": {
            "level": 7,
            "reading": "こう",
            "meaning": "School"
        },
        "夏": {
            "level": 7,
            "reading": "げ",
            "meaning": "Summer"
        },
        "家": {
            "level": 7,
            "reading": "か",
            "meaning": "House"
        },
        "弱": {
            "level": 7,
            "reading": "じゃく",
            "meaning": "Weak"
        },
        "時": {
            "level": 7,
            "reading": "じ",
            "meaning": "Time"
        },
        "紙": {
            "level": 7,
            "reading": "し",
            "meaning": "Paper"
        },
        "記": {
            "level": 7,
            "reading": "き",
            "meaning": "Write Down"
        },
        "通": {
            "level": 7,
            "reading": "つう",
            "meaning": "Pass Through"
        },
        "高": {
            "level": 7,
            "reading": "こう",
            "meaning": "Tall"
        },
        "強": {
            "level": 7,
            "reading": "きょう",
            "meaning": "Strong"
        },
        "教": {
            "level": 7,
            "reading": "きょう",
            "meaning": "Teach"
        },
        "理": {
            "level": 7,
            "reading": "り",
            "meaning": "Reason"
        },
        "組": {
            "level": 7,
            "reading": "そ",
            "meaning": "Group"
        },
        "船": {
            "level": 7,
            "reading": "せん",
            "meaning": "Boat"
        },
        "週": {
            "level": 7,
            "reading": "しゅう",
            "meaning": "Week"
        },
        "雪": {
            "level": 7,
            "reading": "せつ",
            "meaning": "Snow"
        },
        "魚": {
            "level": 7,
            "reading": "ぎょ",
            "meaning": "Fish"
        },
        "鳥": {
            "level": 7,
            "reading": "ちょう",
            "meaning": "Bird"
        },
        "黄": {
            "level": 7,
            "reading": "おう",
            "meaning": "Yellow"
        },
        "黒": {
            "level": 7,
            "reading": "こく",
            "meaning": "Black"
        },
        "支": {
            "level": 8,
            "reading": "し",
            "meaning": "Support"
        },
        "住": {
            "level": 8,
            "reading": "じゅう",
            "meaning": "Dwell"
        },
        "助": {
            "level": 8,
            "reading": "じょ",
            "meaning": "Help"
        },
        "医": {
            "level": 8,
            "reading": "い",
            "meaning": "Medicine"
        },
        "君": {
            "level": 8,
            "reading": "くん",
            "meaning": "Buddy"
        },
        "対": {
            "level": 8,
            "reading": "たい",
            "meaning": "Versus"
        },
        "局": {
            "level": 8,
            "reading": "きょく",
            "meaning": "Bureau"
        },
        "役": {
            "level": 8,
            "reading": "やく",
            "meaning": "Service"
        },
        "投": {
            "level": 8,
            "reading": "とう",
            "meaning": "Throw"
        },
        "決": {
            "level": 8,
            "reading": "けつ",
            "meaning": "Decide"
        },
        "究": {
            "level": 8,
            "reading": "きゅう",
            "meaning": "Research"
        },
        "身": {
            "level": 8,
            "reading": "しん",
            "meaning": "Somebody"
        },
        "者": {
            "level": 8,
            "reading": "しゃ",
            "meaning": "Someone"
        },
        "研": {
            "level": 8,
            "reading": "けん",
            "meaning": "Sharpen"
        },
        "馬": {
            "level": 8,
            "reading": "ば",
            "meaning": "Horse"
        },
        "森": {
            "level": 8,
            "reading": "しん",
            "meaning": "Forest"
        },
        "場": {
            "level": 8,
            "reading": "じょう",
            "meaning": "Location"
        },
        "朝": {
            "level": 8,
            "reading": "ちょう",
            "meaning": "Morning"
        },
        "番": {
            "level": 8,
            "reading": "ばん",
            "meaning": "Number In A Series"
        },
        "答": {
            "level": 8,
            "reading": "とう",
            "meaning": "Answer"
        },
        "絵": {
            "level": 8,
            "reading": "え",
            "meaning": "Drawing"
        },
        "買": {
            "level": 8,
            "reading": "ばい",
            "meaning": "Buy"
        },
        "道": {
            "level": 8,
            "reading": "どう",
            "meaning": "Road"
        },
        "間": {
            "level": 8,
            "reading": "かん",
            "meaning": "Interval"
        },
        "雲": {
            "level": 8,
            "reading": "うん",
            "meaning": "Cloud"
        },
        "数": {
            "level": 8,
            "reading": "すう",
            "meaning": "Count"
        },
        "楽": {
            "level": 8,
            "reading": "らく",
            "meaning": "Comfort"
        },
        "話": {
            "level": 8,
            "reading": "わ",
            "meaning": "Talk"
        },
        "電": {
            "level": 8,
            "reading": "でん",
            "meaning": "Electricity"
        },
        "所": {
            "level": 8,
            "reading": "しょ",
            "meaning": "Place"
        },
        "事": {
            "level": 9,
            "reading": "じ",
            "meaning": "Action"
        },
        "使": {
            "level": 9,
            "reading": "し",
            "meaning": "Use"
        },
        "具": {
            "level": 9,
            "reading": "ぐ",
            "meaning": "Tool"
        },
        "受": {
            "level": 9,
            "reading": "じゅ",
            "meaning": "Accept"
        },
        "和": {
            "level": 9,
            "reading": "わ",
            "meaning": "Peace"
        },
        "始": {
            "level": 10,
            "reading": "し",
            "meaning": "Begin"
        },
        "定": {
            "level": 9,
            "reading": "てい",
            "meaning": "Determine"
        },
        "実": {
            "level": 9,
            "reading": "じつ",
            "meaning": "Truth"
        },
        "服": {
            "level": 9,
            "reading": "ふく",
            "meaning": "Clothes"
        },
        "泳": {
            "level": 9,
            "reading": "えい",
            "meaning": "Swim"
        },
        "物": {
            "level": 9,
            "reading": "ぶつ",
            "meaning": "Thing"
        },
        "苦": {
            "level": 9,
            "reading": "く",
            "meaning": "Suffering"
        },
        "表": {
            "level": 9,
            "reading": "ひょう",
            "meaning": "Express"
        },
        "部": {
            "level": 9,
            "reading": "ぶ",
            "meaning": "Part"
        },
        "乗": {
            "level": 9,
            "reading": "じょう",
            "meaning": "Ride"
        },
        "客": {
            "level": 9,
            "reading": "きゃく",
            "meaning": "Guest"
        },
        "屋": {
            "level": 9,
            "reading": "おく",
            "meaning": "Roof"
        },
        "度": {
            "level": 9,
            "reading": "ど",
            "meaning": "Degree"
        },
        "待": {
            "level": 12,
            "reading": "たい",
            "meaning": "Wait"
        },
        "持": {
            "level": 9,
            "reading": "じ",
            "meaning": "Hold"
        },
        "界": {
            "level": 9,
            "reading": "かい",
            "meaning": "World"
        },
        "発": {
            "level": 9,
            "reading": "はつ",
            "meaning": "Departure"
        },
        "相": {
            "level": 9,
            "reading": "そう",
            "meaning": "Mutual"
        },
        "県": {
            "level": 9,
            "reading": "けん",
            "meaning": "Prefecture"
        },
        "美": {
            "level": 9,
            "reading": "び",
            "meaning": "Beauty"
        },
        "負": {
            "level": 9,
            "reading": "ふ",
            "meaning": "Lose"
        },
        "送": {
            "level": 9,
            "reading": "そう",
            "meaning": "Send"
        },
        "重": {
            "level": 9,
            "reading": "じゅう",
            "meaning": "Heavy"
        },
        "談": {
            "level": 9,
            "reading": "だん",
            "meaning": "Discuss"
        },
        "要": {
            "level": 9,
            "reading": "よう",
            "meaning": "Need"
        },
        "勝": {
            "level": 9,
            "reading": "しょう",
            "meaning": "Win"
        },
        "仮": {
            "level": 9,
            "reading": "か",
            "meaning": "Temporary"
        },
        "起": {
            "level": 10,
            "reading": "き",
            "meaning": "Wake Up"
        },
        "速": {
            "level": 10,
            "reading": "そく",
            "meaning": "Fast"
        },
        "配": {
            "level": 10,
            "reading": "はい",
            "meaning": "Distribute"
        },
        "酒": {
            "level": 10,
            "reading": "しゅ",
            "meaning": "Alcohol"
        },
        "院": {
            "level": 10,
            "reading": "いん",
            "meaning": "Institution"
        },
        "終": {
            "level": 10,
            "reading": "しゅう",
            "meaning": "End"
        },
        "習": {
            "level": 10,
            "reading": "しゅう",
            "meaning": "Learn"
        },
        "転": {
            "level": 10,
            "reading": "てん",
            "meaning": "Revolve"
        },
        "進": {
            "level": 10,
            "reading": "しん",
            "meaning": "Advance"
        },
        "落": {
            "level": 10,
            "reading": "らく",
            "meaning": "Fall"
        },
        "葉": {
            "level": 10,
            "reading": "よう",
            "meaning": "Leaf"
        },
        "軽": {
            "level": 10,
            "reading": "けい",
            "meaning": "Lightweight"
        },
        "運": {
            "level": 10,
            "reading": "うん",
            "meaning": "Carry"
        },
        "開": {
            "level": 10,
            "reading": "かい",
            "meaning": "Open"
        },
        "集": {
            "level": 10,
            "reading": "しゅう",
            "meaning": "Collect"
        },
        "飲": {
            "level": 10,
            "reading": "いん",
            "meaning": "Drink"
        },
        "業": {
            "level": 10,
            "reading": "ぎょう",
            "meaning": "Business"
        },
        "漢": {
            "level": 10,
            "reading": "かん",
            "meaning": "Chinese"
        },
        "路": {
            "level": 10,
            "reading": "ろ",
            "meaning": "Road"
        },
        "農": {
            "level": 10,
            "reading": "のう",
            "meaning": "Farming"
        },
        "鉄": {
            "level": 10,
            "reading": "てつ",
            "meaning": "Iron"
        },
        "歌": {
            "level": 10,
            "reading": "か",
            "meaning": "Song"
        },
        "算": {
            "level": 10,
            "reading": "さん",
            "meaning": "Calculate"
        },
        "聞": {
            "level": 10,
            "reading": "ぶん",
            "meaning": "Hear"
        },
        "語": {
            "level": 10,
            "reading": "ご",
            "meaning": "Language"
        },
        "読": {
            "level": 10,
            "reading": "とう",
            "meaning": "Read"
        },
        "鳴": {
            "level": 10,
            "reading": "めい",
            "meaning": "Chirp"
        },
        "線": {
            "level": 10,
            "reading": "せん",
            "meaning": "Line"
        },
        "横": {
            "level": 10,
            "reading": "おう",
            "meaning": "Side"
        },
        "調": {
            "level": 10,
            "reading": "ちょう",
            "meaning": "Investigate"
        },
        "親": {
            "level": 10,
            "reading": "しん",
            "meaning": "Parent"
        },
        "頭": {
            "level": 10,
            "reading": "ず",
            "meaning": "Head"
        },
        "顔": {
            "level": 10,
            "reading": "がん",
            "meaning": "Face"
        },
        "病": {
            "level": 10,
            "reading": "びょう",
            "meaning": "Sick"
        },
        "最": {
            "level": 10,
            "reading": "さい",
            "meaning": "Most"
        },
        "争": {
            "level": 11,
            "reading": "そう",
            "meaning": "Conflict"
        },
        "仲": {
            "level": 11,
            "reading": "ちゅう",
            "meaning": "Relationship"
        },
        "伝": {
            "level": 11,
            "reading": "でん",
            "meaning": "Transmit"
        },
        "共": {
            "level": 11,
            "reading": "きょう",
            "meaning": "Together"
        },
        "好": {
            "level": 11,
            "reading": "こう",
            "meaning": "Like"
        },
        "成": {
            "level": 11,
            "reading": "せい",
            "meaning": "Become"
        },
        "老": {
            "level": 11,
            "reading": "ろう",
            "meaning": "Elderly"
        },
        "位": {
            "level": 11,
            "reading": "い",
            "meaning": "Rank"
        },
        "低": {
            "level": 11,
            "reading": "てい",
            "meaning": "Low"
        },
        "初": {
            "level": 11,
            "reading": "しょ",
            "meaning": "First"
        },
        "別": {
            "level": 11,
            "reading": "べつ",
            "meaning": "Separate"
        },
        "利": {
            "level": 11,
            "reading": "り",
            "meaning": "Profit"
        },
        "努": {
            "level": 11,
            "reading": "ど",
            "meaning": "Toil"
        },
        "労": {
            "level": 11,
            "reading": "ろう",
            "meaning": "Labor"
        },
        "命": {
            "level": 11,
            "reading": "めい",
            "meaning": "Fate"
        },
        "岸": {
            "level": 11,
            "reading": "がん",
            "meaning": "Coast"
        },
        "放": {
            "level": 11,
            "reading": "ほう",
            "meaning": "Release"
        },
        "昔": {
            "level": 11,
            "reading": "むかし",
            "meaning": "Long Ago"
        },
        "波": {
            "level": 11,
            "reading": "は",
            "meaning": "Wave"
        },
        "注": {
            "level": 11,
            "reading": "ちゅう",
            "meaning": "Pour"
        },
        "育": {
            "level": 11,
            "reading": "いく",
            "meaning": "Nurture"
        },
        "拾": {
            "level": 11,
            "reading": "ひろ",
            "meaning": "Pick Up"
        },
        "指": {
            "level": 11,
            "reading": "し",
            "meaning": "Finger"
        },
        "洋": {
            "level": 11,
            "reading": "よう",
            "meaning": "Western Style"
        },
        "神": {
            "level": 11,
            "reading": "しん",
            "meaning": "God"
        },
        "秒": {
            "level": 11,
            "reading": "びょう",
            "meaning": "Second"
        },
        "級": {
            "level": 11,
            "reading": "きゅう",
            "meaning": "Level"
        },
        "追": {
            "level": 11,
            "reading": "つい",
            "meaning": "Follow"
        },
        "戦": {
            "level": 11,
            "reading": "せん",
            "meaning": "War"
        },
        "競": {
            "level": 11,
            "reading": "きょう",
            "meaning": "Compete"
        },
        "良": {
            "level": 11,
            "reading": "りょう",
            "meaning": "Good"
        },
        "功": {
            "level": 11,
            "reading": "こう",
            "meaning": "Achievement"
        },
        "特": {
            "level": 11,
            "reading": "とく",
            "meaning": "Special"
        },
        "便": {
            "level": 11,
            "reading": "べん",
            "meaning": "Convenience"
        },
        "働": {
            "level": 11,
            "reading": "どう",
            "meaning": "Work"
        },
        "令": {
            "level": 11,
            "reading": "れい",
            "meaning": "Orders"
        },
        "意": {
            "level": 11,
            "reading": "い",
            "meaning": "Idea"
        },
        "味": {
            "level": 11,
            "reading": "み",
            "meaning": "Flavor"
        },
        "勉": {
            "level": 12,
            "reading": "べん",
            "meaning": "Exertion"
        },
        "庭": {
            "level": 12,
            "reading": "てい",
            "meaning": "Garden"
        },
        "息": {
            "level": 12,
            "reading": "そく",
            "meaning": "Breath"
        },
        "旅": {
            "level": 12,
            "reading": "りょ",
            "meaning": "Trip"
        },
        "根": {
            "level": 12,
            "reading": "こん",
            "meaning": "Root"
        },
        "流": {
            "level": 12,
            "reading": "りゅう",
            "meaning": "Stream"
        },
        "消": {
            "level": 12,
            "reading": "しょう",
            "meaning": "Extinguish"
        },
        "倍": {
            "level": 12,
            "reading": "ばい",
            "meaning": "Double"
        },
        "員": {
            "level": 12,
            "reading": "いん",
            "meaning": "Member"
        },
        "島": {
            "level": 12,
            "reading": "とう",
            "meaning": "Island"
        },
        "祭": {
            "level": 12,
            "reading": "さい",
            "meaning": "Festival"
        },
        "章": {
            "level": 12,
            "reading": "しょう",
            "meaning": "Chapter"
        },
        "第": {
            "level": 12,
            "reading": "だい",
            "meaning": "Ordinal Number Prefix"
        },
        "都": {
            "level": 12,
            "reading": "と",
            "meaning": "Metropolis"
        },
        "動": {
            "level": 12,
            "reading": "どう",
            "meaning": "Move"
        },
        "商": {
            "level": 12,
            "reading": "しょう",
            "meaning": "Merchandise"
        },
        "悪": {
            "level": 12,
            "reading": "あく",
            "meaning": "Bad"
        },
        "族": {
            "level": 12,
            "reading": "ぞく",
            "meaning": "Tribe"
        },
        "深": {
            "level": 12,
            "reading": "しん",
            "meaning": "Deep"
        },
        "球": {
            "level": 12,
            "reading": "きゅう",
            "meaning": "Sphere"
        },
        "童": {
            "level": 12,
            "reading": "どう",
            "meaning": "Juvenile"
        },
        "陽": {
            "level": 12,
            "reading": "よう",
            "meaning": "Sunshine"
        },
        "階": {
            "level": 12,
            "reading": "かい",
            "meaning": "Floor"
        },
        "寒": {
            "level": 12,
            "reading": "かん",
            "meaning": "Cold"
        },
        "悲": {
            "level": 17,
            "reading": "ひ",
            "meaning": "Sad"
        },
        "暑": {
            "level": 12,
            "reading": "しょ",
            "meaning": "Hot"
        },
        "期": {
            "level": 12,
            "reading": "き",
            "meaning": "Period Of Time"
        },
        "植": {
            "level": 12,
            "reading": "しょく",
            "meaning": "Plant"
        },
        "歯": {
            "level": 12,
            "reading": "し",
            "meaning": "Tooth"
        },
        "温": {
            "level": 12,
            "reading": "おん",
            "meaning": "Warm"
        },
        "港": {
            "level": 12,
            "reading": "こう",
            "meaning": "Harbor"
        },
        "湯": {
            "level": 12,
            "reading": "とう",
            "meaning": "Hot Water"
        },
        "登": {
            "level": 12,
            "reading": "とう",
            "meaning": "Climb"
        },
        "着": {
            "level": 12,
            "reading": "ちゃく",
            "meaning": "Wear"
        },
        "短": {
            "level": 12,
            "reading": "たん",
            "meaning": "Short"
        },
        "野": {
            "level": 12,
            "reading": "や",
            "meaning": "Field"
        },
        "泉": {
            "level": 12,
            "reading": "せん",
            "meaning": "Spring"
        },
        "生": {
            "level": 3,
            "reading": "せい",
            "meaning": "Life"
        },
        "亡": {
            "level": 6,
            "reading": "ぼう",
            "meaning": "Death"
        },
        "合": {
            "level": 12,
            "reading": "ごう",
            "meaning": "Suit"
        },
        "風": {
            "level": 7,
            "reading": "ふう",
            "meaning": "Wind"
        },
        "予": {
            "level": 9,
            "reading": "よ",
            "meaning": "Beforehand"
        },
        "反": {
            "level": 8,
            "reading": "はん",
            "meaning": "Anti"
        },
        "々": {
            "level": 2,
            "reading": "のま",
            "meaning": "Repeater"
        },
        "新": {
            "level": 9,
            "reading": "しん",
            "meaning": "New"
        },
        "返": {
            "level": 9,
            "reading": "へん",
            "meaning": "Return"
        },
        "問": {
            "level": 13,
            "reading": "もん",
            "meaning": "Problem"
        },
        "宿": {
            "level": 13,
            "reading": "しゅく",
            "meaning": "Lodge"
        },
        "想": {
            "level": 13,
            "reading": "そう",
            "meaning": "Concept"
        },
        "感": {
            "level": 13,
            "reading": "かん",
            "meaning": "Feeling"
        },
        "整": {
            "level": 13,
            "reading": "せい",
            "meaning": "Arrange"
        },
        "暗": {
            "level": 13,
            "reading": "あん",
            "meaning": "Dark"
        },
        "様": {
            "level": 13,
            "reading": "よう",
            "meaning": "Formal Name Title"
        },
        "橋": {
            "level": 13,
            "reading": "きょう",
            "meaning": "Bridge"
        },
        "福": {
            "level": 15,
            "reading": "ふく",
            "meaning": "Luck"
        },
        "緑": {
            "level": 13,
            "reading": "りょく",
            "meaning": "Green"
        },
        "練": {
            "level": 13,
            "reading": "れん",
            "meaning": "Practice"
        },
        "詩": {
            "level": 13,
            "reading": "し",
            "meaning": "Poem"
        },
        "銀": {
            "level": 13,
            "reading": "ぎん",
            "meaning": "Silver"
        },
        "題": {
            "level": 13,
            "reading": "だい",
            "meaning": "Topic"
        },
        "館": {
            "level": 13,
            "reading": "かん",
            "meaning": "Public Building"
        },
        "駅": {
            "level": 13,
            "reading": "えき",
            "meaning": "Station"
        },
        "億": {
            "level": 13,
            "reading": "おく",
            "meaning": "Hundred Million"
        },
        "器": {
            "level": 13,
            "reading": "き",
            "meaning": "Container"
        },
        "士": {
            "level": 13,
            "reading": "し",
            "meaning": "Samurai"
        },
        "料": {
            "level": 13,
            "reading": "りょう",
            "meaning": "Fee"
        },
        "標": {
            "level": 13,
            "reading": "ひょう",
            "meaning": "Signpost"
        },
        "殺": {
            "level": 13,
            "reading": "さつ",
            "meaning": "Kill"
        },
        "然": {
            "level": 13,
            "reading": "ぜん",
            "meaning": "Nature"
        },
        "熱": {
            "level": 13,
            "reading": "ねつ",
            "meaning": "Heat"
        },
        "課": {
            "level": 13,
            "reading": "か",
            "meaning": "Section"
        },
        "賞": {
            "level": 13,
            "reading": "しょう",
            "meaning": "Prize"
        },
        "輪": {
            "level": 13,
            "reading": "りん",
            "meaning": "Wheel"
        },
        "選": {
            "level": 13,
            "reading": "せん",
            "meaning": "Choose"
        },
        "鏡": {
            "level": 13,
            "reading": "きょう",
            "meaning": "Mirror"
        },
        "願": {
            "level": 13,
            "reading": "がん",
            "meaning": "Request"
        },
        "養": {
            "level": 13,
            "reading": "よう",
            "meaning": "Foster"
        },
        "像": {
            "level": 13,
            "reading": "ぞう",
            "meaning": "Statue"
        },
        "情": {
            "level": 13,
            "reading": "じょう",
            "meaning": "Feeling"
        },
        "謝": {
            "level": 13,
            "reading": "しゃ",
            "meaning": "Apologize"
        },
        "映": {
            "level": 13,
            "reading": "えい",
            "meaning": "Reflect"
        },
        "疑": {
            "level": 13,
            "reading": "ぎ",
            "meaning": "Doubt"
        },
        "皆": {
            "level": 13,
            "reading": "かい",
            "meaning": "All"
        },
        "例": {
            "level": 14,
            "reading": "れい",
            "meaning": "Example"
        },
        "卒": {
            "level": 14,
            "reading": "そつ",
            "meaning": "Graduate"
        },
        "協": {
            "level": 14,
            "reading": "きょう",
            "meaning": "Cooperation"
        },
        "参": {
            "level": 14,
            "reading": "さん",
            "meaning": "Participate"
        },
        "周": {
            "level": 14,
            "reading": "しゅう",
            "meaning": "Circumference"
        },
        "囲": {
            "level": 14,
            "reading": "い",
            "meaning": "Surround"
        },
        "固": {
            "level": 14,
            "reading": "こ",
            "meaning": "Hard"
        },
        "季": {
            "level": 14,
            "reading": "き",
            "meaning": "Seasons"
        },
        "完": {
            "level": 14,
            "reading": "かん",
            "meaning": "Perfect"
        },
        "希": {
            "level": 14,
            "reading": "き",
            "meaning": "Wish"
        },
        "念": {
            "level": 14,
            "reading": "ねん",
            "meaning": "Thought"
        },
        "折": {
            "level": 14,
            "reading": "せつ",
            "meaning": "Fold"
        },
        "望": {
            "level": 14,
            "reading": "ぼう",
            "meaning": "Hope"
        },
        "材": {
            "level": 14,
            "reading": "ざい",
            "meaning": "Lumber"
        },
        "束": {
            "level": 14,
            "reading": "そく",
            "meaning": "Bundle"
        },
        "松": {
            "level": 14,
            "reading": "しょう",
            "meaning": "Pine"
        },
        "残": {
            "level": 14,
            "reading": "ざん",
            "meaning": "Remainder"
        },
        "求": {
            "level": 10,
            "reading": "きゅう",
            "meaning": "Request"
        },
        "的": {
            "level": 14,
            "reading": "てき",
            "meaning": "Target"
        },
        "約": {
            "level": 14,
            "reading": "やく",
            "meaning": "Promise"
        },
        "芸": {
            "level": 14,
            "reading": "げい",
            "meaning": "Art"
        },
        "基": {
            "level": 14,
            "reading": "き",
            "meaning": "Foundation"
        },
        "性": {
            "level": 14,
            "reading": "せい",
            "meaning": "Gender"
        },
        "技": {
            "level": 15,
            "reading": "ぎ",
            "meaning": "Skill"
        },
        "格": {
            "level": 14,
            "reading": "かく",
            "meaning": "Status"
        },
        "能": {
            "level": 14,
            "reading": "のう",
            "meaning": "Ability"
        },
        "術": {
            "level": 15,
            "reading": "じゅつ",
            "meaning": "Technique"
        },
        "私": {
            "level": 6,
            "reading": "し",
            "meaning": "I"
        },
        "骨": {
            "level": 14,
            "reading": "こつ",
            "meaning": "Bone"
        },
        "妥": {
            "level": 14,
            "reading": "だ",
            "meaning": "Gentle"
        },
        "雰": {
            "level": 14,
            "reading": "ふん",
            "meaning": "Atmosphere"
        },
        "頑": {
            "level": 14,
            "reading": "がん",
            "meaning": "Stubborn"
        },
        "寺": {
            "level": 15,
            "reading": "じ",
            "meaning": "Temple"
        },
        "岩": {
            "level": 15,
            "reading": "がん",
            "meaning": "Boulder"
        },
        "帰": {
            "level": 15,
            "reading": "き",
            "meaning": "Return"
        },
        "春": {
            "level": 15,
            "reading": "しゅん",
            "meaning": "Spring"
        },
        "昼": {
            "level": 15,
            "reading": "ちゅう",
            "meaning": "Noon"
        },
        "晴": {
            "level": 15,
            "reading": "せい",
            "meaning": "Clear Up"
        },
        "秋": {
            "level": 15,
            "reading": "あき",
            "meaning": "Autumn"
        },
        "計": {
            "level": 15,
            "reading": "けい",
            "meaning": "Measure"
        },
        "列": {
            "level": 15,
            "reading": "れつ",
            "meaning": "Row"
        },
        "区": {
            "level": 15,
            "reading": "く",
            "meaning": "District"
        },
        "坂": {
            "level": 15,
            "reading": "はん",
            "meaning": "Slope"
        },
        "式": {
            "level": 15,
            "reading": "しき",
            "meaning": "Ritual"
        },
        "信": {
            "level": 15,
            "reading": "しん",
            "meaning": "Believe"
        },
        "勇": {
            "level": 15,
            "reading": "ゆう",
            "meaning": "Courage"
        },
        "単": {
            "level": 15,
            "reading": "たん",
            "meaning": "Simple"
        },
        "司": {
            "level": 15,
            "reading": "し",
            "meaning": "Director"
        },
        "変": {
            "level": 15,
            "reading": "へん",
            "meaning": "Change"
        },
        "夫": {
            "level": 15,
            "reading": "ふう",
            "meaning": "Husband"
        },
        "建": {
            "level": 15,
            "reading": "けん",
            "meaning": "Build"
        },
        "昨": {
            "level": 15,
            "reading": "さく",
            "meaning": "Previous"
        },
        "毒": {
            "level": 15,
            "reading": "どく",
            "meaning": "Poison"
        },
        "法": {
            "level": 15,
            "reading": "ほう",
            "meaning": "Method"
        },
        "泣": {
            "level": 15,
            "reading": "きゅう",
            "meaning": "Cry"
        },
        "浅": {
            "level": 15,
            "reading": "せん",
            "meaning": "Shallow"
        },
        "紀": {
            "level": 15,
            "reading": "き",
            "meaning": "Account"
        },
        "英": {
            "level": 15,
            "reading": "えい",
            "meaning": "England"
        },
        "軍": {
            "level": 15,
            "reading": "ぐん",
            "meaning": "Army"
        },
        "飯": {
            "level": 15,
            "reading": "はん",
            "meaning": "Meal"
        },
        "仏": {
            "level": 15,
            "reading": "ぶつ",
            "meaning": "Buddha"
        },
        "築": {
            "level": 15,
            "reading": "ちく",
            "meaning": "Construct"
        },
        "晩": {
            "level": 15,
            "reading": "ばん",
            "meaning": "Night"
        },
        "猫": {
            "level": 15,
            "reading": "ねこ",
            "meaning": "Cat"
        },
        "園": {
            "level": 16,
            "reading": "えん",
            "meaning": "Garden"
        },
        "曜": {
            "level": 16,
            "reading": "よう",
            "meaning": "Weekday"
        },
        "書": {
            "level": 16,
            "reading": "しょ",
            "meaning": "Write"
        },
        "遠": {
            "level": 16,
            "reading": "えん",
            "meaning": "Far"
        },
        "門": {
            "level": 16,
            "reading": "もん",
            "meaning": "Gates"
        },
        "係": {
            "level": 16,
            "reading": "けい",
            "meaning": "Connection"
        },
        "取": {
            "level": 16,
            "reading": "しゅ",
            "meaning": "Take"
        },
        "品": {
            "level": 16,
            "reading": "ひん",
            "meaning": "Product"
        },
        "守": {
            "level": 16,
            "reading": "す",
            "meaning": "Protect"
        },
        "幸": {
            "level": 16,
            "reading": "こう",
            "meaning": "Happiness"
        },
        "急": {
            "level": 16,
            "reading": "きゅう",
            "meaning": "Hurry"
        },
        "真": {
            "level": 16,
            "reading": "しん",
            "meaning": "Reality"
        },
        "箱": {
            "level": 16,
            "reading": "はこ",
            "meaning": "Box"
        },
        "荷": {
            "level": 16,
            "reading": "か",
            "meaning": "Luggage"
        },
        "面": {
            "level": 16,
            "reading": "めん",
            "meaning": "Face"
        },
        "典": {
            "level": 16,
            "reading": "てん",
            "meaning": "Rule"
        },
        "喜": {
            "level": 17,
            "reading": "き",
            "meaning": "Rejoice"
        },
        "府": {
            "level": 16,
            "reading": "ふ",
            "meaning": "Government"
        },
        "治": {
            "level": 16,
            "reading": "じ",
            "meaning": "Cure"
        },
        "浴": {
            "level": 16,
            "reading": "よく",
            "meaning": "Bathe"
        },
        "笑": {
            "level": 16,
            "reading": "しょう",
            "meaning": "Laugh"
        },
        "辞": {
            "level": 16,
            "reading": "じ",
            "meaning": "Quit"
        },
        "関": {
            "level": 16,
            "reading": "かん",
            "meaning": "Related"
        },
        "保": {
            "level": 9,
            "reading": "ほ",
            "meaning": "Preserve"
        },
        "弁": {
            "level": 16,
            "reading": "べん",
            "meaning": "Dialect"
        },
        "政": {
            "level": 16,
            "reading": "せい",
            "meaning": "Politics"
        },
        "留": {
            "level": 16,
            "reading": "る",
            "meaning": "Detain"
        },
        "証": {
            "level": 16,
            "reading": "しょう",
            "meaning": "Evidence"
        },
        "険": {
            "level": 16,
            "reading": "けん",
            "meaning": "Risky"
        },
        "危": {
            "level": 16,
            "reading": "き",
            "meaning": "Dangerous"
        },
        "存": {
            "level": 16,
            "reading": "そん",
            "meaning": "Exist"
        },
        "専": {
            "level": 16,
            "reading": "せん",
            "meaning": "Specialty"
        },
        "冒": {
            "level": 16,
            "reading": "ぼう",
            "meaning": "Dare"
        },
        "冗": {
            "level": 16,
            "reading": "じょう",
            "meaning": "Superfluous"
        },
        "阪": {
            "level": 16,
            "reading": "はん",
            "meaning": "Heights"
        },
        "原": {
            "level": 17,
            "reading": "げん",
            "meaning": "Original"
        },
        "細": {
            "level": 17,
            "reading": "さい",
            "meaning": "Thin"
        },
        "薬": {
            "level": 17,
            "reading": "やく",
            "meaning": "Medicine"
        },
        "鼻": {
            "level": 17,
            "reading": "び",
            "meaning": "Nose"
        },
        "側": {
            "level": 17,
            "reading": "そく",
            "meaning": "Side"
        },
        "兵": {
            "level": 17,
            "reading": "へい",
            "meaning": "Soldier"
        },
        "堂": {
            "level": 17,
            "reading": "どう",
            "meaning": "Hall"
        },
        "塩": {
            "level": 17,
            "reading": "えん",
            "meaning": "Salt"
        },
        "席": {
            "level": 17,
            "reading": "せき",
            "meaning": "Seat"
        },
        "敗": {
            "level": 17,
            "reading": "はい",
            "meaning": "Failure"
        },
        "果": {
            "level": 17,
            "reading": "か",
            "meaning": "Fruit"
        },
        "栄": {
            "level": 17,
            "reading": "えい",
            "meaning": "Prosper"
        },
        "梅": {
            "level": 17,
            "reading": "ばい",
            "meaning": "Ume"
        },
        "無": {
            "level": 17,
            "reading": "む",
            "meaning": "Nothing"
        },
        "結": {
            "level": 17,
            "reading": "けつ",
            "meaning": "Bind"
        },
        "因": {
            "level": 17,
            "reading": "いん",
            "meaning": "Cause"
        },
        "常": {
            "level": 17,
            "reading": "じょう",
            "meaning": "Normal"
        },
        "識": {
            "level": 17,
            "reading": "しき",
            "meaning": "Discerning"
        },
        "非": {
            "level": 17,
            "reading": "ひ",
            "meaning": "Injustice"
        },
        "干": {
            "level": 17,
            "reading": "かん",
            "meaning": "Dry"
        },
        "是": {
            "level": 17,
            "reading": "ぜ",
            "meaning": "Absolutely"
        },
        "渉": {
            "level": 17,
            "reading": "しょう",
            "meaning": "Ford"
        },
        "虚": {
            "level": 17,
            "reading": "きょ",
            "meaning": "Void"
        },
        "官": {
            "level": 17,
            "reading": "かん",
            "meaning": "Government"
        },
        "察": {
            "level": 17,
            "reading": "さつ",
            "meaning": "Guess"
        },
        "底": {
            "level": 17,
            "reading": "てい",
            "meaning": "Bottom"
        },
        "愛": {
            "level": 17,
            "reading": "あい",
            "meaning": "Love"
        },
        "署": {
            "level": 17,
            "reading": "しょ",
            "meaning": "Government Office"
        },
        "警": {
            "level": 17,
            "reading": "けい",
            "meaning": "Warn"
        },
        "恋": {
            "level": 17,
            "reading": "れん",
            "meaning": "Romance"
        },
        "覚": {
            "level": 17,
            "reading": "かく",
            "meaning": "Memorize"
        },
        "説": {
            "level": 17,
            "reading": "せつ",
            "meaning": "Theory"
        },
        "幻": {
            "level": 17,
            "reading": "げん",
            "meaning": "Illusion"
        },
        "訓": {
            "level": 18,
            "reading": "くん",
            "meaning": "Instruction"
        },
        "試": {
            "level": 9,
            "reading": "し",
            "meaning": "Try"
        },
        "弓": {
            "level": 18,
            "reading": "きゅう",
            "meaning": "Bow"
        },
        "告": {
            "level": 18,
            "reading": "こく",
            "meaning": "Announce"
        },
        "種": {
            "level": 18,
            "reading": "しゅ",
            "meaning": "Kind"
        },
        "達": {
            "level": 18,
            "reading": "たつ",
            "meaning": "Attain"
        },
        "類": {
            "level": 18,
            "reading": "るい",
            "meaning": "Type"
        },
        "報": {
            "level": 18,
            "reading": "ほう",
            "meaning": "News"
        },
        "祈": {
            "level": 18,
            "reading": "き",
            "meaning": "Pray"
        },
        "等": {
            "level": 18,
            "reading": "とう",
            "meaning": "Equal"
        },
        "汽": {
            "level": 18,
            "reading": "き",
            "meaning": "Steam"
        },
        "借": {
            "level": 18,
            "reading": "しゃく",
            "meaning": "Borrow"
        },
        "焼": {
            "level": 18,
            "reading": "しょう",
            "meaning": "Bake"
        },
        "座": {
            "level": 18,
            "reading": "ざ",
            "meaning": "Sit"
        },
        "忘": {
            "level": 18,
            "reading": "ぼう",
            "meaning": "Forget"
        },
        "洗": {
            "level": 18,
            "reading": "せん",
            "meaning": "Wash"
        },
        "胸": {
            "level": 18,
            "reading": "きょう",
            "meaning": "Chest"
        },
        "脳": {
            "level": 18,
            "reading": "のう",
            "meaning": "Brain"
        },
        "僧": {
            "level": 18,
            "reading": "そう",
            "meaning": "Priest"
        },
        "禅": {
            "level": 18,
            "reading": "ぜん",
            "meaning": "Zen"
        },
        "験": {
            "level": 9,
            "reading": "けん",
            "meaning": "Test"
        },
        "可": {
            "level": 18,
            "reading": "か",
            "meaning": "Possible"
        },
        "許": {
            "level": 18,
            "reading": "きょ",
            "meaning": "Permit"
        },
        "枚": {
            "level": 18,
            "reading": "まい",
            "meaning": "Flat Objects Counter"
        },
        "静": {
            "level": 18,
            "reading": "せい",
            "meaning": "Quiet"
        },
        "句": {
            "level": 18,
            "reading": "く",
            "meaning": "Paragraph"
        },
        "禁": {
            "level": 18,
            "reading": "きん",
            "meaning": "Prohibit"
        },
        "喫": {
            "level": 18,
            "reading": "きつ",
            "meaning": "Consume"
        },
        "煙": {
            "level": 18,
            "reading": "えん",
            "meaning": "Smoke"
        },
        "加": {
            "level": 19,
            "reading": "か",
            "meaning": "Add"
        },
        "節": {
            "level": 19,
            "reading": "せつ",
            "meaning": "Season"
        },
        "減": {
            "level": 19,
            "reading": "げん",
            "meaning": "Decrease"
        },
        "順": {
            "level": 19,
            "reading": "じゅん",
            "meaning": "Order"
        },
        "容": {
            "level": 19,
            "reading": "よう",
            "meaning": "Form"
        },
        "布": {
            "level": 19,
            "reading": "ふ",
            "meaning": "Cloth"
        },
        "易": {
            "level": 19,
            "reading": "い",
            "meaning": "Easy"
        },
        "財": {
            "level": 19,
            "reading": "さい",
            "meaning": "Wealth"
        },
        "若": {
            "level": 19,
            "reading": "じゃく",
            "meaning": "Young"
        },
        "詞": {
            "level": 19,
            "reading": "し",
            "meaning": "Part Of Speech"
        },
        "昆": {
            "level": 19,
            "reading": "こん",
            "meaning": "Insect"
        },
        "閥": {
            "level": 19,
            "reading": "ばつ",
            "meaning": "Clique"
        },
        "歴": {
            "level": 19,
            "reading": "れき",
            "meaning": "Continuation"
        },
        "舌": {
            "level": 19,
            "reading": "ぜつ",
            "meaning": "Tongue"
        },
        "冊": {
            "level": 19,
            "reading": "さつ",
            "meaning": "Book Counter"
        },
        "宇": {
            "level": 19,
            "reading": "う",
            "meaning": "Outer Space"
        },
        "宙": {
            "level": 19,
            "reading": "ちゅう",
            "meaning": "Midair"
        },
        "忙": {
            "level": 19,
            "reading": "ぼう",
            "meaning": "Busy"
        },
        "履": {
            "level": 19,
            "reading": "り",
            "meaning": "Boots"
        },
        "団": {
            "level": 19,
            "reading": "だん",
            "meaning": "Group"
        },
        "暴": {
            "level": 19,
            "reading": "ぼう",
            "meaning": "Violence"
        },
        "混": {
            "level": 19,
            "reading": "こん",
            "meaning": "Mix"
        },
        "乱": {
            "level": 19,
            "reading": "らん",
            "meaning": "Riot"
        },
        "徒": {
            "level": 19,
            "reading": "と",
            "meaning": "Junior"
        },
        "得": {
            "level": 19,
            "reading": "とく",
            "meaning": "Acquire"
        },
        "改": {
            "level": 19,
            "reading": "かい",
            "meaning": "Renew"
        },
        "続": {
            "level": 19,
            "reading": "ぞく",
            "meaning": "Continue"
        },
        "連": {
            "level": 19,
            "reading": "れん",
            "meaning": "Take Along"
        },
        "善": {
            "level": 19,
            "reading": "ぜん",
            "meaning": "Morally Good"
        },
        "困": {
            "level": 20,
            "reading": "こん",
            "meaning": "Distressed"
        },
        "絡": {
            "level": 19,
            "reading": "らく",
            "meaning": "Entangle"
        },
        "比": {
            "level": 19,
            "reading": "ひ",
            "meaning": "Compare"
        },
        "災": {
            "level": 20,
            "reading": "さい",
            "meaning": "Disaster"
        },
        "機": {
            "level": 20,
            "reading": "き",
            "meaning": "Machine"
        },
        "率": {
            "level": 20,
            "reading": "りつ",
            "meaning": "Percent"
        },
        "飛": {
            "level": 20,
            "reading": "ひ",
            "meaning": "Fly"
        },
        "害": {
            "level": 20,
            "reading": "がい",
            "meaning": "Damage"
        },
        "余": {
            "level": 20,
            "reading": "よ",
            "meaning": "Surplus"
        },
        "難": {
            "level": 20,
            "reading": "なん",
            "meaning": "Difficult"
        },
        "妨": {
            "level": 20,
            "reading": "ぼう",
            "meaning": "Obstruct"
        },
        "被": {
            "level": 20,
            "reading": "ひ",
            "meaning": "Incur"
        },
        "裕": {
            "level": 20,
            "reading": "ゆう",
            "meaning": "Abundant"
        },
        "震": {
            "level": 20,
            "reading": "しん",
            "meaning": "Earthquake"
        },
        "尻": {
            "level": 20,
            "reading": "しり",
            "meaning": "Butt"
        },
        "尾": {
            "level": 20,
            "reading": "び",
            "meaning": "Tail"
        },
        "械": {
            "level": 20,
            "reading": "かい",
            "meaning": "Contraption"
        },
        "確": {
            "level": 20,
            "reading": "かく",
            "meaning": "Certain"
        },
        "嫌": {
            "level": 20,
            "reading": "けん",
            "meaning": "Dislike"
        },
        "個": {
            "level": 20,
            "reading": "こ",
            "meaning": "Individual"
        },
        "圧": {
            "level": 20,
            "reading": "あつ",
            "meaning": "Pressure"
        },
        "在": {
            "level": 20,
            "reading": "ざい",
            "meaning": "Exist"
        },
        "夢": {
            "level": 20,
            "reading": "む",
            "meaning": "Dream"
        },
        "産": {
            "level": 20,
            "reading": "さん",
            "meaning": "Give Birth"
        },
        "倒": {
            "level": 20,
            "reading": "とう",
            "meaning": "Overthrow"
        },
        "臭": {
            "level": 20,
            "reading": "しゅう",
            "meaning": "Stinking"
        },
        "厚": {
            "level": 20,
            "reading": "こう",
            "meaning": "Thick"
        },
        "妻": {
            "level": 20,
            "reading": "さい",
            "meaning": "Wife"
        },
        "議": {
            "level": 20,
            "reading": "ぎ",
            "meaning": "Deliberation"
        },
        "犯": {
            "level": 20,
            "reading": "はん",
            "meaning": "Crime"
        },
        "罪": {
            "level": 20,
            "reading": "ざい",
            "meaning": "Guilt"
        },
        "防": {
            "level": 20,
            "reading": "ぼう",
            "meaning": "Prevent"
        },
        "穴": {
            "level": 20,
            "reading": "けつ",
            "meaning": "Hole"
        },
        "論": {
            "level": 20,
            "reading": "ろん",
            "meaning": "Theory"
        },
        "経": {
            "level": 20,
            "reading": "けい",
            "meaning": "Passage of Time"
        },
        "笛": {
            "level": 19,
            "reading": "てき",
            "meaning": "Flute"
        },
        "史": {
            "level": 19,
            "reading": "し",
            "meaning": "History"
        },
        "敵": {
            "level": 21,
            "reading": "てき",
            "meaning": "Enemy"
        },
        "済": {
            "level": 21,
            "reading": "さい",
            "meaning": "Come To An End"
        },
        "委": {
            "level": 21,
            "reading": "い",
            "meaning": "Committee"
        },
        "挙": {
            "level": 21,
            "reading": "きょ",
            "meaning": "Raise"
        },
        "判": {
            "level": 21,
            "reading": "はん",
            "meaning": "Judge"
        },
        "制": {
            "level": 21,
            "reading": "せい",
            "meaning": "Control"
        },
        "務": {
            "level": 21,
            "reading": "む",
            "meaning": "Task"
        },
        "査": {
            "level": 21,
            "reading": "さ",
            "meaning": "Inspect"
        },
        "総": {
            "level": 21,
            "reading": "そう",
            "meaning": "Whole"
        },
        "設": {
            "level": 21,
            "reading": "せつ",
            "meaning": "Establish"
        },
        "資": {
            "level": 21,
            "reading": "し",
            "meaning": "Resources"
        },
        "権": {
            "level": 21,
            "reading": "けん",
            "meaning": "Rights"
        },
        "件": {
            "level": 21,
            "reading": "けん",
            "meaning": "Matter"
        },
        "派": {
            "level": 21,
            "reading": "は",
            "meaning": "Sect"
        },
        "岡": {
            "level": 21,
            "reading": "おか",
            "meaning": "Hill"
        },
        "素": {
            "level": 21,
            "reading": "そ",
            "meaning": "Element"
        },
        "断": {
            "level": 21,
            "reading": "だん",
            "meaning": "Cut Off"
        },
        "評": {
            "level": 21,
            "reading": "ひょう",
            "meaning": "Evaluate"
        },
        "批": {
            "level": 21,
            "reading": "ひ",
            "meaning": "Criticism"
        },
        "任": {
            "level": 21,
            "reading": "にん",
            "meaning": "Duty"
        },
        "検": {
            "level": 21,
            "reading": "けん",
            "meaning": "Examine"
        },
        "審": {
            "level": 21,
            "reading": "しん",
            "meaning": "Judge"
        },
        "条": {
            "level": 21,
            "reading": "じょう",
            "meaning": "Clause"
        },
        "責": {
            "level": 21,
            "reading": "せき",
            "meaning": "Blame"
        },
        "省": {
            "level": 21,
            "reading": "しょう",
            "meaning": "Conserve"
        },
        "増": {
            "level": 21,
            "reading": "ぞう",
            "meaning": "Increase"
        },
        "税": {
            "level": 21,
            "reading": "ぜい",
            "meaning": "Tax"
        },
        "解": {
            "level": 21,
            "reading": "かい",
            "meaning": "Untie"
        },
        "際": {
            "level": 21,
            "reading": "さい",
            "meaning": "Occasion"
        },
        "認": {
            "level": 21,
            "reading": "にん",
            "meaning": "Recognize"
        },
        "企": {
            "level": 21,
            "reading": "き",
            "meaning": "Plan"
        },
        "義": {
            "level": 21,
            "reading": "ぎ",
            "meaning": "Righteousness"
        },
        "罰": {
            "level": 22,
            "reading": "ばつ",
            "meaning": "Penalty"
        },
        "誕": {
            "level": 22,
            "reading": "たん",
            "meaning": "Birth"
        },
        "脱": {
            "level": 22,
            "reading": "だつ",
            "meaning": "Undress"
        },
        "過": {
            "level": 22,
            "reading": "か",
            "meaning": "Surpass"
        },
        "坊": {
            "level": 22,
            "reading": "ぼう",
            "meaning": "Monk"
        },
        "寝": {
            "level": 22,
            "reading": "しん",
            "meaning": "Lie Down"
        },
        "宮": {
            "level": 22,
            "reading": "きゅう",
            "meaning": "Shinto Shrine"
        },
        "各": {
            "level": 22,
            "reading": "かく",
            "meaning": "Each"
        },
        "案": {
            "level": 22,
            "reading": "あん",
            "meaning": "Plan"
        },
        "置": {
            "level": 22,
            "reading": "ち",
            "meaning": "Put"
        },
        "費": {
            "level": 22,
            "reading": "ひ",
            "meaning": "Expense"
        },
        "価": {
            "level": 22,
            "reading": "か",
            "meaning": "Value"
        },
        "勢": {
            "level": 22,
            "reading": "せい",
            "meaning": "Force"
        },
        "営": {
            "level": 22,
            "reading": "えい",
            "meaning": "Manage"
        },
        "示": {
            "level": 22,
            "reading": "じ",
            "meaning": "Indicate"
        },
        "統": {
            "level": 22,
            "reading": "とう",
            "meaning": "Unite"
        },
        "領": {
            "level": 22,
            "reading": "りょう",
            "meaning": "Territory"
        },
        "策": {
            "level": 22,
            "reading": "さく",
            "meaning": "Plan"
        },
        "藤": {
            "level": 22,
            "reading": "とう",
            "meaning": "Wisteria"
        },
        "副": {
            "level": 22,
            "reading": "ふく",
            "meaning": "Vice"
        },
        "観": {
            "level": 22,
            "reading": "かん",
            "meaning": "View"
        },
        "値": {
            "level": 22,
            "reading": "ち",
            "meaning": "Value"
        },
        "吸": {
            "level": 22,
            "reading": "きゅう",
            "meaning": "Suck"
        },
        "域": {
            "level": 22,
            "reading": "いき",
            "meaning": "Region"
        },
        "姿": {
            "level": 22,
            "reading": "し",
            "meaning": "Figure"
        },
        "応": {
            "level": 22,
            "reading": "おう",
            "meaning": "Respond"
        },
        "提": {
            "level": 22,
            "reading": "てい",
            "meaning": "Present"
        },
        "援": {
            "level": 22,
            "reading": "えん",
            "meaning": "Aid"
        },
        "状": {
            "level": 22,
            "reading": "じょう",
            "meaning": "Condition"
        },
        "態": {
            "level": 22,
            "reading": "たい",
            "meaning": "Appearance"
        },
        "賀": {
            "level": 22,
            "reading": "が",
            "meaning": "Congratulations"
        },
        "収": {
            "level": 23,
            "reading": "しゅう",
            "meaning": "Obtain"
        },
        "停": {
            "level": 23,
            "reading": "てい",
            "meaning": "Halt"
        },
        "革": {
            "level": 23,
            "reading": "かく",
            "meaning": "Leather"
        },
        "職": {
            "level": 23,
            "reading": "しょく",
            "meaning": "Employment"
        },
        "鬼": {
            "level": 23,
            "reading": "き",
            "meaning": "Demon"
        },
        "規": {
            "level": 23,
            "reading": "き",
            "meaning": "Standard"
        },
        "護": {
            "level": 23,
            "reading": "ご",
            "meaning": "Defend"
        },
        "割": {
            "level": 23,
            "reading": "かつ",
            "meaning": "Divide"
        },
        "裁": {
            "level": 23,
            "reading": "さい",
            "meaning": "Judge"
        },
        "崎": {
            "level": 23,
            "reading": "き",
            "meaning": "Cape"
        },
        "演": {
            "level": 23,
            "reading": "えん",
            "meaning": "Acting"
        },
        "律": {
            "level": 23,
            "reading": "りつ",
            "meaning": "Law"
        },
        "師": {
            "level": 23,
            "reading": "し",
            "meaning": "Teacher"
        },
        "看": {
            "level": 23,
            "reading": "かん",
            "meaning": "Watch Over"
        },
        "準": {
            "level": 23,
            "reading": "じゅん",
            "meaning": "Standard"
        },
        "則": {
            "level": 23,
            "reading": "そく",
            "meaning": "Rule"
        },
        "備": {
            "level": 23,
            "reading": "び",
            "meaning": "Provide"
        },
        "導": {
            "level": 23,
            "reading": "どう",
            "meaning": "Lead"
        },
        "幹": {
            "level": 23,
            "reading": "かん",
            "meaning": "Tree Trunk"
        },
        "張": {
            "level": 23,
            "reading": "ちょう",
            "meaning": "Stretch"
        },
        "優": {
            "level": 23,
            "reading": "ゆう",
            "meaning": "Superior"
        },
        "宅": {
            "level": 23,
            "reading": "たく",
            "meaning": "House"
        },
        "沢": {
            "level": 23,
            "reading": "たく",
            "meaning": "Swamp"
        },
        "贅": {
            "level": 23,
            "reading": "ぜい",
            "meaning": "Luxury"
        },
        "施": {
            "level": 23,
            "reading": "し",
            "meaning": "Carry Out"
        },
        "現": {
            "level": 23,
            "reading": "げん",
            "meaning": "Present Time"
        },
        "乳": {
            "level": 23,
            "reading": "にゅう",
            "meaning": "Milk"
        },
        "呼": {
            "level": 23,
            "reading": "こ",
            "meaning": "Call"
        },
        "城": {
            "level": 23,
            "reading": "じょう",
            "meaning": "Castle"
        },
        "俳": {
            "level": 23,
            "reading": "はい",
            "meaning": "Haiku"
        },
        "秀": {
            "level": 23,
            "reading": "しゅう",
            "meaning": "Excel"
        },
        "担": {
            "level": 24,
            "reading": "たん",
            "meaning": "Carry"
        },
        "額": {
            "level": 24,
            "reading": "がく",
            "meaning": "Amount"
        },
        "製": {
            "level": 24,
            "reading": "せい",
            "meaning": "Manufacture"
        },
        "違": {
            "level": 24,
            "reading": "い",
            "meaning": "Different"
        },
        "輸": {
            "level": 24,
            "reading": "ゆ",
            "meaning": "Transport"
        },
        "燃": {
            "level": 24,
            "reading": "ねん",
            "meaning": "Burn"
        },
        "祝": {
            "level": 24,
            "reading": "しゅく",
            "meaning": "Celebrate"
        },
        "届": {
            "level": 24,
            "reading": "とど",
            "meaning": "Deliver"
        },
        "狭": {
            "level": 24,
            "reading": "きょう",
            "meaning": "Narrow"
        },
        "肩": {
            "level": 24,
            "reading": "けん",
            "meaning": "Shoulder"
        },
        "腕": {
            "level": 24,
            "reading": "わん",
            "meaning": "Arm"
        },
        "腰": {
            "level": 24,
            "reading": "よう",
            "meaning": "Waist"
        },
        "触": {
            "level": 24,
            "reading": "しょく",
            "meaning": "Touch"
        },
        "載": {
            "level": 24,
            "reading": "さい",
            "meaning": "Publish"
        },
        "層": {
            "level": 24,
            "reading": "そう",
            "meaning": "Layer"
        },
        "型": {
            "level": 24,
            "reading": "けい",
            "meaning": "Model"
        },
        "庁": {
            "level": 24,
            "reading": "ちょう",
            "meaning": "Agency"
        },
        "視": {
            "level": 24,
            "reading": "し",
            "meaning": "Look At"
        },
        "差": {
            "level": 24,
            "reading": "さ",
            "meaning": "Distinction"
        },
        "管": {
            "level": 24,
            "reading": "かん",
            "meaning": "Pipe"
        },
        "象": {
            "level": 24,
            "reading": "ぞう",
            "meaning": "Elephant"
        },
        "量": {
            "level": 24,
            "reading": "りょう",
            "meaning": "Quantity"
        },
        "境": {
            "level": 24,
            "reading": "きょう",
            "meaning": "Boundary"
        },
        "環": {
            "level": 24,
            "reading": "かん",
            "meaning": "Loop"
        },
        "武": {
            "level": 24,
            "reading": "ぶ",
            "meaning": "Military"
        },
        "質": {
            "level": 24,
            "reading": "しつ",
            "meaning": "Quality"
        },
        "述": {
            "level": 24,
            "reading": "じゅつ",
            "meaning": "Mention"
        },
        "供": {
            "level": 24,
            "reading": "きょう",
            "meaning": "Servant"
        },
        "展": {
            "level": 24,
            "reading": "てん",
            "meaning": "Expand"
        },
        "販": {
            "level": 24,
            "reading": "はん",
            "meaning": "Sell"
        },
        "株": {
            "level": 24,
            "reading": "しゅ",
            "meaning": "Stocks"
        },
        "限": {
            "level": 25,
            "reading": "げん",
            "meaning": "Limit"
        },
        "与": {
            "level": 25,
            "reading": "よ",
            "meaning": "Give"
        },
        "含": {
            "level": 25,
            "reading": "がん",
            "meaning": "Include"
        },
        "影": {
            "level": 25,
            "reading": "えい",
            "meaning": "Shadow"
        },
        "況": {
            "level": 25,
            "reading": "きょう",
            "meaning": "Condition"
        },
        "渡": {
            "level": 25,
            "reading": "と",
            "meaning": "Transit"
        },
        "響": {
            "level": 25,
            "reading": "きょう",
            "meaning": "Echo"
        },
        "票": {
            "level": 25,
            "reading": "ひょう",
            "meaning": "Ballot"
        },
        "景": {
            "level": 25,
            "reading": "けい",
            "meaning": "Scene"
        },
        "抜": {
            "level": 25,
            "reading": "ばつ",
            "meaning": "Extract"
        },
        "訴": {
            "level": 25,
            "reading": "そ",
            "meaning": "Sue"
        },
        "訟": {
            "level": 25,
            "reading": "しょう",
            "meaning": "Lawsuit"
        },
        "逮": {
            "level": 25,
            "reading": "たい",
            "meaning": "Apprehend"
        },
        "補": {
            "level": 25,
            "reading": "ほ",
            "meaning": "Supplement"
        },
        "候": {
            "level": 25,
            "reading": "こう",
            "meaning": "Climate"
        },
        "構": {
            "level": 25,
            "reading": "こう",
            "meaning": "Set Up"
        },
        "模": {
            "level": 25,
            "reading": "も",
            "meaning": "Imitation"
        },
        "捕": {
            "level": 25,
            "reading": "ほ",
            "meaning": "Catch"
        },
        "鮮": {
            "level": 25,
            "reading": "せん",
            "meaning": "Fresh"
        },
        "効": {
            "level": 25,
            "reading": "こう",
            "meaning": "Effective"
        },
        "属": {
            "level": 25,
            "reading": "ぞく",
            "meaning": "Belong"
        },
        "慣": {
            "level": 25,
            "reading": "かん",
            "meaning": "Accustomed"
        },
        "豊": {
            "level": 25,
            "reading": "ほう",
            "meaning": "Plentiful"
        },
        "満": {
            "level": 25,
            "reading": "まん",
            "meaning": "Full"
        },
        "肥": {
            "level": 25,
            "reading": "ひ",
            "meaning": "Obese"
        },
        "巻": {
            "level": 25,
            "reading": "かん",
            "meaning": "Scroll"
        },
        "捜": {
            "level": 25,
            "reading": "そう",
            "meaning": "Search"
        },
        "絞": {
            "level": 25,
            "reading": "こう",
            "meaning": "Strangle"
        },
        "輩": {
            "level": 25,
            "reading": "はい",
            "meaning": "Comrade"
        },
        "隠": {
            "level": 25,
            "reading": "いん",
            "meaning": "Hide"
        },
        "掛": {
            "level": 25,
            "reading": "かい",
            "meaning": "Hang"
        },
        "替": {
            "level": 25,
            "reading": "たい",
            "meaning": "Replace"
        },
        "居": {
            "level": 25,
            "reading": "きょ",
            "meaning": "Alive"
        },
        "造": {
            "level": 26,
            "reading": "ぞう",
            "meaning": "Create"
        },
        "授": {
            "level": 26,
            "reading": "じゅ",
            "meaning": "Instruct"
        },
        "印": {
            "level": 26,
            "reading": "いん",
            "meaning": "Seal"
        },
        "創": {
            "level": 26,
            "reading": "そう",
            "meaning": "Create"
        },
        "復": {
            "level": 26,
            "reading": "ふく",
            "meaning": "Restore"
        },
        "往": {
            "level": 26,
            "reading": "おう",
            "meaning": "Journey"
        },
        "較": {
            "level": 26,
            "reading": "かく",
            "meaning": "Contrast"
        },
        "筆": {
            "level": 26,
            "reading": "ひつ",
            "meaning": "Writing Brush"
        },
        "鉛": {
            "level": 26,
            "reading": "えん",
            "meaning": "Lead"
        },
        "貯": {
            "level": 26,
            "reading": "ちょ",
            "meaning": "Savings"
        },
        "故": {
            "level": 26,
            "reading": "こ",
            "meaning": "Circumstance"
        },
        "障": {
            "level": 26,
            "reading": "しょう",
            "meaning": "Hinder"
        },
        "従": {
            "level": 26,
            "reading": "じゅう",
            "meaning": "Obey"
        },
        "我": {
            "level": 26,
            "reading": "が",
            "meaning": "I"
        },
        "激": {
            "level": 26,
            "reading": "げき",
            "meaning": "Fierce"
        },
        "刺": {
            "level": 26,
            "reading": "し",
            "meaning": "Stab"
        },
        "励": {
            "level": 26,
            "reading": "れい",
            "meaning": "Encourage"
        },
        "討": {
            "level": 26,
            "reading": "とう",
            "meaning": "Chastise"
        },
        "郵": {
            "level": 26,
            "reading": "ゆう",
            "meaning": "Mail"
        },
        "針": {
            "level": 26,
            "reading": "しん",
            "meaning": "Needle"
        },
        "徴": {
            "level": 26,
            "reading": "ちょう",
            "meaning": "Indication"
        },
        "怪": {
            "level": 26,
            "reading": "かい",
            "meaning": "Suspicious"
        },
        "獣": {
            "level": 26,
            "reading": "じゅう",
            "meaning": "Beast"
        },
        "突": {
            "level": 26,
            "reading": "とつ",
            "meaning": "Stab"
        },
        "菓": {
            "level": 26,
            "reading": "か",
            "meaning": "Cake"
        },
        "河": {
            "level": 26,
            "reading": "か",
            "meaning": "River"
        },
        "振": {
            "level": 26,
            "reading": "しん",
            "meaning": "Shake"
        },
        "汗": {
            "level": 26,
            "reading": "かん",
            "meaning": "Sweat"
        },
        "豚": {
            "level": 26,
            "reading": "とん",
            "meaning": "Pork"
        },
        "再": {
            "level": 26,
            "reading": "さ",
            "meaning": "Again"
        },
        "接": {
            "level": 26,
            "reading": "せつ",
            "meaning": "Adjoin"
        },
        "独": {
            "level": 26,
            "reading": "どく",
            "meaning": "Alone"
        },
        "占": {
            "level": 26,
            "reading": "せん",
            "meaning": "Fortune"
        },
        "招": {
            "level": 27,
            "reading": "しょう",
            "meaning": "Beckon"
        },
        "段": {
            "level": 27,
            "reading": "だん",
            "meaning": "Steps"
        },
        "胃": {
            "level": 27,
            "reading": "い",
            "meaning": "Stomach"
        },
        "腹": {
            "level": 27,
            "reading": "ふく",
            "meaning": "Belly"
        },
        "痛": {
            "level": 27,
            "reading": "つう",
            "meaning": "Pain"
        },
        "退": {
            "level": 27,
            "reading": "たい",
            "meaning": "Retreat"
        },
        "屈": {
            "level": 27,
            "reading": "くつ",
            "meaning": "Yield"
        },
        "悩": {
            "level": 27,
            "reading": "のう",
            "meaning": "Worry"
        },
        "暇": {
            "level": 27,
            "reading": "か",
            "meaning": "Spare Time"
        },
        "織": {
            "level": 27,
            "reading": "しき",
            "meaning": "Weave"
        },
        "貸": {
            "level": 27,
            "reading": "たい",
            "meaning": "Lend"
        },
        "迷": {
            "level": 27,
            "reading": "めい",
            "meaning": "Astray"
        },
        "惑": {
            "level": 27,
            "reading": "わく",
            "meaning": "Misguided"
        },
        "誘": {
            "level": 27,
            "reading": "ゆう",
            "meaning": "Invite"
        },
        "就": {
            "level": 27,
            "reading": "しゅう",
            "meaning": "Settle In"
        },
        "訪": {
            "level": 27,
            "reading": "ほう",
            "meaning": "Visit"
        },
        "怒": {
            "level": 27,
            "reading": "ど",
            "meaning": "Angry"
        },
        "昇": {
            "level": 27,
            "reading": "しょう",
            "meaning": "Ascend"
        },
        "眠": {
            "level": 27,
            "reading": "みん",
            "meaning": "Sleep"
        },
        "睡": {
            "level": 27,
            "reading": "すい",
            "meaning": "Drowsy"
        },
        "症": {
            "level": 27,
            "reading": "しょう",
            "meaning": "Symptom"
        },
        "締": {
            "level": 27,
            "reading": "てい",
            "meaning": "Tighten"
        },
        "迫": {
            "level": 27,
            "reading": "はく",
            "meaning": "Urge"
        },
        "靴": {
            "level": 27,
            "reading": "か",
            "meaning": "Shoes"
        },
        "濃": {
            "level": 27,
            "reading": "のう",
            "meaning": "Thick"
        },
        "端": {
            "level": 27,
            "reading": "たん",
            "meaning": "Edge"
        },
        "極": {
            "level": 27,
            "reading": "きょく",
            "meaning": "Extreme"
        },
        "途": {
            "level": 27,
            "reading": "と",
            "meaning": "Route"
        },
        "健": {
            "level": 27,
            "reading": "けん",
            "meaning": "Healthy"
        },
        "康": {
            "level": 27,
            "reading": "こう",
            "meaning": "Ease"
        },
        "郎": {
            "level": 27,
            "reading": "ろう",
            "meaning": "Guy"
        },
        "給": {
            "level": 27,
            "reading": "きゅう",
            "meaning": "Salary"
        },
        "逆": {
            "level": 28,
            "reading": "ぎゃく",
            "meaning": "Reverse"
        },
        "巨": {
            "level": 28,
            "reading": "きょ",
            "meaning": "Giant"
        },
        "庫": {
            "level": 28,
            "reading": "こ",
            "meaning": "Storage"
        },
        "児": {
            "level": 28,
            "reading": "じ",
            "meaning": "Child"
        },
        "冷": {
            "level": 28,
            "reading": "れい",
            "meaning": "Cool"
        },
        "凍": {
            "level": 28,
            "reading": "とう",
            "meaning": "Frozen"
        },
        "幼": {
            "level": 28,
            "reading": "よう",
            "meaning": "Infancy"
        },
        "稚": {
            "level": 28,
            "reading": "ち",
            "meaning": "Immature"
        },
        "処": {
            "level": 28,
            "reading": "しょ",
            "meaning": "Deal With"
        },
        "博": {
            "level": 28,
            "reading": "はく",
            "meaning": "Exhibition"
        },
        "清": {
            "level": 28,
            "reading": "せい",
            "meaning": "Pure"
        },
        "潔": {
            "level": 28,
            "reading": "けつ",
            "meaning": "Pure"
        },
        "録": {
            "level": 28,
            "reading": "ろく",
            "meaning": "Record"
        },
        "隊": {
            "level": 28,
            "reading": "たい",
            "meaning": "Squad"
        },
        "修": {
            "level": 28,
            "reading": "しゅう",
            "meaning": "Discipline"
        },
        "券": {
            "level": 28,
            "reading": "けん",
            "meaning": "Ticket"
        },
        "婦": {
            "level": 28,
            "reading": "ふ",
            "meaning": "Wife"
        },
        "奇": {
            "level": 28,
            "reading": "き",
            "meaning": "Odd"
        },
        "妙": {
            "level": 28,
            "reading": "みょう",
            "meaning": "Strange"
        },
        "麗": {
            "level": 28,
            "reading": "れい",
            "meaning": "Lovely"
        },
        "微": {
            "level": 28,
            "reading": "び",
            "meaning": "Delicate"
        },
        "益": {
            "level": 28,
            "reading": "えき",
            "meaning": "Benefit"
        },
        "移": {
            "level": 28,
            "reading": "い",
            "meaning": "Shift"
        },
        "程": {
            "level": 28,
            "reading": "てい",
            "meaning": "Extent"
        },
        "精": {
            "level": 28,
            "reading": "せい",
            "meaning": "Spirit"
        },
        "絶": {
            "level": 28,
            "reading": "ぜつ",
            "meaning": "Extinction"
        },
        "並": {
            "level": 28,
            "reading": "へい",
            "meaning": "Line Up"
        },
        "憲": {
            "level": 28,
            "reading": "けん",
            "meaning": "Constitution"
        },
        "衆": {
            "level": 28,
            "reading": "しゅう",
            "meaning": "Populace"
        },
        "傘": {
            "level": 28,
            "reading": "さん",
            "meaning": "Umbrella"
        },
        "浜": {
            "level": 28,
            "reading": "ひん",
            "meaning": "Beach"
        },
        "撃": {
            "level": 28,
            "reading": "げき",
            "meaning": "Attack"
        },
        "攻": {
            "level": 28,
            "reading": "こう",
            "meaning": "Aggression"
        },
        "監": {
            "level": 29,
            "reading": "かん",
            "meaning": "Oversee"
        },
        "杯": {
            "level": 29,
            "reading": "はい",
            "meaning": "Cup Of Liquid"
        },
        "乾": {
            "level": 29,
            "reading": "かん",
            "meaning": "Dry"
        },
        "催": {
            "level": 29,
            "reading": "さい",
            "meaning": "Sponsor"
        },
        "促": {
            "level": 29,
            "reading": "そく",
            "meaning": "Urge"
        },
        "欧": {
            "level": 29,
            "reading": "おう",
            "meaning": "Europe"
        },
        "江": {
            "level": 29,
            "reading": "こう",
            "meaning": "Inlet"
        },
        "請": {
            "level": 29,
            "reading": "せい",
            "meaning": "Request"
        },
        "雄": {
            "level": 29,
            "reading": "ゆう",
            "meaning": "Male"
        },
        "韓": {
            "level": 29,
            "reading": "かん",
            "meaning": "Korea"
        },
        "壊": {
            "level": 29,
            "reading": "かい",
            "meaning": "Break"
        },
        "診": {
            "level": 29,
            "reading": "しん",
            "meaning": "Diagnose"
        },
        "閣": {
            "level": 29,
            "reading": "かく",
            "meaning": "The Cabinet"
        },
        "僚": {
            "level": 29,
            "reading": "りょう",
            "meaning": "Colleague"
        },
        "積": {
            "level": 29,
            "reading": "せき",
            "meaning": "Accumulate"
        },
        "督": {
            "level": 29,
            "reading": "とく",
            "meaning": "Coach"
        },
        "臣": {
            "level": 29,
            "reading": "しん",
            "meaning": "Servant"
        },
        "略": {
            "level": 29,
            "reading": "りゃく",
            "meaning": "Abbreviation"
        },
        "航": {
            "level": 29,
            "reading": "こう",
            "meaning": "Navigation"
        },
        "寄": {
            "level": 29,
            "reading": "き",
            "meaning": "Approach"
        },
        "板": {
            "level": 29,
            "reading": "ばん",
            "meaning": "Board"
        },
        "街": {
            "level": 29,
            "reading": "がい",
            "meaning": "Street"
        },
        "宗": {
            "level": 29,
            "reading": "しゅう",
            "meaning": "Religion"
        },
        "緊": {
            "level": 29,
            "reading": "きん",
            "meaning": "Tense"
        },
        "娘": {
            "level": 29,
            "reading": "むすめ",
            "meaning": "Daughter"
        },
        "宴": {
            "level": 29,
            "reading": "えん",
            "meaning": "Banquet"
        },
        "怖": {
            "level": 29,
            "reading": "ふ",
            "meaning": "Scary"
        },
        "恐": {
            "level": 29,
            "reading": "きょう",
            "meaning": "Fear"
        },
        "添": {
            "level": 29,
            "reading": "てん",
            "meaning": "Append"
        },
        "猛": {
            "level": 29,
            "reading": "もう",
            "meaning": "Fierce"
        },
        "烈": {
            "level": 29,
            "reading": "れつ",
            "meaning": "Violent"
        },
        "索": {
            "level": 29,
            "reading": "さく",
            "meaning": "Search"
        },
        "詰": {
            "level": 29,
            "reading": "きつ",
            "meaning": "Stuffed"
        },
        "詳": {
            "level": 17,
            "reading": "しょう",
            "meaning": "Detailed"
        },
        "魅": {
            "level": 30,
            "reading": "み",
            "meaning": "Alluring"
        },
        "渇": {
            "level": 30,
            "reading": "かつ",
            "meaning": "Dry Up"
        },
        "系": {
            "level": 30,
            "reading": "けい",
            "meaning": "Lineage"
        },
        "婚": {
            "level": 30,
            "reading": "こん",
            "meaning": "Marriage"
        },
        "遊": {
            "level": 30,
            "reading": "ゆう",
            "meaning": "Play"
        },
        "旗": {
            "level": 30,
            "reading": "き",
            "meaning": "Flag"
        },
        "照": {
            "level": 30,
            "reading": "しょう",
            "meaning": "Illuminate"
        },
        "快": {
            "level": 30,
            "reading": "かい",
            "meaning": "Pleasant"
        },
        "版": {
            "level": 30,
            "reading": "はん",
            "meaning": "Edition"
        },
        "貧": {
            "level": 30,
            "reading": "びん",
            "meaning": "Poor"
        },
        "乏": {
            "level": 30,
            "reading": "ぼう",
            "meaning": "Scarce"
        },
        "適": {
            "level": 30,
            "reading": "てき",
            "meaning": "Suitable"
        },
        "預": {
            "level": 30,
            "reading": "よ",
            "meaning": "Deposit"
        },
        "延": {
            "level": 30,
            "reading": "えん",
            "meaning": "Prolong"
        },
        "翌": {
            "level": 30,
            "reading": "よく",
            "meaning": "The Next"
        },
        "覧": {
            "level": 30,
            "reading": "らん",
            "meaning": "Look At"
        },
        "懐": {
            "level": 30,
            "reading": "かい",
            "meaning": "Nostalgia"
        },
        "押": {
            "level": 30,
            "reading": "おう",
            "meaning": "Push"
        },
        "更": {
            "level": 30,
            "reading": "こう",
            "meaning": "Again"
        },
        "枕": {
            "level": 30,
            "reading": "しん",
            "meaning": "Pillow"
        },
        "浮": {
            "level": 30,
            "reading": "ふ",
            "meaning": "Float"
        },
        "漏": {
            "level": 30,
            "reading": "ろう",
            "meaning": "Leak"
        },
        "符": {
            "level": 30,
            "reading": "ふ",
            "meaning": "Token"
        },
        "購": {
            "level": 30,
            "reading": "こう",
            "meaning": "Subscription"
        },
        "越": {
            "level": 30,
            "reading": "えつ",
            "meaning": "Go Beyond"
        },
        "飾": {
            "level": 30,
            "reading": "しょく",
            "meaning": "Decorate"
        },
        "騒": {
            "level": 30,
            "reading": "そう",
            "meaning": "Boisterous"
        },
        "背": {
            "level": 30,
            "reading": "はい",
            "meaning": "Back"
        },
        "撮": {
            "level": 30,
            "reading": "さつ",
            "meaning": "Photograph"
        },
        "盗": {
            "level": 30,
            "reading": "とう",
            "meaning": "Steal"
        },
        "離": {
            "level": 31,
            "reading": "り",
            "meaning": "Detach"
        },
        "融": {
            "level": 31,
            "reading": "ゆう",
            "meaning": "Dissolve"
        },
        "編": {
            "level": 31,
            "reading": "へん",
            "meaning": "Knit"
        },
        "華": {
            "level": 31,
            "reading": "か",
            "meaning": "Showy"
        },
        "既": {
            "level": 31,
            "reading": "き",
            "meaning": "Previously"
        },
        "普": {
            "level": 31,
            "reading": "ふ",
            "meaning": "Normal"
        },
        "豪": {
            "level": 31,
            "reading": "ごう",
            "meaning": "Exceptional"
        },
        "鑑": {
            "level": 31,
            "reading": "かん",
            "meaning": "Model"
        },
        "除": {
            "level": 31,
            "reading": "じょ",
            "meaning": "Exclude"
        },
        "尋": {
            "level": 31,
            "reading": "じん",
            "meaning": "Inquire"
        },
        "幾": {
            "level": 31,
            "reading": "き",
            "meaning": "How Many"
        },
        "廊": {
            "level": 31,
            "reading": "ろう",
            "meaning": "Corridor"
        },
        "掃": {
            "level": 31,
            "reading": "そう",
            "meaning": "Sweep"
        },
        "泥": {
            "level": 31,
            "reading": "でい",
            "meaning": "Mud"
        },
        "棒": {
            "level": 31,
            "reading": "ぼう",
            "meaning": "Pole"
        },
        "驚": {
            "level": 31,
            "reading": "きょう",
            "meaning": "Surprised"
        },
        "嘆": {
            "level": 31,
            "reading": "たん",
            "meaning": "Sigh"
        },
        "倉": {
            "level": 31,
            "reading": "そう",
            "meaning": "Warehouse"
        },
        "孫": {
            "level": 31,
            "reading": "そん",
            "meaning": "Grandchild"
        },
        "巣": {
            "level": 31,
            "reading": "そう",
            "meaning": "Nest"
        },
        "帯": {
            "level": 31,
            "reading": "たい",
            "meaning": "Belt"
        },
        "径": {
            "level": 31,
            "reading": "けい",
            "meaning": "Diameter"
        },
        "救": {
            "level": 31,
            "reading": "きゅう",
            "meaning": "Rescue"
        },
        "散": {
            "level": 31,
            "reading": "さん",
            "meaning": "Scatter"
        },
        "粉": {
            "level": 31,
            "reading": "ふん",
            "meaning": "Powder"
        },
        "脈": {
            "level": 31,
            "reading": "みゃく",
            "meaning": "Vein"
        },
        "菜": {
            "level": 31,
            "reading": "さい",
            "meaning": "Vegetable"
        },
        "貨": {
            "level": 31,
            "reading": "か",
            "meaning": "Freight"
        },
        "陸": {
            "level": 31,
            "reading": "りく",
            "meaning": "Land"
        },
        "似": {
            "level": 31,
            "reading": "に",
            "meaning": "Resemble"
        },
        "均": {
            "level": 31,
            "reading": "きん",
            "meaning": "Equal"
        },
        "墓": {
            "level": 31,
            "reading": "ぼ",
            "meaning": "Grave"
        },
        "富": {
            "level": 31,
            "reading": "ふ",
            "meaning": "Rich"
        },
        "徳": {
            "level": 31,
            "reading": "とく",
            "meaning": "Virtue"
        },
        "探": {
            "level": 31,
            "reading": "たん",
            "meaning": "Look For"
        },
        "偵": {
            "level": 31,
            "reading": "てい",
            "meaning": "Spy"
        },
        "綺": {
            "level": 28,
            "reading": "き",
            "meaning": "Beautiful"
        },
        "序": {
            "level": 32,
            "reading": "じょ",
            "meaning": "Preface"
        },
        "迎": {
            "level": 32,
            "reading": "げい",
            "meaning": "Welcome"
        },
        "志": {
            "level": 32,
            "reading": "し",
            "meaning": "Intention"
        },
        "恩": {
            "level": 32,
            "reading": "おん",
            "meaning": "Kindness"
        },
        "採": {
            "level": 32,
            "reading": "さい",
            "meaning": "Gather"
        },
        "桜": {
            "level": 32,
            "reading": "おう",
            "meaning": "Sakura"
        },
        "永": {
            "level": 32,
            "reading": "えい",
            "meaning": "Eternity"
        },
        "液": {
            "level": 32,
            "reading": "えき",
            "meaning": "Fluid"
        },
        "眼": {
            "level": 32,
            "reading": "がん",
            "meaning": "Eyeball"
        },
        "祖": {
            "level": 32,
            "reading": "そ",
            "meaning": "Ancestor"
        },
        "績": {
            "level": 32,
            "reading": "せき",
            "meaning": "Exploits"
        },
        "興": {
            "level": 32,
            "reading": "きょう",
            "meaning": "Interest"
        },
        "衛": {
            "level": 32,
            "reading": "えい",
            "meaning": "Defense"
        },
        "複": {
            "level": 32,
            "reading": "ふく",
            "meaning": "Duplicate"
        },
        "雑": {
            "level": 32,
            "reading": "ざつ",
            "meaning": "Random"
        },
        "賛": {
            "level": 32,
            "reading": "さん",
            "meaning": "Agree"
        },
        "酸": {
            "level": 32,
            "reading": "さん",
            "meaning": "Acid"
        },
        "銭": {
            "level": 32,
            "reading": "せん",
            "meaning": "Coin"
        },
        "飼": {
            "level": 32,
            "reading": "し",
            "meaning": "Domesticate"
        },
        "傷": {
            "level": 32,
            "reading": "しょう",
            "meaning": "Wound"
        },
        "党": {
            "level": 32,
            "reading": "とう",
            "meaning": "Party"
        },
        "卵": {
            "level": 32,
            "reading": "らん",
            "meaning": "Egg"
        },
        "厳": {
            "level": 32,
            "reading": "げん",
            "meaning": "Strict"
        },
        "捨": {
            "level": 32,
            "reading": "しゃ",
            "meaning": "Throw Away"
        },
        "込": {
            "level": 32,
            "reading": "こ",
            "meaning": "Crowded"
        },
        "密": {
            "level": 32,
            "reading": "みつ",
            "meaning": "Secrecy"
        },
        "汚": {
            "level": 32,
            "reading": "お",
            "meaning": "Dirty"
        },
        "欲": {
            "level": 32,
            "reading": "よく",
            "meaning": "Want"
        },
        "暖": {
            "level": 32,
            "reading": "だん",
            "meaning": "Warm"
        },
        "机": {
            "level": 32,
            "reading": "き",
            "meaning": "Desk"
        },
        "秘": {
            "level": 32,
            "reading": "ひ",
            "meaning": "Secret"
        },
        "訳": {
            "level": 32,
            "reading": "やく",
            "meaning": "Translation"
        },
        "染": {
            "level": 32,
            "reading": "せん",
            "meaning": "Dye"
        },
        "簡": {
            "level": 33,
            "reading": "かん",
            "meaning": "Simplicity"
        },
        "閉": {
            "level": 33,
            "reading": "へい",
            "meaning": "Closed"
        },
        "誌": {
            "level": 33,
            "reading": "し",
            "meaning": "Magazine"
        },
        "窓": {
            "level": 33,
            "reading": "そう",
            "meaning": "Window"
        },
        "否": {
            "level": 33,
            "reading": "ひ",
            "meaning": "No"
        },
        "筋": {
            "level": 33,
            "reading": "きん",
            "meaning": "Muscle"
        },
        "垂": {
            "level": 33,
            "reading": "すい",
            "meaning": "Dangle"
        },
        "宝": {
            "level": 4,
            "reading": "ほう",
            "meaning": "Treasure"
        },
        "宣": {
            "level": 33,
            "reading": "せん",
            "meaning": "Proclaim"
        },
        "尊": {
            "level": 33,
            "reading": "そん",
            "meaning": "Revered"
        },
        "忠": {
            "level": 33,
            "reading": "ちゅう",
            "meaning": "Loyalty"
        },
        "拡": {
            "level": 33,
            "reading": "かく",
            "meaning": "Extend"
        },
        "操": {
            "level": 33,
            "reading": "そう",
            "meaning": "Manipulate"
        },
        "敬": {
            "level": 33,
            "reading": "けい",
            "meaning": "Respect"
        },
        "暮": {
            "level": 33,
            "reading": "ぼ",
            "meaning": "Livelihood"
        },
        "灰": {
            "level": 33,
            "reading": "かい",
            "meaning": "Ash"
        },
        "熟": {
            "level": 33,
            "reading": "じゅく",
            "meaning": "Ripen"
        },
        "異": {
            "level": 33,
            "reading": "い",
            "meaning": "Differ"
        },
        "皇": {
            "level": 33,
            "reading": "こう",
            "meaning": "Emperor"
        },
        "盛": {
            "level": 33,
            "reading": "せい",
            "meaning": "Pile"
        },
        "砂": {
            "level": 33,
            "reading": "さ",
            "meaning": "Sand"
        },
        "漠": {
            "level": 33,
            "reading": "ばく",
            "meaning": "Desert"
        },
        "糖": {
            "level": 33,
            "reading": "とう",
            "meaning": "Sugar"
        },
        "納": {
            "level": 33,
            "reading": "のう",
            "meaning": "Supply"
        },
        "肺": {
            "level": 33,
            "reading": "はい",
            "meaning": "Lung"
        },
        "著": {
            "level": 33,
            "reading": "ちょ",
            "meaning": "Author"
        },
        "蒸": {
            "level": 33,
            "reading": "じょう",
            "meaning": "Steam"
        },
        "蔵": {
            "level": 33,
            "reading": "ぞう",
            "meaning": "Storehouse"
        },
        "装": {
            "level": 33,
            "reading": "そう",
            "meaning": "Attire"
        },
        "裏": {
            "level": 33,
            "reading": "り",
            "meaning": "Backside"
        },
        "諸": {
            "level": 33,
            "reading": "しょ",
            "meaning": "Various"
        },
        "賃": {
            "level": 33,
            "reading": "ちん",
            "meaning": "Rent"
        },
        "誤": {
            "level": 34,
            "reading": "ご",
            "meaning": "Mistake"
        },
        "臓": {
            "level": 34,
            "reading": "ぞう",
            "meaning": "Internal Organs"
        },
        "貴": {
            "level": 34,
            "reading": "き",
            "meaning": "Valuable"
        },
        "降": {
            "level": 34,
            "reading": "こう",
            "meaning": "Descend"
        },
        "丼": {
            "level": 34,
            "reading": "どん",
            "meaning": "Rice Bowl"
        },
        "吐": {
            "level": 34,
            "reading": "と",
            "meaning": "Throw Up"
        },
        "奴": {
            "level": 34,
            "reading": "ど",
            "meaning": "Dude"
        },
        "隷": {
            "level": 34,
            "reading": "れい",
            "meaning": "Slave"
        },
        "芋": {
            "level": 34,
            "reading": "いも",
            "meaning": "Potato"
        },
        "縮": {
            "level": 34,
            "reading": "しゅく",
            "meaning": "Shrink"
        },
        "純": {
            "level": 34,
            "reading": "じゅん",
            "meaning": "Pure"
        },
        "縦": {
            "level": 34,
            "reading": "じゅう",
            "meaning": "Vertical"
        },
        "粋": {
            "level": 34,
            "reading": "すい",
            "meaning": "Stylish"
        },
        "聖": {
            "level": 34,
            "reading": "せい",
            "meaning": "Holy"
        },
        "磁": {
            "level": 34,
            "reading": "じ",
            "meaning": "Magnet"
        },
        "紅": {
            "level": 34,
            "reading": "こう",
            "meaning": "Deep Red"
        },
        "射": {
            "level": 34,
            "reading": "しゃ",
            "meaning": "Shoot"
        },
        "幕": {
            "level": 34,
            "reading": "まく",
            "meaning": "Curtain"
        },
        "拝": {
            "level": 34,
            "reading": "はい",
            "meaning": "Worship"
        },
        "薦": {
            "level": 34,
            "reading": "せん",
            "meaning": "Recommend"
        },
        "推": {
            "level": 34,
            "reading": "すい",
            "meaning": "Infer"
        },
        "揮": {
            "level": 34,
            "reading": "き",
            "meaning": "Brandish"
        },
        "沿": {
            "level": 34,
            "reading": "えん",
            "meaning": "Run Alongside"
        },
        "源": {
            "level": 34,
            "reading": "げん",
            "meaning": "Origin"
        },
        "劇": {
            "level": 17,
            "reading": "げき",
            "meaning": "Drama"
        },
        "勤": {
            "level": 34,
            "reading": "きん",
            "meaning": "Work"
        },
        "歓": {
            "level": 34,
            "reading": "かん",
            "meaning": "Delight"
        },
        "承": {
            "level": 34,
            "reading": "しょう",
            "meaning": "Consent"
        },
        "損": {
            "level": 34,
            "reading": "そん",
            "meaning": "Loss"
        },
        "枝": {
            "level": 34,
            "reading": "し",
            "meaning": "Branch"
        },
        "爪": {
            "level": 34,
            "reading": "そう",
            "meaning": "Claw"
        },
        "豆": {
            "level": 34,
            "reading": "とう",
            "meaning": "Beans"
        },
        "刻": {
            "level": 34,
            "reading": "こく",
            "meaning": "Carve"
        },
        "腐": {
            "level": 34,
            "reading": "ふ",
            "meaning": "Rot"
        },
        "遅": {
            "level": 35,
            "reading": "ち",
            "meaning": "Slow"
        },
        "彫": {
            "level": 35,
            "reading": "ちょう",
            "meaning": "Carve"
        },
        "測": {
            "level": 35,
            "reading": "そく",
            "meaning": "Measure"
        },
        "破": {
            "level": 35,
            "reading": "は",
            "meaning": "Tear"
        },
        "舎": {
            "level": 35,
            "reading": "しゃ",
            "meaning": "Cottage"
        },
        "講": {
            "level": 35,
            "reading": "こう",
            "meaning": "Lecture"
        },
        "滞": {
            "level": 35,
            "reading": "たい",
            "meaning": "Stagnate"
        },
        "紹": {
            "level": 35,
            "reading": "しょう",
            "meaning": "Introduce"
        },
        "介": {
            "level": 35,
            "reading": "かい",
            "meaning": "Jammed In"
        },
        "己": {
            "level": 35,
            "reading": "こ",
            "meaning": "Oneself"
        },
        "厄": {
            "level": 35,
            "reading": "やく",
            "meaning": "Unlucky"
        },
        "亀": {
            "level": 35,
            "reading": "き",
            "meaning": "Turtle"
        },
        "互": {
            "level": 35,
            "reading": "ご",
            "meaning": "Mutual"
        },
        "剣": {
            "level": 35,
            "reading": "けん",
            "meaning": "Sword"
        },
        "寿": {
            "level": 35,
            "reading": "じゅ",
            "meaning": "Lifespan"
        },
        "彼": {
            "level": 35,
            "reading": "ひ",
            "meaning": "He"
        },
        "恥": {
            "level": 35,
            "reading": "ち",
            "meaning": "Shame"
        },
        "杉": {
            "level": 35,
            "reading": "すぎ",
            "meaning": "Cedar"
        },
        "汁": {
            "level": 35,
            "reading": "じゅう",
            "meaning": "Soup"
        },
        "噌": {
            "level": 35,
            "reading": "そ",
            "meaning": "Boisterous"
        },
        "炎": {
            "level": 35,
            "reading": "えん",
            "meaning": "Flame"
        },
        "為": {
            "level": 35,
            "reading": "い",
            "meaning": "Sake"
        },
        "熊": {
            "level": 35,
            "reading": "くま",
            "meaning": "Bear"
        },
        "獄": {
            "level": 35,
            "reading": "ごく",
            "meaning": "Prison"
        },
        "酔": {
            "level": 35,
            "reading": "すい",
            "meaning": "Drunk"
        },
        "酢": {
            "level": 35,
            "reading": "さく",
            "meaning": "Vinegar"
        },
        "鍋": {
            "level": 35,
            "reading": "か",
            "meaning": "Pot"
        },
        "湖": {
            "level": 35,
            "reading": "こ",
            "meaning": "Lake"
        },
        "銅": {
            "level": 35,
            "reading": "どう",
            "meaning": "Copper"
        },
        "払": {
            "level": 15,
            "reading": "ふつ",
            "meaning": "Pay"
        },
        "油": {
            "level": 35,
            "reading": "ゆ",
            "meaning": "Oil"
        },
        "醤": {
            "level": 35,
            "reading": "しょう",
            "meaning": "Soy Sauce"
        },
        "旧": {
            "level": 36,
            "reading": "きゅう",
            "meaning": "Former"
        },
        "姓": {
            "level": 36,
            "reading": "せい",
            "meaning": "Family Name"
        },
        "貿": {
            "level": 36,
            "reading": "ぼう",
            "meaning": "Trade"
        },
        "将": {
            "level": 36,
            "reading": "しょう",
            "meaning": "Commander"
        },
        "盟": {
            "level": 36,
            "reading": "めい",
            "meaning": "Alliance"
        },
        "遺": {
            "level": 36,
            "reading": "い",
            "meaning": "Leave Behind"
        },
        "伸": {
            "level": 36,
            "reading": "しん",
            "meaning": "Stretch"
        },
        "債": {
            "level": 36,
            "reading": "さい",
            "meaning": "Debt"
        },
        "及": {
            "level": 36,
            "reading": "きゅう",
            "meaning": "Reach"
        },
        "奈": {
            "level": 36,
            "reading": "な",
            "meaning": "Nara"
        },
        "幅": {
            "level": 36,
            "reading": "ふく",
            "meaning": "Width"
        },
        "廃": {
            "level": 36,
            "reading": "はい",
            "meaning": "Obsolete"
        },
        "甘": {
            "level": 36,
            "reading": "かん",
            "meaning": "Sweet"
        },
        "換": {
            "level": 36,
            "reading": "かん",
            "meaning": "Exchange"
        },
        "摘": {
            "level": 36,
            "reading": "てき",
            "meaning": "Pluck"
        },
        "核": {
            "level": 36,
            "reading": "かく",
            "meaning": "Nucleus"
        },
        "沖": {
            "level": 36,
            "reading": "ちゅう",
            "meaning": "Open Sea"
        },
        "縄": {
            "level": 36,
            "reading": "じょう",
            "meaning": "Rope"
        },
        "津": {
            "level": 36,
            "reading": "しん",
            "meaning": "Haven"
        },
        "献": {
            "level": 36,
            "reading": "けん",
            "meaning": "Offer"
        },
        "療": {
            "level": 36,
            "reading": "りょう",
            "meaning": "Heal"
        },
        "継": {
            "level": 36,
            "reading": "けい",
            "meaning": "Inherit"
        },
        "維": {
            "level": 36,
            "reading": "い",
            "meaning": "Maintain"
        },
        "舞": {
            "level": 36,
            "reading": "ぶ",
            "meaning": "Dance"
        },
        "伎": {
            "level": 36,
            "reading": "き",
            "meaning": "Deed"
        },
        "踏": {
            "level": 36,
            "reading": "とう",
            "meaning": "Step"
        },
        "般": {
            "level": 36,
            "reading": "はん",
            "meaning": "Generally"
        },
        "頼": {
            "level": 36,
            "reading": "らい",
            "meaning": "Trust"
        },
        "依": {
            "level": 36,
            "reading": "い",
            "meaning": "Reliant"
        },
        "鹿": {
            "level": 36,
            "reading": "ろく",
            "meaning": "Deer"
        },
        "諾": {
            "level": 36,
            "reading": "だく",
            "meaning": "Agreement"
        },
        "牙": {
            "level": 36,
            "reading": "げ",
            "meaning": "Fang"
        },
        "跳": {
            "level": 37,
            "reading": "ちょう",
            "meaning": "Hop"
        },
        "昭": {
            "level": 37,
            "reading": "しょう",
            "meaning": "Shining"
        },
        "漁": {
            "level": 37,
            "reading": "ぎょ",
            "meaning": "Fishing"
        },
        "償": {
            "level": 37,
            "reading": "しょう",
            "meaning": "Reparation"
        },
        "刑": {
            "level": 37,
            "reading": "けい",
            "meaning": "Punish"
        },
        "募": {
            "level": 37,
            "reading": "ぼ",
            "meaning": "Recruit"
        },
        "執": {
            "level": 37,
            "reading": "しゅう",
            "meaning": "Tenacious"
        },
        "塁": {
            "level": 37,
            "reading": "るい",
            "meaning": "Base"
        },
        "崩": {
            "level": 37,
            "reading": "ほう",
            "meaning": "Crumble"
        },
        "患": {
            "level": 37,
            "reading": "かん",
            "meaning": "Afflicted"
        },
        "戻": {
            "level": 37,
            "reading": "れい",
            "meaning": "Return"
        },
        "抗": {
            "level": 37,
            "reading": "こう",
            "meaning": "Confront"
        },
        "抵": {
            "level": 37,
            "reading": "てい",
            "meaning": "Resist"
        },
        "旬": {
            "level": 37,
            "reading": "しゅん",
            "meaning": "In Season"
        },
        "湾": {
            "level": 37,
            "reading": "わん",
            "meaning": "Gulf"
        },
        "爆": {
            "level": 37,
            "reading": "ばく",
            "meaning": "Explode"
        },
        "弾": {
            "level": 37,
            "reading": "だん",
            "meaning": "Bullet"
        },
        "聴": {
            "level": 37,
            "reading": "ちょう",
            "meaning": "Listen"
        },
        "跡": {
            "level": 37,
            "reading": "せき",
            "meaning": "Traces"
        },
        "遣": {
            "level": 37,
            "reading": "けん",
            "meaning": "Dispatch"
        },
        "闘": {
            "level": 37,
            "reading": "とう",
            "meaning": "Struggle"
        },
        "陣": {
            "level": 37,
            "reading": "じん",
            "meaning": "Army Base"
        },
        "香": {
            "level": 37,
            "reading": "こう",
            "meaning": "Fragrance"
        },
        "兆": {
            "level": 37,
            "reading": "ちょう",
            "meaning": "Omen"
        },
        "臨": {
            "level": 37,
            "reading": "りん",
            "meaning": "Look To"
        },
        "削": {
            "level": 37,
            "reading": "さく",
            "meaning": "Whittle Down"
        },
        "契": {
            "level": 37,
            "reading": "けい",
            "meaning": "Pledge"
        },
        "恵": {
            "level": 37,
            "reading": "え",
            "meaning": "Favor"
        },
        "抱": {
            "level": 37,
            "reading": "ほう",
            "meaning": "Hug"
        },
        "掲": {
            "level": 37,
            "reading": "けい",
            "meaning": "Display"
        },
        "狙": {
            "level": 37,
            "reading": "そ",
            "meaning": "Aim"
        },
        "葬": {
            "level": 37,
            "reading": "そう",
            "meaning": "Burial"
        },
        "需": {
            "level": 38,
            "reading": "じゅ",
            "meaning": "Demand"
        },
        "齢": {
            "level": 38,
            "reading": "れい",
            "meaning": "Age"
        },
        "宜": {
            "level": 38,
            "reading": "ぎ",
            "meaning": "Best Regards"
        },
        "繰": {
            "level": 38,
            "reading": "そう",
            "meaning": "Spin"
        },
        "避": {
            "level": 38,
            "reading": "ひ",
            "meaning": "Dodge"
        },
        "妊": {
            "level": 38,
            "reading": "にん",
            "meaning": "Pregnant"
        },
        "娠": {
            "level": 38,
            "reading": "しん",
            "meaning": "Pregnant"
        },
        "致": {
            "level": 38,
            "reading": "ち",
            "meaning": "Do"
        },
        "刊": {
            "level": 38,
            "reading": "かん",
            "meaning": "Edition"
        },
        "奏": {
            "level": 38,
            "reading": "そう",
            "meaning": "Play Music"
        },
        "伴": {
            "level": 38,
            "reading": "はん",
            "meaning": "Accompany"
        },
        "併": {
            "level": 38,
            "reading": "へい",
            "meaning": "Join"
        },
        "傾": {
            "level": 38,
            "reading": "けい",
            "meaning": "Lean"
        },
        "却": {
            "level": 38,
            "reading": "きゃく",
            "meaning": "Contrary"
        },
        "奥": {
            "level": 38,
            "reading": "おう",
            "meaning": "Interior"
        },
        "慮": {
            "level": 38,
            "reading": "りょ",
            "meaning": "Consider"
        },
        "懸": {
            "level": 38,
            "reading": "けん",
            "meaning": "Suspend"
        },
        "房": {
            "level": 38,
            "reading": "ぼう",
            "meaning": "Cluster"
        },
        "扱": {
            "level": 38,
            "reading": "きゅう",
            "meaning": "Handle"
        },
        "抑": {
            "level": 38,
            "reading": "よく",
            "meaning": "Suppress"
        },
        "択": {
            "level": 38,
            "reading": "たく",
            "meaning": "Select"
        },
        "描": {
            "level": 38,
            "reading": "びょう",
            "meaning": "Draw"
        },
        "盤": {
            "level": 38,
            "reading": "ばん",
            "meaning": "Tray"
        },
        "称": {
            "level": 38,
            "reading": "しょう",
            "meaning": "Title"
        },
        "緒": {
            "level": 38,
            "reading": "しょ",
            "meaning": "Together"
        },
        "緩": {
            "level": 38,
            "reading": "かん",
            "meaning": "Loose"
        },
        "託": {
            "level": 38,
            "reading": "たく",
            "meaning": "Consign"
        },
        "賄": {
            "level": 38,
            "reading": "わい",
            "meaning": "Bribe"
        },
        "賂": {
            "level": 38,
            "reading": "ろ",
            "meaning": "Bribe"
        },
        "贈": {
            "level": 38,
            "reading": "ぞう",
            "meaning": "Presents"
        },
        "逃": {
            "level": 38,
            "reading": "とう",
            "meaning": "Escape"
        },
        "還": {
            "level": 38,
            "reading": "かん",
            "meaning": "Send Back"
        },
        "超": {
            "level": 36,
            "reading": "ちょう",
            "meaning": "Ultra"
        },
        "邦": {
            "level": 39,
            "reading": "ほう",
            "meaning": "Home Country"
        },
        "鈴": {
            "level": 39,
            "reading": "りん",
            "meaning": "Buzzer"
        },
        "阜": {
            "level": 39,
            "reading": "ふ",
            "meaning": "Mound"
        },
        "岐": {
            "level": 39,
            "reading": "き",
            "meaning": "Branch Off"
        },
        "隆": {
            "level": 39,
            "reading": "りゅう",
            "meaning": "Prosperity"
        },
        "雇": {
            "level": 39,
            "reading": "こ",
            "meaning": "Employ"
        },
        "控": {
            "level": 39,
            "reading": "こう",
            "meaning": "Abstain"
        },
        "壁": {
            "level": 39,
            "reading": "へき",
            "meaning": "Wall"
        },
        "棋": {
            "level": 39,
            "reading": "き",
            "meaning": "Chess Piece"
        },
        "渋": {
            "level": 39,
            "reading": "じゅう",
            "meaning": "Bitter"
        },
        "片": {
            "level": 39,
            "reading": "へん",
            "meaning": "One Sided"
        },
        "群": {
            "level": 39,
            "reading": "ぐん",
            "meaning": "Flock"
        },
        "仙": {
            "level": 39,
            "reading": "せん",
            "meaning": "Hermit"
        },
        "充": {
            "level": 39,
            "reading": "じゅう",
            "meaning": "Allocate"
        },
        "免": {
            "level": 39,
            "reading": "めん",
            "meaning": "Excuse"
        },
        "勧": {
            "level": 39,
            "reading": "かん",
            "meaning": "Recommend"
        },
        "圏": {
            "level": 39,
            "reading": "けん",
            "meaning": "Range"
        },
        "埋": {
            "level": 39,
            "reading": "まい",
            "meaning": "Bury"
        },
        "埼": {
            "level": 39,
            "reading": "き",
            "meaning": "Cape"
        },
        "奪": {
            "level": 39,
            "reading": "だつ",
            "meaning": "Rob"
        },
        "御": {
            "level": 39,
            "reading": "ご",
            "meaning": "Honorable"
        },
        "慎": {
            "level": 39,
            "reading": "しん",
            "meaning": "Humility"
        },
        "拒": {
            "level": 39,
            "reading": "きょ",
            "meaning": "Refuse"
        },
        "枠": {
            "level": 39,
            "reading": "わく",
            "meaning": "Frame"
        },
        "甲": {
            "level": 39,
            "reading": "こう",
            "meaning": "Turtle Shell"
        },
        "斐": {
            "level": 39,
            "reading": "い",
            "meaning": "Patterned"
        },
        "祉": {
            "level": 39,
            "reading": "し",
            "meaning": "Welfare"
        },
        "稲": {
            "level": 39,
            "reading": "いね",
            "meaning": "Rice Plant"
        },
        "譲": {
            "level": 39,
            "reading": "じょう",
            "meaning": "Defer"
        },
        "謙": {
            "level": 39,
            "reading": "けん",
            "meaning": "Modesty"
        },
        "躍": {
            "level": 39,
            "reading": "やく",
            "meaning": "Leap"
        },
        "銃": {
            "level": 39,
            "reading": "じゅう",
            "meaning": "Gun"
        },
        "項": {
            "level": 39,
            "reading": "こう",
            "meaning": "Paragraph"
        },
        "鋼": {
            "level": 39,
            "reading": "こう",
            "meaning": "Steel"
        },
        "顧": {
            "level": 40,
            "reading": "こ",
            "meaning": "Review"
        },
        "駐": {
            "level": 40,
            "reading": "ちゅう",
            "meaning": "Resident"
        },
        "駆": {
            "level": 40,
            "reading": "く",
            "meaning": "Gallop"
        },
        "柱": {
            "level": 40,
            "reading": "ちゅう",
            "meaning": "Pillar"
        },
        "唱": {
            "level": 40,
            "reading": "しょう",
            "meaning": "Chant"
        },
        "孝": {
            "level": 40,
            "reading": "こう",
            "meaning": "Filial Piety"
        },
        "俊": {
            "level": 40,
            "reading": "しゅん",
            "meaning": "Genius"
        },
        "兼": {
            "level": 40,
            "reading": "けん",
            "meaning": "Concurrently"
        },
        "剤": {
            "level": 40,
            "reading": "ざい",
            "meaning": "Dose"
        },
        "吹": {
            "level": 40,
            "reading": "すい",
            "meaning": "Blow"
        },
        "堀": {
            "level": 40,
            "reading": "くつ",
            "meaning": "Ditch"
        },
        "巡": {
            "level": 40,
            "reading": "じゅん",
            "meaning": "Patrol"
        },
        "戒": {
            "level": 40,
            "reading": "かい",
            "meaning": "Commandment"
        },
        "排": {
            "level": 40,
            "reading": "はい",
            "meaning": "Reject"
        },
        "携": {
            "level": 40,
            "reading": "けい",
            "meaning": "Portable"
        },
        "敏": {
            "level": 40,
            "reading": "びん",
            "meaning": "Alert"
        },
        "鋭": {
            "level": 40,
            "reading": "えい",
            "meaning": "Sharp"
        },
        "敷": {
            "level": 40,
            "reading": "ふ",
            "meaning": "Spread"
        },
        "殿": {
            "level": 40,
            "reading": "でん",
            "meaning": "Milord"
        },
        "犠": {
            "level": 40,
            "reading": "ぎ",
            "meaning": "Sacrifice"
        },
        "獲": {
            "level": 40,
            "reading": "かく",
            "meaning": "Seize"
        },
        "茂": {
            "level": 40,
            "reading": "も",
            "meaning": "Luxuriant"
        },
        "繁": {
            "level": 40,
            "reading": "はん",
            "meaning": "Overgrown"
        },
        "頻": {
            "level": 40,
            "reading": "ひん",
            "meaning": "Frequent"
        },
        "殖": {
            "level": 40,
            "reading": "しょく",
            "meaning": "Multiply"
        },
        "薄": {
            "level": 40,
            "reading": "はく",
            "meaning": "Dilute"
        },
        "衝": {
            "level": 40,
            "reading": "しょう",
            "meaning": "Collide"
        },
        "誉": {
            "level": 40,
            "reading": "よ",
            "meaning": "Honor"
        },
        "褒": {
            "level": 40,
            "reading": "ほう",
            "meaning": "Praise"
        },
        "透": {
            "level": 40,
            "reading": "とう",
            "meaning": "Transparent"
        },
        "隣": {
            "level": 40,
            "reading": "りん",
            "meaning": "Neighbor"
        },
        "雅": {
            "level": 40,
            "reading": "が",
            "meaning": "Elegant"
        },
        "遜": {
            "level": 41,
            "reading": "そん",
            "meaning": "Humble"
        },
        "伺": {
            "level": 41,
            "reading": "し",
            "meaning": "Pay Respects"
        },
        "徹": {
            "level": 41,
            "reading": "てつ",
            "meaning": "Penetrate"
        },
        "瀬": {
            "level": 41,
            "reading": "らい",
            "meaning": "Rapids"
        },
        "撤": {
            "level": 41,
            "reading": "てつ",
            "meaning": "Withdrawal"
        },
        "措": {
            "level": 41,
            "reading": "そ",
            "meaning": "Set Aside"
        },
        "拠": {
            "level": 41,
            "reading": "きょ",
            "meaning": "Based On"
        },
        "儀": {
            "level": 41,
            "reading": "ぎ",
            "meaning": "Ceremony"
        },
        "樹": {
            "level": 41,
            "reading": "じゅ",
            "meaning": "Wood"
        },
        "棄": {
            "level": 41,
            "reading": "き",
            "meaning": "Abandon"
        },
        "虎": {
            "level": 41,
            "reading": "こ",
            "meaning": "Tiger"
        },
        "蛍": {
            "level": 41,
            "reading": "けい",
            "meaning": "Firefly"
        },
        "蜂": {
            "level": 41,
            "reading": "ほう",
            "meaning": "Bee"
        },
        "酎": {
            "level": 41,
            "reading": "ちゅう",
            "meaning": "Sake"
        },
        "蜜": {
            "level": 41,
            "reading": "みつ",
            "meaning": "Honey"
        },
        "墟": {
            "level": 41,
            "reading": "きょ",
            "meaning": "Ruins"
        },
        "艦": {
            "level": 41,
            "reading": "かん",
            "meaning": "Warship"
        },
        "潜": {
            "level": 41,
            "reading": "せん",
            "meaning": "Conceal"
        },
        "拳": {
            "level": 41,
            "reading": "けん",
            "meaning": "Fist"
        },
        "炭": {
            "level": 41,
            "reading": "たん",
            "meaning": "Charcoal"
        },
        "畑": {
            "level": 41,
            "reading": "はたけ",
            "meaning": "Field"
        },
        "包": {
            "level": 41,
            "reading": "ほう",
            "meaning": "Wrap"
        },
        "衣": {
            "level": 41,
            "reading": "い",
            "meaning": "Clothes"
        },
        "仁": {
            "level": 41,
            "reading": "じん",
            "meaning": "Humanity"
        },
        "鉱": {
            "level": 41,
            "reading": "こう",
            "meaning": "Mineral"
        },
        "至": {
            "level": 41,
            "reading": "し",
            "meaning": "Attain"
        },
        "誠": {
            "level": 41,
            "reading": "せい",
            "meaning": "Sincerity"
        },
        "郷": {
            "level": 41,
            "reading": "きょう",
            "meaning": "Hometown"
        },
        "侵": {
            "level": 41,
            "reading": "しん",
            "meaning": "Invade"
        },
        "偽": {
            "level": 41,
            "reading": "ぎ",
            "meaning": "Fake"
        },
        "克": {
            "level": 42,
            "reading": "こく",
            "meaning": "Overcome"
        },
        "到": {
            "level": 42,
            "reading": "とう",
            "meaning": "Arrival"
        },
        "双": {
            "level": 42,
            "reading": "そう",
            "meaning": "Pair"
        },
        "哲": {
            "level": 42,
            "reading": "てつ",
            "meaning": "Philosophy"
        },
        "喪": {
            "level": 42,
            "reading": "そう",
            "meaning": "Mourning"
        },
        "堅": {
            "level": 42,
            "reading": "けん",
            "meaning": "Solid"
        },
        "床": {
            "level": 42,
            "reading": "しょう",
            "meaning": "Floor"
        },
        "括": {
            "level": 42,
            "reading": "かつ",
            "meaning": "Fasten"
        },
        "弧": {
            "level": 42,
            "reading": "こ",
            "meaning": "Arc"
        },
        "挑": {
            "level": 42,
            "reading": "ちょう",
            "meaning": "Challenge"
        },
        "掘": {
            "level": 42,
            "reading": "くつ",
            "meaning": "Dig"
        },
        "揚": {
            "level": 42,
            "reading": "よう",
            "meaning": "Hoist"
        },
        "握": {
            "level": 42,
            "reading": "あく",
            "meaning": "Grip"
        },
        "揺": {
            "level": 42,
            "reading": "よう",
            "meaning": "Shake"
        },
        "斎": {
            "level": 42,
            "reading": "さい",
            "meaning": "Purification"
        },
        "暫": {
            "level": 42,
            "reading": "ざん",
            "meaning": "Temporarily"
        },
        "析": {
            "level": 42,
            "reading": "せき",
            "meaning": "Analysis"
        },
        "枢": {
            "level": 42,
            "reading": "すう",
            "meaning": "Hinge"
        },
        "軸": {
            "level": 42,
            "reading": "じく",
            "meaning": "Axis"
        },
        "柄": {
            "level": 42,
            "reading": "へい",
            "meaning": "Pattern"
        },
        "泊": {
            "level": 42,
            "reading": "はく",
            "meaning": "Overnight"
        },
        "滑": {
            "level": 42,
            "reading": "かつ",
            "meaning": "Slippery"
        },
        "潟": {
            "level": 42,
            "reading": "せき",
            "meaning": "Lagoon"
        },
        "焦": {
            "level": 42,
            "reading": "しょう",
            "meaning": "Char"
        },
        "範": {
            "level": 42,
            "reading": "はん",
            "meaning": "Example"
        },
        "紛": {
            "level": 42,
            "reading": "ふん",
            "meaning": "Distract"
        },
        "糾": {
            "level": 42,
            "reading": "きゅう",
            "meaning": "Twist"
        },
        "綱": {
            "level": 42,
            "reading": "こう",
            "meaning": "Cable"
        },
        "網": {
            "level": 42,
            "reading": "もう",
            "meaning": "Netting"
        },
        "肝": {
            "level": 42,
            "reading": "かん",
            "meaning": "Liver"
        },
        "芝": {
            "level": 42,
            "reading": "し",
            "meaning": "Lawn"
        },
        "荒": {
            "level": 42,
            "reading": "こう",
            "meaning": "Wild"
        },
        "袋": {
            "level": 42,
            "reading": "たい",
            "meaning": "Sack"
        },
        "誰": {
            "level": 43,
            "reading": "だれ",
            "meaning": "Who"
        },
        "珍": {
            "level": 43,
            "reading": "ちん",
            "meaning": "Rare"
        },
        "裂": {
            "level": 43,
            "reading": "れつ",
            "meaning": "Split"
        },
        "襲": {
            "level": 43,
            "reading": "しゅう",
            "meaning": "Attack"
        },
        "貢": {
            "level": 43,
            "reading": "こう",
            "meaning": "Tribute"
        },
        "趣": {
            "level": 43,
            "reading": "しゅ",
            "meaning": "Charm"
        },
        "距": {
            "level": 43,
            "reading": "きょ",
            "meaning": "Distance"
        },
        "籍": {
            "level": 43,
            "reading": "せき",
            "meaning": "Enroll"
        },
        "露": {
            "level": 43,
            "reading": "ろ",
            "meaning": "Expose"
        },
        "牧": {
            "level": 43,
            "reading": "ぼく",
            "meaning": "Pasture"
        },
        "刷": {
            "level": 43,
            "reading": "さつ",
            "meaning": "Printing"
        },
        "朗": {
            "level": 43,
            "reading": "ろう",
            "meaning": "Bright"
        },
        "潮": {
            "level": 43,
            "reading": "ちょう",
            "meaning": "Tide"
        },
        "即": {
            "level": 43,
            "reading": "そく",
            "meaning": "Instant"
        },
        "垣": {
            "level": 43,
            "reading": "かき",
            "meaning": "Hedge"
        },
        "威": {
            "level": 43,
            "reading": "い",
            "meaning": "Majesty"
        },
        "封": {
            "level": 43,
            "reading": "ふう",
            "meaning": "Seal"
        },
        "筒": {
            "level": 43,
            "reading": "とう",
            "meaning": "Cylinder"
        },
        "岳": {
            "level": 45,
            "reading": "がく",
            "meaning": "Peak"
        },
        "慰": {
            "level": 43,
            "reading": "い",
            "meaning": "Consolation"
        },
        "懇": {
            "level": 43,
            "reading": "こん",
            "meaning": "Courteous"
        },
        "懲": {
            "level": 43,
            "reading": "ちょう",
            "meaning": "Chastise"
        },
        "摩": {
            "level": 43,
            "reading": "ま",
            "meaning": "Chafe"
        },
        "擦": {
            "level": 43,
            "reading": "さつ",
            "meaning": "Rub"
        },
        "撲": {
            "level": 43,
            "reading": "ぼく",
            "meaning": "Slap"
        },
        "斉": {
            "level": 43,
            "reading": "せい",
            "meaning": "Simultaneous"
        },
        "旨": {
            "level": 43,
            "reading": "し",
            "meaning": "Point"
        },
        "柔": {
            "level": 43,
            "reading": "じゅう",
            "meaning": "Gentle"
        },
        "沈": {
            "level": 43,
            "reading": "ちん",
            "meaning": "Sink"
        },
        "沼": {
            "level": 28,
            "reading": "しょう",
            "meaning": "Bog"
        },
        "泰": {
            "level": 43,
            "reading": "たい",
            "meaning": "Peace"
        },
        "滅": {
            "level": 43,
            "reading": "めつ",
            "meaning": "Destroy"
        },
        "滋": {
            "level": 43,
            "reading": "じ",
            "meaning": "Nourishing"
        },
        "炉": {
            "level": 43,
            "reading": "ろ",
            "meaning": "Furnace"
        },
        "琴": {
            "level": 43,
            "reading": "こと",
            "meaning": "Harp"
        },
        "寸": {
            "level": 44,
            "reading": "すん",
            "meaning": "Measurement"
        },
        "竜": {
            "level": 44,
            "reading": "りゅう",
            "meaning": "Dragon"
        },
        "縁": {
            "level": 44,
            "reading": "えん",
            "meaning": "Edge"
        },
        "翼": {
            "level": 44,
            "reading": "よく",
            "meaning": "Wing"
        },
        "吉": {
            "level": 44,
            "reading": "きつ",
            "meaning": "Good Luck"
        },
        "刃": {
            "level": 44,
            "reading": "じん",
            "meaning": "Blade"
        },
        "忍": {
            "level": 44,
            "reading": "にん",
            "meaning": "Endure"
        },
        "桃": {
            "level": 44,
            "reading": "とう",
            "meaning": "Peach"
        },
        "辛": {
            "level": 44,
            "reading": "しん",
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
            "reading": "ご",
            "meaning": "Recreation"
        },
        "斗": {
            "level": 44,
            "reading": "と",
            "meaning": "Ladle"
        },
        "朱": {
            "level": 44,
            "reading": "しゅ",
            "meaning": "Vermilion"
        },
        "丘": {
            "level": 44,
            "reading": "きゅう",
            "meaning": "Hill"
        },
        "梨": {
            "level": 44,
            "reading": "なし",
            "meaning": "Pear"
        },
        "僕": {
            "level": 12,
            "reading": "ぼく",
            "meaning": "I"
        },
        "匹": {
            "level": 15,
            "reading": "ひき",
            "meaning": "Small Animal"
        },
        "叫": {
            "level": 44,
            "reading": "きょう",
            "meaning": "Shout"
        },
        "釣": {
            "level": 44,
            "reading": "ちょう",
            "meaning": "Fishing"
        },
        "髪": {
            "level": 44,
            "reading": "はつ",
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
            "reading": "るい",
            "meaning": "Teardrop"
        },
        "缶": {
            "level": 44,
            "reading": "かん",
            "meaning": "Can"
        },
        "姫": {
            "level": 44,
            "reading": "ひめ",
            "meaning": "Princess"
        },
        "棚": {
            "level": 23,
            "reading": "ほう",
            "meaning": "Shelf"
        },
        "粒": {
            "level": 44,
            "reading": "りゅう",
            "meaning": "Grains"
        },
        "砲": {
            "level": 44,
            "reading": "ほう",
            "meaning": "Cannon"
        },
        "雷": {
            "level": 44,
            "reading": "らい",
            "meaning": "Thunder"
        },
        "芽": {
            "level": 44,
            "reading": "が",
            "meaning": "Sprout"
        },
        "塔": {
            "level": 44,
            "reading": "とう",
            "meaning": "Tower"
        },
        "澄": {
            "level": 45,
            "reading": "ちょう",
            "meaning": "Lucidity"
        },
        "矛": {
            "level": 45,
            "reading": "む",
            "meaning": "Spear"
        },
        "肌": {
            "level": 45,
            "reading": "き",
            "meaning": "Skin"
        },
        "舟": {
            "level": 45,
            "reading": "しゅう",
            "meaning": "Boat"
        },
        "鐘": {
            "level": 45,
            "reading": "しょう",
            "meaning": "Bell"
        },
        "凶": {
            "level": 45,
            "reading": "きょう",
            "meaning": "Villain"
        },
        "塊": {
            "level": 45,
            "reading": "かい",
            "meaning": "Lump"
        },
        "狩": {
            "level": 45,
            "reading": "しゅ",
            "meaning": "Hunt"
        },
        "頃": {
            "level": 45,
            "reading": "ころ",
            "meaning": "Approximate"
        },
        "魂": {
            "level": 45,
            "reading": "こん",
            "meaning": "Soul"
        },
        "脚": {
            "level": 45,
            "reading": "きゃく",
            "meaning": "Leg"
        },
        "也": {
            "level": 45,
            "reading": "や",
            "meaning": "Considerably"
        },
        "井": {
            "level": 45,
            "reading": "しょう",
            "meaning": "Well"
        },
        "呪": {
            "level": 45,
            "reading": "じゅ",
            "meaning": "Curse"
        },
        "嬢": {
            "level": 45,
            "reading": "じょう",
            "meaning": "Miss"
        },
        "暦": {
            "level": 45,
            "reading": "れき",
            "meaning": "Calendar"
        },
        "曇": {
            "level": 45,
            "reading": "くも",
            "meaning": "Cloudy"
        },
        "眺": {
            "level": 45,
            "reading": "ちょう",
            "meaning": "Stare"
        },
        "裸": {
            "level": 45,
            "reading": "ら",
            "meaning": "Naked"
        },
        "賭": {
            "level": 45,
            "reading": "か",
            "meaning": "Gamble"
        },
        "疲": {
            "level": 45,
            "reading": "ひ",
            "meaning": "Exhausted"
        },
        "塾": {
            "level": 45,
            "reading": "じゅく",
            "meaning": "Cram School"
        },
        "卓": {
            "level": 45,
            "reading": "たく",
            "meaning": "Table"
        },
        "磨": {
            "level": 45,
            "reading": "ま",
            "meaning": "Polish"
        },
        "菌": {
            "level": 45,
            "reading": "きん",
            "meaning": "Bacteria"
        },
        "陰": {
            "level": 45,
            "reading": "いん",
            "meaning": "Shade"
        },
        "霊": {
            "level": 45,
            "reading": "れい",
            "meaning": "Ghost"
        },
        "湿": {
            "level": 45,
            "reading": "しつ",
            "meaning": "Damp"
        },
        "硬": {
            "level": 45,
            "reading": "こう",
            "meaning": "Stiff"
        },
        "稼": {
            "level": 45,
            "reading": "か",
            "meaning": "Earnings"
        },
        "嫁": {
            "level": 45,
            "reading": "か",
            "meaning": "Bride"
        },
        "溝": {
            "level": 45,
            "reading": "こう",
            "meaning": "Gutter"
        },
        "滝": {
            "level": 45,
            "reading": "たき",
            "meaning": "Waterfall"
        },
        "狂": {
            "level": 45,
            "reading": "きょう",
            "meaning": "Lunatic"
        },
        "翔": {
            "level": 45,
            "reading": "しょう",
            "meaning": "Fly"
        },
        "墨": {
            "level": 46,
            "reading": "すみ",
            "meaning": "Black Ink"
        },
        "鳩": {
            "level": 46,
            "reading": "く",
            "meaning": "Dove"
        },
        "穏": {
            "level": 46,
            "reading": "おん",
            "meaning": "Calm"
        },
        "鈍": {
            "level": 46,
            "reading": "どん",
            "meaning": "Dull"
        },
        "魔": {
            "level": 46,
            "reading": "ま",
            "meaning": "Devil"
        },
        "寮": {
            "level": 46,
            "reading": "りょう",
            "meaning": "Dormitory"
        },
        "盆": {
            "level": 46,
            "reading": "ぼん",
            "meaning": "Lantern Festival"
        },
        "棟": {
            "level": 46,
            "reading": "とう",
            "meaning": "Pillar"
        },
        "吾": {
            "level": 46,
            "reading": "ご",
            "meaning": "I"
        },
        "斬": {
            "level": 46,
            "reading": "ざん",
            "meaning": "Slice"
        },
        "寧": {
            "level": 46,
            "reading": "ねい",
            "meaning": "Rather"
        },
        "椅": {
            "level": 46,
            "reading": "い",
            "meaning": "Chair"
        },
        "歳": {
            "level": 46,
            "reading": "さい",
            "meaning": "Years Old"
        },
        "涼": {
            "level": 46,
            "reading": "りょう",
            "meaning": "Cool"
        },
        "猿": {
            "level": 46,
            "reading": "えん",
            "meaning": "Monkey"
        },
        "瞳": {
            "level": 46,
            "reading": "とう",
            "meaning": "Pupil"
        },
        "鍵": {
            "level": 46,
            "reading": "けん",
            "meaning": "Key"
        },
        "零": {
            "level": 46,
            "reading": "れい",
            "meaning": "Zero"
        },
        "碁": {
            "level": 46,
            "reading": "ご",
            "meaning": "Go"
        },
        "租": {
            "level": 46,
            "reading": "そ",
            "meaning": "Tariff"
        },
        "幽": {
            "level": 46,
            "reading": "ゆう",
            "meaning": "Secluded"
        },
        "泡": {
            "level": 46,
            "reading": "ほう",
            "meaning": "Bubbles"
        },
        "癖": {
            "level": 46,
            "reading": "へき",
            "meaning": "Habit"
        },
        "鍛": {
            "level": 46,
            "reading": "たん",
            "meaning": "Forge"
        },
        "錬": {
            "level": 46,
            "reading": "れん",
            "meaning": "Tempering"
        },
        "穂": {
            "level": 46,
            "reading": "すい",
            "meaning": "Head of Plant"
        },
        "帝": {
            "level": 46,
            "reading": "てい",
            "meaning": "Sovereign"
        },
        "瞬": {
            "level": 46,
            "reading": "しゅん",
            "meaning": "Blink"
        },
        "菊": {
            "level": 46,
            "reading": "きく",
            "meaning": "Chrysanthemum"
        },
        "誇": {
            "level": 46,
            "reading": "こ",
            "meaning": "Pride"
        },
        "庄": {
            "level": 46,
            "reading": "しょう",
            "meaning": "Manor"
        },
        "阻": {
            "level": 46,
            "reading": "そ",
            "meaning": "Thwart"
        },
        "黙": {
            "level": 46,
            "reading": "もく",
            "meaning": "Shut Up"
        },
        "俵": {
            "level": 46,
            "reading": "ひょう",
            "meaning": "Sack"
        },
        "綿": {
            "level": 46,
            "reading": "めん",
            "meaning": "Cotton"
        },
        "架": {
            "level": 46,
            "reading": "か",
            "meaning": "Shelf"
        },
        "砕": {
            "level": 47,
            "reading": "さい",
            "meaning": "Smash"
        },
        "粘": {
            "level": 47,
            "reading": "ねん",
            "meaning": "Sticky"
        },
        "粧": {
            "level": 47,
            "reading": "しょう",
            "meaning": "Cosmetics"
        },
        "欺": {
            "level": 47,
            "reading": "ぎ",
            "meaning": "Deceit"
        },
        "詐": {
            "level": 47,
            "reading": "さ",
            "meaning": "Lie"
        },
        "霧": {
            "level": 47,
            "reading": "む",
            "meaning": "Fog"
        },
        "柳": {
            "level": 47,
            "reading": "りゅう",
            "meaning": "Willow"
        },
        "伊": {
            "level": 47,
            "reading": "い",
            "meaning": "Italy"
        },
        "佐": {
            "level": 47,
            "reading": "さ",
            "meaning": "Help"
        },
        "尺": {
            "level": 47,
            "reading": "しゃく",
            "meaning": "Shaku"
        },
        "哀": {
            "level": 47,
            "reading": "あい",
            "meaning": "Pathetic"
        },
        "唇": {
            "level": 47,
            "reading": "しん",
            "meaning": "Lips"
        },
        "塀": {
            "level": 47,
            "reading": "へい",
            "meaning": "Fence"
        },
        "墜": {
            "level": 47,
            "reading": "つい",
            "meaning": "Crash"
        },
        "如": {
            "level": 47,
            "reading": "じょ",
            "meaning": "Likeness"
        },
        "婆": {
            "level": 47,
            "reading": "ば",
            "meaning": "Old Woman"
        },
        "崖": {
            "level": 47,
            "reading": "がい",
            "meaning": "Cliff"
        },
        "帽": {
            "level": 47,
            "reading": "ぼう",
            "meaning": "Hat"
        },
        "幣": {
            "level": 47,
            "reading": "へい",
            "meaning": "Cash"
        },
        "恨": {
            "level": 47,
            "reading": "こん",
            "meaning": "Grudge"
        },
        "憎": {
            "level": 47,
            "reading": "ぞう",
            "meaning": "Hate"
        },
        "憩": {
            "level": 47,
            "reading": "けい",
            "meaning": "Rest"
        },
        "扇": {
            "level": 47,
            "reading": "せん",
            "meaning": "Folding Fan"
        },
        "扉": {
            "level": 47,
            "reading": "ひ",
            "meaning": "Front Door"
        },
        "挿": {
            "level": 47,
            "reading": "そう",
            "meaning": "Insert"
        },
        "掌": {
            "level": 47,
            "reading": "しょう",
            "meaning": "Manipulate"
        },
        "滴": {
            "level": 47,
            "reading": "てき",
            "meaning": "Drip"
        },
        "炊": {
            "level": 47,
            "reading": "すい",
            "meaning": "Cook"
        },
        "爽": {
            "level": 47,
            "reading": "そう",
            "meaning": "Refreshing"
        },
        "畳": {
            "level": 47,
            "reading": "じょう",
            "meaning": "Tatami Mat"
        },
        "瞭": {
            "level": 47,
            "reading": "りょう",
            "meaning": "Clear"
        },
        "箸": {
            "level": 47,
            "reading": "ちゃく",
            "meaning": "Chopsticks"
        },
        "胴": {
            "level": 47,
            "reading": "どう",
            "meaning": "Torso"
        },
        "芯": {
            "level": 47,
            "reading": "しん",
            "meaning": "Wick"
        },
        "虹": {
            "level": 47,
            "reading": "こう",
            "meaning": "Rainbow"
        },
        "帳": {
            "level": 48,
            "reading": "ちょう",
            "meaning": "Notebook"
        },
        "蚊": {
            "level": 48,
            "reading": "か",
            "meaning": "Mosquito"
        },
        "蛇": {
            "level": 48,
            "reading": "じゃ",
            "meaning": "Snake"
        },
        "貼": {
            "level": 48,
            "reading": "ちょう",
            "meaning": "Paste"
        },
        "辱": {
            "level": 48,
            "reading": "じょく",
            "meaning": "Humiliate"
        },
        "鉢": {
            "level": 48,
            "reading": "はち",
            "meaning": "Bowl"
        },
        "闇": {
            "level": 48,
            "reading": "あん",
            "meaning": "Darkness"
        },
        "隙": {
            "level": 48,
            "reading": "げき",
            "meaning": "Crevice"
        },
        "霜": {
            "level": 48,
            "reading": "しも",
            "meaning": "Frost"
        },
        "飢": {
            "level": 48,
            "reading": "き",
            "meaning": "Starve"
        },
        "餓": {
            "level": 48,
            "reading": "が",
            "meaning": "Starve"
        },
        "畜": {
            "level": 48,
            "reading": "ちく",
            "meaning": "Livestock"
        },
        "迅": {
            "level": 48,
            "reading": "じん",
            "meaning": "Swift"
        },
        "騎": {
            "level": 48,
            "reading": "き",
            "meaning": "Horse Riding"
        },
        "蓄": {
            "level": 48,
            "reading": "ちく",
            "meaning": "Amass"
        },
        "尽": {
            "level": 48,
            "reading": "じん",
            "meaning": "Use Up"
        },
        "彩": {
            "level": 48,
            "reading": "さい",
            "meaning": "Coloring"
        },
        "憶": {
            "level": 48,
            "reading": "おく",
            "meaning": "Recollection"
        },
        "溶": {
            "level": 48,
            "reading": "よう",
            "meaning": "Melt"
        },
        "耐": {
            "level": 48,
            "reading": "たい",
            "meaning": "Resistant"
        },
        "踊": {
            "level": 48,
            "reading": "よう",
            "meaning": "Dance"
        },
        "賢": {
            "level": 48,
            "reading": "けん",
            "meaning": "Clever"
        },
        "輝": {
            "level": 48,
            "reading": "き",
            "meaning": "Radiance"
        },
        "脅": {
            "level": 48,
            "reading": "きょう",
            "meaning": "Threaten"
        },
        "麻": {
            "level": 48,
            "reading": "ま",
            "meaning": "Hemp"
        },
        "灯": {
            "level": 48,
            "reading": "とう",
            "meaning": "Lamp"
        },
        "咲": {
            "level": 48,
            "reading": "しょう",
            "meaning": "Blossom"
        },
        "培": {
            "level": 48,
            "reading": "ばい",
            "meaning": "Cultivate"
        },
        "悔": {
            "level": 48,
            "reading": "かい",
            "meaning": "Regret"
        },
        "脇": {
            "level": 48,
            "reading": "きょう",
            "meaning": "Armpit"
        },
        "遂": {
            "level": 48,
            "reading": "すい",
            "meaning": "Accomplish"
        },
        "班": {
            "level": 48,
            "reading": "はん",
            "meaning": "Squad"
        },
        "塗": {
            "level": 48,
            "reading": "と",
            "meaning": "Paint"
        },
        "斜": {
            "level": 48,
            "reading": "しゃ",
            "meaning": "Diagonal"
        },
        "殴": {
            "level": 48,
            "reading": "おう",
            "meaning": "Assault"
        },
        "盾": {
            "level": 48,
            "reading": "じゅん",
            "meaning": "Shield"
        },
        "穫": {
            "level": 48,
            "reading": "かく",
            "meaning": "Harvest"
        },
        "巾": {
            "level": 47,
            "reading": "きん",
            "meaning": "Towel"
        },
        "駒": {
            "level": 49,
            "reading": "く",
            "meaning": "Chess Piece"
        },
        "紫": {
            "level": 49,
            "reading": "し",
            "meaning": "Purple"
        },
        "抽": {
            "level": 49,
            "reading": "ちゅう",
            "meaning": "Pluck"
        },
        "誓": {
            "level": 49,
            "reading": "せい",
            "meaning": "Vow"
        },
        "悟": {
            "level": 49,
            "reading": "ご",
            "meaning": "Comprehension"
        },
        "拓": {
            "level": 49,
            "reading": "たく",
            "meaning": "Cultivation"
        },
        "拘": {
            "level": 49,
            "reading": "こう",
            "meaning": "Arrest"
        },
        "礎": {
            "level": 49,
            "reading": "そ",
            "meaning": "Foundation"
        },
        "鶴": {
            "level": 49,
            "reading": "かく",
            "meaning": "Crane"
        },
        "刈": {
            "level": 49,
            "reading": "か",
            "meaning": "Prune"
        },
        "剛": {
            "level": 49,
            "reading": "ごう",
            "meaning": "Sturdy"
        },
        "唯": {
            "level": 49,
            "reading": "ゆい",
            "meaning": "Solely"
        },
        "壇": {
            "level": 49,
            "reading": "だん",
            "meaning": "Podium"
        },
        "尼": {
            "level": 49,
            "reading": "に",
            "meaning": "Nun"
        },
        "概": {
            "level": 49,
            "reading": "がい",
            "meaning": "Approximation"
        },
        "浸": {
            "level": 49,
            "reading": "しん",
            "meaning": "Immersed"
        },
        "淡": {
            "level": 49,
            "reading": "たん",
            "meaning": "Faint"
        },
        "煮": {
            "level": 49,
            "reading": "しゃ",
            "meaning": "Boil"
        },
        "覆": {
            "level": 49,
            "reading": "ふく",
            "meaning": "Capsize"
        },
        "謀": {
            "level": 49,
            "reading": "ぼう",
            "meaning": "Conspire"
        },
        "陶": {
            "level": 49,
            "reading": "とう",
            "meaning": "Pottery"
        },
        "隔": {
            "level": 49,
            "reading": "かく",
            "meaning": "Isolate"
        },
        "征": {
            "level": 49,
            "reading": "せい",
            "meaning": "Subjugate"
        },
        "陛": {
            "level": 49,
            "reading": "へい",
            "meaning": "Highness"
        },
        "俗": {
            "level": 49,
            "reading": "ぞく",
            "meaning": "Vulgar"
        },
        "桑": {
            "level": 49,
            "reading": "そう",
            "meaning": "Mulberry"
        },
        "潤": {
            "level": 49,
            "reading": "じゅん",
            "meaning": "Watered"
        },
        "珠": {
            "level": 49,
            "reading": "しゅ",
            "meaning": "Pearl"
        },
        "衰": {
            "level": 49,
            "reading": "すい",
            "meaning": "Decline"
        },
        "奨": {
            "level": 49,
            "reading": "しょう",
            "meaning": "Encourage"
        },
        "劣": {
            "level": 49,
            "reading": "れつ",
            "meaning": "Inferiority"
        },
        "勘": {
            "level": 49,
            "reading": "かん",
            "meaning": "Intuition"
        },
        "妃": {
            "level": 49,
            "reading": "ひ",
            "meaning": "Princess"
        },
        "丈": {
            "level": 15,
            "reading": "じょう",
            "meaning": "Height"
        },
        "峰": {
            "level": 50,
            "reading": "ほう",
            "meaning": "Summit"
        },
        "巧": {
            "level": 50,
            "reading": "こう",
            "meaning": "Adept"
        },
        "邪": {
            "level": 50,
            "reading": "じゃ",
            "meaning": "Wicked"
        },
        "駄": {
            "level": 50,
            "reading": "だ",
            "meaning": "Burdensome"
        },
        "唐": {
            "level": 50,
            "reading": "とう",
            "meaning": "China"
        },
        "廷": {
            "level": 50,
            "reading": "てい",
            "meaning": "Courts"
        },
        "鬱": {
            "level": 50,
            "reading": "うつ",
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
            "reading": "ぼ",
            "meaning": "Record Book"
        },
        "彰": {
            "level": 50,
            "reading": "しょう",
            "meaning": "Clear"
        },
        "漫": {
            "level": 50,
            "reading": "まん",
            "meaning": "Manga"
        },
        "訂": {
            "level": 50,
            "reading": "てい",
            "meaning": "Revise"
        },
        "諮": {
            "level": 50,
            "reading": "し",
            "meaning": "Consult"
        },
        "銘": {
            "level": 50,
            "reading": "めい",
            "meaning": "Inscription"
        },
        "堰": {
            "level": 50,
            "reading": "せき",
            "meaning": "Dam"
        },
        "堤": {
            "level": 50,
            "reading": "てい",
            "meaning": "Embankment"
        },
        "漂": {
            "level": 50,
            "reading": "ひょう",
            "meaning": "Drift"
        },
        "翻": {
            "level": 50,
            "reading": "ほん",
            "meaning": "Flip"
        },
        "軌": {
            "level": 50,
            "reading": "き",
            "meaning": "Rut"
        },
        "后": {
            "level": 50,
            "reading": "こう",
            "meaning": "Empress"
        },
        "奮": {
            "level": 50,
            "reading": "ふん",
            "meaning": "Stirred Up"
        },
        "亭": {
            "level": 50,
            "reading": "てい",
            "meaning": "Restaurant"
        },
        "仰": {
            "level": 50,
            "reading": "ぎょう",
            "meaning": "Look Up To"
        },
        "伯": {
            "level": 50,
            "reading": "はく",
            "meaning": "Chief"
        },
        "偶": {
            "level": 50,
            "reading": "ぐう",
            "meaning": "Accidentally"
        },
        "淀": {
            "level": 50,
            "reading": "よど",
            "meaning": "Eddy"
        },
        "墳": {
            "level": 50,
            "reading": "ふん",
            "meaning": "Tomb"
        },
        "壮": {
            "level": 50,
            "reading": "そう",
            "meaning": "Robust"
        },
        "把": {
            "level": 50,
            "reading": "は",
            "meaning": "Bundle"
        },
        "搬": {
            "level": 50,
            "reading": "はん",
            "meaning": "Transport"
        },
        "晶": {
            "level": 50,
            "reading": "しょう",
            "meaning": "Crystal"
        },
        "洞": {
            "level": 50,
            "reading": "どう",
            "meaning": "Cave"
        },
        "涯": {
            "level": 50,
            "reading": "がい",
            "meaning": "Horizon"
        },
        "疫": {
            "level": 50,
            "reading": "えき",
            "meaning": "Epidemic"
        },
        "孔": {
            "level": 46,
            "reading": "こう",
            "meaning": "Cavity"
        },
        "偉": {
            "level": 51,
            "reading": "い",
            "meaning": "Greatness"
        },
        "頂": {
            "level": 51,
            "reading": "ちょう",
            "meaning": "Summit"
        },
        "召": {
            "level": 51,
            "reading": "しょう",
            "meaning": "Call"
        },
        "挟": {
            "level": 51,
            "reading": "きょう",
            "meaning": "Between"
        },
        "枯": {
            "level": 51,
            "reading": "こ",
            "meaning": "Wither"
        },
        "沸": {
            "level": 51,
            "reading": "ふつ",
            "meaning": "Boil"
        },
        "濯": {
            "level": 51,
            "reading": "たく",
            "meaning": "Wash"
        },
        "燥": {
            "level": 51,
            "reading": "そう",
            "meaning": "Dry Up"
        },
        "瓶": {
            "level": 51,
            "reading": "びん",
            "meaning": "Bottle"
        },
        "耕": {
            "level": 51,
            "reading": "こう",
            "meaning": "Plow"
        },
        "肯": {
            "level": 51,
            "reading": "こう",
            "meaning": "Agreement"
        },
        "脂": {
            "level": 51,
            "reading": "し",
            "meaning": "Fat"
        },
        "膚": {
            "level": 51,
            "reading": "ふ",
            "meaning": "Skin"
        },
        "軒": {
            "level": 51,
            "reading": "けん",
            "meaning": "House Counter"
        },
        "軟": {
            "level": 51,
            "reading": "なん",
            "meaning": "Soft"
        },
        "郊": {
            "level": 51,
            "reading": "こう",
            "meaning": "Suburbs"
        },
        "隅": {
            "level": 51,
            "reading": "ぐう",
            "meaning": "Corner"
        },
        "隻": {
            "level": 51,
            "reading": "せき",
            "meaning": "Ship Counter"
        },
        "邸": {
            "level": 51,
            "reading": "てい",
            "meaning": "Residence"
        },
        "郡": {
            "level": 51,
            "reading": "ぐん",
            "meaning": "County"
        },
        "釈": {
            "level": 51,
            "reading": "しゃく",
            "meaning": "Explanation"
        },
        "肪": {
            "level": 51,
            "reading": "ぼう",
            "meaning": "Obese"
        },
        "喚": {
            "level": 51,
            "reading": "かん",
            "meaning": "Scream"
        },
        "媛": {
            "level": 51,
            "reading": "えん",
            "meaning": "Princess"
        },
        "貞": {
            "level": 51,
            "reading": "てい",
            "meaning": "Chastity"
        },
        "玄": {
            "level": 51,
            "reading": "げん",
            "meaning": "Mysterious"
        },
        "苗": {
            "level": 51,
            "reading": "みょう",
            "meaning": "Seedling"
        },
        "渦": {
            "level": 51,
            "reading": "か",
            "meaning": "Whirlpool"
        },
        "慈": {
            "level": 51,
            "reading": "じ",
            "meaning": "Mercy"
        },
        "襟": {
            "level": 51,
            "reading": "きん",
            "meaning": "Collar"
        },
        "蓮": {
            "level": 51,
            "reading": "れん",
            "meaning": "Lotus"
        },
        "亮": {
            "level": 51,
            "reading": "りょう",
            "meaning": "Clear"
        },
        "聡": {
            "level": 51,
            "reading": "そう",
            "meaning": "Wise"
        },
        "浦": {
            "level": 51,
            "reading": "ほ",
            "meaning": "Bay"
        },
        "塚": {
            "level": 51,
            "reading": "ちょう",
            "meaning": "Mound"
        },
        "陥": {
            "level": 52,
            "reading": "かん",
            "meaning": "Cave In"
        },
        "貫": {
            "level": 52,
            "reading": "かん",
            "meaning": "Pierce"
        },
        "覇": {
            "level": 52,
            "reading": "は",
            "meaning": "Leadership"
        },
        "呂": {
            "level": 52,
            "reading": "ろ",
            "meaning": "Bath"
        },
        "茨": {
            "level": 52,
            "reading": "し",
            "meaning": "Briar"
        },
        "擁": {
            "level": 52,
            "reading": "よう",
            "meaning": "Embrace"
        },
        "孤": {
            "level": 52,
            "reading": "こ",
            "meaning": "Orphan"
        },
        "賠": {
            "level": 52,
            "reading": "ばい",
            "meaning": "Compensation"
        },
        "鎖": {
            "level": 52,
            "reading": "さ",
            "meaning": "Chain"
        },
        "噴": {
            "level": 52,
            "reading": "ふん",
            "meaning": "Erupt"
        },
        "祥": {
            "level": 52,
            "reading": "しょう",
            "meaning": "Auspicious"
        },
        "牲": {
            "level": 52,
            "reading": "せい",
            "meaning": "Offering"
        },
        "秩": {
            "level": 52,
            "reading": "ちつ",
            "meaning": "Order"
        },
        "唆": {
            "level": 52,
            "reading": "さ",
            "meaning": "Instigate"
        },
        "膨": {
            "level": 52,
            "reading": "ぼう",
            "meaning": "Swell"
        },
        "芳": {
            "level": 52,
            "reading": "ほう",
            "meaning": "Perfume"
        },
        "恒": {
            "level": 52,
            "reading": "こう",
            "meaning": "Constant"
        },
        "倫": {
            "level": 52,
            "reading": "りん",
            "meaning": "Ethics"
        },
        "陳": {
            "level": 52,
            "reading": "ちん",
            "meaning": "Exhibit"
        },
        "須": {
            "level": 52,
            "reading": "す",
            "meaning": "Necessary"
        },
        "偏": {
            "level": 52,
            "reading": "へん",
            "meaning": "Biased"
        },
        "遇": {
            "level": 52,
            "reading": "ぐう",
            "meaning": "Treatment"
        },
        "糧": {
            "level": 52,
            "reading": "りょう",
            "meaning": "Provisions"
        },
        "殊": {
            "level": 52,
            "reading": "しゅ",
            "meaning": "Especially"
        },
        "慢": {
            "level": 52,
            "reading": "まん",
            "meaning": "Ridicule"
        },
        "没": {
            "level": 52,
            "reading": "ぼつ",
            "meaning": "Die"
        },
        "怠": {
            "level": 52,
            "reading": "たい",
            "meaning": "Lazy"
        },
        "遭": {
            "level": 52,
            "reading": "そう",
            "meaning": "Encounter"
        },
        "惰": {
            "level": 52,
            "reading": "だ",
            "meaning": "Lazy"
        },
        "猟": {
            "level": 52,
            "reading": "りょう",
            "meaning": "Hunting"
        },
        "乃": {
            "level": 52,
            "reading": "ない",
            "meaning": "From"
        },
        "綾": {
            "level": 52,
            "reading": "りん",
            "meaning": "Design"
        },
        "颯": {
            "level": 52,
            "reading": "さつ",
            "meaning": "Quick"
        },
        "隼": {
            "level": 52,
            "reading": "しゅん",
            "meaning": "Falcon"
        },
        "輔": {
            "level": 52,
            "reading": "ふ",
            "meaning": "Help"
        },
        "寛": {
            "level": 53,
            "reading": "かん",
            "meaning": "Tolerance"
        },
        "胞": {
            "level": 53,
            "reading": "ほう",
            "meaning": "Cell"
        },
        "浄": {
            "level": 53,
            "reading": "じょう",
            "meaning": "Cleanse"
        },
        "随": {
            "level": 53,
            "reading": "ずい",
            "meaning": "All"
        },
        "稿": {
            "level": 53,
            "reading": "こう",
            "meaning": "Draft"
        },
        "丹": {
            "level": 53,
            "reading": "たん",
            "meaning": "Rust Colored"
        },
        "壌": {
            "level": 53,
            "reading": "じょう",
            "meaning": "Soil"
        },
        "舗": {
            "level": 53,
            "reading": "ほ",
            "meaning": "Shop"
        },
        "騰": {
            "level": 53,
            "reading": "とう",
            "meaning": "Inflation"
        },
        "緯": {
            "level": 53,
            "reading": "い",
            "meaning": "Latitude"
        },
        "艇": {
            "level": 53,
            "reading": "てい",
            "meaning": "Rowboat"
        },
        "披": {
            "level": 53,
            "reading": "ひ",
            "meaning": "Expose"
        },
        "錦": {
            "level": 53,
            "reading": "きん",
            "meaning": "Brocade"
        },
        "准": {
            "level": 53,
            "reading": "じゅん",
            "meaning": "Semi"
        },
        "剰": {
            "level": 53,
            "reading": "じょう",
            "meaning": "Surplus"
        },
        "繊": {
            "level": 53,
            "reading": "せん",
            "meaning": "Fiber"
        },
        "諭": {
            "level": 53,
            "reading": "ゆ",
            "meaning": "Admonish"
        },
        "惨": {
            "level": 53,
            "reading": "さん",
            "meaning": "Disaster"
        },
        "虐": {
            "level": 53,
            "reading": "ぎゃく",
            "meaning": "Oppress"
        },
        "据": {
            "level": 53,
            "reading": "きょ",
            "meaning": "Install"
        },
        "徐": {
            "level": 53,
            "reading": "じょ",
            "meaning": "Gently"
        },
        "搭": {
            "level": 53,
            "reading": "とう",
            "meaning": "Board"
        },
        "蒙": {
            "level": 53,
            "reading": "もう",
            "meaning": "Darkness"
        },
        "鯉": {
            "level": 53,
            "reading": "り",
            "meaning": "Carp"
        },
        "戴": {
            "level": 53,
            "reading": "たい",
            "meaning": "Receive"
        },
        "緋": {
            "level": 53,
            "reading": "ひ",
            "meaning": "Scarlet"
        },
        "曙": {
            "level": 53,
            "reading": "しょ",
            "meaning": "Dawn"
        },
        "胡": {
            "level": 53,
            "reading": "こ",
            "meaning": "Barbarian"
        },
        "瓜": {
            "level": 53,
            "reading": "か",
            "meaning": "Melon"
        },
        "帥": {
            "level": 53,
            "reading": "すい",
            "meaning": "Commander"
        },
        "啓": {
            "level": 53,
            "reading": "けい",
            "meaning": "Enlighten"
        },
        "葵": {
            "level": 53,
            "reading": "き",
            "meaning": "Hollyhock"
        },
        "駿": {
            "level": 53,
            "reading": "しゅん",
            "meaning": "Speed"
        },
        "諒": {
            "level": 53,
            "reading": "りょう",
            "meaning": "Comprehend"
        },
        "莉": {
            "level": 53,
            "reading": "り",
            "meaning": "Jasmine"
        },
        "鯨": {
            "level": 54,
            "reading": "げい",
            "meaning": "Whale"
        },
        "荘": {
            "level": 54,
            "reading": "そう",
            "meaning": "Villa"
        },
        "栽": {
            "level": 54,
            "reading": "さい",
            "meaning": "Planting"
        },
        "拐": {
            "level": 54,
            "reading": "かい",
            "meaning": "Kidnap"
        },
        "冠": {
            "level": 54,
            "reading": "かん",
            "meaning": "Crown"
        },
        "勲": {
            "level": 54,
            "reading": "くん",
            "meaning": "Merit"
        },
        "酬": {
            "level": 54,
            "reading": "しゅう",
            "meaning": "Repay"
        },
        "紋": {
            "level": 54,
            "reading": "もん",
            "meaning": "Family Crest"
        },
        "卸": {
            "level": 54,
            "reading": "しゃ",
            "meaning": "Wholesale"
        },
        "欄": {
            "level": 54,
            "reading": "らん",
            "meaning": "Column"
        },
        "逸": {
            "level": 54,
            "reading": "いつ",
            "meaning": "Deviate"
        },
        "尚": {
            "level": 54,
            "reading": "しょう",
            "meaning": "Furthermore"
        },
        "顕": {
            "level": 54,
            "reading": "けん",
            "meaning": "Appear"
        },
        "粛": {
            "level": 54,
            "reading": "しゅく",
            "meaning": "Solemn"
        },
        "愚": {
            "level": 54,
            "reading": "ぐ",
            "meaning": "Foolish"
        },
        "庶": {
            "level": 54,
            "reading": "しょ",
            "meaning": "All"
        },
        "践": {
            "level": 54,
            "reading": "せん",
            "meaning": "Practice"
        },
        "呈": {
            "level": 54,
            "reading": "てい",
            "meaning": "Present"
        },
        "疎": {
            "level": 54,
            "reading": "そ",
            "meaning": "Neglect"
        },
        "疾": {
            "level": 54,
            "reading": "しつ",
            "meaning": "Rapidly"
        },
        "謡": {
            "level": 54,
            "reading": "よう",
            "meaning": "Noh Chanting"
        },
        "鎌": {
            "level": 54,
            "reading": "けん",
            "meaning": "Sickle"
        },
        "酷": {
            "level": 54,
            "reading": "こく",
            "meaning": "Cruel"
        },
        "叙": {
            "level": 54,
            "reading": "じょ",
            "meaning": "Describe"
        },
        "且": {
            "level": 54,
            "reading": "しょ",
            "meaning": "Also"
        },
        "痴": {
            "level": 54,
            "reading": "ち",
            "meaning": "Stupid"
        },
        "呆": {
            "level": 54,
            "reading": "ほう",
            "meaning": "Shock"
        },
        "哺": {
            "level": 54,
            "reading": "ほ",
            "meaning": "Suckle"
        },
        "傲": {
            "level": 54,
            "reading": "ごう",
            "meaning": "Proud"
        },
        "茎": {
            "level": 54,
            "reading": "きょう",
            "meaning": "Stem"
        },
        "阿": {
            "level": 54,
            "reading": "あ",
            "meaning": "Flatter"
        },
        "悠": {
            "level": 54,
            "reading": "ゆう",
            "meaning": "Leisure"
        },
        "杏": {
            "level": 54,
            "reading": "あん",
            "meaning": "Apricot"
        },
        "茜": {
            "level": 54,
            "reading": "せん",
            "meaning": "Red Dye"
        },
        "栞": {
            "level": 54,
            "reading": "かん",
            "meaning": "Bookmark"
        },
        "伏": {
            "level": 55,
            "reading": "ふく",
            "meaning": "Bow"
        },
        "鎮": {
            "level": 55,
            "reading": "ちん",
            "meaning": "Tranquilize"
        },
        "奉": {
            "level": 55,
            "reading": "ほう",
            "meaning": "Dedicate"
        },
        "憂": {
            "level": 55,
            "reading": "ゆう",
            "meaning": "Grief"
        },
        "朴": {
            "level": 55,
            "reading": "ぼく",
            "meaning": "Simple"
        },
        "栃": {
            "level": 55,
            "reading": "とち",
            "meaning": "Horse Chestnut"
        },
        "惜": {
            "level": 55,
            "reading": "せき",
            "meaning": "Frugal"
        },
        "佳": {
            "level": 55,
            "reading": "か",
            "meaning": "Excellent"
        },
        "悼": {
            "level": 55,
            "reading": "とう",
            "meaning": "Grieve"
        },
        "該": {
            "level": 55,
            "reading": "がい",
            "meaning": "The Above"
        },
        "赴": {
            "level": 55,
            "reading": "ふ",
            "meaning": "Proceed"
        },
        "髄": {
            "level": 55,
            "reading": "ずい",
            "meaning": "Marrow"
        },
        "傍": {
            "level": 55,
            "reading": "ぼう",
            "meaning": "Nearby"
        },
        "累": {
            "level": 55,
            "reading": "るい",
            "meaning": "Accumulate"
        },
        "癒": {
            "level": 55,
            "reading": "ゆ",
            "meaning": "Healing"
        },
        "郭": {
            "level": 55,
            "reading": "かく",
            "meaning": "Enclosure"
        },
        "尿": {
            "level": 55,
            "reading": "にょう",
            "meaning": "Urine"
        },
        "賓": {
            "level": 55,
            "reading": "ひん",
            "meaning": "VIP"
        },
        "虜": {
            "level": 55,
            "reading": "りょ",
            "meaning": "Captive"
        },
        "憾": {
            "level": 55,
            "reading": "かん",
            "meaning": "Remorse"
        },
        "弥": {
            "level": 55,
            "reading": "び",
            "meaning": "Increasing"
        },
        "粗": {
            "level": 55,
            "reading": "そ",
            "meaning": "Coarse"
        },
        "循": {
            "level": 55,
            "reading": "じゅん",
            "meaning": "Circulation"
        },
        "凝": {
            "level": 55,
            "reading": "ぎょう",
            "meaning": "Congeal"
        },
        "脊": {
            "level": 55,
            "reading": "せき",
            "meaning": "Stature"
        },
        "昌": {
            "level": 55,
            "reading": "しょう",
            "meaning": "Prosperous"
        },
        "旦": {
            "level": 55,
            "reading": "たん",
            "meaning": "Dawn"
        },
        "愉": {
            "level": 55,
            "reading": "ゆ",
            "meaning": "Pleasant"
        },
        "抹": {
            "level": 55,
            "reading": "まつ",
            "meaning": "Erase"
        },
        "栓": {
            "level": 55,
            "reading": "せん",
            "meaning": "Cork"
        },
        "之": {
            "level": 55,
            "reading": "し",
            "meaning": "This"
        },
        "龍": {
            "level": 55,
            "reading": "りゅう",
            "meaning": "Imperial"
        },
        "遼": {
            "level": 55,
            "reading": "りょう",
            "meaning": "Distant"
        },
        "瑛": {
            "level": 55,
            "reading": "えい",
            "meaning": "Crystal"
        },
        "那": {
            "level": 55,
            "reading": "な",
            "meaning": "What"
        },
        "拍": {
            "level": 56,
            "reading": "はく",
            "meaning": "Beat"
        },
        "猶": {
            "level": 56,
            "reading": "ゆう",
            "meaning": "Still"
        },
        "宰": {
            "level": 56,
            "reading": "さい",
            "meaning": "Manager"
        },
        "寂": {
            "level": 56,
            "reading": "じゃく",
            "meaning": "Lonely"
        },
        "縫": {
            "level": 56,
            "reading": "ほう",
            "meaning": "Sew"
        },
        "呉": {
            "level": 56,
            "reading": "ご",
            "meaning": "Give"
        },
        "凡": {
            "level": 56,
            "reading": "ぼん",
            "meaning": "Mediocre"
        },
        "恭": {
            "level": 56,
            "reading": "きょう",
            "meaning": "Respect"
        },
        "錯": {
            "level": 56,
            "reading": "さく",
            "meaning": "Confused"
        },
        "穀": {
            "level": 56,
            "reading": "こく",
            "meaning": "Grain"
        },
        "陵": {
            "level": 56,
            "reading": "りょう",
            "meaning": "Mausoleum"
        },
        "弊": {
            "level": 56,
            "reading": "へい",
            "meaning": "Evil"
        },
        "舶": {
            "level": 56,
            "reading": "はく",
            "meaning": "Ship"
        },
        "窮": {
            "level": 56,
            "reading": "きゅう",
            "meaning": "Destitute"
        },
        "悦": {
            "level": 56,
            "reading": "えつ",
            "meaning": "Delight"
        },
        "縛": {
            "level": 56,
            "reading": "ばく",
            "meaning": "Bind"
        },
        "轄": {
            "level": 56,
            "reading": "かつ",
            "meaning": "Control"
        },
        "弦": {
            "level": 56,
            "reading": "げん",
            "meaning": "Chord"
        },
        "窒": {
            "level": 56,
            "reading": "ちつ",
            "meaning": "Suffocate"
        },
        "洪": {
            "level": 56,
            "reading": "こう",
            "meaning": "Flood"
        },
        "摂": {
            "level": 56,
            "reading": "せつ",
            "meaning": "In Addition"
        },
        "飽": {
            "level": 56,
            "reading": "ほう",
            "meaning": "Bored"
        },
        "紳": {
            "level": 56,
            "reading": "しん",
            "meaning": "Gentleman"
        },
        "庸": {
            "level": 56,
            "reading": "よう",
            "meaning": "Common"
        },
        "靖": {
            "level": 56,
            "reading": "じょう",
            "meaning": "Peaceful"
        },
        "嘉": {
            "level": 56,
            "reading": "か",
            "meaning": "Esteem"
        },
        "搾": {
            "level": 56,
            "reading": "さく",
            "meaning": "Squeeze"
        },
        "蝶": {
            "level": 56,
            "reading": "ちょう",
            "meaning": "Butterfly"
        },
        "碑": {
            "level": 56,
            "reading": "ひ",
            "meaning": "Tombstone"
        },
        "尉": {
            "level": 56,
            "reading": "い",
            "meaning": "Military Officer"
        },
        "凛": {
            "level": 56,
            "reading": "りん",
            "meaning": "Cold"
        },
        "匠": {
            "level": 56,
            "reading": "しょう",
            "meaning": "Artisan"
        },
        "遥": {
            "level": 56,
            "reading": "よう",
            "meaning": "Far Off"
        },
        "智": {
            "level": 56,
            "reading": "ち",
            "meaning": "Wisdom"
        },
        "柴": {
            "level": 56,
            "reading": "さい",
            "meaning": "Brushwood"
        },
        "賊": {
            "level": 57,
            "reading": "ぞく",
            "meaning": "Robber"
        },
        "鼓": {
            "level": 57,
            "reading": "こ",
            "meaning": "Drum"
        },
        "旋": {
            "level": 57,
            "reading": "せん",
            "meaning": "Rotation"
        },
        "腸": {
            "level": 57,
            "reading": "ちょう",
            "meaning": "Intestines"
        },
        "槽": {
            "level": 57,
            "reading": "そう",
            "meaning": "Tank"
        },
        "伐": {
            "level": 57,
            "reading": "ばつ",
            "meaning": "Fell"
        },
        "漬": {
            "level": 57,
            "reading": "し",
            "meaning": "Pickle"
        },
        "坪": {
            "level": 57,
            "reading": "へい",
            "meaning": "Two Mat Area"
        },
        "紺": {
            "level": 57,
            "reading": "こん",
            "meaning": "Navy Blue"
        },
        "羅": {
            "level": 57,
            "reading": "ら",
            "meaning": "Spread Out"
        },
        "峡": {
            "level": 57,
            "reading": "きょう",
            "meaning": "Ravine"
        },
        "俸": {
            "level": 57,
            "reading": "ほう",
            "meaning": "Salary"
        },
        "醸": {
            "level": 57,
            "reading": "じょう",
            "meaning": "Brew"
        },
        "弔": {
            "level": 57,
            "reading": "ちょう",
            "meaning": "Condolence"
        },
        "乙": {
            "level": 57,
            "reading": "おつ",
            "meaning": "Latter"
        },
        "遍": {
            "level": 57,
            "reading": "へん",
            "meaning": "Universal"
        },
        "衡": {
            "level": 57,
            "reading": "こう",
            "meaning": "Equilibrium"
        },
        "款": {
            "level": 60,
            "reading": "かん",
            "meaning": "Article"
        },
        "閲": {
            "level": 57,
            "reading": "えつ",
            "meaning": "Inspection"
        },
        "喝": {
            "level": 57,
            "reading": "かつ",
            "meaning": "Scold"
        },
        "敢": {
            "level": 57,
            "reading": "かん",
            "meaning": "Daring"
        },
        "膜": {
            "level": 57,
            "reading": "まく",
            "meaning": "Membrane"
        },
        "盲": {
            "level": 57,
            "reading": "もう",
            "meaning": "Blind"
        },
        "胎": {
            "level": 57,
            "reading": "たい",
            "meaning": "Womb"
        },
        "酵": {
            "level": 57,
            "reading": "こう",
            "meaning": "Fermentation"
        },
        "堕": {
            "level": 57,
            "reading": "だ",
            "meaning": "Degenerate"
        },
        "遮": {
            "level": 57,
            "reading": "しゃ",
            "meaning": "Intercept"
        },
        "烏": {
            "level": 57,
            "reading": "うお",
            "meaning": "Crow"
        },
        "凸": {
            "level": 57,
            "reading": "とつ",
            "meaning": "Convex"
        },
        "凹": {
            "level": 57,
            "reading": "おう",
            "meaning": "Concave"
        },
        "楓": {
            "level": 57,
            "reading": "ふう",
            "meaning": "Maple"
        },
        "哉": {
            "level": 57,
            "reading": "さい",
            "meaning": "Question Mark"
        },
        "蒼": {
            "level": 57,
            "reading": "そう",
            "meaning": "Pale"
        },
        "瑠": {
            "level": 58,
            "reading": "る",
            "meaning": "Lapis Lazuli"
        },
        "萌": {
            "level": 57,
            "reading": "ほう",
            "meaning": "Sprout"
        },
        "硫": {
            "level": 58,
            "reading": "りゅう",
            "meaning": "Sulfur"
        },
        "赦": {
            "level": 58,
            "reading": "しゃ",
            "meaning": "Pardon"
        },
        "窃": {
            "level": 58,
            "reading": "せつ",
            "meaning": "Steal"
        },
        "慨": {
            "level": 58,
            "reading": "がい",
            "meaning": "Sigh"
        },
        "扶": {
            "level": 58,
            "reading": "ふ",
            "meaning": "Aid"
        },
        "戯": {
            "level": 58,
            "reading": "ぎ",
            "meaning": "Play"
        },
        "忌": {
            "level": 59,
            "reading": "き",
            "meaning": "Mourning"
        },
        "濁": {
            "level": 58,
            "reading": "だく",
            "meaning": "Muddy"
        },
        "奔": {
            "level": 58,
            "reading": "ほん",
            "meaning": "Run"
        },
        "肖": {
            "level": 58,
            "reading": "しょう",
            "meaning": "Resemblance"
        },
        "朽": {
            "level": 58,
            "reading": "きゅう",
            "meaning": "Rot"
        },
        "殻": {
            "level": 58,
            "reading": "かく",
            "meaning": "Husk"
        },
        "享": {
            "level": 58,
            "reading": "きょう",
            "meaning": "Receive"
        },
        "藩": {
            "level": 58,
            "reading": "はん",
            "meaning": "Fiefdom"
        },
        "媒": {
            "level": 58,
            "reading": "ばい",
            "meaning": "Mediator"
        },
        "鶏": {
            "level": 58,
            "reading": "けい",
            "meaning": "Chicken"
        },
        "嘱": {
            "level": 58,
            "reading": "しょく",
            "meaning": "Request"
        },
        "迭": {
            "level": 58,
            "reading": "てつ",
            "meaning": "Alternate"
        },
        "椎": {
            "level": 58,
            "reading": "つい",
            "meaning": "Spine"
        },
        "絹": {
            "level": 58,
            "reading": "けん",
            "meaning": "Silk"
        },
        "陪": {
            "level": 58,
            "reading": "ばい",
            "meaning": "Accompany"
        },
        "剖": {
            "level": 58,
            "reading": "ぼう",
            "meaning": "Divide"
        },
        "譜": {
            "level": 58,
            "reading": "ふ",
            "meaning": "Genealogy"
        },
        "淑": {
            "level": 58,
            "reading": "しゅく",
            "meaning": "Graceful"
        },
        "帆": {
            "level": 58,
            "reading": "はん",
            "meaning": "Sail"
        },
        "憤": {
            "level": 58,
            "reading": "ふん",
            "meaning": "Resent"
        },
        "酌": {
            "level": 58,
            "reading": "しゃく",
            "meaning": "Serve"
        },
        "暁": {
            "level": 58,
            "reading": "きょう",
            "meaning": "Dawn"
        },
        "傑": {
            "level": 58,
            "reading": "けつ",
            "meaning": "Greatness"
        },
        "錠": {
            "level": 58,
            "reading": "じょう",
            "meaning": "Lock"
        },
        "凌": {
            "level": 58,
            "reading": "りょう",
            "meaning": "Endure"
        },
        "瑞": {
            "level": 58,
            "reading": "すい",
            "meaning": "Congratulations"
        },
        "菅": {
            "level": 58,
            "reading": "かん",
            "meaning": "Sedge"
        },
        "漣": {
            "level": 60,
            "reading": "れん",
            "meaning": "Ripples"
        },
        "璃": {
            "level": 58,
            "reading": "り",
            "meaning": "Glassy"
        },
        "遷": {
            "level": 59,
            "reading": "せん",
            "meaning": "Transition"
        },
        "拙": {
            "level": 59,
            "reading": "せつ",
            "meaning": "Clumsy"
        },
        "峠": {
            "level": 59,
            "reading": "とうげ",
            "meaning": "Peak"
        },
        "篤": {
            "level": 59,
            "reading": "とく",
            "meaning": "Deliberate"
        },
        "叔": {
            "level": 59,
            "reading": "しゅく",
            "meaning": "Uncle"
        },
        "雌": {
            "level": 59,
            "reading": "し",
            "meaning": "Female"
        },
        "堪": {
            "level": 59,
            "reading": "かん",
            "meaning": "Endure"
        },
        "吟": {
            "level": 59,
            "reading": "ぎん",
            "meaning": "Recital"
        },
        "甚": {
            "level": 59,
            "reading": "じん",
            "meaning": "Very"
        },
        "崇": {
            "level": 59,
            "reading": "すう",
            "meaning": "Worship"
        },
        "漆": {
            "level": 59,
            "reading": "しつ",
            "meaning": "Lacquer"
        },
        "岬": {
            "level": 59,
            "reading": "こう",
            "meaning": "Cape"
        },
        "紡": {
            "level": 59,
            "reading": "ぼう",
            "meaning": "Spinning"
        },
        "礁": {
            "level": 59,
            "reading": "しょう",
            "meaning": "Reef"
        },
        "屯": {
            "level": 59,
            "reading": "とん",
            "meaning": "Barracks"
        },
        "姻": {
            "level": 59,
            "reading": "いん",
            "meaning": "Marry"
        },
        "擬": {
            "level": 59,
            "reading": "ぎ",
            "meaning": "Imitate"
        },
        "睦": {
            "level": 59,
            "reading": "ぼく",
            "meaning": "Friendly"
        },
        "閑": {
            "level": 59,
            "reading": "かん",
            "meaning": "Leisure"
        },
        "曹": {
            "level": 59,
            "reading": "そう",
            "meaning": "Official"
        },
        "詠": {
            "level": 59,
            "reading": "えい",
            "meaning": "Compose"
        },
        "卑": {
            "level": 59,
            "reading": "ひ",
            "meaning": "Lowly"
        },
        "侮": {
            "level": 59,
            "reading": "ぶ",
            "meaning": "Despise"
        },
        "鋳": {
            "level": 59,
            "reading": "ちゅう",
            "meaning": "Cast"
        },
        "蔑": {
            "level": 59,
            "reading": "べつ",
            "meaning": "Scorn"
        },
        "胆": {
            "level": 59,
            "reading": "たん",
            "meaning": "Guts"
        },
        "浪": {
            "level": 59,
            "reading": "ろう",
            "meaning": "Wander"
        },
        "禍": {
            "level": 59,
            "reading": "か",
            "meaning": "Evil"
        },
        "酪": {
            "level": 59,
            "reading": "らく",
            "meaning": "Dairy"
        },
        "憧": {
            "level": 59,
            "reading": "しょう",
            "meaning": "Long For"
        },
        "慶": {
            "level": 59,
            "reading": "けい",
            "meaning": "Congratulate"
        },
        "亜": {
            "level": 59,
            "reading": "あ",
            "meaning": "Asia"
        },
        "汰": {
            "level": 59,
            "reading": "た",
            "meaning": "Select"
        },
        "梓": {
            "level": 59,
            "reading": "し",
            "meaning": "Japanese Birch"
        },
        "沙": {
            "level": 59,
            "reading": "さ",
            "meaning": "Sand"
        },
        "逝": {
            "level": 60,
            "reading": "せい",
            "meaning": "Die"
        },
        "匿": {
            "level": 60,
            "reading": "とく",
            "meaning": "Hide"
        },
        "寡": {
            "level": 60,
            "reading": "か",
            "meaning": "Widow"
        },
        "痢": {
            "level": 60,
            "reading": "り",
            "meaning": "Diarrhea"
        },
        "坑": {
            "level": 60,
            "reading": "こう",
            "meaning": "Pit"
        },
        "藍": {
            "level": 60,
            "reading": "らん",
            "meaning": "Indigo"
        },
        "畔": {
            "level": 60,
            "reading": "はん",
            "meaning": "Shore"
        },
        "唄": {
            "level": 60,
            "reading": "ばい",
            "meaning": "Shamisen Song"
        },
        "拷": {
            "level": 60,
            "reading": "ごう",
            "meaning": "Torture"
        },
        "渓": {
            "level": 60,
            "reading": "けい",
            "meaning": "Valley"
        },
        "廉": {
            "level": 60,
            "reading": "れん",
            "meaning": "Bargain"
        },
        "謹": {
            "level": 60,
            "reading": "きん",
            "meaning": "Humble"
        },
        "湧": {
            "level": 60,
            "reading": "ゆう",
            "meaning": "Well"
        },
        "醜": {
            "level": 60,
            "reading": "しゅう",
            "meaning": "Ugly"
        },
        "升": {
            "level": 60,
            "reading": "しょう",
            "meaning": "Grid"
        },
        "殉": {
            "level": 60,
            "reading": "じゅん",
            "meaning": "Martyr"
        },
        "煩": {
            "level": 60,
            "reading": "はん",
            "meaning": "Annoy"
        },
        "劾": {
            "level": 60,
            "reading": "がい",
            "meaning": "Censure"
        },
        "桟": {
            "level": 60,
            "reading": "さん",
            "meaning": "Jetty"
        },
        "婿": {
            "level": 60,
            "reading": "せい",
            "meaning": "Groom"
        },
        "慕": {
            "level": 60,
            "reading": "ぼ",
            "meaning": "Yearn For"
        },
        "罷": {
            "level": 60,
            "reading": "ひ",
            "meaning": "Quit"
        },
        "矯": {
            "level": 60,
            "reading": "きょう",
            "meaning": "Correct"
        },
        "某": {
            "level": 60,
            "reading": "ぼう",
            "meaning": "Certain"
        },
        "囚": {
            "level": 39,
            "reading": "しゅう",
            "meaning": "Criminal"
        },
        "泌": {
            "level": 60,
            "reading": "ひ",
            "meaning": "Secrete"
        },
        "漸": {
            "level": 60,
            "reading": "ぜん",
            "meaning": "Gradually"
        },
        "藻": {
            "level": 60,
            "reading": "そう",
            "meaning": "Seaweed"
        },
        "妄": {
            "level": 60,
            "reading": "もう",
            "meaning": "Reckless"
        },
        "蛮": {
            "level": 60,
            "reading": "ばん",
            "meaning": "Barbarian"
        },
        "倹": {
            "level": 60,
            "reading": "けん",
            "meaning": "Thrifty"
        },
        "狐": {
            "level": 60,
            "reading": "こ",
            "meaning": "Fox"
        },
        "匂": {
            "level": 30,
            "reading": "にお",
            "meaning": "Scent"
        },
        "嬉": {
            "level": 40,
            "reading": "き",
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
            "reading": "こう",
            "meaning": "Throat"
        },
        "叩": {
            "level": 18,
            "reading": "こう",
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
            "reading": "てい",
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
            "reading": "み",
            "meaning": "Eyebrows"
        },
        "濡": {
            "level": 30,
            "reading": "ぬ",
            "meaning": "Wet"
        },
        "痩": {
            "level": 34,
            "reading": "そう",
            "meaning": "Thin"
        },
        "羨": {
            "level": 21,
            "reading": "せん",
            "meaning": "Envy"
        },
        "慌": {
            "level": 49,
            "reading": "こう",
            "meaning": "Confused"
        },
        "挨": {
            "level": 44,
            "reading": "あい",
            "meaning": "Push Open"
        },
        "拶": {
            "level": 44,
            "reading": "さつ",
            "meaning": "Draw Close"
        },
        "斤": {
            "level": 5,
            "reading": "きん",
            "meaning": "Axe"
        },
        "袖": {
            "level": 22,
            "reading": "しゅう",
            "meaning": "Sleeve"
        },
        "凄": {
            "level": 41,
            "reading": "せい",
            "meaning": "Amazing"
        },
        "妖": {
            "level": 40,
            "reading": "よう",
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
            "reading": "しゅう",
            "meaning": "Kick"
        },
        "喧": {
            "level": 41,
            "reading": "けん",
            "meaning": "Noisy"
        },
        "嘩": {
            "level": 41,
            "reading": "か",
            "meaning": "Rowdy"
        },
        "麺": {
            "level": 40,
            "reading": "めん",
            "meaning": "Noodles"
        },
        "苺": {
            "level": 14,
            "reading": "いちご",
            "meaning": "Strawberry"
        },
        "股": {
            "level": 33,
            "reading": "こ",
            "meaning": "Crotch"
        },
        "柵": {
            "level": 30,
            "reading": "さく",
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
            "reading": "ら",
            "meaning": "Abduct"
        },
        "苛": {
            "level": 18,
            "reading": "いじ",
            "meaning": "Frustration"
        },
        "煎": {
            "level": 47,
            "reading": "せん",
            "meaning": "Roast"
        },
        "戚": {
            "level": 35,
            "reading": "せき",
            "meaning": "Relatives"
        },
        "餅": {
            "level": 42,
            "reading": "へい",
            "meaning": "Mochi"
        },
        "屁": {
            "level": 33,
            "reading": "へ",
            "meaning": "Flatulence"
        },
        "璧": {
            "level": 38,
            "reading": "へき",
            "meaning": "Disc"
        },
        "痒": {
            "level": 23,
            "reading": "かゆ",
            "meaning": "Itchy"
        },
        "冥": {
            "level": 60,
            "reading": "めい",
            "meaning": "Underworld"
        },
        "莫": {
            "level": 25,
            "reading": "ばく",
            "meaning": "Endless"
        },
        "頁": {
            "level": 10,
            "reading": "ページ",
            "meaning": "Page"
        },
        "勿": {
            "level": 55,
            "reading": "もち",
            "meaning": "Must Not"
        }
    };
    return kanjiData;
}
