import axios from 'axios';
import { GET_USER } from './types';

export function fetchUser() {

	return async function(dispatch) {
		const res = await axios.get('/api/current_user');
		const action = { type: GET_USER, payload: res.data };

		dispatch(action);
	}

}