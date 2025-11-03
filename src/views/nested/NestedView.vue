<template>
  <div>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <router-link
          class="nav-link"
          active-class="active"
          :to="{ name: 'NestedOne', replace: true }"
          >Nested One</router-link
        >
        <!-- <a class="nav-link active" aria-current="page" href="#">Nested One</a> -->
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          active-class="active"
          :to="{ name: 'NestedTwo', replace: true }"
          >Nested Two</router-link
        >
      </li>
    </ul>
    <hr class="my-4" />
    <router-view></router-view>
  </div>
</template>

<script setup></script>

<style scoped></style>
