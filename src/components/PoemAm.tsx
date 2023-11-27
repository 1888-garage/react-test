import { useEffect, useState } from "react";
import TestResultCard from "./TestResultCard.jsx";

const PoenCardAm = () => {
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [wrongInput, setWrongInput] = useState(false);
  const [testEnded, setTestEnded] = useState(false); // Track if the test has ended

  const [startTime, setStartTime] = useState(null); // Track the start time
  const [endTime, setEndTime] = useState(null); // Track the end time
  const [wpm, setWpm] = useState(null); // Words Per Minute

  const [wrongCount, setWrongCount] = useState(0);
  const [strokeCount, setStrokeCount] = useState(0);

  const lines = ["ምመሞሙ"];

  const amharicLatinConversion = {
    b: { e: "በ", u: "ቡ", i: "ቢ", a: "ባ", ee: "ቤ", "": "ብ", o: "ቦ" },
    m: { e: "መ", u: "ሙ", i: "ሚ", a: "ማ", ee: "ሜ", "": "ም", o: "ሞ" },
    s: { e: "ሰ", u: "ሱ", i: "ሲ", a: "ሳ", ee: "ሴ", "": "ስ", o: "ሶ" },
    // Add more mappings as needed
  };

  const [chars, setChars] = useState("");

  const latinToAm = (char) => {
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
  };

  useEffect(() => {
    if (col === 0 && row === 0 && wrongInput === false) {
      setWrongCount(0);
    }
  }, [wrongInput]);

  const getKeyByValue = (char, current) => {
    for (const key in amharicLatinConversion) {
      if (amharicLatinConversion[key] === char) {
        key.slice(0, chars.length + 1) !== chars + current && setChars("");
      }
    }
  };

  const keyPressed = (event) => {
    const { key } = event;
    if (key.length > 1) return;
    if (!startTime) {
      // Start timer
      setStartTime(new Date());
    }

    let amhChar = "";

    if (col === 0 && row === 0 && wrongInput === false) {
      setWrongCount(0);
    }

    if (chars.length > 0) {
      setChars(chars + key);
      amhChar = latinToAm(chars + key);
    } else {
      setChars(key);
      amhChar = latinToAm(key);
    }

    const expected = lines[row][col];
    getKeyByValue(expected, key);

    if (expected === amhChar) {
      setWrongInput(false);
      setChars("");
      if (col === lines[row].length - 1) {
        if (row === lines.length - 1) {
          setPlaying(false);
          setRow(0);
          setCol(0);
          setEndTime(new Date()); // end the timer
          setTestEnded(true); // End of the test
          return;
        }
        setRow(row + 1);
        setCol(0);
      } else {
        setCol(col + 1);
      }
      setStrokeCount(strokeCount + 1);
    } else {
      if (amhChar === undefined || (chars + key).length > 2) {
        setWrongCount(wrongCount + 1);
        setWrongInput(true);
      }
    }
  };

  // Calculate WPM when the test ends
  useEffect(() => {
    if (endTime) {
      const minutes = (endTime - startTime) / (1000 * 60);
      const words = lines.join(" ").split(" ").length;
      const wordPerMinute = Math.round(words / minutes);

      setWpm(wordPerMinute);
    }
  }, [endTime, startTime, lines]);

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
            <p className="text-2xl">ይንኩኝ</p>
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
        />
      )}
    </div>
  );
};

export default PoenCardAm;
