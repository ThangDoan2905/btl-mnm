<template>
  <div class="container-fluid">
    <!-- Background animtion-->
    <div class="background">
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
    </div>
    <!-- header -->
    <header>
      <div class="logo"><span>N</span></div>
      <!-- title & content -->
      <section class="header-content">
        <div class="container py-2">
          <div class="row d-flex align-items-center justify-content-center">
            <div class="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                class="img-fluid"
                alt="Phone image"
              />
            </div>
            <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <div class="mb-4">
                <h1 class="welcome-title">Welcome</h1>
              </div>
              <form @submit.prevent="handleLogin" method="POST">
                <!-- Phone input -->
                <a-form-item
                  :validateStatus="
                    $v.phone.$error && $v.phone.$dirty ? 'error' : ''
                  "
                  :help="
                    $v.phone.$error && $v.phone.$dirty
                      ? 'Phone number must have at least ' +
                        $v.phone.$params.minLength.min +
                        ' numbers.'
                      : ''
                  "
                >
                  <a-input
                    v-model.trim="$v.phone.$model"
                    placeholder="Enter phone number"
                    type="text"
                    :class="{
                      'error-border': $v.phone.$error && $v.phone.$dirty,
                    }"
                  />
                </a-form-item>

                <!-- Password input -->
                <a-form-item
                  :validateStatus="
                    $v.password.$error && $v.password.$dirty ? 'error' : ''
                  "
                  :help="
                    $v.password.$error && $v.password.$dirty
                      ? 'Password must have at least ' +
                        $v.password.$params.minLength.min +
                        ' characters.'
                      : ''
                  "
                >
                  <a-input-password
                    v-model.trim="$v.password.$model"
                    placeholder="Enter password"
                    :iconRender="(visible) => (visible ? '👁️' : '🙈')"
                    :class="{
                      'error-border': $v.password.$error && $v.password.$dirty,
                    }"
                  />
                </a-form-item>

                <div
                  class="d-flex justify-content-around align-items-center mb-4"
                >
                  <!-- Checkbox -->
                  <a-checkbox style="color: #fff"> Remember me </a-checkbox>
                </div>
                <a-button
                  type="primary"
                  html-type="submit"
                  :loading="submitStatus === 'PENDING'"
                  block
                  class="signin-button"
                >
                  Sign in
                </a-button>
                <p class="typo__p" v-if="submitStatus === 'OK'">
                  Thanks for your submission!
                </p>
                <p class="typo__p" v-if="submitStatus === 'PENDING'">
                  Sending...
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <div>
        <a-modal
          v-model="errorModalVisible"
          title="Error"
          okText="OK"
          centered
          @ok="errorModalVisible = false"
          class="error-modal"
        >
          <p>Phone number or password is incorrect!</p>
        </a-modal>
      </div>
    </header>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      phone: "",
      password: "",
      submitStatus: null,
      errorModalVisible: false,
    };
  },
  head: {
    title() {
      return {
        inner: "Login",
      };
    },
  },
  validations: {
    phone: {
      required,
      minLength: minLength(10),
    },
    password: {
      required,
      minLength: minLength(8),
    },
  },
  methods: {
    ...mapMutations(["setUser"]),
    async handleLogin(event) {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        this.errorModalVisible = true;
      } else {
        event.preventDefault();
        const response = await axios.post(
          `${process.env.VUE_APP_URL}/auth/login`,
          {
            phone: this.phone,
            password: this.password,
          }
        );
        if (response.data.success) {
          let user = {
            name: response.data.data.name,
            role: response.data.data.role,
            id: response.data.data._id,
            auth: true,
          };
          this.setUser(user);
          localStorage.setItem("tokenSocket", response.data.token);
          this.$router.push({
            path: "/",
          });
        }
      }
    },
  },
};
</script>

<style scoped>
.container-fluid {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
  background: #fff;
}

.error-border {
  border-color: red !important;
}

.welcome-title {
  font-size: 3em;
  letter-spacing: 2px;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 1.5em;
  text-align: center;
  position: relative;
  z-index: 1;
}

.error-modal {
  text-align: center;
}

.error-modal .ant-modal-content {
  background-color: #f5222d;
  color: #fff;
}

.error-modal .ant-modal-header,
.error-modal .ant-modal-footer {
  border: none;
}

.error-modal .ant-modal-title {
  color: #fff;
}

.error-modal .ant-modal-footer {
  text-align: center;
}

.error-modal .ant-modal-footer .ant-btn-primary {
  background-color: #f5222d;
  border-color: #f5222d;
}

.error-modal .ant-modal-footer .ant-btn-primary:hover {
  background-color: #ff4d4f;
  border-color: #ff4d4f;
}

/* ============= Animation background ========= */

.background {
  background: linear-gradient(132deg, #fc415a, #591bc5, #212335);
  /* background: #ffff; */
  background-size: 400% 400%;
  animation: Gradient 15s ease infinite;
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0px;
}

.cube {
  position: absolute;
  top: 80vh;
  left: 45vw;
  width: 10px;
  height: 10px;
  border: solid 1px #d7d4e4;
  transform-origin: top left;
  transform: scale(0) rotate(0deg) translate(-50%, -50%);
  animation: cube 12s ease-in forwards infinite;
}

.cube:nth-child(2n) {
  border-color: #fff;
}

.cube:nth-child(2) {
  animation-delay: 2s;
  left: 25vw;
  top: 40vh;
}

.cube:nth-child(3) {
  animation-delay: 4s;
  left: 75vw;
  top: 50vh;
}

.cube:nth-child(4) {
  animation-delay: 6s;
  left: 90vw;
  top: 10vh;
}

.cube:nth-child(5) {
  animation-delay: 8s;
  left: 10vw;
  top: 85vh;
}

.cube:nth-child(6) {
  animation-delay: 10s;
  left: 50vw;
  top: 10vh;
}

/* ================= Header ============ */

header {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  margin: 0;
  padding: 0;
}

/* navbar */

nav {
  color: #fff;
  float: right;
  margin: 30px 90px;
}

nav ul {
  list-style: none;
}

nav ul li {
  float: left;
  transition: 0.3s;
}

nav ul li a {
  text-decoration: none;
  color: #efeef5;
  transition: 0.5;
  font-size: 15px;
  margin-left: 16px;
}

nav ul li:hover a {
  text-decoration: none;
  color: #591bc5;
}

nav ul li:hover {
  height: 45px;
  padding-top: 30px;
  margin-top: -30px;
  background: #efeef5;
  text-decoration: none;
  transform: skew(15deg);
}

/* Logo */

.logo {
  width: 35px;
  height: 35px;
  background: #efeef5;
  margin: 40px 63px;
  float: left;
  transform: rotate(-30deg);
}

.logo span {
  color: #591bc5;
  font-size: 2em;
  line-height: 1.4;
  padding-left: 5px;
  font-weight: bold;
}

/* Header content & title & button*/

.header-content {
  margin-top: 9%;
  text-align: center;
  color: #efeef5;
}

.header-content h1 {
  text-transform: uppercase;
  font-size: 3em;
  letter-spacing: 1px;
}

.header-content p {
  font-size: 20px;
  line-height: 1.5;
  margin: 20px auto;
}

.header-content button {
  justify-content: center;
  align-items: center;
  height: 40px;
  font-size: 16px;
  width: 140px;
  margin: 20px 10px;
  color: #591bc5;
  font-size: 17px;
  border: 2px solid #efeef5;
  font-weight: bold;
  background: aquamarine;
  border-radius: 20px;
  padding: 10px;
  cursor: pointer;
  transition: 0.3s;
  padding-bottom: 33px;
}

.header-content button:hover {
  background: cyan;
  color: #591bc5;
}

/* Animate Background*/

@keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

@keyframes cube {
  from {
    transform: scale(0) rotate(0deg) translate(-50%, -50%);
    opacity: 1;
  }

  to {
    transform: scale(20) rotate(960deg) translate(-50%, -50%);
    opacity: 0;
  }
}

/* css view đăng nhập */

.divider:after,
.divider:before {
  content: "";
  flex: 1;
  height: 1px;
  background: #eee;
}
</style>
