<template>
  <div class="mt-4">
    <h2>ยินดีต้อนรับสู่ Chat App</h2>
    <form class="detail-box my-5">
      <div class="form-group my-3">
        <h4>ลงทะเบียน</h4>
        <input
          type="text"
          v-model="name"
          class="form-control mb-4 mt-4"
          placeholder="Enter your Username..."
        />
        <input
          type="text"
          v-model="email"
          class="form-control mb-4"
          placeholder="Enter your Email..."
        />
        <input
          type="password"
          v-model="password"
          class="form-control mb-4"
          placeholder="Enter your Password..."
        />
        <router-link :to="{ path: '/' }">
          <h6 class="mb-3" style="font-weight: 600">กลับสู่หน้า เข้าสู่ะบบ</h6>
        </router-link>
        <button
          style="font-weight: 600"
          type="button"
          v-on:click="signup"
          class="btn btn-primary"
        >ลงทะเบียน</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "../serviecs/firebase";
import Vue from "vue";

export default {
  app: "Signup",
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    signup() {
      const auth = firebase.auth();
      const name = this.name;
      const email = this.email;
      const password = this.password;
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(async res => {
          console.log("res", res);
          // once we get the res from db then only we will save data to ls so that our local and db are in sync
          await firebase
            .firestore()
            .collection("users")
            .add({
              name,
              id: res.user.uid,
              email,
              password,
              URL: "",
              description: ""
            })
            .then(ref => {
              localStorage.setItem("id", res.user.uid);
              localStorage.setItem("name", name);
              localStorage.setItem("email", email);
              localStorage.setItem("password", password);
              localStorage.setItem("photoURL", "");
              localStorage.setItem("description", "");
              localStorage.setItem("FirebaseDocumentId", ref.id);
              this.name = "";
              this.email = "";
              this.password = "";
              this.$router.push("/chat");
            })
            .catch(err => console.log(err));
        })
        .catch(err => {
          var errorCode = err.code;
          var errormessage = err.message;
          Vue.toasted.show(errorCode).goAway(1500);
          Vue.toasted.show(errormessage).goAway(1500);
        });
    }
  }
};
</script>

<style scoped >
input[type="text"],
input[type="password"] {
  margin: 0 auto;
  width: 80%;
}
.detail-box {
  padding: 5px;
  border: 2px solid rgb(0, 0, 0);
  width: 400px;
  min-height: 250px;
  margin: 0 auto;
}
h2,
h4 {
  color: rgb(0, 0, 0);
  font-weight: 600;
}
</style>
