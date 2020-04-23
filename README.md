# Making a Docker Image for Node Express and Postgres

Run this with:

`docker run -p 8080:8080 finnterdal/node-postgres`

to connect to the database once the container is running:

`docker ps`

Find the row for postgres, and:

`docker exec -it <CONTAINER ID> psql -U postgres`

This should also work:

`docker exec -it docker-node-postgres_db_1 psql -U postgres`
