import React, { useEffect, useState } from "react";
import TestResultCard from "./TestResultCard.jsx";

const PoenCard = () => {
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

  // Use an array to store mistyped characters and their counts
  const [mistypedChars, setMistypedChars] = useState([]);

  const lines = [
    "Wake! For the Sun, who scatter'd into flight",
    "The Stars before him from the Field of Night,",
    "Drives Night along with them from Heav'n, and strikes",
    "The Sultan's Turret with a Shaft of Light.",
  ];

  const keyPressed = (event) => {
    const { key } = event;
    if (key.length > 1) return;

    if (!startTime) {
      // Start timer
      setStartTime(new Date());
    }

    const expected = lines[row][col];
    setStrokeCount(strokeCount + 1);

    if (expected === key) {
      setWrongInput(false);
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
    } else {
      setWrongCount(wrongCount + 1);
      setWrongInput(true);

      setMistypedChars((prevMistypedChars) => {
        const mistypedChar = expected.toLowerCase();
        const existingIndex = prevMistypedChars.findIndex(
          (item) => item.char === mistypedChar
        );

        if (existingIndex !== -1) {
          // If the mistyped character already exists, update its count
          prevMistypedChars[existingIndex].count += 1;
        } else {
          // If the mistyped character is new, add it to the array
          prevMistypedChars.push({ char: mistypedChar, count: 1 });
        }

        // Sort the array based on count in descending order
        prevMistypedChars.sort((a, b) => b.count - a.count);

        return [...prevMistypedChars];
      });
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

  // To get the most frequent mistyped character
  const getMostFrequentMistake = (mistypedChars) => {
    return mistypedChars.length > 0 ? mistypedChars[0] : null;
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        onFocus={() => {
          setPlaying(true);
        }}
        onBlur={() => {
          setPlaying(false);
        }}
        tabIndex={0}
        onKeyDownCapture={keyPressed}
        className="flex items-center justify-center mt-10 outline-none"
      >
        {!playing ? (
          <p className="text-2xl">Click Here</p>
        ) : (
          <>
            <p>
              {lines.map((line, i) => (
                <p key={i}>
                  {i === row ? "👉" : " "}
                  &nbsp;&nbsp;
                </p>
              ))}
            </p>
            <p>
              {lines.map((line, i) => (
                <p key={i}>
                  {i !== row ? (
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
                  )}
                </p>
              ))}
            </p>
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

export default PoenCard;
