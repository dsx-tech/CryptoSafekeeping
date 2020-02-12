<template>
  <q-page padding>
    <ul>
      <li class="list-group-item"
      v-for="todo in todos"
      v-bind:key="todo"
      > {{ todo }}
      </li>
    </ul>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      tasks: [
        {
          id: 1,
          name: '1'
        },
        {
          id: 1,
          name: '1'
        }
      ]
    }
  }
}
</script>
