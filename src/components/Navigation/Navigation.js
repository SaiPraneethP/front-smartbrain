import React from 'react'

const Navigation = ({onRouteChange,isSignedIn}) =>{
	if(isSignedIn){
		return (
		<div>
		<nav style={{display:'flex',justifyContent:'flex-end'}}>
		<p onClick={()=>{onRouteChange('SignOut')}}className='f3 link dim black underline pa3 pointer'>Sign Out</p>
		</nav>
		</div>
		);
	}
	else{
		return (

<nav style={{display:'flex',justifyContent:'flex-end'}}>
		<p onClick={()=>{onRouteChange('SignIn')}}className='f3 link dim black underline pa3 pointer'>Sign In</p>
		<p onClick={()=>{onRouteChange('Register')}}className='f3 link dim black underline pa3 pointer'>Register</p>
</nav>
			)
	}
	
}

export default Navigation