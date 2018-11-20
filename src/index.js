import React from 'react';
import ReactDOM from 'react-dom';
import Kennel from "./components/Kennel"
import { BrowserRouter as Router } from "react-router-dom"
import './index.css';



ReactDOM.render(
  <Router>
    <Kennel />
  </Router>, document.getElementById('root')
);
