var character = {};
var enemies = {};
var blocks = {};

function loadGame() {
		character = {
			player1: 3,
			player2: getPlayer() == 2 ? 3 : 0,
			enemy: 0,
			p1: {
				r: 0,
				g: 0,
				y: 0,
				b: 0
			},
			p2: {
				r: 0,
				g: 0,
				y: 0,
				b: 0
			}
		}
		enemies = {};
		state = {
			exit: false,
			pause: false
		}
		loadMap();
		//round num 
		setBNum('round', params.level);
		//enemy num
		setENum();
		addPlayers();
		//players scores
	  	setScores();
	  	//add key event
		pKeyEvent(getPlayer());
		addEnemies();
}

function loadMap() {
		blocks = {};
		new Crystal(); 
		blocks[1000] = { t: 600, l: 331, clazz: 'crystal' };
		//load map
		$.getJSON('maps/map'+ getLevel() +'.json', function(json) {
			$.each(json.map, function(i, n) {
				if (n.clazz !== 'b')
					blocks[i] = { t: n.top, l: n.left, clazz: n.clazz };
				new RoadBlock({
					'id': 'rb' + i,
					'clazz': n.clazz,
					'top': n.top,
					'left': n.left
				});
			});
		});
}

function setENum() {
	switch (parseInt(getLevel())) {
      case 1: setObjCount('rt', 1);setObjCount('gt', 0);setObjCount('yt', 0);setObjCount('bt', 1);$('#ln').css('background','url(images/levelnumber.png) 11.1% no-repeat'); break;
      case 2: setObjCount('rt', 3);setObjCount('gt', 2);setObjCount('yt', 3);setObjCount('bt', 2);$('#ln').css('background','url(images/levelnumber.png) 22.2% no-repeat'); break;
      case 3: setObjCount('rt', 8);setObjCount('gt', 4);setObjCount('yt', 4);setObjCount('bt', 3);$('#ln').css('background','url(images/levelnumber.png) 33.3% no-repeat'); break;
      default: break;
  }
}

function setObjCount(_t, n) {
	$('.'+ _t).html('');
	var _n = n + '';
	for (var i = 0; i < _n.length; i++) {
		var _p, _w;
		switch (_n.charAt(i)) {
				case '0': _p = '0%'; _w = 15; break;
				case '1': _p = '12%'; _w = 14; break;
				case '2': _p = '22.2%'; _w = 15; break;
				case '3': _p = '33.3%'; _w = 14; break;
				case '4': _p = '44.4%'; _w = 14; break;
				case '5': _p = '55.5%'; _w = 14; break;
				case '6': _p = '66.6%'; _w = 14; break;
				case '7': _p = '77.7%'; _w = 14; break;
				case '8': _p = '88.5%'; _w = 14; break;
				case '9': _p = '99.9%'; _w = 15; break;
				default: break;
		}
		$n = $('<div class='+ n +'></div>');
		$n.css({
			'float': 'left',
			'background': 'url(images/charactercount.png) '+ _p +' no-repeat',
			'height': '25px',
			'width': _w,
			'left': '750px'
		});
		$('.'+ _t).append($n);
	}
}

function getObjCount(_t) {
	return $('.'+ _t +' > div:first').attr('class');
}

function setBNum(_t, n) {
	$('#'+ _t).html('');
	var _n = n + '';
	for (var i = 0; i < _n.length; i++) {
		var _p, _w;
		switch (_n.charAt(i)) {
				case '0': _p = '0%'; _w = 19; break;
				case '1': _p = '12%'; _w = 17; break;
				case '2': _p = '22.2%'; _w = 19; break;
				case '3': _p = '33.3%'; _w = 18; break;
				case '4': _p = '44.4%'; _w = 18; break;
				case '5': _p = '55.5%'; _w = 18; break;
				case '6': _p = '66.6%'; _w = 18; break;
				case '7': _p = '77.7%'; _w = 18; break;
				case '8': _p = '88.5%'; _w = 18; break;
				case '9': _p = '99.9%'; _w = 19; break;
				default: break;
		}
		$n = $('<div class='+ n +'></div>');
		$n.css({
			'float': 'left',
			'background': 'url(images/totalnum.png) '+ _p +' no-repeat',
			'height': '30px',
			'width': _w,
			'left': '750px'
		});
		$('#'+ _t).append($n);
	}
}

function getBNum(_t) {
	return $('.'+ _t +' > div:first').attr('class');
}

function setPlayerCount(_t, n) {//lifenum1
	$('#'+ _t).html('');
	var _p, _w;
	switch (n) {
			case 0: _p = '0%'; _w = 15; break;
			case 1: _p = '11.5%'; _w = 14; break;
			case 2: _p = '22.2%'; _w = 15; break;
			case 3: _p = '33.3%'; _w = 14; break;
			default: break;
	}
	$n = $('<div class='+ n +'></div>');
	$n.css({
		'background': 'url(images/charactercount.png) '+ _p +' no-repeat',
		'height': '25px',
		'width': _w
	});
	$('#'+ _t).append($n);
}

function getPlayerCount(_t) {
	return $('.'+ _t +' > div:first').attr('class');
}

function setScores() {
	setScore('score1', 0);
	setScore('score2', 0);
}

function setScore(_t, n) {
	$('#'+ _t).html('');
	var _n = n + '';
	for (var i = 0; i < _n.length; i++) {
		var _p, _w;
		switch (_n.charAt(i)) {
				case '0': _p = '0%'; _w = 17; break;
				case '1': _p = '12%'; _w = 16; break;
				case '2': _p = '22.2%'; _w = 16; break;
				case '3': _p = '33.3%'; _w = 16; break;
				case '4': _p = '44.4%'; _w = 16; break;
				case '5': _p = '55.5%'; _w = 16; break;
				case '6': _p = '66.6%'; _w = 16; break;
				case '7': _p = '77.7%'; _w = 16; break;
				case '8': _p = '88.5%'; _w = 16; break;
				case '9': _p = '99.9%'; _w = 16; break;
				default: break;
		}
		$n = $('<div class='+ n +'></div>');
		$n.css({
			'float': 'left',
			'background': 'url(images/scorenum.png) '+ _p +' no-repeat',
			'height': '25px',
			'width': _w
		});
		$('#'+ _t).append($n);
	}
}

function getScore(_t) {
	return $('#'+ _t +' > div:first').attr('class');
}

function addPlayers() {
	if (getPlayer() == 1)
		addPlayer(true);
	else if (getPlayer() == 2)
		addPlayer(true, true);
}

function addPlayer(one, two) {
	if (one) {
		t1 = new Obj({
	      'id': 'character_me',
	      'name': 'player1',
	      'bloods': 1,
	      'speed': 2,
	      'top': 512,
	      'left': 242,
	      'onDestory': function() {},
	      'afterDestory': function() {
	      	if (anyPlayer(1))
		      	addPlayer(true, false);
	      }
	  });
	  character.player1 = (character.player1 == 0)? 0 : character.player1 - 1;
		t1.shotable();
	}
	if (two) {
	  t2 = new Obj({
	      'id': 'character_ur',
	      'name': 'player2',
	      'bloods': 1,
	      'speed': 2,
	      'top': 512,
	      'left': 420,
	      'onDestory': function() {},
	      'afterDestory': function() {
	      	if (anyPlayer(2))
		      	addPlayer(false, true);
	      }
	  });
	  character.player2 = (character.player2 == 0)? 0 : character.player2 - 1;
		t2.shotable();
	}
	setPlayerCount('lifenum1', character.player1);
	setPlayerCount('lifenum2', character.player2);
}

//any players alive
function anyPlayer(p) {
	if (p == 1) {
		if (character.player1 != 0) {
			return true;
		}
		if (character.player1 == 0 && character.player2 != 0) {
			character.player2 = character.player2 - 1;
			setPlayerCount('lifenum2', character.player2);
			return true;
		}
	} else if (p == 2) {
		if (character.player2 != 0) {
			return true;
		}
		if (character.player2 == 0 && character.player1 != 0) {
			character.player1 = character.player1 - 1;
			setPlayerCount('lifenum1', character.player1);
			return true;
		}
	}
	if (character.player1 ==0 && character.player2 == 0 && $('div[isEnemy=false]').length == 0) {
		//lose
		gameOver('fail');
		return false;
	}
	if (character.player1 ==0 && character.player2 == 0)
		return false;
}

function pKeyEvent(n) {
	$(document).keydown(function(e){
        e = e || window.event;
        var key = e.which || e.keyCode;
        switch (key) {
            case 38: t1.move('up'); break;
            case 40: t1.move('down'); break;
            case 37: t1.move('left'); break;
            case 39: t1.move('right'); break;
            case 32: t1.fire(10); break;
            default: break;
        }
    });
    $(document).keyup(function(e){
        e = e || window.event;
        var key = e.which || e.keyCode;
        switch (key) {
            case 38: t1.stopMoving('up'); break;
            case 40: t1.stopMoving('down'); break;
            case 37: t1.stopMoving('left'); break;
            case 39: t1.stopMoving('right'); break;
            default: break;
        }
    });
    if (n == 2) {
	    $(document).keydown(function(e){
	        e = e || window.event;
	        var key = e.which || e.keyCode;
	        switch (key) {
	            case 71: t2.fire(10); break;
	            case 65: t2.move('left'); break;
	            case 87: t2.move('up'); break;
	            case 68: t2.move('right'); break;
	            case 83: t2.move('down'); break;
	            default: break;
	        }
	    });
	    $(document).keyup(function(e){
	        e = e || window.event;
	        var key = e.which || e.keyCode;
	        switch (key) {
	            case 65: t2.stopMoving('left'); break;
	            case 87: t2.stopMoving('up'); break;
	            case 68: t2.stopMoving('right'); break;
	            case 83: t2.stopMoving('down'); break;
	            default: break;
	        }
	    });
	  }
}

function addEnemies() {
	$('#level').css({'opacity': 1, 'top': '200px'});
	$('#level').animate({ opacity: 0, top: '100px' }, 1000);
	setTimeout(function() {
		$.each(['rt', 'gt', 'yt'], function(i, n) {
			if (getObjCount(n) > 0) {
				addEnemy(n);
			} else {
				if (isAny())
					addEnemy(isAny());
			}
		});
	}, 2000);
}

function addEnemy(_t, born) {
	var tmp;
	var e = character.enemy, _b, bloods = 1;	
	_b = born || $('.born:eq('+ e +')');
	_b.born();
	if (_t == 'bt')
		bloods = 3;
	te = new Obj({
 		'id': 'e' + e,
      'name': _t,
      'isEnemy': true,
      'speed': 2,
      'bloods': bloods,
      'top': parseInt(_b.css('top')),
      'left': parseInt(_b.css('left')),
      'onShoot': function() {
      	var tid = this.id;
      	removeAuto(enemies[tid]);
      	setTimeout(function() {
      		if (enemies[tid].isAlive())
      			moveAuto(enemies[tid]);
      	}, 500);
      },
      'onDestory': function() {
      	removeAuto(enemies[this.id]);
      	tmp = $('#' + this.id).data('b');
	    },
	    'afterDestory': function() {
	    	newEnemy(tmp, _t);
	    }
  });
  //for current enemy onDestory fn
  enemies[te.id] = te;
  //for current enemy afterDestory fn
  $('#e' + e).data('b', _b);
  te.move('down');
  te.shotable();
  moveAuto(te);
  setObjCount(_t, getObjCount(_t)-1);
	character.enemy = character.enemy + 1;
}

function newEnemy(_b, _t) {
	if (getObjCount(_t) == 0) {
		_t = isAny();
	}
	if (_t)
		addEnemy(_t, _b);
}

//any enemies alive
function isAny() {
	if (getObjCount('rt') > 0) {
		return 'rt';
	} else if (getObjCount('gt') > 0) {
		return 'gt';
	} else if (getObjCount('yt') > 0) {
		return 'yt';
	} else if (getObjCount('bt') > 0) {
		return 'bt';
	}
	if ($('div[isEnemy = true]') && $('div[isEnemy = true]').length > 0)
		return false;
	//win
	gameOver('win');
	return false;
}

function removeAuto(t) {
		t.stopMoving();
		clearInterval($('#container').data(t.id));
		$('#container').removeData(t.id);
}

function moveAuto(t) {
		with(Math)
		$('#container').data(t.id, setInterval(function() {
			if (state.exit) {
				removeAuto(enemies[t.id]);
				return false;
			}
			if (state.pause) {
				t.stopMoving();
				return false;
			}
			t.fire();
			var _d = round(random()*3);
			if (t.isBlocked() || round(random()*1) == 0)
				switch (_d) {
			      case 0:
			      		t.stopMoving();
			          t.move('up');
			          break;
			      case 1:
			      		t.stopMoving();
			          t.move('down');
			          break;
			      case 2:
			      		t.stopMoving();
			          t.move('left');
			          break;
			      case 3:
			      		t.stopMoving();
			          t.move('right');
			          break;
			      default: break;
			  }
			}, 1000));
}

function gameOver(_r) {
	if (_r == 'win' || _r == 'fail') 
		setTimeout(function() {
			exit();
			$('#startGame').slideUp();
			$('#wOrl').css('background', 'url(images/'+ _r +'.png) no-repeat');
			$('#gameover').slideDown(function() {
				$('#gameover *').show();
				//set score
				setScore('tp1r', character.p1.r * 100);
				setScore('tp1g', character.p1.g * 200);
				setScore('tp1y', character.p1.y * 300);
				setScore('tp1b', character.p1.b * 400);
				setScore('tp2r', character.p2.r * 100);
				setScore('tp2g', character.p2.g * 200);
				setScore('tp2y', character.p2.y * 300);
				setScore('tp2b', character.p2.b * 400);
				setBNum('p1Ttl', getScore('score1'));
				setBNum('p2Ttl', getScore('score2'));
				// press any key to continue
				var timr = setInterval(function() {
					$('#anyKey').toggleClass('presscontinue');
				}, 200);
				$(document).keydown(function() {
					if (_r == 'win' && getLevel() != 3) {
						clearInterval(timr);
						$(document).unbind();
						$('*').unbind();
						params.level++;
						$('#container *').remove();
						$('#container').css('background','url(images/'+ getScene('bgpic') +'.jpg) no-repeat');
						$('#gameover *').hide();
						$('#gameover').fadeOut(function() {
							$('#startGame').fadeIn(function() {
								$('#related').show(function() {
									loadGame();
								});
								initInfo();
							});
						});
					} else {
						clearInterval(timr);
						$(document).unbind();
						$('*').unbind();
						$('#gameover *').hide();
						$('#gameover').fadeOut(function() {
							$('#home').fadeIn(function() {
								$('#home > div').show();
								initMenu();
							});
						});
					}
				});
			});
		}, 1000);
	else if (_r == 'back')
		exit();
}

// releaseEvents
function exit() {
	state.exit = true;
	$(document).unbind();
	$(window).unbind();
	$('*').unbind();
	$('#related').hide();
	$('#startGame').hide();
}

//enermy born
(function($) {
	$.fn.extend({
		born: function() {
			$(this).append('<div class="bb"></div>');
			var i = 0;
			var timr = setInterval(function() {
				if (++i == 7) {
					$('.bb').remove();
					clearInterval(timr);
					return false;
				}
				$('.bb').css({
					'background': 'url(images/energy/'+ i +'.png) no-repeat',
					'height': '90px',
					'width': '90px',
					'position': 'relative',
					'top': '-24px',
					'left': '-29px'
					
				});
			}, 100);
		}
	});
})(jQuery);