var io = new RocketIO().connect("http://linda.masuilab.org");
var linda = new Linda(io);
var ts = new linda.TupleSpace("room2");

io.on("connect", function(){
  alert(io.type+" connect");
});

google.load('visualization', '1.0', {'packages' : ['corechart']});
google.setOnLoadCallback(drawChart);
var iii = 0;
var x = 0 ;

function drawChart() {
	var data = new google.visualization.DataTable();
	data.addColumn('number', 'x');
    data.addColumn('number', 'pitch');
	data.addColumn({type : 'string', role : 'annotation'});
	data.addColumn({type : 'string', role : 'annotationText'});
    data.addColumn('number', 'dot');
    var options = 
    {
        title : '傾き',
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
	
   
	var xx = iii;
    ts.watch(["pitch"], function(tuple){  
		 var k = tuple[1];
	     console.log([xx , k , iii , null, null]);
	     data.addRow([iii, k, null, null, null]);
         chart.draw(data, options);
	     iii++;
    });      
}
