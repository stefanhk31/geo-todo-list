## Geographic To-Do List

This is to-do list that marks tasks based on a user-defined location. This version only shows the user-interface, and cannot store data when the webpage is closed. 

Users enter task name, task location (e.g. "Home"), and task address. On submit, the address is geocoded, and rendered on the map with a marker. If a second task is entered in the same location, it is added to the list of that location. 

When a task is checked off, it disappears. If all tasks from a given location are checked off, that location list disappears, as does the corresponding marker. 

There are two ways to filter tasks: by location and by distance from user. Filtering by location removes all to-do lists except for that of the particular location selected. Filtering by user hides any lists that are not within a user-defined distance.

This app was built with React using [Create React App](https://facebook.github.io/create-react-app/). The map and distance calculations come from [Mapbox](https://www.mapbox.com/), and the geocoding uses [HERE Geocoder API](https://developer.here.com/documentation/geocoder/topics/what-is.html). UI of the form and lists are mobile-friendly, using CSS Flexbox.

