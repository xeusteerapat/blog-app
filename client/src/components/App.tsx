import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PageContainer } from './styles/styles';
import Landing from './pages/Landing';
import About from './pages/About';
import Posts from './pages/Posts';
import Header from './pages/Header';

const App = () => {
  return (
    <PageContainer className='container'>
      <Header />
      <Switch>
        <Route path='/' exact component={Landing} />
        <Route path='/about' exact component={About} />
        <Route path='/posts' exact component={Posts} />
      </Switch>
    </PageContainer>
  );
};

export default App;
