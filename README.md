# Demo

[![Watch the demo video](https://img.youtube.com/vi/PiNw4NcjD5E/0.jpg)](https://youtu.be/PiNw4NcjD5E)

> 🚀 **Note**  
> It took me about 6 hrs to create everything end-to-end using `Cursor` using `claude-3.5-sonnet`. I manually inspected the frontend (React) part and changed a few files. Backend was mostly AI generated since I am new to Python / Django (I am a nodejs programmer). If I had more time,I would have manually inspected the code further and added more tests

# myteam.ai

MyTeam is a fullstack (React + Python / Django) app that helps you add / remove people into your team.

# Frontend

The frontend stack consists of:

- React
- Typescript
- Material UI

## Architecture

The FE is SPA. `config.ts` contains the API endpoint for the backend. Following operations are supported:

1. List user - Upon starting up, the app hits the `GET /api/v1/members` endpoint to fetch the list of team members and display them in a list.
2. Add user - The user can add a new team member by clicking on the `+` button and filling in the details. The app calls the `POST /api/v1/members` endpoint to add the new team member.
3. Delete user - The user can delete a team member by clicking on the `Delete` button. The app calls the `DELETE /api/v1/members/<id>` endpoint to delete the team member.
4. Update user - The user can update the details of a team member. The app calls the `PUT /api/v1/members/<id>` endpoint to update the team member.

The App uses `react hooks` for state management and the hook uses `useEffect` for calling the API endpoints. No state management library like `redux` was required for a simple app like this.

# Backend

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
