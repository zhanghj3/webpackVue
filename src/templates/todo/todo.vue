<template>
  <section class="real-app">
    <!-- @keyup.enter是给enter键绑定一个事件 -->
    <input
      type="text"
      class="add-input"
      autofocus="true"
      placeholder="接下去要做什么?"
      @keyup.enter="addTodo"
    />
    <item :todo="todo" v-for="todo in filteredTodos" :key="todo.id" @del="deleteTodo" />
    <tabs :filter="filter" :todos="todos" @toggle="toggleFilter" @clearAllComplete="clearAllComplete"/>
  </section>
</template>
<script>
import Item from "@templates/todo/item";
import Tabs from "@templates/todo/tabs";

let id = 0;
export default {
  components: {
    Item,
    Tabs,
  },
  data() {
    return {
      todos: [],
      filter: "all",
    };
  },
  methods: {
    toggleFilter(state){
      this.filter = state
    },
    // e是事件event
    addTodo(e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false,
      });
      e.target.value = "";
    },
    deleteTodo(id) {
      // findIndex()方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置,
      // 方法为数组中的每个元素都调用一次函数执行
      this.todos.splice(
        this.todos.findIndex((todo) => todo.id === id),
        1
      );
    },
    clearAllComplete(){
      // 删除已经完成的，就相当于将todos里面未完成的筛选出来
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  },
  computed:{
      filteredTodos(){
        debugger
        if(this.filter === 'all'){
          return this.todos
        }
        const completed = this.filter === 'completed'
        return this.todos.filter(todo => todo.completed === completed)
      }
    }
};
</script>
<style scoped>
.real-app {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}
.add-input {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-smooth: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
</style>
