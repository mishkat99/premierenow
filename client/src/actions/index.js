import axios from 'axios';
import { GET_USER } from './types';
import { SEARCH_SHOWS } from './types';

export function fetchUser() {

	return async function(dispatch) {
		const res = await axios.get('/api/current_user');
		const action = { type: GET_USER, payload: res.data };

		dispatch(action);
	}

}

export function searchShows(query, user) {

	return async function(dispatch) {
		const uri = '/search?q=' + encodeURIComponent(query);

		const res = await axios.get(uri);
		console.log(res);
	}



}