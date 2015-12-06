/* utplaylist.js
 * Youtube simple playlist v1.1.0
 * Copyright (c) 2015 Mikele Shtembari - github.com/mikeleshtembari
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 * Date: 2015.12.02
 */

var frameDivId = '#youtubeFrame';
var frameHead = '<iframe id="iframeId" class="frameDefaultClass" src="//www.youtube.com/embed/';
var frameTail = '?enablejsapi=1&autoplay=1&color=white&showinfo=0" frameborder="0" allowfullscreen></iframe>';

var videoBeingPlayed = '';
// keyboar keys
var KEY_QUIT = '113'; // q
var KEY_HIDE = '104'; // h
var KEY_PAUSE = '32'; // space
var KEY_PAUSE2 = '112'; // p
var KEY_AUTOPLAY = '97'; // a
var KEY_SAVE = '115'; // s
var KEY_LOAD = '108'; // l
var KEY_HIDE_HELP = '109'; // m
var KEY_PLAY_NEXT = '110'; // n
var KEY_PLAY_PREV = '98'; // b

var autoplayEnabled = true;
var showVideoChecked = true;
var showVideoBool = true;

function echo (text) {console.log(text);}

function onVideoEvent (event) {
	switch(event.data) {
		case YT.PlayerState.PLAYING:
			break;
		case YT.PlayerState.PAUSED:
			break;
		case YT.PlayerState.BUFFERING:
			break;
		case YT.PlayerState.CUED:
			break;
		case YT.PlayerState.ENDED:
			if (autoplayEnabled)
				playNextSong();
		break;
	}
}

function playNextSong() {
	$(videoBeingPlayed).next().triggerHandler('click');
}

$(function pauseVideo () {
	$('#pauseVideoOption').click(function() {
		if ($(this).hasClass('isPlaying')) {
			$(this).removeClass('isPlaying').addClass('isPaused').html('Play');
			document.getElementsByTagName('iframe')[0].contentWindow.postMessage(
				'{"event":"command","func":"pauseVideo","args":""}', '*');
			return;
		}
		if ($(this).hasClass('isPaused') ){
			$(this).removeClass('isPaused').addClass('isPlaying').html('Pause');
			document.getElementsByTagName('iframe')[0].contentWindow.postMessage(
				'{"event":"command","func":"playVideo","args":""}', '*');
			return;
		}
	});
});

$(function getLinkAndAddSong () {
	$('#playlist > div > a').click(function () {
		var videoId = $(this).attr('data-id');
		videoBeingPlayed = this;
		$(frameDivId).html(frameHead + videoId + frameTail);
		$(this).css({backgroundColor: '#989293', color: 'white', fontWeight: 'bold'})
			.siblings().css({backgroundColor: 'transparent', color: 'initial', fontWeight: 'initial'});
		new YT.Player('iframeId', {events: {'onStateChange': onVideoEvent}});
	});
});

$(function selectTheList () {
	$('#selectPlaylist > a').append(' ').click(function () {
		$($(this).attr('href')).fadeIn().siblings().fadeOut();
		$(this).css('border', 'solid 1px darkgray').siblings().css('border', 'none').css('border-right', 'solid 1px gray');
		$(this).prev().css('border-right', 'none');
	});
});

$(function checkedOptions () {
	// show / hide video checkbox
	$('#showVideoOption').click(function () {
		if (showVideoBool)
			$("#youtubeFrame").fadeOut();
		else
			$("#youtubeFrame").fadeIn();
		showVideoBool ^= 1;
	});
	$('#autoplayOption').click(function () {
		autoplayEnabled ^= 1;
	});
});

$(function keys () {
	$('body').keypress(function (event) {
		if (event.which == KEY_QUIT) {
			clearFrame();
			alertFade('Stop');
		}
		if (event.which == KEY_HIDE) {
			if (showVideoBool) {
				$("#youtubeFrame").fadeOut();
				alertFade('Hide');
			} else {
				$("#youtubeFrame").fadeIn();
				alertFade('Show');
			}
			showVideoBool ^= 1;
			showVideoChecked ^= 1;
			$('#showVideoOption').prop('checked', showVideoChecked);
		}
		if (event.which == KEY_PAUSE || event.which == KEY_PAUSE2) {
			$('#pauseVideoOption').triggerHandler('click');
			alertFade('Pause');
		}
		if (event.which == KEY_AUTOPLAY) {
			autoplayEnabled ^= 1;
			$('#autoplayOption').prop('checked', autoplayEnabled);
			alertFade('Auto ' + (autoplayEnabled ? 'ON' : 'OFF'));
		}
		if (event.which == KEY_SAVE) {
			alertFade('Saved');
		}
		if (event.which == KEY_LOAD) {
			alertFade('Loaded');
		}
		if (event.which == KEY_HIDE_HELP) {
			alertFade('Help');
			$('#helpBox').slideToggle();
		}
		if (event.which == KEY_PLAY_NEXT) {
			alertFade('Next');
			playNextSong();
		}
		if (event.which == KEY_PLAY_PREV) {
			alertFade('Prev');
			$(videoBeingPlayed).prev().triggerHandler('click');
		}
		if (event.which == '99') {
			alertFade('Real click');
			document.getElementById('iframeId').contentWindow.$('button.ytp-play-button.ytp-button').trigger('click');
			echo(document.getElementById('iframeId'));
		}
	});
});

function alertFade (text) {
	$('#alertKeyboard').html(text)
		.css({'font-size':'150px', 'opacity':'0.5','display':'block'})
		.animate({fontSize: '220px', opacity: '0'},
			function () {$('#alertKeyboard').css('display','none');});
}

function clearFrame() {
	$(frameDivId).html('');
}

window.onload = function () {
	echo('Howdy!\nSimple Youtube Playlist v.1.0\nLicence: MIT\nAuthor: Mikele Shtembari\ngithub.com/mikeleshtembari');
	$('#playlist > div').addClass('hidden');
	$('#playlist > div > a').attr('href', 'javascript:void(0)');
	$('#allOptions input[type=checkbox]').css('background-image', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAAPCAMAAABgDjd9AAACdlBMVEVMaXHtOk7uOk7tOU74+PiMjIyeAQj5+fmqqqqxsLC8urv39/f5+fn29vZ5eXmPj4/g4OCAAQmjo6OYAQnJAg1+AQjSAg7LAg7AAgy1AgzJEB25ubmJiYnKysrb29urq6vOzs7kWmvl5OT////LzMx1AQjfO07R0tLlMkfrN0ydnJyrrKttamuPjI2+vr6nAQvEs7SHAQnyPVLoIzqvHS6wc3rExsacAQq2r7CZAABpAACsAg2QZmna2tr////29fX7+/vt7e3+/v79/f3wJUH39/fy8/Lu7u7V1dXg4ODsARD5+fntASDy8fH4+PjrAATw7/DsARbpAQzd3NzxAhD09PTDwsLuARDT0tK8vLz0//+hoKCRkJD8///TAABzc3PdAADpAADmAALiAADs7OympqaIiIjKAALgAhDQ0NCMi4v1AA3xJ0Xo5+fj4+PpAg/uACO0s7PxHzvvDC/sAArAAAX0N03Nzc3FxcboAhD5//+EhIR6enqYmJiUlJTtDCqxAgu7ubmyjpP0Bi6enJ3r6+unXGesrKykDiHKysq/0tLvFzSpqam/v7/xZnjzO1SBgYHuPE+2trbsHDb95uq8u7vvBi/Z2dnvBivvAg7zJUHwARjyNEvyARCvra3xAiHzgorxcHj5iJf3rrXz19r9u8P7mKLaX2r/7/LidYL+9PbSAg63nKDu///XAg7h//+ZDxnX+/mql5ikJjW3AADw9vWjipCXAAKOCxLyWG7iQkyZmZlYWFh3d3faj5ZsbGyvr6/q6uri4uLcHCPOP0bvAQbRO0Hk4ePm6+//r7XVnaD58vT9kJPqHivZSVHqLT7Rb3PrEB6JkR0zAAAAPnRSTlMA8fHx8ZsG8fHx8WTAw0qtrFbnc/ls+dJ00lg1Ne/vwMBy8fHxLDHxnOHx8fHx8fHxmPHx8fHx2/Hx8fHx/p4QkgwAAAKlSURBVHheZdGDk+VYFAbwdM/s2LattbfPjflo22jbtjG2bXvW1n+0N93zqqb2/VLBV3W+OpWEwLZ/+Pn7ub7+8qtvvvjswJ59+2fvnZVjycIFxKTlLbdqi2uL34Wj7HtS43pYSCHRY+MF6v8ikvM9AltcabfYZdmSTp+U7Wm7nLbImKXicZ8r6RAdyYiYkhCv4tSbFR/qBSER12e0WOx4lz0cjwcsobhJ9gVkvNz+4JHLcVglRpxurUGgDKDlmIgCNPAkAEnxuup1xNKEBQ/L4R9+/uWfwJ+/JX589UyPs/7OXck85XBnh5kXBLrU/1JkDjZ56sWxpphbZ+D5jcRqi7pK/7331z/gr3/hchjOhHDb13XTLL3Flx60Gmjbi9JGP6T80SbRn3IPIIOA1hPL1NWm0Jkr4fCl3xPg8l05GzKZjla2uYqyBFs3Lyj+AYCGZKMbEHpdzSCKEqwFxHX81kZj6Pz5oH4U/r527eqFs0Gj8XjljbrCLEPvKYVDDQU0dA86R1Ie0hNrqKEpipeIFXaTUaMJXroQCF2FcfKEFw0FNZrT8Tbvt1mophUY8DgAombnmyIJnveaBYZT2yuPGks0mophuPxT3blmCF6EIT1uB7rqOqm3oLUaFBgckZIx2j0GQNZ/B6AjEb+BWCWXqPTnwHtRz07IzRNPK3A+3nNbp53CK1GBUUh6IFafhG4nkGSjGRRFIdEmYkai/YiqIjNs1JSXH8KnGtvj9wBZJ4GtFEhFR0OhARSOwz2kUzCg1hLEmswxlmUzbHlzWYbtZ9n+MhY7VtbTBySHh8HcoSUVjAS8kWbU3mRmFhHY5tGqqhM5qsbv2+oAc0QlPJ2Lm0dM2rFrd35eXt60PFX2If+jjz/59IOd2+bM3rJ15vRc8+fi5n9IszXRXdeIMwAAAABJRU5ErkJggg==)');
	$('#alertKeyboard').addClass('hidden').after('<a href="http://github.com/mikeleshtembari" target="_blank"><div id="showTheLove">Made with <span>&#10084;</span> for the Web</div></a>');
};
