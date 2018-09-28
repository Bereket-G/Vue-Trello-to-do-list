/* eslint-disable */
<template>
  <div class="list">
    <header>{{title}} {{_taskId}} </header>
    <ul>
      <template v-for="task in Tasks">
        <Task :body=task.body :id=task.id v-bind:key="task.id" @deleteTask="deleteTask" @updateTask="updateTask"> </Task>
      </template>
    </ul>
    <NewTask :update=updateTask_ :updateId=updateTaskId_ :ListName=title :previousContent=previousContent
             :ListId=id @taskAdded="newTaskAdded" @updateTaskWithNewBody="updateTaskWithNewBody"></NewTask>
  </div>
</template>

<script>

import Task from './Task.vue'
import NewTask from './NewTask.vue'
import api from '../api'

import VueNotifications from 'vue-notifications'

export default {
  name: 'Task List Container',
  components: {
      Task,
      NewTask
  },
  props: {
      title: String,
      _taskId: String
  },
    data() {
        return {
            id: '',
            loading: false,
            Tasks: [],
            updateTask_ : false,
            updateTaskId_ : '',
            previousContent: ''
        }
    },
    methods: {
         async refreshTasks () {
            this.loading = true;
            this.Tasks = await api.getTodoListsOfTask(this._taskId);
            this.loading = false;
        },
        newTaskAdded (value) {
            let newTask = {
                body:value,
                taskListId: this._taskId
            };
            api.createTask(newTask).then( () => {
                this.refreshTasks();
                this.showSuccessMsg();
            });
        },
        deleteTask (id) {
            api.deleteTask(id).then( () => {
                this.refreshTasks();
                this.showSuccessMsg();
            });
        },
        updateTask (value){
            this.updateTask_ = true;
            this.updateTaskId_ = value;
            this.showWarnMsg();
            for(var i = 0; i < this.Tasks.length; i++) {
                if(this.Tasks[i].id == value) {
                    this.previousContent = this.Tasks[i].body;
                }
            }

        },
        updateTaskWithNewBody(newContent, Id){
            api.updateTask(Id, {
                body:newContent,
                taskListId: this._taskId
            }).then( () => {
                this.refreshTasks();
                this.updateTask_ = false;
                this.showSuccessMsg();
            });
        }
        },
        created() {
        api.getTodoListsOfTask(this._taskId).then( res => {
            this.Tasks = res;
        })
      }, notifications: {
        showSuccessMsg: {
            type: VueNotifications.types.success,
            message: 'Successful !'
        },
        showWarnMsg: {
            type: VueNotifications.types.warn,
            message: 'You are updating !'
        },
        showErrorMsg: {
            type: VueNotifications.types.error,
            message: 'Something went wrong'
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
