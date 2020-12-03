<template>
  <div class="main">
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-60">
        <md-field>
          <md-select
            v-model="userType"
            name="user_type"
            id="user_type"
            @md-selected="onUserTypeChange"
            placeholder="User Type"
          >
            <md-option value="all">All</md-option>
            <md-option value="aemg">AEMG User</md-option>
            <md-option value="guest">Guest User</md-option>
          </md-select>
        </md-field>
      </div>
    </div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-60">
        <md-table md-card>
          <md-table-toolbar>
            <h1 class="md-title">Users</h1>
          </md-table-toolbar>
          <md-table-row v-for="user in users" v-bind:key="user.id">
            <md-table-cell md-numeric>{{user.id}}</md-table-cell>
            <md-table-cell>{{user.user_name}}</md-table-cell>
            <md-table-cell>{{user.email}}</md-table-cell>
            <md-table-cell>{{user.password}}</md-table-cell>
            <md-table-cell>{{user.date === null ? 'Null' : user.date}}</md-table-cell>
          </md-table-row>
        </md-table>
      </div>
      <div class="md-layout-item md-size-40">
        <form novalidate class="md-layout" @submit.prevent="validateUser">
          <md-card class="md-layout-item md-size-100 md-small-size-100">
            <md-card-header>
              <div class="md-title">Users</div>
            </md-card-header>

            <md-card-content>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('name')">
                    <label for="name">Name</label>
                    <md-input
                      name="name"
                      id="name"
                      autocomplete="name"
                      v-model="form.name"
                      :disabled="sending"
                    />
                    <span class="md-error" v-if="!$v.form.name.required">The name is required</span>
                    <span class="md-error" v-else-if="!$v.form.name.minlength">Invalid name</span>
                  </md-field>
                </div>
              </div>

              <md-field :class="getValidationClass('email')">
                <label for="email">Email</label>
                <md-input
                  type="email"
                  name="email"
                  id="email"
                  v-model="form.email"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
              </md-field>

              <md-field :class="getValidationClass('password')">
                <label for="email">Password</label>
                <md-input
                  name="password"
                  id="password"
                  v-model="form.password"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
                <span class="md-error" v-else-if="!$v.form.password">Invalid password</span>
              </md-field>

              <md-field>
                <label for="new_user_type">User Type</label>
                <md-select v-model="selectedType" name="new_user_type" id="new_user_type" @md-selected="onNewUsertypeChange">
                  <md-option value="aemg">AEMG User</md-option>
                  <md-option value="guest">Guest</md-option>
                </md-select>
              </md-field>

              <md-datepicker v-if="selectedType !== 'aemg'" v-model="selectedExpireDate">
                <label>Select Expire Date</label>
              </md-datepicker>
            </md-card-content>

            <md-progress-bar md-mode="indeterminate" v-if="sending" />

            <md-card-actions>
              <md-button type="submit" class="md-primary md-raised" v-on:click="createNewUser" :disabled="sending">Create user</md-button>
            </md-card-actions>
          </md-card>

          <md-snackbar :md-active.sync="userSaved">
            The user {{ lastUser }} was saved with success!
          </md-snackbar>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import { validationMixin } from 'vuelidate';
import {
  required,
  email,
  minLength,
  maxLength,
} from 'vuelidate/lib/validators';
import axios from 'axios';
import dayjs from 'dayjs';

Vue.use(VueMaterial);

export default {
  name: 'Table',
  mixins: [validationMixin],
  props: {
    msg: String,
  },
  data() {
    return {
      users: [],
      userType: 'aemg',
      sending: false,
      form: {
        name: '',
        email: '',
        passowrd: '',
      },
      userSaved: false,
      lastUser: '',
      selectedType: 'guest',
      selectedExpireDate: dayjs().format('YYYY-MM-DD'),
    };
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(50),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    getValidationClass() {
      return 1;
    },
    createNewUser() {
      axios.post('http://localhost:3000/create_user', {
        params: {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
          date: this.selectedExpireDate,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async fetchUsers() {
      await axios.get('http://localhost:3000/fetch_users')
        .then((res) => {
          this.users = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    onUserTypeChange(val) {
      if (val === 'all') {
        this.fetchUsers();
      }

      if (val === 'aemg') {
        this.fetchUsers();
        this.users = this.users.filter((user) => user.date === null);
      }

      if (val === 'guest') {
        this.fetchUsers().then(() => {
          this.users = this.users.filter((user) => user.date !== null);
        });
      }
    },
    onNewUsertypeChange(val) {
      if (val === 'aemg') {
        this.selectedExpireDate = null;
      }

      if (val === 'guest') {
        this.selectedExpireDate = dayjs().format('YYYY-MM-DD');
      }
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.main {
  margin: 60px;
}
</style>
