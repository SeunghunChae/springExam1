


window.onload = function(){

    var settings = {
        "url": "http://localhost:8080/api/theme/top4/all",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json",
        },
       
      };


      $.ajax(settings).done(function (data) {
        console.log(data);

        $("table_1_name").text("dddd");

        for(var i = 0; i < 6; i++){
            var temp = data;
            var table = '#table_'+(i+1);
            //console.log(table);
            //console.log(table + '_name');
            var nameTemp = '.table_'+(i+1)+'_name';
            console.log(nameTemp);
            //$(nameTemp).text = "ddddd";

            //등락률에 따른 데이터 색상 변경로직
            var SelectRows = "TableBody" + (i+1);
            var rows = document.getElementById(eval("'"+SelectRows+"'")).getElementsByTagName("tr");    

            
            for(var j =0; j<4; j++){        
                var table_data="";
                table_data+="<tr>";    
                table_data+="<td>"+(j+1)+"</td>"
                table_data+="<td>"+temp.themeList[i].top4List[j].stockName+"</td>"
                table_data+="<td>"+temp.themeList[i].top4List[j].stockCode+"</td>"
                if(temp.themeList[i].top4List[j].stockUpAndDown >0){
                    table_data+="<td>"+temp.themeList[i].top4List[j].stockUpAndDown+"&#9650;"+"</td>"
                }
                else if(temp.themeList[i].top4List[j].stockUpAndDown == 0){
                    table_data+="<td>"+temp.themeList[i].top4List[j].stockUpAndDown+"&#9644;"+"</td>"
                }
                else if(temp.themeList[i].top4List[j].stockUpAndDown < 0){
                    table_data+="<td>"+temp.themeList[i].top4List[j].stockUpAndDown+"&#9660;"+"</td>"
                }        
                table_data+="<td>"+temp.themeList[i].top4List[j].stockPrice+"</td>"
                table_data+="</tr>";
                           
                $(table).append(table_data); 
                //console.log(table_data);
            }

            for(var j = 0; j < rows.length; j++){
                var cells = rows[j].getElementsByTagName("td"); 
                var UpsDowns = cells[3].firstChild.data;
                console.log(UpsDowns);

                if(UpsDowns > 0){
                    cells[3].style.color="red";
                    cells[4].style.color="red";   
                    
                }
                else if(UpsDowns == 0){
                    cells[3].style.color="black";
                    cells[4].style.color="black";
                }
                else if(UpsDowns < 0){
                    cells[3].style.color="blue";
                    cells[4].style.color="blue";
                }
            
            }
            
            console.log(temp);
            
       
        }
      });












}

