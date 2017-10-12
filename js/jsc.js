$(function(){
    var htmlArr = new Array(),
        htmlTop =new Array(),
        datas,
        currPage,
        countPage,
        sz=[],
        jsc=[];
    $(document).ready(function(){
        $.ajax({
            url:"/userAuthorize/getJurisModuleList.do?requestType=get",
            type:"post",
            async:false,
            data:"",
            dataType: "json",
            success:function(data){
                for(var i =0; i<data.length;i++){
                    if(data[i].nameen=="view"){
                        jsc.push(data[i]);
                    }else{
                        sz.push(data[i]);
                    }
                }
                datas=jsc;
                currPage=1;
                countPage=Math.ceil(jsc.length/3) ;
                showdata(datas,currPage,countPage);
            }
        });
    });
    //下一页
    function funright(){
        if(currPage<countPage){
            $("#tab").empty();
            $("#topTab").empty();
            htmlArr=[];
            htmlTop=[];
            currPage=currPage+1;
            showdata(datas,currPage,countPage);
        }else{
            return;
        }
    }
    //上一页
    function funleft(){
        if(currPage==1){
            return;
        }else{
            $("#tab").empty();
            $("#topTab").empty();
            htmlTop=[];
            htmlArr=[];
            currPage=currPage-1;
            showdata(datas,currPage,countPage);
        }
    }
    function overs(id){
        if(id=="left"){
            $(".more1").find("a").css("background-image", "url(../images/leftf.png) ");
        }else if(id=="right"){
            $(".more2").find("a").css("background-image", "url(../images/rightf.png) ");
        }else{
            $("#"+id).css({ "background":"#2b4350"});
            $("#"+id).find("span").css({ "color":"#7ec4dd"});
        }
    }
    function outs(id){
        if(id=="left"){
            $(".more1").find("a").css("background-image", "url(../images/left.png) ");
        }else if(id=="right"){
            $(".more2").find("a").css("background-image", "url(../images/right.png)");
        }else{
            $("#"+id).css({ "background":"rgba(0,0,0,0.2)"});
            $("#"+id).find("span").css({ "color":"#ffffff"});
        }
    }
    function showdata(datas,currPage,countPage){
        if(countPage < 1) countPage = 1;
        var topTab=$("#topTab");
        var tab = $("#tab");
        if (currPage<countPage){
            var i=3*(currPage-1);
            htmlTop.push('<li style="width:'+((95/((currPage*3)-3*(currPage-1))))+'%;" id="'+datas[i].id+'">');
            htmlTop.push('<a href="cockpit.html" >');
            htmlTop.push('<div class="cio" id="Transaction" ><img id="'+datas[i].id+'" name="'+datas[i].checked +'" src="../images/view.png" ></div>');
            htmlTop.push('<span>'+datas[i].namezh+'</span></a></li>');

            htmlTop.push('<li style="width:'+((95/((currPage*3)-3*(currPage-1))))+'%;" id="'+datas[++i].id+'">');
            htmlTop.push('<a href="cockpit.html" >');
            htmlTop.push('<div class="cio" id="Transaction" ><img id="'+datas[i].id+'" name="'+datas[i].checked +'" src="../images/view.png" ></div>');
            htmlTop.push('<span>'+datas[i].namezh+'</span></a></li>');

            htmlTop.push('<li style="width:'+((95/((currPage*3)-3*(currPage-1))))+'%;" id="'+datas[++i].id+'">');
            htmlTop.push('<a href="cockpit.html" >');
            htmlTop.push('<div class="cio" id="Transaction" ><img id="'+datas[i].id+'" name="'+datas[i].checked +'" src="../images/view.png" ></div>');
            htmlTop.push('<span>'+datas[i].namezh+'</span></a></li>');

            topTab.append($(htmlTop.join("")));

            for(var j=0; j<sz.length; j++){
                if(sz[j].nameen == "systemSet"){
                    htmlArr.push('<li id="a'+countPage+'1"> <a href="settingindex.html">');
                    htmlArr.push(' <div class="cio" id="business"><img id="index-power" name="'+sz[j].checked+'" src="../images/system.png" ></div>');
                    htmlArr.push('<span>'+sz[j].namezh+'</span></a></li>');
                }else if(sz[j].nameen == "reportManager"){
                    htmlArr.push('<li id="a'+countPage+'1"> <a href="fromSetting.html">');
                    htmlArr.push(' <div class="cio" id="business"><img id="index-power" name="'+sz[j].checked+'" src="../images/report.png" ></div>');
                    htmlArr.push('<span>'+sz[j].namezh+'</span></a></li>');
                }
                else if(sz[j].nameen == "alarmSet"){
                    htmlArr.push('<li id="a'+countPage+'1"> <a href="alarmSetting.html">');
                    htmlArr.push(' <div class="cio" id="business"><img id="index-power" name="'+sz[j].checked+'" src="../images/warning.png" ></div>');
                    htmlArr.push('<span>'+sz[j].namezh+'</span></a></li>');
                }
                else if(sz[j].nameen == "flowStore"){
                    htmlArr.push('<li id="a'+countPage+'1"> <a href="flowmanageSetting.html">');
                    htmlArr.push(' <div class="cio" id="business"><img id="index-power" name="'+sz[j].checked+'" src="../images/traffic.png" ></div>');
                    htmlArr.push('<span>'+sz[j].namezh+'</span></a></li>');
                }
                else if(sz[j].nameen == "businessManager"){
                    htmlArr.push('<li id="a'+countPage+'1"> <a href="cockpitmanage.html">');
                    htmlArr.push(' <div class="cio" id="business"><img id="index-power" name="'+sz[j].checked+'" src="../images/business.png" ></div>');
                    htmlArr.push('<span>'+sz[j].namezh+'</span></a></li>');
                }
                else if(sz[j].nameen == "topology"){
                    htmlArr.push('<li id="a'+countPage+'1"> <a href="javascript:void(0)">');
                    htmlArr.push(' <div class="cio" id="business"><img id="index-power" name="'+sz[j].checked+'" src="../images/topo.png" ></div>');
                    htmlArr.push('<span>'+sz[j].namezh+'</span></a></li>');
                }
            }
            tab.append($(htmlArr.join("")));
            if(currPage==1){
                $("#rightdiv").show();
                $("#leftdiv").hide();
            }else{
                $("#leftdiv").show();
                $("#rightdiv").show();
            }
        }else{
            var width="";
            if(datas.length-3*(currPage-1)==1){
                width=96.7;
            }else if(datas.length-3*(currPage-1)==2){
                width=48;
            }else{
                width=95/(datas.length-(3*(currPage-1)));
            }
            for(var i=3*(currPage-1);i<datas.length;i++){
                if(i%3==0){
                    htmlTop.push('<li style="width:'+width+'%;" id="'+datas[i].id+'">');
                }else if(i%2==0){
                    htmlTop.push('<li style="width:'+width+'%;" id="'+datas[i].id+'">');
                }else{
                    htmlTop.push('<li style="width:'+width+'%;" id="'+datas[i].id+'">');
                }
                htmlTop.push('<a href="cockpit.html">');
                htmlTop.push('<div class="cio" id="Transaction" ><img id="'+datas[i].id+'" name="'+datas[i].checked +'" src="../images/view.png" ></div>');
                htmlTop.push('<span>'+datas[i].namezh+'</span></a></li>');
            }
            topTab.append($(htmlTop.join("")));
            for(var j=0; j<sz.length; j++){
                if(sz[j].nameen == "systemSet"){
                    htmlArr.push('<li id="a'+countPage+'1"> <a href="settingindex.html">');
                    htmlArr.push(' <div class="cio" id="business"><img id="index-power" name="'+sz[j].checked+'" src="../images/system.png" ></div>');
                    htmlArr.push('<span>'+sz[j].namezh+'</span></a></li>');
                }else if(sz[j].nameen == "reportManager"){
                    htmlArr.push('<li id="a'+countPage+'1"> <a href="fromSetting.html">');
                    htmlArr.push(' <div class="cio" id="business"><img id="index-power" name="'+sz[j].checked+'" src="../images/report.png" ></div>');
                    htmlArr.push('<span>'+sz[j].namezh+'</span></a></li>');
                }
                else if(sz[j].nameen == "alarmSet"){
                    htmlArr.push('<li id="a'+countPage+'1"> <a href="alarmSetting.html">');
                    htmlArr.push(' <div class="cio" id="business"><img id="index-power" name="'+sz[j].checked+'" src="../images/warning.png" ></div>');
                    htmlArr.push('<span>'+sz[j].namezh+'</span></a></li>');
                }
                else if(sz[j].nameen == "flowStore"){
                    htmlArr.push('<li id="a'+countPage+'1"> <a href="flowmanageSetting.html">');
                    htmlArr.push(' <div class="cio" id="business"><img id="aaa" name="'+sz[j].checked+'" src="../images/traffic.png" ></div>');
                    htmlArr.push('<span>'+sz[j].namezh+'</span></a></li>');
                }
                else if(sz[j].nameen == "businessManager"){
                    htmlArr.push('<li id="a'+countPage+'1"> <a href="cockpitmanage.html">');
                    htmlArr.push(' <div class="cio" id="business"><img id="index-power" name="'+sz[j].checked+'" src="../images/business.png" ></div>');
                    htmlArr.push('<span>'+sz[j].namezh+'</span></a></li>');
                }
                else if(sz[j].nameen == "topology"){
                    htmlArr.push('<li id="a'+countPage+'1"> <a href="javascript:void(0)">');
                    htmlArr.push(' <div class="cio" id="business"><img id="index-power" name="'+sz[j].checked+'" src="../images/topo.png" ></div>');
                    htmlArr.push('<span>'+sz[j].namezh+'</span></a></li>');
                }
            }
            tab.append($(htmlArr.join("")));
            if(datas.length<=3){
                $("#rightdiv").hide();
                $("#leftdiv").hide();
            }else{
                $("#rightdiv").hide();
                $("#leftdiv").show();
            }
        }
    }
    $("#rightdiv").click(function(){
        funright();
    });
    $("#rightdiv").hover(function(){
        overs("right")
    },function(){
        outs("right")
    });
    $("#leftdiv").click(function(){
        funleft()
    });
    $("#leftdiv").hover(function(){
        overs("left")
    },function(){
        outs("left")
    });
    $(document).on( 'click','.cio', function() {
        var name = $(this).find("img")[0].name;
        if("Transaction" == this.id){
            var id = $(this).find("img")[0].id;
            for (var j = 0; j < datas.length; j++) {
                if(id ==datas[j].id){
                    if(datas[j].checked !="1"){
                        alert("您没有开通此功能权限！");
                        return false;
                    }
                }
            }
        }else if(name!="1"){
            alert("您没有开通此功能权限！");
            return false;
        }
    });
    // logo边线-------------------------------------------------------------
    (function() {
        var jquery_div = $(".footer-width");
        var div_width = function() {
            var width = $(window).width() / 2;
            jquery_div.each(function() {
                $(this).css("width", width - 210);
            });
        };
        window.onresize = div_width;
        div_width();
    })();
});