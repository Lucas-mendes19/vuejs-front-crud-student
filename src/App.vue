<template>
    <v-app>
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>
// import axios from 'axios';

export default {
    name: 'App',

    data: () => ({
    //
    }),
    created() {
        this.$store.commit('setStudents');
    },
}
</script>
