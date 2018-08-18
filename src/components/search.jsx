import React, { Component } from "react";
import { connect } from "react-redux";
import { searchTracks, resetSearch } from "../actions/searchActions";
import { queueTrack } from "../actions/queueActions";

class SearchResults extends Component {
	render() {
		const { results, focusItem } = this.props;
		return (
			<ul>
				{results.map((result, index) => {
					const isFocused = focusItem === index;
					const className = isFocused ? "focused" : "";
					return (
						<li key={result.id} className={className} onClick={() => this.props.onSelect(result.id)}>
							{result.name} - {result.artists[0].name}
						</li>
					);
				})}
			</ul>
		);
	}
}

class Search extends Component {
	state = {
		text: this.props.text || "",
		focus: -1
	};

	selectElement = id => {
		console.log(id);
		this.props.queueTrack(id, this.props.group);
		this.props.resetSearch();
		this.input.value = "";
	};

	handleTextChange = e => {
		const text = e.target.value;
		this.setState({ text: text });

		if (text === "") {
			this.setState({ focus: -1 });
			this.props.resetSearch();
		} else {
			this.props.searchTracks(text);
		}
	};

	render() {
		const results = this.props.search.results;
		return (
			<div className="search">
				<input onChange={this.handleTextChange} ref={el => (this.input = el)} />
				{results && <SearchResults results={results} onSelect={this.selectElement} focus={this.state.focus} />}
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
