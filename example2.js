var Redux = require("@reduxjs/toolkit");

var createSlice = (name) => Redux.createSlice({
	name: name,
	initialState: 0,
	reducers: {
		increment: (state, action) => state + 1,
		decrement: (state, action) => state - 1
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
	console.log("# example 2 - Redux.createSlice - start test #");
	var {actions, store} = create("example2");
	store.subscribe(() => console.log(". change state:", store.getState()));
	store.dispatch(actions.increment());
	store.dispatch(actions.increment());
	store.dispatch(actions.decrement());
	console.log("# example 2 - end test #");
}

module.exports = {create, test};

