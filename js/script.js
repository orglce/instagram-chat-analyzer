var allMessages = getMessages();
var messagesPerDays = getMessagesPerDay();
var allStats = {}

numberOfMessagesPerDay();
drawMessagesPerDay();

function numberOfMessagesPerDay() {
  allStats[personOne] = {};
  allStats[personTwo] = {};

  allStats[personOne]["numberOfWords"] = 0;
  allStats[personTwo]["numberOfWords"] = 0;

  allStats[personOne]["numberOfCharacters"] = 0;
  allStats[personTwo]["numberOfCharacters"] = 0;

  allStats[personOne]["allMessagesString"] = "";
  allStats[personTwo]["allMessagesString"] = "";

  allStats[personOne]["numberOfMessages"] = 0;
  allStats[personTwo]["numberOfMessages"] = 0;

  allStats[personOne]["numOfMessagesPerDayInOrder"] = [];
  allStats[personTwo]["numOfMessagesPerDayInOrder"] = [];

  allStats[personOne]["numOfMessagesPerHour"] = {};
  allStats[personTwo]["numOfMessagesPerHour"] = {};

  for (var key of Object.keys(messagesPerDays)) {
    var lukaNumOfMessages = 0;
    var ajdaNumOfMessages = 0;

    // iterate through messages per day
    for (var msg of messagesPerDays[key]) {
      if (msg.sender === personOne) {
        // counting the number of messages
        lukaNumOfMessages++;
        // number of characters
        allStats[personOne]["numberOfCharacters"] += String(msg.message).length;
        // number of words
        allStats[personOne]["numberOfWords"] += countWords(String(msg.message));
        // sanatized string that will be used for sorting the number of occurances of specific words
        allStats[personOne]["allMessagesString"] += sanatizeString(String(msg.message)) + " ";
        // number of messages per hour
        if (allStats[personOne]["numOfMessagesPerHour"][msg.time_sent.getHours()] === undefined) {
          allStats[personOne]["numOfMessagesPerHour"][msg.time_sent.getHours()] = {
            number: 1,
            messages: [msg.message]
          };
        } else {
          allStats[personOne]["numOfMessagesPerHour"][msg.time_sent.getHours()].number++;
          allStats[personOne]["numOfMessagesPerHour"][msg.time_sent.getHours()].messages.push(msg.message);
        }



      } else {
        // counting the number of messages
        ajdaNumOfMessages++;
        // number of characters
        allStats[personTwo]["numberOfCharacters"] += String(msg.message).length;
        // number of words
        allStats[personTwo]["numberOfWords"] += countWords(String(msg.message));
        // sanatized string that will be used for sorting the number of occurances of specific words
        allStats[personTwo]["allMessagesString"] += sanatizeString(String(msg.message)) + " ";
        // number of messages per hour
        if (allStats[personTwo]["numOfMessagesPerHour"][msg.time_sent.getHours()] === undefined) {
          allStats[personTwo]["numOfMessagesPerHour"][msg.time_sent.getHours()] = {
            number: 1,
            messages: [msg.message]
          };
        } else {
          allStats[personTwo]["numOfMessagesPerHour"][msg.time_sent.getHours()].number++;
          allStats[personTwo]["numOfMessagesPerHour"][msg.time_sent.getHours()].messages.push(msg.message);
        }



      }
    }

    allStats[personOne]["frequencyOfWords"] = mostPopularWordsArray(allStats[personOne]["allMessagesString"], 3);;
    allStats[personTwo]["frequencyOfWords"] = mostPopularWordsArray(allStats[personTwo]["allMessagesString"], 3);;

    allStats[personOne]["numberOfMessages"] += lukaNumOfMessages;
    allStats[personTwo]["numberOfMessages"] += ajdaNumOfMessages;

    allStats[personOne]["numOfMessagesPerDayInOrder"].push(lukaNumOfMessages);
    allStats[personTwo]["numOfMessagesPerDayInOrder"].push(ajdaNumOfMessages);
  }

  allStats[personOne]["avgOfWordsPerDay"] = allStats[personOne]["numberOfMessages"] / Object.keys(messagesPerDays).length;
  allStats[personTwo]["avgOfWordsPerDay"] = allStats[personTwo]["numberOfMessages"] / Object.keys(messagesPerDays).length;

  allStats[personOne]["avgWordsPerMessage"] = allStats[personOne]["numberOfWords"] / allStats[personOne]["numberOfMessages"];
  allStats[personTwo]["avgWordsPerMessage"] = allStats[personTwo]["numberOfWords"] / allStats[personTwo]["numberOfMessages"];

  console.log(allStats[personOne]);
  console.log(allStats[personTwo]);
}

function drawMessagesPerDay() {

    var dates = Object.keys(messagesPerDays);
    var lukaNumberOfMessagesPerDay = allStats[personOne]["numOfMessagesPerDayInOrder"];
    var ajdaNumberOfMessagesPerDay = allStats[personTwo]["numOfMessagesPerDayInOrder"];

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dates,
        datasets: [{
            label: 'Luka',
            data: lukaNumberOfMessagesPerDay,
            backgroundColor: [
              'rgba(0, 99, 255, 0.2)',
            ],
            borderColor: [
              'rgba(0, 99, 255, 1)',
            ],
            borderWidth: 1
          },
          {
            label: 'Ajda',
            data: ajdaNumberOfMessagesPerDay,
            backgroundColor: [
              'rgba(255, 0, 0, 0.2)',
            ],
            borderColor: [
              'rgba(255, 0, 0, 1)',
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

}

function sanatizeString(str) {
  return str.toLowerCase().replace(/[^\w\s]|_/g, "")
    .replace(/\s+/g, " ")
    .replace(/\bk+u+l+\b/g, "kul")
    .replace(/\bb+r+u+h+\b/g, "bruh")
    .replace(/\bb+r+o+\b/g, "bro")
    .replace(/\bj+e+j+\b/g, "jej")
    .replace(/\bj+e{2,}\b/g, "jee")
    .replace(/\bj+o{2,}\b/g, "joo")
    .replace(/\bl+o+l+\b/g, "lol")
    .replace(/\bl+e+l+\b/g, "lel")
    .replace(/\bw+u+\b/g, "wuuu")
    .replace(/\bb+o+i+\b/g, "boi")
    .replace(/\bb+o+y+\b/g, "boy")
    .replace(/\bw+u+p+\b/g, "wuuup")
    .replace(/\bt+e+n+k+s+\b/g, "tenks")
    .replace(/\bd+a+m+n+\b/g, "damn")
    .replace(/\ba+j+a+\b/g, "aja")
    .replace(/\bo+k+\b/g, "ook")
    .replace(/\ba{2,}j+\b/g, "aaj")
    .replace(/\bb+a+j+\b/g, "baaj")
    .replace(/\ba+y+\b/g, "ayy")
    .replace(/\bk+j+u+t\b/g, "kjut")
    .replace(/\bc+u+t+e+\b/g, "cute")
    .replace(/\bm+o+d+e+l+\b/g, "model")
    .replace(/\bm+u+d+e+l+\b/g, "mudel")
    .replace(/\bn+o+c\b/g, "noc")
    .replace(/\bn+o+c+k+o+\b/g, "nocko")
    .replace(/\bw+a+t+\b/g, "wat")
    .replace(/\bw+t+f+\b/g, "wtf")
    .replace(/\bw+t+h+\b/g, "wth")
    .replace(/\bu+m+\b/g, "uum")
    .replace(/\ba+m+\b/g, "aam")
    .replace(/\br+e+s+\b/g, "res")
    .replace(/\bv+i+b+e+\b/g, "vibe")
    .replace(/\bo+m+g+\b/g, "omg")
    .replace(/\ba+w+\b/g, "aww")
    .replace(/\bv+a+j+b+\b/g, "vajb")
    .replace(/\bf+u+l+\b/g, "ful")
    .replace(/\bh+m+\b/g, "hmm")
    .replace(/\bb+u+\b/g, "buu")
    .replace(/\ba+n+e+\b/g, "ane")
    .replace(/\bt+k+o+\b/g, "tko")
    .replace(/\ba{2,}\b/g, "aaa")
    .replace(/\bs+e+j+\b/g, "sej")
    .replace(/\bv+e+m\b/g, "tko")
    .replace(/\bs+a+m+\b/g, "sam")
    .replace(/\bh+a+l+o+\b/g, "halo")
    .replace(/\bn+i+c+e+\b\b/g, "nice")
    .replace(/\bn+a+j+s+\b/g, "najs")
    .replace(/\b(h|a)((h|a)+(h|a)+)+\b/g, "haha")
    .replace(/\b(h|e)((h|e)+(h|e)+)+\b/g, "hehe")
}

function mostPopularWordsArray(stringOfWords, minumumLengthOfWords) {
  var wordCounts = {};
  var words = stringOfWords.split(/\b/);

  for (var i = 0; i < words.length; i++) {
    var currentWord = words[i].toLowerCase();
    if (currentWord != " " && currentWord.length > minumumLengthOfWords - 1) {
      wordCounts[currentWord] = (wordCounts[currentWord] || 0) + 1;
    }
  }

  var sortable = [];
  for (var word in wordCounts) {
    sortable.push([word, wordCounts[word]]);
  }

  sortable.sort(function(a, b) {
    return b[1] - a[1];
  });

  return sortable;
}

function countWords(str) {
  str = str.replace(new RegExp(/(\.)\1+/, 'g'), " ");
  return str.trim().split(/\s+/).length;
}

function showBasicStats() {
  var lukaMessages = [];
  var ajdaMessages = [];
  separateMessages();

  var numOfAllMessages = lukaMessages.length + ajdaMessages.length;
  var numOfAjdaMessages = ajdaMessages.length;
  var numOfLukaMessages = lukaMessages.length;

  var firstDate = new Date(2021, 8, 28, 13, 15, 7, 21, 0)
  var lastDate = new Date(2021, 10, 9, 23, 12, 14, 0);

  const oneDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round(Math.abs((firstDate - lastDate) / oneDay));

  document.getElementById("firstMessage").innerHTML = firstDate.toLocaleDateString("sl-SI");
  document.getElementById("lastMessage").innerHTML = lastDate.toLocaleDateString("sl-SI");
  document.getElementById("convoDuration").innerHTML = diffDays;

  document.getElementById("numOfMessages").innerHTML = '<b>' + numOfAllMessages + '</b>';
  document.getElementById("numOfMessagesAjda").innerHTML = '<b>' + numOfAjdaMessages + '</b> (' + parseInt((numOfAjdaMessages / numOfAllMessages) * 100) + '%)';
  document.getElementById("numOfMessagesLuka").innerHTML = '<b>' + numOfLukaMessages + '</b> (' + (parseInt((numOfLukaMessages / numOfAllMessages) * 100) + 1) + '%)';

  document.getElementById("avgMessages").innerHTML = '<b>' + parseInt((numOfAllMessages / diffDays)) + '</b>';

  function separateMessages() {
    for (var sms of igMessages1.messages) {
      if (sms.sender_name.includes("luka"))
        lukaMessages.push(sms);
      else
        ajdaMessages.push(sms);
    }

    for (var sms of igMessages2.messages) {
      if (sms.sender_name.includes("luka"))
        lukaMessages.push(sms);
      else
        ajdaMessages.push(sms);
    }

    for (var sms of signalMessages) {
      if (sms.READ === "")
        lukaMessages.push(sms);
      else
        ajdaMessages.push(sms);
    }
  }
}
