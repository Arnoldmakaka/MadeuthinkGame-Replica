import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Linking, StatusBar, SafeAreaView, Image, TouchableOpacity } from 'react-native';

//splash screen
import SplashScreen from 'react-native-splash-screen';

//components
import WelcomeComponent from './components/WelcomeComponent';
import LevelOne from './components/LevelOne';
import LevelTwo from './components/LevelTwo';
import LevelThree from './components/LevelThree';
import LevelFour from './components/LevelFour';
import LevelFive from './components/LevelFive';

const CorrectAnswer = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', }}>
      <Text style={{textAlign: 'center', fontSize: 150, color: '#51e90e' }}>✔</Text>
    </View>
  );
}

const WrongAnswer = ({TryAgain}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', paddingVertical: 20, }}>
      <View style={{flex: 1}}>
      <Text style={{textAlign: 'center', fontSize: 150, color: '#e00016' }}>✘</Text>
      </View>
      <TouchableOpacity onPress={TryAgain} style={{backgroundColor: '#fff', marginHorizontal: 20, borderColor: '#000000', borderRadius: 5, borderWidth: 1, paddingVertical: 10}}>
        <Text style={{color: '#000000', textAlign: 'center', fontSize: 20, }}>Try the level again?</Text>
      </TouchableOpacity>
    </View>
  )
}

const TimeUp = ({TryAgain}) => {
  return (
    <View style={{flex: 1, paddingHorizontal: 20, paddingVertical: 20}}>
      <View style={{flex: 1}}>
      <Text style={{fontSize: 50, color: '#e00016', fontWeight: '800',}}>Time's up!</Text>
      </View>
      <TouchableOpacity onPress={TryAgain} style={{backgroundColor: '#fff', borderColor: '#000000', borderRadius: 5, borderWidth: 1, paddingVertical: 10}}>
        <Text style={{color: '#000000', textAlign: 'center', fontSize: 20, }}>Try the level again?</Text>
      </TouchableOpacity>
    </View>
  )
}

const LevelComplete = ({NextLevel, CustomTitle, CustomCaption}) => {
  return (
    <View style={{flex: 1, paddingHorizontal: 20, paddingVertical: 20}}>
      <View style={{flex: 1}}>
      <Text style={{fontSize: 40, color: '#e00016', fontWeight: '800', marginBottom: 20,}}>Level complete!</Text>
      <Text style={{fontSize: 18, color: '#000'}}>{CustomTitle}</Text>
      <Text style={{fontSize: 18, color: '#000'}}>{CustomCaption}</Text>
      </View>
      <TouchableOpacity onPress={NextLevel} style={{backgroundColor: '#fff', borderColor: '#000000', borderRadius: 5, borderWidth: 1, paddingVertical: 10}}>
        <Text style={{color: '#000000', textAlign: 'center', fontSize: 20, }}>Play the next level</Text>
      </TouchableOpacity>
    </View>
  )
}

const GameComplete = ({PlayAgain, OpenLink}) => {
  return (
    <View style={{flex: 1, paddingHorizontal: 20, paddingVertical: 20}}>
      <View style={{flex: 1}}>
      <Text style={{fontSize: 40, color: '#e00016', fontWeight: '800', marginBottom: 20,}}>You win!</Text>
      <Text style={{fontSize: 16, color: '#000'}}>Congratulations! You defeated all the distractions</Text>
      <Text style={{fontSize: 16, color: '#000'}}>This is a replica, to play the actual game, tap below</Text>
      <Text onPress={OpenLink} style={{fontSize: 20, color: 'blue', fontWeight: '800', marginTop: 10,}}>Tap me</Text>
      </View>
      <TouchableOpacity onPress={PlayAgain} style={{backgroundColor: '#fff', borderColor: '#000000', borderRadius: 5, borderWidth: 1, paddingVertical: 10}}>
        <Text style={{color: '#000000', textAlign: 'center', fontSize: 20, }}>Play Again</Text>
      </TouchableOpacity>
    </View>
  )
}

//colors
const AllColors = [
  {
    id: 1,
    Title: "Black",
    code: "#000000",
  },
  {
    id: 2,
    Title: "Pink",
    code: "#ff97cf",
  },
  {
    id: 3,
    Title: "Yellow",
    code: "#fff000",
  },
  {
    id: 4,
    Title: "Green",
    code: "#51e90e",
  },
  {
    id: 5,
    Title: "Red",
    code: "#e00016",
  },
  {
    id: 6,
    Title: "Blue",
    code: "#0e7fe9",
  }
];

//game levels
const WELCOME_STATE = 1;
const LEVEL_ONE = 2;
const LEVEL_TWO = 3;
const LEVEL_THREE = 4;
const LEVEL_FOUR = 5;
const LEVEL_FIVE = 6;

//game wordings
const togos = ['',
  '',
  "One down, four to go.",
  "Two down, three to go.",
  "Three down, two to go.",
  "Time for the last level!"
]

const nextWarnings = ['',
  '',
  "Well done. We'll try and distract you a bit now.",
  "Good job. But can you cope with changing backgrounds?",
  "You're unstoppable! Now, you face the bouncing doggy! aka Shaggy",
  "Can you cope will all the distractions together?",
  ""
]

//answers
const Wrong_Answer = 0
const Correct_Answer = 1
const Time_Out = 3
const Level_Complete = 4
const Finish_Game = 5

const App = () => {

  useEffect(() => {
    getNewWordAndColor();
    SplashScreen.hide();
  }, []);

  const [showGamePause, setShowGamePause] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameStates, setGameStates] = useState(1);
  const [timeElapse, setTimeElapse] = useState(0)
  const [gameLevels, setGameLevels] = useState(WELCOME_STATE);
  const [gameSecs, setGameSecs] = useState(0);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(1);
  const [selectedColor, setSelectedColor] = useState({
    id: 6,
    Title: "Blue",
    code: "#0e7fe9",
  });
  const [selectedWord, setSelectedWord] = useState({
    id: 1,
    Title: "Black",
    code: "#000000",
  })
  const [usedColorCombinations, setUsedColorCombinations] = useState([]);


  const startGame = () => {
    setGameSecs(0);
    setGameScore(0);
    easeOutQuad(gameScore,5000,-3500,8);
    setGameLevels(prev => prev + 1);
  }

  const easeOutQuad = (t,b,c,d) => {
    t /= d;
    let x = -c * t*(t-2) + b;
    setTimeElapse(x);
    return true;
  }

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const getNewWordAndColor = () => {
    const colorNumber = Math.floor(Math.random() * 6) 
    const wordNumber = Math.floor(Math.random() * 6)

    if(colorNumber === wordNumber){
      return getNewWordAndColor()
    }

    const colorToUse = AllColors[colorNumber];
    const wordToUse = AllColors[wordNumber];

    setSelectedWord(wordToUse)
    setSelectedColor(colorToUse)
  }

  const _getAnswer = (item) => {
    if(item.code === selectedColor.code){
      if(gameStates >= 8){
        setGameScore(0);
        if(gameLevels >= LEVEL_FIVE){
          setIsAnswerCorrect(Finish_Game)
          setShowGamePause(true)
          return
        }
        //easeOutQuad(gameScore,5000,-3500,8);
        setIsAnswerCorrect(Level_Complete)
        setShowGamePause(true)
        return
      }
      setGameScore(prev => prev + 1);
      setIsAnswerCorrect(1)
      setShowGamePause(true);
      setTimeout(() => {
        getNewWordAndColor();
        easeOutQuad(gameScore,5000,-3500,8);
        setGameStates(prev => prev + 1);
        //setTimeElapse(prev => prev * 1.2)
        setShowGamePause(false)
      }, 500);
    }else{
      setGameScore(0);
      setIsAnswerCorrect(0)
      setShowGamePause(true);
      getNewWordAndColor();
    }
  }

  const timeOut = () => {
    setShowGamePause(true)
    setIsAnswerCorrect(Time_Out)
  }

  const displayContent = () => {
    if(gameLevels === WELCOME_STATE){
      return <WelcomeComponent
        PlayGame={startGame}
      />
    }else if(gameLevels === LEVEL_ONE) {
      return <LevelOne
        GetColor={_getAnswer}
        ButtonColors={shuffleArray(AllColors)}
        Word={selectedWord}
        Colors={selectedColor}
        TimeBar={timeOut}
        IndicatorCount={gameStates}
        Timer={timeElapse}
      />
    }else if(gameLevels === LEVEL_TWO) {
      return <LevelTwo
        GetColor={_getAnswer}
        ButtonColors={shuffleArray(AllColors)}
        Word={selectedWord}
        Colors={selectedColor}
        TimeBar={timeOut}
        IndicatorCount={gameStates}
        Timer={timeElapse}
      />
    }else if(gameLevels === LEVEL_THREE) {
      return <LevelThree
        GetColor={_getAnswer}
        ButtonColors={shuffleArray(AllColors)}
        Word={selectedWord}
        Colors={selectedColor}
        TimeBar={timeOut}
        IndicatorCount={gameStates}
        Timer={timeElapse}
      />
    }else if(gameLevels === LEVEL_FOUR) {
      return <LevelFour
        GetColor={_getAnswer}
        ButtonColors={shuffleArray(AllColors)}
        Word={selectedWord}
        Colors={selectedColor}
        TimeBar={timeOut}
        IndicatorCount={gameStates}
        Timer={timeElapse}
      />
    }else {
      return <LevelFive
        GetColor={_getAnswer}
        ButtonColors={shuffleArray(AllColors)}
        Word={selectedWord}
        Colors={selectedColor}
        TimeBar={timeOut}
        IndicatorCount={gameStates}
        Timer={timeElapse}
      />
    }
  }

  const restartLevel = () => {
    setUsedColorCombinations([])
    getNewWordAndColor();
    setGameStates(1);
    setGameSecs(0);
    setTimeElapse(2000);
    setGameScore(0);
    easeOutQuad(gameScore,5000,-3500,8);
    setShowGamePause(false);
  }

  const _nextLevel = () => {
    startGame();
    restartLevel();
  }

  const _playAgain = () => {
    setGameLevels(LEVEL_ONE)
    restartLevel()
  }

  const gamePauses = () => {
    if(isAnswerCorrect === Correct_Answer){
      return <CorrectAnswer/>
    }else if(isAnswerCorrect === Wrong_Answer){
      return <WrongAnswer
        TryAgain={restartLevel}
      />
    }else if(isAnswerCorrect === Time_Out){
      return <TimeUp
        TryAgain={restartLevel}
      />
    }else if(isAnswerCorrect === Level_Complete){
      return <LevelComplete
        NextLevel={_nextLevel}
        CustomTitle={togos[gameLevels]}
        CustomCaption={nextWarnings[gameLevels]}
      />
    }else{
      return <GameComplete
        PlayAgain={_playAgain}
        OpenLink={() => Linking.openURL('https://s3.mirror.co.uk/click-the-colour-and-not-the-word/index.html')}
      />
    }
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar backgroundColor={'rgba(0,0,0,0.5)'} barStyle={'light-content'} translucent ={true} />
      <ImageBackground source={{uri: 'background'}} resizeMode="cover" style={styles.imageWrapper}>
        <View style={styles.container}>
          {showGamePause ? gamePauses() : displayContent()}
        </View>
        <Text style={styles.logoText}>#Madeuthink</Text>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  imageWrapper: {
    flex: 1,
  },
  container: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    height: 300,
    marginTop: 50,
  },
  logoText: {
    backgroundColor: '#e00016',
    textAlign: 'center',
    color: '#fff',
    paddingVertical: 0,
    fontWeight: '700',
    fontSize: 56,  
  }
});