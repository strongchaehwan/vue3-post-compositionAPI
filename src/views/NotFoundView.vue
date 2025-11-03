<template>
  <div class="text-center py-5">
    <h2>404 NotFound</h2>
    <div class="text-muted">요청한 페이지를 찾을수없습니다.</div>
    <div class="mt-4">
      <router-link to="/">
        <button class="btn btn-primary">HOME</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped></style>
