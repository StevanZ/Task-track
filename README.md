For this project I used the following.
For css I used a preprocessor,scss. He enabled me to easily structure css, as well as mixins, loops and a lot of other things.
For the global state I used the redux toolkit.
For some simpler states I used react context. Let's say for opening and closing modals in different places in the project.
The application is written in Typescript. I used types and interfaces from it to build models.
I have implemented drag and drop functionality, but todoist does not support sending the reordered balance. Or at least I didn't find it.
Also, todoist does not support setting the person in charge of the task, as well as marking the task as a completed. Todoist has an option to close a task, but it does not have an option to retrieve all tasks, only the active ones.so I managed in another way. I sent that information through property labels. It's not the best solution, but it's purely for demonstration purposes.
The application has the options of adding a task, deleting it, editing any part of the task, as well as completing and setting it to an active task again.
We have filters to search by task status as well as by the person to whom the task is assigned.
I made the project with VITE.
