/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Provider } from 'react-redux';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import { createStore } from 'redux';

import reducers from '../reducers';
// import '../ArrayExtensions';

// import bugsnagClient from '../lib/bugsnag';
// import Error from './_error';

// const ErrorBoundary = bugsnagClient.getPlugin('react');


const initStore = (initialState = {}) => createStore(reducers, initialState);


class CarbonApp extends App {
  static async getInitialProps({ Component, ctx }) {
    // we can dispatch from here too
    // ctx.store.dispatch({type: 'FOO', payload: 'foo'});

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return { pageProps };
  }


  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withRedux(initStore)(CarbonApp);
