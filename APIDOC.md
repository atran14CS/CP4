# *MOVIE API* API Documentation
*Fill in a short description here about the API's purpose.*
The Movie API provides a information about trending movies and also a list of valid emails that are signed up with the movie website.
## *Fill in Endpoint 1 Title*
**Request Format:** */trending*

**Request Type:** *GET*

**Returned Data Format**: JSON

**Description:** *Fill in description*
Returns a JSON object of the trending movie along with it's rotten tomatoe rating

**Example Request:** */trending*

**Example Response:**
*Fill in example response in the ticks*

```
[
  {
    "movie": "Guardian of The Galaxy",
    "rating": 82
  },
  {
    "movie": "BLACKBERRY",
    "rating": 98
  },
  {
    "movie": "The Mother",
    "rating": 46
  },
  {
    "movie": "Guy Ritchie's The Covenant",
    "rating": 46
  },
  {
    "movie": "Air",
    "rating": 92
  },
  {
    "movie": "Fools Paradise",
    "rating": 14
  }
]

```

**Error Handling:**
*Fill in an example of the error handling*
Possible 500 errors (all plain text):
  - If something else goes wrong on the server, returns an error with the message:
  `error on server side`

## *Fill in Endpoint 2 Title*
**Request Format:** *Fill in example request format*

**Request Type:** *POST*

**Returned Data Format**: Text

**Description:** *Fill in description*
After inputing an email to the NewsLetter the inputted email will be sent stored in emails.json and use to send news to.
**Example Request:** */newsletter*

**Example Response:**
*Fill in example response in the {}*

```
["email1.@gmail.com", "email2.@gmail.com", "email3@gmail.com", "email4@gmail.com"]
```

**Error Handling:**
*Fill in an example of the error handling*
- Possible 400 (invalid request) errors (all plain text):
  - If passed in an already existing email, returns an error with the message: `email already exist.`
  - Possible 400 (invalid request) errors (all plain text):
  - If passed in a invalid email, returns an error with the message: `invalid email.`
- Possible 500 errors (all plain text):
  - If something else goes wrong on the server, returns an error with the message: `error on server side sorry.`
