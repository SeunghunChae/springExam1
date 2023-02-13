
var data_all;


window.onload = function(){

    var settings = {
        "url": "api/theme/top4/all",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json",
        },
       
      };


      $.ajax(settings).done(function (data) {
        console.log(data);

        data_all = data;
        

        for(var i = 0; i < 6; i++){
            var temp = data;
            var table = '#table_'+(i+1);
            //console.log(table);
            //console.log(table + '_name');
            var nameTemp = 'table_'+(i+1)+'_name';
            //console.log(nameTemp);
            //$(nameTemp).text = "ddddd";

            
            console.log(temp.themeList[i].top4List.length);
    
            for(var j =0; j<temp.themeList[i].top4List.length; j++){ 

                

                document.getElementById(nameTemp).innerHTML = temp.themeList[i].top4List[j].temaName;

                var table_data="";
                table_data+="<tr>";    
                table_data+="<td>"+(j+1)+"</td>";
                table_data+="<td>"+temp.themeList[i].top4List[j].stockName+"</td>";
                table_data+="<td>"+temp.themeList[i].top4List[j].updownRate+"</td>";
                table_data+="<td>"+temp.themeList[i].top4List[j].price+"</td>";
                table_data+="<td>"+temp.themeList[i].top4List[j].volume+"</td>";
                table_data+="</tr>";
                               
                $(table).append(table_data); 
                //console.log(table_data);


                }


    

  
                //등락률에 따른 데이터 색상 변경로직
                var SelectRows = "TableBody" + (i+1);
                var rows = document.getElementById(eval("'"+SelectRows+"'")).getElementsByTagName("tr");  

            for(var j = 0; j < rows.length; j++){
                var cells = rows[j].getElementsByTagName("td"); 
                var UpsDowns = cells[2].firstChild.data.substr(0,4);
                

                if(UpsDowns > 0){
                    cells[2].style.color="lightCoral";
                    cells[3].style.color="lightCoral";
                    cells[2].style.textShadow="-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,1px 1px 0 black";
                    cells[3].style.textShadow="-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,1px 1px 0 black";
                    
                }
                else if(UpsDowns == 0){
                    cells[2].style.color="white";
                    cells[3].style.color="white";
                }
                else if(UpsDowns < 0){
                    cells[2].style.color="SteelBlue";
                    cells[3].style.color="SteelBlue";
                    cells[2].style.textShadow="-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,1px 1px 0 black";
                    cells[3].style.textShadow="-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,1px 1px 0 black";
                }
            
            }

            
       
        }


      });



}

function ModalInfo(id){


}