# Project 3: JOYERN

JOYERN is a full MERN-stack app designed to gamify chores and other tasks. When a user creates a task, they define an estimated duration (in minutes) and choose a relative difficulty from 1-4. Based on those factors, a value is assigned to the task which the user can see once the task is created. Once a user clicks "Completed," the task is deleted from the task list and the value of the task is added to the number of credits the user has gained. 
A "task completed" counter also shows how many total tasks the user has completed. By clicking on the name of the task, the user can choose to either edit or delete any given task from their list. Task value is reevaluated after any changes are made.

When clicking on the "Rewards" button, all previously defined rewards are listed. When creating a new reward, the user defines the cost as they choose. Once created, a reward appears with a "Purchase" button which detracts the cost from the user's total credits when clicked. Should a reward cost more credits than the user has available, the "Purchase" button disappears, and in its place is a prompt indicating that the user does not have enough points. Just as with the tasks, rewards can be edited or deleted by clicking on the name of the reward.

In order to use the app, the user needs to sign in or create a new account. JOYERN uses authentication/authorization to keep track of an individual user's tasks, rewards, credits, and number of tasks completed. Should the user navigate to the home page without having signed in, all main controls disappear and the user is prompted to sign-in.

## Tech and Build Approach

Original Wireframe: https://imgur.com/DWXc6Vg

As previously stated, JOYERN is a MERN app. React-Bootstrap is utilized for most of the styling with custom CSS as needed, and token-based auth is utilized to facilitate user login. Auth tokens are stored in the local browser memory, and are erased upon logout. Any error logging in or registering an account also forces deletion of the auth token, making it more difficult to accidentally gain access to the app. UseState is widely used across the app, with the primary use being the handling of user data as it is updated.

The heart of the app is the task and reward list. Each are dynamically loaded as individual items are created and are tied to a user account via Mongo user-ID referencing when sending requests to the back-end. I wanted each task and reward to be self-contained, meaning most of the functionality would reside within each item as it appears; this would mean less navigation on the part of the user and a more concise interface. As prompted by a TA, I implemented some aspects of CRUD into the main lists, with the "new item" forms dropping directly into the associated list. This allows for users to see each item as they are added in real-time, and the users can continue to add as many items as they like; when done they need only close the form. This way the user never needs to leave the list itself as they are adding items. Unfortunately I did not have time to incorporate the full CRUD functionality in this way, but I may incorporate it in future edits. By focusing on the core functionality of the lists (adding and removing items and updating user scores), I was able to build the app in a "bare-bones" state, then bolt on complexities as they made sense, especially when it came to the final pieces such as Auth and user/item relationships.

In order to create a more centralized location for logic, I offloaded all API calls to one file (save for Auth-specific functions), exporting different functions as needed across the site. This made it very easy to plug-and-play different database requests wherever they were needed in the app without needing to search for them across different pages/components.

Completed App: https://imgur.com/KaMGAt3

## Difficulties and Potential Issues

Beyond the simple challenge of needing time to become familiar with React's particularities, the main issue I had to deal with was state. My app relies heavily on regular updates of the currentUser state, which is an object containing the username, "is logged in" variable, as well as the user data obtained from the database. In particular the user scores found in the header need to update in real-time and in-parallel with updates being made to the database. When I first tried to implement this functionality, I attempted to change currentUser state before sending a fetch request to update the database with the currentUser data. When I did so, the body of the fetch requests was being populated with either old data or unusable data, such as NaN or Undefined data. For some reason it seemed as if the currentUser state was not updating in time for the fetch request. This issue even stumped some of the instructors, as everything we tried either had no effect or made things worse. To circumvent this issue, I swapped my order of operations, updating the database FIRST, then updating currentUser state at the end of the associated function using the data returned to the front end by the database. I also split the currentUser data into several smaller instances of state in order to not require the use of the full state object.

Potential Issues: 
1. As of now there isn't a mechanism in place to prevent users from navigating to different pages they shouldn't have access to. Auth will keep them from accessing the database and any important data, but it won't keep them for using the URL to navigate to a page without logging in.
2. I do not have functionality built in to allow users to edit or delete their accounts once created.
3. I do not have any password recovery in place.
