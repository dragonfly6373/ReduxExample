var Redux = require("@reduxjs/toolkit");

var increment = Redux.createAction("INCREMENT");
var decrement = Redux.createAction("DECREMENT");

var createReducer = () => Redux.createReducer(0, {
	[increment]: state => state + 1,
	[decrement]: state => state - 1
});
function createStore() {
	return Redux.configureStore({reducer: createReducer()});
}
function test() {
	console.log("# example 1 - Redux.createReducer - start test #");
	var store = createStore();
	store.subscribe(() => console.log(". update state:", store.getState()));
	store.dispatch(increment());
	store.dispatch(increment());
	store.dispatch(decrement());
	console.log("# example 1 - end test #");
}

module.exports = {actions: {increment, decrement}, createStore, test}; 

