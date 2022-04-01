const messageUtils = require('./messageUtils');

module.exports.sendMessage = async(publisher, channel, message) => {

    const { channelName } = channel;
    
    let newMessage = messageUtils.createMessage(message);
  
    await publisher.publish(channelName, JSON.stringify(newMessage));
  
  }
  