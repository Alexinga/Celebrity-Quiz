function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return null;
  if (index < numQuestions - 1)
    return (
      <button onClick={() => dispatch({ type: "next" })} className="btn next">
        Next
      </button>
    );
  if (index === numQuestions - 1)
    return (
      <button onClick={() => dispatch({ type: "finish" })} className="btn next">
        Finish
      </button>
    );
}

export default NextButton;
