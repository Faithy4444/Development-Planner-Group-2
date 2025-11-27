create .env files and insert this:
DATABASE_HOST=localhost
DATABASE_USER=user
DATABASE_PASSWORD=pass
DATABASE_NAME=dev
DATABASE_PORT=5432
DATABASE_URL=postgres://user:pass@localhost:5432/dev

the simpliest way to start container:

- download docker
- in backend directory run ``docker compose up``

now you have a running container on a DATABASE_URL