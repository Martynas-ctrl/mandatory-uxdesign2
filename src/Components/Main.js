import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import WelcomeImg from '../Images/Welcome.svg';
import '../Css/Main.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startQuiz: false,
    }
}

  startQuiz = () => {
    this.setState({
      startQuiz: true,
  })
}

  render() {
    return (
      <>
        {this.state.startQuiz ? <Redirect to='/Quiz' /> : null}
        <div className='containerMain'>
          <img src={WelcomeImg} />
          <div className='title'>
            <h1 className='to'> to</h1>
            <h1 className='my'> my</h1>
            <h1 className='quiz'> Quiz</h1>
            <h1 className='game'> game</h1>
          </div>
          <button id='startQuiz' onClick={this.startQuiz}>Start Quiz</button>
        </div>
      </>
      )
   }
}

export default Main