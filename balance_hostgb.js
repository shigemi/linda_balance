var io = new RocketIO().connect("http://linda.masuilab.org");
var linda = new Linda(io);
var ts = new linda.TupleSpace("room2");

io.on("connect", function(){
  alert(io.type+" connect");
});

google.load('visualization', '1.0', {'packages' : ['corechart']});
google.setOnLoadCallback(drawChart);
var iii_h = 0;
var x = 0 ;
var gob = 0;   //good or bad判定
//var k_h;  //tuple
var k_b = 0;  //人判定に用いる
var person = 0;

function drawChart() {
	var data = new google.visualization.DataTable();
	data.addColumn('number', 'x');
    data.addColumn('number', 'good or bad?');
	data.addColumn({type : 'string', role : 'annotation'});
	data.addColumn({type : 'string', role : 'annotationText'});
    data.addColumn('number', '');
    var options = 
    {
        title : 'good or bad',
        curveType : 'function',
        seriesType : 'line',
        pointSize : 0,
        width : 1000,
        height : 400,
        series : 
        {
            1 :
            {
                pointSize : 5
            }
        }
    };
	
    var chart = new google.visualization.LineChart($('#chart_div')[0]);
	
    data.addRow([x, 0, null, null, null]);
    chart.draw(data, options);
	
   
    ts.watch(["pitch"], function(tuple){ 
 var xx_h = iii_h; 
		  var k_h = tuple[1];
		  
		//good or bad 判定***
		  if(k_h > 15 || k_h < -15){
			  gob--;
			  document.getElementById("log").innerHTML=("がんばれ!" ); 
			  if(gob < -100){
			      gob = -100;
			  }
		  }else if ((k_h <= 15 && k_h > 2)  || (k_h >= -15 && k_h  < -2)){
			  gob++;
			  document.getElementById("log").innerHTML=("もうちょい!"); 
			  if(gob > 100){
			      gob = 100;
			  }  
		  }else{
			  gob++;
			  document.getElementById("log").innerHTML=("いいね!"); 
			  if(gob > 100){
			      gob = 100;
			  } 
		  }
		//*****
		console.log([xx_h , gob , iii_h , null, null]);
        data.addRow([xx_h, gob, null, null, null]);
        chart.draw(data, options);
        iii_h ++; 
      });
		  //人いるいない判定
	 /* if(k_h === k_b){
          person++;
       }else{
	      person = 0;
	   }
	   if(person == 10){
	      gob = 0;
		  document.getElementById("log").innerHTML=("u finished?");  //u finished?
	   }
	   k_b = k_h ;
	   */
}
