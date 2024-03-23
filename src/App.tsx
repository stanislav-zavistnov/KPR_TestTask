import styles from './App.module.css';
import { Description } from './components/Description/Description';
import { Main } from './components/Main/Main';

function App() {
  return (
    <div className={styles.container}>
      <Main />
      <Description />
    </div>
  )
}

export default App
