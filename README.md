# Velocida
## Springboard Software Engineering Capstone 2 Project

<div align='center'>
    <img align='center' src="frontend/public/runner.png" alt="runner" width="200" style="border-radius: 6px;" />
    <br><br>
</div>

<div align="center">
   <a href="https://www.linkedin.com/in/nicholasguarino/">
      <img src="https://img.shields.io/badge/-Nicholas Guarino-0A66C2?style=flat&logo=Linkedin&logoColor=white" style="margin-right:10px;"/>
   </a>
</div>
<br><br>

## **Description**
- This is a running/fitness social logging and forum/news application (built in React for frontend and Express.js with typescript for backend) that is similar to Strava and news and forum site like letsrun.com with upvote and downvote system. 

- **Future features or in progress/under construction**:
The basic functionality has a manual activity upload but future goal is to get automatic upload or sync from third party devices/apps like Garmin, etc. and have a better news page with pulling in different news sources from different RSS feeds. There is also some pages like the 'dashboard' that have yet to be finished which may act like a feed for those users you follow as well as the search functionality not working yet, and lastly just general overall better styling will improve over time.

## **Live Website**
- I am hosting on Vercel for frontend: https://velocida.vercel.app/ -> Built using Vite and React with Javascript.
- I am hosting on Render for the backend: https://velocida-backend.onrender.com -> uses Prisma for ORM and built using Typescript.
- For the PostgreSQL DB, this being hosted on Supabase: https://supabase.com/
NOTE: Backend app may need to spin back up so initial load could take a couple minutes at least but once loaded will run normally.

## **Tech Stack/Technologies**

This project was made using the following tech stack/technologies:
- [Particles.js](https://vincentgarreau.com/particles.js/)
- [React](https://react.dev/)
- [Javascript](https://www.javascript.com/)
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Bootstrap 5](https://getbootstrap.com/docs/5.1/getting-started/introduction/)
- [Font Awesome](https://fontawesome.com/)
- [PostgreSQL](https://www.postgresql.org)
- [Express.js](https://expressjs.com/)
- [Vite](https://vitejs.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [React Bootstrap](https://react-bootstrap.netlify.app/)
- [Prisma](https://www.prisma.io/)
- [Node.js](https://nodejs.org/en)
- [VSCode](https://code.visualstudio.com/docs)

##  **How to Run Locally**

```bash
# Clone Repository
# Once in root directory install npm packages for both backend and frontend directories
# backend
$ cd backend
$ npm i
$ npm run dev
# frontend
$ cd frontend
$ npm i
$ npm run dev
# OPTIONAL Source and seed your local PostgreSQL DB
# in root of repository can use velocida.db to seed some test data
```