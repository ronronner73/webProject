$(function(){
	initMenu();
	
});

var params = {
	scene: 'random',
	level: 1,
	player: 1
};



// home menu
function initMenu() {
	$('#star,#star2,.level_1, .level_2, .level_3').hover(function() {
		$(this).css('background-position','25%');
	}, function() {
		$(this).css('background-position','0%');
	});
	$('#star,#star2,.level_1, .level_2, .level_3').mousedown(function() {
		$(this).css('background-position','50%');
	});
	$('#star,#star2').mouseup(function() {
		setParams({ player: $(this).attr('class') });
		$('#home > div').hide();
		$('#home').fadeOut();
		$('#levelWin').slideDown(function() {
			$('div', $(this)).show();
		});
	});
	$('#levelWin .iss').hover(function() {
		$('#levelWin .iss').removeClass('selected');
		$(this).addClass('selected');
	}).click(function() {
		setParams({ level: $(this).parent().attr('class').split('_')[1] });
		$('#levelWin').hide().find(' > div').hide();
		$('#container *').remove();

		//can easily change the map background with this
		$('#container').css('background','url(images/'+ getScene('bgpic') +'.jpg) no-repeat');
		$('#startGame').show(function() {
			$('#related').show(function() {
				loadGame();
			});
			initInfo();
		});
	});
}

function initInfo() {
	$('#goHome, #goMenu, #continue').hover(function() {
		$(this).css('background-position','25%');
	}, function() {
		$(this).css('background-position','0%');
	});
	$('#goHome, #goMenu, #continue').mousedown(function() {
		$(this).css('background-position','50%');
	});
	$('#goMenu, #continue').hover(function() {
		$('.select').removeClass('selected');
		$(this).find(' > .select').addClass('selected');
	});
	$('#goHome').mouseup(function() {
		showInfo('goMenu');
	});
	$('#goMenu, #continue').mouseup(function() {
 		processInfo();
 	});
	 $(document).keydown(function(e){
		e = e || window.event;
		var key = e.which || e.keyCode;
		switch (key) {
				case 27: showInfo('goMenu'); break;
	   case 38: if ($('#info:visible').length == 1) $('#info .select').toggleClass('selected'); break;
	   case 40: if ($('#info:visible').length == 1) $('#info .select').toggleClass('selected'); break;
	   case 13: if ($('#info:visible').length == 1) processInfo(); break;
	   default: break;
   }
	});
 	$(window).blur(function() {
 		if(document.activeElement == document.body)
 			showInfo('continue');
 	});
}

function showInfo(_s) {
	$('#info').show();
	$('#info .select').removeClass('selected');
	$('#'+ _s +' .select').addClass('selected');
	state.pause = true;
}

function processInfo() {
	if ($('#info .selected').parent().attr('id') == 'continue') {
  	state.pause = false;
  	$('#info').hide(); 
  	$('#info .select').removeClass('selected');
  } else {
  	goMenu();
  }
}

// go home menu
function goMenu() {
	$('#info').hide();
	gameOver('back');
	$('#startGame').slideUp();
	$('#home').slideDown(function() {
		$('#home > div').show();
		initMenu();
	});
}

//game parameters
function setParams(opt) {
	params = $.extend(params, opt || {});
}

function getScene(param) {
	var _p;
	if (param == 'map')
		_p = 'map';
	else if (param == 'bgpic')
		_p = 'bgpic';
	switch (params.scene) {
      //More map situations can be set up and allowed to be chosen by the player
      case 'random': return _p + '1'; break;
      default: break;
  }
}

function getLevel() {
	return params.level;
}

function getPlayer() {
	return params.player;
}