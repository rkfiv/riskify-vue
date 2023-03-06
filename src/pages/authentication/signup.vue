<template>
    <div class="vue-tempalte">
        <form @submit.prevent="userRegistration">
            <h3>Sign Up</h3>
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control form-control-lg" v-model="user.name" />
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control form-control-lg" v-model="user.email" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" v-model="user.password" />
            </div>
            <button type="submit" class="btn btn-dark btn-lg btn-block">
                Sign Up
            </button>
            <p class="forgot-password text-right">
                Already registered
                <router-link :to="{ name: 'login' }">sign in?</router-link>
            </p>
        </form>
    </div>
</template>

<script>
import { auth, db } from '@/helpers/firebaseInit'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Add a new document in collection "cities"

export default {
    data() {
        return {
            user: {
                name: '',
                email: '',
                password: ''
            }
        };
    },
    methods: {
        userRegistration() {
            createUserWithEmailAndPassword(auth, this.user.email, this.user.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user)

                    setDoc(doc(db, "users", user.uid), {

                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error(errorMessage)
                });
        }
    }
};
</script>