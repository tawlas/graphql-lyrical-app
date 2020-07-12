import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
// import { ApolloProvider } from 'react-apollo';
import * as serviceWorker from './serviceWorker';
// import './style/songList.css';

import { BrowserRouter, Router, Route, history } from 'react-router-dom';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetails from './components/SongDetails';
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const client = new ApolloClient({
  dataIdFromClient: (o) => o.id,
  cache,
  link,
});

const Root = () => {
  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Route path="/" exact component={SongList} />
          <Route path="/songs/new" component={SongCreate} />
          <Route path="/songs/:id" component={SongDetails} />
        </BrowserRouter>
      </ApolloProvider>
    </React.StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
