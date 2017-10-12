$(document).ready(function(){
    /* --------------------------------------------------------
     Template Settings
     -----------------------------------------------------------*/

    var settings = '<a id="settings" href="#changeSkin" data-toggle="modal">' +
        '<i class="glyphicon glyphicon-cog"></i> 皮肤设置' +
        '</a>' +
        '<div class="modal fade" id="changeSkin" tabindex="-1" role="dialog" aria-hidden="true">' +
        '<div class="modal-dialog modal-lg">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
        '<h4 class="modal-title">更改皮肤</h4>' +
        '</div>' +
        '<div class="modal-body">' +
        '<div class="row template-skins">' +
        '<a data-skin="skin-blur-blue" class="col-sm-2 col-xs-4 skins1" href="">' +
        '<img src="images/skin-blue.jpg" alt="">' +
        '</a>' +
        '<a data-skin="skin-blur-violate" class="col-sm-2 col-xs-4 skins2" href="">' +
        '<img src="images/skin-violate.jpg" alt="">' +
        '</a>' +
        '<a data-skin="skin-blur-lights" class="col-sm-2 col-xs-4 skins3" href="">' +
        '<img src="images/skin-lights.jpg" alt="">' +
        '</a>' +
        '<a data-skin="skin-blur-greenish" class="col-sm-2 col-xs-4 skins4" href="">' +
        '<img src="images/skin-greenish.jpg" alt="">' +
        '</a>' +
        '<a data-skin="skin-blur-night" class="col-sm-2 col-xs-4 skins5" href="">' +
        '<img src="images/skin-night.jpg" alt="">' +
        '</a>' +
        '<a data-skin="skin-blur-ocean" class="col-sm-2 col-xs-4 skins6" href="">' +
        '<img src="images/skin-ocean.jpg" alt="">' +
        '</a>' +
        '<a data-skin="skin-blur-sunset" class="col-sm-2 col-xs-4 skins7" href="">' +
        '<img src="images/skin-sunset.jpg" alt="">' +
        '</a>' +
        '<a  data-skin="skin-blur-kiwi"class="col-sm-2 col-xs-4 skins8" href="">' +
        '<img src="images/skin-kiwi.jpg" alt="">' +
        '</a>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    $('#main').prepend(settings);
    /* center modal */
    function centerModals(){
        $('.modal').each(function(i){
            var $clone = $(this).clone().css('display', 'block').appendTo('body');
            var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
            top = top > 0 ? top : 0;
            $clone.remove();
            $(this).find('.modal-content').css("margin-top", top);
        });
    }
    $('.modal').on('show.bs.modal', centerModals);
    $(window).on('resize', centerModals);

    $('body').on('click', '.template-skins > a', function(e){
        e.preventDefault();
        var skin = $(this).data('skin');
        $('body').attr('id', skin);
        $('#changeSkin').modal('hide');
    });


    // 背景皮肤保存--------------------------------------------------------------
   (function () {
        $(".skins1").click(function () {
             var key="name";
             var value="1";
            $.ajax({
             url: "/watchpointController/updateUserConfigureByKey.do",
             type: "POST",
             data: {key: key,value: value},
             success: function (data) {
             
             }
             })
        });
        $(".skins2").click(function () {
        	 var key="name";
             var value="2";
             $.ajax({
                 url: "/watchpointController/updateUserConfigureByKey.do",
                 type: "POST",
                 data: {key: key,value: value},
                 success: function (data) {
                 
                 }
                 })
        });
        $(".skins3").click(function () {
        	var key="name";
            var value="3";
            $.ajax({
                url: "/watchpointController/updateUserConfigureByKey.do",
                type: "POST",
                data: {key: key,value: value},
                success: function (data) {               
                }
                })
        });
        $(".skins4").click(function () {
        	var key="name";
            var value="4";
            $.ajax({
                url: "/watchpointController/updateUserConfigureByKey.do",
                type: "POST",
                data: {key: key,value: value},
                success: function (data) {
                }
                })
        });
        $(".skins5").click(function () {
        	var key="name";
            var value="5";
            $.ajax({
                url: "/watchpointController/updateUserConfigureByKey.do",
                type: "POST",
                data: {key: key,value: value},
                success: function (data) {                
                }
                })
        });
        $(".skins6").click(function () {
        	var key="name";
            var value="6";
            $.ajax({
                url: "/watchpointController/updateUserConfigureByKey.do",
                type: "POST",
                data: {key: key,value: value},
                success: function (data) {              
                }
                })
        });
        $(".skins7").click(function () {
        	var key="name";
            var value="7";
            $.ajax({
                url: "/watchpointController/updateUserConfigureByKey.do",
                type: "POST",
                data: {key: key,value: value},
                success: function (data) {                
                }
                })
        });
        $(".skins8").click(function () {
        	var key="name";
            var value="8";
            $.ajax({
                url: "/watchpointController/updateUserConfigureByKey.do",
                type: "POST",
                data: {key: key,value: value},
                success: function (data) {                
                }
                })
        });
    })();

});



/* --------------------------------------------------------
 Date Time Widget
 -----------------------------------------------------------*/
(function(){
    var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    var dayNames= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    // Create a newDate() object
    var newDate = new Date();

    // Extract the current date from Date object
    newDate.setDate(newDate.getDate());

    // Output the day, date, month and year
    $('#date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());

    setInterval( function() {

        // Create a newDate() object and extract the seconds of the current time on the visitor's
        var seconds = new Date().getSeconds();

        // Add a leading zero to seconds value
        $("#sec").html(( seconds < 10 ? "0":"" ) + seconds);
    },1000);

    setInterval( function() {

        // Create a newDate() object and extract the minutes of the current time on the visitor's
        var minutes = new Date().getMinutes();

        // Add a leading zero to the minutes value
        $("#min").html(( minutes < 10 ? "0":"" ) + minutes);
    },1000);

    setInterval( function() {

        // Create a newDate() object and extract the hours of the current time on the visitor's
        var hours = new Date().getHours();

        // Add a leading zero to the hours value
        $("#hours").html(( hours < 10 ? "0" : "" ) + hours);
    }, 1000);
})();




