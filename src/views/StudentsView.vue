<template>
    <v-card>
        <v-layout>
            <v-app-bar flat class="bg-black border-b" title="Application bar"></v-app-bar>
            <v-main style="height: 100vh;">
                <v-card-title>
                    <v-text-field color="primary" variant="outlined" append-icon="mdi-magnify" label="Buscar Estudante" single-line hide-details></v-text-field>
                </v-card-title>

                <v-card-title>
                    <v-card-title>
                        <span class="text-h5 d-inline">Estudante</span>
                    </v-card-title>

                        <DialogCreateStudentView :students="this.$store.state.students" class="float-left ma-5"></DialogCreateStudentView>
                </v-card-title>

                <v-table fixed-header height="80vh" class="px-5">
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
                        <tr v-for="student in this.$store.state.students" :key="student.id">
                            <td>{{ student.id }}</td>
                            <td>{{ student.name }}</td>
                            <td>{{ student.birthDate }}</td>
                            <td>{{ student.cpf }}</td>
                            <td>
                                <DialogEditStudentView class="d-inline" :student="student"/>

                                <DialogDeleteStudentView class="d-inline" :id="student.id"/>
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
import DialogCreateStudentView from './DialogCreateStudentView.vue';
import DialogEditStudentView from './DialogEditStudentView.vue';
import DialogDeleteStudentView from './DialogDeleteStudentView.vue';

export default defineComponent({
    name: 'StudentsView',
    components: {
        DialogEditStudentView,
        DialogCreateStudentView,
        DialogDeleteStudentView
    },
    data() {

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