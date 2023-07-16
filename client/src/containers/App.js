import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Root from '../components/root';
import Menu from '../components/menu';

const App = () => (
  <Router>
    <div>
      <Menu />
      <Root />
    </div>
  </Router>
);

export default App;
