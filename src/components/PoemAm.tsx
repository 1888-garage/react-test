// import { useState, useEffect } from "react";

// const PoenCard = (props) => {
//   const [row, setRow] = useState(0);
//   const [col, setCol] = useState(0);
//   const [playing, setPlaying] = useState(false);
//   const [wrongInput, setWrongInput] = useState(false);
//   const [correctCount, setCorrectCount] = useState(0);
//   const [wrongCount, setWrongCount] = useState(0);
//   const [completed, setCompleted] = useState(false);
//   const [car, setCar] = useState(0);

//   const enlines = [
//     "Wake! For the Sun, who scatter'd into flight",
//     "The Stars before him from the Field of Night,",
//   ];

//   const amlines = [
//     "Abebe በሶ በላ በልቶም ጠገበ እና ጫላም ጩቤ ጨበጠ ሄዶም ታድዮስን ወጋ",
//     "እፈለግሃለው",
//     "ይስሙ የሚባል ልጅ እፈለገዋለው",
//   ];

//   const lines = props.name?amlines:enlines;
//   // Mapping of Amharic characters to their corresponding English words
//   const mapping = {
//     a: "a",
//     A: "A",
//     b: "b",
//     B: "B",
//     c: "c",
//     C: "C",
//     d: "d",
//     D: "D",
//     e: "e",
//     E: "E",
//     f: "f",
//     F: "F",
//     g: "g",
//     G: "G",
//     h: "h",
//     H: "H",
//     i: "i",
//     I: "I",
//     j: "j",
//     J: "J",
//     k: "k",
//     K: "K",
//     l: "l",
//     L: "L",
//     m: "m",
//     M: "M",
//     n: "n",
//     N: "N",
//     o: "o",
//     O: "O",
//     p: "p",
//     P: "P",
//     q: "q",
//     Q: "Q",
//     r: "r",
//     R: "R",
//     s: "s",
//     S: "S",
//     t: "t",
//     T: "T",
//     u: "u",
//     U: "U",
//     v: "v",
//     V: "V",
//     w: "w",
//     W: "W",
//     x: "x",
//     X: "X",
//     y: "y",
//     Y: "Y",
//     z: "z",
//     Z: "Z",
//     ".": ".",
//     ",": ",",
//     ";": ";",
//     ":": ":",
//     "?": "?",
//     "!": "!",
//     "'": "'",
//     '"': '"',
//     "(": "(",
//     ")": ")",
//     "[": "[",
//     "]": "]",
//     "{": "{",
//     "}": "}",
//     "<": "<",
//     ">": ">",
//     "/": "/",
//     "\\": "\\",
//     "|": "|",
//     "-": "-",
//     _: "_",
//     "+": "+",
//     "=": "=",
//     "*": "*",
//     "&": "&",
//     "^": "^",
//     "%": "%",
//     $: "$",
//     "#": "#",
//     "@": "@",
//     "~": "~",
//     "`": "`",
//     ሀ: "he",
//     ሁ: "hu",
//     ሂ: "hi",
//     ሃ: "ha",
//     ሄ: "hie",
//     ህ: "h",
//     ሆ: "ho",
//     ለ: "le",
//     ሉ: "lu",
//     ሊ: "li",
//     ላ: "la",
//     ሌ: "lie",
//     ል: "l",
//     ሎ: "lo",
//     ሐ: "He",
//     ሑ: "Hu",
//     ሒ: "Hi",
//     ሓ: "Ha",
//     ሔ: "Hie",
//     ሕ: "H",
//     ሖ: "Ho",
//     መ: "me",
//     ሙ: "mu",
//     ሚ: "mi",
//     ማ: "ma",
//     ሜ: "mie",
//     ም: "m",
//     ሞ: "mo",
//     ሠ: "Se",
//     ሡ: "Su",
//     ሢ: "Si",
//     ሣ: "Sa",
//     ሤ: "Sie",
//     ሥ: "S",
//     ሦ: "So",
//     ረ: "re",
//     ሩ: "ru",
//     ሪ: "ri",
//     ራ: "ra",
//     ሬ: "rie",
//     ር: "r",
//     ሮ: "ro",
//     ሰ: "se",
//     ሱ: "su",
//     ሲ: "si",
//     ሳ: "sa",
//     ሴ: "sie",
//     ስ: "s",
//     ሶ: "so",
//     ሸ: "she",
//     ሹ: "shu",
//     ሺ: "shi",
//     ሻ: "sha",
//     ሼ: "shie",
//     ሽ: "sh",
//     ሾ: "sho",
//     ቀ: "qe",
//     ቁ: "qu",
//     ቂ: "qi",
//     ቃ: "qa",
//     ቄ: "qie",
//     ቅ: "q",
//     ቆ: "qo",
//     በ: "be",
//     ቡ: "bu",
//     ቢ: "bi",
//     ባ: "ba",
//     ቤ: "bie",
//     ብ: "b",
//     ቦ: "bo",
//     ቨ: "ve",
//     ቩ: "vu",
//     ቪ: "vi",
//     ቫ: "va",
//     ቬ: "vie",
//     ቭ: "v",
//     ቮ: "vo",
//     ተ: "te",
//     ቱ: "tu",
//     ቲ: "ti",
//     ታ: "ta",
//     ቴ: "tie",
//     ት: "t",
//     ቶ: "to",
//     ቸ: "che",
//     ቹ: "chu",
//     ቺ: "chi",
//     ቻ: "cha",
//     ቼ: "chie",
//     ች: "ch",
//     ቾ: "cho",
//     ኀ: "Xe",
//     ኁ: "Xu",
//     ኂ: "Xi",
//     ኃ: "Xa",
//     ኄ: "Xie",
//     ኅ: "X",
//     ኆ: "Xo",
//     ነ: "ne",
//     ኑ: "nu",
//     ኒ: "ni",
//     ና: "na",
//     ኔ: "nie",
//     ን: "n",
//     ኖ: "no",
//     ኘ: "gne",
//     ኙ: "gnu",
//     ኚ: "ngi",
//     ኛ: "gna",
//     ኜ: "gnie",
//     ኝ: "gn",
//     ኞ: "gno",
//     አ: "a",
//     ኡ: "u",
//     ኢ: "i",
//     ኣ: "a",
//     ኤ: "ie",
//     እ: "e",
//     ኦ: "o",
//     ከ: "ke",
//     ኩ: "ku",
//     ኪ: "ki",
//     ካ: "ka",
//     ኬ: "kie",
//     ክ: "k",
//     ኮ: "ko",
//     ኰ: "kue",
//     ኲ: "kui",
//     ኳ: "kua",
//     ኴ: "kuie",
//     ኸ: "Ke",
//     ኹ: "Ku",
//     ኺ: "Ki",
//     ኻ: "Ka",
//     ኼ: "Kie",
//     ኽ: "K",
//     ኾ: "Ko",
//     ዀ: "Kue",
//     ዂ: "Kui",
//     ዃ: "Kua",
//     ዄ: "Kuie",
//     ወ: "we",
//     ዉ: "wu",
//     ዊ: "wi",
//     ዋ: "wa",
//     ዌ: "wie",
//     ው: "w",
//     ዎ: "wo",
//     ዐ: "A",
//     ዑ: "U",
//     ዒ: "I",
//     ዓ: "A",
//     ዔ: "E",
//     ዕ: "E",
//     ዖ: "O",
//     ዘ: "ze",
//     ዙ: "zu",
//     ዚ: "zi",
//     ዛ: "za",
//     ዜ: "zie",
//     ዝ: "z",
//     ዞ: "zo",
//     ዠ: "Ze",
//     ዡ: "Zu",
//     ዢ: "Zi",
//     ዣ: "Za",
//     ዤ: "Zie",
//     ዥ: "Z",
//     ዦ: "Zo",
//     የ: "ye",
//     ዩ: "yu",
//     ዪ: "yi",
//     ያ: "ya",
//     ዬ: "yie",
//     ይ: "y",
//     ዮ: "yo",
//     ደ: "de",
//     ዱ: "du",
//     ዲ: "di",
//     ዳ: "da",
//     ዴ: "die",
//     ድ: "d",
//     ዶ: "do",
//     ጀ: "je",
//     ጁ: "ju",
//     ጂ: "ji",
//     ጃ: "ja",
//     ጄ: "jie",
//     ጅ: "j",
//     ጆ: "jo",
//     ገ: "ge",
//     ጉ: "gu",
//     ጊ: "gi",
//     ጋ: "ga",
//     ጌ: "gie",
//     ግ: "g",
//     ጎ: "go",
//     ጐ: "gue",
//     ጒ: "gui",
//     ጓ: "gua",
//     ጔ: "guie",
//     ጠ: "Te",
//     ጡ: "Tu",
//     ጢ: "Ti",
//     ጣ: "Ta",
//     ጤ: "Tie",
//     ጥ: "T",
//     ጦ: "To",
//     ጨ: "ce",
//     ጩ: "cu",
//     ጪ: "ci",
//     ጫ: "ca",
//     ጬ: "cie",
//     ጭ: "c",
//     ጮ: "co",
//     ጰ: "Pe",
//     ጱ: "Pu",
//     ጲ: "Pi",
//     ጳ: "Pa",
//     ጴ: "Pie",
//     ጵ: "P",
//     ጶ: "Po",
//     ጸ: "Tse",
//     ጹ: "Tsu",
//     ጺ: "Tsi",
//     ጻ: "Tsa",
//     ጼ: "Tsie",
//     ጽ: "Ts",
//     ጾ: "Tso",
//     ፀ: "Tse",
//     ፁ: "Tsu",
//     ፂ: "Tsi",
//     ፃ: "Tsa",
//     ፄ: "Tsie",
//     ፅ: "Ts",
//     ፆ: "Tso",
//     ፈ: "fe",
//     ፉ: "fu",
//     ፊ: "fi",
//     ፋ: "fa",
//     ፌ: "fie",
//     ፍ: "f",
//     ፎ: "fo",
//     ፐ: "pe",
//     ፑ: "pu",
//     ፒ: "pi",
//     ፓ: "pa",
//     ፔ: "pie",
//     ፕ: "p",
//     ፖ: "po",
//     " ": " ",
//     "።": ".",
//     "፡": " ",
//     "፣": ",",
//     "፤": ";",
//     "፥": ":",
//     "፦": ":",
//     "፧": "?",
//     "፨": "\n",
//     "፠": "§",
//     "፩": "1",
//     "፪": "2",
//     "፫": "3",
//     "፬": "4",
//     "፭": "5",
//     "፮": "6",
//     "፯": "7",
//     "፰": "8",
//     "፱": "9",
//     "፲": "10",
//     "፳": "20",
//     "፴": "30",
//     "፵": "40",
//     "፶": "50",
//     "፷": "60",
//     "፸": "70",
//     "፹": "80",
//     "፺": "90",
//     "፻": "100",
//     "፼": "10000",
//     // Add more mappings as needed
//   };

//   const handleKeyPress = (event) => {
//     const { key } = event;

//     if (key.length > 1 || completed) return;

//     const expected = mapping[lines[row][col]][car];

//     if (expected === key) {
//       setWrongInput(false);
//       setCorrectCount((prevCount) => prevCount + 1);
//       if (car === mapping[lines[row][col]].length - 1) {
//         if (col === lines[row].length - 1) {
//           if (row === lines.length - 1) {
//             setCompleted(true);
//             return;
//           }
//           setRow((prevRow) => prevRow + 1);
//           setCol(0);
//           setCar(0);
//         } else {
//           setCol((prevCol) => prevCol + 1);
//           setCar(0);
//         }
//       } else {
//         setCar((prevCar) => prevCar + 1);
//       }
//     } else {
//       setWrongInput(true);
//       setWrongCount((prevCount) => prevCount + 1);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <div
//         onFocus={() => setPlaying(true)}
//         onBlur={() => setPlaying(false)}
//         tabIndex={0}
//         onKeyDownCapture={handleKeyPress}
//         className="flex items-center justify-center mt-10 outline-none"
//       >
//         {!playing ? (
//           <p className="text-2xl">Click Here</p>
//         ) : (
//           <>
//             <p>
//               {lines.map((line, i) => (
//                 <p key={i}>{i === row ? "👉" : " "}&nbsp;&nbsp;</p>
//               ))}
//             </p>
//             <p>
//               {lines.map((line, i) =>
//                 i !== row ? (
//                   <p key={i} className="opacity-40">
//                     {line}
//                   </p>
//                 ) : (
//                   <p key={i}>
//                     {line.split("").map((char, j) =>
//                       j === col ? (
//                         <span
//                           key={j}
//                           className={`opacity-50 underline ${wrongInput ? "text-red-700" : ""
//                             }`}
//                         >
//                           {char}
//                         </span>
//                       ) : (
//                         <span
//                           key={j}
//                           className={col >= j ? "opacity-100" : "opacity-40"}
//                         >
//                           {char}
//                         </span>
//                       )
//                     )}
//                   </p>
//                 )
//               )}
//             </p>
//           </>
//         )}
//       </div>
//       {completed && (
//         <div className="mt-4 p-2 bg-gray-200 text-center">
//           <p>Results:</p>
//           <p>Correct Inputs: {correctCount}</p>
//           <p>Wrong Inputs: {wrongCount}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PoenCard;
