import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Task } from './model/task';
import { TaskService } from './services/task.service';
import { AddTasksComponent } from './components/add-tasks/add-tasks.component';
import { TasksListsComponent } from './components/tasks-lists/tasks-lists.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddTasksComponent, TasksListsComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  tasks: Task[] = [];
  filter: 'all' | 'completed' | 'pending' = 'all';

  constructor(private taskService: TaskService) {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.taskService.getTasks(this.filter);
  }

  addTodo(title: string) {
    this.taskService.addTask(title);
    this.loadTasks();
  }

  toggleCompleted(id: number) {
    this.taskService.toggleTaskCompleted(id);
    this.loadTasks();
  }

  deleteTodo(id: number) {
    this.taskService.deleteTask(id);
    this.loadTasks();
  }

  setFilter(filter: 'all' | 'completed' | 'pending') {
    this.filter = filter;
    this.loadTasks();
  }
}
