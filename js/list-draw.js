$(function(){
   var tables = '<table class="table" id="table-list">'+
    '<thead style="background: rgb(255,255,255);"><tr>'+
    '<th>Kpi名称</th>'+
    '<th>图形</th>'+
    '<th>数据</th>'+
    '</tr></thead>';
   $(".list-content").append(tables);
   var str=null;
   var str1=null;
   function cli(){
		$("#list-draw").click(function(){
			$.ajax({
				 url:"/plot/getPlotByModuleId.do",
				 type:"post",
				 data:{ moduleId:10,},
				 dataType:"json",
				 success:function(data){
					 for(var i=0; i<data.length; i++){
						 if(data[i].graph==true ){
							 str='<td><input name="test"  value="'+data[i].id+':'+ data[i].types[0].id +'" type="checkbox" style="opacity: 1;"></td>';
						 }else {
							 str='<td>无</td>';
						 }
						 if(data[i].number==true){
							 str1='<td><input type="checkbox" style="opacity: 1;"></td>';
						 }else{
							 str1='<td>无</td>';
						 }
						 var trs = $('<tr>'+  
						            '<td>'+ data[i].name +'</td>'+str+ str1 +
						            '</tr>'); 
							 $("#table-list").append(trs);
						 }
				 }
			});
		});
	}
	 cli();
	 /*关闭*/
	 $("#list-close").click(function(){
		 $("#listDraw").modal("hide");
	 });
	 /*保存*/
	 
	 $("#list-save").click(function(){
		 var listvalue=[];
		 var listgragh =[]; 
		 var plotId = null;
		 var plotTypeId = null;
		 var urls = null;
		 var html = null;
		 serie = [];
		 $('input[name="test"]:checked').each(function(){ 
			  listgragh.push($(this).val()); 
			  }); 
			  if(listgragh.length==0){
				  alert("你还没有选择任何内容！");
			  }else {
				  for(var j=0; j<listgragh.length;j++){
					  listvalue=listgragh[j].split(":");
					   plotId=listvalue[0];
					   plotTypeId=listvalue[1];
					   urls= "/watchpointController/getWatchpointGraphical.do";
					   
					   html = '<div class="col-md-6">'
			    		   +'<div class="title" margin-bottom:10px;>'
			    		    +'<h2 class="tile-title">线图</h2>'
			    		    +'<div class="tile-config dropdown" style="right: 7px;">'
			    		    +'<a data-toggle="dropdown" href="" class="tile-menu"></a>'
			    		    +'<ul class="dropdown-menu pull-right text-right">'
			    		    +'<li><a href="">Refresh</a></li>'
			    		    +'<li><a href="#" style="cursor:pointer;" data-toggle="modal" data-target="#addNew-event">日期选择</a></li>'
			    		    +'<li><a href="">Settings</a></li></ul>'
			    		    +'</div>'
			    		    +'</div>'
			    		    +'<div class="linedraw">'
			    			+'<div id=abc'+j+' style="width:100%;height:30em;"></div>'
			    			+'</div>'
			    			+'</div>';
			    		$(".linepoint").append(html);
			    		$.drawChart('abc'+j,urls,{
							 "watchpointId":selectDataId,
							 "plotId":plotId,
							 "plotTypeId":plotTypeId
						 });
					   
			 }
		 }
		$("#listDraw").modal("hide");
	 });
	 
	  
});

