import { useState } from "react";
import { conversionMap } from "../constants/letterMap";

const PoenCardAm = () => {
    const [row, setRow] = useState(0);
    const [col, setCol] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [wrongInput, setWrongInput] = useState(false);
    const [chars, setChars] = useState("");
    const lines = [
        "መሙሚማሜምሞ",
        "ሰሱሲሳሴስሶ",
        "በቡቢባቤብቦ"
    ];

    const latinToAm = (char: string) => {
        const charaSet = conversionMap[char.toLowerCase()];
        if (char.length > 2) {
            setChars("");
        }

        return charaSet;
    };

    const keyPressed = (event: React.KeyboardEvent) => {
        const { key } = event;
        if (key.length > 1) return;
        let amharicChar = "";
        if (chars.length > 0) {
            setChars(chars + key);
            amharicChar = latinToAm(chars + key);
        } else {
            setChars(key);
            amharicChar = latinToAm(key);
        }

        const expected = lines[row][col];
        const keys = Object.keys(conversionMap);
        const foundKey = keys.find(key => conversionMap[key] === expected);

        if (foundKey && !foundKey.startsWith(chars + key)) {
            setChars("");
        }

        if (expected === amharicChar) {
            setWrongInput(false);
            setChars("");
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
        }
        else {
            if ((chars + key).length > 2 || amharicChar === undefined) {
                setWrongInput(true);
            }
        }
    };
    return (
        <div className="outline-none" onFocus={() => { setPlaying(true) }}
            onBlur={() => { setPlaying(false) }}
            tabIndex={0} onKeyDownCapture={keyPressed}>
            <div
                className="flex items-center justify-center mt-10 outline-none">
                {
                    !playing ? (<p className="text-2xl">ይንኩኝ</p>)
                        : (<>
                            <div>
                                {lines.map((line, i) => {
                                    return (
                                        <div key={i} className="mb-0">
                                            {i === row ? '👉' : ' '}
                                            &nbsp;&nbsp;
                                        </div>
                                    );
                                })}
                            </div>
                            <div>
                                {lines.map((line, i) => {
                                    return i !== row ? <p key={i} className="opacity-40"> {line} </p> : (
                                        <div key={i} className="mb-1 p-1">

                                            {line.split('').map((char, j) => {
                                                if (j === col) return (<div key={j} className={`opacity-100 underline mr-2 hover:border rounded-md  hover:bg-red-300 hover:opacity-100 border [w-50px] [h-50px] inline-flex p-2 justify-center cursor-pointer ${wrongInput ? 'bg-red-700 text-white text-xl p-1' : ''}`} ><span className="w-[20px] text-center">{char}</span></div>)
                                                return (
                                                    <div
                                                        key={j}
                                                        className={`${col >= j ? 'opacity-100' : 'opacity-100'
                                                            } mr-2 hover:border rounded-md  hover:bg-red-300 hover:opacity-100 border [w-50px] [h-50px] inline-flex p-2 justify-center cursor-pointer`}>
                                                        <span className="w-[20px] text-center">{char}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )
                                })}
                            </div>

                        </>)
                }
            </div>
        </div>
    )
}

export default PoenCardAm;