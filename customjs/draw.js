;function oldfun(){
	/*观察点部分*/
	var selectRow = window.location.href.split("?")[1].split("&")[0].split("=")[1]-0,
		selectDataId = window.location.href.split("?")[1].split("&")[1].split("=")[1]-0;
	var kpiName = [];
	var kpiNames = [];
	var types = null;
	function load(id,type){
		types = type;
		if(id == null){
		}else{
			selectDataId = id;
		}
		$.ajax({
			url:"/viewConfig/getModuleConfig.do",
			type:"post",
			dataType:"json",
			data:{moduleId:type,busiId:selectDataId},
			success:function(data){
				$(".pointline").empty();
				var plotId=null,plotTypeId=null,url=null,watchpointId=null;
				var html = '';
				kpiName = [];
				kpiNames= [];
				switch (type){
					case 10:
						for(var i= 0;i<data.graph.length;i++){
							kpiName.push(data.graph[i].plotId);
							html = '<div class="draw" style="padding: 10px;width: 50%;float: left;">'
								+'<div class="title">'
								+'<h2 class="tile-title" id =draw_title_' + i + '>图形</h2>'
								+'<div class="tile-config dropdown">'
								+'<a data-toggle="dropdown" class="tile-menu"></a>'
								+'<ul class="dropdown-menu pull-right text-right">'
								+'<li><a href="">Refresh</a></li>'
								+'<li><a href="#" style="cursor:pointer;" data-toggle="modal" data-target="#addNew-event">日期选择</a></li>'
								+'<li><a href="">Settings</a></li></ul>'
								+'</div>'
								+'</div>'
								+'<div class="linedraw">'
								+'<div id=lineid'+i+' style="width:100%;height:30em;"></div>'
								+'</div>'
								+'</div>';
							$(".pointline").append(html);
							plotId=data.graph[i].plotId;
							plotTypeId=data.graph[i].plotTypeId;
							url=data.graph[i].urlPath;
							watchpointId=data.graph[i].watchpointId;
							$.drawChart('lineid'+i+'', "draw_title_" + i,url,{
								"watchpointId":watchpointId,
								"plotId":plotId,
								"plotTypeId":plotTypeId
							}, {
								dataZoom: true
							});
							$.chartResize('lineid'+i+'');
						};
						break;
					case 11:
						for(var i= 0;i<data.graph.length;i++){
							kpiName.push(data.graph[i].plotId);
							html = '<div class="draw" style="padding: 10px;width: 50%;float: left;">'
								+'<div class="title">'
								+'<h2 class="tile-title">图形</h2>'
								+'<div class="tile-config dropdown">'
								+'<a data-toggle="dropdown" class="tile-menu"></a>'
								+'<ul class="dropdown-menu pull-right text-right">'
								+'<li><a href="">Refresh</a></li>'
								+'<li><a href="#" style="cursor:pointer;" data-toggle="modal" data-target="#addNew-event">日期选择</a></li>'
								+'<li><a href="">Settings</a></li></ul>'
								+'</div>'
								+'</div>'
								+'<div class="linedraw">'
								+'<div id=lineid'+i+' style="width:100%;height:30em;"></div>'
								+'</div>'
								+'</div>';
							$(".pointline").append(html);
							plotId=data.graph[i].plotId;
							plotTypeId=data.graph[i].plotTypeId;
							url=data.graph[i].urlPath;
							clientId = data.graph[i].clientId;
							$.drawChart('lineid'+i+'',url,{
								"watchpointId":1,
								"plotId":plotId,
								"plotTypeId":plotTypeId,
								"clientId": clientId
							}, {
								dataZoom: true
							});
							$.chartResize('lineid'+i+'');
						};
						break;
					case 12:
						for(var i= 0;i<data.graph.length;i++){
							kpiName.push(data.graph[i].plotId);
							html = '<div class="draw" style="padding: 10px;width: 50%;float: left;">'
								+'<div class="title">'
								+'<h2 class="tile-title">图形</h2>'
								+'<div class="tile-config dropdown">'
								+'<a data-toggle="dropdown" class="tile-menu"></a>'
								+'<ul class="dropdown-menu pull-right text-right">'
								+'<li><a href="">Refresh</a></li>'
								+'<li><a href="#" style="cursor:pointer;" data-toggle="modal" data-target="#addNew-event">日期选择</a></li>'
								+'<li><a href="">Settings</a></li></ul>'
								+'</div>'
								+'</div>'
								+'<div class="linedraw">'
								+'<div id=lineid'+i+' style="width:100%;height:30em;"></div>'
								+'</div>'
								+'</div>';
							$(".pointline").append(html);
							plotId=data.graph[i].plotId;
							plotTypeId=data.graph[i].plotTypeId;
							url=data.graph[i].urlPath;
							serverId = data.graph[i].serverId;
							$.drawChart('lineid'+i+'',url,{
								"watchpointId": 1,
								"plotId":plotId,
								"plotTypeId":plotTypeId,
								"serverId": serverId
							}, {
								dataZoom: true
							});
							$.chartResize('lineid'+i+'');
						};
						break;
				}

			}
		});
	}

	var str=null;
	var str1=null;
	var trs =null;
	$("#list-draw").off("click").on("click",function(){
		$(".list-content").empty();
		var tables = '<div class="form-horizontal" style="margin-right: 20px;">'+
			'<div class="form-group">'+
			'<div class="col-md-4">'+
			'<select class="form-control col-md-2" id="watSelect"  style="background: rgba(0,0,0,0.0);height: 30px;margin-top: 5px;">'+
			'<option>观察点</option>'+
			'</select>'+
			'</div>'+
			'<div class="col-md-4">'+
			'<select class="form-control" id="userSelect"  style="background: rgba(0,0,0,0.0);height: 30px;margin-top: 5px;">'+
			'<option>客户端</option>'+
			'</select>'+
			'</div>'+
			'<div class="col-md-4">'+
			'<select class="form-control" id="serSelect"  style="background: rgba(0,0,0,0.0);height: 30px;margin-top: 5px;">'+
			'<option>服务端</option>'+
			'</select>'+
			'</div>'+
			'</div>'+
			'</div>'+
			'<table class="table">'+
			'<thead style="background: rgb(255,255,255);display:block;border-bottom:1px solid #c0c0c0;"><tr>'+
			'<th>Kpi名称</th>'+
			'<th>图形</th>'+
				/*'<th>数据</th>'+*/
			'</tr></thead>'+
			'<tbody id="table-list"  style="display:block;max-height:260px;overflow-y: scroll;"></tbody>'+
			'</table>';
		$(".list-content").append(tables);
		var _width=$('#listDraw').width();
		$('.list-content th:first-child').width(_width*0.7);
		$('.list-content th:nth-child(2)').width(_width*0.3);
		$('.list-content th:nth-child(3)').width(_width*0.2);
		$.ajax({
			url:"/plot/getPlotByModuleId.do",
			type:"post",
			data:{ moduleId:types},
			dataType:"json",
			success:function(data){
				$("#table-list").empty();
				for(var i=0; i<data.length; i++){
					if(data[i].graph==true ){
						str='<td><input id="test" name="test"  value="'+data[i].id+':'+ data[i].types[0].id +'" type="checkbox" style="opacity: 1;"></td>';
						$('.list-content td:nth-child(2)').width(_width*0.3);
					}else {
						str='<td></td>';
					}
					/*if(data[i].number==true){
					 str1='<td><input type="checkbox" style="opacity: 1;"></td>';
					 $('.list-content td:nth-child(3)').width(_width*0.2);
					 }else{
					 str1='<td></td>';
					 }*/
					if(kpiNames==""){
						for(var j= 0;j<kpiName.length;j++){
							if(data[i].id ==kpiName[j]){
								str='<td><input  name="test"  value="'+data[i].id+':'+ data[i].types[0].id +'" type="checkbox" checked=checked style="opacity: 1;"></td>';
								$('.list-content td:nth-child(2)').width(_width*0.3);
							}
						}
					}else{
						for(var k= 0;k<kpiNames.length;k++){
							if(data[i].id ==kpiNames[k]){
								str='<td><input  name="test"  value="'+data[i].id+':'+ data[i].types[0].id +'" type="checkbox" checked=checked style="opacity: 1;"></td>';
								$('.list-content td:nth-child(2)').width(_width*0.3);
							}
						}
					}

					trs = $('<tr>'+
						'<td>'+ data[i].name +'</td>'+str+ str1 +
						'</tr>');
					$('.list-content td:first-child').width(_width*0.7);
					$("#table-list").append(trs);
				}
			}
		});

	});

	$("#list-save").click(function(){
		$(".pointline").empty();
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
			var datas="{\"graph\":[";
			for(var j=0; j<listgragh.length;j++){
				if(types == 10){
					listvalue=listgragh[j].split(":");
					plotId=listvalue[0];
					kpiNames.push(plotId);
					plotTypeId=listvalue[1];
					urls= "/watchpointController/getWatchpointGraphical.do";
					datas += '{';
					datas+='"ipmCenterId":"'+ 0 +'",';
					datas+='"urlPath":"'+ urls +'",';
					datas+='"watchpointId":"'+ selectDataId +'",';
					datas+='"plotId":"'+ plotId +'",';
					datas+='"plotTypeId":"'+ plotTypeId +'"';
					datas += '}';
					datas += ',';
					html = '<div class="draw" style="padding: 10px;width: 50%;float: left;">'
						+'<div class="title">'
						+'<h2 class="tile-title">图形</h2>'
						+'<div class="tile-config dropdown">'
						+'<a data-toggle="dropdown" class="tile-menu"></a>'
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
					$(".pointline").append(html);
					$.drawChart('abc'+j,urls,{
						"watchpointId":selectDataId,
						"plotId":plotId,
						"plotTypeId":plotTypeId
					},{
						dataZoom: true
					});
					$.chartResize('abc'+j);
				}else if(types == 11){
					listvalue=listgragh[j].split(":");
					plotId=listvalue[0];
					kpiNames.push(plotId);
					plotTypeId=listvalue[1];
					urls= "/client/getClientGraphical.do";
					datas += '{';
					datas+='"ipmCenterId":"'+ 0 +'",';
					datas+='"urlPath":"'+ urls +'",';
					datas+='"clientId":"'+ selectDataId +'",';
					datas+='"plotId":"'+ plotId +'",';
					datas+='"plotTypeId":"'+ plotTypeId +'"';
					datas += '}';
					datas += ',';
					html = '<div class="draw" style="padding: 10px;width: 50%;float: left;">'
						+'<div class="title">'
						+'<h2 class="tile-title">图形</h2>'
						+'<div class="tile-config dropdown">'
						+'<a data-toggle="dropdown" class="tile-menu"></a>'
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
					$(".pointline").append(html);

					$.drawChart('abc'+j,urls,{
						"watchpointId":1,
						"plotId":plotId,
						"plotTypeId":plotTypeId,
						"clientId": selectDataId
					},{
						dataZoom: true
					});
					$.chartResize('abc'+j);
				}else{
					listvalue=listgragh[j].split(":");
					plotId=listvalue[0];
					kpiNames.push(plotId);
					plotTypeId=listvalue[1];
					urls= "/serverManagement/getServerSideGraphical.do";
					datas += '{';
					datas+='"ipmCenterId":"'+ 0 +'",';
					datas+='"urlPath":"'+ urls +'",';
					datas+='"serverId":"'+ selectDataId +'",';
					datas+='"plotId":"'+ plotId +'",';
					datas+='"plotTypeId":"'+ plotTypeId +'"';
					datas += '}';
					datas += ',';
					html = '<div class="draw" style="padding: 10px;width: 50%;float: left;">'
						+'<div class="title">'
						+'<h2 class="tile-title">图形</h2>'
						+'<div class="tile-config dropdown">'
						+'<a data-toggle="dropdown" class="tile-menu"></a>'
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
					$(".pointline").append(html);
					$.drawChart('abc'+j,urls,{
						"serverId":selectDataId,
						"plotId":plotId,
						"plotTypeId":plotTypeId,
						"watchpointId":1,
					},{
						dataZoom: true
					});
					$.chartResize('abc'+j);
				}
			}
			datas+="]}";
			var json = datas.substring(0, datas.length - 3) +"]}";
			$.ajax({
				url:"/viewConfig/updModuleConfig.do",
				type:"post",
				dataType:"json",
				data:{moduleId:types,busiId:selectDataId,content:json},
				success:function(data){
				}
			});
		}
		$("#listDraw").modal("hide");
	});
}

/*观察点部分*/
var selectRow = window.location.href.split("?")[1].split("&")[0].split("=")[1]-0,
	selectDataId = window.location.href.split("?")[1].split("&")[1].split("=")[1]-0;
var kpiName = [],
	kpiNames = [],
	types;
function load(id,type){
	/*
	 *id 没看到使用
	 * type 某个模块的id
	 * busiId 用户点击进入页面某条数据的id
	 *"/viewConfig/getModuleConfig.do" 选择复选框接口
	 *
	 */
	types = type;
	if(id == null){
	}else{
		selectDataId = id;
	}
	$.ajax({
		url:"/viewConfig/getModuleConfig.do",
		type:"post",
		dataType:"json",
		data:{
			moduleId:type,
			busiId:selectDataId
		},
		success:function(data){
			$(".pointline").empty();
			var plotId,
				plotTypeId,
				url,
				watchpointId,
				html = '',
				clientId,
				serverId;
			for(var i= 0;i<data.graph.length;i++){
				kpiName.push(data.graph[i].plotId);
				html = '<div class="draw" style="padding: 10px;width: 50%;float: left;">'
					+'<div class="title">'
					+'<h2 class="tile-title" id =draw_title_' + i + '>图形</h2>'
					+'</div>'
					+'<div class="linedraw">'
					+'<div id=lineid'+i+' style="width:100%;height:30em;"></div>'
					+'</div>'
					+'</div>';
				$(".pointline").append(html);
				plotId=data.graph[i].plotId;
				plotTypeId=data.graph[i].plotTypeId;
				url=data.graph[i].urlPath;
				watchpointId = type==10?data.graph[i].watchpointId:1;
				clientId = type==11?data.graph[i].clientId:undefined;
				serverId = type==12?data.graph[i].serverId:undefined;
				$.drawChart('lineid'+i+'', "draw_title_" + i,url,{
					"watchpointId":watchpointId,
					"plotId":plotId,
					"plotTypeId":plotTypeId,
					"clientId": clientId,
					"serverId": serverId
				}, {
					dataZoom: true
				});
				$.chartResize('lineid'+i+'');
			}
		}
	});
}

$("#list-draw").off("click").on("click",function(){
	var str,
		str1,
		trs;
	$(".list-content").empty();
	var tables = '<div class="form-horizontal" style="margin-right: 20px;">'+
		'<div class="form-group">'+
		'<div class="col-md-4">'+
		'<select class="form-control col-md-2" id="watSelect"  style="background: rgba(0,0,0,0.0);height: 30px;margin-top: 5px;">'+
		'<option>观察点</option>'+
		'</select>'+
		'</div>'+
		'<div class="col-md-4">'+
		'<select class="form-control" id="userSelect"  style="background: rgba(0,0,0,0.0);height: 30px;margin-top: 5px;">'+
		'<option>客户端</option>'+
		'</select>'+
		'</div>'+
		'<div class="col-md-4">'+
		'<select class="form-control" id="serSelect"  style="background: rgba(0,0,0,0.0);height: 30px;margin-top: 5px;">'+
		'<option>服务端</option>'+
		'</select>'+
		'</div>'+
		'</div>'+
		'</div>'+
		'<table class="table">'+
		'<thead style="background: rgb(255,255,255);display:block;border-bottom:1px solid #c0c0c0;"><tr>'+
		'<th>Kpi名称</th>'+
		'<th>图形</th>'+
		'<th>数据</th>'+
		'</tr></thead>'+
		'<tbody id="table-list"  style="display:block;max-height:260px;overflow-y: scroll;"></tbody>'+
		'</table>';
	$(".list-content").append(tables);
	var _width=$('#listDraw').width();
	$('.list-content th:first-child').width(_width*0.65);
	$('.list-content th:nth-child(2)').width(_width*0.28);
	$('.list-content th:nth-child(3)').width(_width*0.2);
	$.ajax({
		url:"/plot/getPlotByModuleId.do",
		type:"post",
		data:{
			moduleId:types
		},
		dataType:"json",
		success:function(data){
			$("#table-list").empty();
			for(var i=0; i<data.length; i++){
				if(data[i].graph==true ){
					str='<td><input id="test" name="test"  value="'+data[i].id+':'+ data[i].types[0].id +'" type="checkbox" style="opacity: 1;"></td>';
					$('.list-content td:nth-child(2)').width(_width*0.3);
				}else {
					str='<td></td>';
				}
				//小列表专用
				if(data[i].number==true){
					str1='<td><input type="checkbox" style="opacity: 1;"></td>';
					$('.list-content td:nth-child(3)').width(_width*0.2);
				}else{
					str1='<td></td>';
				}
				if(kpiNames==""){
					for(var j= 0;j<kpiName.length;j++){
						if(data[i].id ==kpiName[j]){
							str='<td><input  name="test"  value="'+data[i].id+':'+ data[i].types[0].id +'" type="checkbox" checked=checked style="opacity: 1;"></td>';
							$('.list-content td:nth-child(2)').width(_width*0.3);
						}
					}
				}else{
					for(var k= 0;k<kpiNames.length;k++){
						if(data[i].id ==kpiNames[k]){
							str='<td><input  name="test"  value="'+data[i].id+':'+ data[i].types[0].id +'" type="checkbox" checked=checked style="opacity: 1;"></td>';
							$('.list-content td:nth-child(2)').width(_width*0.3);
						}
					}
				}
				trs = $('<tr>'+
					'<td>'+ data[i].name +'</td>'+str+ str1 +
					'</tr>');
				$('.list-content td:first-child').width(_width*0.7);
				$("#table-list").append(trs);
			}
		}
	});
});

$("#list-save").click(function(){
	$(".pointline").empty();
	var listvalue=[],
		listgragh =[],
		plotId,
		plotTypeId,
		urls,
		html,
		watchpointId,
		clientId,
		serverId;
	$('input[name="test"]:checked').each(function(){
		listgragh.push($(this).val());
	});
	if(listgragh.length==0){
		alert("你还没有选择任何内容！");
	}else {
		var datas="{\"graph\":[";
		for(var j=0; j<listgragh.length;j++){
			listvalue=listgragh[j].split(":");
			plotId=listvalue[0];
			kpiNames.push(plotId);
			plotTypeId=listvalue[1];
			urls= types==10?"/watchpointController/getWatchpointGraphical.do":
				types==11?"/client/getClientGraphical.do":
					"/serverManagement/getServerSideGraphical.do";
			watchpointId = types==10?selectDataId:1;
			clientId = types==11?selectDataId:undefined;
			serverId = types==12?serverId:undefined;
			datas += '{';
			datas+='"ipmCenterId":"'+ 0 +'",';
			datas+='"urlPath":"'+ urls +'",';
			datas+='"watchpointId":"'+ watchpointId +'",';
			datas+='"clientId":"'+ clientId +'",';
			datas+='"serverId":"'+ serverId +'",';
			datas+='"plotId":"'+ plotId +'",';
			datas+='"plotTypeId":"'+ plotTypeId +'"';
			datas += '}';
			datas += ',';
			html = '<div class="draw" style="padding: 10px;width: 50%;float: left;">'
				+'<div class="title">'
				+'<h2 class="tile-title" id =draw_title_' + j + '>图形</h2>'
				+'</div>'
				+'<div class="linedraw">'
				+'<div id=abc'+j+' style="width:100%;height:30em;"></div>'
				+'</div>'
				+'</div>';
			$(".pointline").append(html);
			$.drawChart('abc'+j,'draw_title_' + j ,urls,{
				"watchpointId":watchpointId,
				"plotId":plotId,
				"plotTypeId":plotTypeId,
				"clientId": clientId,
				"serverId":serverId
			},{
				dataZoom: true
			});
			$.chartResize('abc'+j);
		}
		datas+="]}";
		var json = datas.substring(0, datas.length - 3) +"]}";
		$.ajax({
			url:"/viewConfig/updModuleConfig.do",
			type:"post",
			dataType:"json",
			data:{
				moduleId:types,
				busiId:selectDataId,
				content:json
			},
			success:function(data){
			}
		});
	}
	$("#listDraw").modal("hide");
});