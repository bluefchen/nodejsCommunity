layui
    .use(['layer', 'element', 'form', 'laydate'], function(){

        var laydate = layui.laydate;

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
            choose: function (dates) { //选择好日期的回调

            }
        }

        document.getElementById('input-birthday').onclick = function(){
            // laydate 中的 elem 只支持绑定DOM对象
            birthdayConfig.elem = this;
            laydate(birthdayConfig)
        }

    })