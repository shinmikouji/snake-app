import Button from './components/Button';
import Field from './components/Field';
import ManipulationPanel from './components/ManipulationPanel';
import Navigation from './components/Navigation';
import Title from './components/Title';

function App() {
  return (
    <div className="App">
      <header className='header'>
        <Title/>
        <Navigation/>
      </header>
      <main className='main'>
        <Field/>
      </main>
      <footer className='footer'>
        <Button/>
        <ManipulationPanel/>
      </footer>
    </div>
  );
}

export default App;
