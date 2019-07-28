import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Feed from './Feed'

import '../../assets/css/style.css'

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Helmet>
          <title>GraphiQLassniki - Feed</title>
          <meta name="description" content="News feed of all your friends on GraphiQLassniki" />
        </Helmet>
        <Feed />
      </div>
    )
  }
}
