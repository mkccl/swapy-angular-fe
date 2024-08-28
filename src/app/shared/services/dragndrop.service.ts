import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DragndropService {

  constructor() { }

  elements: {id: number, colorClass: string}[] = [
    {id: 1, colorClass: 'bg-red-500'},
    {id: 2, colorClass: 'bg-green-500'},
    {id: 3, colorClass: 'bg-blue-500'},
    {id: 4, colorClass: 'bg-yellow-500'}
  ];

  addElementToStore(element: {id: number, colorClass: string}) {
    // Add item to store
    const elements = localStorage.getItem('elements');
    if (elements) {
      const parsedElements = JSON.parse(elements);
      // generate random id based on timestamp
      const id = new Date().getTime();

      parsedElements.push({id: id, colorClass: 'bg-blue-500'});
      localStorage.setItem('elements', JSON.stringify(parsedElements));
    }
  }

  getStore() {
    const elements = localStorage.getItem('elements');
    if (elements) {
      return JSON.parse(elements);
    } else {
      localStorage.setItem('elements', JSON.stringify(this.elements));
      return this.elements;
    }
  }

  resetStore() {
    localStorage.removeItem('elements');
    localStorage.setItem('elements', JSON.stringify(this.elements));
    window.location.reload();
  }

}
