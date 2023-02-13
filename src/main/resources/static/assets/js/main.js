var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

var clicked='';
var MouseTemp = '';

//차트데이터
var lable=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
var value1=[3, 3, 8, 5, 7, 4, 6, 4, 6, 3];
var value2=[7, 5, 14, 7, 12, 6, 10, 6, 11, 5];


//실시간 글씨 변경 사용법
var count=0;
var arr=['채승훈','최보경','배영준','이상민'];

// TODO TEST 위한 주석
//setInterval(function(){
//    var temp=document.getElementById("temp");
//    temp.textContent=arr[count%4];
//    count++;
//}, 1000);

/*
setInterval(function(){
    var temp=document.getElementById("battery");
    temp.textContent=arr[count%4];
    count++;
}, 200);

setInterval(function(){
    var temp=document.getElementById("fass");
    temp.textContent=arr[count%4];
    count++;
}, 500);
*/

// TODO TEST 위한 주석
//function wait(sec) {
//
//    let start = Date.now(), now = start;
//
//    while (now - start < sec * 1000) {
//
//        now = Date.now();
//
//    }
//
//}

window.onload = function(){
    // 2023.02.05 배영준 [테마정보 세팅]
    $.ajax({
        type: 'get',
        url: '/api/theme',
        headers: {
            "Content-Type": "application/json"
        },
        dataType:'json',
        success: function(result) {
            console.log(result);

            $.each(result.themeList, function(idx, val) {
                // 양수 음수 시각화
                var upDown;
                var num;
                if(val.netChange.substring(0,1) == '+'){
                    upDown = "red";
                } else {
                    upDown = "blue";
                }

                // 테마정보 세팅
                num = idx+1;
                document.getElementById(idx+1 + "").innerHTML = val.temaName + '<span class="float-right"><i class="fa fa-shopping-cart"></i></span>';
                document.getElementById("upDown" + num).innerHTML = val.netChange;
                document.getElementById("upDown" + num).style.color = upDown;
            });
        }
    });

    //클릭 이벤트
    //var clicked='';

    var target=document.getElementById("cardList");

        
    //마우스 오버 시각화
    for(var i =0;i<(target.childNodes.length-1)/2;i++){
         target.childNodes[i*2+1].addEventListener("mouseenter",function(event){
            MouseTemp = event.target.childNodes[1].className;
            event.target.childNodes[1].style.backgroundColor = '#00000050';
            event.target.childNodes[1].className+=" animated pulse";
            //console.log(MouseTemp);
        });
    }
    for(var i =0;i<(target.childNodes.length-1)/2;i++){
            target.childNodes[i*2+1].addEventListener("mouseleave",function(event){
            event.target.childNodes[1].style.backgroundColor = 'transparent';
            event.target.childNodes[1].className=MouseTemp;
            //console.log(MouseTemp);
       });
   }


   const body = document.querySelector('body');
   const modal = document.getElementById("modal");
   const modalbody = document.getElementById("modal_body");
   const btnModal = document.getElementById("btn-modal");

   modal.style.display = "flex";
   
   modal.addEventListener("click", e => {
       const evTarget = e.target
       if(evTarget.classList.contains("modal")) {
           modal.style.display = "none"
       }
   })





    for(var i =0;i<(target.childNodes.length-1)/2;i++){
        target.childNodes[i*2+1].addEventListener("click",function(event){
            clicked=event.target.getAttribute('value');
            var len=event.target.className.length;
            var temp=event.target.className; //class 명 원상 복귀용
            event.target.className+=" animated shake";
            setTimeout(function(e){
                event.target.className=temp; //class 명 원상 복귀
                var hide=document.getElementById("firstTab");
                var show=document.getElementById("content");
                show.style.display='';
                hide.style.display='none';
            },1150)
        });
    }


    //분석 버튼 이벤트 추가
    var btnPredict=document.querySelector("#btnPredict");
    btnPredict.addEventListener("click",function(event){
        var ctx = document.getElementById('chart1').getContext('2d');
        lable.push('new');
        var last=lable.length-2;
        var pushVal1=value1[last]+value1[last]*(Math.random()-0.5)/15;
        var pushVal2=value2[last]+value2[last]*(Math.random()-0.5)/15;
        value1.push(pushVal1);
        value2.push(pushVal2);

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: lable, //["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
                datasets: [{
                    label: 'New Visitor',
                    data: value1, //[3, 3, 8, 5, 7, 4, 6, 4, 6, 3],
                    backgroundColor: '#fff',
                    borderColor: "transparent",
                    pointRadius :"0",
                    borderWidth: 3
                }, {
                    label: 'Old Visitor',
                    data: value2, //[7, 5, 14, 7, 12, 6, 10, 6, 11, 5],
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    borderColor: "transparent",
                    pointRadius :"0",
                    borderWidth: 1
                }]
            },
        options: {
            maintainAspectRatio: false,
            legend: {
              display: false,
              labels: {
                fontColor: '#ddd',
                boxWidth:40
              }
            },
            tooltips: {
              displayColors:false
            },
          scales: {
              xAxes: [{
                ticks: {
                    beginAtZero:true,
                    fontColor: '#ddd'
                },
                gridLines: {
                  display: true ,
                  color: "rgba(221, 221, 221, 0.08)"
                },
              }],
               yAxes: [{
                ticks: {
                    beginAtZero:true,
                    fontColor: '#ddd'
                },
                gridLines: {
                  display: true ,
                  color: "rgba(221, 221, 221, 0.08)"
                },
              }]
             }

         }
        });
    });

}

var themePkey = 0;

/*
//동적으로 글씨 바꾸기
var count=0;

function setTemp() {
    var list=['채승훈','최보경','배영준','이상민'];

    target.textContent=list[count%4];
    count++;
}
setInterval(setTemp, 1000);



//table 동적으로 추가하기

//tbody
var target=document.getElementById("ibTable").childNodes[3];
const newRow=target.insertRow();
const newCell0 = newRow.insertCell();
const newCell1 = newRow.insertCell();
const newCell2 = newRow.insertCell();
const newCell3 = newRow.insertCell();
const newCell4 = newRow.insertCell();
const newCell5 = newRow.insertCell();

const newText0 = document.createTextNode('채승훈');
newCell0.appendChild(newText0);

const newText2 = document.createTextNode('#12345');
newCell2.appendChild(newText2);
const newText3 = document.createTextNode('$134.0');
newCell3.appendChild(newText3);
const newText4 = document.createTextNode('03 Aug 2017');
newCell4.appendChild(newText4);

//append img
var img = document.createElement("img");
img.src="https://via.placeholder.com/110x110";
img.className='product-img';
img.setAttribute('alt','product img');
newCell1.appendChild(img);

//append progress bar
var newdiv1=document.createElement('div');
newdiv1.className="progress shadow";
newdiv1.style.cssText="height: 3px;";
//write progress bar
var newdiv2=document.createElement('div');
newdiv2.className="progress-bar";
newdiv2.setAttribute('role','progressbar');
newdiv2.style.cssText="width: 90%";
newdiv1.appendChild(newdiv2);
newCell5.appendChild(newdiv1);
*/

function getTopStock(themePk){
    // 2023.02.05 배영준 [테마정보 세팅]
    console.log(themePk);
    $.ajax({
        type: 'get',
        url: '/api/stock/' + themePk,
        headers: {
            "Content-Type": "application/json"
        },
        dataType:'json',
        success: function(result) {
        console.log(result);
            $.each(result.stockList, function(idx, val) {
                console.log(idx + " " + val.updownRate);
                // 양수 음수 시각화
                var upDown;
                var num = idx + 1;
                if(val.updownRate.substring(0,1) == '+'){
                    upDown = "red";
                } else {
                    upDown = "blue";
                }

                // 테마정보 세팅
                document.getElementById("jm" + num + "").innerHTML = val.stockName + '<span class="float-right"><i class="fa fa-shopping-cart"></i></span>';
                document.getElementById("jmUpDown" + num).innerHTML = val.updownRate;
                document.getElementById("jmUpDown" + num).style.color = upDown;
            });
        }
    });

    // 테마별 수익률 TOP4 종목
    $.ajax({
        type: 'get',
        url: '/api/theme/top4/' + themePk,
        headers: {
            "Content-Type": "application/json"
        },
        dataType:'json',
        success: function(result) {
        console.log("top4List");
        console.log(result);
            $.each(result.top4List, function(idx, val) {
                console.log(idx + " " + val.updownRate);
                // 양수 음수 시각화
                var upDown;
                var num = idx + 1;
                if(val.updownRate.substring(0,1) == '+'){
                    upDown = "red";
                } else {
                    upDown = "blue";
                }

                // 테마정보 세팅
                document.getElementById("top4Jm1" + num + "").innerHTML = '<i class="fa fa-circle text-white mr-2"></i>' + val.stockName;
                document.getElementById("top4JmDr1" + num).innerHTML = val.updownRate;
                document.getElementById("top4JmUpdown1" + num).style.color = upDown;
            });
        }
    });
}
