// import { useState, useEffect } from "react";

// const PoenCard = () => {
//     const [row, setRow] = useState(0);
//     const [col, setCol] = useState(0);
//     const [playing, setPlaying] = useState(false);
//     const [wrongInput, setWrongInput] = useState(false);
//     const [correctCount, setCorrectCount] = useState(0);
//     const [wrongCount, setWrongCount] = useState(0);
//     const [completed, setCompleted] = useState(false);

//     const lines = [
//         "Wake! For the Sun, who scatter'd into flight",
//         "The Stars before him from the Field of Night,",
//     ];

//     const handleKeyPress = (event) => {
//         const { key } = event;

//         if (key.length > 1 || completed) return;

//         const expected = lines[row][col];

//         if (expected === key) {
//             setWrongInput(false);
//             setCorrectCount((prevCount) => prevCount + 1);

//             if (col === lines[row].length - 1) {
//                 if (row === lines.length - 1) {
//                     setCompleted(true);
//                     return;
//                 }
//                 setRow((prevRow) => prevRow + 1);
//                 setCol(0);
//             }
//             else {
//                 setCol((prevCol) => prevCol + 1);
//             }
//         }
//         else {
//             setWrongInput(true);
//             setWrongCount((prevCount) => prevCount + 1);
//         }
//     };

//     return (
//         <div className="flex flex-col items-center">
//             <div
//                 onFocus={() => setPlaying(true)}
//                 onBlur={() => setPlaying(false)}
//                 tabIndex={0}
//                 onKeyDownCapture={handleKeyPress}
//                 className="flex items-center justify-center mt-10 outline-none"
//             >
//                 {!playing ? (
//                     <p className="text-2xl">Click Here</p>
//                 ) : (
//                     <>
//                         <p>
//                             {lines.map((line, i) => (
//                                 <p key={i}>{i === row ? '👉' : ' '}&nbsp;&nbsp;</p>
//                             ))}
//                         </p>
//                         <p>
//                             {lines.map((line, i) => (
//                                 i !== row ? (
//                                     <p key={i} className="opacity-40">{line}</p>
//                                 ) : (
//                                     <p key={i}>
//                                         {line.split('').map((char, j) => (
//                                             j === col ? (
//                                                 <span key={j} className={`opacity-50 underline ${wrongInput ? 'text-red-700' : ''}`}>{char}</span>
//                                             ) : (
//                                                 <span key={j} className={col >= j ? 'opacity-100' : 'opacity-40'}>{char}</span>
//                                             )
//                                         ))}
//                                     </p>
//                                 )
//                             ))}
//                         </p>
//                     </>
//                 )}
//             </div>
//             {completed && (
//                 <div className="mt-4 p-2 bg-gray-200 text-center">
//                     <p>Results:</p>
//                     <p>Correct Inputs: {correctCount}</p>
//                     <p>Wrong Inputs: {wrongCount}</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PoenCard;
