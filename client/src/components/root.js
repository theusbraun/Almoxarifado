import Register from '../pages/register';
import Home from '../pages/home';
import Produto from '../pages/produtos';
import Grupo from '../pages/grupo';

import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Root = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/produtos" component={Produto} />
      <Route path="/grupos" component={Grupo} />
    </Switch>
  );
};

export default Root;
