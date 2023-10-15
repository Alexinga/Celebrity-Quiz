function Questions({ question, answer, dispatch }) {
  const hasAnswer = answer !== null;
  // console.log(hasAnswer);
  return (
    <div className="options">
      <h2>{question?.question}</h2>
      {question?.options?.map((option, i) => (
        <button
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
          className={`btn ${
            hasAnswer
              ? i === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Questions;
