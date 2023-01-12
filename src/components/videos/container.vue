<template>
    <v-container>
        <div>
            <v-row class="ma-0">
                <v-card-title>Pechuga</v-card-title>
                <v-divider class="mx-12 my-12"></v-divider>
            </v-row>
            <v-card class="elevation-0" max-width="100%">
                <mux-player
                    stream-type="on-demand"
                    playback-id="P00VAEPLdXgy00Sj7eurG33tlRIKpU3ACiPsALFYFVHhY"
                    metadata-video-title="Placeholder (optional)"
                    metadata-viewer-user-id="Placeholder (optional)"
                    primary-color="#FFFFFF"
                    secondary-color="#000000">
                </mux-player>
                <v-card-subtitle style="font-weight:500;">
                Top western road trips
                </v-card-subtitle>
            </v-card>
        </div>
        
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            routine_id: this.$route.params.id,
        }
    },
    methods:{
        
    }
}
</script>

<style>

</style>