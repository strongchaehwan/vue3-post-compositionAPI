<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <PostForm
      @submit.prevent="edit"
      v-model:title="form.title"
      v-model:content="form.content"
    >
      <template #actions>
        <button
          type="button"
          class="btn btn-outline-danger"
          @click="goDetailPage"
        >
          취소
        </button>

        <button class="btn btn-primary">수정</button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getPostById, updatePost } from "@/api/posts";
import PostForm from "@/components/posts/PostForm.vue";

const props = defineProps({
  id: Number,
});

// const route = useRoute();
const router = useRouter();

const form = ref({
  title: null,
  content: null,
});

const fetchPost = async () => {
  const response = await getPostById(props.id);
  // post.value = { ...response.data };
  setForm(response.data);
};
const setForm = ({ title, content, createdAt }) => {
  form.value.title = title;
  form.value.content = content;
  form.value.createdAt = createdAt;
};

fetchPost();

const edit = async () => {
  try {
    await updatePost(props.id, { ...form.value });
    router.push({
      name: "PostDetail",
      params: { id: props.id },
    });
  } catch (error) {
    console.error(error);
  }
};

const goDetailPage = () => {
  router.push({
    name: "PostDetail",
    params: {
      id: props.id,
    },
  });
};
</script>

<style lang="scss" scoped></style>
