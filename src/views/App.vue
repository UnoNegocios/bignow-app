<template>
  <v-app>
    <v-app-bar class="ma-0 py-3 pl-2 pr-3 elevation-0" style="height:80px;" app v-if="!account">
      <v-btn icon color="white" class="mr-2" to="/">
        <v-icon>
          mdi-apps
        </v-icon>
      </v-btn>
      <span style="font-weight:500; font-size:25px;">Hola {{currentUser.name.split(" ")[0]}}</span>
      <v-spacer/>
      <a href="/profile">
        <v-avatar size="50px" color="#e12826" style="font-size:20px; font-family:Oswald; color:white;">
          {{currentUser.name.slice(0,1)}}
        </v-avatar>
      </a>
    </v-app-bar>
    <!-- content -->
    <v-main class="pa-0" style="background:#eeeeee;">
      <v-container class="pa-0" fluid>
        <keep-alive>
          <router-view @closeDrawer="closeDrawer"></router-view>
        </keep-alive>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer:true,
    }),
    computed:{
      currentUser:{
        get(){
          return this.$store.state.currentUser.user;
        }
      },
      account(){
        if(this.$route.path == '/profile'){
          return true
        }else{
          return false
        }
      }
    },
    created(){
      this.$store.dispatch('currentUser/getUser')
    },
    methods:{
      closeDrawer: function(){
        
      },
    }
  }
</script>


<style>
.theme--light.v-list-item--active:hover::before, .theme--light.v-list-item--active::before {
    opacity: 1!important;
    border-right: 3px #e12826 solid;
    background: transparent;
}
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled), 
.theme--light.v-icon {
    color: black!important;
    font-weight: 600!important;
}
.v-list .v-list-item--active, .v-list-item--active .theme--light.v-icon, .v-application a  {
    color: #e12826!important;
    font-weight: 600!important;
}
</style>
