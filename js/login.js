$(function(){
    // 点击登录按钮
    $("#button-s").click(function () {
        if(check()){
            var username = $.trim($("#name").val());
            var pwd = $.trim($("#pwd").val());
            $.ajax({
                url: "/user/login.do",
                type: "POST",
                data: {userName: username, password: pwd},
                success: function (data) {
                    var obj = JSON.parse(data);
                    if(obj.success=="1"){
                        window.location = "/index.html";
                    }else if(obj.success=="2"){
                        alert("用户名错误 !");
                    }else if(obj.success=="3"){
                        alert("密码错误 !");
                    }else if(obj.success=="0"){
                        alert("登录失败 !");
                    }
                }
            });
        }
    });
    //  回车事件
    $(document).keyup(function(event){
        if(event.keyCode ==13){
            $("#button-s").trigger("click");
        }
    });
    function check() {
        var username = $("#name").val();
        var pwd = $("#pwd").val();
        if ("" == $.trim(username)) {
            alert("用户名不能为空 !");
            username.focus();
            return false;
        } else if ("" == $.trim(pwd)) {
            alert("密码不能为空 !");
            pwd.focus();
            return false;
        } else {
            return true;
        }
    }
});