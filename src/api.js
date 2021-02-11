import axios from 'axios';

const request = axios.create({
  baseURL: 'https://news-platform.herokuapp.com/api'
});

export const getTopics = () => {
  return request.get('/topics').then(({ data: { topics } }) => {
    const topicsArr = topics.map(topic => topic.slug);

    return topicsArr;
  });
};

export const getAllArticles = topic => {
  return request.get('/articles').then(({ data: { articles } }) => {
    if (topic) return articles.filter(article => article.topic === topic);
    else return articles;
  });
};

export const getArticle = article_id => {
  return request
    .get(`/articles/${article_id}`)
    .then(({ data: { article } }) => article);
};

export const getArticleComments = article_id => {
  return request
    .get(`/articles/${article_id}/comments`)
    .then(({ data: { comments } }) => comments);
};

export const patchArticleVotes = (article_id, vote) => {
  return request.patch(`/articles/${article_id}`, {
    inc_votes: vote
  });
};
