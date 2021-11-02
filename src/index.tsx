import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import rootUrl from './config/rootUrl';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: rootUrl,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
	  <React.StrictMode>
	    <App />
	  </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('booking-widget')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
