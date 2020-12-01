<template>
  <div class="section section-signup page-header" :style="signupImage">
    <div class="container">
      <div class="md-layout">
        <div
          class="md-layout-item md-size-50 md-medium-size-50 md-small-size-60 md-xsmall-size-80 mx-auto text-center"
        >
          <form autocomplete="on">
            <login-card header-color="green">
              <h4 slot="title" class="card-title">Login</h4>
              <p slot="description" class="description">You shall not pass.</p>
              <lottie id="doorAnimation" slot="title" :options="defaultOptions" :height="300" :width="300" v-on:animCreated="handleAnimation" />
              <md-field class="md-form-group" slot="inputs">
                <md-icon>email</md-icon>
                <label>Email...</label>
                <md-input type="email" v-model="email" autocomplete="username email"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Password...</label>
                <md-input type="password" v-model="password" autocomplete="new-password"></md-input>
              </md-field>
              <md-button
                v-show="!showSuccessAnim"
                type="submit"
                slot="footer"
                class="md-simple md-success md-lg"
                v-on:click="login"
              >
                Let me in
              </md-button>
              <lottie v-show="showSuccessAnim" id="successAnimation" slot="footer" :options="successOptions" :height="80"  v-on:animCreated="handleSuccessAnimation" />
            </login-card>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginCard } from "@/components";
import axios from "axios";
import lottie from 'lottie-web';
import * as animationData from '../assets/img/data.json';
import * as successAnimationData from '../assets/img/success.json';

export default {
  components: {
    LoginCard
  },
  name: "index",
  bodyClass: "index-page",
  props: {
    signup: {
      type: String,
      default: require("@/assets/img/profile_city.jpg")
    },
  },
  data() {
    return {
      email: '',
      password: '',
      leafShow: false,
      showSuccessAnim: false,
      defaultOptions: { 
        animationData: animationData.default,
        loop: false
      },
      successOptions: { 
        animationData: successAnimationData.default,
        loop: false
      },
      animationSpeed: 1,
      anim: {},
      successAnim: {},
      style: {
          width: '300px',
          height: '500px',
          overflow: 'hidden',
          margin: '0 auto'
      },
      isFocus: false,
    };
  },
  watch: {
    email: function() {
      this.handleInputChange();
    },
    password: function() {
      this.handleInputChange();
    }
  },
  methods: {
    leafActive() {
      if (window.innerWidth < 768) {
        this.leafShow = false;
      } else {
        this.leafShow = true;
      }
    },
    login() {
      event.preventDefault();
      let animation = this.anim;
      let successAnimation = this.successAnim;
      let headers = new Headers();
      let vm = this;
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      headers.append('Access-Control-Allow-Origin', 'http://635.aemg.com.au:60001/');
      headers.append('Access-Control-Allow-Credentials', 'true');

      if(this.email !== '' && this.password !== '') {
        axios
          .post("http://635.aemg.com.au:60001/login", {
            email: this.email,
            password: this.password,
            headers: headers
          },{withCredentials: true})
          .then(function(response) {
            // console.log(response);
            if(response.data === 'success') {
              animation.playSegments([[10,37]], true);
              successAnimation.play();
              vm.showSuccessAnim = true;

              localStorage.email = vm.email;
              localStorage.password = vm.password;
              
              setTimeout(function() {
                animation.stop();
                successAnimation.stop();
                vm.showSuccessAnim = false;
              }, 3000);

              if (window.PasswordCredential) {
                const passwordCredential = new PasswordCredential({ email: this.email, password: this.password });
                return navigator.credentials.store(passwordCredential);
              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    handleAnimation: function(anim) {
      this.anim = anim;
    },
    handleSuccessAnimation: function(anim) {
      this.successAnim = anim;
    },
    handleInputChange(){
       if(this.isFocus === false) {
        if(this.email !== '' || this.password !== '') { 
          this.anim.playSegments([[0,10]], true);
          this.isFocus = true;
        }
      } else {
        if(this.email === '' && this.password ==='') {
          this.anim.setDirection(-1);
          this.anim.playSegments([[10,0]], true);
          this.isFocus = false;
        }
      }
    },
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.image})`
      };
    },
    signupImage() {
      return {
        backgroundImage: `url(${this.signup})`
      };
    },
  },
  mounted() {
    this.leafActive();
    window.addEventListener("resize", this.leafActive);
    this.successAnim.setSpeed(0.4);
    this.successAnim.stop();
    this.anim.setSpeed(0.3);
    this.anim.stop();

    if (localStorage.email) {
      this.email = localStorage.email;
    }
    if (localStorage.password) {
      this.password = localStorage.password;
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.leafActive);
  }
};
</script>
<style lang="scss">
.section-download {
  .md-button + .md-button {
    margin-left: 5px;
  }
}

@media all and (min-width: 991px) {
  .btn-container {
    display: flex;
  }
}
</style>
