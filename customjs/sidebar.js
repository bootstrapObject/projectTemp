/**
 * Created by yanbo on 2017/10/17.
 */
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
                function temp(){
                    if(item.namezh=="观察点"||item.namezh=="服务端"||item.namezh=="用户端"){
                        if(item.namezh=="观察点"){
                            var ul = $( '<ul class="list-unstyled menu-item overflowYs sidebar-watpoint">' +
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
                            /*    var li = $('<li class="dropdown">' +
                             '<a class="'+className+'" href="'+className.split("-")[2]+'.html">'+
                             '<span class="menu-item">'+item.namezh+ '管理与设置</span>'+
                             '</a>'+
                             '</li>');*/
                            var li = $('<li class="dropdown">' +
                                '<a class="'+className+' cursor" >'+
                                '<span class="menu-item cursor">'+item.namezh+ '管理与设置</span>'+
                                '</a>'+
                                '</li>');
                            $(li).append(ul);
                            $("#sidebar>ul").on("click","."+className,function(){
                                //judgment if cockpit
                                console.log(location.href.substr(-12,7));
                            });
                            $("#sidebar>ul").on("click","."+className+">span.menu-item",function(){
                                location.href = className.split("-")[2]+".html";
                            });
                            $("#sidebar>ul").on("click",'.'+className+'+.overflowYs>.cursor',function(){
                                if($(this).text()){
                                    location.href = "observationPointkpi.html?dataIndex="+$(this).attr("data-index")+"&dataId="+$(this).attr("data-id");
                                }
                            });
                        }else if(item.namezh=="服务端") {
                            var ul = $( '<ul class="list-unstyled menu-item overflowYs sidebar-serverSide">' +
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
                            var ul = $( '<ul class="list-unstyled menu-item overflowYs sidebar-userSide">' +
                                '</ul>');
                            $.ajax({
                                url:"/client/getClient.do?moduleId=11",
                                type:"post",
                                data:"",
                                dataType:"json",
                                success:function(data){
                                    data.forEach(function(item,index){
                                        $(ul).append('<li class="cursor" style="font-weight: 600;" data-id="'+item.appId+'" data-index="'+index+'">'+item.name+'</li>')
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
                }
                function temp2(){
                    switch (item.namezh){
                        case "观察点":
                            var ul = $( '<ul class="list-unstyled menu-item overflowYs sidebar-watpoint">' +
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
                                '<a class="'+className+' cursor" >'+
                                '<span class="menu-item cursor">'+item.namezh+ '管理与设置</span>'+
                                '</a>'+
                                '</li>');
                            $(li).append(ul);
                            $("#sidebar>ul").on("click","."+className,function(){
                                //judgment if cockpit
                                if(location.href.substr(-12,7)=="cockpit"){
                                    //console.log("right");
                                    console.log($(this).attr("class").split(" ")[0]);
                                }
                            });
                            $("#sidebar>ul").on("click","."+className+">span.menu-item",function(){
                                location.href = className.split("-")[2]+".html";
                            });
                            $("#sidebar>ul").on("click",'.'+className+'+.overflowYs>.cursor',function(){
                                if($(this).text()){
                                    location.href = "observationPointkpi.html?dataIndex="+$(this).attr("data-index")+"&dataId="+$(this).attr("data-id");
                                }
                            });
                            break;
                        case "服务端":
                            var ul = $( '<ul class="list-unstyled menu-item overflowYs sidebar-serverSide">' +
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
                                '<a class="'+className+' cursor">'+
                                '<span class="menu-item cursor">'+item.namezh+ '管理与设置</span>'+
                                '</a>'+
                                '</li>');
                            $(li).append(ul);
                            $("#sidebar>ul").on("click","."+className,function(){
                                if(location.href.substr(-12,7)=="cockpit"){
                                    //console.log("right");
                                    console.log($(this).attr("class").split(" ")[0]);
                                }
                            });
                            $("#sidebar>ul").on("click","."+className+">span.menu-item",function(){
                                location.href = className.split("-")[2]+".html";
                            });
                            $("#sidebar>ul").on("click",'.'+className+'+.overflowYs>.cursor',function(){
                                if($(this).text()){
                                    location.href = "serverSidekpi.html?dataId="+$(this).attr("data-index")+"&dataId="+$(this).attr("data-id");
                                }
                            });
                            break;
                        case "用户端":
                            var ul = $( '<ul class="list-unstyled menu-item overflowYs sidebar-userSide">' +
                                '</ul>');
                            $.ajax({
                                url:"/client/getClient.do?moduleId=11",
                                type:"post",
                                data:"",
                                dataType:"json",
                                success:function(data){
                                    data.forEach(function(item,index){
                                        $(ul).append('<li class="cursor" style="font-weight: 600;" data-id="'+item.appId+'" data-index="'+index+'">'+item.name+'</li>')
                                    })
                                }
                            });
                            var li = $('<li class="dropdown">' +
                                '<a class="'+className+' cursor">'+
                                '<span class="menu-item cursor">'+item.namezh+ '管理与设置</span>'+
                                '</a>'+
                                '</li>');
                            $(li).append(ul);
                            $("#sidebar>ul").on("click","."+className,function(){
                                if(location.href.substr(-12,7)=="cockpit"){
                                    //console.log("right");
                                    console.log($(this).attr("class").split(" ")[0]);
                                }
                            });
                            $("#sidebar>ul").on("click","."+className+">span.menu-item",function(){
                                location.href = className.split("-")[2]+".html";
                            });
                            $("#sidebar>ul").on("click",'.'+className+'+.overflowYs>.cursor',function(){
                                location.href = "userSidekpi.html?dataId="+$(this).attr("data-index")+"&dataId="+$(this).attr("data-id");
                            });
                            break;
                    }
                }
                switch (item.namezh){
                    case "观察点":
                    case "服务端":
                    case "用户端":
                        var ulCustomName,
                            url,
                            id;
                        switch (item.namezh){
                            case "观察点":
                                ulCustomName = "sidebar-watpoint";
                                url = "/watchpointController/getFindAll.do";
                                break;
                            case "服务端":
                                ulCustomName = "sidebar-serverSide";
                                url = "/serverManagement/getAllServerSide.do";
                                break;
                            case "用户端":
                                ulCustomName = "sidebar-userSide";
                                url = "/client/getClient.do?moduleId=11";
                                break;
                        }
                        var ul = $( '<ul class="list-unstyled menu-item overflowYs '+ulCustomName+'">' +
                            '</ul>');
                        $.ajax({
                            url:url,
                            type:"post",
                            data:"",
                            dataType:"json",
                            success:function(data){
                                data.forEach(function(item,index){
                                    item.namezh=="用户端"?id = item.appId:id = item.id;
                                    $(ul).append('<li class="cursor" style="font-weight: 600;" data-id="'+id+'" data-index="'+index+'">'+item.name+'</li>')
                                })
                            }
                        });
                        var li = $('<li class="dropdown">' +
                            '<a class="'+className+' cursor" >'+
                            '<span class="menu-item cursor">'+item.namezh+ '管理与设置</span>'+
                            '</a>'+
                            '</li>');
                        $(li).append(ul);
                        $("#sidebar>ul").on("click","."+className,function(){
                            if(location.href.substr(-12,7)=="cockpit"){
                                console.log($(this).attr("class").split(" ")[0]);
                            }
                        });
                        $("#sidebar>ul").on("click","."+className+">span.menu-item",function(){
                            location.href = className.split("-")[2]+".html";
                        });
                        $("#sidebar>ul").on("click",'.'+className+'+.overflowYs>.cursor',function(){
                            if($(this).text()){
                                location.href = "observationPointkpi.html?dataIndex="+$(this).attr("data-index")+"&dataId="+$(this).attr("data-id");
                            }
                        });
                        break;
                    default:
                        var li = $('<li>' +
                            '<a class="'+className+' cursor">'+
                            '<span class="menu-item cursor">'+item.namezh+'</span>'+
                            '</a>'+
                            '</li>');
                        $("#sidebar>ul").on("click","a"+"."+className,function(){
                            if(location.href.substr(-12,7)=="cockpit"){
                                console.log($(this).attr("class").split(" ")[0]);
                                $("#content").append('<img src="images/topo.png" class="img-drag" alt="">');
                                //$(".img-drag").resizable();
                                $(".img-drag").draggable();
                            }
                        });
                }
                $("#sidebar .side-menu").append(li);
            })
        }
    });
});
