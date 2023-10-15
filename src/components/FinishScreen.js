function FinishScreen({ points, maxPossiblePoints, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <div>
      <h2>
        You Scored {points} / {maxPossiblePoints} ({percentage}%)
      </h2>
      <button className="btn" onClick={() => dispatch({ type: "restart" })}>
        Restart
      </button>
    </div>
  );
}

export default FinishScreen;
