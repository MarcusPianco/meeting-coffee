# Adonis API application

This is a open source api project that will be use to meetings between NERD friends!!! :).

Technologies used:

1. NodeJS
2. JWT
3. Postgres
4. AdonisJS
5. Docker(will be implemented )
6. Sqlite
7. Mailgun
8. Kue

## Setup

Use the adonis commands in terminal to start the server

```bash
yarn && adonis migration:run && adonis serve
```

## Run Queue of Jobs

Open other terminal tab and run the command bellow

```bash
adonis kue:listen
```

or manually to build a 'script' command in package.json to run for example: `npm start`.

### Contributions

- 1 - More and more Documentation
- 2 - Provide Rules and Permissions resource
- 3 - Features:
  - 3.1 - Social network acess and signup;
  - 3.2 - Appointments resource of meetings (should include a broadcast menssage confirmation for the NERDS) - DONE;
  - 3.3 - Places resource (places of the meetings);
  - 3.4 - Feedbacks resource;
  - 3.5 - Chat resource (it would be so good);
  - 3.6 - Profile resource.
  - 3.7 - Topic resource.
  - 3.8 - Votation resource
    - 3.8.1 - Topic votation
    - 3.8.2 - Place votation
- 4 - Dockenize api
- 5 - Include more features (please)
