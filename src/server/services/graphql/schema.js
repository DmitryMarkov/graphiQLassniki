const typeDefinitions = `
  type Post {
    id: Int
    text: String
    user: User
  }
  
  type User {
    id: Int
    avatar: String
    username: String
  }
  
  type Message {
    id: Int
    text: String
    chat: Chat
    user: User
  }
  
  type Chat {
    id: Int
    messages: [Message]
    users: [User]
  }
  
  input ChatInput {
    users: [Int]
  }
  
  input MessageInput {
    text: String!
    chatId: Int!
  }
  
  input PostInput {
    text: String!
  }
  
  input UserInput {
    username: String!
    avatar: String!
  }
  
  type RootQuery {
    posts: [Post]
    chat(chatId: Int): Chat
    chats: [Chat]
  }
  
  type RootMutation {
    addPost (
      post: PostInput!
    ): Post
    addChat (
      chat: ChatInput!
    ): Chat
    addMessage (
      message: MessageInput!
    ): Message
  }
  
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`

export default [typeDefinitions]
