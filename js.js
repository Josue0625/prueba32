// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyApCTgJHFzHzBXJXzgn1NkgI5y5Y6Dqjlw",
    authDomain: "prueba-parcial-2a78e.firebaseapp.com",
    projectId: "prueba-parcial-2a78e",
    storageBucket: "prueba-parcial-2a78e.appspot.com",
    messagingSenderId: "153465387047",
    appId: "1:153465387047:web:2a51e30d547760f747f602"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
    getFirestore,
    collection,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
    setDoc,
    onSnapshot

} from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js'
const db = getFirestore(app)
    //Si una colección no existe en la DB, ella misma crea automaticamente una nueva con el nombre de la colección enviado.
const userCollection = collection(db, 'task') // credenciales de la db, nombre de la colección.
const taskContainer = document.getElementById('tasks-container');

const savetask = (title, description) =>
    addDoc(userCollection, {
        title,
        description,
    })

const obtenerTareas = () => getDocs(userCollection);
const deleteTask = (id) => deleteDoc(doc(userCollection,id))
const tareas = document.getElementById('task-form');
const onGetTasks = (callback) => onSnapshot(userCollection, callback);

window.addEventListener('DOMContentLoaded', async(e) => {

    onGetTasks((querySnapshot) => {
        taskContainer.innerHTML = ``;
        querySnapshot.forEach((doc) => {
            const task = doc.data();
            taskContainer.innerHTML += `
            <div>
            <div class="card card-body mt-2 border-primary">
            <h3 class="h5">${task.title}</h3>
            <p>${task.description}</p>
            <div>
              <button class="btn btn-primary btn-delete" data-id="${doc.id}">
                🗑 Delete
              </button>
              <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
                🖉 Edit
              </button>
            </div>
          </div>`;

            const btnDelete = document.querySelectorAll('.btn-delete');
            btnDelete.forEach(btn => {
                btn.addEventListener('click', async(e) => {
                    await deleteTask(e.target.dataset.id)
                })
            })
        });
    });
});

tareas.addEventListener('submit', async e => {
    e.preventDefault();
    const title = tareas['task-title'];
    const description = tareas['task-description'];
    await savetask(title.value, description.value);
    await obtenerTareas();
    tareas.reset();
    title.focus();
})


//Añadira la BD

/* const userRef = await addDoc(userCollection, {
    name: 'padre',
    lastname: 'campo silva',
    age: '20'
})
console.log(userRef.id) */

//Actualizar Dato

/* updateDoc(doc(userCollection, '7LugS4rgoySQCeQKWWAx'), {
    name: 'Andres'
}) */
//deleteDoc(doc(userCollection, '8SRZnfv9RAABiGo78Eb3'))

/* setDoc(doc(userCollection, '7LugS4rgoySQCeQKWWAx'), {
    name: 'Andres',
    lastname: 'best',
}) */