<template>
  <v-stepper v-model="currentSlide" style="height:100vh; background-color:#f4f5fa;">
    <!--v-row class="ma-0 py-8">
        <v-row/>
        <img style="width:80px;" src="/logo.png"/>
        <v-row/>
    </v-row-->
    <v-stepper-items>
      <v-stepper-content step="1">

        <v-card-title>
            <v-spacer class="hidden-md-and-down"/>
            Bienvenido(a) <strong class="ml-2">{{currentUser.name}}</strong>
            <v-spacer class="hidden-md-and-down"/>
        </v-card-title>

        <v-row class="ma-0 mb-4">
            <v-spacer/>
            <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_iegqiiek.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop autoplay></lottie-player>
            <v-spacer/>
        </v-row>

        <v-card-title class="my-0 py-0 mt-2" style="font-weight: bold; font-size: 30px;"><v-spacer class="hidden-md-and-down"/>Configura tu perfil<v-spacer class="hidden-md-and-down"/></v-card-title>
        <v-card-title class="my-0 py-0 pt-3" style="font-weight: bold; font-size: 30px;"><v-spacer class="hidden-md-and-down"/>para comenzar<v-spacer class="hidden-md-and-down"/></v-card-title>
        <v-spacer class="hidden-md-and-down"/>
        <v-card-subtitle class="mt-4 hidden-md-and-up" style="color:grey!important; font-size: 20px;">Estas a solo unos pasos</v-card-subtitle>
        <v-card-subtitle class="mt-4 hidden-md-and-down" style="color:grey!important; font-size: 20px; text-align:center;">Estas a solo unos pasos</v-card-subtitle>

      </v-stepper-content>

      <v-stepper-content step="2">

            <v-card-title class="px-0"><v-spacer/>Configura tu Contraseña<v-spacer/></v-card-title>

            <v-text-field
                
                outlined style="border-radius:5px; max-width:500px; margin:auto; display:none;" 
                dense
                type="email" 
                v-model="currentUser.email"
                label="Correo Electrónico"
                disabled>
            </v-text-field>

            <v-text-field
            class="mt-4"
                outlined style="border-radius:5px; max-width:500px; margin:auto;" 
                dense
                :type="show ? 'text' : 'password'"
                v-model="password"
                label="Contraseña"
                :rules="[required, min8]"
                :counter="8">
                <template v-slot:append>
                    <v-icon class="mt-1" small @click="show = !show" v-if="show">mdi-eye</v-icon>
                    <v-icon class="mt-1" small @click="show = !show" v-if="!show">mdi-eye-off</v-icon>
                </template>
            </v-text-field>
            <!-- password1 -->
            <v-text-field
                class="mb-0"
                    outlined style="border-radius:5px; max-width:500px; margin:auto;" dense
                :type="show1 ? 'text' : 'password'"
                v-model="password1"
                label="Verificar Contraseña"
                :rules="[required, min8, matchingPasswords ]"
                :counter="8">
                <template v-slot:append>
                    <v-icon class="mt-1" small @click="show1 = !show1" v-if="show1">mdi-eye</v-icon>
                    <v-icon class="mt-1" small @click="show1 = !show1" v-if="!show1">mdi-eye-off</v-icon>
                </template>
            </v-text-field>

            <v-row class="ma-0">
                <v-spacer/>
                <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_kmj1m9xh.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop autoplay></lottie-player>
                <v-spacer/>
            </v-row>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card-title class="px-0"><v-spacer/>Ahora una foto para tu perfil<v-spacer/></v-card-title>
        <v-row class="ma-0 my-6" id="welcome">
            <v-spacer/>
                <v-badge bordered color="rimary" dark icon="mdi-camera" overlap avatar offset-x="20" offset-y="140">
                    <v-avatar size="180px" @click="$refs.image.$refs.input.click()">
                        <v-img alt="user" :src="currentUser.profile_photo_path"></v-img>
                    </v-avatar>
                </v-badge>
                <v-file-input
                    style="display:none!important;"
                    hide-input
                    ref="image"
                    accept="image/*"
                    v-model="imageData"
                ></v-file-input>
            <v-spacer/>
        </v-row>





        <v-list style="background:#f4f5fa;">
            <v-list-item style="font-size: 20px; font-weight: 500;">
                <v-spacer/>
                {{currentUser.name}}
                <v-spacer/>
            </v-list-item>
            <v-list-item style="font-size: 18px; font-weight: 400; min-height:25px; margin-bottom:10px;">
                <v-spacer/>
                {{currentUser.email}}
                <v-spacer/>
            </v-list-item>
            <v-list-item style="min-height:25px; font-size: 16px; font-weight: 300;">
                <v-spacer/>
                81 2345 6789
                <v-spacer/>
            </v-list-item>
            <v-list-item style="min-height:25px; font-size: 16px; font-weight: 300;">
                <v-spacer/>
                1.80 cm
                <v-spacer/>
            </v-list-item>
            <v-list-item style="min-height:25px; font-size: 16px; font-weight: 300;">
                <v-spacer/>
                85 kgs
                <v-spacer/>
            </v-list-item>
            <v-list-item style="min-height:25px; font-size: 16px; font-weight: 300;">
                <v-spacer/>
                <span style="font-weight:400; margin-right:5px;">Sexo: </span> Masculino
                <v-spacer/>
            </v-list-item>
            <v-list-item style="min-height:25px; font-size: 16px; font-weight: 300;">
                <v-spacer/>
                <span style="font-weight:400; margin-right:5px;">Cumpleaños: </span> 01/01/1998
                <v-spacer/>
            </v-list-item>
            <v-list-item style="min-height:40px; font-size: 18px; font-weight: 300;">
                <v-spacer/>
                <span style="font-weight:400; margin-right:5px;">Plan: </span> 
                <v-spacer/>
            </v-list-item>
        </v-list>



      </v-stepper-content>

    </v-stepper-items>
    <div style="position:absolute; bottom:100px; width:100%;">
        <v-row class="ma-0 mb-4">
            <v-spacer/>
            <v-icon :color="iconColor(1)" x-small>mdi-record</v-icon>
            <v-icon :color="iconColor(2)" class="mx-2" x-small>mdi-record</v-icon>
            <v-icon :color="iconColor(3)" x-small>mdi-record</v-icon>
            <v-spacer/>
        </v-row>
        <v-row class="ma-0">
            <v-spacer/>
            <v-btn v-if="currentSlide<3" @click="currentSlide=currentSlide+1" class="px-12 py-6 elevation-0" color="#e12826" rounded :dark="((this.min8(this.password1) === true && this.matchingPasswords() === true)&&currentSlide==2)||currentSlide!=2" :disabled="!(this.min8(this.password1) === true && this.matchingPasswords() === true)&&currentSlide==2"><strong>Siguiente</strong></v-btn>
            <v-btn v-else @click="save()" class="px-12 py-6 elevation-0" dark color="#e12826" rounded><strong>Guardar</strong></v-btn>
            <v-spacer/>
        </v-row>
        <v-row class="ma-0 mt-3" v-if="currentSlide>1">
            <v-spacer/>
            <v-btn @click="currentSlide=currentSlide-1" class="px-12 py-6" text><strong>Atras</strong></v-btn>
            <v-spacer/>
        </v-row>
    </div>
  </v-stepper>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import axios from "axios";
export default {
    components: {
        vueDropzone: vue2Dropzone,
    },
    data () {
      return {
        currentSlide: 1,
        show: false,
        show1: false,
        password:'',
        password1:'',
        successPass: false,
        successPass1: false,
        imageData:''
      }
    },
    watch:{
        imageData:{
            handler(){     
                let formData = new FormData();
                formData.append('image', this.imageData);
                axios.post(process.env.VUE_APP_BACKEND_ROUTE + "api/v1/user/photo"
                    ,formData
                    ,{headers: {"Content-Type": "multipart/form-data"}}
                ).then(response=>{
                    this.currentUser.profile_photo_path = 'https://unopack.mx/files/thumbnail/' + response.data
                })
            },deep:true,
        }
    },
    computed:{
        currentUser(){
            return this.$store.state.currentUser.user
        }
    },
    created(){
        this.$store.dispatch('currentUser/getUser')
    },
    methods:{
        iconColor(slide){
            if(slide == this.currentSlide){
                return '#e12826'
            }else{
                return 'grey'
            }
        },
        save(){
            axios.patch(process.env.VUE_APP_BACKEND_ROUTE + "api/v1/users/" + this.currentUser.id,Object.assign(this.currentUser),{
                headers: {
                    'Authorization': "Bearer " + this.$route.query.t
                }
                }).then(response=>{
                axios.patch(process.env.VUE_APP_BACKEND_ROUTE + "api/v1/user/password", {'password':this.password},{
                headers: {
                    'Authorization': "Bearer " + this.$route.query.t
                }
                }).then(response=>{
                    window.location.replace("/");
                }).catch(error => {
                    this.snackbar = {
                        message: error.response.data.message,
                        color: 'error',
                        show: true
                    }
                })
            }).catch(error => {
                this.snackbar = {
                    message: error.response.data.message,
                    color: 'error',
                    show: true
                }
            })
        },
        required: function(value) {
            if (value) {
                return true;
            } else {
                return 'Este campo es obligatorio.';
            }
        },
        min8: function(value) {
            if (value.length >= 8) {
                return true;
            } else {
                return 'La contraseña debe tener más de 8 caracteres.';
            }
        },
        matchingPasswords: function() {
            if (this.password === this.password1) {
                return true;
            } else {
                return 'Las contraseñas no coinciden.';
            }
        },
    }
  }
</script>
<style>
.vue-dropzone {
    border: 2px solid #ffffff!important;
}
.image1{
    width: 90%;
}
.image2{
    width: 50%;
}
@media(min-width: 980px){
    .image1{
        width: 20vw;
    }
    .image2{
        width: 15vw;
        margin:20px;
    }  
}
#welcome .v-badge__badge {
    background: #e12826;
    border-radius: 50px;
    height: 35px;
    min-width: 35px;
    padding: 10px!important;
}
#welcome .theme--dark.v-badge .v-badge__badge::after {
    border-color: white;
}
</style>