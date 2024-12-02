import Imap from 'imap'; // Using 'import' for ES Modules
import { simpleParser } from 'mailparser';
import fs from 'fs'; 
import fetch from 'node-fetch'; // Use import for node-fetch in ES Modules

const imap = new Imap({
  user: 'youremail@gmail.com',
  password: 'YOUR_APP_PASSWORD', 
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  tlsOptions: {
    rejectUnauthorized: false, 
    secureProtocol: 'TLSv1_2_method'
  }
});

function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}

imap.once('ready', function () {
  openInbox(async function (err, box) {
    if (err) throw err;
   
    imap.search(['UNSEEN'], function (err, results) {
      if (err) throw err;
      if (results.length > 0) {
       
        const f = imap.fetch(results[0], { bodies: '' });
        f.on('message', function (msg, seqno) {
          msg.on('body', function (stream) {
            let buffer = '';
            stream.on('data', function (chunk) {
              buffer += chunk.toString();
            });
            stream.once('end', async function () {
              try {
                const parsed = await simpleParser(buffer); // await the promise from simpleParser

                const object = {
                    EMAIL: parsed.html
                }

                // Post the parsed email content to another endpoint
                const response = await fetch("NODESCRIPT_API_URL", {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                  },
                  body: JSON.stringify(object)
                });
                
                const data = await response.text();
                console.log(data);

                fs.writeFile('output.json', data, function (err) {
                    if (err) {
                        console.log('Error writing to file:', err);
                    }
                    else {
                        console.log('JSON data written to output.json');
                    }
                })
                
                // Write HTML content to a file
                fs.writeFile('output.html', parsed.html, function (err) {
                  if (err) {
                    console.log('Error writing to file:', err);
                  } else {
                    console.log('HTML content written to output.html');
                  }
                });
              } catch (err) {
                console.error('Error parsing email:', err);
              }
            });
          });
        });
        f.once('end', function () {
          imap.end();
        });
      } else {
        console.log('No unread emails found');
      }
    });
  });
});

imap.once('error', function (err) {
  console.log('Error:', err);
});

imap.once('end', function () {
  console.log('Connection ended');
});

imap.connect();
