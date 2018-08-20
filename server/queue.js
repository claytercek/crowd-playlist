class Queue {
	constructor(options) {
		this.nowPlaying = {
			track: null,
			startTimestamp: null,
			user: null
		};
		this.trackQueue = [];
		this.onPlay = options.onPlay;
		this.onVote = options.onVote;
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

	sort() {
		this.trackQueue.sort((a, b) => {
			const diffVoters = b.voters.value - a.voters.value;
			if (diffVoters !== 0) {
				return diffVoters;
			} else {
				return a.enqueueTime - b.enqueueTime;
			}
		});
	}

	voteUp(trackIndex, user_id) {
		if (this.trackQueue[trackIndex].voters.positive.includes(user_id)) {
			return;
		} else {
			let negativeIndex = this.trackQueue[trackIndex].voters.negative.indexOf(user_id);
			if (negativeIndex !== -1) {
				this.trackQueue[trackIndex].voters.negative.splice(negativeIndex, 1);
				this.trackQueue[trackIndex].voters.value += 1;
			}
			this.trackQueue[trackIndex].voters.positive.push(user_id);
			this.trackQueue[trackIndex].voters.value += 1;
			this.sort();
			this.onVote();
		}
	}

	voteDown(trackIndex, user_id) {
		if (this.trackQueue[trackIndex].voters.negative.includes(user_id)) {
			return;
		} else {
			let positiveIndex = this.trackQueue[trackIndex].voters.positive.indexOf(user_id);
			if (positiveIndex !== -1) {
				this.trackQueue[trackIndex].voters.positive.splice(positiveIndex, 1);
				this.trackQueue[trackIndex].voters.value -= 1;
			}
			this.trackQueue[trackIndex].voters.negative.push(user_id);
			this.trackQueue[trackIndex].voters.value -= 1;
			this.sort();
			this.onVote();
		}
	}

	voteNeutral(trackIndex, user_id) {
		let positiveIndex = this.trackQueue[trackIndex].voters.positive.indexOf(user_id);
		if (positiveIndex !== -1) {
			this.trackQueue[trackIndex].voters.positive.splice(positiveIndex, 1);
			this.trackQueue[trackIndex].voters.value -= 1;
			this.sort();
			this.onVote();
			return;
		}
		let negativeIndex = this.trackQueue[trackIndex].voters.negative.indexOf(user_id);
		if (negativeIndex !== -1) {
			this.trackQueue[trackIndex].voters.negative.splice(negativeIndex, 1);
			this.trackQueue[trackIndex].voters.value += 1;
			this.sort();
			this.onVote();
			return;
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
