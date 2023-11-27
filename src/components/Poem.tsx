import React, { useState, useEffect } from "react";

const PoenCard = ({ amharic }: { amharic: boolean }) => {
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [wrongInput, setWrongInput] = useState(false);
  const [display, setDisplay] = useState(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [incorrectCount, setIncorrectCount] = useState<number>(0);
  const [chars, setChars] = useState("");

  const lines = amharic
    ? ["መሙሚማሜምሞ", "ሰሱሲሳሴስሶ", "በቡቢባቤብቦ"]
    : [
        "Wake! For the Sun, who scatter'd into flight",
        "The Stars before him from the Field of Night,",
        "Drives Night along with them from Heav'n, and strikes",
        "The Sultan's Turret with a Shaft of Light.",
      ];

  const mapping = {
    a: "አ",
    b: "በ",
    m: "መ",
    s: "ሰ",
  };

  const latinToAm = (char: string) => {
    setChars((prevChars) => prevChars + (mapping[char.toLowerCase()] || char));
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    const { key } = event;

    if (key.length > 1) return;

    if (amharic) {
      latinToAm(key);
    } else {
      const expected = lines[row][col];

      if (expected === key) {
        setWrongInput(false);
        setCorrectCount((prevCount) => prevCount + 1);

        if (col === lines[row].length - 1) {
          if (row === lines.length - 1) {
            setDisplay(true);

            console.log("All characters typed correctly!");
            return;
          }

          setRow((prevRow) => prevRow + 1);
          setCol(0);
        } else {
          setCol((prevCol) => prevCol + 1);
        }
      } else {
        console.log("Wrong key");
        setWrongInput(true);
        setIncorrectCount((prevCount) => prevCount + 1);
      }
    }
  };

  useEffect(() => {
    if (amharic) {
      const expected = lines[row][col];
      const lastChar = chars.slice(-1);

      if (expected === lastChar) {
        setCorrectCount((prevCount) => prevCount + 1);
        setWrongInput(false);
        console.log("Correct key:", lastChar);

        if (col === lines[row].length - 1) {
          if (row === lines.length - 1) {
            console.log("c:" + correctCount, "i:" + incorrectCount);
            console.log("All characters typed correctly!");
            setDisplay(true);
            return;
          }

          setRow((prevRow) => prevRow + 1);
          setCol(0);
        } else {
          setCol((prevCol) => prevCol + 1);
        }
      } else if (lastChar.trim() !== "") {
        setIncorrectCount((prevCount) => prevCount + 1);
        setWrongInput(true);
        console.log("Wrong key:", lastChar);
      }
    }

    return;
  }, [chars, col, row, lines, amharic]);

  useEffect(() => {
    if (amharic) {
      setChars("");
    } else {
      return;
    }
  }, [col, row, lines, amharic]);

  useEffect(() => {
    if (amharic) {
      console.log("Correct Count:", correctCount);
    }
    return;
  }, [correctCount, amharic]);

  useEffect(() => {
    if (amharic) {
      console.log("Wrong Count:", incorrectCount);
    }
    return;
  }, [incorrectCount, amharic]);

  return (
    <div
      onFocus={() => {
        setPlaying(true);
      }}
      onBlur={() => {
        setPlaying(false);
      }}
      tabIndex={0}
      onKeyDown={handleKeyPress}
      className="flex items-center justify-center mt-10 outline-none"
    >
      {!playing && !display ? (
        <button
          onClick={() => setPlaying(true)}
          className="text-2xl bg-green-500 text-white rounded p-4"
        >
          {amharic ? <span>ይንኩኝ</span> : <span>Click Here</span>}
        </button>
      ) : !display ? (
        <>
          <p>
            {lines.map((line, i) => (
              <p key={i}>{i === row ? "👉" : " "}&nbsp;&nbsp;</p>
            ))}
          </p>
          <p>
            {lines.map((line, i) => (
              <p key={i} className={i !== row ? "opacity-40" : ""}>
                {line.split("").map((char, j) => (
                  <span
                    key={j}
                    className={`${
                      j === col ? "opacity-50 underline" : "opacity-100"
                    } ${wrongInput ? "text-red-700" : ""}`}
                  >
                    {char}
                  </span>
                ))}
              </p>
            ))}
          </p>
        </>
      ) : null}

      {display && (
        <div className="flex gap-4 bg-blue-500 p-4 rounded">
          <div className="text-white text-3xl">corect:{correctCount}</div>
          <div className="text-white text-3xl">incorrect:{incorrectCount}</div>
        </div>
      )}
    </div>
  );
};

export default PoenCard;
