
# Undo / Redo App

The project is intened to create a form that has the undo and redo functionality aka. CTRL + Z, and CTRL + Y 

## Demo

https://undo-and-redo.vercel.app/
## How I started to solve the issue?

1. Paper and pen trying to solve the issue logically.
2. Googled "undo redo angular app" and saw answers.
3. Searched using ChatGPT.
4. listed all solutions which was: \
    a. normal array and reactive forms.\
    b. using behaviour subject \
    c. using a shared service \
    d. using NgRx for complex apps \
    e. using Memento design pattern
5. chose the behaviour subject solution as the app is simple and doesn't require heavy calculations, and it's easy for others to understand the code and the idea as the shared service is not needed and the Memento pattern is used as well in complex apps like editors.


- [x]  Implementation of Undo/Redo functionality on the form using Angular.
- [x]  Integration of Undo/Redo buttons into the form interface.
- [x]  State management system to track changes and history of actions.
- [x]  Functions to handle Undo and Redo actions.
- [x]  Visual feedback to indicate the availability and execution of Undo/Redo actions.

## Implementation details

1. There're 3 main function undo, redo and a helper function addToUndoStack
2. addToUndoStack function > is the first function to be called when init the component to init the undo stack.
3. listen to changes on the form and only distinct changes and add the changes to the undo stack.
4. undo function > does the actual undo work which is poping out changes from the undo stack and resetting the form with undo value in addition to adding the popped value to the redo stack.
5. redo function > does the redo work which is by popping out the data from the redo stack and adding it to the undo stack then resetting the form value.
6. on each undo and redo function you will find a prop when resetting the form "{emitEvent:false}" this is becasue if we do 'omar' when we delete the 'r' it will be 'oma' and this will be added to the undo stack so when i do an undo it will duplicate the value of 'oma' which reflects on breaking the functionality in both undo and redo.
7. how it works behind the scene: the addToUndoStack function take a snapshot from the inserted values object to the form this is a good reason to use the reactove forms as it's better than using the template driven as you will need to hadnle everything youself.
## How test the functionality?
1. add a name you will find that the undo button is enabled when you start writing.
2. click the undo button then the name field will be delete the added name char by char.
3. this will enable the redo button so when you click redo this will add again the deleted button by the undo action.
4. try to add email, check the checkbox or select from the drop down this and try the undo and redo.

### side note
I focused on implementing the functionality and didn't add a more reusable folder structure or any components as my main focus was to implement the functionality 
