var Redux = require("@reduxjs/toolkit");

var createSlice = (name) => Redux.createSlice({
	name: name,
	initialState: {},
	reducers: {
		increment: {
			reducer(state, action) {
				var {id, value} = action.payload;
				if (!state.id) state[id] = {id, value};
				else state[id].value += value;
			},
			prepare({id, value}) {
				return {payload: {id, value}};
			}
		},
		decrement: {
			reducer(state, action) {
				var {id, value} = action.payload;
				if (!state[id]) state[id] = {id, value: -value};
				else state[id].value -= value;
			},
			prepare({id, value}) {
				return {payload: {id, value}};
			}
		},
		remove: {
			reducer(state, action) {
				var {id} = action.payload;
				if (!id || !state[id]) return;
				delete(state[id]);
			},
			prepare(id) {
				return {payload: {id}, id: id};
			}
		}
	}
});

function createStore(slice) {
	return Redux.configureStore({reducer: slice.reducer});
}
function create(name) {
	var slice = createSlice(name);
	var store = createStore(slice);
	return {actions: slice.actions, store};
}
function test() {
	console.log("# example 3 - Redux.createSlice (part 2) - start test #");
	var {actions, store} = create("example3");
	store.subscribe(() => console.log(". update state:", store.getState()));
	store.dispatch(actions.increment({id: 1, value: 10}));
	store.dispatch(actions.increment({id: 2, value: 5}));
	store.dispatch(actions.decrement({id: 2, value: 10}));
	store.dispatch(actions.remove(2));
	console.log("# example 3 - end test #");
}

module.exports = {create, test};
