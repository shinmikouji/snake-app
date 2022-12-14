import { useState, useEffect } from "react";
import Button from "./components/Button";
import Field from "./components/Field";
import ManipulationPanel from "./components/ManipulationPanel";
import Navigation from "./components/Navigation";
import Title from "./components/Title";
import { initField } from "./utils";

const initialPosition = { x: 17, y: 17 };
const initialValues = initField(35, initialPosition);
const defaultInterval = 100;
const GameStatus = Object.freeze({
  init: "init",
  playing: "playing",
  suspended: "suspended",
  gameover: "gameover",
});

let timer = undefined;

const unsubscribe = () => {
  if (!timer) {
    return;
  }
  clearInterval(timer);
};

const isCollision = (fieldSize, position) => {
  if (position.y < 0 || position.x < 0) {
    return true;
  }

  if (position.y > fieldSize - 1 || position.x > fieldSize - 1) {
    return true;
  }

  return false;
};

function App() {
  const [fields, setFields] = useState(initialValues);
  const [position, setPosition] = useState();
  const [status, setStatus] = useState(GameStatus.init);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setPosition(initialPosition);
    // ゲームの中の時間を管理する
    timer = setInterval(() => {
      setTick((tick) => tick + 1);
    }, defaultInterval);
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!position || status !== GameStatus.playing) {
      return;
    }
    const canContinue = goUp();
    if (!canContinue) {
      setStatus(GameStatus.gameover);
    }
  }, [tick]);

  const onStart = () => setStatus(GameStatus.playing);

  const onRestart = () => {
    timer = setInterval(() => {
      setTick(tick => tick + 1)
    }, defaultInterval)
    setStatus(GameStatus.init)
    setPosition(initialPosition)
    setFields(initField(35, initialPosition))
  }

  const goUp = () => {
    const { x, y } = position;
    const nextY = Math.max(y - 1, 0);
    const newPosition = { x, y: y -1 }
    if (isCollision(fields.length, newPosition)) {
      unsubscribe()
      return false
    }
    fields[y][x] = "";
    fields[newPosition.y][x] = 'snake'
    setPosition(newPosition)
    setFields(fields);
    return true
  };
  return (
    <div className="App">
      <header className="header">
        <Title />
        <Navigation />
      </header>
      <main className="main">
        <Field fields={fields} />
      </main>
      <footer className="footer">
      <Button status={status} onStart={onStart} onRestart={onRestart}/>
        <ManipulationPanel />
      </footer>
    </div>
  );
}

export default App;
