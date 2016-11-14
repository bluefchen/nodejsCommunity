
$(function(){
	var signer = $.cookie('signer');
	
	if(signer){
		var header = '<img src="images/avatar/'+signer+'.jpg" onerror="this.src=\'images/avatar/default.jpg\'">';
		$('#user').empty().html(header+'&nbsp;'+signer).show();
		$('.dropdown-menu li:first-child').click(function(){
			location.href = '/userInfo';
		})
		$('.dropdown-menu li:last-child').click(function(){
			$.removeCookie('signer');
			$.removeCookie('signerID');
			location.reload();
		})
		$('#ask').click(function(){
			location.href = '/ask';
		})
		
		//	采用事件委托的写法
		$('#list').delegate('.goAnswer', 'click', function(){		
			$.cookie('questionID',$(this).parents('li').attr('id'));
			location.href = '/answer';
		})
		
		$('#list').delegate('.good','click',function(){
			var $this = $(this);
			var uId = $.cookie('signerID').slice(3,-1);
			var aId = $(this).parents('li').attr('id')
			var data={aId:aId,uId:uId}
			if($(this).find('img').attr('src') == 'images/icons/+0.png'){
				$.post('/agree',data,function(data){
					if(data.flag == 'success'){
						var count = $this.next().text();
						$this
							.find('img')
							.attr('src', 'images/icons/+1.png')
							.end()
							.next()
							.text( Number(count)+1 );
					}else{
						console.log(data.message)
					}
				})
			}else{
				$.post('/disagree',data,function(data){
					if(data.flag == 'success'){
						var count = $this.next().text();
						$this
							.find('img')
							.attr('src', 'images/icons/+0.png')
							.end()
							.next()
							.text( Number(count)-1 );
					}else{
						console.log(data.message)
					}
				})
			}
		})
	}else{
		$('#user').removeAttr('data-toggle').click(function(){
			location.href = '/login';
		})
		
		$('#ask').click(function(){
			$('.modal-body p').text('登录后方可提问');
			$('.modal').modal('show');
		})
		
		//	采用事件委托的写法
		$('#list').delegate('.goAnswer', 'click', function(){
			$('.modal-body p').text('登录后方可提问');
			$('.modal').modal('show');
		})
	}
})
