/**
 * Created by yanb on 2017/10/24.
 */
var obPointkpi = {
    clickTableRow:function(tableName,rowId,element,appBusinessId){
        var watchPointId;
        if(!$("#table7 .tabRowClickbg").attr("data-id")){
            $.ajax({
                url:"/commonController/getNpmListRrdData.do",
                type:"post",
                async:false,
                data:{"moduleId":10},
                dataType:"json",
                success:function(data){
                    watchPointId = data[0].id;
                }
            })
        }else {
            watchPointId = $("#table7 .tabRowClickbg").attr("data-id")
        }
        function updataUser(moduleId,url,watchPointId,appBusinessId){
            $("#userSidekpi").bootstrapTable("showLoading");
            $(".fixed-table-loading").css("line-height",$(".fixed-table-loading").height()+"px");
            $.ajax({
                url:url,
                type:"post",
                data:{
                    "moduleId":moduleId,
                    "watchPointId":watchPointId,
                    "appBusinessId":appBusinessId,
                    "starttime":1505892630,
                    "endtime":1505960881
                },
                dataType:"json",
                success:function(data){
                    $("#userSidekpi").bootstrapTable("hideLoading");
                    $("#userSidekpi").bootstrapTable("load",data);
                }
            });
        }
        function updataServer(moduleId,url,watchPointId,appBusinessId){
            $("#serverSidekpi").bootstrapTable("showLoading");
            $(".fixed-table-loading").css("line-height",$(".fixed-table-loading").height()+"px");
            $.ajax({
                url:url,
                type:"post",
                data:{
                    "moduleId":moduleId,
                    "watchPointId":watchPointId,
                    "appBusinessId":appBusinessId,
                    "starttime":1505892630,
                    "endtime":1505960881
                },
                dataType:"json",
                success:function(data){
                    $("#serverSidekpi").bootstrapTable("hideLoading");
                    $("#serverSidekpi").bootstrapTable("load",data);
                }
            })
        }
        switch (tableName){
            case "userSidekpi":
                $("#"+tableName+" .tabRowClickbg").removeClass("tabRowClickbg");
                $(element).addClass("tabRowClickbg");
                updataServer(11,
                    "/commonController/getNpmListRrdDataBySubPath.do",
                    watchPointId,
                    appBusinessId);
                break;
            case "serverSidekpi":
                $("#"+tableName+" .tabRowClickbg").removeClass("tabRowClickbg");
                $(element).addClass("tabRowClickbg");
                updataUser(12,
                    "/commonController/getNpmListRrdDataBySubPath.do",
                    watchPointId,
                    appBusinessId);
                break;
            default:
                $(".tabRowClickbg").removeClass("tabRowClickbg").removeAttr("data-id");
                $(element).addClass("tabRowClickbg").attr("data-id",rowId);
                updataUser(11,
                    "commonController/getNpmListRrdData.do",
                    rowId
                );
                updataServer(12,
                    "commonController/getNpmListRrdData.do",
                    rowId
                );
                break;
        }
    },
    modulkpi:function(userColumnurl,modolkpiurl,tableId,ajaxData,selectRow,
                      selectDataId,clickBoolean,watchPointIndex){
        //watPointClickBoolean,userSideClickBoolean,serverSideClickBoolean
        $.ajax({
            url:userColumnurl,
            type:"post",
            data:"",
            dataType:"json",
            success:function(data){
                var columnsArry = [];
                data.forEach(function(title){
                    if(title.columnen!="id"){
                        var colObjet = {
                            field:title.columnen,
                            title:title.columnzh+"<span data-columnId='"+title.id+"'></span>",
                            sortable:true,
                            visible:title.checked
                        };
                        columnsArry.push(colObjet);
                    }
                });
                $(tableId).bootstrapTable({
                    url:modolkpiurl,
                    queryParams:function(params){
                        return ajaxData;
                    },
                    toggle:"table",
                    pagination:true,
                    showColumns:true,
                    showExport:true,
                    search:true,
                    columns:columnsArry,
                    onClickRow:function(data,rowElement){
                        if(clickBoolean){
                            switch (tableId){
                                case "#table7":
                                    obPointkpi.clickTableRow(null,data.id,rowElement);
                                    break;
                                case "#userSidekpi":
                                    obPointkpi.clickTableRow("userSidekpi", null,rowElement,data.id);
                                    selectDataId = data.id;
                                    _chart._createChart(11,selectDataId);
                                    break;
                                case "#serverSidekpi":
                                    obPointkpi.clickTableRow("serverSidekpi",
                                        null,
                                        rowElement,
                                        data.id);
                                    selectDataId = data.id;
                                    _chart._createChart(12,selectDataId);
                                    //console.log(3);
                                    break;
                            }
                        }

                        function temp3(){
                            if(watPointClickBoolean){
                                obPointkpi.clickTableRow(null,data.id,rowElement);
                            }
                            if(userSideClickBoolean){
                                obPointkpi.clickTableRow("userSidekpi", null,rowElement,data.id);
                                selectDataId = data.id;
                                _chart._createChart(11,selectDataId);
                            }
                        }
                        function temp2(){
                            if(watPointClickBoolean){
                                if(tableId=="#table7"){
                                    obPointkpi.clickTableRow(null,data.id,rowElement);
                                }
                            }
                            if(userSideClickBoolean){
                                if(tableId=="#userSidekpi"){
                                    obPointkpi.clickTableRow("userSidekpi", null,rowElement,data.id);
                                    selectDataId = data.id;
                                    _chart._createChart(11,selectDataId);
                                }
                            }
                        }
                        function temp(){
                            if(tableId=="#table7"){
                                obPointkpi.clickTableRow(null,data.id,rowElement);
                            }else if(tableId=="#userSidekpi"){
                                obPointkpi.clickTableRow("userSidekpi", null,rowElement,data.id);
                                selectDataId = data.id;
                                _chart._createChart(11,selectDataId);
                            }
                        }
                    },
                    onColumnSwitch:function(field,checked){
                        $.ajax({
                            url:userColumnurl,
                            type:"post",
                            data:"",
                            dataType:"json",
                            success:function(culumnData){
                                culumnData.forEach(function(item,index){
                                    if(item.columnen==field){
                                        $.ajax({
                                            url:checked?"userConfigure/checkedUserListColumn.do":
                                                "userConfigure/unCheckedUserListColumn.do",
                                            type:"post",
                                            data:{columnId:item.id},
                                            dataType:"text",
                                            success:function(data){
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    },
                    rowStyle:function(row,index){
                        if(clickBoolean){
                            switch (tableId){
                                case "#table7":
                                    if(watchPointIndex){
                                        if(index==watchPointIndex){
                                            return {classes:"tabRowClickbg"}
                                        }
                                    }else {
                                        if(index==0){
                                            return {classes:"tabRowClickbg"}
                                        }
                                    }
                                    break;
                                case "#userSidekpi":
                                    if(index==selectRow){
                                        return {classes:"tabRowClickbg"}
                                    }
                                    break;
                                case "#serverSidekpi":
                                    if(index==selectRow){
                                        return {classes:"tabRowClickbg"}
                                    }
                                    break;
                            }
                        }
                        function temp(){
                            if(tableId=="#table7"){
                                if(index==0){
                                    return {classes:"tabRowClickbg"}
                                }
                            }
                            if(tableId=="#userSidekpi"){
                                if(index==selectRow){
                                    return {classes:"tabRowClickbg"}
                                }
                            }
                            if(tableId=="#serverSidekpi"){
                                if(index==selectRow){
                                    return {classes:"tabRowClickbg"}
                                }
                            }
                        }
                        return "";
                    },
                    onLoadSuccess:function(data){
                        if(selectRow>9){
                            $("#userSidekpi").bootstrapTable('selectPage', Math.ceil((selectRow+1)/10));
                        }
                    }
                });
            }
        });
    }
};