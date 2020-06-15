import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PageContainer } from './styles/styles';
import Landing from './pages/Landing';
import About from './pages/About';
import Posts from './posts/Posts';
import CreatePost from './posts/CreatePost';
import Header from './pages/Header';
import Register from './pages/Register';
import Login from './pages/Login';

const App = () => {
  return (
    <PageContainer>
      <Header />
      <Switch>
        <Route path='/' exact component={Landing} />
        <Route path='/about' exact component={About} />
        <Route path='/posts' exact component={Posts} />
        <Route path='/create' exact component={CreatePost} />
        <Route path='/register' exact component={Register} />
        <Route path='/login' exact component={Login} />
      </Switch>
    </PageContainer>
  );
};

export default App;
