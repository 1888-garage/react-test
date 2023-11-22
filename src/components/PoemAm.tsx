import { useEffect, useState } from "react";

const PoenCardAm = () => {
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [wrongInput, setWrongInput] = useState(false);
  const [wrongInputCount, setWrongInputCount] = useState(0);

  const [chars, setChars] = useState("");

  const lines = ["መሙሚማሜምሞ", "ሰሱሲሳሴስሶ", "በቡቢባቤብቦ"];

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
    // Add more mappings as needed
  };
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
  
    // Split the pathname to get the language code
    const parts = pathname.split('/');
    const languageCode = parts[1];
  
    console.log(languageCode); 
  }
  
  
  const latinToAm = (char: string) => {
    const lowercaseEn = char.toLowerCase();
    const geezChar = geezTransliteration[lowercaseEn];
    if (char.length > 2) {
      setChars("");
    }

    return geezChar;
  };
  useEffect(() => {
    setWrongInputCount(0);
  }, []);

  const keyPressed = (event: React.KeyboardEvent) => {
    const { key } = event;
    let geezChar = ""; //used as the amharic translated value

    if (col === 0 && row === 0 && wrongInput === false) {
      setWrongInputCount(0);
    }

    if (chars.length > 0) {
      setChars(chars + key);
      geezChar = latinToAm(chars + key);
    } else {
      setChars(key);
      geezChar = latinToAm(key);
    }

    const expected = lines[row][col];

    if (expected === geezChar) {
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
      //this two are checking if no match is found
      if (geezChar === undefined) {
        setWrongInputCount(wrongInputCount + 1);
        setWrongInput(true);
      }
      //wont be needed if all amharic keys are fully represented in the geezTranslaton obj
      if ((chars + key).length > 2) {
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
      onKeyDownCapture={playing===true ? keyPressed:undefined}
      className="flex  items-center justify-center mt-10 outline-none"
    >
      {!playing ? (
        <div>
          {wrongInputCount > 0 && <p className="text-2xl text-center">{wrongInputCount}</p>}
          <p className="text-2xl">ይንኩኝ</p>
        </div>
      ) : (
        <>
          <p>
          
            {lines.map((line, i) => {
              return (
                <p>
                  {i === row ? "👉" : " "}
                  &nbsp;&nbsp;
                </p>
              );
            })}
          </p>
          <p>
            {lines.map((line, i) => {
              return i !== row ? (
                <p className="opacity-40"> {line} </p>
              ) : (
                <p>
                  {line.split("").map((char, j) => {
                    if (j === col)
                      return (
                        <span
                          className={`opacity-50 underline ${
                            wrongInput ? "text-red-700" : ""
                          }`}
                        >
                          {char}
                        </span>
                      );
                    return (
                      <span className={col >= j ? "opacity-100" : "opacity-40"}>
                        {char}
                      </span>
                    );
                  })}
                </p>
              );
            })}
          </p>
        </>
      )}
    </div>
  );
};

export default PoenCardAm;
