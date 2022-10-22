# Around The US FullStack App

This app is a social network that enables travelers to create accounts and share their travel photos with option to like/dislike and option to delete photo which saved only for the owner.
This repository contains the full API of the "Around the U.S." project that features user authorization and user registration with handlers for cards and users.

- Frontend repo - [https://github.com/amitay96/react-around-auth]
- Backend repo - [https://github.com/amitay96/around-express]


- Fullstack live server App: [https://amitay.students.nomoredomainssbs.ru/]
- Api deployed to remote GCP server: [https://api.amitay.students.nomoredomainssbs.ru/]

## Primary project objectives:

1.  integrate between frontend and backend repos
2.  deploy fullstack repo to Google Cloud Platform.

## Features

- ReactJS
- React Router Dom for Protected Routing for logged in users.
- NodeJs/ExpressJs serverside
- MongoDB for DB
- Deployments to GCP
- Serverside JWT Auth
- localstorage manipulation to retain logged in user's JWT tokens.

## Full Project Functionality

- Upon first visit, users are redirected to register and after successfull registration redirected to Singin page.

- Aftre Signin the user will be redirected to Homepage where they will have several options.
  - Edit their Profile name, about, and avatar image.
     
  - Add their own cards to the collective of cards.

  - View other's added cards.

  - Ability to like/dislike cards.

  - Ability to delete user's own cards.

  - Click on photo to open in big screen.