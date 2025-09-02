    // 背景缓动动画
    var logo = document.getElementById("logo");
    var word = document.getElementById("word");
    // var timer = null;
    var targetl = -700;
    var targetw = -7000;
        timer = setInterval(function () {
            logo.style.top = logo.offsetTop + (targetl - logo.offsetTop) / 10 + "px";
            word.style.bottom = logo.offsetTop + (targetw - word.offsetTop) / 10 + "px";
        }, 60)


    //底部圈圈
    var number = document.getElementById("number");
    var numArr = number.children;
    for(var i=0;i<numArr.length;i++) {
        numArr[i].onmouseover = function () {
            for (var j = 0; j < numArr.length; j++) {
                numArr[j].className = "";
            }
            this.className = "circle";
            if(this === numArr[2]) {
                numArr[2].className = "";
                numArr[0].className = "circle";
            }
        }
        numArr[i].onmouseout = function () {
            this.className = "";
            numArr[0].className = "circle";
        }
    }

    // 隐藏显示二维码
    var smallArr = document.getElementsByClassName("small");
    var erf = document.getElementById("erf");
    var ers = document.getElementById("ers");
    smallArr[0].onmouseover = function () {
        erf.className = "erweima show";
    }
    smallArr[0].onmouseout = function () {
        erf.className = "erweima hide";
    }