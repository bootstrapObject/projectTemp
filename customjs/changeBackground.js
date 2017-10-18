$(document).ready(function(){
    /* --------------------------------------------------------
     Template Settings模板设置
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
        '<a data-skin="skin-blur-blue" data-value="1" class="col-sm-2 col-xs-4 _skins" href="">' +
        '<img src="images/skin-blue.jpg" alt="">' +
        '</a>' +
        '<a data-skin="skin-blur-violate" data-value="2" class="col-sm-2 col-xs-4 _skins" href="">' +
        '<img src="images/skin-violate.jpg" alt="">' +
        '</a>' +
        '<a data-skin="skin-blur-lights" data-value="3" class="col-sm-2 col-xs-4 _skins" href="">' +
        '<img src="images/skin-lights.jpg" alt="">' +
        '</a>' +
        '<a data-skin="skin-blur-greenish" data-value="4" class="col-sm-2 col-xs-4 _skins" href="">' +
        '<img src="images/skin-greenish.jpg" alt="">' +
        '</a>' +
        '<a data-skin="skin-blur-night" data-value="5" class="col-sm-2 col-xs-4 _skins" href="">' +
        '<img src="images/skin-night.jpg" alt="">' +
        '</a>' +
        '<a data-skin="skin-blur-ocean" data-value="6" class="col-sm-2 col-xs-4 _skins" href="">' +
        '<img src="images/skin-ocean.jpg" alt="">' +
        '</a>' +
        '<a data-skin="skin-blur-sunset" data-value="7" class="col-sm-2 col-xs-4 _skins" href="">' +
        '<img src="images/skin-sunset.jpg" alt="">' +
        '</a>' +
        '<a  data-skin="skin-blur-kiwi" data-value="8" class="col-sm-2 col-xs-4 _skins" href="">' +
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
    $("._skins").click(function(){
        $.ajax({
            url:"/watchpointController/updateUserConfigureByKey.do",
            type:"post",
            data:{
                key:"name",
                value:$(this).attr("data-value")
            },
            dataType:"text",
            success:function(data){
            }
        })
    });
    /*----------进入页面加载用户上次所保存的背景图--------------*/
    $.ajax({
        url:"/watchpointController/getUserConfigureBeanByKey.do",
        type: "post",
        data: {userId:0},
        dataType:"json",
        success: function (data) {
            switch(data){
                case 1:
                    $("body").attr("id","skin-blur-blue");
                    break;
                case 2:
                    $("body").attr("id","skin-blur-violate");
                    break;
                case 3:
                    $("body").attr("id","skin-blur-lights");
                    break;
                case 4:
                    $("body").attr("id","skin-blur-greenish");
                    break;
                case 5:
                    $("body").attr("id","skin-blur-night");
                    break;
                case 6:
                    $("body").attr("id","skin-blur-ocean");
                    break;
                case 7:
                    $("body").attr("id","skin-blur-sunset");
                    break;
                case 8:
                    $("body").attr("id","skin-blur-kiwi");
                    break;
                default:
                    $("body").attr("id","skin-blur-blue");
                    break;
            }
        }
    });
});








