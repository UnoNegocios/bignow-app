<template>
    <v-container class="mt-12 pt-12">
        <v-card-subtitle class="ma-0 pa-0">
            Planes Alimenticios
        </v-card-subtitle>
        <v-card class="mt-4" v-for="(plan, index) in plans" :key="index">
            <v-row class="ma-0 pb-4">
                <div>
                    <v-card-title class="pb-1">
                        <v-icon class="mr-4">mdi-file</v-icon> Plan Alimenticio #{{plans.length - index}}
                    </v-card-title>
                    <v-card-subtitle class="ma-0 pa-0 ml-4">
                        {{monthFormat(plan.created_at.slice(5, 7))}} {{plan.created_at.slice(0, 4)}}
                    </v-card-subtitle>
                </div>
                <v-spacer/>

                <v-dialog v-model="plan.dialog" fullscreen hide-overlay transition="dialog-bottom-transition" >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn class="mt-7 mr-4" icon v-bind="attrs" v-on="on">
                            <v-icon  class="mr-4">mdi-chevron-right</v-icon>
                        </v-btn>
                    </template>
                    <v-toolbar dark color="#e12826" >
                        <v-btn icon dark @click="plan.dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Plan Alimenticio #{{plans.length - index}}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn icon target="_blank" :href="plan.file_path">
                                <v-icon color="white">mdi-download</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                        </v-toolbar>
                    <iframe :src="plan.file_path + '#toolbar=0&navpanes=0&scrollbar=0'" style="width:100vw; height:calc(100vh - 56px); border: none;"/>
                </v-dialog>
            </v-row>
        </v-card>
    </v-container>
</template>


<script>
import axios from "axios"
  export default {
    data () {
      return {
        totalPlans: 0,
        plans: [],
        loading: true,
      }
    },
    created(){
        this.getDataFromApi ()
    },
    computed:{
        currentUser(){
            return this.$store.state.currentUser.user
        }
    },
    methods:{
        monthFormat(month){
            if(month!=undefined){
                const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
                return meses[(month*1)-1]
            }   
        },
        getDataFromApi () {
            this.loading = true
            this.apiCall().then(data => {
                this.plans = data.plans
                this.totalPlans = data.total
                this.loading = false
            })
        },
        apiCall () {
            return new Promise((resolve, reject) => {
                var plans = []
                var total = 0
                axios.get(process.env.VUE_APP_BACKEND_ROUTE + "api/v1/meal_plans?filter[user.id]=" + this.currentUser.id ).then(response => {
                    plans = this.mapPlans(response.data.data)
                    total = total = response.data.meta.total
                    resolve({
                        plans,
                        total,
                    })
                })
            })
        },
        mapPlans(items){
            return items.map(id=>{return{
                file_path:id.file_path,
                created_at:id.created_at,
                dialog:false,
            }})
        }
    }
}
</script>

<style scoped>
.flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
