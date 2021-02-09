import './App.css';
import Header from './components/Header';
import NavBar from './components/NavBar';
import ArticleList from './components/ArticleList';
import TopicArticles from './components/TopicArticles';
import { Router } from '@reach/router';

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Router>
        <ArticleList path="/" />
        <TopicArticles path="/:topic" />
      </Router>
    </div>
  );
}

export default App;
