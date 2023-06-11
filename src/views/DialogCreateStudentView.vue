<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="1024">
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" prepend-icon="mdi-account-plus" color="primary" variant="outlined" class="mb-2">
                    Criar Estudante
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">Estudante</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form ref="form">
                            <v-row>
                                <v-col cols="12" sm="12">
                                    <v-text-field label="Nome" v-model="student.name" fast-fail @submit.prevent
                                        :rules="[rules.required]" variant="outlined" required></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6">
                                    <v-text-field label="Data de Nacimento*" v-model="student.birthDate" variant="outlined"
                                        :rules="[rules.required]" required type="date"></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6">
                                    <v-text-field label="CPF" v-model="student.cpf" variant="outlined"
                                        v-mask="'###.###.###-##'" :rules="[rules.required, rules.cpf]" required></v-text-field>
                                </v-col>

                                <v-divider v-divider :thickness="2" color="info"></v-divider>

                                <v-col cols="12">
                                    <v-subheader>Endereço</v-subheader>
                                </v-col>

                                <v-col cols="6" sm="6">
                                    <v-text-field label="Rua/Avenida" v-model="student.address.road" variant="outlined"
                                        :rules="[rules.required]" required></v-text-field>
                                </v-col>

                                <v-col cols="6" sm="6">
                                    <v-text-field label="Bairro" v-model="student.address.district" variant="outlined"
                                        :rules="[rules.required]" required></v-text-field>
                                </v-col>

                                <v-col cols="6" sm="6">
                                    <v-text-field label="Cidade" v-model="student.address.city" variant="outlined"
                                        :rules="[rules.required]" required></v-text-field>
                                </v-col>

                                <v-col cols="6" sm="6">
                                    <v-select label="Estado" :items="[
                                        'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espirito Santo', 'Goiás', 'Maranhão',
                                        'Mato Grosso do Sul', 'Mato Grosso', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro',
                                        'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
                                    ]" variant="outlined" v-model="student.address.state"></v-select>
                                </v-col>

                                <v-col cols="6" sm="6">
                                    <v-text-field label="Número" v-model="student.address.number" variant="outlined"
                                        :rules="[rules.required]" required></v-text-field>
                                </v-col>

                                <v-col cols="6" sm="6">
                                    <v-text-field label="Complemento" v-model="student.address.complement"
                                        :rules="[rules.required]"  variant="outlined" required></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                        Fechar
                    </v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="validate">
                        Criar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'DialogCreateStudentView',
    props: ['students'],
    data: () => {
        return {
            dialog: false,
            student: {
                name: '',
                birthDate: '',
                cpf: '',
                address: {
                    road: '',
                    district: '',
                    city: '',
                    state: 'Minas Gerais',
                    number: '',
                    complement: ''
                }
            },
            valid: false,
            firstname: '',
            lastname: '',
            rules: {
                required: value => !!value || 'O campo é obrigatório.',
                cpf: value => (value.length === 14) || 'Cpf inválido.'
            }
        }
    },
    methods: {
        async validate () {
            const { valid } = await this.$refs.form.validate()

            if (valid) {
                this.$store.commit('createStudent', this.student);
                this.dialog = false;
            }
        }
    }
});
</script>