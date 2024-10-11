import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../model/task';
import { NgClass } from '@angular/common';

@Component({
  selector: 'tasks-lists',
  standalone: true,
  imports: [NgClass],
  templateUrl: './tasks-lists.component.html'
})
export class TasksListsComponent {

  @Input() tasks: Task[] = [];
  @Output() toggle = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  onToggleCompleted(id: number) {
    this.toggle.emit(id);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }

  onEdit(index: any) {
    this.tasks[index].edit = true;
  }
  
  onSave(index: any, newtask: any) {
    this.tasks[index].title = newtask;
    this.tasks[index].edit = false;
  }
}
