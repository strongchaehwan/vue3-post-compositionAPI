<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />

    <PostForm
      v-model:title="form.title"
      v-model:content="form.content"
      @submit.prevent="edit"
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
    <AppAlert
      :show="showALert"
      :message="alertMessage"
      :type="alertType"
    ></AppAlert>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getPostById, updatePost } from "@/api/posts";
import PostForm from "@/components/posts/PostForm.vue";
import AppAlert from "@/components/AppAlert.vue";

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
  try {
    const response = await getPostById(props.id);
    // post.value = { ...response.data };
    setForm(response.data);
  } catch (error) {
    console.error(error);
    vAlert("네트워크 오류!");
  }
};
const setForm = ({ title, content }) => {
  form.value.title = title;
  form.value.content = content;
};

fetchPost();

const edit = async () => {
  try {
    await updatePost(props.id, { ...form.value });
    // router.push({
    //   name: "PostDetail",
    //   params: { id: props.id },
    // });
    vAlert("수정이 완료되었습니다!", "success");
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

// alert
const showALert = ref(false);
const alertMessage = ref("");
const alertType = ref("");
// eslint-disable-next-line prettier/prettier
const vAlert = (message, type = "error") => {
  // type의 default 값은 error
  showALert.value = true;
  alertMessage.value = message;
  alertType.value = type;
  setTimeout(() => {
    showALert.value = false;
  }, 2000);
};
</script>

<style lang="scss" scoped></style>
