import React, { Component } from 'react';
import ChatService from '../../../utils/ChatService'
import AuthService from '../../../utils/AuthService'
import './index.css'

class Chat extends Component {
  chat = null
  auth = null

  state = {
    ready:false,
    messages: [],
    newMessage:''
  }

  componentWillMount(){
    console.log(this.props)

    this.chat = new ChatService();
    this.auth = new AuthService();  

    this.chat.getChat(this.props.chatId, this.auth.getToken(),(err, res)=>{
      console.log(err, res)
      if(err) return
      this.setState({
        ready: true,
        messages:res,
      })
    })
  }

  sendMessage = () =>{
    const data = {
      content: this.state.newMessage,
      to: String(this.props.chatId)
    }

    this.chat.sendMessage(this.auth.getToken(), data, (err, res)=>{
      console.log(err, res)
      this.setState({
        messages:[
          ...this.state.messages,
          res
        ]
      })
    });
  }

  handleChange = (event) =>{
    this.setState({
      newMessage: event.target.value
    })
  }




  render() {
    return (
      <div className="chat">
        {this.state.messages.map(msg=>{
          const own = this.props.sender.id === msg.from;
          return (
            <div className={`message ${own ? "send" : "received"}`}>
              <div className="rounded">
                <img 
                  alt={own ? 'your picture' : 'receiver picture'}
                  src={own ? this.props.sender.image : this.props.receiver.image}
                />
            </div>
              <div className={`speech-bubble`}>
                {msg.content}
              </div>
            </div>
           
          )
        })}
        <form onSubmit={this.sendMessage}>
          <textarea 
            onChange={this.handleChange}
            value={this.state.newMessage}
            onKeyPress={(event)=>{
                 if (event.which === 13 && !event.shiftKey){
                   event.preventDefault();
                   this.sendMessage();
                  }
                }}
          />
          <button 
            type="submit"
            >
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default Chat;