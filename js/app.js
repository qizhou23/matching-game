/*
 * 创建一个包含所有卡片的数组
 */
var cardslist = document.querySelectorAll(".card");
var cards = Array.prototype.slice.call(cardslist);
// 为了使用事件委托获取deck
var deck = document.querySelector(".deck");
// 创建一个包含现在正在被打开card的数组
var opened = " ";
// 创建一个值保存前一次操作的card
var lastEle = " ";
// 获取移动次数
var moves = document.querySelector(".moves");
// 创建一个数组控制计分板上的星星
var stars = document.querySelector(".stars").getElementsByTagName("li");
// 创建对象控制重新开局
var restart = document.querySelector(".restart");
restart.onclick = initialise;
// 获取计时器
var timeR = document.querySelector(".timeR");
var time;

/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */
window.onload = shuffle(cards);

// 初始化卡牌外表以及星星数以及计分板
function initialise(){
    // console.log("正常启动");
    // 初始化所有卡牌的外表
    for(var i=0;i<cards.length;i++){
        cards[i].className = "card";
    }
    // 初始化星星数
    for(var i=0;i<stars.length;i++){
        stars[i].className = "fa fa-star";
    }
    // console.log(stars.length);
    // 初始化移动数
    moves.innerHTML = "0";
    over = 0;
    // 初始化计时器
    timeR.innerHTML = "0";
    second = minute = 0;
}
 
// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
    initialise();
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        // Math.random将返回一个等于0小于1的随机数
        // 通过Math.random() * 可能值的总数（在这里等于数组的长度）来达到在范围里随机取数的目的
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    // 对cards这个数组进行了乱序排列
    // 1.清空数据
    // 2.重新导入新的乱序后的数组
    deck.innerHTML = "";
    for(var i=0;i<array.length;i++){
        deck.appendChild(array[i]);
    }
}





/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */

var over=0; //结束


//  事件委托
EventUtil.addHandler(deck,"click",function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    // console.log(typeof(moves.innerHTML));
    // 如果是初次点击，开始计时器
    if(moves.innerHTML == 0){
        time = window.setInterval(timeRecord,1000);
    }
    // 将行动数传给小星星函数
    star(moves.innerHTML);
    switch(target.className){
        case "card": {
            moves.innerHTML = Number(moves.innerHTML) + 1;
            target.className = "card open show";
            haveOpened(target);
            break;
        }
        default:{
            break;
        }
    }

});



 /*
  *当卡片呈现打开状态时
  *
  */
function haveOpened(ele){
    ele.className += " animated jello";
    var li=ele.getElementsByTagName("i")[0];
    if(opened == " "){
        opened = li.className;
        lastEle = ele;
    }else if(opened == li.className){
        // 匹配成功
        ele.className = "card match pulse animated";
        lastEle.className = "card match pulse animated";
        lastEle = ' ';
        over += 2;
        opened = " ";
    }else {
        // console.log("匹配失败");
        opened = " ";
        ele.className = "card fail";
        lastEle.className = "card fail";
        setTimeout(function(){
            ele.className = "card";
            lastEle.className = "card";},300);
    }
    //  如果over = 卡片长度 ,则游戏结束
    console.log(over);
    if(over == cards.length){
        var starsNum = 0;
        for(var i=0;i<stars.length;i++){
            if(stars[i].className == "fa fa-star") starsNum+=1;
        }
        console.log(starsNum);
        alert("你赢了！\n本次游戏你花费了"+timeR.innerHTML+",最终星级为" + starsNum + "颗星！");
        if(confirm("是否要再来一局？")){
            shuffle(cards);
        }else{
            return;
        }
    }
 } 


// 星星函数
function star(moveStr) {
    var move = Number(moveStr);
    // console.log(move);
    if(move <=30){
        return;
    }else if(move < 40){
        stars[2].className = " ";
    }else {
        stars[1].className = " ";
        stars[2].className = " ";
    }
}

// 计时器函数
var second = minute = 0;
// console.log(second,minute);
function timeRecord(){
    second += 1;
    if(second >= 60){
        minute += 1;
        second = 0;
    }
    timeR.innerHTML = minute + "分" + second + "秒";
}