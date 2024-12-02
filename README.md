# Email-fetching
A simple script to fetch the html content of an email

This can be done with any gmail account but possibly at the cost of security.
All that you need, is to ensure that your gmail account has IMAP enabled this can be be found in settings/POP3 and IMAP.
Also you need to generate an app password this option can be found in the security settings of the google account you are using if it doesn't work you may have to generate this twice.
Once that is done you need to ensure all the modules are installed in the directory

```
npm install
```

You may notice there is a missing NodeScript api which I made for myself you can make your own if you wish or just use the output.html file the output will go into.

# NodeScript API

<ol>
  <li>Go to <a href="https:\\nodescript.dev">NodeScripts website</a> and sign up for an account</li>
  <li>Use this graph to create the api <br> <img width="1482" alt="nodescript image" src="https://github.com/user-attachments/assets/3fe684df-3608-42c4-b90e-86105b87f532"></li>
  <li>Post the graph as http endpoint and the endpoint URL will be copied to your clipboard <br> <img width="394" alt="publish image" src="https://github.com/user-attachments/assets/2cde5414-795e-45ff-aded-6ac4006bcf86">
</li>
</ol>

# Run the script

To run the script just use nodejs.

```
node index.js
```
