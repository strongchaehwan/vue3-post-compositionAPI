<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <form @submit.prevent>
      <div class="row g-3">
        <div class="col">
          <input v-model="params.title_like" type="text" class="form-control" />
        </div>
      </div>
      <div class="col-3">
        <select v-model="params._limit" class="form-select">
          <option value="3">3개씩보기</option>
          <option value="4">4개씩보기</option>
        </select>
      </div>
    </form>
    <hr class="my-4" />
    <div class="row g-3">
      <div v-for="post in posts" :key="post.id" class="col-4">
        <PostItem
          :title="post.title"
          :content="post.content"
          :created-at="post.createdAt"
          @click="goPage(post.id)"
        ></PostItem>
      </div>
    </div>
    <nav class="mt-5" aria-label="Page navigation example">
      <ul class="pagination" justify-content-center>
        <li class="page-item">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="--params._page"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          v-for="page in pageCount"
          :key="page"
          class="page-item"
          :class="{ active: params.page === page }"
        >
          <a class="page-link" href="#" @click.prevent="params._page = page">{{
            page
          }}</a>
        </li>
        <li
          class="page-item"
          :class="{ disabled: !(params._page < pageCount) }"
        >
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="++params._page"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    <hr class="my-5" />
    <AppCard>
      <PostDetailView :id="2"></PostDetailView>
    </AppCard>
  </div>
</template>

<script setup>
import PostItem from "@/components/posts/PostItem.vue";
import PostDetailView from "./PostDetailView.vue";
import AppCard from "@/components/AppCard.vue";
import { getPost } from "@/api/posts";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { watchEffect } from "vue";

const posts = ref([]);
const router = useRouter();

// 페이징관련 데이타
const params = ref({
  _sort: "createdAt",
  _order: "desc",
  _limit: 3,
  _page: 1,
  title_like: "",
});

// 페이징관련 데이타
const totalCount = ref(0);
const pageCount = computed(() =>
  Math.ceil(totalCount.value / params.value._limit)
);

const fetchPosts = async () => {
  try {
    const response = await getPost(params.value);
    posts.value = response.data;
    totalCount.value = response.headers["x-total-count"];
  } catch (error) {
    console.error(error);
  }
};

// fetchPosts();
watchEffect(fetchPosts);

// eslint-disable-next-line prettier/prettier
const goPage = (id) => {
  //router.push(`/posts/${id}`);
  router.push({
    name: "PostDetail",
    params: {
      id,
    },
    // query: {
    //   name: "임채환",
    // },
  });
};
</script>

<style lang="scss" scoped></style>
