<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />

    <PostFilter
      v-model:title="params.title_like"
      v-model:limit="params._limit"
    />

    <hr class="my-4" />

    <AppGrid :items="posts">
      <template v-slot="{ item }">
        <PostItem
          :title="item.title"
          :content="item.content"
          :created-at="item.createdAt"
          @click="goPage(item.id)"
        ></PostItem>
      </template>
    </AppGrid>

    <AppPagination
      :current-page="params._page"
      :page-count="pageCount"
      @page="(page) => (params._page = page)"
    />

    <template v-if="posts && posts.length > 0">
      <hr class="my-5" />
      <AppCard>
        <PostDetailView :id="posts[0].id"></PostDetailView>
      </AppCard>
    </template>
  </div>
</template>

<script setup>
import PostFilter from "@/components/posts/PostFilter.vue";
import AppGrid from "@/components/AppGrid.vue";
import PostItem from "@/components/posts/PostItem.vue";
import AppPagination from "@/components/AppPagination.vue";
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

// 페이지 개수
const pageCount = computed(() =>
  // eslint-disable-next-line prettier/prettier
  Math.ceil(totalCount.value / params.value._limit)
);

// 데이터 리스트 불러오기
const fetchPosts = async () => {
  try {
    const response = await getPost(params.value);
    posts.value = response.data;
    totalCount.value = response.headers["x-total-count"];
  } catch (error) {
    console.error(error);
  }
};

// 페이지가 이동할떄마다 데이터를 불러와야됨
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
