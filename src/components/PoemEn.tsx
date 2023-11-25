import { useState } from "react";

const PoenCard = () => {
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [wrongInput, setWrongInput] = useState(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [incorrectCount, setIncorrectCount] = useState<number>(0);
  const lines = [
    "Wake! For the Sun, who scatter'd into flight",
    "The Stars before him from the Field of Night,",
    "Drives Night along with them from Heav'n, and strikes",
    "The Sultan's Turret with a Shaft of Light.",
  ];
  const keyPressed = (event: React.KeyboardEvent) => {
    console.log("incorect: " + incorrectCount + "correct: " + correctCount);

    const { key } = event;
    if (key.length > 1) return;
    const expected = lines[row][col];
    if (expected === key) {
      setWrongInput(false);
      setCorrectCount(correctCount + 1);
      if (col === lines[row].length - 1) {
        if (row === lines.length - 1) {
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
  };
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
        <p className="text-2xl">Click Here</p>
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
      <button
        onClick={() =>
          console.log(
            "incorect: " + incorrectCount + "correct: " + correctCount
          )
        }
      >
        submit
      </button>
    </div>
  );
};

export default PoenCard;
