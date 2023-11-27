// ... (your imports and other code)
import { useState, useEffect } from "react";

const PoenCard = ({ amharic }: { amharic: boolean }) => {
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [wrongInput, setWrongInput] = useState(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [incorrectCount, setIncorrectCount] = useState<number>(0);
  const [chars, setChars] = useState("");

  const linesEng = [
    "Wake! For the Sun, who scatter'd into flight",
    "The Stars before him from the Field of Night,",
    "Drives Night along with them from Heav'n, and strikes",
    "The Sultan's Turret with a Shaft of Light.",
  ];
  const linesAmh = ["አ", "በ", "መሰ"];

  const latinToAm = (char: string) => {
    const amharicMapping: Record<string, string> = {
      a: "አ",
      b: "በ",
      m: "መ",
      s: "ሰ",
    };

    setChars(
      (prevChars) => prevChars + (amharicMapping[char.toLowerCase()] || char)
    );
  };

  const keyPressed = (event: React.KeyboardEvent) => {
    console.log("incorect: " + incorrectCount + "correct: " + correctCount);

    const { key } = event;
    if (key.length > 1) return;
    if (amharic === true) {
      latinToAm(key);
    } else {
      const expected = linesEng[row][col];
      if (expected === key) {
        setWrongInput(false);
        setCorrectCount(correctCount + 1);
        if (col === linesEng[row].length - 1) {
          if (row === linesEng.length - 1) {
            console.log("displayed");
            return;
          }
          setRow(row + 1);
          setCol(0);
        } else {
          setCol(col + 1);
        }
      } else {
        console.log("wrong key");
        setWrongInput(true);
        setIncorrectCount(incorrectCount + 1);
      }
    }
  };

  useEffect(() => {
    if (amharic === true) {
      const expected = linesAmh[row][col];
      const lastChar = chars.slice(-1);

      if (expected === lastChar) {
        setCorrectCount(correctCount + 1);
        setWrongInput(false);
        console.log("Correct key:", lastChar);

        if (col === linesAmh[row].length - 1) {
          if (row === linesAmh.length - 1) {
            console.log("c:" + correctCount, "i:" + incorrectCount);
            console.log("All characters typed correctly!");
            return;
          }
          setRow(row + 1);
          setCol(0);
        } else {
          setCol(col + 1);
        }
      } else if (lastChar.trim() !== "") {
        setIncorrectCount(incorrectCount + 1);
        setWrongInput(true);
        console.log("Wrong key:", lastChar);
      }
    }
    return;
  }, [chars, col, row, linesAmh, amharic]);

  useEffect(() => {
    if (amharic === true) {
      setChars("");
    } else {
      return;
    }
  }, [col, row, linesAmh, amharic]);

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
      onKeyDownCapture={keyPressed}
      className="flex  items-center justify-center mt-10 outline-none"
    >
      {!playing ? (
        <button
          onClick={() => setPlaying(true)}
          className="text-2xl bg-green-500 text-white rounded p-4"
        >
          {amharic ? <span>ይንኩኝ</span> : <span>Click Here</span>}
        </button>
      ) : (
        <>
          <p>
            {amharic
              ? linesAmh.map((line, i) => {
                  return (
                    <p>
                      {i === row ? "👉" : " "}
                      &nbsp;&nbsp;
                    </p>
                  );
                })
              : linesEng.map((line, i) => {
                  return (
                    <p>
                      {i === row ? "👉" : " "}
                      &nbsp;&nbsp;
                    </p>
                  );
                })}
          </p>
          <p>
            {amharic
              ? linesAmh.map((line, i) => {
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
                          <span
                            className={col >= j ? "opacity-100" : "opacity-40"}
                          >
                            {char}
                          </span>
                        );
                      })}
                    </p>
                  );
                })
              : linesEng.map((line, i) => {
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
                          <span
                            className={col >= j ? "opacity-100" : "opacity-40"}
                          >
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

export default PoenCard;
