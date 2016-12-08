layui
    .use(['layer', 'element', 'form', 'laydate', 'upload'], function(){

        var laydate = layui.laydate;
        var upload = layui.upload;

        birthdayConfig = {
            event: 'click', //触发事件
            format: 'YYYY-MM-DD', //日期格式
            istime: false, //是否开启时间选择
            isclear: true, //是否显示清空
            istoday: true, //是否显示今天
            issure: true, //是否显示确认
            min: '1917-01-01', //最小日期
            max: laydate.now(), //最大日期
            start: laydate.now(),  //开始日期
            fixed: false, //是否固定在可视区域
            zIndex: 999, //css z-index
            choose: function (dates) { //选择好日期后的回调

            }
        }
        document.getElementById('input-birthday').onclick = function(){
            // laydate 中的 elem 只支持绑定DOM对象
            birthdayConfig.elem = this;
            laydate(birthdayConfig)
        }





        // 更换头像按钮
        $('.avatarBox')
            .hover(function(){
                $(this).find('.updateAvatar').stop().animate({'bottom':'0'},300)
            },function(){
                $(this).find('.updateAvatar').stop().animate({'bottom':'-50px'},300)
            })
            .find('.updateAvatar')
            .click(function(){
                console.log('更换头像按钮被点击了...')
            })

        // 头像上传
        upload({
            elem: $('#newAvatar'),
            url: '/uInfo/changeAvatar',
            method: 'post',
            type: 'images',
            before: function(input){
                console.log('正在上传头像...')
            },
            success: function(res){
                console.log(res)
                if(res.flag == 1){
                    console.log('头像上传成功')
                    window.location.reload()
                }else{
                    console.log('头像上传失败')
                    console.log(res.err)
                }
            }
        })
        
    })