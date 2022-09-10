import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, collection,addDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
const firebaseConfig = {
        apiKey: "AIzaSyCe_v_LZwPJ5nHGhI2I0hh5P8eWCnDRXJs",
        authDomain: "sure-9aa33.firebaseapp.com",
        projectId: "sure-9aa33",
        storageBucket: "sure-9aa33.appspot.com",
        messagingSenderId: "1082753016464",
        appId: "1:1082753016464:web:cdcb7838931e103c202e15",
        measurementId: "G-K3J11WHP2L"
      };
initializeApp(firebaseConfig);
const db=getFirestore();
const senior=collection(db,'SeniorVote')
const addVote=document.querySelector('.vote')
addVote.addEventListener('submit',(e)=>{
    e.preventDefault()
})

getDocs(senior)
.then((snapshot)=>{
    let email_list=[]
    snapshot.docs.forEach((doc) =>{
      email_list.push({...doc.data(),id:doc.id})  
    })
   console.log(email_list) 
})