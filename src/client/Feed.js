import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation, Query } from 'react-apollo'

const GET_POSTS = gql`
  {
    posts {
      id
      text
      user {
        avatar
        username
      }
    }
  }
`

const ADD_POST = gql`
  mutation addPost($post: PostInput!) {
    addPost(post: $post) {
      id
      text
      user {
        username
        avatar
      }
    }
  }
`

class Feed extends Component {
  state = {
    postContent: '',
  }
  handlePostContentChange = event => {
    this.setState({ postContent: event.target.value })
  }
  handleSubmit = addPost => event => {
    event.preventDefault()

    addPost({ variables: { post: { text: this.state.postContent } } }).then(() => {
      this.setState(prevState => ({
        postContent: '',
      }))
    })
  }

  render() {
    const { postContent } = this.state

    return (
      <div className="container">
        <div className="postForm">
          <Mutation
            mutation={ADD_POST}
            update={(store, { data: { addPost } }) => {
              const data = store.readQuery({ query: GET_POSTS })
              data.posts.unshift(addPost)
              store.writeQuery({ query: GET_POSTS, data })
            }}
          >
            {addPost => (
              <form onSubmit={this.handleSubmit(addPost)}>
                <textarea
                  value={postContent}
                  onChange={this.handlePostContentChange}
                  placeholder="Write your custom post!"
                />
                <input type="submit" value="Submit" />
              </form>
            )}
          </Mutation>
        </div>
        <div className="feed">
          <Query query={GET_POSTS}>
            {({ data, error, loading }) => {
              if (loading) {
                return 'loading...'
              }

              if (error) {
                return error.message
              }

              const { posts } = data

              return posts.map((post, i) => (
                <div key={post.id} className="post">
                  <div className="header">
                    <img src={post.user.avatar} alt="" />
                    <h2>{post.user.username}</h2>
                  </div>
                  <p className="content">{post.text}</p>
                </div>
              ))
            }}
          </Query>
        </div>
      </div>
    )
  }
}

export default Feed
