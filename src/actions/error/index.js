
const axios = require('axios');

module.exports = async (data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${process.argv[3]}`,
      'Content-type': 'application/json',
    },
  };

  const bodyParameters = {
    channel: '#n-errors',
    text: data.title,
    attachments: [
      {
        text: data.body,
      }],
  };

  const res = await axios.post(
    'https://slack.com/api/chat.postMessage',
    bodyParameters,
    config,
  );

  return {
    generalStatus: 'success',
    statusCode: '1',
    payload: null,
  };
};

