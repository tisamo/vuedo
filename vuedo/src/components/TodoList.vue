<template>
    <div class="row h-100">
        <div class="col-4 h-100">
            <h3>Create Todo</h3>
            <form class="h-100"
                  @submit="createTodo"
            >
                <div class="row text-center">
                    <div class="col-10  marg-form">
                        <input class="form-control"
                               v-model="formControls.name"/>
                    </div>
                </div>
                <div class="row text-center">
                    <div class="col-10  marg-form">
                        <input class="form-control"
                               v-model="formControls.description"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-10 marg-form text-center">
                        <b-button class="btn btn-dark"
                                type="submit">Create Todo
                        </b-button>
                    </div>
                </div>
            </form>
        </div>
        <div class="col-4 h-100 border-green">
            <h3>Todo List</h3>
            <div class="row list-item"
                 v-for="todo in todoList"
                 :key="todo.id">
                <div class="col-3">
                    {{todo.id}}
                </div>
                <div class="col-3">
                    {{todo.name}}
                </div>
                <div class="col-3"
                     @click="addToDoneList(todo.id)">
                    <v-icon>{{svgTo}}</v-icon>
                </div>
                <div class="col-3"
                     @click="deleteTodo(todo.id)">
                    <v-icon>{{deleteItem}}</v-icon>
                </div>
            </div>
        </div>
        <div class="col-4 h-100 ">
            <h3>Done List</h3>
            <div class="row"
                 v-for="todo in doneList"
                 :key="todo.id">
                <div class="col-3">
                    {{todo.id}}
                </div>
                <div class="col-3">
                    {{todo.name}}
                </div>
                <div class="col-3"
                     @click="addTodoList(todo.id)">
                    <v-icon>{{svgBack}}</v-icon>
                </div>
                <div class="col-3"
                     @click="deleteDone(todo.id)">
                    <v-icon>{{deleteItem}}</v-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {Todo} from "@/models/Todo";
    import TodoService from "@/services/todo-service";
    import {mdiArrowLeftBold, mdiArrowRightThick, mdiDelete} from '@mdi/js';

    @Component
    export default class TodoList extends Vue {
        todoList: Todo[] = [];
        svgBack = mdiArrowLeftBold;
        svgTo = mdiArrowRightThick;
        deleteItem = mdiDelete;
        doneList: Todo[] = [];
        everyItem: Todo[] = [];
        todoService = new TodoService();
        formControls = {
            name: '',
            description: ''
        }

        mounted() {

        }

        created() {
            this.getTodos();
        }

        chooseArray(todos: Todo[]) {
            todos.forEach(todo => {
                if (todo.type === 'todo') {
                    this.todoList.push(todo);
                } else {
                    this.doneList.push(todo);
                }
            })
        }

        getTodos() {
            this.todoService.get().then(todos => {
                this.doneList = [];
                this.todoList = [];
                this.chooseArray(todos.data);
            })
        }

        validator(): boolean {
            let valid = false;
            if (this.formControls.description.length > 3 && this.formControls.name.length > 3) {
                valid = true;
            }
            return valid;
        }

        createTodo() {
            if (!this.validator()) {
                Vue.toasted.show('Invalid Inputs both must be longer than 3', {
                    action: {
                        text: 'Cancel',
                        onClick: (e, toastObject) => {
                            toastObject.goAway(0);
                        }
                    }
                })
                return;
            }
            const item = new Todo(this.formControls.name, this.formControls.description, 'todo');
            this.todoService.post(item).then(todos => {
                this.todoList = [];
                this.doneList = [];
                this.chooseArray(todos.data);
            })
        }

        deleteDone(i: number) {
            const index = this.doneList.findIndex(item => item.id = i);
            this.todoService.delete(i).subscribe(() => {
                this.doneList.splice(index, 1);
            }, err => {
                console.log(err);
            })

        }

        addTodoList(i: number) {
            const index = this.doneList.findIndex(item => item.id = i);
            const todo = this.doneList[index];
            this.todoService.put(todo).then(() => {
                this.todoList.push(this.doneList[index]);
                this.doneList.splice(index, 1);
            }).catch(err => console.log(err));

        }

        addToDoneList(i: number) {
            const index = this.todoList.findIndex(item => item.id = i);
            const todo = this.todoList[index];
            this.todoService.put(todo).then(() => {
                this.doneList.push(this.todoList[index]);
                this.todoList.splice(index, 1);
            }).catch(err => console.log(err));

        }

        deleteTodo(i: number) {
            const index = this.todoList.findIndex(item => item.id = i);
            this.todoService.delete(i).subscribe(() => {
                this.todoList.splice(index, 1);
            }, err => {
                console.log(err);
            })

        }

    }
</script>

<style scoped>
    .border-green {
        border: solid 2px forestgreen;
    }

    .list-item {
        margin-bottom: 10px;

    }

    .marg-form {
        margin-left: auto;
        margin-right: auto;
        margin-top: 15px;

    }
</style>
