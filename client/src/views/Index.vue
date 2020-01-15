<template>
  <div class="section section-signup page-header" :style="signupImage">
    <div class="container">
      <div class="md-layout">
        <div
          class="md-layout-item md-size-33 md-medium-size-40 md-small-size-50 md-xsmall-size-70 mx-auto text-center"
        >
          <login-card header-color="green">
            <h4 slot="title" class="card-title">Login</h4>
            <div :style="signupImage"></div>

            <p slot="description" class="description">You shall not pass.</p>
            <md-field class="md-form-group" slot="inputs">
              <md-icon>email</md-icon>
              <label>Email...</label>
              <md-input v-model="email" type="email"></md-input>
            </md-field>
            <md-field class="md-form-group" slot="inputs">
              <md-icon>lock_outline</md-icon>
              <label>Password...</label>
              <md-input v-model="password"></md-input>
            </md-field>
            <md-button slot="footer" class="md-simple md-success md-lg">
              Get Started
            </md-button>
          </login-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginCard } from "@/components";

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
    wizard: {
      type: String,
      default: require("@/assets/img/emojing_wizard_400x300.gif")
    }
  },
  data() {
    return {
      firstname: null,
      email: null,
      password: null,
      leafShow: false
    };
  },
  methods: {
    leafActive() {
      if (window.innerWidth < 768) {
        this.leafShow = false;
      } else {
        this.leafShow = true;
      }
    }
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
    wizardImage() {
      return {
        backgroundImage: `url(${this.wizard})`
      };
    }
  },
  mounted() {
    this.leafActive();
    window.addEventListener("resize", this.leafActive);
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
