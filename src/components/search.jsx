import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchTracks, resetSearch } from '../actions/searchActions';
import { queueTrack } from '../actions/queueActions';
import '../static/css/searchStyles.css';

function msToTime(s) {
	var ms = s % 1000;
	s = (s - ms) / 1000;
	var secs = s % 60;
	s = (s - secs) / 60;
	var mins = s % 60;
	if (secs < 10) {
		secs = '0' + secs;
	}
	return mins + ':' + secs;
}

class SearchResults extends Component {
	render() {
		const { results, focus } = this.props;
		return (
			<ul>
				{results.map((result, index) => {
					const isFocused = focus === index;
					const className = isFocused ? 'focused' : '';
					return (
						<li key={result.id} className={className} onClick={() => this.props.onSelect(result.id)} onMouseOver={() => this.props.hoverFocus(index)}>
							{result.album.images[2] && <img src={result.album.images[2].url} alt="album cover" />}
							<div>
								<h3 className="title">{result.name}</h3>
								<h4 className="artist">{result.artists[0].name}</h4>
								<h4 className="album">{result.album.name}</h4>
								<h4 className="length">{msToTime(result.duration_ms)}</h4>
							</div>
						</li>
					);
				})}
			</ul>
		);
	}
}

class Search extends Component {
	state = {
		text: this.props.text || '',
		focus: -1,
		searchActive: false
	};

	selectElement = id => {
		this.props.queueTrack(id, this.props.group);
		this.props.resetSearch();
		this.input.value = '';
		this.setState({ focus: -1, searchActive: false });
	};

	hoverFocus = index => {
		this.setState({
			focus: index
		});
	};

	handleTextChange = e => {
		const text = e.target.value;
		this.setState({ text: text, searchActive: true });

		if (text === '') {
			this.setState({ focus: -1, searchActive: false });
			this.props.resetSearch();
		} else {
			this.props.searchTracks(text);
		}
	};

	handleKeyDown = e => {
		switch (e.keyCode) {
			case 38: // up
				this.setState({ focus: this.state.focus - 1 });
				break;
			case 40: // down
				this.setState({ focus: this.state.focus + 1 });
				break;
			case 13: {
				let correct = false;
				if (this.state.focus !== -1) {
					this.props.queueTrack(this.props.search.results[this.state.focus].id);
					correct = true;
				} else {
					const text = e.target.value.trim();
					if (text.length !== 0) {
						this.props.queueTrack(text);
						correct = true;
					}
				}
				if (correct) {
					this.setState({ text: '' });
					this.props.resetSearch();
					this.setState({ focus: -1, searchActive: false });
					this.input.value = '';
				}
				break;
			}
			case 27: {
				this.setSearchInactive();
				break;
			}
		}
	};

	setSearchActive = () => {
		this.setState({ searchActive: true });
	};

	setSearchInactive = () => {
		this.setState({ focus: -1, searchActive: false });
		this.props.resetSearch();
		this.input.value = '';
	};

	render() {
		const placeHolder = 'Search for tracks';
		const results = this.props.search.results;
		var SearchClass = this.state.searchActive ? 'active' : '';
		return (
			<div className={'Search ' + SearchClass}>
				<div className="inputBar">
					<img id="searchIcon" src={require('../static/imgs/search.svg')} alt="search icon" />
					<input onClick={this.setSearchActive} placeholder={placeHolder} onChange={this.handleTextChange} onKeyDown={this.handleKeyDown} ref={el => (this.input = el)} />
					{this.state.searchActive && <img id="closeIcon" src={require('../static/imgs/cancel.svg')} alt="close icon" onClick={this.setSearchInactive} />}
					<h3>{this.props.group}</h3>
				</div>
				{results && <SearchResults results={results} onSelect={this.selectElement} focus={this.state.focus} hoverFocus={this.hoverFocus} />}
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	// queueTrack: text => dispatch(queueTrack(text)),
	searchTracks: query => dispatch(searchTracks(query)),
	resetSearch: () => dispatch(resetSearch()),
	queueTrack: (id, group) => dispatch(queueTrack(id, group))
});

const mapStateToProps = state => ({
	search: state.search,
	group: state.session.group
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Search);
