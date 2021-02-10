import './App.css';
import Header from './components/Header';
import NavBar from './components/NavBar';
import ArticleList from './components/ArticleList';
import Article from './components/Article';
import { Router } from '@reach/router';

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Router>
        <ArticleList path="/" />
        <ArticleList path="topics/:topic" />
        <Article path="/articles/:article_id" />
      </Router>
    </div>
  );
}

export default App;
