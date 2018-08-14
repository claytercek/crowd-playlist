class Queue {
	constructor(io, spotifyAPI) {
		this.currentlyPlaying = {
			track: null,
			startTimestamp: null
		};
		this.trackQueue = [];
		this.gSocket = io;
		this.spotifyAPI = spotifyAPI;
	}

	// Accessor Methods
	getCurrentlyPlaying() {
		return this.currentlyPlaying;
	}

	getTrackQueue() {
		return this.trackQueue;
	}

	enqueue(track) {
		this.trackQueue.push(track);
	}

	play() {
		console.log("api.js > play");
		if (this.trackQueue.length <= 0) {
			console.log("nothing to play");
			this.playingContext = {
				track: null,
				startTimestamp: null
			};
			return;
		}

		const newTrack = this.trackQueue.shift();

		this.currentlyPlaying = {
			track: newTrack.track,
			startTimestamp: new Date()
		};
		this.spotifyAPI.play({ newTrack });
		// setTimeout(() => {
		// 	this.play();
		// }, 1000 + newTrack.track.duration_ms);

		// call socket functions from api.js
		// this.onPlay();
	}
}

module.exports = Queue;
