import { useEffect, useState } from "react";

const PoenCard = () => {
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [wrongInput, setWrongInput] = useState(false);
  const [wrongInputCount, setWrongInputCount] = useState(0);

  const lines = [
    "Wake! For the Sun, who scatter'd into flight",
    "The Stars before him from the Field of Night,",
    "Drives Night along with them from Heav'n, and strikes",
    "The Sultan's Turret with a Shaft of Light.",
  ];

  useEffect(() => {
    setWrongInputCount(0);
  }, []);

  const keyPressed = (event: React.KeyboardEvent) => {
    const { key } = event;
    if (key.length > 1) return;
    if (col === 0 && row === 0 && wrongInput === false) {
      setWrongInputCount(0);
    }
    const expected = lines[row][col];
    if (expected === key) {
      setWrongInput(false);
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
      setWrongInputCount(wrongInputCount + 1);
      setWrongInput(true);
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
          <p className="text-2xl">Click Here</p>
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

export default PoenCard;
