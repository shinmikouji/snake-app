import Button from './components/Button';
import Field from './components/Field';
import ManipulationPanel from './components/ManipulationPanel';
import Navigation from './components/Navigation';
import Title from './components/Title';
import { initField } from './utils';

const fields = initField(35)

function App() {
  return (
    <div className="App">
      <header className='header'>
        <Title/>
        <Navigation/>
      </header>
      <main className='main'>
        <Field fields={fields} />
      </main>
      <footer className='footer'>
        <Button/>
        <ManipulationPanel/>
      </footer>
    </div>
  );
}

export default App;
