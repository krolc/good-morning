const axios = require('axios');
const DateTime = require('luxon').DateTime;
const slackApiBaseUrl = 'https://slack.com/api';
const slackUserName = 'Good Morning Stogie!';
const slackAuthToken = process.env.SLACK_AUTH_TOKEN;
const slackChannel = process.env.SLACK_CHANNEL;


function formatResponse(statusCode, body) {
  return {
      statusCode: statusCode,
      headers: {
          'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(body)
  };
}

exports.run = async (event) => {
  try{
    const day = DateTime.now().weekday;
    let giphyQuery = ''
    switch(day){
      case 1:
        giphyQuery = 'happy+monday%21'
        break;
      case 6:
        giphyQuery = 'happy+friday%21'
        break;
      default:
        giphyQuery = 'good+morning%21'
        break;
    }

    const gf = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=WzQZ0EeIN94ondgvQvWexggBxbKdbyRC&q=${giphyQuery}&limit=25&offset=1&rating=g&lang=en`);

    let max = gf.data.data.length;
    let min = 0;

    var randomNumber = Math.floor(Math.random() * (max - min)) + min;

    gifUrl = gf.data.data[randomNumber].images.downsized.url;

    await axios({
      method: 'POST',
      baseURL: slackApiBaseUrl,
      url: 'chat.postMessage',
      headers: {
          Authorization: `Bearer ${slackAuthToken}`
      },
      data: {
          channel: slackChannel,
          text: gifUrl,
          username: slackUserName,
          unfurl_links: true,
          unfurl_media: true
      }
    });
    return formatResponse(200, {});
  } catch(error) {
    console.log('error: ', error);
    return formatResponse(500, {});
  }
}