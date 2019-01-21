const rp = require('request-promise');
const keys = require('../config/keys');

module.exports = (app) => {
	app.get('/search', async (req, res) => {
		const query = req.query.q;

		const options = {
			uri: "https://api.themoviedb.org/3/search/tv",
			qs: {
				api_key: keys.movieDbKey,
				language: 'en-US',
				query: query,
				page: '1'
			},
			headers: {
				'User-Agent': 'Request-Promise'
			}
		}

		let movieDbResponse;

		try {
			movieDbResponse = await rp(options);
		} catch(err) {
			console.log("MovieDB Request failed!");
			console.log("Error: ", err);
			res.status(500).send(false);
		}

		const response = JSON.parse(movieDbResponse);
		const totalResults = response.total_results;
		var numResults;

		if (totalResults === 0) {
			res.send(false);
		}

		if (totalResults > 0 && totalResults < 6) {
			numResults = totalResults;
		}
		numResults = 6;

		var results = new Array(numResults);

		for (var i = 0; i < numResults; i++) {
			results[i] = {
				name: response.results[i].name,
				imagePath: `https://image.tmdb.org/t/p/w500${response.results[i].poster_path}`
			}
		}

		const showResponse = {
			numResults: numResults,
			results: results
		}


		res.send(showResponse);
	})

	app.get('/search/trending', async (req, res) => {
		const options = {
			uri: "https://api.themoviedb.org/3/trending/tv/week",
			qs: {
				api_key: keys.movieDbKey,
				language: 'en-US'
			}
		}

		try {
			movieDbResponse = await rp(options);
		} catch(err) {
			console.log("MovieDB Request failed!");
			console.log("Error: ", err);
			res.status(500).send(false);
		}

		const response = JSON.parse(movieDbResponse);

		var results = new Array(6);

		for (var i = 0; i < 6; i++) {
			results[i] = {
				name: response.results[i].name,
				imagePath: `https://image.tmdb.org/t/p/w500${response.results[i].poster_path}`
			}
		}

		res.send(results);
	})
}