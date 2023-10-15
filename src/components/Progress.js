function Progress({ index, numQuestions, points, maxPossiblePoints }) {
  return (
    <div>
      <progress value={points} max={maxPossiblePoints}></progress>
      <h4>
        {index} / {numQuestions}
      </h4>
    </div>
  );
}

export default Progress;
