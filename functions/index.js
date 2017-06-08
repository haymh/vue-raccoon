const functions = require('firebase-functions');
const cors = require('cors')({origin: true});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const MAILGUN_DOMAIN = 'mg.zhaofangabc.com';

const mg = require('mailgun.js').client({
  username: 'api',
  key: 'key-7ddae8fe18afe8c8bfd8f1e4657de186',
  public_key: 'pubkey-dbc8a53bb578f1936f6363f60e762c99',
});

exports.email = functions.https.onRequest((req, res) => {
  console.log('requested email:', req.body);
  cors(req, res, () => {
    mg.messages.create(MAILGUN_DOMAIN, {
      from: 'Raccoon Agent <agent@zhaofangabc.com>',
      to: ['wenxin3262@gmail.com'],
      subject: 'Hello',
      html: req.body.html,
      'h:Reply-To': '<wenxin3262@gmail.com>',
    })
    .then((msg) => {
      console.log('done.', msg);
      res.send(msg);
    }) // logs response data
    .catch((err) => {
      console.log(err);
      res.status(500).send('something wrong');
    }); // logs any error
  });
});
