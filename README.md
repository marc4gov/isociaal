Example code for [react-trello](https://github.com/rcdexta/react-trello).

# Setup

Please clone the project, install the dependencies and fire up the project

```
$ git clone git@github.com:rcdexta/react-trello-example.git
$ cd react-trello-example
$ # AND THEN
$ docker-compose up -d
$ # OR
$ docker build -t web:dev .
$ docker run -v ${PWD}:/app -v /app/node_modules -p 3001:3000 --rm web:dev
```
