var clicked='';



//실시간 글씨 변경 사용법
var count=0;
var arr=['채승훈','최보경','배영준','이상민'];

setInterval(function(){
    var temp=document.getElementById("temp");
        temp.textContent=arr[count%4];
        count++;
    }, 1000);


window.onload = function(){
 	console.log(location.href);

    //클릭 이벤트
    //var clicked='';

    var target=document.getElementById("cardList");
    //target.childNodes[1].childNodes[1].childNodes[1].textContent;

    for(var i =0;i<(target.childNodes.length-1)/2;i++){
        target.childNodes[i*2+1].addEventListener("click",function(event){
            clicked=event.target.getAttribute('value');
            var hide=document.getElementById("firstTab");
            var show=document.getElementById("content");
            show.style.display='';
            hide.style.display='none';
        });
    }
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
