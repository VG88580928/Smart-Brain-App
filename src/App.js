import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id:'',
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

  loadUser = (userObj) => {
    this.setState({
      user: {
        id:userObj.id,
        name: userObj.name,
        email:userObj.email,
        entries: userObj.entries,
        joined: userObj.joined
      }
    })
  }

  calculateFacesLocation = (data) => {
      const clarifaiFaces = data.outputs[0].data.regions
      const image = document.getElementById('image')
      const width = Number(image.width)
      const height = Number(image.height)
      const boxesArr = clarifaiFaces.map(region => {
        return (
          {
            leftcol: region.region_info.bounding_box.left_col * width,
            toprow: region.region_info.bounding_box.top_row * height,
            rightcol: width - (region.region_info.bounding_box.right_col * width),
            bottomrow: height - (region.region_info.bounding_box.bottom_row * height)
          }
        )
      });
      return boxesArr
  }

  // calculateFaceLocation = (data) => {
  //   console.log(data)
  //   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
  //   const image = document.getElementById('image')
  //   const width = Number(image.width)
  //   const height = Number(image.height)
  //   return {
  //     leftcol: clarifaiFace.left_col * width,
  //     toprow: clarifaiFace.top_row * height,
  //     rightcol: width - (clarifaiFace.right_col * width),
  //     bottomrow: height - (clarifaiFace.bottom_row * height)
  //   }
  // }

  displayFaceBoxes = (boxes) => {
    this.setState({boxes: boxes})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('https://fathomless-everglades-24693.herokuapp.com/imageurl', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            input: this.state.input
          }) 
      })
      .then(res => res.json())
      .then(response => {
        if (typeof(response) === 'object') {
          fetch('https://fathomless-everglades-24693.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.state.user.id
              }) 
          })
          .then(res => res.json())
          .then(count => this.setState(Object.assign(this.state.user, {entries: count})))
          .catch(console.log)
        }
        this.displayFaceBoxes(this.calculateFacesLocation(response))
      })
      .catch(err => console.log(err))
  }

  onKeyboardSubmit = (event) => {
    if (event.key === 'Enter') {
      this.onPictureSubmit()
    }
  }

  // onRouteChange = () => {
  //   if(this.state.route === 'signin') {this.setState({route: 'home'})};
  //   if(this.state.route === 'home') {this.setState({route: 'signin'})} 
  // }

  onRouteChange = (route) => {
    if(route === 'signin') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({route: route})
    }
      this.setState({route: route})
  }

  render () {
    const { route, boxes, imageUrl } = this.state;
    return (
      <div className="App">
      <Particles className='particles'/>
      <Navigation  onRouteChange={this.onRouteChange} isSignIn={route}/>
      { this.state.route === 'signin' 
      ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
      : (this.state.route === 'home'
      ? <>
          <Logo />
          <Rank loadUser={this.state.user}/>
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onPictureSubmit={this.onPictureSubmit}
            onKeyboardSubmit={this.onKeyboardSubmit}
          />
          <FaceRecognition boxes={boxes} imageURL={imageUrl} />
        </>
      : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>    
      )
      }
      </div>
    );
  }
}

export default App;