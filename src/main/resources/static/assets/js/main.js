var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

var clicked = '';
var MouseTemp = '';

//차트데이터
//var lable = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];

var value1_1 = [];
var value1_2 = [];
var value1_3 = [];
var value1_4 = [];
var value2_2 = [];
var value2_1 = [];
var value2_3 = [];
var value2_4 = [];

var Ldate = []


var data_arr = []

//실시간 글씨 변경 사용법
var count = 0;
var arr = ['채승훈', '최보경', '배영준', '이상민'];
var date = new Array(500);
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

function getDateStr(myDate){
  let month = myDate.getMonth() + 1
  let day = myDate.getDate()

  if (month < 10) month = '0' + month
  if (day < 10) day = '0' + day

  return (myDate.getFullYear() + '' + month + '' + day) // '2019.12.11'
}

// 다음날을 구하는 함수
function nextDay(today) {
  today = today.slice(0,4) + '.' + today.slice(4,6) + '.' + today.slice(6,) // ex) 2019.12.10
  let d = new Date(today) // 2019-12-10T00:00:00.000Z
  d.setDate(d.getDate() + 1)
  return getDateStr(d)
}

window.onload = function() {
    // 2023.02.05 배영준 [테마정보 세팅]
    $.ajax({
        type: 'get',
        url: '/api/theme',
        headers: {
            "Content-Type": "application/json"
        },
        dataType: 'json',
        async: false,
        error: function(error){
            if( error.responseJSON.resCode == 401 ) location.href = "http://localhost:8080/index.html";
        },
        success: function(result) {
            console.log(result);

            $.each(result.themeList, function(idx, val) {
                // 양수 음수 시각화
                var upDown;
                var num;
                if (val.netChange.substring(0, 1) == '+') {
                    upDown = "lightCoral";
                } else {
                    upDown = "SteelBlue";
                }

                // 테마정보 세팅
                num = idx + 1;
                document.getElementById(idx + 1 + "").innerHTML = val.temaName + '<span class="float-right"><i class="fa fa-shopping-cart"></i></span>';
                document.getElementById("upDown" + num).innerHTML = val.netChange;
                document.getElementById("upDown" + num).style.color = upDown;
                document.getElementById("upDown" + num).style.textShadow = "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,1px 1px 0 black";
                document.getElementById("upDown" + num).style.fontSize = "18px";
            });
        }
    });

    //클릭 이벤트
    //var clicked='';

    var target = document.getElementById("cardList");


    //마우스 오버 시각화
    for (var i = 0; i < (target.childNodes.length - 1) / 2; i++) {
        target.childNodes[i * 2 + 1].addEventListener("mouseenter", function(event) {
            MouseTemp = event.target.childNodes[1].className;
            event.target.childNodes[1].style.backgroundColor = '#00000050';
            event.target.childNodes[1].className += " animated pulse";
            //console.log(MouseTemp);
        });
    }
    for (var i = 0; i < (target.childNodes.length - 1) / 2; i++) {
        target.childNodes[i * 2 + 1].addEventListener("mouseleave", function(event) {
            event.target.childNodes[1].style.backgroundColor = 'transparent';
            event.target.childNodes[1].className = MouseTemp;
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
        if (evTarget.classList.contains("modal")) {
            modal.style.display = "none"
        }
    })




    for (var i = 0; i < (target.childNodes.length - 1) / 2; i++) {
        target.childNodes[i * 2 + 1].addEventListener("click", function(event) {
            clicked = event.target.getAttribute('value');
            var len = event.target.className.length;
            var temp = event.target.className; //class 명 원상 복귀용
            event.target.className += " animated shake";
            setTimeout(function(e) {
                event.target.className = temp; //class 명 원상 복귀
                var hide = document.getElementById("firstTab");
                var show = document.getElementById("content");
                show.style.display = '';
                hide.style.display = 'none';
            }, 1150)
        });
    }


    var stock_name;
    //inner 카드 클릭 이벤트 추가
    var innerCard = document.querySelector("#innerCard").childNodes[1];
    for (var i = 0; i < innerCard.childElementCount; i++) {
        k = (i + 1) * 2 - 1;
        var temp = innerCard.childNodes[k];
        temp.addEventListener("click", function(event) {
            console.log(event);
        })
        //자식도 싸그리 클릭이벤트를 넣는다
        for (var j = 0; j < temp.childNodes.length; j++) {
            temp.childNodes[j].addEventListener("click", function(event) {
                value1_1 = [];
                value1_2 = [];
                value1_3 = [];
                value1_4 = [];
                value2_1 = [];
                value2_2 = [];
                value2_3 = [];
                value2_4 = [];
                
                Ldate = []

                if (event.target.tagName == 'H5') {
                    stock_name = event.target.textContent;
                    //이름 찾았다. ajax로 가져옴
                    console.log(stock_name);

                    inputdata = {
                        "name": stock_name
                    }

                    //주가정보 가져오기 시작
                    $.ajax({
                        type: 'get',
                        url: '/api/dummy/',
                        data: inputdata,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        dataType: 'json',
                        async: false,
                        error: function(error){
                            if( error.responseJSON.resCode == 401 ) location.href = "http://localhost:8080/index.html";
                        },
                        success: function(result) {
                            console.log(result);
                            $.each(result.dummyList, function(idx, val) {
                                data_arr.push(val);
                            });
                            //전역변수에 push
                            console.log(data_arr);

                            //값을 찾는다
                            for (var i = 0; i < data_arr.length; i++) {
                                if (stock_name == data_arr[i]['name']) {
                                    console.log("값을 찾았다.");

                                    var list_price = data_arr[i]['price'].split('|')
                                    var list_date = data_arr[i]['time'].split('|')
                                    for (var j = 0; j < list_date.length; j++) {
                                        price=list_price[j].replace(',','');
                                        price.replace(',','');
                                        price.replace(',','');
                                        date=list_date[j].replace('.','-');
                                        date.replace('.','-');
                                        //까만거
                                        value1_1.push(price);
                                        value1_2.push(price);
                                        value1_3.push(price);
                                        value1_4.push(price);
                                        //하얀거
                                        value2_1.push(price);
                                        value2_2.push(price);
                                        value2_3.push(price);
                                        value2_4.push(price);

                                        Ldate.push(date);
                                        //리스트 완성
                                    } //for
                                } //if
                            } //for
                            //chart 1
                            var ctx = document.getElementById('chart1').getContext('2d');

                            var myChart = new Chart(ctx, {
                                type: 'line',
                                data: {
                                    labels: Ldate,
                                    datasets: [{
                                        label: stock_name + ' with 감성분석',
                                        data: value1_1,
                                        backgroundColor: '#fff',
                                        borderColor: "transparent",
                                        pointRadius: "0",
                                        borderWidth: 3
                                    }, {
                                        label: stock_name,
                                        data: value2_1,
                                        backgroundColor: "rgba(255, 255, 255, 0.25)",
                                        borderColor: "transparent",
                                        pointRadius: "0",
                                        borderWidth: 1
                                    }]
                                },
                                options: {
                                    maintainAspectRatio: false,
                                    legend: {
                                        display: false,
                                        labels: {
                                            fontColor: '#ddd',
                                            boxWidth: 40
                                        }
                                    },
                                    tooltips: {
                                        displayColors: false
                                    },
                                    scales: {
                                        xAxes: [{
                                            ticks: {
                                                beginAtZero: true,
                                                fontColor: '#ddd'
                                            },
                                            gridLines: {
                                                display: true,
                                                color: "rgba(221, 221, 221, 0.08)"
                                            },
                                        }],
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero: true,
                                                fontColor: '#ddd'
                                            },
                                            gridLines: {
                                                display: true,
                                                color: "rgba(221, 221, 221, 0.08)"
                                            },
                                        }]
                                    }
                                }
                            }); //json
                        } //success
                    }); //ajax
                } //if h5
            })
        }
    }




    //분석 버튼 이벤트 추가
    var btnPredict = document.querySelector("#btnPredict");
    btnPredict.addEventListener("click", function(event) {
        var ctx = document.getElementById('chart1').getContext('2d');
        Ldate.push('new');
        var last = Ldate.length - 2;
        var pushVal1 = Number(value1_1[last]) + Number(value1_1[last]) * (Math.random() - 0.5) / 5;
        var pushVal2 = Number(value2_1[last]) + Number(value2_1[last]) * (Math.random() - 0.5) / 5;
        value1_1.push(pushVal1.toString());
        value2_1.push(pushVal2.toString());

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Ldate,
                datasets: [{
                    label: 'stock with analysis',
                    data: value1_1, //[3, 3, 8, 5, 7, 4, 6, 4, 6, 3],
                    backgroundColor: '#fff',
                    borderColor: "transparent",
                    pointRadius: "0",
                    borderWidth: 3
                }, {
                    label: 'stock',
                    data: value2_1, //[7, 5, 14, 7, 12, 6, 10, 6, 11, 5],
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    borderColor: "transparent",
                    pointRadius: "0",
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: false,
                    labels: {
                        fontColor: '#ddd',
                        boxWidth: 40
                    }
                },
                tooltips: {
                    displayColors: false
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#ddd'
                        },
                        gridLines: {
                            display: true,
                            color: "rgba(221, 221, 221, 0.08)"
                        },
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#ddd'
                        },
                        gridLines: {
                            display: true,
                            color: "rgba(221, 221, 221, 0.08)"
                        },
                    }]
                }

            }
        });
    });
}


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

function getTopStock(themePk) {
    // 2023.02.05 배영준 [테마정보 세팅]
    console.log(themePk);
    $.ajax({
        type: 'get',
        url: '/api/stock/' + themePk,
        headers: {
            "Content-Type": "application/json"
        },
        dataType: 'json',
        async: false,
        error: function(error){
            if( error.responseJSON.resCode == 401 ) location.href = "http://localhost:8080/index.html";
        },
        success: function(result) {
            console.log(result);
            $.each(result.stockList, function(idx, val) {
                console.log(idx + " " + val.updownRate);
                // 양수 음수 시각화
                var upDown;
                var num = idx + 1;
                if (val.updownRate.substring(0, 1) == '+') {
                    upDown = "lightCoral";
                } else {
                    upDown = "SteelBlue";
                }

                // 테마정보 세팅
                document.getElementById("jm" + num + "").innerHTML = val.stockName + '<span class="float-right"><i class="fa fa-shopping-cart"></i></span>';
                document.getElementById("jmUpDown" + num).innerHTML = val.updownRate;
                document.getElementById("jmUpDown" + num).style.color = upDown;
                document.getElementById("jmUpDown" + num).style.textShadow = "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,1px 1px 0 black";
                document.getElementById("jmUpDown" + num).style.fontSize = "18px";
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
        dataType: 'json',
        async: false,
        error: function(error){
            if( error.responseJSON.resCode == 401 ) location.href = "http://localhost:8080/index.html";
        },
        success: function(result) {
            console.log("top4List");
            console.log(result);
            var list1 = [];
            var list2 = [];
            $.each(result.top4List, function(idx, val) {
                console.log(idx + " " + val.updownRate);
                // 양수 음수 시각화
                var upDown;
                var num = idx + 1;
                if (val.updownRate.substring(0, 1) == '+') {
                    upDown = "lightCoral";
                } else {
                    upDown = "SteelBlue";
                }
                // 테마정보 세팅
                document.getElementById("top4Jm" + num).innerHTML = '<i class="fa fa-circle text-white mr-2"></i>' + val.stockName;
                document.getElementById("top4JmDr" + num).innerHTML = val.price;
                document.getElementById("top4JmUpdown" + num).innerHTML = val.updownRate;
                document.getElementById("top4JmUpdown" + num).style.color = upDown;
                document.getElementById("top4JmUpdown" + num).style.textShadow = "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,1px 1px 0 black";
                document.getElementById("top4JmUpdown" + num).style.fontSize = "18px";

                console.log(document.getElementById('top4Jm' + num).innerText);
                console.log(document.getElementById('top4JmDr' + num).innerText);
                console.log(document.getElementById('top4JmUpdown' + num).innerText.substring(0, 5));

                list1[idx] = document.getElementById("top4Jm" + num).innerText;
                list2[idx] = document.getElementById("top4JmUpdown" + num).innerText.substring(0, 5);


            });

            // chart 2
            var ctx = document.getElementById("chart2").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: list1,
                    datasets: [{
                        backgroundColor: [
                            "#ffffff",
                            "rgba(255, 255, 255, 0.70)",
                            "rgba(255, 255, 255, 0.50)",
                            "rgba(255, 255, 255, 0.20)"
                        ],
                        data: list2,
                        borderWidth: [0, 0, 0, 0]
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    legend: {
                        position: "bottom",
                        display: false,
                        labels: {
                            fontColor: '#ddd',
                            boxWidth: 15
                        }
                    },
                    tooltips: {
                        displayColors: false
                    }
                }
            });
        }
    });

 /*
    //chart 1
    var ctx = document.getElementById('chart1').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
            datasets: [{
                label: 'New Visitor',
                data: ['2000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '2000'],
                backgroundColor: '#fff',
                borderColor: "transparent",
                pointRadius: "0",
                borderWidth: 3
            }, {
                label: 'Old Visitor',
                data: [7, 5, 14, 7, 12, 6, 10, 6, 11, 5],
                backgroundColor: "rgba(255, 255, 255, 0.25)",
                borderColor: "transparent",
                pointRadius: "0",
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false,
                labels: {
                    fontColor: '#ddd',
                    boxWidth: 40
                }
            },
            tooltips: {
                displayColors: false
            },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: '#ddd'
                    },
                    gridLines: {
                        display: true,
                        color: "rgba(221, 221, 221, 0.08)"
                    },
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: '#ddd'
                    },
                    gridLines: {
                        display: true,
                        color: "rgba(221, 221, 221, 0.08)"
                    },
                }]
            }

        }
    });
    */
}



function getChart(stockPk) {
    // 2023.02.05 배영준 [주식정보 세팅]
    //    console.log(document.getElementById("jm" + stockPk).innerText);
    //    $.ajax({
    //        type: 'get',
    //        url: '/api/dummy/',
    //        headers: {
    //            "Content-Type": "application/json"
    //        },
    //        dataType:'json',
    //        async:false,
    //        success: function(result) {
    //            console.log(result);
    //            for (var i = 0; i < arr.length; i++) {
    //                data[i] = new Array(2);
    //            }
    //            $.each(result.dummyList, function(idx, val) {
    //                 // 테마정보 세팅
    //                 document.getElementById("top4Jm" + num).innerHTML = '<i class="fa fa-circle text-white mr-2"></i>' + val.stockName;
    //                 document.getElementById("top4JmDr" + num).innerHTML = val.price;
    //                 document.getElementById("top4JmUpdown" + num).innerHTML = val.updownRate;
    //                 document.getElementById("top4JmUpdown" + num).style.color = upDown;
    //                 document.getElementById("top4JmUpdown" + num).style.textShadow = "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,1px 1px 0 black";
    //                 document.getElementById("top4JmUpdown" + num).style.fontSize = "18px";
    //
    //                 console.log(document.getElementById('top4Jm' + num).innerText);
    //                 console.log(document.getElementById('top4JmDr' + num).innerText);
    //                 console.log(document.getElementById('top4JmUpdown' + num).innerText.substring(0,5));
    //
    //                 list1[idx] = document.getElementById("top4Jm" + num).innerText;
    //                 list2[idx] = document.getElementById("top4JmUpdown" + num).innerText.substring(0,5);
    //            }
    //        }

    //        "use strict";
    //         //chart 1
    //         var ctx = document.getElementById('chart1').getContext('2d');
    //
    //         var myChart = new Chart(ctx, {
    //            type: 'line',
    //            data: {
    //                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    //                    datasets: [{
    //                        label: 'New Visitor',
    //                        data: [9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000],
    //                        backgroundColor: '#fff',
    //                        borderColor: "transparent",
    //                        pointRadius :"0",
    //                        borderWidth: 3
    //                    }, {
    //                        label: 'Old Visitor',
    //                        data: [7, 5, 14, 7, 12, 6, 10, 6, 11, 5],
    //                        backgroundColor: "rgba(255, 255, 255, 0.25)",
    //                        borderColor: "transparent",
    //                        pointRadius :"0",
    //                        borderWidth: 1
    //                    }]
    //                },
    //            options: {
    //                maintainAspectRatio: false,
    //                legend: {
    //                  display: false,
    //                  labels: {
    //                    fontColor: '#ddd',
    //                    boxWidth:40
    //                  }
    //                },
    //                tooltips: {
    //                  displayColors:false
    //                },
    //              scales: {
    //                  xAxes: [{
    //                    ticks: {
    //                        beginAtZero:true,
    //                        fontColor: '#ddd'
    //                    },
    //                    gridLines: {
    //                      display: true ,
    //                      color: "rgba(221, 221, 221, 0.08)"
    //                    },
    //                  }],
    //                   yAxes: [{
    //                    ticks: {
    //                        beginAtZero:true,
    //                        fontColor: '#ddd'
    //                    },
    //                    gridLines: {
    //                      display: true ,
    //                      color: "rgba(221, 221, 221, 0.08)"
    //                    },
    //                  }]
    //                 }
    //
    //             }
    //            });
    //    });
}