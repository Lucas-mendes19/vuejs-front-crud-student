<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="auto">
            <template v-slot:activator="{ props }">
                <v-btn variant="plain" v-bind="props" icon>
                    <v-icon icon="mdi-delete"></v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-text>Confirmar exclusão do estudante ?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green-darken-1" variant="text" @click="dialog = false">
                        Cancelar
                    </v-btn>
                    <v-btn color="green-darken-1" variant="text" @click="handleDelete()">
                        Concordar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'DialogEditStudentView',
    props: ['id'],
    data: () => {
        return {
            dialog: false,
        }
    },
    methods: {
        handleDelete() {
            this.$store.commit('deleteStudent', this.id);
            this.dialog = false;
        }
    }
});
</script>
