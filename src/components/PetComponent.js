import React from 'react';
//dogimgurl: 'https://s-media-cache-ak0.pinimg.com/736x/c1/13/d7/c113d793dd680740ccab4534e1d1dcdf.jpg' 
const style = {
			width:'50%',
			height:200,
			paddingLeft:'2em'
		}

export default function PetComponent(props){
	
		
		return(
		<div style = {{display:'inline-block',textAlign:'center',marginLeft:'auto',marginRight:'auto'}}>

			

			<h3>{props.petName} Likes: {props.likes}</h3>

			<img style={style} src={props.petImageURL}  alt='cute cat' />

			<div>
				<button value={props.petName} onClick = {props.onLikeBtnClk} > Like </button>
				<button value={props.petName} onClick = {props.onDislikeBtnClick}> Dislike </button>
			</div>

		</div>
		)
	

}


