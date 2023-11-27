import { useState, useEffect } from "react";

const PoenCardAm = () => {
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [wrongInput, setWrongInput] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [chars, setChars] = useState("");

  const lines = ["አኡኢ"];

  const latinToAm = (char: string) => {
    // This is a simple example and may not cover all cases
    const amharicMapping: Record<string, string> = {
      a: "አ",
      u: "ኡ",
      i: "ኢ",

      // Add more mappings as needed
    };

    setChars(
      (prevChars) => prevChars + (amharicMapping[char.toLowerCase()] || char)
    );
  };

  const keyPressed = (event: React.KeyboardEvent) => {
    console.log("c:" + correctCount, "i:" + wrongCount);
    const { key } = event;
    if (key.length > 1) return;

    const expected = lines[row][col];

    latinToAm(key);
  };

  useEffect(() => {
    const expected = lines[row][col];
    const lastChar = chars.slice(-1);

    if (expected === lastChar) {
      setCorrectCount(correctCount + 1);
      setWrongInput(false);
      console.log("Correct key:", lastChar);

      if (col === lines[row].length - 1) {
        if (row === lines.length - 1) {
          console.log("c:" + correctCount, "i:" + wrongCount);
          console.log("All characters typed correctly!");
          return;
        }
        setRow(row + 1);
        setCol(0);
      } else {
        setCol(col + 1);
      }
    } else if (lastChar.trim() !== "") {
      setWrongCount(wrongCount + 1);
      setWrongInput(true);
      console.log("Wrong key:", lastChar);
    }
  }, [chars, col, row, lines]);

  useEffect(() => {
    setChars("");
    return;
  }, [col, row, lines]);

  useEffect(() => {
    console.log("Correct Count:", correctCount);
  }, [correctCount]);

  useEffect(() => {
    console.log("Wrong Count:", wrongCount);
  }, [wrongCount]);
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
        <p className="text-2xl">ይንኩኝ</p>
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
