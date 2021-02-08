import './App.css';
import Header from './components/Header';
import NavBar from './components/NavBar';
import ArticleList from './components/ArticleList';

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <ArticleList />
    </div>
  );
}

export default App;
