import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import StartScreen from "./StartScreen";
import Loader from "./Loader";
import Error from "./Error";
import Questions from "./Questions";
import Footer from "./Footer";
import NextButton from "./NextButton";
import FinishScreen from "./FinishScreen";
import Progress from "./Progress";

function App() {
  const initialState = {
    question: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
  };
  function reduce(state, action) {
    switch (action.type) {
      //loading, error, ready, active, finished
      case "getData":
        return { ...state, question: action.payload, status: "ready" };
      case "error":
        return { ...state, status: "error" };
      case "active":
        return {
          ...state,
          status: "active",
          // question: state.question.at(state.index),
        };
      case "newAnswer":
        const currQuestion = state?.question?.at(state.index);
        return {
          ...state,
          answer: action.payload,
          points:
            currQuestion.correctOption === action.payload
              ? state.points + currQuestion.points
              : state.points,
        };
      case "next":
        return {
          ...state,
          index: state.index + 1,
          answer: null,
        };
      case "finish":
        return { ...state, status: "finish" };
      case "restart":
        return {
          ...state,
          status: "ready",
          index: 0,
          answer: null,
          points: 0,
        };
      default:
        throw new Error("Unknown Action");
    }
  }
  const [state, dispatch] = useReducer(reduce, initialState);
  const { question, status, index, answer, points } = state;
  // Here we are creating max possible points using reduce function that allows to get all the points in each array
  const maxPossiblePoints = question.reduce((acc, cur) => acc + cur.points, 0);
  const numQuestions = question.length;
  useEffect(() => {
    const getApi = async () => {
      try {
        const res = await fetch("http://localhost:9000/questions");
        const data = await res.json();
        dispatch({ type: "getData", payload: data });
        // console.log(data);
      } catch (err) {
        dispatch({ type: "error", payload: err });
      }
    };
    getApi();
  }, []);
  return (
    <div>
      <Header></Header>
      <Main>
        {status === "loading" && <Loader></Loader>}
        {status === "error" && <Error></Error>}
        {status === "ready" && <StartScreen dispatch={dispatch}></StartScreen>}
        {status === "active" && (
          <>
            <Progress
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              index={index}
              numQuestions={numQuestions}
            ></Progress>
            <Questions
              dispatch={dispatch}
              answer={answer}
              question={question[index]}
            ></Questions>
            <Footer>
              <NextButton
                index={index}
                numQuestions={numQuestions}
                answer={answer}
                dispatch={dispatch}
              ></NextButton>
            </Footer>
          </>
        )}
        {status === "finish" && (
          <FinishScreen
            maxPossiblePoints={maxPossiblePoints}
            points={points}
            dispatch={dispatch}
          ></FinishScreen>
        )}
      </Main>
    </div>
  );
}

export default App;
