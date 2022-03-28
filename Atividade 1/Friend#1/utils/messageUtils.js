
class Message {
    constructor(
      user = {id: 1, username: "Pitchulinhas"},
      content = "Hello, World!",
      time = new Date().toLocaleTimeString()
    ) {
      this.user = user;
      this.content = content;
      this.time = time;
    }
  
    asString() {
      return `[${this.time}] [<${this.user.username}>]: <${
        this.content
      }>`;
    }
  }

  module.exports.createMessage = (message) => {
      return new Message(message.user, message.content);
  }

  module.exports.stringify = (message) => {
      return new Message(message.user, message.content, message.time)
        .asString();
  }

  module.exports.replaceUser = (message, authUser) => {
      const id = authUser.id;
    if (message.user.id === id) {
        const newUser = {
            id,
            username: "You",
        };
        return newUser;
    }

      return message.user;
  }
