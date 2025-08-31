
import { AppProvider } from './context';
import MainRouter from './MainRouter';
import './App.css';
import SignInPanel from './SignInPanel';

const App = () => {
  return (
    <div className="app">
      <AppProvider>
        <MainRouter />
        <SignInPanel />
      </AppProvider>
    </div>
  );
};

export default App;