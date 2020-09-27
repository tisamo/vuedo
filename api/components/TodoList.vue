<template>
    asffsaasf
</template>

<script lang="ts">
  import {Options, Vue} from 'vue-class-component';
  import {Todo} from '@/models/Todo';
  import TodoService from '@/services/todo-service';

  @Options({
    props: {
      msg: String
    }
  })
  export default class Todos extends Vue {
    todoList: Todo[] = [];
    todoService = new TodoService();

    resp: any;
    doneList: Todo[] = [];
    todoInputs = {
      name: '',
      description: ''
    };

    created() {
    this.getTodos();
    }

    getTodos() {
      this.todoService.get().subscribe(todos => {
        this.resp = todos;
      }, err => {
        console.log(err);
      });
    }


  }
</script>

<style scoped>

</style>
