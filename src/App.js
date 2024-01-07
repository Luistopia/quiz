
import questions from './questions';
import {useState, useEffect} from 'react';


function App() {

  const [actualQuestion, setActualQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isTimeRunning, setIsTimeRunning] = useState(10);
  const [areDisabled, setAreDisabled] =useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  function handleAnswerSubmit(isCorrect, e){
    //add score
   if(isCorrect) setScore(score + 1);
    //add styles
   e.target.classList.add(isCorrect ? "correct" : "incorrect");
    //move to next question 
   setTimeout(()=>{
    if(actualQuestion === questions.length -1){
      setIsFinished(true);
    }else{
      setActualQuestion(actualQuestion + 1);
    }
   }, 1500)
  }
  useEffect(()=> {
    const interval = setInterval(() => {
      if(isTimeRunning > 0 ) setIsTimeRunning((prev) => prev - 1);
      if(isTimeRunning ===0) setAreDisabled(true);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimeRunning]);
  if(isFinished) return(
    <main className="app">
      <div className="finish-game">
        <span> You Got {score} Right Answer of {questions.length} Questions </span>
        <button onClick={()=> (window.location.href ="/")}>Play Again.</button>
        <button onClick={()=> {
          setIsFinished(false);
          setShowAnswer(true);
          setActualQuestion(0);

        }}>See Answers.</button>
      </div>
    </main>
  )


  if(showAnswer) return <main className="app"> 
  
  <div className="left-side">
  <div className="question-number">
    <span>Question {actualQuestion + 1} of {questions.length} </span> 
  </div>
  <div className="question-title">
    {questions[actualQuestion].title}
  </div>
  <div>
    {questions[actualQuestion].choices.filter((choice) => choice.isCorrect)[0].textResponse}
  </div>
  <button  onClick={() => {
              if (actualQuestion === questions.length - 1) {
                window.location.href = "/";
              } else {
               setActualQuestion(actualQuestion + 1);
              }
            }}> 
                  {actualQuestion === questions.length - 1
              ? "Play Again"
              : "Next"}
              </button>
 </div>
 </main>
  return (
    <main className="app">
     <div className="left-side">
      <div className="question-number">
        <span>Question {actualQuestion + 1} of {questions.length} </span> 
      </div>
      <div className="question-title">
        {questions[actualQuestion].title}
      </div>
      <div>
        {!areDisabled ? (  <span className="remainTime">Remain Time : {isTimeRunning}</span>) : (
          <button 
          onClick={() =>{
            setIsTimeRunning(10);
            setAreDisabled(false);
            setActualQuestion(actualQuestion + 1);
          }}>Continue</button>
        )}
      
      </div>
     </div>
     <div className="right-side">
      {questions[actualQuestion].choices.map((response) => (
        <button 
        disabled={areDisabled}
        key={response.textResponse} onClick={(e) => handleAnswerSubmit(response.isCorrect, e)}>{response.textResponse}</button>
      ))}
     </div>
    </main>
  );
}

export default App;
