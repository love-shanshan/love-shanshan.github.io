
window.onload = function () {

    //焦点图
    //获取事件源
    var all = document.getElementById("all");
    var screen = all.firstElementChild || all.firstChild;
    var imgWidth = screen.offsetWidth;
    var ul = screen.firstElementChild || screen.firstChild;
    var ol = screen.children[1];
    var div = screen.lastElementChild || screen.lastChild;
    var spanArr = div.children;
    //复制第一张图片，添加到ul中
    var ulNewLi = ul.children[0].cloneNode(true);
    ul.appendChild(ulNewLi);
    //给ol中添加li，个数为ul中li-1，点亮第一个按钮。
    for(var i = 0; i < ul.children.length - 1; i++) {
        var olNewLi = document.createElement("li");
        olNewLi.innerHTML = i + 1;
        ol.appendChild(olNewLi);
    }
    var olLiArr = ol.children;
    olLiArr[0].className = "current";
    //鼠标放到ol的li上切换图片
    for (var i = 0; i < olLiArr.length; i++) {
        //自定义属性，绑定索引值
        olLiArr[i].index = i;
        olLiArr[i].onmouseover = function () {
            //排他思想
            for (var j = 0; j < olLiArr.length; j++) {
                olLiArr[j].className = "";
            }
            this.className = "current";
            key = circle = this.index;
            //移动盒子
            animate(ul, -this.index*imgWidth);
        }
    }
    //添加定时器
    var timer = setInterval(autoPlay,2000);
    //固定向右切换图片
    var key = 0;
    var circle = 0;

    function autoPlay() {
        //key的自增模拟索引值，移动ul
        key++;
        if (key > olLiArr.length) {
            //图片已经到最后一张，再跳转到第一张
            ul.style.left = 0;
            key = 1;
        }
        animate(ul, -key * imgWidth);
        //square的自增模拟索引值，点亮盒子
        //排他思想
        circle++;
        if (circle > olLiArr.length - 1) {    //索引值不能大于等于5，如果等于5，立刻变为0
            circle = 0;
        }
        for (var i = 0; i < olLiArr.length; i++) {
            olLiArr[i].className = "";
        }
        olLiArr[circle].className = "current";
    }

    //鼠标放上去清除定时器，移开后开启定时器
    all.onmouseover = function () {
        div.style.display = "block";
        clearInterval(timer);
    }
    all.onmouseout = function () {
        div.style.display = "none";
        timer = setInterval(autoPlay, 2000);
    }
    //左右切换图片
    spanArr[0].onclick = function () {
        key--;
        if (key < 0) {
            ul.style.left = -imgWidth * (olLiArr.length) + "px";
            key = olLiArr.length - 1;
        }
        animate(ul, -key * imgWidth);
        circle--;
        if (circle < 0) {
            circle = olLiArr.length - 1;
        }
        for (var i = 0; i < olLiArr.length; i++) {
            olLiArr[i].className = "";
        }
        olLiArr[circle].className = "current";
    }
    spanArr[1].onclick = function () {
        //右侧的定时器一样
        autoPlay();
    }

    function animate(ele, target) {
        clearInterval(ele.timer);
        var speed = target > ele.offsetLeft ? 10 : -10;
        ele.timer = setInterval(function () {
            var val = target - ele.offsetLeft;
            ele.style.left = ele.offsetLeft + speed + "px";
            if (Math.abs(val) < Math.abs(speed)) {
                ele.style.left = target + "px";
                clearInterval(ele.timer);
            }
        }, 0)
    }

    //缓动回到顶部
    var img = document.getElementsByClassName("return")[0];
    window.onscroll = function () {
        //显示隐藏小火箭
        if(scroll().top > 50) {
            img.style.display = "block";
        }
        else {
            img.style.display = "none";
        }
        leader = scroll().top;
    }
    //页面跳至顶端
    var timers = null;
    var target = 0;  //目标位置
    var leader = 0;  //自身位置
    img.onclick = function () {
        clearInterval(timers);
        timers = setInterval(function () {
            var step = (target - leader) / 10;
            step = step > 0 ? Math.ceil(step):Math.floor(step);
            leader = leader + step;
            //显示移动区域
            window.scrollTo(0,leader);
            if(leader == 0){
                clearInterval(timers);
            }
        },20);
    }
}

//scroll封装
function scroll() {  // 开始封装自己的scrollTop
    if(window.pageYOffset != null) {  // ie9+ 高版本浏览器
        // 因为 window.pageYOffset 默认的是  0  所以这里需要判断
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }
    else if(document.compatMode === "CSS1Compat") {    // 标准浏览器   来判断有没有声明DTD
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }
    return {   // 未声明 DTD
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    }
}
