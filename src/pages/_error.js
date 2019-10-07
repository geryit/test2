import React from 'react';

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontSize: '1.4rem',
      }}
      >
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </div>
    );
  }
}

export default Error;
