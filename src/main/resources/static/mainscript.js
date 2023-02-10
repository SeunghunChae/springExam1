var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

var clicked='';

window.onload = function(){
 	//console.log(location.href);
}

// 2023.01.06 채승훈 [로그인 버튼 기능]
function funcSubmit() {
	var id = document.getElementById('floatingInput').value;
	var idArr = id.split(/[@|.]/);
	var pw = document.getElementById('floatingPassword').value;

    // 2023.02.04 배영준 update [이메일 형식 validation check]
    // 2023.01.06 채승훈 [이메일 형식 validation check]
	if(id.includes('@')==false || idArr[idArr.length-1]!='com'
		   || (idArr[idArr.length-2]!='co' && idArr[idArr.length-1]!='kr' && idArr[idArr.length-1]!='com')
		   || idArr.length!=3){
    	alert('이메일 형식을 다시 확인해주세요.');
    	return false;
    }

    // 2023.02.01 배영준 [로그인 정보 데이터전송]
	$.ajax({
	    type: 'post',
	    url: '/api/login',
	    headers: {
	        "Content-Type": "application/json"
	    },
	    dataType: 'json',
	    data: JSON.stringify({ //json 데이터로 파싱
            "userId":id,
            "userPw":pw
        }),
        success: function(result) {
            console.log(result['userId']); // json 특정값 추출(카멜표기)

            if(result['resCode'] == '400'){ // 400 : 조회 에러
                alert('아이디와 비밀번호를 확인하세요');
            } else {
                // application.yml에 thymeleaf 클래스path: static/.html로 설정
                location.replace("/main"); // main 화면으로 이동
                //location.href("http://localhost:8080/main"); // main 화면으로 이동
            }
        },
        error: function(request, status, error) {
            console.log(error);
        }
	});
}