<template>
    <li> <a v-on:click.self="updateTask">{{body}} &nbsp; </a> <input type="checkbox" v-model="status" /> &nbsp;
        <b style="float: right;" @click="deleteTask">X</b>
    </li>
</template>

<script>
export default {
  name: 'Task',
  props : {
      id: String,
      body: String
  },
  data() {
      return {
        status: false
      }
  },
    methods: {
        deleteTask () {
            if(confirm('Are you sure you want to delete this task?')){
                this.$emit('deleteTask', this.id);
            }

        },
        updateTask (){
            this.$emit('updateTask', this.id);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
