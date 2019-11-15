import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import ConfigureFields from './Components/Configure/Configure';

import Header from './Components/Header/Header';
import HomePage from './Components/HomePage/HomePage';

function App() {
  return (
      <BrowserRouter basename="/">
        <div className="App">
          <Header />
          <Route exact path="/configure" component={ConfigureFields} />
          <Route exact path="/" component={HomePage} />
        </div>
      </BrowserRouter>
  );
}

export default App;
