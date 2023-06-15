<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="1024">
            <template v-slot:activator="{ props }">
                <v-btn variant="plain" icon class="mr-2" v-bind="props">
                    <v-icon icon="mdi-pencil" ></v-icon>
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
                                    <v-text-field :rules="[rules.required]" label="Nome" v-model="localStudent.name" variant="outlined" required></v-text-field>
                                </v-col>
    
                                <v-col cols="12" sm="6">
                                    <v-text-field :rules="[rules.required]" label="Data de Nacimento*" v-model="localStudent.birthDate" variant="outlined" required></v-text-field>
                                </v-col>
                                
                                <v-col cols="12" sm="6">
                                    <v-text-field v-mask="'###.###.###-##'" :rules="[rules.required, rules.cpf]" label="CPF" v-model="localStudent.cpf" variant="outlined" required></v-text-field>
                                </v-col>

                                <v-divider v-divider :thickness="2" color="info"></v-divider>

                                <v-col cols="12">
                                    <v-subheader>Endereço</v-subheader>
                                </v-col>

                                <v-col cols="6" sm="6">
                                    <v-text-field :rules="[rules.required]" label="Rua/Avenida" v-model="localStudent.address.road" variant="outlined" required></v-text-field>
                                </v-col>

                                <v-col cols="6" sm="6">
                                    <v-text-field :rules="[rules.required]" label="Bairro" v-model="localStudent.address.district" variant="outlined" required></v-text-field>
                                </v-col>

                                <v-col cols="6" sm="6">
                                    <v-text-field :rules="[rules.required]" label="Cidade" v-model="localStudent.address.city" variant="outlined" required></v-text-field>
                                </v-col>

                                <v-col cols="6" sm="6">
                                    <v-select
                                        :rules="[rules.required]"
                                        label="Estado"
                                        :items="[
                                            'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espirito Santo', 'Goiás', 'Maranhão',
                                            'Mato Grosso do Sul', 'Mato Grosso', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro',
                                            'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
                                        ]"
                                        variant="outlined"
                                        v-model="localStudent.address.state"
                                        ></v-select>
                                </v-col>

                                <v-col cols="6" sm="6">
                                    <v-text-field :rules="[rules.required]" label="Número" v-model="localStudent.address.number" variant="outlined" required></v-text-field>
                                </v-col>

                                <v-col cols="6" sm="6">
                                    <v-text-field label="Complemento" v-model="localStudent.address.complement" variant="outlined" required></v-text-field>
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
                    <v-btn color="blue-darken-1" variant="text" @click="handleEdit()">
                        Editar
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
    props: ['student'],
    data: () => {
        return {
            dialog: false,
            localStudent: {},
            rules: {
                required: value => !!value || 'O campo é obrigatório.',
                cpf: value => (value.length === 14) || 'Cpf inválido.'
            }
        }
    },
    created() {
        this.localStudent = JSON.parse(JSON.stringify(this.student));
    },
    methods: {
        async handleEdit() {
            const { valid } = await this.$refs.form.validate()

            if (valid) {
                this.$store.commit('editStudent', this.localStudent);
                this.dialog = false;
            }
        }
    }
});
</script>