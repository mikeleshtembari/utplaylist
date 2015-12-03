# utplaylist 1.0.0
###A relatively simple youtube playlist with autoplay
* You can include it in your website or use it locally
* Made with HTML, CSS, jQuery and just a lil' from youtube_iframe_api

###Motivation
I don't like the fact that I have to sign-in on youtube in order to create a playlist. (I know that you can create one using the query string, but hey... that's not very comfortable.)

###License
Released under the MIT license - http://opensource.org/licenses/MIT

###Live demo
Go at http://mikeleshtembari.github.io/utplaylist/  
or at http://mikele.xyz/utplaylist/utplaylist.html

###Christmas gift!
If you want me to upload a playlist and use it live from my website, contact me ^_^

###Installation
* Everything is already included in the 2 files `utplaylist.html` and `utplaylist.js`, so you just need to copy them into your folder
* Don't forget to change the line below in case the script is in a different directory.
```html
<script src="utplaylist.js"></script>
```
* In order to create the playlists and populate them, you have to add a playlist in here
```html
	<!-- This is where you add a new playlist. -->
	<!-- The href attribute must correspond with the ID attribute below, where you add the songs -->
	<div id="selectPlaylist">
		<a href="#playlist1">Metallica</a>
		<a href="#playlist2">Love Songs</a>
		<a href="#playlist3">Mix</a>
		<a href="#playlist4">Classical</a>
	</div>
```
* Then create the playlist and populate it
```html
	<!-- For each playlist you add the songs. -->
	<!-- The ID of playlist <div> must correspond with the href attribtue above, where you add the playlist -->
	<div id="playlist">
		<div id="playlist1">
			<a data-id="0FMfsT11pdA">Fade to black</a>
			<a data-id="CD-E-LDc384">Enter sandman</a>
			<a data-id="IyTA2Maj6Ug">Lords of summer</a>
		</div>
		<div id="playlist2">
		</div>
		<div id="playlist3">
		</div>
		<div id="playlist4">
		</div>
	</div>
```
* To add the link of the video, you take the URL from, say `https://www.youtube.com/watch?v=KBx1Q3DEyDY`, extract only the video ID, in this case being `KBx1Q3DEyDY` (the thing after `?v=`), then you put it in the `data-id` attribute in the HTML, in our case
```html
<div id="playlist2">
  <a data-id="KBx1Q3DEyDY">Wicked game - Chriss Isaak</a>
</div>
```
###Usage
* There are a bunch of options in the interface, also by using the keyboard. For more, check the help menu in the program.

###Known issues
* If the autoplay is not working in Chrome/IE, try to open the playlist page in a new browser window, NOT TAB, and then leave it in the background, but don't minimize it. In Firefox, seems to work fine.
* In firefox/IE, the fancy ON/OFF checkboxes are deactivated.

###Version 1.0.0
* Initial release

Music is life.
