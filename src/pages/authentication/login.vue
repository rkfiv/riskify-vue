<template>
    <div >
        <form @submit.prevent="signin" action="">
            <div class="form-group mb-3">
                <label class=" mb-2">Email</label>
                <input type="email" class="form-control form-control-lg" v-model="user.email" />
            </div>
            <div class="form-group mb-4">
                <label class=" mb-2">Password</label>
                <input type="password" class="form-control form-control-lg" v-model="user.password" />
            </div>
            <div class="col-auto gap-2 d-md-block">
            <button type="submit" class="btn btn-primary btn-lg authButton">
                Sign In
            </button>
        </div>
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
<style>
.authButton{
    width: 100%;
}
</style>