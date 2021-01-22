# news-explorer-api

Сайт:  
https://api.stvdent47-news.students.nomoredomains.icu/signin

## Routes:
### POST
`/signup`  
creates a new users  
requires: email, password, name

### POST
`/signin`  
logins and returns jwt token  
requires: email, password

### GET
`/users/me`  
returns info about a user  
requires: jwt token

### GET
`/articles`  
returns all saved articles  
requires: jwt token

### POST
`/articles`  
creates a new article  
requires: keyword, title, text, date, source, link, image, owner, jwt token

### DELETE
`/articles/articleId`  
deletes an article  
requires: jwt token
