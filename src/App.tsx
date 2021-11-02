import React from 'react';
import './App.scss';
import WidgetStateHolder from './WidgetStateHolder'

function parseQuery(queryString: string) {
    var query: any = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

function App() {
 // You can set the following variables via URL query params, or by hard-coding them in. 
 // const providerId = PROVIDER_ID_HERE

 const queryVariables = parseQuery(window.location.search)
 const providerId = queryVariables.provider_id

  return (
    <div className="App">
      <WidgetStateHolder providerId={providerId} />
    </div>
  );
}

export default App;
