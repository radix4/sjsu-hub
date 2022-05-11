# SJSU Hub


### Dependencies
  - Front-end
    - React
    - React Bootstrap
    - React Dom
    - React Scripts
    - StockJS Client
    - Web
    - **Note: For a comprehensive list of dependencies with specific versions associated, please go to the project GitHub repository → frontend → package.json. Below is a snapshot of the dependencies.

  - Back-end
    - Spring Initializr
      - Java 11
      - Maven Project
      - Spring Web
      - Spring Data JPA
      - MySQL Driver
      - Lombok
    - WebSocket (SockJS and STOMP)

  - Database
    - MySQL database



### Installation
  - Front-end
    - sjsu-hub\frontend> npm install
    - ** This will install all the dependencies for the frontend code. Please note that you need to have node.js installed on your machine in order to use the ‘npm’ command.
  - Back-end
    - The backend leverages Maven, an automation tools that manages and downloads all dependencies. If you are using any IDE, you can simply refresh the pom.xml (a Maven file) to download all the dependencies.
    - Or you can use the terminal with the Maven command, ‘mvn install’ at the root of the backend folder.
  - Database
    - There are a number of ways you can download and run mysql on your machine.
      - 1) If you are familiar with docker, you can run the mysql image as a container and expose it to the default port.
      - 2) You can download from the official website. (https://www.mysql.com/) 
      - 3) If you are on a Unix OS, you can leverage homebrew to install it for 
      - ** The recommended ways are (2) and (3).



### How to Run
  - Front-end
    - sjsu-hub\frontend> npm start
    
  - Back-end
    - sjsu-hub\backend> ./mvnw spring-boot:run

### How to Run
  - Frontend
    - A Single-Page-Application (leverages React).
    - The frontend contains mainly components and services. Components are actual user interface components. Services contain functions that consume APIs from the backend.
  - Backend
    - A Spring MVC application.
    - The backend contains controllers, entities, and repositories. Entities are Java objects that can be interacted with the database. Repositories provide database functionality. Controllers are REST APIs.
