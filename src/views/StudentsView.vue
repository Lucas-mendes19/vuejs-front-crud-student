<template>
    <v-card>
        <v-layout>
            <v-app-bar flat class="bg-black border-b" title="Application bar"></v-app-bar>
            <v-main style="height: 100vh;">
                <v-btn prepend-icon="mdi-account-plus" color="primary" variant="outlined" class="mb-2">
                    Criar Estudante
                </v-btn>

                <v-table fixed-header height="80vh" class="py-1 px-5">
                    <thead>
                        <tr>
                            <th class="text-left">Matrícula</th>
                            <th class="text-left">Name</th>
                            <th class="text-left">Data de Nacimento</th>
                            <th class="text-left">CPF</th>
                            <th class="text-left">Açoes</th> 
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="student in students" :key="student.registry">
                            <td>{{ student.id }}</td>
                            <td>{{ student.name }}</td>
                            <td>{{ student.birthDate }}</td>
                            <td>{{ student.cpf }}</td>
                            <td>
                                <DialogEditStudent class="d-inline" :student="student"/>

                                <v-btn variant="plain" icon>
                                    <v-icon icon="mdi-delete"></v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script>
import { defineComponent } from 'vue';
import DialogEditStudent from './DialogEditStudentView.vue';
import axios from 'axios';

export default defineComponent({
    name: 'StudentsView',
    components: {
        DialogEditStudent,
    },
    data() {
        return {
            teste: null,
            students: []
        }
    },
    async created() {
        let response = await axios.get('http://localhost:3000/api/student');
        this.students = response.data.data;
    },
    methods: {
        openModal() {
            this.modal = true;
        }
    }
});
</script>

<style>
html {
    overflow: hidden;
}
</style>    