import Vue from 'vue';
import {httpClient} from '@/services/httpClient';
import {Todo} from '@/models/Todo';
import {AxiosObservable} from 'axios-observable/dist/axios-observable.interface';
import {AxiosResponse} from "axios";

export default class TodoService {

    constructor() {

    }

    get(): Promise<AxiosResponse<Todo[]>> {
        return httpClient.get('/todos').toPromise();
    }

    post(body: Todo): Promise<AxiosResponse<Todo[]>> {
        return httpClient.post('/todos', body).toPromise();
    }

    put(body: Todo): Promise<AxiosResponse<Todo[]>> {
        return httpClient.put('/todos', body).toPromise();
    }

    delete(id: number) {
        return httpClient.delete('/todos/' + id);
    }
}
