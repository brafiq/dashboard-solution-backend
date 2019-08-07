
const axios = require('axios');
const likes = require('likes');
const instagramScraper = require('instagram-followers');

module.exports = async () => {
  /* DO THE SOCIAL STUFF */

  const twitter = new Promise((resolve, reject) => {
    likes.twitter('jafa', (err, count) => {
      if (err) {
        resolve('???');
      }
      resolve(count);
    });
  });

  const twitterFollowers = await twitter;

  let instagramFollowers = await instagramScraper('jafa.app');
  instagramFollowers = parseInt(instagramFollowers, 10);

  /* DO THE AMPLITUDE STUFF */

  // username is API KEY and password is SECRET KEY
  const auth = {
    username: 'ENTER COMPANY API KEY',
    password: 'ENTER COMPANY SECRET KEY',
  };

  const allData = {
    // graphs
    Daily_Downloads: 'ku61s8d',
    Daily_Article_Opens: 'oapfm7q',
    Daily_Active_Users: 'mcwi6sx',
    Daily_Returning_Users: 'fiufq8m',

    Weekly_Acquired_Users: '5iv4hi3',
    Monthly_Acquired_Users: 'rviiwqg',
    Weekly_Active_Users: 'puhnyrj',
    Monthly_Active_Users: 'szv5i19',

    // single data points
    Total_Downloads_Today: 't6fgwb5',
    Active_Users_Today: 'hmfvp7w',
    Download_Conversion_Today: 'tx3yj3n',
    Returning_Users_Today: 'm5jw852',

    Acquired_Users_This_Week: '19w4mb6',
    Acquired_Users_This_Month: 'a55qi2u',
    Returning_Users_This_Week: 'zqvxtdi',
    Returning_Users_This_Month: 'h42ajg0',

    MTD_Downloads: 'mzh89ja',
    MTD_Active_Users: 'bhw25ao',
    MTD_Download_Conversion: 'hsyhluj',
    MTD_Returning_Users: 'dpu70or',

    Download_Conversion_Yesterday: '53u61vx',
    Download_Conversion_Last_Month: 'jp18bwn',
  };

  const keys = Object.keys(allData);
  const promises = [];

  keys.forEach((value) => {
    promises.push(value, axios.get(`https://amplitude.com/api/3/chart/${allData[value]}/query`, { auth }));
  });

  try {
    const res = await Promise.all(promises);
    const payload = [];

    for (let i = 1; i < res.length; i += 2) {
      const item = [];
      item.push(`${res[i - 1]}`);
      item.push(res[i].data.data);
      payload.push(item);
    }

    console.log('success', payload);

    return {
      generalStatus: 'success',
      chartdata: payload,
      twitter: twitterFollowers,
      instagram: instagramFollowers,
    };
  } catch (err) {
    console.log('an error occurred', err);

    return {
      generalStatus: 'error',
    };
  }
};
