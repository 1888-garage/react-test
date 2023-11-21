import { useState } from "react";



const PoenCardAm = () => {
    const [row, setRow] = useState(0);
    const [col, setCol] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [wrongInput, setWrongInput] = useState(false);

    const [chars, setChars] = useState("");

    const lines = [
        "መሙሚማሜምሞ",
        "ሰሱሲሳሴስሶ",
        "በቡቢባቤብቦ",
    ];

    const latinToAm = (char: string) => {
        
    }

    const keyPressed = (event: React.KeyboardEvent) => {
        const { key } = event;
        if(key.length > 1) return;
        const expected = lines[row][col];

        latinToAm(key);

        if(expected === key) {
            setWrongInput(false);
            if(col === lines[row].length - 1) {
                if(row === lines.length - 1) {
                    return;
                }
                setRow(row + 1);
                setCol(0);
            } else {
                setCol(col + 1);
            }
        }else {
            console.log('wrong key');
            setWrongInput(true);
        }
      }
    return <div
        onFocus={ () => {setPlaying(true)} }
        onBlur={ () => {setPlaying(false)} }
        tabIndex={0} onKeyDownCapture={keyPressed} 
        className="flex  items-center justify-center mt-10 outline-none">
            {
                !playing ? <p className="text-2xl">ይንኩኝ</p>
                : <>
                    <p>
                    {lines.map((line, i) => {
                        return <p>
                            {i===row ? '👉' : ' '}
                            &nbsp;&nbsp;
                        </p>
                    })}
                    </p>
                    <p>
                    {lines.map((line, i) => {
                        return i!==row ? <p className="opacity-40"> {line} </p> :
                        <p>
                            {line.split('').map((char, j) => {
                                if(j===col) return <span className={`opacity-50 underline ${wrongInput ? 'text-red-700' : ''}`} >{char}</span>
                                return <span className={col>=j ? 'opacity-100' : 'opacity-40'} >{char}</span>   
                            })}
                        </p>
                    })}
                    </p>
                </>
            }
    </div>
}

export default PoenCardAm;