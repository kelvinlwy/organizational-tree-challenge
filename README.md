# Organizational Hierarchical Relationship Tree Coding Challenge

## Project Scope

Design a suitable representation of the hierarchical relationship among employees in the company.

## Prerequisite

* No restriction on the choice of technology, free to choose any database, language, framework
* No restriction on the presentation of the result, it can be displayed on console, HTML page, a file, etc.

## Requirements

* To present the employee tabular data as below figure.1 into the hierarchical format as below figure.2:
  * Figure 1
  
  Employee | id | Manager id
  ---------|----|-----------
  Alan     |100 | 150
  Martin   |220 | 100
  Jamie    |150 |
  Alex     |275 | 100
  Steve    |400 | 150
  David    |190 | 400
  
  * Figure 2
  
  CEO     | Manager | Employee
  --------|---------|---------
  Jamie   |         |
  &nbsp;  | Alan    |
  &nbsp;  |         | Matin
  &nbsp;  |         | Alex
  &nbsp;  |         |
  &nbsp;  | Steve   |
  &nbsp;  |         | David
  
## Use Cases

* The CEO of the company doesn't have a manager.
* The employee is not supervised.
* The employee's supervisor should be removed if the supervisor is not valid employee, like who left the company.
* The manager can not self-assigned.
* The manager's position level must higher than the subordinate's position level.
* The superviosr should be removed from supervisor list when he/she has changed position.

## Get started

### System Requirements

* [Node.js](https://nodejs.org/en/), a Javascript runtime environment for building server-side web applications.
  * To download Node.JS, check out the options [here](https://nodejs.org/en/download/).
* [NPM](https://www.npmjs.com), a default package manager for the Node.js.
  * Node.js comes with npm installed.
  * You can also install npm by following the options [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
* MySQL, the relational database for data storage
* Docker, bundle the software and run it on OS-level virtual environment.
  * This application can be run using docker to eliminate dependencies on local environment. 
  * You can also operate the application without using docker, but you have to configure the project by updating environment variables.
  
### Installation

* To get the application by cloning the repo via

```
$ git clone git@github.com:kelvinlwy/organizational-tree-challenge.git
``` 

### Run the application 

* To set up the database

```
### MAKE SURE you don't have any application using database named 'company'!!!!!!

$ mysql -uroot -p"[MYSQL_ROOT_PASSWORD]" < ./db/dump.sql
$ mysql -uroot -p"[MYSQL_ROOT_PASSWORD]" < ./db/seed.sql
```

* Configure node application environment variables in ./server/.env file

```
PORT=3000
DB_USER=root	 		# default as root
DB_PASSWORD=[YOUR_MYSQL_ROOT_PASSWORD]
DB_PORT=3306		# default mysql db port number
DB_NAME=company	# the db name we will create
DB_HOST=127.0.0.1
```

* Install node application dependencies

```
$ cd ./server/
$ npm install
```

* Start the application

```
$ npm run dev
```

### Run the application  using Docker

* To launch the application by running the following command in root directory:

```
$ docker-compose up
```

* To  access the 'company' database on the container via command:

```
$ docker exec -it company-db sh 

## You are now execute an interactive shell on the container

$ mysql -uroot -p"password" company

## You are now in the company database hosted on the container
```
 
* To access database on the container using GUI tools with following configurations:
  * Host: 127.0.0.1
  * Password: password
  * Port: 3307


### Terminate the application

* To stop the application from running via

```
$ docker-compose down
```

### Testing with jest

```
$ cd ./server
$ npm run test
```

## Showcase

The database entity-relationship diagram:

![ER Diagram](https://github.com/kelvinlwy/organizational-tree-challenge/blob/master/showcase/company-er-diagram.png)

The showcase data:

![Showcase Data](https://github.com/kelvinlwy/organizational-tree-challenge/blob/master/showcase/showcase-structure.png)

The organizational tree illustrated as below:

![Organizational Tree](https://github.com/kelvinlwy/organizational-tree-challenge/blob/master/showcase/organizational-tree.png)

