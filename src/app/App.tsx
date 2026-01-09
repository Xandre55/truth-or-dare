import { useState, useEffect } from 'react';
import './App.css';

// Truth and Dare data for couples
const TRUTHS = [
  "What's your favorite memory of us together?",
  "What was your first impression of me?",
  "What's one thing you've never told me but want to?",
  "What's your ideal date with me?",
  "What song reminds you of us?",
  "What do you love most about our relationship?",
  "What's your favorite thing I do for you?",
  "When did you first realize you had feelings for me?",
  "What's one thing about me that makes you smile?",
  "What's your favorite physical feature of mine?",
  "What's a fantasy you've been too shy to share?",
  "What's the most romantic thing I've ever done for you?",
  "If you could relive one moment with me, what would it be?",
  "What's one thing you wish we did more often?",
  "What makes you feel most loved by me?",
];

const DARES = [
  "Give me a 30-second passionate kiss",
  "Whisper something romantic in my ear",
  "Give me a slow, sensual massage for 2 minutes",
  "Dance with me to our favorite song",
  "Tell me 3 things you love about me while looking into my eyes",
  "Draw a heart on my hand and kiss it",
  "Recreate our first kiss",
  "Give me 10 kisses on 10 different places",
  "Let me style your hair however I want",
  "Speak in a romantic accent for the next 3 rounds",
  "Write something romantic on my back with your finger and I'll guess",
  "Serenade me with a love song",
  "Feed me something delicious",
  "Give me a piggyback ride around the room",
  "Share your most embarrassing moment with me",
];

type Screen = 'start' | 'game';
type CardType = 'truth' | 'dare' | null;

export default function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [currentCard, setCurrentCard] = useState<CardType>(null);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isFlipping, setIsFlipping] = useState(false);
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [usedQuestions, setUsedQuestions] = useState<Set<string>>(new Set());

  const startGame = () => {
    setScreen('game');
  };

  const selectCard = (type: CardType) => {
    if (isFlipping || currentCard) return;
    
    setIsFlipping(true);
    setCurrentCard(type);
    
    // Get random question
    const questions = type === 'truth' ? TRUTHS : DARES;
    const availableQuestions = questions.filter(q => !usedQuestions.has(q));
    
    // Reset if all questions used
    const questionsToUse = availableQuestions.length > 0 ? availableQuestions : questions;
    if (availableQuestions.length === 0) {
      setUsedQuestions(new Set());
    }
    
    const randomQuestion = questionsToUse[Math.floor(Math.random() * questionsToUse.length)];
    setCurrentQuestion(randomQuestion);
    setUsedQuestions(prev => new Set([...prev, randomQuestion]));
    
    setTimeout(() => setIsFlipping(false), 3000);
  };

  // const turnCard = (type: CardType)=>{
  //   if (isFlipping){
  //     setIsFlipping(true);
  //   }
  // }

  const nextTurn = () => {
    setCurrentCard(null);
    setCurrentQuestion('');
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  const resetGame = () => {
    setCurrentCard(null);
    setCurrentQuestion('');
    setUsedQuestions(new Set());
    setCurrentPlayer(1);
    setScreen('start');
  };

  if (screen === 'start') {
    return (
      <div className="app">
        <div className="hearts-bg">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="heart-float" 
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            >
              ♥
            </div>
          ))}
        </div>
        
        <div className="start-screen">
          <div className="title-container">
            <h1 className="main-title">
              <span className="title-word">Truth</span>
              <span className="title-or">or</span>
              <span className="title-word">Dare</span>
            </h1>
            <p className="subtitle">From your's faithfully Xandre  ❤️</p>
          </div>

          <div className="players-input">
            <div className="input-group">
              <label>Player 1</label>
              <input
                type="text"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value )}
                placeholder="Enter name"
              />
            </div>
            <div className="heart-divider">♥</div>
            <div className="input-group">
              <label>Player 2</label>
              <input
                type="text"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value )}
                placeholder="Enter name"
              />
            </div>
          </div>

          <button className="start-btn" onClick={startGame}>
            <span>Start Playing</span>
            <div className="btn-glow"></div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app game-screen">
      <div className="hearts-bg">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="heart-float" 
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          >
            ♥
          </div>
        ))}
      </div>

      <div className="game-header">
        <button className="back-btn" onClick={resetGame}>← Back</button>
        <div className="current-player">
          <div className="player-indicator">
            <span className={currentPlayer === 1 ? 'active' : ''}>{player1Name}</span>
            <span className="vs">vs</span>
            <span className={currentPlayer === 2 ? 'active' : ''}>{player2Name}</span>
          </div>
          <p className="turn-text">
            {currentPlayer === 1 ? player1Name : player2Name}'s Turn
          </p>
        </div>
      </div>

      <div className="game-container">
        {!currentCard ? (
          <div className="card-selection">
            <h2 className="selection-title">Choose Your Challenge</h2>
            <div className="cards-wrapper">
              <button 
                className="game-card truth-card"
                onClick={() => selectCard('truth')}
              >
                <div className="card-icon">🤔</div>
                <div className="card-title">TRUTH</div>
                <div className="card-subtitle">Answer honestly</div>
                <div className="card-particles">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="particle"></div>
                  ))}
                </div>
              </button>
              
              <button 
                className="game-card dare-card"
                onClick={() => selectCard('dare')}
              >
                <div className="card-icon">🔥</div>
                <div className="card-title">DARE</div>
                <div className="card-subtitle">Take the challenge</div>
                <div className="card-particles">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="particle"></div>
                  ))}
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="question-reveal">
            <div className={`question-card ${isFlipping ? 'flipping' : ''} ${currentCard}-question`}>
              <div className="question-card-inner">
                <div className="question-front">
                  <div className="card-type">{currentCard === 'truth' ? '🤔' : '🔥'}</div>
                  <div className="card-label">{currentCard?.toUpperCase()}</div>
                </div>
                <div className="question-back">
                  <div className="question-icon">{currentCard === 'truth' ? '💭' : '⚡'}</div>
                  <p className="question-text">{currentQuestion}</p>
                </div>
              </div>
            </div>
            
            <button className="next-btn" onClick={nextTurn}>
              Next Turn →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
