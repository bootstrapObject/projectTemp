/**
 * Created by yanbo on 2017/11/2.
 * 需引入在sidebar.js之后
 * 此代码可缩减一半。。。
 */
$(function(){
    function temp(){
        var _cockpit = {
            /*
             * 驾驶仓id
             */
            busiId:function(){
                return location.href.split("?")[1].split("=")[1];
            },
            /*
             *   拖拽元素 缩放大小 删除元素功能
             *    moveEle {
             * @params  eleClass:"",//当前元素
             * @params  childClass:""//半前元素的子元素
             *         }
             */
            moveElement:function(moveEle){
                /*
                 *eleClass,childClass
                 */
                $(moveEle.eleClass).mousedown(function(e) {
                    var offset = $(this).offset();
                    //this.posix = {'x': e.pageX - offset.left, 'y': e.pageY - offset.top};
                    //left  top 各自加的数值为此项目中布局的偏差
                    this.posix = {'x': e.pageX - offset.left+60, 'y': e.pageY - offset.top+50};
                    $.extend(document,
                        {'move': true,
                            'move_target': this
                        });
                }).on("click",".closeBox",function(){
                    $(this).parent().remove();
                }).on('mousedown', '.coor', function(e) {
                    var _t = $(this).parent();
                    var posix = {
                        'w': _t.width(),
                        'h': _t.height(),
                        'x': e.pageX,
                        'y': e.pageY
                    };
                    $.extend(document,
                        {
                            'move': true,
                            'call_down': function(e) {
                                _t.css({
                                    'width': Math.max(30, e.pageX - posix.x + posix.w),
                                    'height': Math.max(30, e.pageY - posix.y + posix.h)
                                });
                                if(moveEle.childClass){
                                    if(moveEle.childClass=="svg"){
                                        _t.find(moveEle.childClass).css({
                                            'width': Math.max(30, e.pageX - posix.x + posix.w),
                                            'height': Math.max(30, e.pageY - posix.y + posix.h)-27
                                        });
                                        //_t.find(childClass).children("rect").first().attr({
                                        //    'width': Math.max(30, e.pageX - posix.x + posix.w),
                                        //    'height': Math.max(30, e.pageY - posix.y + posix.h)-27
                                        //});
                                        _t.find(".linedraw>div").css({
                                            'width': Math.max(30, e.pageX - posix.x + posix.w),
                                            'height': Math.max(30, e.pageY - posix.y + posix.h)-27
                                        });
                                        _t.find(".linedraw>div>div").css({
                                            'width': Math.max(30, e.pageX - posix.x + posix.w),
                                            'height': Math.max(30, e.pageY - posix.y + posix.h)-27
                                        });
                                    }else {
                                        _t.children(moveEle.childClass).css({
                                            'width': Math.max(30, e.pageX - posix.x + posix.w),
                                            'height': Math.max(30, e.pageY - posix.y + posix.h)
                                        });
                                    }
                                }
                            }});
                    return false;
                });
            },
            /*
             *    定时刷新功能
             *           refresh  {
             * @param Number      interTime:"10000", 定时刷新的时间(毫秒)
             * @param Boolean      clearTimer:"" 是否清除定时刷新小列表和图形功能
             *                    }
             */
            refreshSmallListOrChart:function(refresh){
                var timer = setInterval(function(){
                    /*
                     * interTime,clearTimer
                     * url watchpointId
                     * plotIds clientId||serverId
                     * starttime endtime  step
                     *
                     */
                    if($(".drageTable").length){
                        var $drT = $(".drageTable");
                        for(var i=0;i<$drT.length;i++){
                            var url = $drT.eq(i).attr("data-selfUrl"),
                                watchpointId = $drT.eq(i).attr("data-watchPointId"),
                                clientId = $drT.eq(i).attr("data-clientId"),
                                serverId = $drT.eq(i).attr("data-serverId"),
                                trPlotId = $drT.eq(i).find(".SavecheckedId"),
                                plotIds = [];
                            for(var j=0;j<trPlotId.length;j++){
                                plotIds.push(trPlotId.eq(j).attr("data-plotId"))
                            }
                            var params = {
                                watchpointId:watchpointId,
                                plotIds:String(plotIds)
                                //starttime:starttime,
                                //endtime:endtime,
                                //step:step
                            };
                            if(clientId||serverId){
                                clientId&&clientId!="undefined"?params.clientId = clientId:
                                    params.serverId = serverId;
                            }
                            $.ajax({
                                url:url,
                                async:false,
                                type:"post",
                                data:params,
                                dataType:"json",
                                success:function(data){
                                    //此处与小列表的name匹配
                                    var dataArry = data.data;
                                    dataArry.forEach(function(item,index){
                                        var numObj = numForUtil(item.value,item.unit);
                                        for(var i=0;i<trPlotId.length;i++){
                                            if(item.plotName == trPlotId.eq(i).children("td:first").text()){
                                                trPlotId.eq(i).children("td:last").text(numObj.value);
                                                trPlotId.eq(i).next().text(numObj.unit)
                                            }
                                        }
                                    })
                                }
                            })
                        }
                    }
                    /*
                     * chartemId+j 盛放图形的容器id domId
                     * charTitleId+j 标题id titleId
                     * dataChartUrl 画图形的url
                     * drawCharparem ｛
                     *            watchpointId
                     *            plotId
                     *            plotTypeId
                     *            serverId||clientId
                     *               ｝
                     *
                     */
                    if($("._lineChartdb").length){
                        var $lChar = $("._lineChartdb");
                        for(var i=0;i<$lChar.length;i++){
                            //$lChar.eq(i).children().empty();
                            var domId = $lChar.eq(i).children().attr("id"),
                                titleId = $lChar.eq(i).prev("div.titleDrage").children("h2.tile-title").attr("id"),
                                url = $lChar.eq(i).attr("data-ChartUrl"),
                                watchpointId = $lChar.eq(i).attr("data-watchPointId"),
                                plotId = $lChar.eq(i).attr("data-plotId"),
                                plotTypeId = $lChar.eq(i).attr("data-plotTypeId"),
                                serverId = $lChar.eq(i).attr("data-serverId"),
                                clientId = $lChar.eq(i).attr("data-clientId"),
                                starttime = $.myTime.DateToUnix($.myTime.nowTime())-600,
                                endtime = $.myTime.DateToUnix($.myTime.nowTime()),
                                params = {
                                    "watchpointId":watchpointId,
                                    "plotId":plotId,
                                    "plotTypeId":plotTypeId,
                                    "starttime":starttime,
                                    "endtime":endtime
                                };
                            serverId?params.serverId = serverId:
                                params.clientId = clientId;
                            $lChar.attr({
                                "data-starttime":starttime,
                                "data-endtime":endtime
                            });
                            $.drawHChart(domId,titleId,url,params);
                        }
                    }
                },refresh.interTime);
                if(refresh.clearTimer){
                    clearInterval(timer);
                }
            },
            /*
             *   画出图片功能
             *                creatImg {
             *  @param String            imgSrc:"",//图片的完整路径
             *  @param String          creatClass:"",//用于区分某个模块的属性 data-class = creatImg.creatClass
             *  @param String          titleText:"" //给用户的中文提示 title="'+creatImg.titleText+'"
             *                        }
             */
            creatImg:function(creatImg){
                /*
                 *imgSrc,creatClass,titleText
                 */
                $("#content .block-area").append('<div class="drageBox" data-class="'+creatImg.creatClass+'">'+
                    '<div class="coor"></div>'+
                    '<div class="closeBox"></div>'+
                    '<img src="'+creatImg.imgSrc+'"  title="'+creatImg.titleText+'">'+
                    '</div>');
                _cockpit.moveElement({
                    eleClass:".drageBox",
                    childClass:"img"
                });
                //move(".drageBox","img");
            },
            /*
             *   画出小列表功能
             *  creatlistTable {
             *         所需参数如下
             * @params "isCreatTab":$(_chart.drageBox).attr("class"),//用于区分是否需要画出table标签
             * @params "dataChartUrl":dataChartUrl,
             * @params "url":url,
             * @params "watchpointId":watchpointId,
             * @params "cliSerAttr":cliSerAttr,
             * @params "select2AttrC":select2AttrC,
             * @params "clientServerId":clientServerId,
             * @params "selectText":selectText,
             * @params "dataArry":data.data,
             * @params "kpiNames":kpiNames,
             * @params "plotIds":plotIds,
             * @params "plotTypeIds":plotTypeIds,
             * @params "dataStarttime":data.starttime,
             * @params "dataEndtime":data.endtime
             *          }
             */
            creatlistTable:function(creatlistTable){
                /*
                 *
                 * @params isCreatTab
                 * @params dataChartUrl
                 * @params url
                 * @params watchpointId
                 * @params watchpointId
                 * @params cliSerAttr
                 * @params select2AttrC
                 * @params clientServerId
                 * @params selectText
                 * @params dataArry
                 * @params kpiNames
                 * @params plotIds
                 * @params plotTypeIds
                 * @params data.starttime
                 * @params data.endtime
                 */
                //console.log(creatlistTable);
                if(creatlistTable.isCreatTab){
                    var tableBox = '<div class="tableBox">'+
                        '<table class="drageTable" border="1" bordercolor="#a9a9a9"' +
                        ' data-ChartUrl="'+creatlistTable.dataChartUrl+'" data-selfUrl="'+creatlistTable.url+'"' +
                        ' data-watchPointId="'+creatlistTable.watchpointId+'"  '+creatlistTable.cliSerAttr+'>'+
                        '<tr class="drageTableth" data-Name="'+creatlistTable.select2AttrC+'" ' +
                        'data-watchpointId="'+creatlistTable.watchpointId+'" data-clientServerId="'+creatlistTable.clientServerId+'">'+
                        '<th  class="text-center cursor" colspan="2">'+creatlistTable.selectText+'</th>'+
                        '</tr>';
                    creatlistTable.dataArry.forEach(function(item,index){
                        var numObj = numForUtil(item.value,item.unit);
                        for(var i=0;i<creatlistTable.kpiNames.length;i++){
                            if(item.plotName==creatlistTable.kpiNames[i]){
                                tableBox += '<tr class="drageTabletr SavecheckedId" ' +
                                    'data-plotId="'+creatlistTable.plotIds[i]+'" data-plotTypeId="'+creatlistTable.plotTypeIds[i]+'" ' +
                                    'data-starttime="'+creatlistTable.dataStarttime+'" data-endtime="'+creatlistTable.dataEndtime+'">'+
                                    '<td>'+item.plotName+'</td>'+
                                    '<td rowspan="2" style="width:50%;">'+numObj.value+'</td>'+
                                    '</tr>'+
                                    '<tr class="drageTabletr drageTabletrUnit" data-plotId="'+creatlistTable.plotIds[i]+'" ' +
                                    'data-plotTypeId="'+creatlistTable.plotTypeIds[i]+'" ' +
                                    'data-starttime="'+creatlistTable.dataStarttime+'" data-endtime="'+creatlistTable.dataEndtime+'">'+
                                    '<td>'+numObj.unit+'</td>'+
                                    '</tr>'
                            }
                        }
                    });
                    tableBox +='<div class="closeBox"></div>'+
                        '<div class="editBox"></div>'+
                        '<div class="coor"></div>'+
                        '</table>'+
                        '</div>';
                    $("#content .block-area").append($(tableBox));
                    _cockpit.moveElement({
                        eleClass:".tableBox",
                        childClass:".drageTable"
                    });
                }else {
                    var tBodyelem = '<tr class="drageTableth" data-Name="'+creatlistTable.select2AttrC+'" ' +
                        'data-watchpointId="'+creatlistTable.watchpointId+'" data-clientServerId="'+creatlistTable.clientServerId+'">'+
                        '<th  class="text-center cursor" colspan="2">'+creatlistTable.selectText+'</th>'+
                        '</tr>';
                    creatlistTable.dataArry.forEach(function(item,index){
                        var numObj = numForUtil(item.value,item.unit);
                        for(var i=0;i<creatlistTable.kpiNames.length;i++){
                            if(item.plotName==creatlistTable.kpiNames[i]){
                                tBodyelem += '<tr class="drageTabletr SavecheckedId" ' +
                                    'data-plotId="'+creatlistTable.plotIds[i]+'" data-plotTypeId="'+creatlistTable.plotTypeIds[i]+'" ' +
                                    'data-starttime="'+creatlistTable.dataStarttime+'" data-endtime="'+creatlistTable.dataEndtime+'">'+
                                    '<td>'+item.plotName+'</td>'+
                                    '<td rowspan="2" style="width:50%;">'+numObj.value+'</td>'+
                                    '</tr>'+
                                    '<tr class="drageTabletr drageTabletrUnit" data-plotId="'+creatlistTable.plotIds[i]+'" ' +
                                    'data-plotTypeId="'+creatlistTable.plotTypeIds[i]+'" ' +
                                    'data-starttime="'+creatlistTable.dataStarttime+'" data-endtime="'+creatlistTable.dataEndtime+'">'+
                                    '<td>'+numObj.unit+'</td>'+
                                    '</tr>'
                            }
                        }
                    });
                    //修改居属性值
                    switch (creatlistTable.select2AttrC){
                        case "userSideSelect":
                            var arrObj = {
                                "data-ChartUrl":creatlistTable.dataChartUrl,
                                "data-watchPointId":creatlistTable.watchPointId,
                                "data-clientId":creatlistTable.clientServerId
                            };
                            break;
                        case "serverSideSelect":
                            var arrObj = {
                                "data-ChartUrl":creatlistTable.dataChartUrl,
                                "data-watchPointId":creatlistTable.watchPointId,
                                "data-serverId":creatlistTable.clientServerId
                            };
                            break;
                        default:
                            var arrObj = {
                                "data-ChartUrl":creatlistTable.dataChartUrl,
                                "data-watchPointId":creatlistTable.watchPointId
                            }
                    }
                    $(_chart.drageBox).parents(".drageTable").attr(arrObj);
                    $(_chart.drageBox).empty().append(tBodyelem);
                }
            },
            /*
             * 画出线图功能
             *    creathiLineChart {
             *                所需参数如下
             * @params "chartPlotIds":chartPlotIds,
             * @params "select2AttrC":select2AttrC,
             * @params "dataChartUrl":dataChartUrl,
             * @params "watchpointId":watchpointId,
             * @params "cliSerAttr":cliSerAttr,
             * @params "chartplotTypeIds":chartplotTypeIds,
             * @params "clientServerId":clientServerId
             *      }
             */
            creathiLineChart:function(creathiLineChart){
                var _chartPlotIds = [],
                    sortDomIdarry;
                for(var i=0;i<creathiLineChart.chartPlotIds.length;i++){
                    _chartPlotIds.push(creathiLineChart.chartPlotIds[i])
                }
                switch (creathiLineChart.select2AttrC){
                    /*
                     *此处得重写 难点 两数组比较
                     * 存在图形则不删除
                     * 不存在图形则添加
                     * 用户新选数组 arr1 = [1,3,5];
                     * 页面存在的图形数组 arr2 = [3,8,9]
                     * 定义一个第三方数组 存放不需要删除的图形 arr3
                     * 然后再两两组较 删除重合元素
                     * arr1中剩下元素添加 arr2中剩下的元素删除
                     *
                     *
                     */
                    case "watchPoinSelect":
                        var drawObChart = [],
                            noRemoveChart = [];
                        if($(".draw_ob").length){
                            //$(".draw_ob").remove();
                            var _t =$(".draw_ob");
                            for(var i=0;i<_t.length;i++){
                                drawObChart.push(_t.eq(i).find("._lineChartdb").attr("data-plotid"));
                            }
                            for(var j=0;j<_chartPlotIds.length;j++){
                                for(var i=0;i<drawObChart.length;i++){
                                    if(_chartPlotIds[j]==drawObChart[i]){
                                        noRemoveChart.push(drawObChart[i])
                                    }
                                }
                            }
                            //然后再两两组较 删除重合元素
                            for(var i=0;i<drawObChart.length;i++){
                                for(var j=0;j<noRemoveChart.length;j++){
                                    if(drawObChart[i]==noRemoveChart[j]){
                                        drawObChart.splice(i,1);
                                    }
                                }
                            }
                            for(var i=0;i<_chartPlotIds.length;i++){
                                for(var j=0;j<noRemoveChart.length;j++){
                                    if(_chartPlotIds[i]==noRemoveChart[j]){
                                        _chartPlotIds.splice(i,1)
                                    }
                                }
                            }
                            for(var i=0;i<_t.length;i++){
                                for(var j=0;j<drawObChart.length;j++){
                                    if(_t.eq(i).find("._lineChartdb").attr("data-plotid")==drawObChart[j]){
                                        _t.eq(i).remove();
                                    }
                                }
                            }
                            var domIdArry = [];
                            for(var i=0;i<_t.length;i++){
                                domIdArry.push(_t.eq(i).find("._lineChartdb").children().attr("id").substr(22));
                            }
                            sortDomIdarry = domIdArry.sort(function(a,b){return a-b});
                        }
                        break;
                    case "userSideSelect":
                        //if($(".draw_user").length){
                        //    $(".draw_user").remove();
                        //}
                        var drawObChart = [],
                            noRemoveChart = [];
                        if($(".draw_user").length){
                            //$(".draw_ob").remove();
                            var _t =$(".draw_user");
                            for(var i=0;i<_t.length;i++){
                                drawObChart.push(_t.eq(i).find("._lineChartdb").attr("data-plotid"));
                            }
                            for(var j=0;j<_chartPlotIds.length;j++){
                                for(var i=0;i<drawObChart.length;i++){
                                    if(_chartPlotIds[j]==drawObChart[i]){
                                        noRemoveChart.push(drawObChart[i])
                                    }
                                }
                            }
                            //然后再两两组较 删除重合元素
                            for(var i=0;i<drawObChart.length;i++){
                                for(var j=0;j<noRemoveChart.length;j++){
                                    if(drawObChart[i]==noRemoveChart[j]){
                                        drawObChart.splice(i,1);
                                    }
                                }
                            }
                            for(var i=0;i<_chartPlotIds.length;i++){
                                for(var j=0;j<noRemoveChart.length;j++){
                                    if(_chartPlotIds[i]==noRemoveChart[j]){
                                        _chartPlotIds.splice(i,1)
                                    }
                                }
                            }
                            for(var i=0;i<_t.length;i++){
                                for(var j=0;j<drawObChart.length;j++){
                                    if(_t.eq(i).find("._lineChartdb").attr("data-plotid")==drawObChart[j]){
                                        _t.eq(i).remove();
                                    }
                                }
                            }
                            var domIdArry = [];
                            for(var i=0;i<_t.length;i++){
                                domIdArry.push(_t.eq(i).find("._lineChartdb").children().attr("id").substr(27))
                            }
                            sortDomIdarry = domIdArry.sort(function(a,b){return a-b});
                        }
                        break;
                    case "serverSideSelect":
                        //if($(".draw_serv").length){
                        //    $(".draw_serv").remove();
                        //}
                        var drawObChart = [],
                            noRemoveChart = [];
                        if($(".draw_serv").length){
                            //$(".draw_ob").remove();
                            var _t =$(".draw_serv");
                            for(var i=0;i<_t.length;i++){
                                drawObChart.push(_t.eq(i).find("._lineChartdb").attr("data-plotid"));
                            }
                            for(var j=0;j<_chartPlotIds.length;j++){
                                for(var i=0;i<drawObChart.length;i++){
                                    if(_chartPlotIds[j]==drawObChart[i]){
                                        noRemoveChart.push(drawObChart[i])
                                    }
                                }
                            }
                            //然后再两两组较 删除重合元素
                            for(var i=0;i<drawObChart.length;i++){
                                for(var j=0;j<noRemoveChart.length;j++){
                                    if(drawObChart[i]==noRemoveChart[j]){
                                        drawObChart.splice(i,1);
                                    }
                                }
                            }
                            for(var i=0;i<_chartPlotIds.length;i++){
                                for(var j=0;j<noRemoveChart.length;j++){
                                    if(_chartPlotIds[i]==noRemoveChart[j]){
                                        _chartPlotIds.splice(i,1)
                                    }
                                }
                            }
                            for(var i=0;i<_t.length;i++){
                                for(var j=0;j<drawObChart.length;j++){
                                    if(_t.eq(i).find("._lineChartdb").attr("data-plotid")==drawObChart[j]){
                                        _t.eq(i).remove();
                                    }
                                }
                            }
                            var domIdArry = [];
                            for(var i=0;i<_t.length;i++){
                                domIdArry.push(_t.eq(i).find("._lineChartdb").children().attr("id").substr(29));
                            }
                            sortDomIdarry = domIdArry.sort(function(a,b){return a-b});
                        }
                        break;
                }
                for(var j=0;j<_chartPlotIds.length;j++){
                    //这里面得再次判断id是否有重
                    /*
                     *跟数组 sortDomIdarry 相比较 如果相等
                     * 则新的id为 sortDomIdarry[sortDomIdarry.length-1]-0+_chartPlotIds[j]
                     *
                     *domId,titleId
                     *
                     */
                    var watchpointId = creathiLineChart.select2AttrC=="watchPoinSelect"?
                            $(".selectParam:eq(0)").find("option:selected").attr("data-id"): 1,
                        chartemId = creathiLineChart.select2AttrC=="watchPoinSelect"?"draw_ober_plot_plotype":
                            creathiLineChart.select2AttrC=="userSideSelect"?"draw_ober_user_plot_plotype":
                                "draw_ober_server_plot_plotype",
                        charTitleId = creathiLineChart.select2AttrC=="watchPoinSelect"?"draw_title_ob":
                            creathiLineChart.select2AttrC=="userSideSelect"?"draw_title_user":
                                "draw_title_serv",
                        drawClass = creathiLineChart.select2AttrC=="watchPoinSelect"?"draw_ob":
                            creathiLineChart.select2AttrC=="userSideSelect"?"draw_user":
                                "draw_serv",
                        domId = chartemId+j,
                        titleId = charTitleId+j;
                    if(sortDomIdarry){
                        for(var k=0;k<sortDomIdarry.length;k++){
                            if(j==sortDomIdarry[k]){
                                domId = chartemId + ((sortDomIdarry[sortDomIdarry.length-1]-0+1)+(j-0));
                                titleId = charTitleId + ((sortDomIdarry[sortDomIdarry.length-1]-0+1)+(j-0));
                            }
                        }
                    }
                    var html = '<div class="'+drawClass+' _chartDragBox"' +
                            'style="width: 600px;position: absolute;">'
                            +'<div class="closeBox"></div>'
                            +'<div class="coor" style="z-index: 1;"></div>'
                            +'<div class="title cssMove titleDrage">'
                            +'<h2 class="tile-title" id ='+titleId+'></h2>'
                            +'</div>'
                            +'<div class="linedraw _lineChartdb" ' +
                            'data-ChartUrl="'+creathiLineChart.dataChartUrl+'"' +
                            ' data-watchPointId="'+creathiLineChart.watchpointId+'"' +
                            '  '+creathiLineChart.cliSerAttr +'' +
                            'data-starttime="'+creathiLineChart.starttime+'"  data-endtime="'+creathiLineChart.endtime+'"'+
                            ' data-plotId="'+_chartPlotIds[j]+'" data-plotTypeId="'+creathiLineChart.chartplotTypeIds[j]+'">'
                            +'<div id='+domId+' style="width:100%;height:30em;"></div>'
                            +'</div>'
                            +'</div>',
                        drawCharparem = {
                            "watchpointId":creathiLineChart.watchpointId,
                            "plotId":_chartPlotIds[j],
                            "plotTypeId":creathiLineChart.chartplotTypeIds[j],
                            starttime:creathiLineChart.starttime,
                            endtime:creathiLineChart.endtime
                        };
                    $("#content .block-area").append(html);
                    creathiLineChart.select2AttrC=="serverSideSelect"?drawCharparem.serverId = creathiLineChart.clientServerId:
                        drawCharparem.clientId = creathiLineChart.clientServerId;
                    $.drawHChart(
                        domId,
                        titleId,
                        creathiLineChart.dataChartUrl,
                        drawCharparem
                    );
                    _cockpit.moveElement({
                        eleClass:"."+drawClass,
                        childClass:"svg"
                    });
                }
                _chart.kpiNames = creathiLineChart.chartPlotIds;
            }
        };
        //点击侧边栏出图形在页面中 over 拖拽有bug
        $("#sidebar>ul").on("click",".creatImg",function(){
            var creatClass = $(this).attr("data-className").split("-")[2],//遵循此class作为区分是哪个模块的图片
                imgSrc = "../img/click_lefticon/"+$(this).attr("data-className").split("-")[2]+".png",
                titleText = $(this).children("span").text();
            _cockpit.creatImg({
                creatClass:creatClass,
                imgSrc:imgSrc,
                titleText:titleText
            })
        });
        // 点击.drageBox中的图片弹出对应的模态框 还有点功能未完善
        $("#content .block-area").on("dblclick",".drageBox",function(){
            /*
             * 此处还有一处逻辑未处理
             * 两功能 一 数据列复选框的勾选 dataChecked
             *        二 用户端｜｜服务端  下拉框勾选 wcsIds
             *
             */
            _chart.drageBox = $(this);
            var creatClass = $(this).attr("data-class");
            switch (creatClass){
                case "observationPoint":
                    _chart._kpiSelectM(10,["/watchpointController/getFindAll.do"]);
                    break;
                case "userSide":
                    _chart._kpiSelectM(10,["/watchpointController/getFindAll.do",
                        "/client/getClient.do?moduleId=11"]);
                    break;
                case "serverSide":
                    _chart._kpiSelectM(10,["/watchpointController/getFindAll.do",
                        "/serverManagement/getAllServerSide.do"]);
                    break;
                default:
                    _chart._kpiSelectM(10,["/watchpointController/getFindAll.do"]);
            }
            $("#listDraw").modal("show");
        });
        // 点击模态框确定按钮 生成对应的小列图或hichart图形 over 此处代码也应该可以简化
        $("#list-save_cockpit").click(function(){
            var watchpointId = $(".selectParam:eq(0)").find("option:selected").attr("data-id"),//观察点Id
                clientServerId = $(".selectParam:eq(1)").find("option:selected").attr("data-id"),//客户端或服务端id
                select2AttrC = $(".selectParam:eq(1)").attr("data-class")?
                    $(".selectParam:eq(1)").attr("data-class"):
                    $(".selectParam:eq(0)").attr("data-class"),//此变量用来区分观察点 用户端 服务端 下拉框
                starttime = $.myTime.DateToUnix($.myTime.nowTime())-600,//开始时间
                endtime = $.myTime.DateToUnix($.myTime.nowTime()),//结束时间
                step,//力度
                selectText = $(".selectParam:eq(0)").find("option:selected").text(),//小列表表头名
                kpiNames = [],//勾选的数据列对应的中文名称
                plotTypeIds = [],//数据列复先框typeid
                plotIds = [],//数据列复先框id
                chartPlotIds =[],//图形列复选框id
                chartplotTypeIds =[];//图形列复选框typeid
            $('input[name="litlisChart"]:checked').each(function(){
                chartPlotIds.push($(this).attr("data-plotid"));
                chartplotTypeIds.push($(this).attr("data-plottypeid"));
            });
            $('input[name="litlisDate"]:checked').each(function(index,element){
                plotIds.push($(this).attr("data-id"));
                plotTypeIds.push($(this).attr("data-plottypeid"));
                kpiNames.push($(this).parent("td").prev().prev().text());
            });
            switch (select2AttrC){
                case "userSideSelect":
                case "serverSideSelect":
                    var url = select2AttrC=="userSideSelect"?
                            "/client/getClientSingleValueData.do":
                            "/serverManagement/getServerSideSingleValueData.do",
                        dataChartUrl = select2AttrC=="userSideSelect"?
                            "/client/getClientGraphical.do":
                            "/serverManagement/getServerSideGraphical.do",
                        cliSerAttr = select2AttrC=="userSideSelect"?
                        'data-clientId="'+clientServerId+'"':
                        'data-serverId="'+clientServerId+'"',
                        veCtionResult = watchpointId&&plotIds.length&&clientServerId,
                        charVcRsul = watchpointId&&chartPlotIds&&clientServerId;
                    break;
                default:
                    var url = "/watchpointController/getCrossGridData.do",
                        dataChartUrl = "/watchpointController/getWatchpointGraphical.do",
                        veCtionResult = watchpointId&&plotIds.length,
                        charVcRsul = watchpointId&&chartPlotIds.length;
            }
            //出小列表
            if(veCtionResult){
                $.ajax({
                    url:url,
                    async:false,
                    type:"post",
                    data:{
                        watchpointId:watchpointId,
                        plotIds:String(plotIds),
                        clientId:clientServerId,
                        serverId:clientServerId,
                        starttime:starttime,
                        endtime:endtime,
                        step:step
                    },
                    dataType:"json",
                    success:function(data){
                        var creatlistTableParams = {
                            "isCreatTab":$(_chart.drageBox).attr("class"),
                            "dataChartUrl":dataChartUrl,
                            "url":url,
                            "watchpointId":watchpointId,
                            "cliSerAttr":cliSerAttr,
                            "select2AttrC":select2AttrC,
                            "clientServerId":clientServerId,
                            "selectText":selectText,
                            "dataArry":data.data,
                            "kpiNames":kpiNames,
                            "plotIds":plotIds,
                            "plotTypeIds":plotTypeIds,
                            "dataStarttime":data.starttime,
                            "dataEndtime":data.endtime
                        };
                        _cockpit.creatlistTable(creatlistTableParams);
                    }
                })
            }
            //出线图
            if(charVcRsul){
                var creathiLineChartParams = {
                    "chartPlotIds":chartPlotIds,
                    "select2AttrC":select2AttrC,
                    "dataChartUrl":dataChartUrl,
                    "watchpointId":watchpointId,
                    "cliSerAttr":cliSerAttr,
                    "chartplotTypeIds":chartplotTypeIds,
                    "clientServerId":clientServerId
                };
                _cockpit.creathiLineChart(creathiLineChartParams);
            }
            if(veCtionResult||charVcRsul){
                if($(_chart.drageBox).attr("class")){
                    $(_chart.drageBox).remove();
                }
            }
            $("#listDraw").modal("hide");
        });
        // 点击小列表的编辑按钮 弹出对应的模态框 over
        $("#content .block-area").on("dblclick",".editBox",function(){
            var _t =$(this).parent().find("tr.drageTableth"),
                dataName = _t.attr("data-Name"),
                plotIds = [],
                wcsIds =[],
                watchpointId = _t.attr("data-watchpointId"),
                clientServerId = _t.attr("data-clientServerId")-0,
                SavecheckedId = _t.parent().children(".SavecheckedId");
            if(clientServerId){
                wcsIds.push(watchpointId,clientServerId);
            }else {
                wcsIds.push(watchpointId);
            }
            _chart.drageBox = _t.parent();
            for(var i =0;i<SavecheckedId.length;i++){
                plotIds.push(SavecheckedId.eq(i).attr("data-plotId")-0);
            }
            switch (dataName){
                case "watchPoinSelect":
                    // draw_ob
                    var drawObPlotId = [];
                    for(var j=0;j<$(".draw_ob").length;j++){
                        drawObPlotId.push($(".draw_ob").eq(j).children("._lineChartdb").attr("data-plotid"));
                    }
                    _chart.kpiNames = drawObPlotId;
                    _chart._kpiSelectM(10,
                        ["/watchpointController/getFindAll.do"],
                        plotIds,wcsIds);
                    break;
                case "userSideSelect":
                    //draw_user
                    var draqUserPlotId = [];
                    for(var j=0;j<$(".draw_user").length;j++){
                        draqUserPlotId.push($(".draw_user").eq(j).children("._lineChartdb").attr("data-plotid"));
                    }
                    _chart.kpiNames = draqUserPlotId;
                    _chart._kpiSelectM(10,["/watchpointController/getFindAll.do",
                            "/client/getClient.do?moduleId=11"],
                        plotIds,wcsIds
                    );
                    break;
                case "serverSideSelect":
                    //draw_serv
                    var drawServPlotId = [];
                    for(var j=0;j<$(".draw_serv").length;j++){
                        drawServPlotId.push($(".draw_serv").eq(j).children("._lineChartdb").attr("data-plotid"));
                    }
                    _chart.kpiNames = drawServPlotId;
                    _chart._kpiSelectM(10,["/watchpointController/getFindAll.do",
                            "/serverManagement/getAllServerSide.do"],
                        plotIds,wcsIds
                    );
                    break;
            }
            $("#listDraw").modal("show");
        });
        // 点击表格某行获取对应参数跳转页面生成对应图形 over
        $("#content .block-area").on("dblclick",".drageTabletr",function(){
            var chartUrl = $(this).parents(".drageTable").attr("data-ChartUrl"),
                watchpointId = $(this).parents(".drageTable").attr("data-watchPointId"),
                clientId = $(this).parents(".drageTable").attr("data-clientId"),
                serverId = $(this).parents(".drageTable").attr("data-serverId"),
                plotId = $(this).attr("data-plotId"),
                starttime = $(this).attr("data-starttime"),
                endtime = $(this).attr("data-endtime"),
                plotTypeId = $(this).attr("data-plotTypeId"),
                csParam = clientId?'&clientId='+clientId:
                    serverId?'&serverId='+serverId:"";
            location.href = 'commun_queue.html?' +
                'chartUrl='+chartUrl+'&' +
                'plotId='+plotId+'&' +
                'plotTypeId='+plotTypeId+'&' +
                'watchpointId=1&' +
                'starttime='+starttime+'&' +
                'endtime='+endtime+csParam;
        });
        // 点击页面中的图形获取对应参数跳转页面生成对应图形 over
        $("#content .block-area").on("dblclick","._lineChartdb",function(){
            var chartUrl = $(this).attr("data-ChartUrl"),
                watchpointId = $(this).attr("data-watchPointId"),
                clientId = $(this).attr("data-clientId"),
                serverId = $(this).attr("data-serverId"),
                plotId = $(this).attr("data-plotId"),
            //starttime = $.myTime.DateToUnix($.myTime.nowTime())-600,
                starttime = $(this).attr("data-starttime"),
            //endtime = $.myTime.DateToUnix($.myTime.nowTime()),
                endtime = $(this).attr("data-endtime"),
                plotTypeId = $(this).attr("data-plotTypeId"),
                csParam = clientId?'&clientId='+clientId:
                    serverId?'&serverId='+serverId:"";
            location.href = 'commun_queue.html?' +
                'chartUrl='+chartUrl+'&' +
                'plotId='+plotId+'&' +
                'plotTypeId='+plotTypeId+'&' +
                'watchpointId=1&' +
                'starttime='+starttime+'&' +
                'endtime='+endtime+csParam;
        });
        // 点击左侧侧边栏保存按钮 保存此驾驶仓页面中的图片 小列表 图形
        $(".sa-side-save").click(function(){
            /*
             * 保存有三种元素  1 drageBox 2 drageTable 3 _chartDragBox
             * 共有生成条件 width height left top
             * 生成drageBox条件 creatClass  text
             * 生成drageTable条件 url
             *      watchpointId
             *      plotIds:String(plotIds)
             *      clientId||serverId
             *      starttime
             *      endtime
             *      step
             * 生成_chartDragBox条件
             *      * chartemId+j 盛放图形的容器id domId
             * charTitleId+j 标题id titleId
             * dataChartUrl 画图形的url
             * drawCharparem ｛
             *            watchpointId
             *            plotId
             *            plotTypeId
             *            serverId||clientId
             *               ｝
             *   {
             *   drageBox:[{
             *          style:{
             *             width:"",
             *             height:"",
             *             left:"",
             *             height:""
             *              },
             *           creatClass:"",
             *           text:""
             *            }],
             *  drageTable:[
             *          {
             *          style:{width:"",height:"",left:"",top:""},
             *          url:"",
             *          params:{
             *                watchpointId:"",
             *                plotIds:"",
             *                clientId:"",
             *                serverId:"",
             *                starttime:"",
             *                endtime:"",
             *                step:""
             *              },
             *          attribute:{
             *               data-ChartUrl:""
             *               data-Name:""
             *               data-clientId||data-serverId:""
             *           }
             *           titleText:""
             *          }
             *           ],
             * _chartDragBox:[
             *          {
             *          style:{width:"",height:"",left:"",top:""},
             *          domId:"",
             *          titleId:"",
             *          url:"",
             *          className:"".
             *          params:{
             *              watchpointId
             *              plotId
             *              plotTypeId
             *              serverId||clientId
             *              }
             *          attribute:{
             *                 data-clientId||data-serverId:""
             *               }
             *          }
             *      ]
             *   }
             */
            var contentObj = {
                drageBox:[],
                drageTable:[],
                _lineChartdb:[]
            };
            if($(".drageBox").length){
                for(var i=0;i<$(".drageBox").length;i++){
                    var _t = $(".drageBox").eq(i),
                        _width = _t.width(),
                        _height = _t.height(),
                        _left = _t.position().left,
                        _top = _t.position().top,
                        creatClass = _t.attr("data-class"),
                    //text = _t.text(),
                        imgSrc = _t.children("img").attr("src"),
                        text = _t.children("img").attr("title"),
                        paramsObj = {
                            style:{
                                width:_width,
                                height:_height,
                                left:_left,
                                top:_top
                            },
                            creatClass:creatClass,
                            imgSrc:imgSrc,
                            text:text
                        };
                    contentObj.drageBox.push(paramsObj);
                }
            }
            if($(".drageTable").length){
                for(var i=0;i<$(".drageTable").length;i++){
                    var _t = $(".drageTable").eq(i),
                        plotIds = [],
                        plotTypeIds = [],
                        kpiNames = [];
                    for(var j=0;j<_t.find("tr.SavecheckedId").length;j++){
                        plotIds.push(_t.find("tr.SavecheckedId").eq(j).attr("data-plotId"));
                        plotTypeIds.push(_t.find("tr.SavecheckedId").eq(j).attr("data-plottypeid"));
                        kpiNames.push(_t.find("tr.SavecheckedId").eq(j).children("td").first().text())
                    }
                    var paramsObj = {
                        style:{
                            width:_t.parent(".tableBox").width(),
                            height:_t.parent(".tableBox").height(),
                            left:_t.parent(".tableBox").position().left,
                            top:_t.parent(".tableBox").position().top
                        },
                        url:_t.attr("data-selfUrl"),
                        params:{
                            watchpointId:_t.attr("data-watchPointId"),
                            plotIds:String(plotIds),
                            starttime:_t.find("tr.SavecheckedId").attr("data-starttime"),
                            endtime:_t.find("tr.SavecheckedId").attr("data-endtime"),
                            step:""
                        },
                        attribute:{
                            dataChartUrl:_t.attr("data-ChartUrl"),
                            dataName:_t.find("tr.drageTableth").attr("data-Name")
                        },
                        titleText:_t.find("th").text(),
                        kpiNames:kpiNames,
                        plotIds:plotIds,
                        plotTypeIds:plotTypeIds
                    };
                    _t.attr("data-clientId")&&_t.attr("data-clientId")!="undefined"?
                        paramsObj.attribute.dataClientId = _t.attr("data-clientId"):
                        paramsObj.attribute.dataServerId = _t.attr("data-serverId");
                    if(_t.attr("data-clientId")&&_t.attr("data-clientId")!="undefined"){
                        paramsObj.attribute.dataClientId = _t.attr("data-clientId");
                        paramsObj.params.clientId = _t.attr("data-clientId");
                    }else {
                        paramsObj.attribute.dataServerId = _t.attr("data-serverId");
                        paramsObj.params.serverId = _t.attr("data-serverId");
                    }
                    contentObj.drageTable.push(paramsObj);
                }
            }
            if($("._lineChartdb").length){
                for(var i=0;i<$("._lineChartdb").length;i++){
                    var _t = $("._lineChartdb").eq(i),
                        paramsObj = {
                            style:{
                                width:_t.parents("._chartDragBox").width(),
                                height:_t.parents("._chartDragBox").height(),
                                left:_t.parents("._chartDragBox").position().left,
                                top:_t.parents("._chartDragBox").position().top
                            },
                            domId:_t.children("div").attr("id"),
                            titleId:_t.prev().children("h2").attr("id"),
                            url:_t.attr("data-ChartUrl"),
                            className:_t.parents("._chartDragBox").attr("class"),
                            params:{
                                watchpointId:_t.attr("data-watchPointId"),
                                plotId:_t.attr("data-plotId"),
                                plotTypeId:_t.attr("data-plotTypeId"),
                                starttime:_t.attr("data-starttime"),
                                endtime:_t.attr("data-endtime")
                            },
                            attribute:{
                                dataClientId:_t.attr("data-clientId"),
                                dataServerId:_t.attr("data-serverId")
                            }
                        };
                    _t.attr("data-serverId")?paramsObj.params.serverId = _t.attr("data-serverId"):
                        paramsObj.params.clientId = _t.attr("data-clientId");
                    contentObj._lineChartdb.push(paramsObj);
                }
            }
            $.ajax({
                url:"/viewConfig/updModuleConfig.do",
                type:"post",
                data:{
                    moduleId:0,//默认为0
                    busiId:_cockpit.busiId(),//驾驶仓id
                    content:JSON.stringify(contentObj)
                },
                dataType:"json",
                success:function(data){
                    console.log(data);
                }
            })
        });
        //调用小列表和图形自动刷新
        _cockpit.refreshSmallListOrChart({interTime:10000});
        //当用户点击驾驶仓进入驾驶仓页面时请求之前用户所保存的此驾驶仓的数据 over
        // 此处代码可再减化
        $.ajax({
            url:"/viewConfig/getModuleConfig.do",
            type:"post",
            data:{
                moduleId:0,
                busiId:_cockpit.busiId()
            },
            dataType:"json",
            success:function(data){
                if(data.drageBox.length){
                    //画出drageBox
                    for(var i=0;i<data.drageBox.length;i++){
                        var _tdata = data.drageBox[i],
                            creatClass = _tdata.creatClass,
                            width = _tdata.style.width+"px;",
                            height = _tdata.style.height+"px;",
                            left = _tdata.style.left+"px;",
                            top = _tdata.style.top+"px;",
                            text = _tdata.text,
                            imgSrc = _tdata.imgSrc,
                            style = "width:"+width+"height:"+height+"left:"+left+"top:"+top;
                        $("#content .block-area").append('<div class="drageBox" data-class="'+creatClass+'" style="'+style+'">'+
                            '<div class="coor"></div>'+
                            '<div class="closeBox"></div>'+
                            '<img src="'+imgSrc+'"  title="'+text+'" style="width:'+width+'height:'+height+'">'+
                            '</div>');
                        _cockpit.moveElement({
                            eleClass:".drageBox",
                            childClass:"img"
                        });
                    }
                }
                if(data.drageTable.length){
                    //画出小列表
                    for(var i=0;i<data.drageTable.length;i++){
                        var _tdata = data.drageTable[i],
                            url = _tdata.url,
                            titleText = _tdata.titleText,
                            params = _tdata.params,
                            width = _tdata.style.width+"px;",
                            height = _tdata.style.height+"px;",
                            left = _tdata.style.left+"px;",
                            top = _tdata.style.top+"px;",
                            style = "width:"+width+"height:"+height+"left:"+left+"top:"+top,
                            dataChartUrl = _tdata.attribute.dataChartUrl,
                            dataName = _tdata.attribute.dataName,
                            dataClientId = _tdata.attribute.dataClientId,
                            dataServerId = _tdata.attribute.dataServerId,
                            kpiNames = _tdata.kpiNames,
                            plotIds = _tdata.plotIds,
                            plotTypeIds = _tdata.plotTypeIds,
                            clientServerId = dataClientId?dataClientId:dataServerId;
                        $.ajax({
                            url:url,
                            async:false,
                            type:"post",
                            data:params,
                            dataType:"json",
                            success:function(data){
                                var dataArry = data.data,
                                    tableBox = '<div class="tableBox" style="'+style+'">'+
                                        '<table class="drageTable" border="1" bordercolor="#a9a9a9"' +
                                        ' data-ChartUrl="'+dataChartUrl+'" data-selfUrl="'+url+'" data-watchPointId="'+data.watchPointId+'"' +
                                        ' data-clientId="'+dataClientId+'" data-serverId="'+dataServerId+'">'+
                                        '<tr class="drageTableth" data-Name="'+dataName+'" ' +
                                        'data-watchpointId="'+data.watchPointId+'" data-clientServerId="'+clientServerId+'">'+
                                        '<th  class="text-center cursor" colspan="2">'+titleText+'</th>'+
                                        '</tr>';
                                dataArry.forEach(function(item,index){
                                    var numObj = numForUtil(item.value,item.unit);
                                    for(var i=0;i<kpiNames.length;i++){
                                        if(item.plotName==kpiNames[i]){
                                            tableBox += '<tr class="drageTabletr SavecheckedId" ' +
                                                'data-plotId="'+plotIds[i]+'" data-plotTypeId="'+plotTypeIds[i]+'" ' +
                                                'data-starttime="'+data.starttime+'" data-endtime="'+data.endtime+'">'+
                                                '<td>'+item.plotName+'</td>'+
                                                '<td rowspan="2" style="width:50%;">'+numObj.value+'</td>'+
                                                '</tr>'+
                                                '<tr class="drageTabletr drageTabletrUnit" data-plotId="'+plotIds[i]+'" ' +
                                                'data-plotTypeId="'+plotTypeIds[i]+'" ' +
                                                'data-starttime="'+data.starttime+'" data-endtime="'+data.endtime+'">'+
                                                '<td>'+numObj.unit+'</td>'+
                                                '</tr>'
                                        }
                                    }
                                });
                                tableBox +='<div class="closeBox"></div>'+
                                    '<div class="editBox"></div>'+
                                    '<div class="coor"></div>'+
                                    '</table>'+
                                    '</div>';
                                $("#content .block-area").append($(tableBox));
                                _cockpit.moveElement({
                                    eleClass:".tableBox",
                                    childClass:".drageTable"
                                });
                            }
                        })
                    }
                }
                if(data._lineChartdb.length){
                    //画出图形
                    for(var i=0;i<data._lineChartdb.length;i++){
                        var _tdata = data._lineChartdb[i],
                            url = _tdata.url,
                            titleId = _tdata.titleId,
                            params = _tdata.params,
                            watchpointId = _tdata.params.watchpointId,
                            plotTypeId = _tdata.params.plotTypeId,
                            plotId = _tdata.params.plotId,
                            clientId = _tdata.params.clientId,
                            serverId = _tdata.params.serverId,
                            starttime = _tdata.params.starttime,
                            endtime = _tdata.params.endtime,
                            domId = _tdata.domId,
                            className = _tdata.className,
                            width = _tdata.style.width+"px;",
                            height = _tdata.style.height+"px;",
                            left = _tdata.style.left+"px;",
                            top = _tdata.style.top+"px;",
                            style = "width:"+width+"height:"+height+"left:"+left+"top:"+top;

                        var html = '<div class="'+className+'"' +
                            'style="position: absolute;'+style+'">'
                            +'<div class="closeBox"></div>'
                            +'<div class="coor" style="z-index: 1;"></div>'
                            +'<div class="title cssMove titleDrage">'
                            +'<h2 class="tile-title" id ='+titleId+'></h2>'
                            +'</div>'
                            +'<div class="linedraw _lineChartdb" ' +
                            'data-ChartUrl="'+url+'" data-watchPointId="'+watchpointId+'" ' +
                            ' data-clientId="'+clientId+'" data-serverId="'+serverId+'"' +
                            'data-starttime="'+starttime+'"  data-endtime="'+endtime+'"'+
                            ' data-plotId="'+plotId+'" data-plotTypeId="'+plotTypeId+'">'
                            +'<div id='+domId+' style="width:"'+width+'height:'+height+'"></div>'
                            +'</div>'
                            +'</div>';
                        $("#content .block-area").append(html);
                        $.drawHChart(
                            domId,
                            titleId,
                            url,
                            params
                        );
                        _cockpit.moveElement({
                            eleClass:"._chartDragBox",
                            childClass:"svg"
                        });
                    }
                }
            }
        });
    }
    temp();











  function temp2(){
      var busiId = location.href.split("?")[1].split("=")[1];//此参数仅在保存和请求保存时需要
      function move(eleClass,childClass){
          $(eleClass).mousedown(function(e) {
              var offset = $(this).offset();
              //this.posix = {'x': e.pageX - offset.left, 'y': e.pageY - offset.top};
              //left  top 各自加的数值为此项目中布局的偏差
              this.posix = {'x': e.pageX - offset.left+60, 'y': e.pageY - offset.top+50};
              $.extend(document,
                  {'move': true,
                      'move_target': this
                  });
          }).on("click",".closeBox",function(){
              $(this).parent().remove();
          }).on('mousedown', '.coor', function(e) {
              var _t = $(this).parent();
              var posix = {
                  'w': _t.width(),
                  'h': _t.height(),
                  'x': e.pageX,
                  'y': e.pageY
              };
              $.extend(document,
                  {
                      'move': true,
                      'call_down': function(e) {
                          _t.css({
                              'width': Math.max(30, e.pageX - posix.x + posix.w),
                              'height': Math.max(30, e.pageY - posix.y + posix.h)
                          });
                          if(childClass){
                              if(childClass=="svg"){
                                  _t.find(childClass).css({
                                      'width': Math.max(30, e.pageX - posix.x + posix.w),
                                      'height': Math.max(30, e.pageY - posix.y + posix.h)-27
                                  });
                                  //_t.find(childClass).children("rect").first().attr({
                                  //    'width': Math.max(30, e.pageX - posix.x + posix.w),
                                  //    'height': Math.max(30, e.pageY - posix.y + posix.h)-27
                                  //});
                                  _t.find(".linedraw>div").css({
                                      'width': Math.max(30, e.pageX - posix.x + posix.w),
                                      'height': Math.max(30, e.pageY - posix.y + posix.h)-27
                                  });
                                  _t.find(".linedraw>div>div").css({
                                      'width': Math.max(30, e.pageX - posix.x + posix.w),
                                      'height': Math.max(30, e.pageY - posix.y + posix.h)-27
                                  });
                              }else {
                                  _t.children(childClass).css({
                                      'width': Math.max(30, e.pageX - posix.x + posix.w),
                                      'height': Math.max(30, e.pageY - posix.y + posix.h)
                                  });
                              }
                          }
                      }});
              return false;
          });
      }
      function refreshSmallListOrChart(interTime,clearTimer){
          var timer = setInterval(function(){
              /*
               * url watchpointId
               * plotIds clientId||serverId
               * starttime endtime  step
               *
               */
              if($(".drageTable").length){
                  var $drT = $(".drageTable");
                  for(var i=0;i<$drT.length;i++){
                      var url = $drT.eq(i).attr("data-selfUrl"),
                          watchpointId = $drT.eq(i).attr("data-watchPointId"),
                          clientId = $drT.eq(i).attr("data-clientId"),
                          serverId = $drT.eq(i).attr("data-serverId"),
                          trPlotId = $drT.eq(i).find(".SavecheckedId"),
                          plotIds = [];
                      for(var j=0;j<trPlotId.length;j++){
                          plotIds.push(trPlotId.eq(j).attr("data-plotId"))
                      }
                      var params = {
                          watchpointId:watchpointId,
                          plotIds:String(plotIds)
                          //starttime:starttime,
                          //endtime:endtime,
                          //step:step
                      };
                      if(clientId||serverId){
                          clientId&&clientId!="undefined"?params.clientId = clientId:
                              params.serverId = serverId;
                      }
                      $.ajax({
                          url:url,
                          async:false,
                          type:"post",
                          data:params,
                          dataType:"json",
                          success:function(data){
                              //此处与小列表的name匹配
                              var dataArry = data.data;
                              dataArry.forEach(function(item,index){
                                  var numObj = numForUtil(item.value,item.unit);
                                  for(var i=0;i<trPlotId.length;i++){
                                      if(item.plotName == trPlotId.eq(i).children("td:first").text()){
                                          trPlotId.eq(i).children("td:last").text(numObj.value);
                                          trPlotId.eq(i).next().text(numObj.unit)
                                      }
                                  }
                              })
                          }
                      })
                  }
              }
              /*
               * chartemId+j 盛放图形的容器id domId
               * charTitleId+j 标题id titleId
               * dataChartUrl 画图形的url
               * drawCharparem ｛
               *            watchpointId
               *            plotId
               *            plotTypeId
               *            serverId||clientId
               *               ｝
               *
               */
              if($("._lineChartdb").length){
                  var $lChar = $("._lineChartdb");
                  for(var i=0;i<$lChar.length;i++){
                      //$lChar.eq(i).children().empty();
                      var domId = $lChar.eq(i).children().attr("id"),
                          titleId = $lChar.eq(i).prev("div.titleDrage").children("h2.tile-title").attr("id"),
                          url = $lChar.eq(i).attr("data-ChartUrl"),
                          watchpointId = $lChar.eq(i).attr("data-watchPointId"),
                          plotId = $lChar.eq(i).attr("data-plotId"),
                          plotTypeId = $lChar.eq(i).attr("data-plotTypeId"),
                          serverId = $lChar.eq(i).attr("data-serverId"),
                          clientId = $lChar.eq(i).attr("data-clientId"),
                          starttime = $.myTime.DateToUnix($.myTime.nowTime())-600,
                          endtime = $.myTime.DateToUnix($.myTime.nowTime()),
                          params = {
                              "watchpointId":watchpointId,
                              "plotId":plotId,
                              "plotTypeId":plotTypeId,
                              "starttime":starttime,
                              "endtime":endtime
                          };
                      serverId?params.serverId = serverId:
                          params.clientId = clientId;
                      $lChar.attr({
                          "data-starttime":starttime,
                          "data-endtime":endtime
                      });
                      $.drawHChart(domId,titleId,url,params);
                  }
              }
          },interTime);
          if(clearTimer){
              clearInterval(timer);
          }
      }
      $("#sidebar>ul").on("click",".creatImg",function(){
          var creatClass = $(this).attr("data-className").split("-")[2],
              imgSrc = "../img/click_lefticon/"+creatClass+".png";
          //$("#content .block-area").append('<div class="drageBox" data-class="'+creatClass+'">'+
          //    '<div class="coor"></div>'+
          //    '<div class="closeBox"></div>'+
          //    $(this).children("span").text()+
          //    '</div>');
          $("#content .block-area").append('<div class="drageBox" data-class="'+creatClass+'">'+
              '<div class="coor"></div>'+
              '<div class="closeBox"></div>'+
              '<img src="'+imgSrc+'"  title="'+$(this).children("span").text()+'">'+
              '</div>');
          move(".drageBox","img");
      });
      $("#content .block-area").on("dblclick",".drageBox",function(){
          /*
           * 此处还有一处逻辑未处理
           * 两功能 一 数据列复选框的勾选 dataChecked
           *        二 用户端｜｜服务端  下拉框勾选 wcsIds
           *
           */
          _chart.drageBox = $(this);
          var creatClass = $(this).attr("data-class");
          switch (creatClass){
              case "observationPoint":
                  _chart._kpiSelectM(10,["/watchpointController/getFindAll.do"]);
                  break;
              case "userSide":
                  _chart._kpiSelectM(10,["/watchpointController/getFindAll.do",
                      "/client/getClient.do?moduleId=11"]);
                  break;
              case "serverSide":
                  _chart._kpiSelectM(10,["/watchpointController/getFindAll.do",
                      "/serverManagement/getAllServerSide.do"]);
                  break;
              default:
                  _chart._kpiSelectM(10,["/watchpointController/getFindAll.do"]);
          }
          $("#listDraw").modal("show");
      });
      $("#list-save_cockpit").click(function(){
          var watchpointId = $(".selectParam:eq(0)").find("option:selected").attr("data-id"),
              clientServerId = $(".selectParam:eq(1)").find("option:selected").attr("data-id"),
              select2AttrC = $(".selectParam:eq(1)").attr("data-class")?
                  $(".selectParam:eq(1)").attr("data-class"):
                  $(".selectParam:eq(0)").attr("data-class"),
          //starttime,
          //endtime,
              starttime = $.myTime.DateToUnix($.myTime.nowTime())-600,
              endtime = $.myTime.DateToUnix($.myTime.nowTime()),
              step,
              selectText = $(".selectParam:eq(0)").find("option:selected").text(),
              kpiNames = [],
              plotTypeIds = [],//数据列复先框typeid
              plotIds = [],//数据列复先框id
              chartPlotIds =[],//图形列复选框id
              chartplotTypeIds =[];//图形列复选框typeid
          $('input[name="litlisChart"]:checked').each(function(){
              chartPlotIds.push($(this).attr("data-plotid"));
              chartplotTypeIds.push($(this).attr("data-plottypeid"));
          });
          $('input[name="litlisDate"]:checked').each(function(index,element){
              plotIds.push($(this).attr("data-id"));
              plotTypeIds.push($(this).attr("data-plottypeid"));
              kpiNames.push($(this).parent("td").prev().prev().text());
          });
          switch (select2AttrC){
              case "userSideSelect":
              case "serverSideSelect":
                  var url = select2AttrC=="userSideSelect"?
                          "/client/getClientSingleValueData.do":
                          "/serverManagement/getServerSideSingleValueData.do",
                      dataChartUrl = select2AttrC=="userSideSelect"?
                          "/client/getClientGraphical.do":
                          "/serverManagement/getServerSideGraphical.do",
                      cliSerAttr = select2AttrC=="userSideSelect"?
                      'data-clientId="'+clientServerId+'"':
                      'data-serverId="'+clientServerId+'"',
                      veCtionResult = watchpointId&&plotIds.length&&clientServerId,
                      charVcRsul = watchpointId&&chartPlotIds&&clientServerId;
                  break;
              default:
                  var url = "/watchpointController/getCrossGridData.do",
                      dataChartUrl = "/watchpointController/getWatchpointGraphical.do",
                      veCtionResult = watchpointId&&plotIds.length,
                      charVcRsul = watchpointId&&chartPlotIds.length;
          }
          //出小列表
          if(veCtionResult){
              $.ajax({
                  url:url,
                  async:false,
                  type:"post",
                  data:{
                      watchpointId:watchpointId,
                      plotIds:String(plotIds),
                      clientId:clientServerId,
                      serverId:clientServerId,
                      starttime:starttime,
                      endtime:endtime,
                      step:step
                  },
                  dataType:"json",
                  success:function(data){
                      if($(_chart.drageBox).attr("class")){
                          //console.log(data.watchPointId);
                          //console.log(watchpointId);
                          //console.log(watchpointId==data.watchPointId);
                          var dataArry = data.data,
                              tableBox = '<div class="tableBox">'+
                                  '<table class="drageTable" border="1" bordercolor="#a9a9a9"' +
                                  ' data-ChartUrl="'+dataChartUrl+'" data-selfUrl="'+url+'"' +
                                  ' data-watchPointId="'+data.watchPointId+'"  '+cliSerAttr+'>'+
                                  '<tr class="drageTableth" data-Name="'+select2AttrC+'" ' +
                                  'data-watchpointId="'+watchpointId+'" data-clientServerId="'+clientServerId+'">'+
                                  '<th  class="text-center cursor" colspan="2">'+selectText+'</th>'+
                                  '</tr>';
                          dataArry.forEach(function(item,index){
                              var numObj = numForUtil(item.value,item.unit);
                              for(var i=0;i<kpiNames.length;i++){
                                  if(item.plotName==kpiNames[i]){
                                      tableBox += '<tr class="drageTabletr SavecheckedId" ' +
                                          'data-plotId="'+plotIds[i]+'" data-plotTypeId="'+plotTypeIds[i]+'" ' +
                                          'data-starttime="'+data.starttime+'" data-endtime="'+data.endtime+'">'+
                                          '<td>'+item.plotName+'</td>'+
                                          '<td rowspan="2" style="width:50%;">'+numObj.value+'</td>'+
                                          '</tr>'+
                                          '<tr class="drageTabletr drageTabletrUnit" data-plotId="'+plotIds[i]+'" ' +
                                          'data-plotTypeId="'+plotTypeIds[i]+'" ' +
                                          'data-starttime="'+data.starttime+'" data-endtime="'+data.endtime+'">'+
                                          '<td>'+numObj.unit+'</td>'+
                                          '</tr>'
                                  }
                              }
                          });
                          tableBox +='<div class="closeBox"></div>'+
                              '<div class="editBox"></div>'+
                              '<div class="coor"></div>'+
                              '</table>'+
                              '</div>';
                          $("#content .block-area").append($(tableBox));
                          move(".tableBox",".drageTable");
                      }else{
                          var dataArry = data.data,
                              tBodyelem = '<tr class="drageTableth" data-Name="'+select2AttrC+'" ' +
                                  'data-watchpointId="'+watchpointId+'" data-clientServerId="'+clientServerId+'">'+
                                  '<th  class="text-center cursor" colspan="2">'+selectText+'</th>'+
                                  '</tr>';
                          dataArry.forEach(function(item,index){
                              var numObj = numForUtil(item.value,item.unit);
                              for(var i=0;i<kpiNames.length;i++){
                                  if(item.plotName==kpiNames[i]){
                                      tBodyelem += '<tr class="drageTabletr SavecheckedId" ' +
                                          'data-plotId="'+plotIds[i]+'" data-plotTypeId="'+plotTypeIds[i]+'" ' +
                                          'data-starttime="'+data.starttime+'" data-endtime="'+data.endtime+'">'+
                                          '<td>'+item.plotName+'</td>'+
                                          '<td rowspan="2" style="width:50%;">'+numObj.value+'</td>'+
                                          '</tr>'+
                                          '<tr class="drageTabletr drageTabletrUnit" data-plotId="'+plotIds[i]+'" ' +
                                          'data-plotTypeId="'+plotTypeIds[i]+'" ' +
                                          'data-starttime="'+data.starttime+'" data-endtime="'+data.endtime+'">'+
                                          '<td>'+numObj.unit+'</td>'+
                                          '</tr>'
                                  }
                              }
                          });
                          //修改居属性值
                          switch (select2AttrC){
                              case "userSideSelect":
                                  var arrObj = {
                                      "data-ChartUrl":dataChartUrl,
                                      "data-watchPointId":data.watchPointId,
                                      "data-clientId":clientServerId
                                  };
                                  break;
                              case "serverSideSelect":
                                  var arrObj = {
                                      "data-ChartUrl":dataChartUrl,
                                      "data-watchPointId":data.watchPointId,
                                      "data-serverId":clientServerId
                                  };
                                  break;
                              default:
                                  var arrObj = {
                                      "data-ChartUrl":dataChartUrl,
                                      "data-watchPointId":data.watchPointId
                                  }
                          }
                          $(_chart.drageBox).parents(".drageTable").attr(arrObj);
                          $(_chart.drageBox).empty().append(tBodyelem);
                      }
                  }
              })
          }
          //出线图
          if(charVcRsul){
              var _chartPlotIds = [],
                  sortDomIdarry;
              for(var i=0;i<chartPlotIds.length;i++){
                  _chartPlotIds.push(chartPlotIds[i])
              }
              switch (select2AttrC){
                  /*
                   *此处得重写 难点 两数组比较
                   * 存在图形则不删除
                   * 不存在图形则添加
                   * 用户新选数组 arr1 = [1,3,5];
                   * 页面存在的图形数组 arr2 = [3,8,9]
                   * 定义一个第三方数组 存放不需要删除的图形 arr3
                   * 然后再两两组较 删除重合元素
                   * arr1中剩下元素添加 arr2中剩下的元素删除
                   *
                   *
                   */
                  case "watchPoinSelect":
                      var drawObChart = [],
                          noRemoveChart = [];
                      if($(".draw_ob").length){
                          //$(".draw_ob").remove();
                          var _t =$(".draw_ob");
                          for(var i=0;i<_t.length;i++){
                              drawObChart.push(_t.eq(i).find("._lineChartdb").attr("data-plotid"));
                          }
                          for(var j=0;j<_chartPlotIds.length;j++){
                              for(var i=0;i<drawObChart.length;i++){
                                  if(_chartPlotIds[j]==drawObChart[i]){
                                      noRemoveChart.push(drawObChart[i])
                                  }
                              }
                          }
                          //然后再两两组较 删除重合元素
                          for(var i=0;i<drawObChart.length;i++){
                              for(var j=0;j<noRemoveChart.length;j++){
                                  if(drawObChart[i]==noRemoveChart[j]){
                                      drawObChart.splice(i,1);
                                  }
                              }
                          }
                          for(var i=0;i<_chartPlotIds.length;i++){
                              for(var j=0;j<noRemoveChart.length;j++){
                                  if(_chartPlotIds[i]==noRemoveChart[j]){
                                      _chartPlotIds.splice(i,1)
                                  }
                              }
                          }
                          for(var i=0;i<_t.length;i++){
                              for(var j=0;j<drawObChart.length;j++){
                                  if(_t.eq(i).find("._lineChartdb").attr("data-plotid")==drawObChart[j]){
                                      _t.eq(i).remove();
                                  }
                              }
                          }
                          var domIdArry = [];
                          for(var i=0;i<_t.length;i++){
                              domIdArry.push(_t.eq(i).find("._lineChartdb").children().attr("id").substr(22));
                          }
                          sortDomIdarry = domIdArry.sort(function(a,b){return a-b});
                      }
                      break;
                  case "userSideSelect":
                      //if($(".draw_user").length){
                      //    $(".draw_user").remove();
                      //}
                      var drawObChart = [],
                          noRemoveChart = [];
                      if($(".draw_user").length){
                          //$(".draw_ob").remove();
                          var _t =$(".draw_user");
                          for(var i=0;i<_t.length;i++){
                              drawObChart.push(_t.eq(i).find("._lineChartdb").attr("data-plotid"));
                          }
                          for(var j=0;j<_chartPlotIds.length;j++){
                              for(var i=0;i<drawObChart.length;i++){
                                  if(_chartPlotIds[j]==drawObChart[i]){
                                      noRemoveChart.push(drawObChart[i])
                                  }
                              }
                          }
                          //然后再两两组较 删除重合元素
                          for(var i=0;i<drawObChart.length;i++){
                              for(var j=0;j<noRemoveChart.length;j++){
                                  if(drawObChart[i]==noRemoveChart[j]){
                                      drawObChart.splice(i,1);
                                  }
                              }
                          }
                          for(var i=0;i<_chartPlotIds.length;i++){
                              for(var j=0;j<noRemoveChart.length;j++){
                                  if(_chartPlotIds[i]==noRemoveChart[j]){
                                      _chartPlotIds.splice(i,1)
                                  }
                              }
                          }
                          for(var i=0;i<_t.length;i++){
                              for(var j=0;j<drawObChart.length;j++){
                                  if(_t.eq(i).find("._lineChartdb").attr("data-plotid")==drawObChart[j]){
                                      _t.eq(i).remove();
                                  }
                              }
                          }
                          var domIdArry = [];
                          for(var i=0;i<_t.length;i++){
                              domIdArry.push(_t.eq(i).find("._lineChartdb").children().attr("id").substr(27))
                          }
                          sortDomIdarry = domIdArry.sort(function(a,b){return a-b});
                      }
                      break;
                  case "serverSideSelect":
                      //if($(".draw_serv").length){
                      //    $(".draw_serv").remove();
                      //}
                      var drawObChart = [],
                          noRemoveChart = [];
                      if($(".draw_serv").length){
                          //$(".draw_ob").remove();
                          var _t =$(".draw_serv");
                          for(var i=0;i<_t.length;i++){
                              drawObChart.push(_t.eq(i).find("._lineChartdb").attr("data-plotid"));
                          }
                          for(var j=0;j<_chartPlotIds.length;j++){
                              for(var i=0;i<drawObChart.length;i++){
                                  if(_chartPlotIds[j]==drawObChart[i]){
                                      noRemoveChart.push(drawObChart[i])
                                  }
                              }
                          }
                          //然后再两两组较 删除重合元素
                          for(var i=0;i<drawObChart.length;i++){
                              for(var j=0;j<noRemoveChart.length;j++){
                                  if(drawObChart[i]==noRemoveChart[j]){
                                      drawObChart.splice(i,1);
                                  }
                              }
                          }
                          for(var i=0;i<_chartPlotIds.length;i++){
                              for(var j=0;j<noRemoveChart.length;j++){
                                  if(_chartPlotIds[i]==noRemoveChart[j]){
                                      _chartPlotIds.splice(i,1)
                                  }
                              }
                          }
                          for(var i=0;i<_t.length;i++){
                              for(var j=0;j<drawObChart.length;j++){
                                  if(_t.eq(i).find("._lineChartdb").attr("data-plotid")==drawObChart[j]){
                                      _t.eq(i).remove();
                                  }
                              }
                          }
                          var domIdArry = [];
                          for(var i=0;i<_t.length;i++){
                              domIdArry.push(_t.eq(i).find("._lineChartdb").children().attr("id").substr(29));
                          }
                          sortDomIdarry = domIdArry.sort(function(a,b){return a-b});
                      }
                      break;
              }
              for(var j=0;j<_chartPlotIds.length;j++){
                  //这里面得再次判断id是否有重
                  /*
                   *跟数组 sortDomIdarry 相比较 如果相等
                   * 则新的id为 sortDomIdarry[sortDomIdarry.length-1]-0+_chartPlotIds[j]
                   *
                   *domId,titleId
                   *
                   */

                  var watchpointId = select2AttrC=="watchPoinSelect"?
                          $(".selectParam:eq(0)").find("option:selected").attr("data-id"): 1,
                      chartemId = select2AttrC=="watchPoinSelect"?"draw_ober_plot_plotype":
                          select2AttrC=="userSideSelect"?"draw_ober_user_plot_plotype":
                              "draw_ober_server_plot_plotype",
                      charTitleId = select2AttrC=="watchPoinSelect"?"draw_title_ob":
                          select2AttrC=="userSideSelect"?"draw_title_user":
                              "draw_title_serv",
                      drawClass = select2AttrC=="watchPoinSelect"?"draw_ob":
                          select2AttrC=="userSideSelect"?"draw_user":
                              "draw_serv",
                      domId = chartemId+j,
                      titleId = charTitleId+j;
                  if(sortDomIdarry){
                      for(var k=0;k<sortDomIdarry.length;k++){
                          if(j==sortDomIdarry[k]){
                              domId = chartemId + ((sortDomIdarry[sortDomIdarry.length-1]-0+1)+(j-0));
                              titleId = charTitleId + ((sortDomIdarry[sortDomIdarry.length-1]-0+1)+(j-0));
                          }
                      }
                  }
                  var    html = '<div class="'+drawClass+' _chartDragBox"' +
                          'style="width: 600px;position: absolute;">'
                          +'<div class="closeBox"></div>'
                          +'<div class="coor" style="z-index: 1;"></div>'
                          +'<div class="title cssMove titleDrage">'
                          +'<h2 class="tile-title" id ='+titleId+'></h2>'
                          +'</div>'
                          +'<div class="linedraw _lineChartdb" ' +
                          'data-ChartUrl="'+dataChartUrl+'" data-watchPointId="'+watchpointId+'"  '+cliSerAttr +'' +
                          'data-starttime="'+starttime+'"  data-endtime="'+endtime+'"'+
                          ' data-plotId="'+_chartPlotIds[j]+'" data-plotTypeId="'+chartplotTypeIds[j]+'">'
                          +'<div id='+domId+' style="width:100%;height:30em;"></div>'
                          +'</div>'
                          +'</div>',
                      drawCharparem = {
                          "watchpointId":watchpointId,
                          "plotId":_chartPlotIds[j],
                          "plotTypeId":chartplotTypeIds[j],
                          starttime:starttime,
                          endtime:endtime
                      };
                  $("#content .block-area").append(html);
                  select2AttrC=="serverSideSelect"?drawCharparem.serverId = clientServerId:
                      drawCharparem.clientId = clientServerId;
                  $.drawHChart(
                      //chartemId+j,
                      domId,
                      //charTitleId+j,
                      titleId,
                      dataChartUrl,
                      drawCharparem
                  );
                  move("."+drawClass,"svg");
              }
              _chart.kpiNames = chartPlotIds;
          }
          if(veCtionResult||charVcRsul){
              if($(_chart.drageBox).attr("class")){
                  $(_chart.drageBox).remove();
              }
          }
          $("#listDraw").modal("hide");
      });
      $("#content .block-area").on("dblclick",".editBox",function(){
          var _t =$(this).parent().find("tr.drageTableth"),
              dataName = _t.attr("data-Name"),
              plotIds = [],
              wcsIds =[],
              watchpointId = _t.attr("data-watchpointId"),
              clientServerId = _t.attr("data-clientServerId")-0,
              SavecheckedId = _t.parent().children(".SavecheckedId");
          if(clientServerId){
              wcsIds.push(watchpointId,clientServerId);
          }else {
              wcsIds.push(watchpointId);
          }
          _chart.drageBox = _t.parent();
          for(var i =0;i<SavecheckedId.length;i++){
              plotIds.push(SavecheckedId.eq(i).attr("data-plotId")-0);
          }
          switch (dataName){
              case "watchPoinSelect":
                  // draw_ob
                  var drawObPlotId = [];
                  for(var j=0;j<$(".draw_ob").length;j++){
                      drawObPlotId.push($(".draw_ob").eq(j).children("._lineChartdb").attr("data-plotid"));
                  }
                  _chart.kpiNames = drawObPlotId;
                  _chart._kpiSelectM(10,
                      ["/watchpointController/getFindAll.do"],
                      plotIds,wcsIds);
                  break;
              case "userSideSelect":
                  //draw_user
                  var draqUserPlotId = [];
                  for(var j=0;j<$(".draw_user").length;j++){
                      draqUserPlotId.push($(".draw_user").eq(j).children("._lineChartdb").attr("data-plotid"));
                  }
                  _chart.kpiNames = draqUserPlotId;
                  _chart._kpiSelectM(10,["/watchpointController/getFindAll.do",
                          "/client/getClient.do?moduleId=11"],
                      plotIds,wcsIds
                  );
                  break;
              case "serverSideSelect":
                  //draw_serv
                  var drawServPlotId = [];
                  for(var j=0;j<$(".draw_serv").length;j++){
                      drawServPlotId.push($(".draw_serv").eq(j).children("._lineChartdb").attr("data-plotid"));
                  }
                  _chart.kpiNames = drawServPlotId;
                  _chart._kpiSelectM(10,["/watchpointController/getFindAll.do",
                          "/serverManagement/getAllServerSide.do"],
                      plotIds,wcsIds
                  );
                  break;
          }
          $("#listDraw").modal("show");
      });
      $("#content .block-area").on("dblclick",".drageTabletr",function(){
          var chartUrl = $(this).parents(".drageTable").attr("data-ChartUrl"),
              watchpointId = $(this).parents(".drageTable").attr("data-watchPointId"),
              clientId = $(this).parents(".drageTable").attr("data-clientId"),
              serverId = $(this).parents(".drageTable").attr("data-serverId"),
              plotId = $(this).attr("data-plotId"),
              starttime = $(this).attr("data-starttime"),
              endtime = $(this).attr("data-endtime"),
              plotTypeId = $(this).attr("data-plotTypeId"),
              csParam = clientId?'&clientId='+clientId:
                  serverId?'&serverId='+serverId:"";
          location.href = 'commun_queue.html?' +
              'chartUrl='+chartUrl+'&' +
              'plotId='+plotId+'&' +
              'plotTypeId='+plotTypeId+'&' +
              'watchpointId=1&' +
              'starttime='+starttime+'&' +
              'endtime='+endtime+csParam;
      });
      $("#content .block-area").on("dblclick","._lineChartdb",function(){
          var chartUrl = $(this).attr("data-ChartUrl"),
              watchpointId = $(this).attr("data-watchPointId"),
              clientId = $(this).attr("data-clientId"),
              serverId = $(this).attr("data-serverId"),
              plotId = $(this).attr("data-plotId"),
          //starttime = $.myTime.DateToUnix($.myTime.nowTime())-600,
              starttime = $(this).attr("data-starttime"),
          //endtime = $.myTime.DateToUnix($.myTime.nowTime()),
              endtime = $(this).attr("data-endtime"),
              plotTypeId = $(this).attr("data-plotTypeId"),
              csParam = clientId?'&clientId='+clientId:
                  serverId?'&serverId='+serverId:"";
          location.href = 'commun_queue.html?' +
              'chartUrl='+chartUrl+'&' +
              'plotId='+plotId+'&' +
              'plotTypeId='+plotTypeId+'&' +
              'watchpointId=1&' +
              'starttime='+starttime+'&' +
              'endtime='+endtime+csParam;
      });
      $(".sa-side-save").click(function(){
          /*
           * 保存有三种元素  1 drageBox 2 drageTable 3 _chartDragBox
           * 共有生成条件 width height left top
           * 生成drageBox条件 creatClass  text
           * 生成drageTable条件 url
           *      watchpointId
           *      plotIds:String(plotIds)
           *      clientId||serverId
           *      starttime
           *      endtime
           *      step
           * 生成_chartDragBox条件
           *      * chartemId+j 盛放图形的容器id domId
           * charTitleId+j 标题id titleId
           * dataChartUrl 画图形的url
           * drawCharparem ｛
           *            watchpointId
           *            plotId
           *            plotTypeId
           *            serverId||clientId
           *               ｝
           *   {
           *   drageBox:[{
           *          style:{
           *             width:"",
           *             height:"",
           *             left:"",
           *             height:""
           *              },
           *           creatClass:"",
           *           text:""
           *            }],
           *  drageTable:[
           *          {
           *          style:{width:"",height:"",left:"",top:""},
           *          url:"",
           *          params:{
           *                watchpointId:"",
           *                plotIds:"",
           *                clientId:"",
           *                serverId:"",
           *                starttime:"",
           *                endtime:"",
           *                step:""
           *              },
           *          attribute:{
           *               data-ChartUrl:""
           *               data-Name:""
           *               data-clientId||data-serverId:""
           *           }
           *           titleText:""
           *          }
           *           ],
           * _chartDragBox:[
           *          {
           *          style:{width:"",height:"",left:"",top:""},
           *          domId:"",
           *          titleId:"",
           *          url:"",
           *          className:"".
           *          params:{
           *              watchpointId
           *              plotId
           *              plotTypeId
           *              serverId||clientId
           *              }
           *          attribute:{
           *                 data-clientId||data-serverId:""
           *               }
           *          }
           *      ]
           *   }
           */
          var contentObj = {
              drageBox:[],
              drageTable:[],
              _lineChartdb:[]
          };
          if($(".drageBox").length){
              for(var i=0;i<$(".drageBox").length;i++){
                  var _t = $(".drageBox").eq(i),
                      _width = _t.width(),
                      _height = _t.height(),
                      _left = _t.position().left,
                      _top = _t.position().top,
                      creatClass = _t.attr("data-class"),
                  //text = _t.text(),
                      imgSrc = _t.children("img").attr("src"),
                      text = _t.children("img").attr("title"),
                      paramsObj = {
                          style:{
                              width:_width,
                              height:_height,
                              left:_left,
                              top:_top
                          },
                          creatClass:creatClass,
                          imgSrc:imgSrc,
                          text:text
                      };
                  contentObj.drageBox.push(paramsObj);
              }
          }
          if($(".drageTable").length){
              for(var i=0;i<$(".drageTable").length;i++){
                  var _t = $(".drageTable").eq(i),
                      plotIds = [],
                      plotTypeIds = [],
                      kpiNames = [];
                  for(var j=0;j<_t.find("tr.SavecheckedId").length;j++){
                      plotIds.push(_t.find("tr.SavecheckedId").eq(j).attr("data-plotId"));
                      plotTypeIds.push(_t.find("tr.SavecheckedId").eq(j).attr("data-plottypeid"));
                      kpiNames.push(_t.find("tr.SavecheckedId").eq(j).children("td").first().text())
                  }
                  var paramsObj = {
                      style:{
                          width:_t.parent(".tableBox").width(),
                          height:_t.parent(".tableBox").height(),
                          left:_t.parent(".tableBox").position().left,
                          top:_t.parent(".tableBox").position().top
                      },
                      url:_t.attr("data-selfUrl"),
                      params:{
                          watchpointId:_t.attr("data-watchPointId"),
                          plotIds:String(plotIds),
                          starttime:_t.find("tr.SavecheckedId").attr("data-starttime"),
                          endtime:_t.find("tr.SavecheckedId").attr("data-endtime"),
                          step:""
                      },
                      attribute:{
                          dataChartUrl:_t.attr("data-ChartUrl"),
                          dataName:_t.find("tr.drageTableth").attr("data-Name")
                      },
                      titleText:_t.find("th").text(),
                      kpiNames:kpiNames,
                      plotIds:plotIds,
                      plotTypeIds:plotTypeIds
                  };
                  _t.attr("data-clientId")&&_t.attr("data-clientId")!="undefined"?
                      paramsObj.attribute.dataClientId = _t.attr("data-clientId"):
                      paramsObj.attribute.dataServerId = _t.attr("data-serverId");
                  if(_t.attr("data-clientId")&&_t.attr("data-clientId")!="undefined"){
                      paramsObj.attribute.dataClientId = _t.attr("data-clientId");
                      paramsObj.params.clientId = _t.attr("data-clientId");
                  }else {
                      paramsObj.attribute.dataServerId = _t.attr("data-serverId");
                      paramsObj.params.serverId = _t.attr("data-serverId");
                  }
                  contentObj.drageTable.push(paramsObj);
              }
          }
          if($("._lineChartdb").length){
              for(var i=0;i<$("._lineChartdb").length;i++){
                  var _t = $("._lineChartdb").eq(i),
                      paramsObj = {
                          style:{
                              width:_t.parents("._chartDragBox").width(),
                              height:_t.parents("._chartDragBox").height(),
                              left:_t.parents("._chartDragBox").position().left,
                              top:_t.parents("._chartDragBox").position().top
                          },
                          domId:_t.children("div").attr("id"),
                          titleId:_t.prev().children("h2").attr("id"),
                          url:_t.attr("data-ChartUrl"),
                          className:_t.parents("._chartDragBox").attr("class"),
                          params:{
                              watchpointId:_t.attr("data-watchPointId"),
                              plotId:_t.attr("data-plotId"),
                              plotTypeId:_t.attr("data-plotTypeId"),
                              starttime:_t.attr("data-starttime"),
                              endtime:_t.attr("data-endtime")
                          },
                          attribute:{
                              dataClientId:_t.attr("data-clientId"),
                              dataServerId:_t.attr("data-serverId")
                          }
                      };
                  _t.attr("data-serverId")?paramsObj.params.serverId = _t.attr("data-serverId"):
                      paramsObj.params.clientId = _t.attr("data-clientId");
                  contentObj._lineChartdb.push(paramsObj);
              }
          }
          $.ajax({
              url:"/viewConfig/updModuleConfig.do",
              type:"post",
              data:{
                  moduleId:0,//默认为0
                  busiId:busiId,//驾驶仓id
                  content:JSON.stringify(contentObj)
              },
              dataType:"json",
              success:function(data){
                  console.log(data);
              }
          })
      });
      /*-------------小列表和图形自动刷新--------------*/
      refreshSmallListOrChart(10000);
      /*-------------画出保存图形-------------------------**/
      $.ajax({
          url:"/viewConfig/getModuleConfig.do",
          type:"post",
          data:{
              moduleId:0,
              busiId:busiId
          },
          dataType:"json",
          success:function(data){
              if(data.drageBox.length){
                  //画出drageBox
                  for(var i=0;i<data.drageBox.length;i++){
                      var _tdata = data.drageBox[i],
                          creatClass = _tdata.creatClass,
                          width = _tdata.style.width+"px;",
                          height = _tdata.style.height+"px;",
                          left = _tdata.style.left+"px;",
                          top = _tdata.style.top+"px;",
                          text = _tdata.text,
                          imgSrc = _tdata.imgSrc,
                          style = "width:"+width+"height:"+height+"left:"+left+"top:"+top;
                      $("#content .block-area").append('<div class="drageBox" data-class="'+creatClass+'" style="'+style+'">'+
                          '<div class="coor"></div>'+
                          '<div class="closeBox"></div>'+
                          '<img src="'+imgSrc+'"  title="'+text+'" style="width:'+width+'height:'+height+'">'+
                          '</div>');
                      move(".drageBox","img");
                  }
              }
              if(data.drageTable.length){
                  //画出小列表
                  for(var i=0;i<data.drageTable.length;i++){
                      var _tdata = data.drageTable[i],
                          url = _tdata.url,
                          titleText = _tdata.titleText,
                          params = _tdata.params,
                          width = _tdata.style.width+"px;",
                          height = _tdata.style.height+"px;",
                          left = _tdata.style.left+"px;",
                          top = _tdata.style.top+"px;",
                          style = "width:"+width+"height:"+height+"left:"+left+"top:"+top,
                          dataChartUrl = _tdata.attribute.dataChartUrl,
                          dataName = _tdata.attribute.dataName,
                          dataClientId = _tdata.attribute.dataClientId,
                          dataServerId = _tdata.attribute.dataServerId,
                          kpiNames = _tdata.kpiNames,
                          plotIds = _tdata.plotIds,
                          plotTypeIds = _tdata.plotTypeIds,
                          clientServerId = dataClientId?dataClientId:dataServerId;
                      $.ajax({
                          url:url,
                          async:false,
                          type:"post",
                          data:params,
                          //data:{
                          //    watchpointId:watchpointId,
                          //    plotIds:String(plotIds),
                          //    clientId:clientServerId,
                          //    serverId:clientServerId,
                          //    starttime:starttime,
                          //    endtime:endtime,
                          //    step:step
                          //},
                          dataType:"json",
                          success:function(data){
                              var dataArry = data.data,
                                  tableBox = '<div class="tableBox" style="'+style+'">'+
                                      '<table class="drageTable" border="1" bordercolor="#a9a9a9"' +
                                      ' data-ChartUrl="'+dataChartUrl+'" data-selfUrl="'+url+'" data-watchPointId="'+data.watchPointId+'"' +
                                      ' data-clientId="'+dataClientId+'" data-serverId="'+dataServerId+'">'+
                                      '<tr class="drageTableth" data-Name="'+dataName+'" ' +
                                      'data-watchpointId="'+data.watchPointId+'" data-clientServerId="'+clientServerId+'">'+
                                      '<th  class="text-center cursor" colspan="2">'+titleText+'</th>'+
                                      '</tr>';
                              dataArry.forEach(function(item,index){
                                  var numObj = numForUtil(item.value,item.unit);
                                  for(var i=0;i<kpiNames.length;i++){
                                      if(item.plotName==kpiNames[i]){
                                          tableBox += '<tr class="drageTabletr SavecheckedId" ' +
                                              'data-plotId="'+plotIds[i]+'" data-plotTypeId="'+plotTypeIds[i]+'" ' +
                                              'data-starttime="'+data.starttime+'" data-endtime="'+data.endtime+'">'+
                                              '<td>'+item.plotName+'</td>'+
                                              '<td rowspan="2" style="width:50%;">'+numObj.value+'</td>'+
                                              '</tr>'+
                                              '<tr class="drageTabletr drageTabletrUnit" data-plotId="'+plotIds[i]+'" ' +
                                              'data-plotTypeId="'+plotTypeIds[i]+'" ' +
                                              'data-starttime="'+data.starttime+'" data-endtime="'+data.endtime+'">'+
                                              '<td>'+numObj.unit+'</td>'+
                                              '</tr>'
                                      }
                                  }
                              });
                              tableBox +='<div class="closeBox"></div>'+
                                  '<div class="editBox"></div>'+
                                  '<div class="coor"></div>'+
                                  '</table>'+
                                  '</div>';
                              $("#content .block-area").append($(tableBox));
                              move(".tableBox",".drageTable");
                          }
                      })
                  }
              }
              if(data._lineChartdb.length){
                  //画出图形
                  for(var i=0;i<data._lineChartdb.length;i++){
                      var _tdata = data._lineChartdb[i],
                          url = _tdata.url,
                          titleId = _tdata.titleId,
                          params = _tdata.params,
                          watchpointId = _tdata.params.watchpointId,
                          plotTypeId = _tdata.params.plotTypeId,
                          plotId = _tdata.params.plotId,
                          clientId = _tdata.params.clientId,
                          serverId = _tdata.params.serverId,
                          starttime = _tdata.params.starttime,
                          endtime = _tdata.params.endtime,
                          domId = _tdata.domId,
                          className = _tdata.className,
                          width = _tdata.style.width+"px;",
                          height = _tdata.style.height+"px;",
                          left = _tdata.style.left+"px;",
                          top = _tdata.style.top+"px;",
                          style = "width:"+width+"height:"+height+"left:"+left+"top:"+top;

                      var html = '<div class="'+className+'"' +
                          'style="position: absolute;'+style+'">'
                          +'<div class="closeBox"></div>'
                          +'<div class="coor" style="z-index: 1;"></div>'
                          +'<div class="title cssMove titleDrage">'
                          +'<h2 class="tile-title" id ='+titleId+'></h2>'
                          +'</div>'
                          +'<div class="linedraw _lineChartdb" ' +
                          'data-ChartUrl="'+url+'" data-watchPointId="'+watchpointId+'" ' +
                          ' data-clientId="'+clientId+'" data-serverId="'+serverId+'"' +
                          'data-starttime="'+starttime+'"  data-endtime="'+endtime+'"'+
                          ' data-plotId="'+plotId+'" data-plotTypeId="'+plotTypeId+'">'
                          +'<div id='+domId+' style="width:"'+width+'height:'+height+'"></div>'
                          +'</div>'
                          +'</div>';
                      /*   drawCharparem = {
                       "watchpointId":watchpointId,
                       "plotId":chartPlotIds[j],
                       "plotTypeId":chartplotTypeIds[j],
                       starttime:starttime,
                       endtime:endtime
                       };*/
                      $("#content .block-area").append(html);
                      /*           select2AttrC=="serverSideSelect"?drawCharparem.serverId = clientServerId:
                       drawCharparem.clientId = clientServerId;*/
                      $.drawHChart(
                          domId,
                          titleId,
                          url,
                          params
                      );
                      move("._chartDragBox","svg");
                  }
              }
          }
      });
  }
    //temp2();
});