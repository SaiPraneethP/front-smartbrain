import React, { Component } from 'react'
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js';

import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register'


const particleOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'SignIn',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''

  }
}



class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }
  //ON signin or register , updtating the user object and hence passing it to the rank component to update the entries value on button submit in image link form .

  // // connecting backend to front end:
  // componentDidMount() {
  //   try {
  //     fetch('http://localhost:3004/').then(res => {
  //       res.json().then(data => { console.log(data) })
  //     })
  //   }
  //   catch(err){
  //     console.log(err)
  //   }
  //  }

  calculateFaceLocation = (response) => {
    const clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage')
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    // console.log(box)
    this.setState({ box: box })

  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }


  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    fetch('https://aqueous-castle-01315.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response=>response.json())
      .then(response => {
        if (response) {
          fetch('https://aqueous-castle-01315.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          }).then(res => res.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
              //console.log(this.state.user.entries)
            })
            .catch(console.log);


        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err =>
        console.log(err))
  }

  onRouteChange = (route) => {
    if (route === 'SignOut') {
      this.setState(initialState)
    } else if (route === 'Home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });

  }


  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particleOptions}

        />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {(this.state.route === 'Home') ?
          <div>

            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
          </div>

          :
          (this.state.route === 'SignIn' || this.state.route === 'SignOut') ?
            <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        }
      </div>
    );
  }
}

export default App;
