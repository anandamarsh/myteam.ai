# myteam.ai

My team is a fullstack (React + Python / Django) app that helps you add / remove people into your team.

## Features

- Add a team member
- Remove a team member
- View all team members
- Edit a team member

# Frontend

The frontend stack consists of:

- React
- Typescript
- Material UI

## Architecture

The FE is SPA. `config.ts` contains the API endpoint for the backend. Upon starting up, the app hits the `/api/v1/members` endpoint to fetch the list of team members and displays them in a list. Upon clicking on a team member, the app displays the selected team member's details. The user can update the deatils and save them (the app calls the `/api/v1/members/<id>` endpoint to update the team member). The user can also delete a team member (the app calls the `/api/v1/members/<id>` endpoint to delete the team member). The user can also add / create a new team member (the app calls the `/api/v1/members` endpoint to add the new team member).

The App uses `react hooks` for state management and `useEffect` for calling the API endpoints. Instead of using a state management library like `redux`, the app uses the `useContext` hook to manage the state of the app.

# Backend

The backend stack consists of:

- Python
- Django
- Django REST framework

The backend is a RESTful API that uses Django REST framework to create the API endpoints. The API endpoints are defined in the `urls.py` file. The API endpoints are used by the frontend to fetch the list of team members, add a new team member, update a team member, and delete a team member.

# Database

For simplicity of this exercise, the app uses an in-memory database (Django's default database). A more robust / production-ready solution would use a PostgreSQL database.

# Testing

The app uses `pytest` for testing. The tests are defined in the `tests` directory. The tests are used to test the API endpoints.

App testing is not implemented for this exercise.
