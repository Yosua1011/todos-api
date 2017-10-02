<template>
  <footer class="page-footer">
      <div class="container">
        <div class="row">
          <div class="col l6 s12">
             <a href="#"><img src="../assets/logo.png" alt="logo" style="width:130px;"></a>
             <ul class="right hide-on-med-and-down" style="padding-right:30px;">
                <li>Welcome Home: <b>{{ myname }}</b></li>
                <!-- <ul>{{ todoslist }}</ul> -->
                <li><a style="cursor:pointer" type="cursor" @click="doLogout">Logout</a></li>
             </ul>
             <div v-for="(todos, index) in todoslist" :key="todos"> {{ todos }}</div>
          </div>
        </div>
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
    props: ['alltodos'],
    data () {
      return {
        myname: localStorage.getItem('name'),
        todoslist: [{}]
      }
    },
    methods: {
      doLogout () {
        localStorage.clear()
        this.$router.push('/')
      },
      getTodo () {
        var userid = localStorage.getItem('userid')
        axios.get(`http://localhost:3000/todos/${userid}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(result => {
          this.todoslist = result.data
        })
      }
    },
    created () {
      this.getTodo()
    }
  }
</script>