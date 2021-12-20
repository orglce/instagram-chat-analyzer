var allMessages = [];

function getMessages() {
  formatMessagesFromInstagramJsonFile(igMessages1);
  formatMessagesFromInstagramJsonFile(igMessages2);
  formatMessagesFromSignalJsonFile(signalMessages);

  allMessages.sort(function(a, b) {
    return new Date(a.time_sent) - new Date(b.time_sent);
  });

  return allMessages;
}

function getMessagesPerDay() {

  var messagesPerDays = {};

  for (var msg of allMessages) {
    if (msg.message !== undefined &&
      msg.time_sent !== undefined &&
      !String(msg.message).includes("Reacted")) {

      if (messagesPerDays[dateToString(msg.time_sent)] === undefined)
        messagesPerDays[dateToString(msg.time_sent)] = [];
      messagesPerDays[dateToString(msg.time_sent)].push(msg);
    }
  }

  return messagesPerDays;
}

function formatMessagesFromSignalJsonFile(jsonMessages) {
  for (var message of signalMessages) {
    allMessages.push({
      time_sent: getSignalTimestamp(message.DATE_SENT),
      time_received: getSignalTimestamp(message.DATE_RECEIVED),
      sender: message.READ === "" ? personOne : personTwo,
      message: message.MISMATCHED_IDENTITIES,
      platform: "signal"
    })
  }
}

function formatMessagesFromInstagramJsonFile(jsonMessages) {
  for (var message of jsonMessages.messages) {
    allMessages.push({
      time_sent: new Date(message.timestamp_ms),
      time_received: null,
      sender: message.sender_name === personOneUsername ? personOne : personTwo,
      message: message.content,
      platform: "instagram"
    })
  }
}

function getSignalTimestamp(laterMilliseconds) {
  var startingMilliseconds = -505738041;
  return new Date(2021, 10, 2, 19, 13, 21, laterMilliseconds - startingMilliseconds);
}
