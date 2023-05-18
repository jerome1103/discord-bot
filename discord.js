//discord.js Version 12.5.3
const Discord = require('discord.js');
const { token } = require('./token.json');
const client = new Discord.Client();
const moment = require ('moment');
const tz = require('moment-timezone');
// 使用moment.js取得台灣時區
let SystemTime = moment(new Date()).tz("Asia/Taipei");
let day = SystemTime.format("MM/DD");
let today = SystemTime.weekday();

// 定期更新系統時間
var clock = setInterval(printWord , 3000);
function printWord(){
  SystemTime = moment(new Date()).tz("Asia/Taipei");
  day = SystemTime.format("MM/DD");
  today = SystemTime.weekday();
}

let data = {
         time:["００：１５","０２：００","１１：００","１５：００","１９：００","２３：３０"],
         0:["無","卡嵐達/羅裴勒","克價卡/羅裴勒","貝爾","庫屯/卡嵐達","奧平"],
         1:["肯恩特/木拉卡","庫屯/克價卡","卡嵐達","庫屯/克價卡","卡莫斯","庫屯/克價卡"],
         2:["無","羅裴勒","庫屯/克價卡","卡嵐達/羅裴勒","貝爾","克價卡/羅裴勒"],
         3:["無","卡嵐達","克價卡/羅裴勒","卡莫斯","庫屯/克價卡","卡嵐達/羅裴勒"],
         4:["無","庫屯","庫屯/卡嵐達","克價卡/羅裴勒","羅裴勒","庫屯/卡嵐達"],
         5:["無","克價卡/羅裴勒","奧平/庫屯","卡嵐達/羅裴勒","庫屯/克價卡","肯恩特/木拉卡"],
         6:["卡莫斯","庫屯/克價卡","庫屯/卡嵐達","奧平","克價卡/羅裴勒","無"],
         userSay:
            [
                {key:"測試",value:"機器人回應"},
            ]
        }

// Bot開啟的事件
client.on('ready', () => {
    console.log(`開啟機器人伺服器,機器人名稱: ${client.user.tag}!`);
});

// 當 Bot 接收到訊息時的事件
client.on('message', msg => {
    if (msg.content === '世界王') {
        msg.reply(showTodayBoss());
    }
    //聊天室回應
    parseMsg(msg,data.userSay);
});

// 回傳今天星期幾
function showDay(){
    let arrayDay = ["日","一","二","三","四","五","六"];
    return "\n" + day + "，星期" + arrayDay[today] + "\n";
}

// 透過今天日期回傳對應BOSS清單
function showTodayBoss(){
    let longString = "";
    data.time.forEach((item, index) =>{
        longString = longString + item + "  " + data[today][index] + "\n";
    });
    return "\n" +"世界王清單" + showDay() + longString;
}

//parseMsg(訊息,指定的data-Object)
function parseMsg(msg,data){
    data.forEach((item) =>{
        if (msg.content === item.key) {
            msg.channel.send(item.value);
            return;
        }
    });
}

client.login(token);