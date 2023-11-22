import { useEffect, useState } from "react";

const PoemCard = () => {
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [wrongInput, setWrongInput] = useState(false);
  const [wrongInputCount, setWrongInputCount] = useState(0);

  const [chars, setChars] = useState("");

  let languageCode = "";
  let lines = [];

  // get language code from pathname
  if (typeof window !== "undefined") {
    const pathname = window.location.pathname;

    const parts = pathname.split("/");
    languageCode = parts[1];

    languageCode !== "am"
      ? (lines = [
          "Wake! For the Sun, who scatter'd into flight",
          "The Stars before him from the Field of Night,",
          "Drives Night along with them from Heav'n, and strikes",
          "The Sultan's Turret with a Shaft of Light.",
        ])
      : (lines = ["መሙሚማሜምሞ", "ሰሱሲሳሴስሶ", "በቡቢባቤብቦ"]);

  }

  const geezTransliteration = {
    me: "መ",
    mu: "ሙ",
    mi: "ሚ",
    ma: "ማ",
    mee: "ሜ",
    m: "ም",
    mo: "ሞ",
    se: "ሰ",
    su: "ሱ",
    si: "ሲ",
    sa: "ሳ",
    see: "ሴ",
    s: "ስ",
    so: "ሶ",
    be: "በ",
    bu: "ቡ",
    bi: "ቢ",
    ba: "ባ",
    bee: "ቤ",
    b: "ብ",
    bo: "ቦ",
  };

  //   en to Amh character translator
  const latinToAm = (char: string) => {
    const geezChar = geezTransliteration[char];
    if (char.length > 2) {
      setChars("");
    }
    return geezChar;
  };

  useEffect(() => {
    if (col === 0 && row === 0 && wrongInput === false) {
      setWrongInputCount(0);
    }
  }, [wrongInput]);

//   this function is used to reset character combinations to empty
//  if currently accumlated is different to expected key! 
  const getKeyByValue = (char: string, current: string) => {
    for (const key in geezTransliteration) {
      if (geezTransliteration[key] === char) {
        key.slice(0, chars.length + 1) !== chars + current && setChars("");
      }
    }
  }; 


  const keyPressed = (event: React.KeyboardEvent) => {
    const { key } = event;
    if (key.length > 1) return;
    let geezChar = ""; //used as the amharic translated value

    //if at the begining of the array wrong value cont=0
    if (col === 0 && row === 0 && wrongInput === false) {
      setWrongInputCount(0);
    }

    // create En to Amh translation
    if (chars.length > 0) {
      setChars(chars + key);
      geezChar = latinToAm(chars + key);
    } else {
      languageCode === "am" && setChars(key);
      geezChar = latinToAm(key);
    }

    const expected = lines[row][col];
    getKeyByValue( expected, key);

    // traverse through the line array
    if (expected === (languageCode === "am" ? geezChar : key)) {
      setWrongInput(false);
      setChars(""); // reset string accomulater
      if (col === lines[row].length - 1) {
        if (row === lines.length - 1) {
          setPlaying(false);
          setRow(0);
          setCol(0);
          return;
        }

        setRow(row + 1);
        setCol(0);
      } else {
        setCol(col + 1);
      }
    } else {
      if (languageCode === "am") {
        if (geezChar === undefined || (chars + key).length > 2) {
          setWrongInputCount(wrongInputCount + 1);
          setWrongInput(true);
        }
      } else {
        setWrongInputCount(wrongInputCount + 1);
        setWrongInput(true);
      }
    }
  };

  return (
    <div
      onFocus={() => {
        setPlaying(true);
      }}
      tabIndex={0}
      onKeyDownCapture={playing === true ? keyPressed : undefined}
      className="flex  items-center justify-center mt-10 outline-none"
    >
      {!playing ? (
        <div>
          {wrongInputCount > 0 && (
            <p className="text-2xl ">
                {languageCode === "am" ? "የተሳሳተ ፊደል:  " : "Wrong Input:  "}{wrongInputCount}
            </p>
          )}
          <p className="text-2xl text-center">
            {languageCode === "am" ? "ይንኩኝ" : "Click Here"}
          </p>
        </div>
      ) : (
        <>
          <div>
            {lines.map((line, i) => {
              return (
                <p>
                  {i === row ? "👉" : " "}
                  &nbsp;&nbsp;
                </p>
              );
            })}
          </div>
          <div>
          {lines.map((line, i) => {
            return i!==row ? <p className="opacity-40"> {line} </p> :
                    <p>
                        {line.split('').map((char, j) => {
                            if(j===col) return <span className={`opacity-50 underline ${wrongInput ? 'text-red-700' : ''}`} >{char}</span>
                            return <span className={col>=j ? 'opacity-100' : 'opacity-40'} >{char}</span>   
                            })}
                        </p>
             })}
             </div>
        </>
      )}
    </div>
  );
};

export default PoemCard;
