layui
    .use(['layer', 'element', 'laypage', 'form', 'laydate', 'upload'], function(exports){

        // 分页
        var laypage = layui.laypage;
        laypage({
            cont: 'index-pageList',  //将要进行呈现分页效果的div的id
            pages: 100, //总页数
            groups: 7   //连续显示分页数
        });

        // 弹出登录窗
        $('.goLogin').click(function(){
            openLoginWindow()
        })
        function openLoginWindow() {
            var loginWindow = layer.open({
                type: 1, //页面弹窗
                id: 'layer-loginWindow',
                title: '登录窗',
                area: ['450px', '320px'],
                shade: 0, //遮罩层的透明度
                maxmin: true,
                offset: [
                    ($(window).height() - 460)/2,
                    ($(window).width() - 450)/2
                ],
                anim: 3,
                content: $('#form-login'),
                btn: ['前往注册', '关闭'],
                yes: function(){  //第一个按钮的回调
                    openRegisterWindow();
                },
                btn2: function(){  //第二个按钮的回调
                    console.log('btn2...');
                    // layer.close(loginWindow);
                },
                cancel: function(){ //右上角叉叉的回调
                    console.log('cancel...')
                },
                zIndex: layer.zIndex, //重点1
                success: function (layero) {  //窗体弹出后的成功回调方法
                    layer.setTop(layero); //重点2
                }
            });
        }

        // 弹出注册窗
        function openRegisterWindow() {
            var registerWindow = layer.open({
                type: 1, //页面弹窗
                id: 'layer-registerWindow',
                title: '注册',
                area: ['590px', '620px'],
                shade: 0,  //遮罩层的透明度
                maxmin: true,
                offset: [
                    ($(window).height() - 660)/2,
                    ($(window).width() - 590)/2
                ],
                anim: 4,
                content: $('#form-register'),
                btn: ['关闭'],
                yes: function(){ //第一个按钮的回调
                    console.log('正在注册...')
                    console.log('注册成功')
                    layer.close(registerWindow);
                },
                cancel: function(){ //右上角叉叉的回调
                    console.log('cancel...')
                },
                zIndex: layer.zIndex, //重点1
                success: function (layero) {  //窗体弹出后的成功回调方法
                    layer.setTop(layero); //重点2
                }
            });
        }

        // 弹出发布问题窗
        $('.goAsk button').click(function(){
            openAskWindow()
        })
        $('.goAskBtn').click(function(){
            openAskWindow()
        })
        function openAskWindow() {
            var askWindow = layer.open({
                type: 1,
                id: 'layer-askWindow',
                title: '发布一个问题',
                area: ['690px', '380px'],
                shade: 0,  //遮罩层的透明度
                maxmin: true,
                offset: [
                    ($(window).height() - 420)/2,
                    ($(window).width() - 690)/2
                ],
                anim: 2,
                content: $('#form-ask'),
                btn: ['关闭'],
                yes: function(){ //第一个按钮的回调
                    layer.close(askWindow);
                },
                cancel: function(){ //右上角叉叉的回调
                    console.log('cancel...')
                },
                zIndex: layer.zIndex, //重点1
                success: function (layero) {  //窗体弹出后的成功回调方法
                    layer.setTop(layero); //重点2
                }
            })
        }


        // 表单验证
        // #FF5722


    // layui.upload({
    //     url: '../ajax/file.php'
    //     ,before: function(input){
    //         layer.msg("文件上传中")
    //     }
    //     ,success: function(res){
    //         layer.msg("上传完毕");
    //         $(".headPhoto span").text(res.name);
    //         $(".headYL img").attr({"src":"../headPhoto/"+res.imgUrl,"alt":res.imgUrl});
    //     }
    // });
    // $(".username").blur(function(){
    //     var nameVal = $(this).val();
    //     $.get("../ajax/verifyName.php?name="+nameVal).success(function(data){
    //         console.log(data)
    //         if(data == "yes"){
    //             $(".nameYz").hide()
    //         }else{
    //             $(".nameYz").show()
    //         }
    //     })
    // })

    })