var input1 = document.getElementById("input1");

function go(url) {
    window.open(url, "_blank");
}

document.getElementById("btn1").addEventListener("click", function() {
    go("https://www.google.com/search?q=dolar%2FTL");
});

document.getElementById("btn2").addEventListener("click", function() {
    go("https://www.google.com/search?q=euro%2FTL");
});  

document.getElementById("btn3").addEventListener("click", function() {
    go("https://www.google.com/search?q=sterlin%2FTL");
});

document.getElementById("btn4").addEventListener("click", function() {
    go("https://covid19.saglik.gov.tr/");
});

document.getElementById("btn5").addEventListener("click", function() {
    go("http://timer.onlinealarmkur.com/" + "#" + document.getElementById("input1").value);
});

input1.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("btn5").click();
    }
});

input1.addEventListener("click", function() {
    document.getElementById("numpad").style.display = "block";
    document.getElementById("numpad").scrollIntoView();
});

var newinputvalue;
function numpadAdd(num) {
    newinputvalue = parseInt(document.getElementById("input1").value + num);
    input1.value = newinputvalue;
}

document.getElementById("num1").addEventListener("click", function() {
    numpadAdd(1);
});
document.getElementById("num2").addEventListener("click", function() {
    numpadAdd(2);
});
document.getElementById("num3").addEventListener("click", function() {
    numpadAdd(3);
});
document.getElementById("num4").addEventListener("click", function() {
    numpadAdd(4);
});
document.getElementById("num5").addEventListener("click", function() {
    numpadAdd(5);
});
document.getElementById("num6").addEventListener("click", function() {
    numpadAdd(6);
});
document.getElementById("num7").addEventListener("click", function() {
    numpadAdd(7);
});
document.getElementById("num8").addEventListener("click", function() {
    numpadAdd(8);
});
document.getElementById("num9").addEventListener("click", function() {
    numpadAdd(9);
});
document.getElementById("num0").addEventListener("click", function() {
    numpadAdd(0);
});
document.getElementById("numback").addEventListener("click", function() {
    input1.value = parseInt(input1.value.toString().slice(0, -1));
});
document.getElementById("numclose").addEventListener("click", function() {
    input1.value = null;
    document.getElementById("numpad").style.display = "none";
});
document.getElementById("numstart").addEventListener("click", function() {
    document.getElementById("btn5").click();
});
