import './App.css';
import AppProvider from './context/AppContext';
import Layout from './components/layout/Layout';


function App() {
  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  );
}

export default App;
