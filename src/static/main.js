const YouTubeIframeLoader = require('youtube-iframe');

const button = document.getElementById('button-play-toggle');
let player;

YouTubeIframeLoader.load(function(YT) {
	player = new YT.Player('player', {
		height: '1',
		width: '1',
		videoId: 'DWcJFNfaw9c',
		events: {
			onReady: (e) => {},
			onStateChange: onPlayerStateChange
		}
	});
	window.__PLAYER = player;
});

button.addEventListener('click', handleButtonClick);


function handleButtonClick() {
	const playerState = player.getPlayerState();
	console.log(playerState);
	if (playerState !== YT.PlayerState.PLAYING) {
		player.playVideo();
	} else {
		player.pauseVideo();
	}
}

function onPlayerStateChange(event) {
	console.log(event.data);
	if (event.data == YT.PlayerState.UNSTARTED) {
		button.setAttribute('data-state', 'BUFFERING');
	}
	if (event.data == YT.PlayerState.BUFFERING) {
		button.setAttribute('data-state', 'BUFFERING');
	}
	if (event.data == YT.PlayerState.PLAYING) {
		button.setAttribute('data-state', 'PLAYING');
	}
	if (event.data == YT.PlayerState.PAUSED) {
		button.setAttribute('data-state', 'PAUSED');
	}
}
