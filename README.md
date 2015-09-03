# DTNodeJSAppPlayground

This is a Express based Node JS application.  The app makes use of SequelizeJS to communicate to a MySQL database.

## Required Software

1. NodeJS - - [Download here](https://nodejs.org/)
2. MySQL Database - [Download here](https://dev.mysql.com/downloads/installer)
    * MySQL Workbench application is useful in viewing the records in the database

## Setup on Mac

1. Click the 'Download ZIP' button on github or clone the repository to your desired location
2. Start MySQL server
3. In Terminal, execute **_/usr/local/mysql/bin/mysql -u ‘root’ -p < dtDatabase.sql_**
    * dtDatabase.sql is located in the root directory of the project
3. Navigate to root project directory where you cloned the repository
4. In Terminal, execute **_node app.js_**
5. Navigate to [http://localhost:3030](http://localhost:3030)

## What to expect when running the application

Two things occur when a user navigates to the index page.
1. A record is inserted into a user_profile table using the request object's sessionId.
2. A query is executed to see if the user has responded to all survey questions entered by an administrator.  A survey question view is displayed if an unaswered survey exists.  

Once on the main page you will notice a yellow square near the upper right hand of the page.  Clicking the square simulates an entry point for an adminstrator to add survey questions and view survey results.  Please note that no authentication is set up at this point to identify an administrator and the app does not have logic to distinguish between a user and an administrator.  Itis assumed a user tapping the yellow square is an administrator.

Reloading the page will present a new survey question until all surveys have been answered.  The app will only display a welcome message if there are no more surveys to present.

** VERY IMPORTANT** - Navigating to the app on your browswer will generate a new session id when the app server is restarted.

### TODOs: (Not a complete list)

1. Create a mechanism to authenticate an administrator instead of letting them right in
2. Getting all queries to utilize SequelizeJS
3. Make the app 100% responsive
    * More research and work needs to be done
4. Enhance the admin survey result view to present the results better
4. Collecting the new survey question and answer information in admin mode needs to be refactored
    * Code is not making use of collections of objects
5. Add a button to the add survey question view to dynamically add more answer text fields to remove the limitation of four options and not display four text fields if only two answers are needed
6. UI improvements in respect to style