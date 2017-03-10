
/**
 * MailDev - send.js -- send a few emails for testing
 *
 * Run this to send emails to port 1025 for testing MailDev during development
 *   node test/scripts/send.js
 */

var nodemailer = require('nodemailer');

// Create a transport with MailDev's default receiving port
var transporter = nodemailer.createTransport({
  port: 1025,
  ignoreTLS: true
});

// Messages list
var messages = [

  // Email w/ simple attachment and basic header
  {
    from: 'Angelo Pappas <angelo.pappas@fbi.gov>',
    to: 'Johnny Utah <johnny.utah@fbi.gov>',
    subject: 'The ex-presidents are surfers',
    headers: {
      'X-some-header': 1000
    },
    text: 'The wax at the bank was surfer wax!!!',
    html: '<!DOCTYPE html><html><head></head><body>' +
          '<p>The wax at the bank was surfer wax!!!</p>' +
          '</body></html>',
    attachments: [
      { fileName: 'notes.txt', content: 'Info on surf board wax', contentType: 'text/plain' }
    ]
  },

  {
    from: '-',
    to: '1000239092@fb.me',
    subject: 'This is a push',
    headers: {
      'X-type': 'fbpage'
    },
    text: 'The wax at the bank was surfer wax!!!',
    html: '<!DOCTYPE html><html><head></head><body>' +
          '<p>The wax at the bank was surfer wax!!!</p>' +
          '</body></html>'
  },

  {
    from: '-',
    to: '0670123456@fb.me',
    subject: 'SMS T',
    headers: {
      'X-type': 'sms',
      'X-to': '06 70 12 34 56'
    },
    text: 'The wax at the bank was surfer wax!!!'
  },

  {
    from: 'notif.me',
    to: 'xxx@browser.io',
    subject: '[webpush] push title',
    headers: {
      'X-type': 'webpush',
      'X-to': '-'
    },
    text: '-'
  },

  // Plain text email
  {
    from: 'Johnny Utah <johnny.utah@fbi.gov>',
    to: 'Angelo Pappas <angelo.pappas@fbi.gov>',
    subject: 'You were right.',
    text: 'They are surfers.'
  },

  // HTML email w/ image
  {
    from: 'Bodhi <bodhi@gmail.com>',
    to: 'Johnny Utah <johnny.utah@fbi.gov>',
    subject: 'The ultimate price',
    text: 'If you want the ultimate, you\'ve got to be willing to pay the ultimate price. \nIt\'s not tragic to die doing what you love.',
    html: '<!DOCTYPE html><html><head></head><body style="background:#eee;font-family:sans-serif;padding:2em 2em;">' +
          '<h1>Point Break</h1>' +
          '<img src="http://farm8.staticflickr.com/7337/11784709785_bbed9bae7d_m.jpg">' +
          '<p>If you want the ultimate, you\'ve got to be willing to pay the ultimate price. <br>It\'s not tragic to die doing what you love.</p>' +
          '<p><strong>- Bodhi</strong></p>' +
          '</body></html>',
  },

  // Email w/ embedded image
  {
    from: 'Johnny Utah <johnny.utah@fbi.gov>',
    to: 'Bodhi <bodhi@gmail.com>',
    subject: 'Where\'s Tyler?',
    html: 'Here she is:<br><img src="cid:12345"/>',
    attachments: [
      {
        filename: 'tyler.jpg',
        path: __dirname + '/tyler.jpg',
        cid: '12345'
      }
    ]
  }

];


function sendEmails(logErrors) {
  messages.forEach(function(message){
    transporter.sendMail(message, function(err, info) {
      if (logErrors && err)
        return console.log('Test email error: ', err);
      console.log('Test email sent: ' + info.response);
    });
  });
}

// Run once if called directly, otherwise export
if (require.main === module)
  sendEmails(true);
else
  module.exports = sendEmails;
