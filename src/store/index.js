import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    students: 123
  },
  getters: {

  },
  mutations: {
    setStudents(state) {
        axios.get('http://localhost:3000/api/student')
            .then(res => state.students = res.data.data)
            .catch(err => console.log(err))
    },

    createStudent(state, student) {
      axios.post('http://localhost:3000/api/student', student)
        .then((res) => state.students.push(res.data.data))
        .catch((err) => console.log(err))
    },

    editStudent(state, student) {
        const id = student.id;

        axios.put('http://localhost:3000/api/student/' + id, student)
            .then((res) => {
                let index = state.students.findIndex(item => item.id === id);  
                state.students[index] = res.data.data; 
            })
            .catch((err) => console.log(err))
    },

    deleteStudent(state, id) {
        axios.delete('http://localhost:3000/api/student/' + id)
            .then(() => {
                let filtred = state.students.filter(item => item.id !== id);  
                state.students = filtred; 
            })
            .catch((err) => console.log(err))
    }
  },
  actions: {

  },
  modules: {

  }
})
