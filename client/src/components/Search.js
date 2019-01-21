import React, { Component } from 'react';

class Search extends Component {
	render() {
		return (
			<div className="container">
				<div className="control">
  					<input className="input is-large" type="text" placeholder="Search for your favorite TV Shows"/>
				</div>
				<h1>Trending</h1>
				<div className="columns">
					<div className="column"><p className="bd-notification is-info">picture 1</p></div>
					<div className="column"><p className="bd-notification is-info">picture 2</p></div>
					<div className="column"><p className="bd-notification is-info">picture 3</p></div>
				</div>
			</div>
		)
	}
}

//once search is loading, bulma class on input: is-loading

export default Search;