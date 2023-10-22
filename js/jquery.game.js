var state = {
	exit: false,
	pause: false
}

// character obj
function Obj(opt){
    // private params
    this.id = opt.id;
    var isAlive = true;
    var id = this.id;
    var name = opt.name;
  	var isEnemy = opt.isEnemy || false;
    var speed = opt.speed;
    var characterType = opt.characterType;
    var bloods = opt.bloods || 1;
    var top = opt.top;
    var left = opt.left;
    var that = this;
    
    // public mehtod
    this.isBlocked = function() {
    	var t = $('#' + id);
    	var _d = getDirectory();
    	return isBlocked(t,_d);
    };
    // blood
    this.shotable = function(){
        $('#' + id).unbind().click(function(e, _d){
           if (name == 'bt') {
           		var _b = 4 - bloods;
           		$('#' + id).css('background-image', 'url(images/energy/character4-'+ _b +'.png)');
           		opt.onShoot();
           		move(_d);
           		fire();
           }
           if (--bloods == 0) {
            		if ($(this).data('who')) {
				        		if ($(this).data('who') == 'player1') {
				        			switch ($(this).attr('title')) {
								 				case 'rt': setScore('score1', parseInt(getScore('score1')) + 100);character.p1.r++; break;
								        case 'gt': setScore('score1', parseInt(getScore('score1')) + 200);character.p1.g++; break;
								        case 'yt': setScore('score1', parseInt(getScore('score1')) + 300);character.p1.y++; break;
								        case 'bt': setScore('score1', parseInt(getScore('score1')) + 400);character.p1.b++; break;
								        default: break;
									    }
					        	} else {
					        		switch ($(this).attr('title')) {
								 				case 'rt': setScore('score2', parseInt(getScore('score2')) + 100);character.p2.r++; break;
								        case 'gt': setScore('score2', parseInt(getScore('score2')) + 200);character.p2.g++; break;
								        case 'yt': setScore('score2', parseInt(getScore('score2')) + 300);character.p2.y++; break;
								        case 'bt': setScore('score2', parseInt(getScore('score2')) + 400);character.p2.b++; break;
								        default: break;
									    }
					        	}
            		}
                destory($(this));
            }
        });
    };
    
    //move
    this.move = move;
    
    this.stopMoving = stopMoving;
    
    //attack
    this.fire = fire;
    
    //destory
    this.destory = destory;
    
    //is alive
    this.isAlive = function() {
    		return isAlive;
    };
    
    //directory
    this.getDirectory = getDirectory;
    
    // private 
    function getDirectory() {
    		var _p, _d, bg = $('#' + id).css('background');
    		if ($.browser.msie) 
    				_p = bg.substring(bg.indexOf('no-repeat') + 9, bg.indexOf('%')).toString();
    		else
    				_p = $('#' + id).css('background-position').split('%')[0];
    		switch (parseInt(_p)) {
            case 0:
                _d = 'up';
                break;
            case 33:
                _d = 'down';
                break;
            case 66:
                _d = 'left';
                break;
            case 99:
                _d = 'right';
                break;
            default: break;
        }
        return _d;
    };
    
    function fire() {
        b = new Bullet(that,10);
        b.shoot();
    };
    
    function move(_d) {
    		if (isAlive == false) {
						stopMoving();
						return false;
				}
        var that = $('div#' + id);
        if (_d == 'left') {
            if (that.hasClass('movingup') || that.hasClass('movingdown') || that.hasClass('movingleft') || that.hasClass('movingright')) {
                return false;
            }
            else {
                var left = parseInt(that.css('left'));
                that.removeClass().addClass('movingleft');
                that.css('background-position', '66%');
                that.data('timrleft', setInterval(function(){
                    if (isBlocked(that,'left') || state.exit || state.pause) {
                        stopMoving();
                        return false;
                    }
                    that.css('left', left -= speed);
                }, 10));
            }
        }
        else 
            if (_d == 'up') {
                if (that.hasClass('movingup') || that.hasClass('movingdown') || that.hasClass('movingleft') || that.hasClass('movingright')) {
                    return false;
                }
                else {
                    var top = parseInt(that.css('top'));
                    that.removeClass().addClass('movingup');
                    that.css('background-position', '0%');
                    that.data('timrup', setInterval(function(){
                        if (isBlocked(that,'up') || state.exit || state.pause) {
                        		stopMoving();
                            return false;
                         }
                        that.css('top', top -= speed);
                    }, 10));
                }
            }
            else 
                if (_d == 'right') {
                    if (that.hasClass('movingup') || that.hasClass('movingdown') || that.hasClass('movingleft') || that.hasClass('movingright')) {
                        return false;
                    }
                    else {
                        var left = parseInt(that.css('left'));
                        that.removeClass().addClass('movingright');
                        that.css('background-position', '99%');
                        that.data('timrright', setInterval(function(){
                            if (isBlocked(that,'right') || state.exit || state.pause) {
                        				stopMoving();
                                return false;
                            }
                            that.css('left', left += speed);
                        }, 10));
                    }
                }
                else 
                    if (_d == 'down') {
                        if (that.hasClass('movingup') || that.hasClass('movingdown') || that.hasClass('movingleft') || that.hasClass('movingright')) {
                            return false;
                        }
                        else {
                            var top = parseInt(that.css('top'));
                            that.removeClass().addClass('movingdown');
                            that.css('background-position', '33%');
                            that.data('timrdown', setInterval(function(){
                                if (isBlocked(that,'down') || state.exit || state.pause) {
                        						stopMoving();
                                    return false;
                                }
                                that.css('top', top += speed);
                            }, 10));
                        }
                    }
    };
    
    function stopMoving(_d) {
	    	var that = $('div#' + id);
	    	if (_d == undefined) {
	        	_d = getDirectory();
	    	}
	    	if (_d == 'left') {
	          clearInterval(that.data('timrleft'));
	          that.removeClass('movingleft');
	      } else if (_d == 'up') {
	      		clearInterval(that.data('timrup'));
	          that.removeClass('movingup');
	      } else if (_d == 'right') {
	      		clearInterval(that.data('timrright'));
	          that.removeClass('movingright');
	      } else if (_d == 'down') {
	      		clearInterval(that.data('timrdown'));
	          that.removeClass('movingdown');
	      }
    }

	function isBlocked(t,_d) {
		var _l = parseInt(t.css('left'));
		var _t = parseInt(t.css('top'));
		var flag = false;

		for (var i in blocks) {
			if (flag) { break; return false; }
			var _l1 = parseInt(blocks[i].l);
			var _t1 = parseInt(blocks[i].t) - 100;
			flag = isLap(_d, _l, _t, _l1, _t1);
		}


		$('div[isEnemy]:not(#'+ t.attr('id') +')').each(function(i,n) {
			if (flag) return false;
			var _l1 = parseInt($(n).css('left'));
			var _t1 = parseInt($(n).css('top'));
			flag = isLap(_d, _l, _t, _l1, _t1);
		});
		return flag;
	}
	
	function isLap(_d, _l, _t, _l1, _t1) {
			var flag = false;
			switch (_d) {
	        case 'up':
							if (_l + 31 > _l1 && _l - 31 < _l1 && _t + 30 > _t1 && _t - 36 < _t1 || _t < 10) {
								flag = true;
							}
	            break;
	        case 'down':
							if (_l + 31 > _l1 && _l - 31 < _l1 && _t + 36 > _t1 && _t - 31 < _t1 || _t > 510) {
								flag = true;
							}
	            break;
	        case 'left':
	            if (_l + 31 > _l1 && _l - 36 < _l1 && _t - 31 < _t1 && _t + 31 > _t1 || _l < 10) {
								flag = true;
							}
	            break;
	        case 'right':
							if (_l + 36 > _l1 && _l - 31 < _l1 && _t - 31 < _t1 && _t + 31 > _t1 || _l > 650) {
								flag = true;
							}
	            break;
	        default: break;
	    }
	   	return flag;
	}
    
    function destory(_t) {
    		isAlive = false;
    		stopMoving();
    		opt.onDestory();
    		_t.destory('mapbomb', 10);
    		setTimeout(function() {
    			opt.afterDestory();
    		}, 1000);
    }
    
    function init() {
        $('#container').append('<div isEnemy="'+ isEnemy +'" title=' + name + ' id=' + id + ' style="position:absolute;width:36px;height:36px;top:' + top + 'px;left:' + left + 'px;z-index:2;"></div>');
        if (isEnemy) {
        	var tImg = (name == 'rt') ? 'character1' : (name == 'gt') ? 'character2' : (name == 'yt') ? 'character3' : 'character4';
        	$('#' + id).css({'background': 'url(images/energy/'+ tImg +'.png) 33% 55% no-repeat'});
        } else {
        	$('#' + id).css({'background': 'url(images/player.png) 0% 55% no-repeat'});
	      }
    }
    init();
}

//bullet obj
function Bullet(_t,speed){
    this.speed = speed;
    var character = $('#' + _t.id);
    
    //public shoot
    this.shoot = function(){
    	if ($('span[title='+ character.attr('id') +']').length == 1) return false;
    	if (state.exit || state.pause)
    		return false;
    		var top = character.offset().top;
        var left = character.offset().left;
        var _d = _t.getDirectory();
        switch (_d) {
            case 'up':
                top -= 5;
                left += 12;
                addBullet(top, left, 'top', -speed, 'down');
                break;
            case 'down':
                top += 30;
                left += 12;
                addBullet(top, left, 'top', speed, 'up');
                break;
            case 'left':
                top += 10;
                left -= 5;
                addBullet(top, left, 'left', -speed, 'right');
                break;
            case 'right':
                top += 10;
                left += 30;
                addBullet(top, left, 'left', speed, 'left');
                break;
            default: break;
        }
    }
    
    //private
    //add bullet to container
    function addBullet(top,left,_d,_s, BT) {
        var is_en = character.attr('isEnemy')=='true'?false:true;
        var by_whom = character.attr('title');
    		var $bullet = $('<span title="'+ character.attr('id') +'" class="'+ character.attr('isEnemy') +'" style="position:absolute;width:18px;height:18px;top:' + top + 'px;left:' + left + 'px;z-index: 3;"></span>');
        $bullet.css('background','url(images/bullet/bullet.png) no-repeat');
        $('div#container').append($bullet);
        isHit($bullet, top, left, _d, _s, is_en, by_whom, BT);
    }
    
    // bullet moving and a listener
    function isHit(bullet, top, left, _d, _s, is_en, by_whom, BT){
				var hit = false;
    		var timr = setInterval(function(){
    				if (state.exit) {
    						clearInterval(timr);
    						return false;
    				}
    				if (state.pause) {
    						return false;
    				}
    				if (top < 10 || top > 535 || left < 10 || left > 675) {
    						clearInterval(timr);
    						explode(bullet);
    						return false;
    				}
    				bullet.css(_d, _d == 'top' ? top += _s : left += _s);
				$('div[isEnemy='+ is_en +']').each(function(i,n) {
			        var t_top = parseInt($(n).css('top'));
			        var t_left = parseInt($(n).css('left'));
			        if (t_top < top + 10 && t_top > top - 36 && t_left < left + 10 && t_left > left - 36 && !hit) {
									hit = true;
			        		clearInterval(timr);
			        		// enemy
			        		if ($(n).attr('isEnemy') == 'true') {
								const hitMusic = new Audio();
								hitMusic.src="music/hit.mp3";
								hitMusic.play();
			        			$(n).data('who',by_whom);
			        			$(n).trigger('click', BT);
			        		// player
			        		} else if ($(n).attr('isEnemy') == 'false') {
			        			const dieMusic = new Audio();
								dieMusic.src="music/shout.mp3";
								dieMusic.play();
								$(n).click();
			        		} 
			        		explode(bullet);
						return;
			        }
			      });
				for (var i in blocks) {
				  	var t_top = parseInt(blocks[i].t) - 100;
			      var t_left = parseInt(blocks[i].l);
			      if (t_top < top + 10 && t_top > top - 36 && t_left < left + 10 && t_left > left - 36 & !hit) {
							hit = true;
							if (blocks[i].clazz =='w') {
		        			return;
		        		}
		        		clearInterval(timr);
		        			// type of blocks
		      			if (blocks[i].clazz == 'crystal') {
		      				$('div[isEnemy=false]').each(function() {
		      					$(this).destory('bomb', 10);
		      				});
							const boomMusic = new Audio();
							boomMusic.src="music/explosion.mp3";
							boomMusic.play();
		      				$('#rb'+i).destory('bomb', 10);
									delete blocks[i];
		      				gameOver('fail');
		      			} else if (blocks[i].clazz == 'e' && $('#rb'+i).hasClass('halfBlood')) {
							const crushMusic = new Audio();
							crushMusic.src="music/pumpkinCrush.mp3";
							crushMusic.play();
							$('#rb'+i).destory('mapbomb', 10);
								delete blocks[i];
		      			} else if (blocks[i].clazz =='e') {
		      				$('#rb'+i).addClass('halfBlood');
		      				$('#rb'+i).css('background', 'url(images/'+ getScene('map') +'.png) 100% no-repeat');
		        		}
							explode(bullet);
		        			break;
        		}
				}
			  }, 10);
    }
    
    // explosion
    function explode(_b) {
    		var i = 1;
    		_b.text('');
    		var timr = setInterval(function(){
    				_b.css({
    						'background': 'url(images/bullet/'+ i +'.png) no-repeat'
    				});
    				if (i == 6) {
    						clearInterval(timr);
    						_b.remove();
    				}
    				i++;
    		}, 50);
    }
    
}

//roadblock obj
function RoadBlock(opt) {
		var top = parseInt(opt.top);
    var left = opt.left;
    var map = getScene('map');
    var clazz = opt.clazz;
    var id = opt.id;
	
	// private init
    function init() {
    	var _c = 'roadblock ' + clazz;
    	if (clazz == 'b')
    		_c = 'born';
    		var $block = $('<div class="'+ _c +'" id="'+ id +'"></div>');
    		var _p = clazz == 'e'? '14.29%' : clazz == 'h'? '28.57%' : clazz == 'w'? '57.14%' : '85.71%';
    		$block.css({
        		'top': top-100,
        		'left': left,
        		'background': 'url(images/'+ map +'.png) '+ _p +' no-repeat'
        });
        $('#container').append($block);
    }
		init();
}

//crystal obj
function Crystal() {
		
		// private init
		function init() {
				var $crystal = $('<div class="roadblock crystal" id="rb1000"></div>');
				$crystal.css({
						'top': '500px',
						'left': '331px',
						'background': 'url(images/crystal.png) no-repeat',
						'z-index': 3
				});
				$('#container').append($crystal);
		}
		init();
}

//public method for all obj
$.fn.destory = function(map, n) {
		var _o = $(this);
		var i = 1;
		var top = parseInt(_o.css('top')) - 37;
		var left = parseInt(_o.css('left')) - 37;
		var timr = setInterval(function() {
				_o.css({
						'background': 'url(images/'+ map +'/'+ i +'.png) no-repeat',
						'width': '110px',
						'height': '91px',
						'top': top,
						'left': left
				});
				if (i++ == n) {
						clearInterval(timr);
						_o.remove();
				}
		}, 50);
}