<template>
  <v-container class="pt-12 mt-12">
    <v-card class="my-12 mx-6" to="/training">
    <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_aTalnSBaLW.json"  background="transparent"  speed="1"  style="width: 200px; height: 200px; margin:auto; transform:scale(1.5);"  loop autoplay></lottie-player>
        <v-card-title style="color:black;" class="justify-center">Plan de Entrenamiento</v-card-title>
    </v-card>
    <v-card class="my-12 mx-6" to="/meal">
    <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_TmewUx.json"  background="transparent"  speed="1"  style="width: 200px; height: 200px; margin:auto;" loop autoplay></lottie-player>
        <v-card-title style="color:black;" class="justify-center">Plan Alimenticio</v-card-title>
    </v-card>
  </v-container>
</template>

<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
<script>
export default {

}
</script>

<style>

</style>