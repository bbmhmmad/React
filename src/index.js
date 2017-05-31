import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './components/HomePage'
var PetComponent = require('./components/PetComponent')

// function HomePage(props){
// 	return <h1> Welcome to Cat and Dog Cuteness Fight Game </h1>
// }

//---------------------

ReactDOM.render(
	<HomePage />, document.getElementById('root')
	)