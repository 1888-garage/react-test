import React from "react";

function TestResultCard(props) {
  const {
    totalStroke,
    wrongStroke,
    wordPerMinute,
    mostFrequentMistake,
    mostFrequentMistakeCount,
  } = props;

  return (
    <div>
      <div className="bg-slate-200 w-72 h-30 rounded-lg my-6 shadow-md">
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
            <h1>frequently mistyped: </h1>
            <div className="flex">
              <p className="text-[#f83333]">{mostFrequentMistake}</p>
              <p className="ml-1">{`(${mostFrequentMistakeCount})`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestResultCard;
