import React, { useEffect, useState } from 'react';

interface LetterValue {
  letter: string;
  number: number;
}


function App() {

  const lettersValue: Array<LetterValue> = [
    { letter: "A", number: 1 }, { letter: "E", number: 1 }, { letter: "I", number: 1 },
    { letter: "O", number: 1 }, { letter: "U", number: 1 }, { letter: "L", number: 1 },
    { letter: "N", number: 1 }, { letter: "R", number: 1 }, { letter: "S", number: 1 },
    { letter: "T", number: 1 }, { letter: "D", number: 2 }, { letter: "G", number: 2 },
    { letter: "B", number: 3 }, { letter: "C", number: 3 }, { letter: "M", number: 3 },
    { letter: "P", number: 3 }, { letter: "F", number: 4 }, { letter: "H", number: 4 },
    { letter: "V", number: 4 }, { letter: "W", number: 4 }, { letter: "Y", number: 4 },
    { letter: "K", number: 5 }, { letter: "J", number: 8 }, { letter: "X", number: 8 },
    { letter: "Q", number: 10 }, { letter: "Z", number: 10 }
  ];

  const [playground, setPlayground] = useState<Array<string>>([]);
  const [totalScore, setTotalScore] = useState<number>(0);

  const getDeck = () => {
    return Array.from({ length: 7 }, () => {
      const randomNumber = Math.floor(Math.random() * lettersValue.length);
      return lettersValue[randomNumber].letter;
    });
  };

  const getValue = (letter: string) => {
    const found = lettersValue.find((item: LetterValue) => item.letter === letter);
    return found ? found.number : 0;
  };

  const deck: Array<string> = getDeck();

  // IF WE DONT WANT THE DECK TO CHANGE WHEN WE CLICK ON A LETTER WE CAN USE THE FOLLOWING CODE and remove the line 38 
  // const [deck, setDeck] = useState<Array<string>>([]);
  // useEffect(() => {
  //   const deck: Array<string> = getDeck();
  //   setDeck(deck);
  // }, [])

  const handleLetterClick = (letter: string) => {
    setPlayground([...playground, letter]);
    setTotalScore(totalScore + getValue(letter));
  }

  const handleRemoveLetter = (index: number) => {
    const newPlayground = playground.filter((_, i) => i !== index);
    setPlayground(newPlayground);
    setTotalScore(newPlayground.reduce((acc, curr) => acc + getValue(curr), 0));
  };
  

  return (
    <div className="App" style={{ height: "200px" ,width: "400px" ,padding: "10px", margin: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", border: "2px solid black" }}>       
        {
          deck?.map((letter: string, index: number) => (
            <div key={index} onClick={() => handleLetterClick(letter)} style={{ cursor: "pointer", margin: "5px", position: "relative", border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", width: "60px", height: "60px" }}>
              <div>{letter}</div>
              <div style={{ position: "absolute", bottom: "0", right: "0" }}>{getValue(letter)}</div>
            </div>
          ))
        }
      </div>
      <h3>Playground</h3>
      <div style={{ border: "2px solid black",  marginTop: "20px", minHeight: "200px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", padding: "5px" }}>
        {
          playground.map((letter: string, index: number) => (
            <div key={index} onClick={() => handleRemoveLetter(index)} style={{ margin: "5px", cursor: "pointer", position: "relative", border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", width: "60px", height: "60px" }}>
              <div>{letter}</div>
              <div style={{ position: "absolute", bottom: "0", right: "0" }}>{getValue(letter)}</div>
            </div>
          ))
        }
      </div>
      <div style={{ marginTop: "20px" }}>
        Total Score: {totalScore}
      </div>
    </div>
  );
}

export default App;
