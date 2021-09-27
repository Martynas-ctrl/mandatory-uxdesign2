import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Modal } from 'react-bootstrap'
import axios from 'axios';
import '../Css/Quiz.css';
import '../Css/RadioButton.css';
import '../Css/Modal.css';

let setAnswers = true;
let correctAnswersArray = [];
const entities = {
  '&#039;': "'",
  '&quot;': '"',
  '&ldquo;': '"',
  '&rdquo;': '"',
  '&rsquo;': "'",
  '&lrm;': "",
  "&ntilde;": "ñ",
  "&eacute;": "é",
  "&amp;": "&" ,
  "&uuml;": "ü"
}

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoGameData: [],
      correctAnswer: [],
      result: [],
      allAnswerss: [],
      UserAnsw: [],
      clientAnswers: [],
      return: false,
      show: false,
  };
}

  componentDidMount() {
    let url = 'https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple';
    axios.get(url)
      .then((response) => {
        for (let i = 0; i < response.data.results.length; i++) {
          correctAnswersArray.push(response.data.results[i].correct_answer);
        }
        this.setState({
          videoGameData: response.data.results,
      });
   });
}

  startGame = () => {
    correctAnswersArray = [];
    let url = 'https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple';
    axios.get(url)
      .then((response) => {
        for (let i = 0; i < response.data.results.length; i++) {
          correctAnswersArray.push(response.data.results[i].correct_answer);
        }
        this.setState({
          videoGameData: response.data.results,
          show: !this.state.show
      });
  });
}

  modalDialog = () => {
    this.setState({
      show: !this.state.show,
  })
}

  onSubmit = (e) => {
    let inputList = document.getElementsByTagName('input');
    let tempArr = [];
    for(let i = 0; i < inputList.length; i++) {
      if(inputList[i].type='radio') {
        if(inputList[i].checked){
          tempArr.push(inputList[i].value);
        }
      }
    }

    let tempResult = [];
    for(let i = 0; i < tempArr.length; i++) {
      if(correctAnswersArray[i] === tempArr[i] ) {
        tempResult.push(1);
      }
    }

    this.setState({
      clientAnswers: tempArr,
      result: tempResult, 
      show: !this.state.show,
  });
}

  returnMain = () => {
    this.setState({
      return: true,
  })
}

  render() {
    setAnswers = false;
    const {videoGameData} = this.state;

    function getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    function shuffleArray(array) {
      let shuffle = [...array];
      for (let i = 0; i < shuffle.length; i++) {
        let rnd = getRandomArbitrary(i, shuffle.length);
        let tempStr = shuffle[rnd];
        shuffle[rnd] = shuffle[i];
        shuffle[i] = tempStr;
      }
      return shuffle;
    }
    console.log(correctAnswersArray);
    console.log('Client answers:' + this.state.clientAnswers);
    console.log('Resultat:'  + this.state.result);
    return (
      <>
        {this.state.return ? <Redirect to='/' /> : null}
        <header>
          <h5 className='titleQuiz'>Quiz game</h5>
        </header>
        <div className='shadowsforall'>
          {videoGameData.map(gameData => {
            let index = videoGameData.indexOf(gameData);
            let allAnswers = [];
            allAnswers.push(gameData.correct_answer);
            for(let i = 0; i < gameData.incorrect_answers.length; i++) {
              allAnswers.push(gameData.incorrect_answers[i]);
            }
            let shuffledAnswers = shuffleArray(allAnswers);

            return( 
              <div className='containerall' key={gameData.question}>
                <p className='text'>{gameData.question.replace(/&#?\w+;/g, match => entities[match])}</p>
                {shuffledAnswers.map((answer)=> {
                  return(
                    <div key={answer}>
                      <label style={{display: 'flex'}} >
                        <input className='input' type='radio' name={index} id={answer} value={answer} required/>
                        <h5 className='text'>{answer.replace(/&#?\w+;/g, match => entities[match])}</h5>
                      </label>
                    </div>
                    );
                  })}
              </div>
            );
        })}
  
        <footer>
          <button id='BtnsubmitQuiz' onClick={()=> {this.onSubmit()}}>Submit Answers</button>
          <Modal backdrop='static' show={this.state.show} onHide={()=>this.onSubmit()} >
            <Modal.Header className='modalContainer' closeButton>Quiz game</Modal.Header>
            <Modal.Body className='modalContainer'>
              <h1 className='congratsMsg'>Congratulations!</h1>
              <p className='correctAnswerMsg'>You answered  {this.state.result.length} /10 questions correct!</p>
            </Modal.Body>
            <Modal.Footer className='modalFooterContainer'>
              <button id='buttonModal' type='submit' onClick={()=>{this.returnMain()}}>CLOSE</button>
              <button id='buttonModal' type='submit' onClick={()=>{this.startGame()}}>RE-START</button>
            </Modal.Footer>
          </Modal>
        </footer>
      </div>
    </>
    )
  }
}

export default Quiz