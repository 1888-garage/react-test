import React from "react";

function TestResultCard(props) {
  const { totalStroke, wrongStroke, wordPerMinute } = props;

  return (
    <div>
      <div className="bg-slate-200 w-64 h-40 rounded-lg my-6 shadow-md">
        <div className="card__content px-6 py-3">
          <div className="flex justify-center">
            <h1 className="text-xl font-black text-[#20b327]">
              {wordPerMinute} WPM
            </h1>
          </div>
          <div className="flex justify-between">
            <h1>KeyStroke: </h1>{" "}
            <div className="flex tracking-widest">
              (<p className="text-[#20b327]">{totalStroke - wrongStroke}</p>|
              <p className="text-[#f83333]">{wrongStroke}</p>){" "}
              <p>---{totalStroke}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <h1>Accuracy: </h1>{" "}
            <p>
              {(((totalStroke - wrongStroke) / totalStroke) * 100).toFixed(2)}%
            </p>
          </div>
          <div className="flex justify-between">
            <h1>Correct words: </h1>
            <p className="text-[#20b327]">7</p>
          </div>
          <div className="flex justify-between">
            <h1>Wrong words: </h1>
            <p className="text-[#f83333]">3</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestResultCard;
