import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import BookStore from './Form';

var data = [{
    "when": "2 minutes ago",
    "who": "Jill Dupre",
    "description": "Created new account"
},
            {
                "when": "1 hour ago",
                "who": "Lose White",
                "description": "Added fist chapter"
            },
            {
                "when": "2 hours ago",
                "who": "Jordan Whash",
                "description": "Created new account"
            }];

var headings = ["When", "Who", "Description"];

var props = {"data": data, "headings": headings, "title": "Recent Changes"};

// ReactDOM.render(<App {...props}/>, document.getElementById("container"));
ReactDOM.render(<BookStore/>, document.getElementById("container"));
registerServiceWorker();
