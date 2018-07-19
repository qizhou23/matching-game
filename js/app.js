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

/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */
window.onload = shuffle(cards);

// 初始化卡牌外表以及星星数以及计分板
function initialise(){
    console.log("正常启动");
    // 初始化所有卡牌的外表
    for(var i=0;i<cards.length;i++){
        cards[i].className = "card";
    }
    // 初始化星星数
    stars[0].className = "fa fa-star";
    stars[1].className = "fa fa-star";
    stars[2].className = "fa fa-star";
    // 初始化移动数
    moves.innerHTML = "0";
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

    return array;
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

//  事件委托
EventUtil.addHandler(deck,"click",function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    console.log(typeof(moves.innerHTML));
    moves.innerHTML = Number(moves.innerHTML) + 1;
    // 将行动数传给小星星函数
    star(moves.innerHTML);
    switch(target.className){
        case "card": {
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
    var li=ele.getElementsByTagName("i");
    console.log(typeof(li)); //object
    console.log(li.className);//undefined?
    if(opened == " "){
        opened += li.className;
        lastEle = ele;
    }else if(opened == li.className){
        // 匹配成功
        console.log("匹配上了");
        // 将卡面转换为匹配成功的样式
        setTimeout(function(){
            ele.className = "card match";
            lastEle.className = "card match";},400);
        lastEle = ' ';
    }else {
        console.log("匹配失败");
        // console.log(opened + li.className);
        opened = " ";
        ele.className = "card fail";
        lastEle.className = "card fail";
        setTimeout(function(){
            ele.className = "card";
            lastEle.className = "card";},300);
    }
    console.log(opened);   
 } 


// 星星函数
function star(moveStr) {
    var move = Number(moveStr);
    console.log(move);
    if(move <=20){
        return;
    }else if(move < 30){
        stars[2].className = " ";
    }else {
        stars[1].className = " ";
        stars[2].className = " ";
    }
}

