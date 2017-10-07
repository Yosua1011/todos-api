<template>
  <footer class="page-footer">
      <div class="container">
        <div class="row">
          <div class="col l6 s12">
             <a href="#"><img src="../assets/logo.png" alt="logo" style="width:130px;"></a>
             <p>Welcome Home: <b>{{ myname }}</b></p>
             <div class="row">
              <form class="col s12">
                <div class="row">
                  <div class="input-field col s12">
                    <textarea v-model="postdata.action" id="textarea1" class="materialize-textarea"></textarea>
                    <textarea v-model="postdata.title" id="textarea1" class="materialize-textarea"></textarea>
                    <textarea v-model="postdata.date" id="textarea1" class="materialize-textarea"></textarea>
                    <textarea v-model="postdata.description" id="textarea1" class="materialize-textarea"></textarea>
                    <label for="textarea1" style="color: black">Textarea</label>
                  </div>
                  <button @click.prevent="kirimdata()" type="button">Submit</button>
                </div>
              </form>
            </div>
             <ul v-for="(todos, index) in todoslist" class="left collection" :key="todos._id" style="padding-right:30px; color:black;">
                <li class="collection-item">{{ todos.action }}</li>
                <li class="collection-item">{{ todos.title }}</li>
                <li class="collection-item">{{ todos.date }}</li>
                <li class="collection-item">{{ todos.check }}</li>
                <li class="collection-item">{{ todos.description }}</li>
                <li>
                  <button type="button" class="filled-in" id="filled-in-box test5" checked="checked" @click="editdata(todos, index)">Check</button>
                </li>
                <li><button type="button" @click="deletedata(todos._id, index)">Delete</button></li>
             </ul>
          </div>
        </div>
        <p><a style="cursor:pointer" type="cursor" @click="doLogout">Logout</a></p>
      </div>
      <div class="footer-copyright">
        <div class="container">
        © 2017 Copyright
        </div>
      </div>
  </footer>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        myname: localStorage.getItem('name'),
        todoslist: [],
        postdata: {
          action: '',
          title: '',
          date: '',
          description: '',
          check: 'undone'
        }
      }
    },
    methods: {
      doLogout () {
        localStorage.clear()
        this.$router.push('/')
      },
      getTodo () {
        axios.get(`http://localhost:3000/todos/`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(result => {
          this.todoslist = result.data
        })
      },
      kirimdata () {
        var self = this
        axios.post(`http://localhost:3000/todos/`, {
          action: self.postdata.action,
          title: self.postdata.title,
          date: self.postdata.date,
          description: self.postdata.description
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          console.log(`ini response.data ${response.data}`)
          self.todoslist.push(response.data)
        })
        .catch(err => {
          console.log(err)
        })
      },
      editdata (data, index) {
        var status = ''
        if (data.check === 'undone') {
          status = 'done'
        } else {
          status = 'undone'
        }
        var self = this
        axios.put(`http://localhost:3000/todos/${data._id}`, {
          check: status
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          console.log(self.todoslist[index])
          self.todoslist[index].check = status
          this.showAlert(index)
        })
        .catch(err => {
          console.log(err)
        })
      },
      deletedata (data, index) {
        var self = this
        axios.delete(`http://localhost:3000/todos/${data}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          self.todoslist.splice(index, 1)
        })
        .catch(err => {
          console.log(err)
        })
      },
      showAlert (index) {
        // Use sweetalret2
        this.$swal(`You just ${this.todoslist[index].check}`)
      }
    },
    created () {
      this.getTodo()
    }
  }
</script>
