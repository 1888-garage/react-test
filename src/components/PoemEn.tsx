import { useEffect, useState } from "react";
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
  const [storkCount, setStorkCount] = useState(0);

  const lines = ["asher samuel"];

  const keyPressed = (event: React.KeyboardEvent) => {
    const { key } = event;
    if (key.length > 1) return;

    if (!startTime) {
      // start timer
      setStartTime(new Date());
    }

    const expected = lines[row][col];
    setStorkCount(storkCount + 1);

    if (expected === key) {
      setWrongInput(false);
      if (col === lines[row].length - 1) {
        if (row === lines.length - 1) {
          setEndTime(new Date()); // end the timer
          setTestEnded(true); // End of the test
          return;
        }
        setRow(row + 1);
        setCol(0);
      } else {
        setCol(col + 1);
      }
    } else {
      setWrongCount(wrongCount + 1);
      // console.log("wrong key");
      setWrongInput(true);
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
          totalStroke={storkCount}
          wrongStroke={wrongCount}
          wordPerMinute={wpm}
        />
      )}
    </div>
  );
};

export default PoenCard;
