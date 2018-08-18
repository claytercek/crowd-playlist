class Queue {
	constructor(options) {
		this.nowPlaying = {
			track: null,
			startTimestamp: null,
			user: null
		};
		this.trackQueue = [];
		this.onPlay = options.onPlay;
	}

	// Accessor Methods
	getNowPlaying() {
		return this.nowPlaying;
	}

	getTrackQueue() {
		return this.trackQueue;
	}

	enqueue(track) {
		this.trackQueue.push(track);
		if (this.nowPlaying.track === null) {
			this.play();
		}
	}

	play() {
		console.log("api.js > play");
		if (this.trackQueue.length <= 0) {
			console.log("nothing to play");
			this.nowPlaying = {
				track: null,
				startTimestamp: null,
				user: null
			};
			return;
		}

		const newTrack = this.trackQueue.shift();

		this.nowPlaying = {
			track: newTrack.track,
			startTimestamp: new Date(),
			user: "clay"
		};
		setTimeout(() => {
			this.play();
		}, 1000 + newTrack.track.duration_ms);

		// call socket functions from api.js
		this.onPlay();
	}
}

module.exports = Queue;
