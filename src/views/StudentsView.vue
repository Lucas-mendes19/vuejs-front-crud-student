<template>
    <v-card>
        <v-layout>
            <v-app-bar :elevation="2" flat class="bg-black border-b rounded-0" title="Estudantes">
                <template v-slot:append>
                    <v-btn  variant="outlined" prepend-icon="mdi-theme-light-dark" color="primary" @click="toggleTheme">Alternar tema</v-btn>
                </template>
            </v-app-bar>

            <v-main class="overflow-auto h-screen">
                <v-card-title>
                    <DialogCreateStudentView :students="this.$store.state.students" class="float-left ma-4" />
                </v-card-title>

                <v-text-field class="mx-8 mb-3" v-model="search" color="primary" variant="outlined" append-icon="mdi-magnify"
                        label="Buscar Estudante" single-line hide-details></v-text-field>
                
                <v-data-table locale="fr" fixed-header :headers="headers" :items="this.$store.state.students"
                    :search="search" show-expand class="elevation-1 overflow-auto" style="padding: 0 30px;">

                    <template v-slot:item.actions="{ item }">
                        <DialogEditStudentView class="d-inline" :student="findStundent(item.columns.id)" />

                        <DialogDeleteStudentView class="d-inline" :id="item.columns.id" />
                    </template>

                    <template v-slot:expanded-row="{ item }">
                        <tr>
                            <td :colspan="1">
                                {{ findStundent(item.raw.id).address.road }}, {{ findStundent(item.raw.id).address.number }}
                                / {{ findStundent(item.raw.id).address.complement }}
                            </td>
                            <td :colspan="1">
                                {{ findStundent(item.raw.id).address.district }}
                            </td>
                            <td :colspan="1">
                                {{ findStundent(item.raw.id).address.city }}
                            </td>
                            <td :colspan="3">
                                {{ findStundent(item.raw.id).address.state }}
                            </td>
                        </tr>
                    </template>

                </v-data-table>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script>
import { defineComponent } from 'vue';
import * as components from 'vuetify/components';
import * as labsComponents from 'vuetify/labs/components';
import { useTheme } from 'vuetify'

import DialogCreateStudentView from './DialogCreateStudentView.vue';
import DialogEditStudentView from './DialogEditStudentView.vue';
import DialogDeleteStudentView from './DialogDeleteStudentView.vue';

export default defineComponent({
    name: 'StudentsView',
    components: {
        ...components,
        ...labsComponents,
        DialogCreateStudentView,
        DialogEditStudentView,
        DialogDeleteStudentView
    },
    setup() {
        const theme = useTheme()

        return {
            theme,
            toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
        }
    },
    data() {
        return {
            search: '',
            expanded: [],
            singleExpand: false,
            headers: [
                {
                    title: 'Matrícula',
                    align: 'start',
                    key: 'id',
                    groupable: false,
                },
                { title: 'Nome', key: 'name' },
                { title: 'Data de Nacimento', key: 'birthDate' },
                { title: 'CPF', key: 'cpf' },
                { title: 'Ações', key: 'actions', sortable: false },
            ],
        }
    },
    methods: {
        openModal() {
            this.modal = true;
        },
        findStundent(id) {
            let index = this.$store.state.students.findIndex(item => item.id === id);
            return this.$store.state.students[index];
        }
    }
});
</script>

<style>
html {
    overflow: auto;
}
</style>    