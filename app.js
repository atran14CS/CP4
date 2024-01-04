/**
 * Name: Akira Tran
 * Date: 05/18/2023
 * Section: CSE 154 A Allan Elizabeth
 * This is the server side portion of the index.js. This server takes care of the post
 * and get request of the server side and returns specific data or stores data from the
 * clinet side.
 */

'use strict';

const express = require("express");
const app = express();
const fs = require("fs").promises;
const multer = require("multer");
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());

/**
 * Takes the trending movie list and sends over to the client side. Error will be thrown
 * if there is a problem with the server.
 */
app.get('/trending', async function(req, res) {
  try {
    res.type("json");
    let data = await fs.readFile("movieinfo.json", "utf8");
    res.send(data);
  } catch (error) {
    res.status(500);
    res.type('text');
    res.send('error on server side');
  }
});

/**
 * grabs the email enter from the client side and appends if email does not already exisit
 * otherwise gives 400 error if no email is typed or email already exist in emails.json.
 */
app.post('/newsletter', async function(req, res) {
  let email = req.body.email;
  let data = await fs.readFile('emails.json', 'utf8');
  if (email) {
    try {
      res.type("text");
      data = JSON.parse(data);
      if (checkExisting(email, data) === true) {
        res.status(400);
        res.type('text');
        res.send('email already exist');
      } else {
        data.push(email);
        await fs.writeFile('emails.json', JSON.stringify(data));
        res.send("successful email");
      }
    } catch (err) {
      res.status(400);
      res.type('text');
      res.send('invaild email');
    }
  } else {
    res.status(500);
    res.type('text');
    res.send('error on server side sorry.');
  }
});

/**
 * finds out if the email already exist.
 * @param {string} email - represents the sent in email from the client side
 * @param {object} data - represents the array that store the email for the newsletter
 * @returns {boolean} true if email already exist otherwise false
 */
function checkExisting(email, data) {
  if (data.includes(email)) {
    return true;
  }
  return false;
}

app.use(express.static('public'));
const PORT = process.env.PORT || 8000;
app.listen(PORT);