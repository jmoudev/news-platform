import axios from 'axios';

const request = axios.create({
  baseURL: 'https://news-platform.herokuapp.com/api'
});

export const fetchArticle = article_id => {
  return request
    .get(`/articles/${article_id}`)
    .then(({ data: { article } }) => article);
};

export const fetchArticleComments = article_id => {
  return request
    .get(`/articles/${article_id}/comments`)
    .then(({ data: { comments } }) => comments);
};
