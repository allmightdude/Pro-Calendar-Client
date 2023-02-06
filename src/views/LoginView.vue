<template>
  <div class="form">
    <FormKit
      type="form"
      id="registration-example"
      :form-class="submitted ? 'hide' : 'show'"
      submit-label="Register"
      @submit="submitHandler"
      :actions="false"
    >
      <h1>Login</h1>

      <FormKit
        type="email"
        name="email"
        label="E-Mail"
        placeholder="test@gmail.com"
        help="What's your Email?"
        validation="required|email"
      />
      <FormKit
        type="password"
        name="password"
        label="Password"
        validation="required|length:6|matches:/[^a-zA-Z]/"
        :validation-messages="{
          matches: 'Please include at least one symbol',
        }"
        placeholder="Your password"
        help="Choose a password"
      />

      <FormKit type="submit" label="Login" />
    </FormKit>
    <div v-if="submitted">
      <h2>Submission successful!</h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form {
  width: 420px;
  padding: 1.5em;
  border: 1px solid #e4e4e4;
  border-radius: 1em;
  margin: 10rem auto 1em auto;
}

button{
  background-color: #5DA3FA !important;
}
</style>
