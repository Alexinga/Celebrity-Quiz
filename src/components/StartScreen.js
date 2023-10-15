function StartScreen({ dispatch }) {
  return (
    <div>
      <p>10 questions to test your celebrity knowledge</p>
      <button className="btn" onClick={() => dispatch({ type: "active" })}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
