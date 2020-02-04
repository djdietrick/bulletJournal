# BulletJournal

Based on the rapid logging method called Bullet Journaling.  A full explanation can be found at their website (https://bulletjournal.com/pages/learn).

Bullet Journaling works by logging many, small bullets throughout the day instead of traditional long-form journaling. Think of it as note-taking for your every day life. 

A bullet can be either a task, an event, or a note. Each of these can contain nested notes to hold more detail and is associated with a date (optionally with a due date). These are then organized and can be viewed in either a yearly, monthly, and daily logs. Yearly logs show major events for each month. Monthly logs show a more detailed breakdown of events for the month, as well as any tasks to be completed or remain uncompleted from previous months. The daily log shows tasks and notes on the day they were added and events on the day that it occurs.

# To Install

There are two individual Node projects in this app, one for the server and one for the client. Navigate into each subfolder and run `npm install` to install dependencies.  

You will also need to add a config file for the server to work properly. For dev, create a file called 'dev.env'. In that file, specify the following parameters:
* PORT (port you want the server to run on)
* DEV_MONGODB_URL (url of your mongo db)
* DB_USER
* DB_PASSWORD
* JWT_SECRET (for your JWT)