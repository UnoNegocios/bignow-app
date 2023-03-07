<template>
  <v-container class="mt-12 pt-12">

     <v-card-subtitle class="ma-0 pa-0">
        RUTINAS
    </v-card-subtitle>
     <v-card-title class="ma-0 pa-0">
        {{currentDay}}
    </v-card-title>

    <v-progress-linear
        v-if="loader"
        color="#e12826"
        indeterminate
        rounded
        height="6"
    ></v-progress-linear>

    <v-row class="ma-0" v-else>
        <v-card class="mt-4 px-6 pt-4 pb-3 elevation-0" style="width:100%; background:white; border-radius:10px; background-image:url('/bg-2.png'); background-size: cover;" >
            <v-card-subtitle class="ma-0 pa-0" style="font-size:12px; color:#e12826;">
                Hoy toca
            </v-card-subtitle>
            <v-card-title class="pa-0" v-for="(muscular_group, index) in divide(currentRoutine.muscular_groups)" :key="index">
                <v-row class="ma-0">
                    {{muscular_group}}
                    <v-spacer/>
                        <v-card-subtitle class="ma-0 pa-0 mt-1" style="font-size:14px;">
                            {{excercisesQuantity(muscular_group)}} ejercicios
                        </v-card-subtitle>
                </v-row>
            </v-card-title>
            
            <v-card-subtitle class="ma-0 pa-0 pt-0 mt-2">
                <v-row class="ma-0">
                    Tiempo total
                    <v-spacer/>
                    {{currentRoutine.duration}} horas
                </v-row>
            </v-card-subtitle>
            <v-card-actions class="px-0">
                <v-btn @click="openRoutine(currentRoutine)" block class="elevation-0" color="black" style="color:white!important;">
                    Ver Rutina
                </v-btn>
            </v-card-actions>
        </v-card>

        <v-card v-for="(routine, index) in routines" :key="index" class="mt-4 px-6 py-4 elevation-0" style="width:100%; border-radius:10px; background-image:url('/bg-2.png'); background-size: cover;">
            <v-card-title class="pa-0">
                <v-row class="ma-0">
                    {{routine.muscular_groups}}
                    <v-spacer/>
                    <v-btn icon @click="openRoutine(routine)">
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                </v-row>
            </v-card-title>
        </v-card>

    </v-row>

    <v-dialog v-if="exercise!=undefined" v-model="openDialogExercice" fullscreen hide-overlay transition="dialog-right-transition">
        <v-card v-if="selectedRoutine!=undefined" style="background:white;">
            <v-toolbar dark color="white" class="elevation-0">
                
                <v-btn color="white" @click="closeExercice()" icon large><v-icon color="black">mdi-chevron-left</v-icon></v-btn>
                <v-spacer/>
            </v-toolbar>

            
           
            <v-card class="elevation-0 pa-4 ma-4" max-width="100%">
                <v-card-title style="font-weight:500;" class="px-0">
                    {{exercise.title}}
                </v-card-title>
                <mux-player
                    v-if="exercise.playback_id!=null"
                    stream-type="on-demand"
                    :playback-id="exercise.playback_id"
                    metadata-video-title="Placeholder (optional)"
                    metadata-viewer-user-id="Placeholder (optional)"
                    primary-color="#FFFFFF"
                    secondary-color="#000000">
                </mux-player>
                <v-chip-group>
                    <v-chip dark color="#e12826" small v-for="category in exercise.categories" :key="category.id">{{category.name}}</v-chip>
                </v-chip-group>
                <div style="background:white; font-family:Roboto; color:black!important:" class="py-4">
                    {{exercise.description}}
                </div>
                <v-row class="ma-0 mt-2">
                    <v-spacer/>
                <v-btn class="elevation-0" @click="openNotes(exercise.notes)"><v-icon class="mr-4">mdi-notebook-edit-outline</v-icon>NOTAS</v-btn>
                </v-row>
            </v-card>

        </v-card>
    </v-dialog>

    <v-dialog v-model="openDialog" fullscreen hide-overlay transition="dialog-right-transition">
        <v-card v-if="selectedRoutine!=undefined" style="background:#eeeeee;">
            <v-toolbar dark color="#eeeeee" class="elevation-0" style="margin-bottom:0px;">
                
                <v-btn color="white" @click="closeRoutine()" icon large><v-icon color="black">mdi-chevron-left</v-icon></v-btn>
                <v-spacer/>
            </v-toolbar>

            <div v-for="(exercise, index) in selectedRoutine" :key="index">
                <v-card-title v-if="( index % bloques ) == 0 || index == 0">Bloque {{(index/bloques)+1}}</v-card-title>
                <v-card class="elevation-0 pa-4 ma-4" style="background:white;" max-width="100%">
                    <v-row class="ma-0">
                        <div>
                        <v-card-subtitle style="font-weight:500;" class="pa-0">
                        {{exercise.title}}
                        </v-card-subtitle>
                        </div>
                        <v-spacer/>
                        <v-icon class="mr-4" @click="openExercice(exercise)">mdi-chevron-right</v-icon>
                    </v-row>
                </v-card>
                <v-divider v-if="( (index+1) % bloques ) == 0" class="mb-2"/>
            </div>
        </v-card>
    </v-dialog>

    <v-dialog v-if="notes!=undefined" v-model="noteDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card class="py-4">
            <v-toolbar dark color="white" class="elevation-0">
                <v-spacer/>
                <v-btn color="white" @click="closeNotes()" icon large><v-icon color="black">mdi-chevron-down</v-icon></v-btn>
                <v-spacer/>
            </v-toolbar>
            <v-card-title>
                Bitácora de repeticiones
            </v-card-title>

            <v-row class="ma-0 mx-2" v-for="(note, index) in notes" :key="index">
                <v-card-subtitle>2023-01-05</v-card-subtitle>
                <v-spacer/>
                <v-card-subtitle v-if="index+1!=notes.length">20,18,15,10</v-card-subtitle>
                <v-text-field v-else v-model="note.reps" outlined dense class="mr-3 mt-2" label="Repeticiones"></v-text-field>
            </v-row>
            <v-card-actions class="mt-2">
                <v-spacer/>
                <v-btn rounded color="#e12826" class="elevation-0" @click="saveNote()" dark>Guardar</v-btn>
                <v-spacer/>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-snackbar :color="snackbar.color" v-model="snackbar.show" bottom style="margin-bottom:100px;">
        {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios"
  export default {
    name: 'Dashboard',
    data: () => ({
        selectedRoutine:undefined,
        openDialog:false,
        noteDialog:false,
        notes:undefined,
        exercise:undefined,
        openDialogExercice:false,
        snackbar: {
            show: false,
            message: null,
            color: null
        },
    }),
    computed:{
        currentDay(){
            var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
            return diasSemana[new Date().getDay()]
        },
        currentUser(){
            return this.$store.state.currentUser.user
        },
        routines(){
            return this.$store.state.routines.routines.details.filter(routine=>!routine.title.includes(new Date().getDay()))
        },
        bloques(){
            return this.$store.state.routines.routines.bloques
        },
        loader(){
            return this.$store.state.routines.loading
        },
        currentRoutine(){
            return this.$store.state.routines.routines.details.filter(routine=>routine.title.includes(new Date().getDay()))[0]
        }
    },
    created(){
        this.$store.dispatch('routines/getRoutines', this.currentUser.id)
    },
    methods:{
        saveNote(){
            this.$store.state.routines.routines.details.filter(detail=>detail == this.selectedRoutine)[0].exercises.filter(exercise=>exercise == this.exercise)[0].additional_data.logs = this.notes
            var editedItem = this.$store.state.routines.routines.details.filter(detail=>detail == this.selectedRoutine)[0].exercises.filter(exercise=>exercise == this.exercise).map(id=>{return{
                id:id.workout_routine_id,
                excercises_ids: id.additional_data,
            }})[0]
            axios.patch(process.env.VUE_APP_BACKEND_ROUTE + "api/v1/workout_routine_details/" + editedItem.id, editedItem).then(response=>{
                this.snackbar = {
                    message: 'Bitacora actualizada con éxito',
                    color: 'success',
                    show: true
                }
            }).catch(error => {
                this.snackbar = {
                    message: error.response.data.message,
                    color: 'error',
                    show: true
                }
            })
        },
        openNotes(notes){
            if(notes!=undefined){
                this.notes = notes.concat([{
                    date:new Date().toLocaleString("sv-SE", {timeZone: "America/Monterrey"}).slice(0,10),
                    reps:''
                }])
            }else{
                this.notes = [{
                    date:new Date().toLocaleString("sv-SE", {timeZone: "America/Monterrey"}).slice(0,10),
                    reps:''
                }]
            }
            this.noteDialog = true
        },
        closeNotes(){
            this.notes = undefined
            this.noteDialog = false
        },
        divide(item){
            return item.split(", ")
        },
        excercisesQuantity(muscular_group){
            /*for(var i = 0; this.currentRoutine.exercises.length; i++){
                if(this.currentRoutine.exercises)
            }*/
            return this.currentRoutine.exercises.filter(excercise=>excercise.categories.filter(category=>category.name == muscular_group).length>0).length
        },
        openRoutine(routine){
            this.selectedRoutine = routine.exercises.sort((a, b) => a.additional_data.index - b.additional_data.index)
            console.log(this.selectedRoutine)
            this.openDialog = true
        },
        closeRoutine(){
            this.selectedRoutine = undefined
            this.openDialog = false
        },
        openExercice(exercise){
            this.exercise = exercise
            this.openDialogExercice= true
        },
        closeExercice(){
            this.exercise = undefined
            this.openDialogExercice= false
        },
    }
  }
</script>
