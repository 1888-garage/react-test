import { useState, useEffect } from "react";

const PoenCard = (props) => {
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [wrongInput, setWrongInput] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [car, setCar] = useState(0);

  const enlines = [
    "Wake! For the Sun, who scatter'd into flight",
    "The Stars before him from the Field of Night,",
    "Drives Night along with them from Heav'n, and strikes",
    "The Sultan's Turret with a Shaft of Light.",
  ];

  const amlines = [
    "Abebe በሶ በላ?",
    "እግዚአብሄር መልካም ነው፣ በመከራ ቀንም መሸሸግያ ነው።",
    "መሙሚማሜምሞ",
    "በ ቡ ቢ ባ ቤ ብ ቦ"
  ];

  const lines = props.lang ? amlines : enlines;
  // Mapping of Amharic characters to their corresponding English words
  const mapping = {
    a: "a", A: "A", b: "b", B: "B", c: "c", C: "C", d: "d", D: "D", e: "e", E: "E", f: "f", F: "F", g: "g", G: "G", h: "h", H: "H", i: "i", I: "I", j: "j", J: "J", k: "k", K: "K", l: "l", L: "L", m: "m", M: "M", n: "n", N: "N", o: "o", O: "O", p: "p", P: "P", q: "q", Q: "Q", r: "r", R: "R", s: "s", S: "S", t: "t", T: "T", u: "u", U: "U", v: "v", V: "V", w: "w", W: "W", x: "x", X: "X", y: "y", Y: "Y", z: "z", Z: "Z",
    ".": ".", ",": ",", ";": ";", ":": ":", "?": "?", "!": "!", "'": "'", '"': '"', "(": "(", ")": ")", "[": "[", "]": "]", "{": "{", "}": "}", "<": "<", ">": ">", "/": "/", "\\": "\\", "|": "|", "-": "-", _: "_", "+": "+", "=": "=", "*": "*", "&": "&", "^": "^", "%": "%", $: "$", "#": "#", "@": "@", "~": "~", "`": "`",
    "ሀ": "hä",
    "ሁ": "hu",
    "ሂ": "hi",
    "ሃ": "ha",
    "ሄ": "hé",
    "ህ": "h",
    "ሆ": "ho",
    "ለ": "lä",
    "ሉ": "lu",
    "ሊ": "li",
    "ላ": "la",
    "ሌ": "lé",
    "ል": "l",
    "ሎ": "lo",
    "ሐ": "ḥä",
    "ሑ": "ḥu",
    "ሒ": "ḥi",
    "ሓ": "ḥa",
    "ሔ": "ḥé",
    "ሕ": "ḥ",
    "ሖ": "ḥo",
    "መ": "mä",
    "ሙ": "mu",
    "ሚ": "mi",
    "ማ": "ma",
    "ሜ": "mé",
    "ም": "m",
    "ሞ": "mo",
    "ሠ": "śä",
    "ሡ": "śu",
    "ሢ": "śi",
    "ሣ": "śa",
    "ሤ": "śé",
    "ሥ": "ś",
    "ሦ": "śo",
    "ረ": "rä",
    "ሩ": "ru",
    "ሪ": "ri",
    "ራ": "ra",
    "ሬ": "ré",
    "ር": "r",
    "ሮ": "ro",
    "ሰ": "sä",
    "ሱ": "su",
    "ሲ": "si",
    "ሳ": "sa",
    "ሴ": "sé",
    "ስ": "s",
    "ሶ": "so",
    "ሸ": "šä",
    "ሹ": "šu",
    "ሺ": "ši",
    "ሻ": "ša",
    "ሼ": "šé",
    "ሽ": "š",
    "ሾ": "šo",
    "ቀ": "qä",
    "ቁ": "qu",
    "ቂ": "qi",
    "ቃ": "qa",
    "ቄ": "qé",
    "ቅ": "q",
    "ቆ": "qo",
    "በ": "bä",
    "ቡ": "bu",
    "ቢ": "bi",
    "ባ": "ba",
    "ቤ": "bé",
    "ብ": "b",
    "ቦ": "bo",
    "ቨ": "vä",
    "ቩ": "vu",
    "ቪ": "vi",
    "ቫ": "va",
    "ቬ": "vé",
    "ቭ": "v",
    "ቮ": "vo",
    "ተ": "tä",
    "ቱ": "tu",
    "ቲ": "ti",
    "ታ": "ta",
    "ቴ": "té",
    "ት": "t",
    "ቶ": "to",
    "ቸ": "č̣ä",
    "ቹ": "č̣u",
    "ቺ": "č̣i",
    "ቻ": "č̣a",
    "ቼ": "č̣é",
    "ች": "č̣",
    "ቾ": "č̣o",
    "ኀ": "ḫä",
    "ኁ": "ḫu",
    "ኂ": "ḫi",
    "ኃ": "ḫa",
    "ኄ": "ḫé",
    "ኅ": "ḫ",
    "ኆ": "ḫo",
    "ነ": "nä",
    "ኑ": "nu",
    "ኒ": "ni",
    "ና": "na",
    "ኔ": "né",
    "ን": "n",
    "ኖ": "no",
    "ኘ": "ñä",
    "ኙ": "ñu",
    "ኚ": "ñi",
    "ኛ": "ña",
    "ኜ": "ñé",
    "ኝ": "ñ",
    "ኞ": "ño",
    "አ": "ʾä",
    "ኡ": "ʾu",
    "ኢ": "ʾi",
    "ኣ": "ʾa",
    "ኤ": "ʾé",
    "እ": "ʾ",
    "ኦ": "ʾo",
    "ከ": "kä",
    "ኩ": "ku",
    "ኪ": "ki",
    "ካ": "ka",
    "ኬ": "ké",
    "ክ": "k",
    "ኮ": "ko",
    "ኰ": "kʷä",
    "ኲ": "kʷi",
    "ኳ": "kʷa",
    "ኴ": "kʷé",
    "ኵ": "kʷ",
    "ኸ": "ḵä",
    "ኹ": "ḵu",
    "ኺ": "ḵi",
    "ኻ": "ḵa",
    "ኼ": "ḵé",
    "ኽ": "ḵ",
    "ኾ": "ḵo",
    "ዀ": "ḵʷä",
    "ዂ": "ḵʷi",
    "ዃ": "ḵʷa",
    "ዄ": "ḵʷé",
    "ዅ": "ḵʷ",
    "ወ": "wä",
    "ዉ": "wu",
    "ዊ": "wi",
    "ዋ": "wa",
    "ዌ": "wé",
    "ው": "w",
    "ዎ": "wo",
    "ዐ": "ʿä",
    "ዑ": "ʿu",
    "ዒ": "ʿi",
    "ዓ": "ʿa",
    "ዔ": "ʿé",
    "ዕ": "ʿ",
    "ዖ": "ʿo",
    "ዘ": "zä",
    "ዙ": "zu",
    "ዚ": "zi",
    "ዛ": "za",
    "ዜ": "zé",
    "ዝ": "z",
    "ዞ": "zo",
    "ዠ": "žä",
    "ዡ": "žu",
    "ዢ": "ži",
    "ዣ": "ža",
    "ዤ": "žé",
    "ዥ": "ž",
    "ዦ": "žo",
    "የ": "yä",
    "ዩ": "yu",
    "ዪ": "yi",
    "ያ": "ya",
    "ዬ": "yé",
    "ይ": "y",
    "ዮ": "yo",
    "ደ": "dä",
    "ዱ": "du",
    "ዲ": "di",
    "ዳ": "da",
    "ዴ": "dé",
    "ድ": "d",
    "ዶ": "do",
    "ጀ": "ǧä",
    "ጁ": "ǧu",
    "ጂ": "ǧi",
    "ጃ": "ǧa",
    "ጄ": "ǧé",
    "ጅ": "ǧ",
    "ጆ": "ǧo",
    "ገ": "gä",
    "ጉ": "gu",
    "ጊ": "gi",
    "ጋ": "ga",
    "ጌ": "gé",
    "ግ": "g",
    "ጎ": "go",
    "ጐ": "gʷä",
    "ጒ": "gʷi",
    "ጓ": "gʷa",
    "ጔ": "gʷé",
    "ጕ": "gʷ",
    "ጠ": "ṭä",
    "ጡ": "ṭu",
    "ጢ": "ṭi",
    "ጣ": "ṭa",
    "ጤ": "ṭé",
    "ጥ": "ṭ",
    "ጦ": "ṭo",
    "ጨ": "č̣ä",
    "ጩ": "č̣u",
    "ጪ": "č̣i",
    "ጫ": "č̣a",
    "ጬ": "č̣é",
    "ጭ": "č̣",
    "ጮ": "č̣o",
    "ጰ": "p̣ä",
    "ጱ": "p̣u",
    "ጲ": "p̣i",
    "ጳ": "p̣a",
    "ጴ": "p̣é",
    "ጵ": "p̣",
    "ጶ": "p̣o",
    "ጸ": "ṣä",
    "ጹ": "ṣu",
    "ጺ": "ṣi",
    "ጻ": "ṣa",
    "ጼ": "ṣé",
    "ጽ": "ṣ",
    "ጾ": "ṣo",
    "ፀ": "ṣ́ä",
    "ፁ": "ṣ́u",
    "ፂ": "ṣ́i",
    "ፃ": "ṣ́a",
    "ፄ": "ṣ́é",
    "ፅ": "ṣ́",
    "ፆ": "ṣ́o",
    "ፈ": "fä",
    "ፉ": "fu",
    "ፊ": "fi",
    "ፋ": "fa",
    "ፌ": "fé",
    "ፍ": "f",
    "ፎ": "fo",
    "ፐ": "pä",
    "ፑ": "pu",
    "ፒ": "pi",
    "ፓ": "pa",
    "ፔ": "pé",
    "ፕ": "p",
    "ፖ": "po",
    " ": " ", "።": ".", "፡": " ", "፣": ",", "፤": ";", "፥": ":", "፦": ":", "፧": "?", "፨": "\n", "፠": "§", "፩": "1", "፪": "2", "፫": "3", "፬": "4", "፭": "5", "፮": "6", "፯": "7", "፰": "8", "፱": "9", "፲": "10", "፳": "20", "፴": "30", "፵": "40", "፶": "50", "፷": "60", "፸": "70", "፹": "80", "፺": "90", "፻": "100", "፼": "10000",    // Add more mappings as needed
  };

  const handleKeyPress = (event) => {
    const { key } = event;

    if (key.length > 1 || completed) return;

    const expected = mapping[lines[row][col]][car];

    if (expected === key) {
      setWrongInput(false);
      setCorrectCount((prevCount) => prevCount + 1);
      if (car === mapping[lines[row][col]].length - 1) {
        if (col === lines[row].length - 1) {
          if (row === lines.length - 1) {
            setCompleted(true);
            return;
          }
          setRow((prevRow) => prevRow + 1);
          setCol(0);
          setCar(0);
        } else {
          setCol((prevCol) => prevCol + 1);
          setCar(0);
        }
      } else {
        setCar((prevCar) => prevCar + 1);
      }
    } else {
      setWrongInput(true);
      setWrongCount((prevCount) => prevCount + 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        onFocus={() => setPlaying(true)}
        onBlur={() => setPlaying(false)}
        tabIndex={0}
        onKeyDownCapture={handleKeyPress}
        className="flex items-center justify-center mt-10 outline-none"
      >
        {!playing ? (
          <p className="text-2xl">Click Here</p>
        ) : (
          <>
            <p>
              {lines.map((line, i) => (
                <p key={i}>{i === row ? "👉" : " "}&nbsp;&nbsp;</p>
              ))}
            </p>
            <p>
              {lines.map((line, i) =>
                i !== row ? (
                  <p key={i} className="opacity-40">
                    {line}
                  </p>
                ) : (
                  <p key={i}>
                    {line.split("").map((char, j) =>
                      j === col ? (
                        <span
                          key={j}
                          className={`opacity-50 underline ${wrongInput ? "text-red-700" : ""
                            }`}
                        >
                          {char}
                        </span>
                      ) : (
                        <span
                          key={j}
                          className={col >= j ? "opacity-100" : "opacity-40"}
                        >
                          {char}
                        </span>
                      )
                    )}
                  </p>
                )
              )}
            </p>
          </>
        )}
      </div>
      {completed && (
        <div className="mt-4 p-2 bg-gray-200 text-center">
          <p>Results:</p>
          <p>Correct Inputs: {correctCount}</p>
          <p>Wrong Inputs: {wrongCount}</p>
        </div>
      )}
    </div>
  );
};

export default PoenCard;
