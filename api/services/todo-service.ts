import Vue from 'vue';
import {httpClient} from '@/services/httpClient';
import {Todo} from '@/models/Todo';
import {AxiosObservable} from 'axios-observable/dist/axios-observable.interface';

export default class TodoService {

  constructor() {

  }

  public  get(): AxiosObservable<Todo[]> {
    return httpClient.get<Todo[]>('/todo');
  }

  post(body: Todo) {
    return httpClient.post('/todo', body);
  }

  put(body: Todo) {
    return httpClient.put('/todo', body);
  }

  delete() {
    return httpClient.delete('/todo');
  }
}
