/**
 * Created by yanbo on 2017/10/9.
 * 操作表格 增删改
 *
 * 初始化js条件
 * <script src="js/jquery.min.js"></script>
 * <script src="js/bootstrap.min.js"></script>
 * <script src="js/bstable/bootstrap-table.js"></script>
 * <script src="js/bstable/bootstrap-table-zh-CN.js"></script>
 */
$(function(){
    var bsTable = {
        /**
         * @param page 某个页面
         * @param tableId    example:#table2
         * @param iniurl   example:/monitor/getMonitorViewList.do
         * @param toolbarId    example:#btnAddRemove
         * @param fieldArry Array
         * @param titleArry Array
         **/
        initializ:function(tableId,iniurl,toolbarId,fieldArry,titleArry,page){
            var columnsArry = [];
            fieldArry.forEach(function(item,index){
                //only cockpitmanage
                if(page){
                    if(item=="updateTime"){
                        var colObject = {
                            field:item,
                            title:titleArry[index],
                            formatter:function(value,row,index){
                                return bsTable.getLocalTime(value);
                            },
                            sortable:true
                        };
                    }else if(item=="lockStatus"){
                        var colObject = {
                            field:item,
                            title:titleArry[index],
                            formatter:function(value,row,index){
                                if(value){
                                    return "锁定";
                                }else {
                                    return "未锁定";
                                }
                            },
                            sortable:true
                        };
                    }else {
                        var colObject = {
                            field:item,
                            title:titleArry[index],
                            sortable:true
                        };
                    }
                    columnsArry.push(colObject);
                }else {
                    var colObject = {
                        field:item,
                        title:titleArry[index],
                        sortable:true
                    };
                    columnsArry.push(colObject);
                }
            });
            $(tableId).bootstrapTable({
                toggle:"table",
                url:iniurl,
                toolbar:toolbarId,
                pagination:true,
                showColumns:true,
                columns:columnsArry,
                onClickRow:function(e,row){
                    $(".tabRowClickbg").removeClass("tabRowClickbg");
                    $(row).addClass("tabRowClickbg");
                }
            });
        },
        verification:function(str){
            /*验证用户名 将一个汉字转换成两个字符*/
            var totalCount = 0;
            for (var i=0; i<str.length; i++){
                var c = str.charCodeAt(i);
                if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)){
                    totalCount++;
                }else{
                    totalCount+=2;
                }
            }
            if(totalCount){
                if(totalCount<32){
                    return true;
                }else {
                    return false;
                }
            }else {
                return false;
            }
        },
        watPointVerif:function(element){
            var did = [],didId = [],vid =[],lid=[],
                strName = $("#"+element+" .addtableRowInput").val();
            for(var k=0;k<$("#"+element+" .chzn-choices").eq(0).children(".search-choice").length;k++){
                did.push($("#"+element+" .chzn-choices").eq(0).children(".search-choice").eq(k).children("span").text());
            }
            var optionArry = $("#"+element+" .chzn-choices").eq(0).parent().prev().children("option");
            for(var i=0;i<did.length;i++){
                for(var j=0;j<optionArry.length;j++){
                    if(did[i]==optionArry.eq(j).text()){
                        didId.push(optionArry.eq(j).attr("value"))
                    }
                }
            }
            for(var k=0;k<$("#"+element+" .chzn-choices").eq(1).children(".search-choice").length;k++){
                vid.push($("#"+element+" .chzn-choices").eq(1).children(".search-choice").eq(k).children("span").text());
            }
            for(var k=0;k<$("#"+element+" .chzn-choices").eq(2).children(".search-choice").length;k++){
                lid.push($("#"+element+" .chzn-choices").eq(2).children(".search-choice").eq(k).children("span").text());
            }
            var result = bsTable.verification(strName)
                &&String(did).length
                &&String(vid).length
                &&String(lid).length;
            return {
                "result":result,
                "did":String(didId),
                "didProtype":String(did),
                "vid":String(vid),
                "lid":String(lid)
            };
        },
        userValiDate:function(element){
            var name = $("#"+element+"-modal .addtableRowInput:eq(0)").val();
            if(!bsTable.verification(name)){
                alert("名称应小于32个字符且不能为空");
                return false;
            }
            var regex = /^\s*((([0-9A-Fa-f]{1,4}:){7}(([0-9A-Fa-f]{1,4})|:))|(([0-9A-Fa-f]{1,4}:){6}(:|((25[0-5]|2[0-4]\d|[01]?\d{1,2})(\.(25[0-5]|2[0-4]\d|[01]?\d{1,2})){3})|(:[0-9A-Fa-f]{1,4})))|(([0-9A-Fa-f]{1,4}:){5}((:((25[0-5]|2[0-4]\d|[01]?\d{1,2})(\.(25[0-5]|2[0-4]\d|[01]?\d{1,2})){3})?)|((:[0-9A-Fa-f]{1,4}){1,2})))|(([0-9A-Fa-f]{1,4}:){4}(:[0-9A-Fa-f]{1,4}){0,1}((:((25[0-5]|2[0-4]\d|[01]?\d{1,2})(\.(25[0-5]|2[0-4]\d|[01]?\d{1,2})){3})?)|((:[0-9A-Fa-f]{1,4}){1,2})))|(([0-9A-Fa-f]{1,4}:){3}(:[0-9A-Fa-f]{1,4}){0,2}((:((25[0-5]|2[0-4]\d|[01]?\d{1,2})(\.(25[0-5]|2[0-4]\d|[01]?\d{1,2})){3})?)|((:[0-9A-Fa-f]{1,4}){1,2})))|(([0-9A-Fa-f]{1,4}:){2}(:[0-9A-Fa-f]{1,4}){0,3}((:((25[0-5]|2[0-4]\d|[01]?\d{1,2})(\.(25[0-5]|2[0-4]\d|[01]?\d{1,2})){3})?)|((:[0-9A-Fa-f]{1,4}){1,2})))|(([0-9A-Fa-f]{1,4}:)(:[0-9A-Fa-f]{1,4}){0,4}((:((25[0-5]|2[0-4]\d|[01]?\d{1,2})(\.(25[0-5]|2[0-4]\d|[01]?\d{1,2})){3})?)|((:[0-9A-Fa-f]{1,4}){1,2})))|(:(:[0-9A-Fa-f]{1,4}){0,5}((:((25[0-5]|2[0-4]\d|[01]?\d{1,2})(\.(25[0-5]|2[0-4]\d|[01]?\d{1,2})){3})?)|((:[0-9A-Fa-f]{1,4}){1,2})))|(((25[0-5]|2[0-4]\d|[01]?\d{1,2})(\.(25[0-5]|2[0-4]\d|[01]?\d{1,2})){3})))(%.+)?\s*$/;
            var displayIp = $("#"+element+"-modal .addtableRowInput:eq(1)").val();
            if(displayIp.indexOf("/")>-1 ){
                if(displayIp.split("/")[1]<24){
                    alert("只能添加C类网段！");
                    return false;
                }else if(regex.test(displayIp.split("/")[0])){

                }else if (displayIp.split("/")[1]>32){
                    alert("子网掩码错误！");
                    return false;
                }else{
                    alert("网段不正确，请重新输入 ！");
                    return false;
                }
            } else {
                alert("网段不正确，请重新输入 ！");
                return false;
            }
            if(displayIp.indexOf("-")>-1){
                if(regex.test(displayIp.indexOf("-")[0]) || regex.test(displayIp.indexOf("-")[1])){

                }else{
                    alert("网段不正确，请重新输入 ！");
                    return false;
                }
            }
            var bandWidth = $("#"+element+"-modal .addtableRowInput:eq(2)").val();
            var p =/^[0-9]{1,20}$/;
            if(!p.test(bandWidth)){
                alert("带宽只能为数字");
                return false;
            }else if (bandWidth=="0"|| bandWidth== ""){
                alert("带宽不能为空或者0");
                return false;
            }
            return true;
        },
        servValiDate:function(serverIpVal){
            var serverBoolan = true,
                serverIp = serverIpVal,
                regIp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;//验证IP的合法性
            for(var i=0;i<serverIp.split(",").length;i++){
                var serIpChild = serverIp.split(",")[i];
                if(serIpChild.split(":").length-1){
                    if(serIpChild.split("-").length>3){
                        serverBoolan = false;
                    }else {
                        switch (serIpChild.split("-").length){
                            case 1:
                                //192.168.1.1:80
                                if(!(regIp.test(serIpChild.split(":")[0])&&serIpChild.split(":")[1]<=65535)){
                                    serverBoolan = false;
                                }
                                break;
                            case 2:
                                if(serIpChild.split("-")[0].split(":").length-1){
                                    //192.168.1.1:80-100
                                    if(!(regIp.test(serIpChild.split("-")[0].split(":")[0])
                                        &&serIpChild.split("-")[0].split(":")[1]<=65535
                                        &&Number(serIpChild.split("-")[0].split(":")[1])<Number(serIpChild.split("-")[1])
                                        &&serIpChild.split("-")[1]<=65535)
                                    ){
                                        serverBoolan = false;
                                    }
                                }else {
                                    //192.168.1.1-192.168.1.10:80
                                    if(serIpChild.split("-")[1].split(":").length-1){
                                        if(!(regIp.test(serIpChild.split("-")[0])&&regIp.test(serIpChild.split("-")[1].split(":")[0])&&serIpChild.split("-")[1].split(":")[1]<=65535)){
                                            serverBoolan = false;
                                        }
                                    }else {
                                        serverBoolan = false;
                                    }
                                }
                                break;
                            case 3:
                                //192.168.1.1-192.168.1.10:80-100
                                if(serIpChild.split("-")[1].split(":").length-1){
                                    var IpLen3Bol = regIp.test(serIpChild.split("-")[0])
                                        &&regIp.test(serIpChild.split("-")[1].split(":")[0])
                                        &&serIpChild.split("-")[1].split(":")[1]<=65535
                                        &&Number(serIpChild.split("-")[1].split(":")[1])<Number(serIpChild.split("-")[2])
                                        &&serIpChild.split("-")[2]<=65535;
                                    if(!IpLen3Bol){
                                        serverBoolan = false;
                                    }
                                }else {
                                    serverBoolan = false;
                                }
                                break;
                            default:
                                serverBoolan = false;
                        }
                    }
                }else {
                    serverBoolan = false;
                }
            }
            return serverBoolan;
        },
        getLocalTime:function(nS){
            return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
        },
        removeRow:function(tableId,revUrl,page,iniUrl){
            var selectRowId = $(".tabRowClickbg").attr("data-id"),
                appId;
            if(selectRowId!=undefined){
                switch (page){
                    case "userSide":
                        $.ajax({
                            url:iniUrl,
                            async:true,
                            type:"post",
                            data:{},
                            dataType:"json",
                            success:function(data){
                                data.forEach(function(item){
                                    if(item.id==selectRowId){
                                        appId = item.appId;
                                    }
                                });
                                $.ajax({
                                    url:revUrl,
                                    type:"post",
                                    data:{
                                        appId:appId
                                    },
                                    dataType:"json",
                                    success:function(data){
                                        if(data.success=="1"){
                                            $(tableId).bootstrapTable('remove', {
                                                field: 'id',
                                                values: [selectRowId-0]
                                            });
                                        }else {
                                            alert("删除失败，请稍后再试");
                                        }
                                    }
                                });
                            }
                        });
                        break;
                    default:
                        $.ajax({
                            url:revUrl,
                            type:"post",
                            data:{
                                id:selectRowId
                            },
                            dataType:page=="serverSide"?"text":"json",
                            success:function(data){
                                switch (page){
                                    case "observationPoint":
                                        $(tableId).bootstrapTable("refresh");
                                    //$(tableId).bootstrapTable('remove', {
                                    //    field: 'id',
                                    //    values: [selectRowId-0]
                                    //});
                                        break;
                                    case "serverSide":
                                        if(data=="success"){
                                            $(tableId).bootstrapTable("refresh");
                                        }else {
                                            alert("删除失败，请稍后再试");
                                        }
                                        break;
                                    default:
                                        if(data.success-0){
                                            $(tableId).bootstrapTable('remove', {
                                                field: 'id',
                                                values: [selectRowId-0]
                                            });
                                            //$(tableId).bootstrapTable("refresh")
                                        }else {
                                            alert("删除失败，请稍后再试");
                                        }
                                }
                            }
                        });

                }
            }
        },
        editRowModal:function(iniUrl,field,titleText,page,watgetUrl){
            var selectRowId = $(".tabRowClickbg").attr("data-id"),
                index = $(".tabRowClickbg").attr("data-index"),
                dataItem;
            if(selectRowId!=undefined){
                switch (page){
                    case "observationPoint":
                        $.ajax({
                            //url:"watchpointController/getFindAll.do",
                            url:iniUrl,
                            async:false,
                            type:"post",
                            data:"",
                            dataType:"json",
                            success:function(cdata){
                                cdata.forEach(function(item){
                                    if(item.id==selectRowId){
                                        dataItem = item;
                                    }
                                });
                            }
                        });
                        $.ajax({
                            //url:"watchpointController/getNetworkAll.do",
                            url:watgetUrl,
                            type:"post",
                            data:"",
                            dataType:"json",
                            success:function(data) {
                                $("#changetableRow-modal>.modal-dialog>.modal-content>.modal-body>.form-horizontal").html("");
                                var InputVal = [];
                                for (var j = 0; j < field.length; j++) {
                                    InputVal.push(dataItem[field[j]]);
                                }
                                for (var i = 0; i < titleText.length; i++) {
                                    switch (titleText[i]) {
                                        case "业务名称":
                                            var formGroup = $('<div class="form-group">' +
                                                '<div class="col-md-8">' +
                                                '<input type="text" class="form-control input-sm m-t-15 addtableRowInput"  value="' + InputVal[i] + '">' +
                                                '</div>' +
                                                '</div>');
                                            var label = $('<lable class="col-md-3 control-label">' +
                                                titleText[i] +
                                                ':</lable>');
                                            $(formGroup).prepend(label);
                                            $("#changetableRow-modal>.modal-dialog>.modal-content>.modal-body>.form-horizontal").append(formGroup);
                                            break;
                                        case "网卡名":
                                            var wangName = [], wangNameId = [];
                                            for (var k = 0; k < data["name"].length; k++) {
                                                wangName.push(data["name"][k]["name"]);
                                                wangNameId.push(data["name"][k]["id"]);
                                            }
                                            var select = $('<select data-placeholder="请选择" class="tag-select-limited" multiple></select>');
                                            for (var j = 0; j < InputVal[i].split(",").length; j++) {
                                                for (var k = 0; k < wangName.length; k++) {
                                                    if ($.trim(InputVal[i].split(",")[j]) == $.trim(wangName[k])) {
                                                        select.append('<option value="' + wangNameId[k] + '" selected="selected">' + $.trim(InputVal[i].split(",")[j]) + '</option>');
                                                        wangName.splice(k, 1);
                                                        wangNameId.splice(k, 1);
                                                    }
                                                }
                                            }
                                            if (wangName.length) {
                                                for (var j = 0; j < wangName.length; j++) {
                                                    select.append('<option value="' + wangNameId[j] + '">' + wangName[j] + '</option>');
                                                }
                                            }
                                            var formGroup = $('<div class="form-group"></div>').append($('<div class="col-md-8"></div>').append(select));
                                            var label = $('<lable class="col-md-3 control-label">' +
                                                titleText[i] +
                                                ':</lable>');
                                            $(formGroup).prepend(label);
                                            $("#changetableRow-modal>.modal-dialog>.modal-content>.modal-body>.form-horizontal").append(formGroup);
                                            break;
                                        case "VLAN ID":
                                            var vlanId = [];
                                            for (var k = 0; k < data["vid"][0]["vid"].split(",").length; k++) {
                                                vlanId.push($.trim(data["vid"][0]["vid"].split(",")[k]));
                                            }
                                            var select = $('<select data-placeholder="请选择" class="tag-select-limited" multiple></select>');
                                            for (var j = 0; j < InputVal[i].split(",").length; j++) {
                                                select.append('<option value="" selected="selected">' + InputVal[i].split(",")[j] + '</option>');
                                                for (var k = 0; k < vlanId.length; k++) {
                                                    if ($.trim(InputVal[i].split(",")[j]) == $.trim(vlanId[k])) {
                                                        vlanId.splice(k, 1);
                                                    }
                                                }
                                            }
                                            if (vlanId.length) {
                                                for (var j = 0; j < vlanId.length; j++) {
                                                    select.append('<option value="">' + vlanId[j] + '</option>');
                                                }
                                            }
                                            var formGroup = $('<div class="form-group"></div>').append($('<div class="col-md-8"></div>').append(select));
                                            var label = $('<lable class="col-md-3 control-label">' +
                                                titleText[i] +
                                                ':</lable>');
                                            $(formGroup).prepend(label);
                                            $("#changetableRow-modal>.modal-dialog>.modal-content>.modal-body>.form-horizontal").append(formGroup);
                                            break;
                                        case "MPLS LABLE":
                                            var mpls = [];
                                            for (var k = 0; k < data["lid"][0]["lid"].split(",").length; k++) {
                                                mpls.push($.trim(data["lid"][0]["lid"].split(",")[k]))
                                            }
                                            var select = $('<select data-placeholder="请选择" class="tag-select-limited" multiple></select>');
                                            for (var j = 0; j < InputVal[i].split(",").length; j++) {
                                                select.append('<option value="" selected="selected">' + InputVal[i].split(",")[j] + '</option>');
                                                for (var k = 0; k < mpls.length; k++) {
                                                    if ($.trim(InputVal[i].split(",")[j]) == $.trim(mpls[k])) {
                                                        mpls.splice(k, 1);
                                                    }
                                                }
                                            }
                                            if (mpls.length) {
                                                for (var j = 0; j < mpls.length; j++) {
                                                    select.append('<option value="">' + mpls[j] + '</option>');
                                                }
                                            }
                                            var formGroup = $('<div class="form-group"></div>').append($('<div class="col-md-8"></div>').append(select));
                                            var label = $('<lable class="col-md-3 control-label">' +
                                                titleText[i] +
                                                ':</lable>');
                                            $(formGroup).prepend(label);
                                            $("#changetableRow-modal>.modal-dialog>.modal-content>.modal-body>.form-horizontal").append(formGroup);
                                            break;
                                    }
                                }
                                $(".tag-select-limited").chosen({
                                    max_selected_options: 10
                                });
                                $('#changetableRow-modal').modal('show');
                            }
                        });
                        break;
                    default:
                        $.ajax({
                            url:iniUrl,
                            type:"post",
                            data:"",
                            dataType:"json",
                            success:function(cdata){
                                cdata.forEach(function(item){
                                    if(item.id==selectRowId){
                                        dataItem = item;
                                    }
                                });
                                $("#changetableRow-modal>.modal-dialog>.modal-content>.modal-body>.form-horizontal").html("");
                                var InputVal = [];
                                for(var j=0;j<field.length;j++){
                                    InputVal.push(dataItem[field[j]]);
                                }
                                for(var i=0;i<titleText.length;i++){
                                    var formGroup = $('<div class="form-group">'+
                                        '<div class="col-md-8">'+
                                        '<input type="text" class="form-control input-sm m-t-15 addtableRowInput"  value="'+InputVal[i]+'">'+
                                        '</div>'+
                                        '</div>');
                                    var label = $('<lable class="col-md-3 control-label">'+
                                        titleText[i]+
                                        ':</lable>');
                                    $(formGroup).prepend(label);
                                    $("#changetableRow-modal>.modal-dialog>.modal-content>.modal-body>.form-horizontal").append(formGroup);
                                }
                                $('#changetableRow-modal').modal('show');
                            }
                        });
                }
            }
        },
        ediTableRow:function(tableId,ediUrl,page,iniUrl){
            var selectRowId = $(".tabRowClickbg").attr("data-id"),
                serverIpVal = $.trim($("#changetableRow-modal .addtableRowInput:eq(0)").val()),
                index = $(".tabRowClickbg").attr("data-index");
            switch (page){
                case "observationPoint":
                    var resultObject = bsTable.watPointVerif("changetableRow-modal");
                    if(resultObject.result){
                        $('#changetableRow-modal').modal('hide');
                        $.ajax({
                            //url:"watchpointController/getUpdWatchpoint.do",
                            url:ediUrl,
                            type:"post",
                            data:{
                                id:selectRowId,
                                "name":$("#changetableRow-modal .addtableRowInput").val(),
                                "did":resultObject.did,
                                "vid":resultObject.vid,
                                "lid":resultObject.lid
                            },
                            dataType:"json",
                            success:function(data){
                            }
                        });
                        $(tableId).bootstrapTable("updateRow",{
                            index:index,
                            row:{
                                id:selectRowId,
                                name:$("#changetableRow-modal .addtableRowInput").val(),
                                "did":resultObject.didProtype,
                                "vid":resultObject.vid,
                                "lid":resultObject.lid
                            }
                        });
                    }else {
                        alert("业务名称不能超过32个字符且不能为空，‘网卡名’‘VLAN ID’‘MPLSLABLE ID’不能为空");
                    }
                    break;
                case "userSide":
                    $.ajax({
                        //url:"/client/getClient.do?moduleId=11",
                        url:iniUrl,
                        async:false,
                        type:"post",
                        data:"",
                        dataType:"json",
                        success:function(cdata){
                            var dataItem;
                            cdata.forEach(function(item){
                                if(item.id==selectRowId){
                                     dataItem = item;
                                }
                            });
                            if(bsTable.userValiDate("changetableRow")){
                                $('#changetableRow-modal').modal('hide');
                                var name = $("#changetableRow-modal .addtableRowInput:eq(0)").val(),
                                    displayIp = $("#changetableRow-modal .addtableRowInput:eq(1)").val(),
                                    bandWidth = $("#changetableRow-modal .addtableRowInput:eq(2)").val(),
                                    descrption = $("#changetableRow-modal .addtableRowInput:eq(3)").val();
                                $.ajax({
                                    //url:"/client/updateClient.do",
                                    url:ediUrl,
                                    type:"post",
                                    data:{
                                        id:selectRowId,
                                        appId:dataItem.appId,
                                        bandWidth:bandWidth,
                                        moduleId:dataItem.moduleId,
                                        name:name,
                                        displayIp:displayIp,
                                        descrption:descrption
                                    },
                                    dataType:"json",
                                    success:function(data){
                                        if(data.success=="1"){
                                            $(tableId).bootstrapTable('updateRow',{
                                                index:index,
                                                row:{
                                                    id:selectRowId,
                                                    name:name,
                                                    bandWidth:bandWidth,
                                                    descrption:descrption
                                                }
                                            })
                                        }else {
                                            alert("后端验证不通过，修改失败，请稍后再试");
                                        }
                                    }
                                });
                            }
                        }
                    });
                    break;
                case "serverSide":
                    var serverIp = $("#changetableRow-modal .addtableRowInput:eq(1)").val(),
                        strName = $("#changetableRow-modal .addtableRowInput:eq(0)").val();
                    if(bsTable.verification(strName)&&bsTable.servValiDate(serverIp)){
                        $('#changetableRow-modal').modal('hide');
                        $.ajax({
                            //url:"/serverManagement/updateServerSide.do",
                            url:ediUrl,
                            type:"post",
                            data:{
                                id:selectRowId,
                                name:strName,
                                displayIp:serverIp
                            },
                            dataType:"text",
                            success:function(data){
                                if(data=="success"){
                                    $(tableId).bootstrapTable('updateRow', {
                                        index:index,
                                        row:{
                                            id:selectRowId,
                                            name:strName,
                                            displayIp:serverIp
                                        }
                                    });
                                }else {
                                    alert("后端验证不通过，修改失败，请稍后再试");
                                }
                            }
                        });
                    }else {
                        alert("业务名称不能超过32个字符且不能为空，‘服务端IP端口’不能为空且必须合法多个IP之间用英文的逗号隔开");
                    }
                    break;
                default:
                    if(bsTable.verification(serverIpVal)){
                        $("#changetableRow-modal").modal("hide");
                        $.ajax({
                            url:ediUrl,
                            type:"post",
                            data:{
                                id:selectRowId,
                                name:serverIpVal,
                                descrption:$.trim($("#changetableRow-modal .addtableRowInput:eq(1)").val()),
                                lockStatus:0
                            },
                            dataType:"json",
                            success:function(data){
                                switch (data.success-0){
                                    case 1:
                                        $(tableId).bootstrapTable('updateRow', {
                                            index:index,
                                            row:{
                                                id:selectRowId,
                                                name:serverIpVal,
                                                descrption:$.trim($("#changetableRow-modal .addtableRowInput:eq(1)").val())
                                            }
                                        });
                                        break;
                                    case 0:
                                        alert("保存失败，请稍后再试");
                                        break;
                                    case 2:
                                        alert("驾驶舱名称已存在，请更改驾驶仓名稍后再次保存");
                                        break
                                }
                            }
                        })
                    }else {
                        alert("驾驶仓名称不能超过32个字符且不能为空");
                    }
            }
        },
        addRowModal:function(titleText,page,watgetUrl){
            $("#addtableRow-modal>.modal-dialog>.modal-content>.modal-body>.form-horizontal").html("");
            var length = titleText.length;
            switch (page){
                case "observationPoint":
                    $.ajax({
                        url:watgetUrl,
                        type:"post",
                        data:"",
                        dataType:"json",
                        success:function(data){
                            for(var i=0;i<length;i++){
                                switch (titleText[i]){
                                    case "业务名称":
                                        var formGroup = $('<div class="form-group">'+
                                            '<div class="col-md-8">'+
                                            '<input type="text" class="form-control input-sm m-t-15 addtableRowInput">'+
                                            '</div>'+
                                            '</div>');
                                        var label = $('<lable class="col-md-3 control-label">'+
                                            titleText[i]+
                                            ':</lable>');
                                        $(formGroup).prepend(label);
                                        $("#addtableRow-modal>.modal-dialog>.modal-content>.modal-body>.form-horizontal").append(formGroup);
                                        break;
                                    case "网卡名":
                                        var select = $( '<select data-placeholder="请选择" class="tag-select-limited" multiple></select>');
                                        for(var j=0;j<data["name"].length;j++){
                                            select.append('<option value="'+data["name"][j]["id"]+'">'+data["name"][j]["name"]+'</option>');
                                        }
                                        var formGroup = $('<div class="form-group"></div>').append($('<div class="col-md-8"></div>').append(select));
                                        var label = $('<lable class="col-md-3 control-label">'+
                                            titleText[i]+
                                            ':</lable>');
                                        $(formGroup).prepend(label);
                                        $("#addtableRow-modal>.modal-dialog>.modal-content>.modal-body>.form-horizontal").append(formGroup);
                                        break;
                                    case "VLAN ID":
                                        var vidArry = data["vid"][0]["vid"].split(",");
                                        var select = $( '<select data-placeholder="请选择" class="tag-select-limited" multiple></select>');
                                        for(var j=0;j<vidArry.length;j++){
                                            select.append('<option value="">'+ $.trim(vidArry[j])+'</option>');
                                        }
                                        var formGroup = $('<div class="form-group"></div>').append($('<div class="col-md-8"></div>').append(select));
                                        var label = $('<lable class="col-md-3 control-label">'+
                                            titleText[i]+
                                            ':</lable>');
                                        $(formGroup).prepend(label);
                                        $("#addtableRow-modal>.modal-dialog>.modal-content>.modal-body>.form-horizontal").append(formGroup);
                                        break;
                                    case "MPLS LABLE":
                                        var lidArry = data["lid"][0]["lid"].split(",");
                                        var select = $( '<select data-placeholder="请选择" class="tag-select-limited" multiple></select>');
                                        for(var j=0;j<lidArry.length;j++){
                                            select.append('<option value="">'+ $.trim(lidArry[j])+'</option>');
                                        }
                                        var formGroup = $('<div class="form-group"></div>').append($('<div class="col-md-8"></div>').append(select));
                                        var label = $('<lable class="col-md-3 control-label">'+
                                            titleText[i]+
                                            ':</lable>');
                                        $(formGroup).prepend(label);
                                        $("#addtableRow-modal>.modal-dialog>.modal-content>.modal-body>.form-horizontal").append(formGroup);
                                        break;
                                }
                            }
                            $(".tag-select-limited").chosen({
                                max_selected_options: 10
                            });
                            $("#addtableRow-modal").modal("show");
                        }
                    });
                    break;
                default:
                    for(var i=0;i<length;i++){
                        var formGroup = $('<div class="form-group group-Style">'+
                            '<div class="col-md-8">'+
                            '<input type="text" class="form-control input-sm m-t-15 addtableRowInput">'+
                            '</div>'+
                            '</div>');
                        var label = $('<lable class="col-md-3 control-label">'+
                            titleText[i]+
                            '</lable>');
                        $(formGroup).prepend(label);
                        $("#addtableRow-modal>.modal-dialog>.modal-content>.modal-body>.form-horizontal").append(formGroup);
                    }
                    $("#addtableRow-modal").modal("show");
            }
        },
        addTableRow:function(tableId,addUrl,iniUrl,page){
            switch (page){
                case "observationPoint":
                    var resultObject = bsTable.watPointVerif("addtableRow-modal");
                    if(resultObject.result){
                        $("#addtableRow-modal").modal("hide");
                        $.ajax({
                            url:addUrl,
                            type:"post",
                            data:{
                                "name":$("#addtableRow-modal .addtableRowInput").val(),
                                "did":resultObject.did,
                                "vid":resultObject.vid,
                                "lid":resultObject.lid
                            },
                            dataType:"json",
                            success:function(data){
                                $.ajax({
                                    url:iniUrl,
                                    type:"post",
                                    data:"",
                                    dataType:"json",
                                    success:function(data){
                                        $("#sidebar .sidebar-watpoint").html("");
                                        data.forEach(function(item,index){
                                            $("#sidebar .sidebar-watpoint").append('<li class="cursor" style="font-weight: 600;" data-id="'+item.id+'" data-index="'+index+'">'+item.name+'</li>')
                                        });
                                        $(tableId).bootstrapTable('load',data);
                                    }
                                });
                            }
                        });
                    }else {
                        alert("业务名称不能超过32个字符且不能为空，‘网卡名’‘VLAN ID’‘MPLSLABLE ID’不能为空");
                    }
                    break;
                case "userSide":
                    if(bsTable.userValiDate("addtableRow")){
                        $("#addtableRow-modal").modal("hide");
                        var name = $("#addtableRow-modal .addtableRowInput:eq(0)").val();
                        var displayIp = $("#addtableRow-modal .addtableRowInput:eq(1)").val();
                        var bandWidth = $("#addtableRow-modal .addtableRowInput:eq(2)").val();
                        var descrption = $("#addtableRow-modal .addtableRowInput:eq(3)").val();
                        $.ajax({
                            //url:"/client/addClient.do",
                            url:addUrl,
                            type:"post",
                            data:{
                                bandWidth:bandWidth,
                                moduleId:11,
                                name:name,
                                displayIp:displayIp,
                                descrption:descrption
                            },
                            dataType:"json",
                            success:function(data){
                                switch (data.success-0){
                                    case 1:
                                        $.ajax({
                                            //url:"/client/getClient.do",
                                            url:iniUrl,
                                            type:"post",
                                            data:{
                                                moduleId:11
                                            },
                                            dataType:"json",
                                            success:function(addData){
                                                $("#sidebar .sidebar-userSide").html("");
                                                addData.forEach(function(item,index){
                                                    $("#sidebar .sidebar-userSide").append('<li class="cursor" style="font-weight: 600;" data-id="'+item.appId+'" data-index="'+index+'">'+item.name+'</li>')
                                                });
                                                $(tableId).bootstrapTable("load",addData);
                                            }
                                        });
                                        break;
                                    case 0:
                                        alert("后端验证不通过，保存失败，请稍后再试");
                                        break;
                                    case 2:
                                        alert("名称已存在，请重新命名");
                                        break;
                                    case 3:
                                        alert("网段不正确，请重新填写");
                                        break;
                                }
                            }
                        });
                    }
                    break;
                case "serverSide":
                    var serverIpVal = $("#addtableRow-modal .addtableRowInput:eq(1)").val(),
                        strName = $("#addtableRow-modal .addtableRowInput:eq(0)").val();
                    if(bsTable.verification(strName)&&bsTable.servValiDate(serverIpVal)){
                        $("#addtableRow-modal").modal("hide");
                        $.ajax({
                            //url:" /serverManagement/addServerSide.do",
                            url:addUrl,
                            type:"post",
                            data:{
                                name:strName,
                                displayIp:serverIpVal
                            },
                            dataType:"text",
                            success:function(data){
                                if(data=="success"){
                                    $.ajax({
                                        //url:"/serverManagement/getAllServerSide.do",
                                        url:iniUrl,
                                        type:"post",
                                        data:"",
                                        dataType:"json",
                                        success:function(data){
                                            $("#sidebar .sidebar-serverSide").html("");
                                            data.forEach(function(item,index){
                                                $("#sidebar .sidebar-serverSide").append('<li class="cursor" style="font-weight: 600;" data-id="'+item.id+'" data-index="'+index+'">'+item.name+'</li>')
                                            });
                                            $(tableId).bootstrapTable('load',data);
                                        }
                                    });
                                }else {
                                    alert("后端验证不通过，保存失败，请稍后再试");
                                }
                            }
                        });
                    }else {
                        alert("业务名称不能超过32个字符且不能为空，‘服务端IP端口’不能为空且必须合法多个IP之间用英文的逗号隔开");
                    }
                    break;
                default:
                    var serverIpVal = $.trim($("#addtableRow-modal .addtableRowInput:eq(0)").val());
                    if(bsTable.verification(serverIpVal)){
                        $("#addtableRow-modal").modal("hide");
                        $.ajax({
                            url:addUrl,
                            type:"post",
                            data:{
                                name:serverIpVal,
                                descrption:$.trim($("#addtableRow-modal .addtableRowInput:eq(1)").val()),
                                lockStatus:0
                            },
                            dataType:"json",
                            success:function(data){
                                switch (data.success-0){
                                    case 1:
                                        $.ajax({
                                            url:iniUrl,
                                            type:"post",
                                            data:"",
                                            dataType:"json",
                                            success:function(addData){
                                                $(tableId).bootstrapTable('load',addData);
                                            }
                                        });
                                        break;
                                    case 0:
                                        alert("保存失败，请稍后再试");
                                        break;
                                    case 2:
                                        alert("驾驶舱名称已存在，请更改驾驶仓名稍后再次保存");
                                        break
                                }
                            }
                        })
                    }else {
                        alert("驾驶仓名称不能超过32个字符且不能为空");
                    }
            }
        }
    };
    $.extend({
        JinibsTable:function(tableId,iniurl,toolbarId,fieldArry,titleArry,page){
            bsTable.initializ(tableId,iniurl,toolbarId,fieldArry,titleArry,page);
        },
        JaddbsModalRow:function(titleText,page,watgetUrl){
            bsTable.addRowModal(titleText,page,watgetUrl);
        },
        JaddbsTableRow:function(tableId,addUrl,iniUrl,page){
            bsTable.addTableRow(tableId,addUrl,iniUrl,page);
        },
        JeditRowModal:function(iniUrl,field,titleText,page,watgetUrl){
            bsTable.editRowModal(iniUrl,field,titleText,page,watgetUrl);
        },
        JediTableRow:function(tableId,ediUrl,page,iniUrl){
            bsTable.ediTableRow(tableId,ediUrl,page,iniUrl);
        },
        JremovebsTableRow:function(tableId,revUrl,page,iniUrl){
            bsTable.removeRow(tableId,revUrl,page,iniUrl);
        }
    })
});