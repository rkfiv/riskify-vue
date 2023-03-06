<template>
    <div>
        <form @submit.prevent="signin" action="">
            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control form-control-lg" v-model="user.email" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" v-model="user.password" />
            </div>
            <button type="submit" class="btn btn-dark btn-lg btn-block">
                Sign In
            </button>
        </form>
    </div>
</template>
<script>
import {auth} from '@/helpers/firebaseInit'
import { signInWithEmailAndPassword} from "firebase/auth";
export default {
    data() {
        return {
            user:{
                email: "",
                password: ""
            }
        }
    },
    methods: {
        signin() {
            signInWithEmailAndPassword(auth, this.user.email, this.user.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user)
                    this.$router.push('/search/address')
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage)
                });
        }
    }
}
</script>