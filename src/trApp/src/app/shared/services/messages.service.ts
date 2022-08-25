import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor() { }

  getCreateMessage(item: string): string {
    return `The ${item} was created successfully`;
  }

  getUpdateMessage(item: string): string {
    return `The ${item} was updated successfully`;
  }

  getDeleteMessage(item: string): string {
    return `The ${item} was deleted successfully`;
  }
}
