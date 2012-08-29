/*
 * Main script
 */
var sokoban = null; // global variable for the sokoban game

window.addEvent('domready', function () {
	// loader and game setup
	var lastLevel = (Cookie.read('postasokoban') || '0').toInt();
	var loader = new SokobanIndexedLevelLoader(mazeDatabase, 'sokoban');
	sokoban = new SokobanGame(loader);
	sokoban.onLevelUp = function () {
		this.echo(this.levelMessage() + ' / '
			+ this.loader.mazeDatabase.length);
		Cookie.write('sokowalter', this.loader.index);
		if(sokoban.levelName != 0 && sokoban.levelName !=lastLevel){
			sendLevelUp(sokoban.levelName + 1);
		}
	}.bind(sokoban);
	
	$('start').addEvent('click', function () {
		run(0);
	});
	
	$('getFriends').addEvent('click', function () { getFriends(); });
	$('sendInvite').addEvent('click', function () { sendInvite(); });
	$('sendBrag').addEvent('click', function () { sendBrag(); });
	
	if (!lastLevel)	{
		$('resume').addClass('disabled');
	} else {
		$('resume').set('text', 'Resume Level '+(lastLevel+1));
		$('resume').addEvent('click', function (e) {
			sokoban.loadLevel(lastLevel);
			run(lastLevel);
		});
	}
	
	$('twitter').addEvent('click', function () {
		var level = (Cookie.read('postasokoban') || '0').toInt() + 1;
		var status = 'I reached level ' + level + ' in postasokoban! '
				+ 'http://scoffey.github.com/postasokoban/';
		var url = 'http://twitter.com/?status=' + escape(status);
		window.open(url, '_blank');
	});
	
	
	
});

  function run(level) {
	  if(uid) {
		startApp(level);
	  } else {
		authUser();
	  }
  }
  
  function startApp(level){
		sokoban.loadLevel(level);
		$('splashscreen').setStyle('display', 'none');
		$('content').setStyle('display', 'block');
	}

// Maze database (array of strings that indicate tile states)
// TODO: store sokoban maze data (XSB) in run length encoding (RLE)
var mazeDatabase = [
                    
    // easy
	'#####|#  .#|# $ #|##@##|##$##|#   #|#.  #|#####',
	'#######|#. # .#|# $@$ #|#  #  #|#######',
	'######|#.   #|#$$  #|#@.###|####  ',
	'####### |#+.   ##|# # $$ #|#      #|########',
	'####|#@.#|#$ #|#  #|# $#|#. #|#  #|####',
	' #####|##  .#|#@$  #|#  * #|######',
	'   #####|####   #|#@$  # #|#. $  .#|########',
	'########|#  .#  #|#  $@$ #|#  ## .#|########',
	'####### |#  #  ##|# $@$  #|#. #  .#|########',
	'#####|#  .#|# $ #|##@##|#.$ #|#   #|#  ##|#### ',
	'#######|#@ #  #|#  $$ #|#  . .#|#######',
	'########|#   #  #|#  $@$ #|#  .# .#|########',
	'########|#@ #   #|#  #.  #|#  # $ #|## $ ###| #   #  | #.  #  | #####  ',
	' ####|##@ #|# $ #|#   #|##  #| #$.#| # .#| ####',
	'#####|#@  #|#   #|# $ #|#.$##|#. # |#  # |#### ',
	'#######|#    .#|#    $#|#  #  #|#### ##|  #@$ #|  #.  #|  #####',
	'#####|#@  #|# $ #|## .#| #$ #| # .#| ####',
	'#####|#@  #|#   #|# $ #|#$ ##|#. .#|#   #|#####',
	'########|#+.    #|# $ $  #|####  ##|   #### ',
	'########|# .#@  #|#   $  #|#  *   #|########',
	'#####|#+  #|#  *#|# $ #|##  #| #  #| ####',
	'#####   |#   #   |#   #   |#  #####|##$.#@ #|#    $ #|#   # .#|########',
	'#### |#  # |#. ##|# $@#|# $ #|#. ##|#### ',
	'####### |#@ #..# |#     # |# $ $ ##|#   #  #|#####  #|    ####',

	// medium
	'########|#@ #.  #|#      #|#  #.  #|#  ##  #|# $$   #|#   #  #|########',
	'    ####|    #  #|##### .#|#@  #$ #|#     $#|#     .#|##  #  #| #######',
	'#####   |#@ .#   |#   #   |##$.####|#  #   #|#  $   #|#   ####|#####   ',
	'#### |#..# |# $##|# $@#|# $ #|## .#| ####',
	'########|#@ .#  #|#   $ .#|#   #  #|#### $ #|   #   #|   #   #|   #####',
	'########|#@     #|#  $ $ #|#   ####|#  #..# |#     # |#     # |####### ',
	'  ##### |  #@  # |  #   # |###  $##|#..# $ #|#      #|#      #|########',
	' #####  |##@  #  |# $  #  |#  $ ## |###   ##|  #    #|  #  ..#|  ######',
	'####### |# .  .# |# #   # |#    ## |#   $@##|#  # $ #|####   #|   #####',
	'####    |#@ #####|#  $ $ #|#  ..  #|########',
	'####    |#@ #####|#   #. #|#   #  #|#  #  ##|#  $$ # |#    .# |####### ',
	'#####   |#@  #   |#   #   |# $ ####|#* #.  #|#      #|#   #  #|########',
	'########|#@  #  #|# $ #  #|#   #  #|# $#.  #|#      #|#  #.  #|########',
	'########|#@  #..#|#      #|##   $ #|#   ####|#    $ #|#      #|########',
	'########|#@ . . #|#    # #|####   #|#  $   #|# #$ # #|#      #|########',
	' ###### | #@.. # |## #  ##|#  #   #|# $$   #|##     #| #######',
	' ####  |##@.#  |# $ #  |# $ ###|# $#  #|#.   .#|##  ###| ####  ',
	' #######|##  $@.#|#  $ $.#|#.  ####|#####   ',
	' ####|##@.#|#.  #|# $ #|# $##|#  # |#  # |#### ',
	' #######|##+    #|#  $$  #|#.  #  #|########',
	'  ######|  #@   #|  #    #|  #.. ##|#### $ #|#   $  #|#   #  #|########',
	' #######|##+    #|#  $$  #|#   #  #|## ##  #|#   #  #|#  .#  #|########',
	' ###### | #@ ..# | #$   # | #  ####|##$    #|#      #|#   ####|#####   ',
	'########|#@ # . #|#      #|#  # . #|# $ # ##|# $   # |#   ### |#####   ',
	'#### |#+ ##|#   #|# $.#|##$ #|#   #|#   #|#####',

	// hard
	'########|#@     #|#      #|#   #.##|# $# .# |# $   # |##  ### | ####   ',
	'####### |#     ##|#    $@#|# $ #  #|#  #   #|#  #   #|####. .#|   #####',
	'    ####|   ##@ #|####.  #|#      #|# $ #  #|# #$.  #|#      #|########',
	'#####  |#  .#  |#.$ #  |#   ###|#$ #@ #|#   $.#|##  ###| ####  ',
	' ####|##@ #|# $ #|#.$.#|##$.#|#   #|#   #|#####',
	'#####|#. .#|#  .#|# $ #|##$ #| #@$#| #  #| ####',
	'#####|#. .#|#  .#|# $ #|##$$#| #@ #| #  #| ####',
	'#### |#@ # |#  # |#$$##|#   #|#.$.#|#.  #|#####',
	'####### |#@ #  ##|#      #|#  # ..#|#    $ #|#  $####|#   #   |#####   ',
	'#####|#@  #|# $.#|# $##|# $ #|#.  #|## .#| ####',
	'########|#+   ..#|# $$$# #|## #   #|#  #####|#  #    |#  #    |####    ',
	'#####   |#+  ####|# . .  #|#  $ $ #|## $####| #  #   | #  #   | ####   ',
	'   #####| ###   #| #@ $  #|##   $##|# .#  # |#     # |##. ### | ####   ',
	'######  |#@   #  |# #$ #  |# $  ###|#  #   #|#  . . #|#  #   #|########',
	'#####  |#. .#  |#.  #  |# $ ###|# $#@ #|#   $ #|#  ####|####   ',
	'########|#+ #   #|# $ $  #|#. #  ##|# $ ### |#  .#   |#  ##   |####    ',
	'#####   |#@  ### |# $   # |# $## ##|#  #.  #|#      #|#  #. ##|####### ',
	'#######|#    .#|#  $$ #|#  # .#|##$@###|#.  #  |#   #  |#####  ',
	'########|#@   ..#|# $$$  #|#  #  .#|########',
	' #######|##  #  #|#  $@$ #|#. ##$ #|#      #|#   .  #|#. #   #|########',
	'########|#      #|#    #.#|##$    #|#@ ## .#|# $ #  #|#   #  #|########',
	'########|#@ #  .#|#    #.#|#      #|# $#   #|#* $   #|#   ####|#####   ',
	'########|# .#@  #|# .#$$ #|#    ###|#     # |# #   # |#   ### |#####   ',
	'####### |#@    ##|#      #|#   #  #|##### ##|# $ $  #|#   . .#|########',
	'   #####|   #. .#|#### $ #|#@  #  #|# $ $  #|#. #  ##|####### ',
	
	// impossible
	'########|#@.  . #|# #  # #|#      #|# $ $  #|####.$ #|   #####',
	' ###### |##    ##|#@$  $ #|#  ##  #|#. .#  #|#   #  #|##  ####| ####   ',
	'########|#@     #|# $ $  #|## #   #|#.$.####|#   #   |#  .#   |#####   ',
	'####    |#@ #    |#  #    |# $#####|#  #.  #|#.$ $# #|##    .#| #######',
	'########|#@     #|#..  # #|##  $$ #| ##    #| #. $# #| #     #| #######',
	'   #####|####   #|#      #|#     ##|##..#$@#| #   $ #| ###  ##|   #### ',
	'######  |#@   #  |# #$$#  |#  $ ###|# .# ..#|#      #|#      #|########',
	'  #### |###@ ##|#   $ #|# ##  #|# .#$ #|#    $#|# .  .#|#######',
	' ####  |##@ ###|#. . .#|#  #  #|##  $$#| # $  #| ###  #|   ####',
	'########|#+  . .#|#$     #|#  ## ##|##$ # # | #  $ # | #  ### | ####   ',
	'########|#  #+  #|#  #.$ #|#  * ###|#   $ # |####  # |   #  # |   #### ',
	' ####   | #@ #   | #  #   |##$ ####|#  #.  #|#    $$#|##  . .#| #######',
	'####### |#     # |#.#   # |#     # |#. $####|# #@$  #|# .$   #|########',
	'   #####| ###   #| #+$ # #|##.#   #|#  $ . #|#  $####|#   #   |#####   ',
	' #######|##@ ...#|# $    #|#  ## ##|#   #  #|# $$   #|#   #  #|########',
	'#####   |#.  ####|#. $#@ #|## $   #|#   *  #|#   #  #|##  #  #| #######',
	'   #### | ###@ # | #    # |##.$####|#      #|# .$$  #|# . #  #|########',
	'#####   |#@  ### |#. .  # |#    $##|#.$##  #|# $    #|##  #  #| #######',
	'#####   |#   ####|#  $@  #|##$    #| #  # .#| #$    #| #  #..#| #######',
	'####    |# .#####|#  $@$ #|# $    #|##  ####| #  ..# | ###  # |   #### ',
	'   #### |   #@ # |   #  # |####. ##|#  . $ #|# $ $. #|#####  #|    ####',
	'########|#   #@ #|#   #  #|##$$  ##| #     #| ### ..#|   #####',
	'#####   |#.. ### |#  .  # |## $  ##|####$$@#|#      #|#      #|########',
	'####    |#  #####|#      #|# $#   #|#   ####|#.$$@ # |##  ..# | ###### ',
	'   #####| ###   #| #@$ # #|##$$   #|#  ## ##|#. .   #|##   . #| #######',
	'#####   |#+$.####|#   #  #|# $##  #|#. ##  #|# $$   #|#. #   #|########'
];
