


window.onload = function(){

    // $.ajax({
    //     url: 'localhost:8080/api/theme/top4/all',
    //     type: 'GET',
    //     data: {},
    //     success: function(result) {
    //         console.log(result);
    //     }
    // })

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

        for(var i = 0; i < 6; i++){
            var temp = data;
            var table = '#table_'+(i+1);
            //console.log(table);
            //console.log(table + '_name');
            var nameTemp = '.table_'+(i+1)+'_name';
            console.log(nameTemp);

            //$(nameTemp).text = "ddddd";

            $("table_1_name").text("dddd");

            for(var j =0; j<3; j++){        
                var table_data="";
                table_data+="<tr>";    
                table_data+="<td>"+(j+1)+"</td>"
                table_data+="<td>"+temp.themeList[i].top4List[j].stockName+"</td>"
                table_data+="<td>"+temp.themeList[i].top4List[j].stockCode+"</td>"
                table_data+="<td>"+temp.themeList[i].top4List[j].stockUpAndDown+"</td>"
                table_data+="<td>"+temp.themeList[i].top4List[j].stockPrice+"</td>"
                table_data+="</tr>";
                           
                console.log(table);
                $(table).append(table_data); 
            }
            
            //console.log(temp);
            
       
        }
      });


    for(var j = 0; j < 6; j++){

        var SelectRows = "TableBody" + (j+1);
        //console.log(SelectRows);
        var rows = document.getElementById(eval("'"+SelectRows+"'")).getElementsByTagName("tr");

        for(var i = 0; i < rows.length; i++){
            var cells = rows[i].getElementsByTagName("td"); 
            var UpsDowns = cells[2].firstChild.data;
            if(UpsDowns > 0){
                cells[2].style.color="red";
                cells[3].style.color="red";     
            }
            else if(UpsDowns == 0){
                cells[2].style.color="black";
                cells[3].style.color="black";
            }
            else if(UpsDowns < 0){
                cells[2].style.color="blue";
                cells[3].style.color="blue";
            }
        
        }
    }











}


var script = document.createElement('script');
 script.src = 'https://code.jquery.com/jquery-3.6.3.min.js';