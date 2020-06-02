# SportTracker

SportTracker is a web application for tracking workouts. With SportTracker you can save workouts, browse saved workouts, see summaries about your workouts and track your weight progress. The backend is implemented using Python3, Flask and SQLite database. Front-end uses React framework. Authentication is handled with google sign-in (OAuth2). SportTracker uses Google Maps API and browser's geolocation for user position tracking. Charts are implemented using Recharts module.

Live application: https://sarja-sport-tracker.herokuapp.com/

If you don't want to register to SportTracker with your Google account, you can also explore the application with the test user account.

## New Workout

Live tracking allows you to track your workout's duration, distance, and route during the workout. 
SportTracker uses browser navigator's geolocation information and Google Maps API to record routes and duration.
After the workout you can fill add additional information about the workout and save.

![Alt text](src/pics/liveView.jpg?raw=true "Live Workout")  ![Alt text](src/pics/liveEdit.jpg?raw=true "Edit Workout")


You can also insert workout information manually without live tracking.
![Alt text](src/pics/insertWorkout.png?raw=true "Insert Workout")

## Workout History

Workout history shows a list of all recorded workout. You can order and filter the workout list with different options.

![Alt text](src/pics/workoutList.png?raw=true "Workout List") 

You can get more detailed info about a singular workout by clicking the view workout button.

![Alt text](src/pics/workoutDetail.png?raw=true "Workout Detail")

## Workout Summaries

Sport Tracker calculates summary information for different workout variables. SportTracker calculates min, max, average and total values for each workout variable from the selected time period.

![Alt text](src/pics/summaries.png?raw=true "Workout Summary")

By clicking a progression chart button you can also see the values for each individual workout in a graphical line chart.

![Alt text](src/pics/summaryChart.png?raw=true "Progress Chart")

## Weight

SportTracker also offers weight tracking feature where you can update your current weight and see graphically your weight progress.

![Alt text](src/pics/weight.png?raw=true "Weight Chart")
