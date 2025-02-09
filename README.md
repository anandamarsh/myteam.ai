> 🚀 **Note**  
> It took me about 6 hrs to create everything end-to-end. This was possible only because I was using `Cursor` using `claude-3.5-sonnet`. I manually inspected the frontend (React) part and changed a few files. Backend was compltely since this is the first time I am using Python / Django (I am a nodejs programmer). If I had more time,I would have manually inspected the code further and added more tests

# myteam.ai

MyTeam is a fullstack (React + Python / Django) app that helps you add / remove people into your team.

# Frontend

The frontend stack consists of:

- React
- Typescript
- Material UI

## Architecture

The FE is SPA. `config.ts` contains the API endpoint for the backend. Upon starting up, the app hits the `/api/v1/members` endpoint to fetch the list of team members and displays them in a list. Upon clicking on a team member, the app displays the selected team member's details. The user can update the details and save them (the app calls the `/api/v1/members/<id>` endpoint to update the team member). The user can also delete a team member (the app calls the `/api/v1/members/<id>` endpoint to delete the team member). The user can also add / create a new team member (the app calls the `/api/v1/members` endpoint to add the new team member).

The App uses `react hooks` for state management and the hook uses `useEffect` for calling the API endpoints. No state management library like `redux` was required for a simple app like this.

# Backend

> 🚀 **Note**  
> I have been coding in Node.js for the past 10 years. I have never coded in Python / Django before. This entire code has been generated using `Cursor` using `claude-3.5-sonnet` with almost no manual inspection of the code.

The backend stack consists of:

- Python
- Django
- Django REST framework

## Architecture

The backend is a RESTful API that uses Django REST framework to create the API endpoints. The API endpoints are defined in the `urls.py` and `views.py` file. The API endpoints are used by the frontend to fetch the list of team members, add a new team member, update a team member, and delete a team member.

# Database

I am using `sqlite3` for the database. The database is defined in the `models.py` file. The database is used to store the list of team members.

# Testing

The app uses `Behave` BDD framework for testing. The tests are defined in the `features` directory. The tests are used to test the API endpoints.

# Running the app

First run the server

```bash
# from myteam_server directory
python3 manage.py runserver
```

## Running the server tests

```bash
# from myteam_server directory
python3 manage.py test
python3 manage.py behave
```

And then run the client:

```bash
# from myteam_spa directory
npm run start
```

## Running the client tests

```bash
# from myteam_spa directory
npm run test
```
