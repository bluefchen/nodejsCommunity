
$(function(){
	var signer = $.cookie('signer');
	if(signer){
		$('#goLogin').hide();
		var avatar = '<img src="../images/avatar/'+signer+'.jpg" onerror="this.src=\'../images/avatar/default.jpg\'">';
		$('#user').empty().html(avatar+'&nbsp;'+signer).show();
		$('.updateAvatar label .label-img').css('background-image','url(/images/avatar/'+signer+'.jpg)')
		$('input#avatar').on('change',function (){
			var file = $(this)[0].files[0];
			if( file.type.startsWith('image') ){
				$('form button').removeAttr('disabled');
				$('.updateAvatar label .label-img').css('background-image','url('+URL.createObjectURL(file)+')');
			}else{
				$('.modal-body p').text("只支持上传图片");
				$('.modal').modal('show');
				$('form button').attr('disabled','disabled');
			}
		})
		//跳转个人信息页
		$('.dropdown-menu li:first-child').click(function(){
			location.href = '/userInfo';
		})
		//用户退出
		$('.dropdown-menu li:last-child').click(function(){
			$.removeCookie('signer');
			$.removeCookie('signerID');
			location.reload();
		})
		//提交更新的头像
		$('form').submit(function(e){
			e.preventDefault();			
			var data = new FormData(this);			
			$.post({
				url: '/addHeadPic',
				data: data,
				contentType: false,
				processData: false,
				success: function(data){
					if(data.flag == 'success'){
						location.reload();
					}else{
						
					}
				}
			})
		})		
	}else{
		$('.modal-body p').text("您当前未登录，请登录后再设置");
		$('.modal').modal('show');
		$('.modal').on('hidden.bs.modal', function(e){
			location.href = '/login'
		})
		$('#user').hide();
		$('#goLogin').click(function(){
			location.href = '/login';
		});
	}
	$('#goBack').click(function(){
		history.go(-1);
	})
})

