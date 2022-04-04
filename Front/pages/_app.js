import React from 'react';
import PropTypes from "prop-types";
import Head from "next/head";
import 'antd/dist/antd.css'

import wrapper  from "../store/configureStore";

//전부 공통

const NodeBird = ({Component}) => {
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

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(NodeBird);
// export default NodeBird;
