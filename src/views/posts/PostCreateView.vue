<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />

    <!-- 부모 자식간 양방향 데이터 바인딩을 하려면 이렇게해야함 -->
    <PostForm
      v-model:title="form.title"
      v-model:content="form.content"
      @submit.prevent="save"
    >
      <template #actions>
        <button type="button" class="btn btn-outline-dark" @click="goListPage">
          목록
        </button>

        <button class="btn btn-primary">저장</button>
      </template>
    </PostForm>

    <!-- .prevent는 새로고침막기 -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createPost } from "@/api/posts";
import PostForm from "@/components/posts/PostForm.vue";

const router = useRouter();

const form = ref({
  title: null,
  content: null,
});

const save = () => {
  try {
    const data = {
      ...form.value,
      createdAt: new Date().toLocaleDateString(),
    };
    createPost(data);
    router.push({ name: "PostList" });
  } catch (error) {
    console.error(error);
  }
};

const goListPage = () => {
  router.push({
    name: "PostList",
  });
};
</script>

<style lang="scss" scoped></style>
