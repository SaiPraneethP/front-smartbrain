import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './Logo.png';
const Logo = () =>{
	return (
		<div className='ma4 mt0'>
		<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 160, width: 160 }} >
		 <div className="Tilt-inner pa4">
		 <img style={{ paddingTop:'1px'}}src={brain} alt='Logo' width="200" height="100"/>
		  </div>
		</Tilt>
		</div>
		);
}

export default Logo