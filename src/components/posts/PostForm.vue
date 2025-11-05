<template>
  <form>
    <div class="mb-3">
      <label for="title" class="form-label">제목</label>
      <!-- 부모 자식간 양방향 데이터 바인딩을 하려면 이렇게해야함 -->
      <input
        :value="title"
        @input="$emit('update:title', $event.target.value)"
        type="text"
        class="form-control"
        id="title"
      />
    </div>

    <div class="mb-3">
      <label for="content" class="form-label">내용</label>
      <textarea
        :value="content"
        @input="$emit('update:content', $event.target.value)"
        class="form-control"
        id="content"
        rows="3"
      ></textarea>
    </div>

    <div class="d-flex gap-2 pt-4">
      <slot name="actions"></slot>
    </div>
  </form>
</template>

<script setup>
defineProps({
  title: String,
  content: String,
});

defineEmits(["update:title", "update:content"]);
</script>

<style scoped></style>
