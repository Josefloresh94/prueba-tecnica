import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms';

@Component({
  selector: 'add-tasks',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-tasks.component.html'
})
export class AddTasksComponent {
  newTask: string = '';

  @Output() add = new EventEmitter<string>();

  onSubmit(taskForm: NgForm) {
    if (this.newTask.trim() && taskForm.valid) {
      this.add.emit(this.newTask);
      this.newTask = '';
    }
  }
}
