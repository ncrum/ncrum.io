import React from 'react';
import {Route, IndexRedirect} from 'react-router';
import App from './components/App';
import About from './components/About';
import BlogList from './components/BlogList';
import Post from './components/Post';

export default function getRoutes() {
  return (
    <Route path="/"  component={App}>
      <IndexRedirect to="about"/>
      <Route path="about" component={About}/>
      <Route path="blog" component={BlogList}>
        <Route path=":title" component={Post}/>
      </Route>
    </Route>
  );
}
