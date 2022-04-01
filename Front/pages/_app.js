import React from 'react';
import PropTypes from "prop-types";
import Head from "next/head";
import 'antd/dist/antd.css'

//전부 공

const App = ({Component}) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8"/>
        <title>Node Bird</title>
      </Head>
      <Component/>
    </>
  );
};

App.prototype = {
  Component: PropTypes.elementType.isRequired
}

export default App;
