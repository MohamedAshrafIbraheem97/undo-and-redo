import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, distinctUntilChanged, Subscription, tap } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'undoRedoApp';
  registrationForm: FormGroup; // The reactive form group
  public undoStack$ = new BehaviorSubject<any[]>([]); // Stack to keep track of form states for undo
  public redoStack$ = new BehaviorSubject<any[]>([]); // Stack to keep track of form states for redo
  private currentState = new BehaviorSubject<any>(null); // Current form state

  constructor(private fb: FormBuilder) {
    // Initialize the form with controls
    this.registrationForm = this.fb.group({
      name: [''],
      email: [''],
      newsletter: [false],
      subscription: ['']
    });
  }

  ngOnInit() {
    // Initialize the undo stack with the initial state of the form
    this.addToUndoStack(this.registrationForm.value);
    // Subscribe to form value changes
    this.registrationForm.valueChanges.pipe(
      distinctUntilChanged(), // Ensure we only process distinct changes
      tap(value => this.addToUndoStack(value)) // Add each form value to the undo stack
    ).subscribe();
  }

  // Add the current form state to the undo stack as it's the first entry
  private addToUndoStack(value: any) {
    const undoStack : any[]= this.undoStack$.getValue()
    undoStack.push(value);
    this.undoStack$.next(undoStack);    
  }

// Undo the most recent change
  undo() {
    const undoStack = this.undoStack$.getValue(); // get undo stack locally
    const redoStack = this.redoStack$.getValue(); // get redo stack locally
    if (undoStack.length > 1){ // undo only if there's data added in the form
      const valueToBePoped = undoStack.pop(); // get the last value undo value
      // set the registration form data when done an undo
      this.registrationForm.setValue(undoStack[undoStack.length -1] , {emitEvent:false})
      redoStack.push(valueToBePoped); // push the undo data to the redo stack
      this.redoStack$.next(redoStack); // next the redo data to the redo stack behavior subject
    }    
  }

// Redo the most recent undone change
  redo() {
    const undoStack = this.undoStack$.getValue(); // get undo stack data locally
    const redoStack = this.redoStack$.getValue(); // get redo stack data locally
    if (redoStack.length > 0){ // redo only if there's any input data
      const valueToBeRedo = redoStack.pop(); // pop the the recent data from the redo stack
      undoStack.push(valueToBeRedo); // push the undo data to the undo stack
      this.redoStack$.next(redoStack); // next the redo data to the redo stack behavior subject
      this.registrationForm.setValue(valueToBeRedo , {emitEvent:false}) // set the registration form data when done a redo
    }
  }
}

