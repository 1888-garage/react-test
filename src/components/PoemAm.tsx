import { useState, useEffect, useRef } from "react";

const PoenCardAm = () => {
    const [row, setRow] = useState(0);
    const [col, setCol] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [wrongInput, setWrongInput] = useState(false);
    const [chars, setChars] = useState("");
    const inputRef = useRef(null);
    const lines = [
        "መሙሚማሜምሞ",
        "ሰሱሲሳሴስሶ",
        "በቡቢባቤብቦ",
        "አኡኢኣኤእኦ",
        "ጸጹጺጻጼጽጾ",
    ];

    const latinToAm = (char: string) => {
        const conversionMap = {
            // Single-letter Amharic characters
            a: "ሀ",
            b: "በ",
            c: "ኸ",
            d: "ደ",
            e: "አ",
            f: "ፈ",
            g: "ገ",
            h: "ሀ",
            i: "ኢ",
            j: "ጅ",
            k: "ከ",
            l: "ለ",
            m: "መ",
            n: "ነ",
            o: "ኦ",
            p: "ፕ",
            q: "ቅ",
            r: "ር",
            s: "ሠ",
            t: "ተ",
            u: "ኡ",
            v: "ቭ",
            w: "ው",
            x: "ክ",
            y: "ይ",
            z: "ዝ",
            A: "ሀ",
            B: "በ",
            C: "ኸ",
            D: "ደ",
            E: "አ",
            F: "ፈ",
            G: "ገ",
            H: "ሀ",
            I: "ኢ",
            J: "ጅ",
            K: "ከ",
            L: "ለ",
            M: "መ",
            N: "ነ",
            O: "ኦ",
            P: "ፕ",
            Q: "ቅ",
            R: "ር",
            S: "ሠ",
            T: "ተ",
            U: "ኡ",
            V: "ቭ",
            W: "ው",
            X: "ክ",
            Y: "ይ",
            Z: "ዝ",
        };
        let bash = ''
        if (char === ' ') {
            bash = ' '
        }
        let convertedChar = conversionMap[char.toLowerCase()] || bash;
        setChars((prevChars) => prevChars + convertedChar);

    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const keyPressed = (event: React.KeyboardEvent) => {
        const { key } = event;
        if (key.length > 1) return;
        if (key === "Backspace") {
            if (chars.length > 0) {
                setChars(chars.slice(0, -1));
            }
            return;
        }

        const expected = lines[row][col];
        console.log(expected, "error", key, 'key', row, col)
        latinToAm(key);

        if (expected === key) {
            setWrongInput(false);
            if (col === lines[row].length - 1) {
                if (row === lines.length - 1) {
                    return;
                }
                setRow(row + 1);
                setCol(0);
            } else {
                setCol(col + 1);
            }
        } else {
            console.log('wrong key');
            setWrongInput(true);
        }
    }
    return (
        <div className="outline-none" onFocus={() => { setPlaying(true) }}
            // onBlur={() => { setPlaying(false) }}
            tabIndex={0} onKeyDownCapture={keyPressed}>
            {playing &&
                <div className="flex items-center justify-center mt-10 outline-none">
                    <textarea
                        value={chars}
                        ref={inputRef}
                        onChange={(event) => event.nativeEvent['inputType'] === 'deleteContentBackward' ?
                            setChars(event.target.value) : ''}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 h-[100px] w-[90%] text-xl text-[#717082]"
                    />
                </div>
            }
            <div
                className="flex items-center justify-center mt-10 outline-none">
                {
                    !playing ? (<p className="text-2xl">ይንኩኝ</p>)
                        : (<>
                            <div>
                                {lines.map((line, i) => {
                                    return (
                                        <div key={i} className="mb-5">
                                            {i === row ? '👉' : ' '}
                                            &nbsp;&nbsp;
                                        </div>
                                    );
                                })}
                            </div>
                            <div>
                                {lines.map((line, i) => {
                                    return (
                                        <div key={i} className="mb-1 p-1">

                                            {line.split('').map((char, j) => {
                                                if (j === col) return (<div onClick={() => setChars((prevChars) => prevChars + char)} key={j} className={`opacity-100 underline mr-2 hover:border rounded-md  hover:bg-red-300 hover:opacity-100 border [w-50px] [h-50px] inline-flex p-2 justify-center cursor-pointer ${wrongInput ? 'text-red-700' : ''}`} ><span className="w-[20px] text-center">{char}</span></div>)
                                                return (
                                                    <div
                                                        key={j}
                                                        className={`${col >= j ? 'opacity-100' : 'opacity-100'
                                                            } mr-2 hover:border rounded-md  hover:bg-red-300 hover:opacity-100 border [w-50px] [h-50px] inline-flex p-2 justify-center cursor-pointer`}
                                                        onClick={() => setChars((prevChars) => prevChars + char)}>
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