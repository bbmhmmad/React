import React from 'react';
import PetComponent from './PetComponent'
var axios = require('axios')



const style = {
	textAlign:'center',
	fontSize:'2em',
	color:'blue'
	};

const API_KEY = '123456789'

const CAT_URL = 'http://localhost:63000/cat/?api_key=' +API_KEY

const DOG_URL = 'http://localhost:63000/dog/?api_key=' +API_KEY

export default class HomePage extends React.Component{
	constructor(props){
		super(props)
		this.state={
			dogLikes:0,
			catLikes:0,
			winner:null,
			catImage:'',
			dogImage:''
		}

		this.handleLikeButtonClick=this.handleLikeButtonClick.bind(this);
		this.handleDislikeButtonClick = this.handleDislikeButtonClick.bind(this)

		this.handleWinnerClick = this.handleWinnerClick.bind(this)
		this.handleRestartClick = this.handleRestartClick.bind(this)


	}
	//place network requests in this method
	componentDidMount(){
		this.fetchImages()
	}

	fetchCatImage(){
		console.log('Inside Component WIll Mount')
		axios.get(CAT_URL).then(function(resp){
			const imageUrl = resp.data.imageUrl;

			this.setState(function(prevState){
				return (				
					{catImage:imageUrl}

					)
			})
		}.bind(this))
	}

	fetchDogImage(){
		console.log('Inside Component WIll Mount')
		axios.get(DOG_URL).then(function(resp){
			const imageUrl = resp.data.imageUrl;

			this.setState(function(prevState){
				return (				
					{dogImage:imageUrl}

					)
			})
		}.bind(this))
	}

	fetchImages(){
		this.fetchCatImage();
		this.fetchDogImage()
	}
	handleLikeButtonClick(event){
		this.fetchImages()
		const petName = event.target.value
		if (petName==='Cat'){
			this.setState(function(prevState){
				return{
					catLikes:prevState.catLikes + 1,
					dogLikes:prevState.dogLikes,
					winner:prevState.winner
				}
			})
		}
		else{
			this.setState(function(prevState){
				return{
					dogLikes:prevState.dogLikes + 1,
					catLikes:prevState.catLikes,
					winner:prevState.winner
				}
			})
		}

		//not just enough to update. need to explicitly tell react to update w/ new state

		//can also use forceUpdate() w/out states. not preferred. hackish method
	}


	handleDislikeButtonClick(event){
		this.fetchImages()
		const petName = event.target.value
		if (petName==='Cat'){
			this.setState(function(prevState){
				return{
					catLikes:prevState.catLikes - 1,
					dogLikes:prevState.dogLikes,
					winner:prevState.winner
				}
			})
		}
		else{
			this.setState(function(prevState){
				return{
					dogLikes:prevState.dogLikes - 1,
					catLikes:prevState.catLikes,
					winner:prevState.winner
				}
			})
		}
		//not just enough to update. need to explicitly tell react to update w/ new state

		//can also use forceUpdate() w/out states. not preferred. hackish method
	

	}

	handleWinnerClick(){
		if(this.state.catLikes>this.state.dogLikes){
			this.setState(function(prevState){
				return(
					{dogLikes:prevState.dogLikes,
					catLikes:prevState.catLikes,
					winner:'Cat is Winner'

					}
				)

			})
		}
		else if(this.state.dogLikes>this.state.catLikes){
			this.setState(function(prevState){
				return(
					{dogLikes:prevState.dogLikes,
					catLikes:prevState.catLikes,
					winner:'Dog is Winner'

					}
				)

			})
		}
		else{
			this.setState(function(prevState){
				return(
					{dogLikes:prevState.dogLikes,
					catLikes:prevState.catLikes,
					winner:'Tie!'

					}
				)

			})
		}
	}

	handleRestartClick(){
		this.fetchImages();
		this.setState(function(prevState){
			return(
					{
						dogLikes:0,
						catLikes:0,
						winner:null
					}
				)
		})
	}
//ref only available for class components. can be used for dom elemnt(input) and class components

	render(){
		return (
			<div>
				<h1 style={style}> Welcome to Cat and Dog Cuteness Fight Game </h1> 
				<h2 style = {{textAlign:'center'}}>{this.state.winner}</h2>
				<PetComponent likes={this.state.catLikes} petName='Cat' petImageURL={this.state.catImage} onLikeBtnClk={this.handleLikeButtonClick} onDislikeBtnClick={this.handleDislikeButtonClick}
				  />
				}
				}

				<PetComponent likes={this.state.dogLikes} petName='Dog' petImageURL={this.state.dogImage} onLikeBtnClk={this.handleLikeButtonClick}  onDislikeBtnClick={this.handleDislikeButtonClick}
				/>
			
				<div style={{textAlign:'center'}}>
					<button onClick={this.handleWinnerClick}>Show Winner</button>
					<button onClick={this.handleRestartClick}>Start Over</button>
				</div>

			</div>
		)
	}
}

//ref escape hatch
//ref={function(compInst){this.catCompInst = this.compInst}}
//dont forget bind in constructor method 

//Lift state instead of using ref. follows react core principles:
//Data/props always flow down from parent to child. Events/actions flow up
//move state to common ancestor