import React, { useEffect, useState } from "react";
import TestResultCard from "./TestResultCard.jsx";

const Poem = ({ lang }) => {
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [wrongInput, setWrongInput] = useState(false);
  const [testEnded, setTestEnded] = useState(false);

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [wpm, setWpm] = useState(null);

  const [wrongCount, setWrongCount] = useState(0);
  const [strokeCount, setStrokeCount] = useState(0);
  const [mistypedChars, setMistypedChars] = useState([]);

  const lines =
    lang === "am"
      ? ["መሙሚማሜምሞ", "ሰሱሲሳሴስሶ", "በቡቢባቤብቦ"]
      : [
          "Wake! For the Sun, who scatter'd into flight",
          "The Stars before him from the Field of Night,",
          "Drives Night along with them from Heav'n, and strikes",
          "The Sultan's Turret with a Shaft of Light.",
        ];

  const amharicLatinConversion = {
    b: { e: "በ", u: "ቡ", i: "ቢ", a: "ባ", ee: "ቤ", "": "ብ", o: "ቦ" },
    m: { e: "መ", u: "ሙ", i: "ሚ", a: "ማ", ee: "ሜ", "": "ም", o: "ሞ" },
    s: { e: "ሰ", u: "ሱ", i: "ሲ", a: "ሳ", ee: "ሴ", "": "ስ", o: "ሶ" },
    // Add more mappings as needed
  };

  const [chars, setChars] = useState("");

  const latinToAm = (char) => {
    if (lang === "am") {
      const lowercaseEn = char.toLowerCase();
      const consonant = lowercaseEn[0];
      const vowel = lowercaseEn.slice(1);
      const amhChar =
        amharicLatinConversion[consonant] &&
        amharicLatinConversion[consonant][vowel];

      if (char.length > 2) {
        setChars("");
      }

      return amhChar || "";
    } else {
      // For English, you may need a different logic or just return the input character
      return char;
    }
  };

  useEffect(() => {
    if (col === 0 && row === 0 && wrongInput === false) {
      setWrongCount(0);
    }
  }, [wrongInput]);

  const getKeyByValue = (char, current) => {
    if (lang === "am") {
      for (const key in amharicLatinConversion) {
        if (amharicLatinConversion[key][current] === char) {
          key.slice(0, chars.length + 1) !== chars + current && setChars("");
        }
      }
    } else {
      // Handling for English
      if (char.toLowerCase() !== current.toLowerCase()) {
        setChars("");
      }
    }
  };

  const keyPressed = (event) => {
    const { key } = event;
    if (key.length > 1) return;
    if (!startTime) {
      setStartTime(new Date());
    }

    let amhChar = "";
    let newChars = chars; // Initialize newChars with the current value of chars

    if (col === 0 && row === 0 && wrongInput === false) {
      setWrongCount(0);
    }

    if (chars.length > 0 && key !== " ") {
      newChars = chars + key;
      setChars(newChars);
      amhChar = latinToAm(newChars);
    } else {
      setChars(key);
      amhChar = latinToAm(key);
    }

    const expected = lines[row][col];
    setStrokeCount(strokeCount + 1);

    getKeyByValue(expected, key);

    if (expected === amhChar) {
      setWrongInput(false);
      setChars("");
      if (col === lines[row].length - 1) {
        if (row === lines.length - 1) {
          setEndTime(new Date());
          setTestEnded(true);
          return;
        }
        setRow(row + 1);
        setCol(0);
      } else {
        setCol(col + 1);
      }
      setStrokeCount(strokeCount + 1);
    } else {
      if (amhChar === undefined || key === " " || newChars.length > 2) {
        setWrongCount(wrongCount + 1);
        setWrongInput(true);

        setMistypedChars((prevMistypedChars) => {
          const mistypedChar = expected.toLowerCase();
          const existingIndex = prevMistypedChars.findIndex(
            (item) => item.char === mistypedChar
          );

          if (existingIndex !== -1) {
            prevMistypedChars[existingIndex].count += 1;
          } else {
            prevMistypedChars.push({ char: mistypedChar, count: 1 });
          }

          prevMistypedChars.sort((a, b) => b.count - a.count);

          return [...prevMistypedChars];
        });
      }
    }
  };

  useEffect(() => {
    if (endTime) {
      const minutes = (endTime - startTime) / (1000 * 60);
      const words = lines.join(" ").split(" ").length;
      const wordPerMinute = Math.round(words / minutes);

      setWpm(wordPerMinute);
    }
  }, [endTime, startTime, lines]);

  const getMostFrequentMistake = (mistypedChars) => {
    return mistypedChars.length > 0 ? mistypedChars[0] : null;
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        onFocus={() => {
          setPlaying(true);
        }}
        tabIndex={0}
        onKeyDownCapture={playing === true ? keyPressed : undefined}
        className="flex items-center justify-center mt-10 outline-none"
      >
        {!playing ? (
          <div>
            <p className="text-2xl">Click Here</p>
          </div>
        ) : (
          <>
            <div>
              {lines.map((line, i) => (
                <p key={i}>
                  {i === row ? "👉" : " "}
                  &nbsp;&nbsp;
                </p>
              ))}
            </div>
            <div>
              {lines.map((line, i) =>
                i !== row ? (
                  <p key={i} className="opacity-40">
                    {line}
                  </p>
                ) : (
                  <p key={i}>
                    {line.split("").map((char, j) => (
                      <span
                        key={j}
                        className={`${
                          col === j ? "opacity-50 underline" : ""
                        } ${col >= j ? "opacity-100" : "opacity-40"} ${
                          wrongInput ? "text-red-700" : ""
                        }`}
                      >
                        {char}
                      </span>
                    ))}
                  </p>
                )
              )}
            </div>
          </>
        )}
      </div>
      {testEnded && (
        <TestResultCard
          totalStroke={strokeCount}
          wrongStroke={wrongCount}
          wordPerMinute={wpm}
          mostFrequentMistake={
            getMostFrequentMistake(mistypedChars)?.char || ""
          }
          mostFrequentMistakeCount={
            getMostFrequentMistake(mistypedChars)?.count || 0
          }
        />
      )}
    </div>
  );
};

export default Poem;
// until here
