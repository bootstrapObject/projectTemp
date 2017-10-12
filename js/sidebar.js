$(function(){
    /*****************左侧图标工具栏************************/
    $.ajax({
        url:"authorizeModuleController/getFindAll.do",
        type:"post",
        data:"",
        dataType:"json",
        success:function(data){
            data.forEach(function(item,index){
                var className;
                switch (item.namezh){
                    case "网络":
                        className = "sa-side-network";
                        break;
                    case "主机":
                        className = "sa-side-ip";
                        break;
                    case "自定义应用":
                        className = "sa-side-custom";
                        break;
                    case "WEB服务":
                        className = "sa-side-web";
                        break;
                    case "ORACLE服务":
                        className = "sa-side-oracle";
                        break;
                    case "MYSQL服务":
                        className = "sa-side-mysql";
                        break;
                    case "SQLSERVER服务":
                        className = "sa-side-sqlserver";
                        break;
                    case "URL交易":
                        className = "sa-side-url";
                        break;
                    case "报文交易":
                        className = "sa-side-baowenJy";
                        break;
                    case "观察点":
                        className = "sa-side-observationPoint";
                        break;
                    case "用户端":
                        className = "sa-side-userSide";
                        break;
                    case "服务端":
                        className = "sa-side-serverSide";
                        break;
                    default:
                        className = "sa-side-home";
                        break;
                }
                if(item.namezh=="观察点"||item.namezh=="服务端"||item.namezh=="用户端"){
                    if(item.namezh=="观察点"){
                        var ul = $( '<ul class="list-unstyled menu-item overflowYs">' +
                            '</ul>');
                        $.ajax({
                            url:"watchpointController/getFindAll.do",
                            type:"post",
                            data:"",
                            dataType:"json",
                            success:function(data){
                                data.forEach(function(item,index){
                                    $(ul).append('<li class="cursor" style="font-weight: 600;" data-id="'+item.id+'" data-index="'+index+'">'+item.name+'</li>')
                                })
                            }
                        });
                        var li = $('<li class="dropdown">' +
                            '<a class="'+className+'" href="'+className.split("-")[2]+'.html">'+
                            '<span class="menu-item">'+item.namezh+ '管理与设置</span>'+
                            '</a>'+
                            '</li>');
                        $(li).append(ul);
                        $("#sidebar>ul").on("click",'.'+className+'+.overflowYs>.cursor',function(){
                            if($(this).text()){
                                location.href = "observationPointkpi.html?dataIndex="+$(this).attr("data-index")+"&dataId="+$(this).attr("data-id");
                            }
                        });
                    }else if(item.namezh=="服务端") {
                        var ul = $( '<ul class="list-unstyled menu-item overflowYs">' +
                            '</ul>');
                        $.ajax({
                            url:"/serverManagement/getAllServerSide.do",
                            type:"post",
                            data:"",
                            dataType:"json",
                            success:function(data){
                                data.forEach(function(item,index){
                                    $(ul).append('<li class="cursor" style="font-weight: 600;" data-id="'+item.id+'" data-index="'+index+'">'+item.name+'</li>')
                                })
                            }
                        });
                        var li = $('<li class="dropdown">' +
                            '<a class="'+className+'" href="'+className.split("-")[2]+'.html">'+
                            '<span class="menu-item">'+item.namezh+ '管理与设置</span>'+
                            '</a>'+
                            '</li>');
                        $(li).append(ul);
                        $("#sidebar>ul").on("click",'.'+className+'+.overflowYs>.cursor',function(){
                            if($(this).text()){
                                location.href = "serverSidekpi.html?dataId="+$(this).attr("data-index")+"&dataId="+$(this).attr("data-id");
                            }
                        });
                    }else {
                        //用户端
                        var ul = $( '<ul class="list-unstyled menu-item overflowYs">' +
                            '</ul>');
                        $.ajax({
                            url:"/client/getClient.do?moduleId=11",
                            type:"post",
                            data:"",
                            dataType:"json",
                            success:function(data){
                                data.forEach(function(item,index){
                                    $(ul).append('<li class="cursor" style="font-weight: 600;" data-id="'+item.id+'" data-index="'+index+'">'+item.name+'</li>')
                                })
                            }
                        });
                        var li = $('<li class="dropdown">' +
                            '<a class="'+className+'" href="'+className.split("-")[2]+'.html">'+
                            '<span class="menu-item">'+item.namezh+ '管理与设置</span>'+
                            '</a>'+
                            '</li>');
                        $(li).append(ul);
                        $("#sidebar>ul").on("click",'.'+className+'+.overflowYs>.cursor',function(){
                            location.href = "userSidekpi.html?dataId="+$(this).attr("data-index")+"&dataId="+$(this).attr("data-id");
                        });
                    }
                }else {
                    var li = $('<li>' +
                        '<a class="'+className+'" href="#">'+
                        '<span class="menu-item">'+item.namezh+'</span>'+
                        '</a>'+
                        '</li>');
                }
                $("#sidebar .side-menu").append(li);
            })
        }
    })
});
