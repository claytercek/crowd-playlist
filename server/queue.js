class Queue {
	constructor(options) {
		this.currentlyPlaying = {
			track: null,
			startTimestamp: null
		};
		this.trackQueue = [];
		this.onPlay = options.onPlay;
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
		if (this.currentlyPlaying.track === null) {
			this.play();
		}
	}

	play() {
		console.log("api.js > play");
		if (this.trackQueue.length <= 0) {
			console.log("nothing to play");
			this.currentlyPlaying = {
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
		setTimeout(() => {
			this.play();
		}, 1000 + newTrack.track.duration_ms);

		// call socket functions from api.js
		this.onPlay();
	}
}

module.exports = Queue;
