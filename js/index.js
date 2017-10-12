$(function(){
	/* 注销部分*/
	$(".logout-btn").click(function () {
		$.ajax({
			url: "/user/logout.do",
			type: "POST",
			data: "",
			success:function(data){
				if("1"){
					window.location = "/login.html";
				}else if("0"){
					alert("注销不成功");
				}
			}
		})
	});
});