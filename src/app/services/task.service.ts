import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  private tasks: Task[] = [];
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  private currentId = 1;

  constructor() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }

  //Obtenemos los atributos de la clase
  getTasks(filter: 'all' | 'completed' | 'pending' = 'all'): Task[] {
    if (filter === 'completed') {
      return this.tasks.filter(task => task.completed);
    } else if (filter === 'pending') {
      return this.tasks.filter(task => !task.completed);
    }
    return this.tasks;
  }

  //Agregamos una nueva tarea
  addTask(title: string): void {
    this.tasks.push({ id: this.currentId++, title, completed: false });
  }

  //Listamos las tareas
  toggleTaskCompleted(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.updateTasks();
    }
  }

  //Eliminamos una tarea
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  //Actualizamos una tarea
  private updateTasks(): void {
    this.tasksSubject.next([...this.tasks]);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}