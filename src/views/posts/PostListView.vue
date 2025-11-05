<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />

    <!-- 부모 자식간 양방향 데이터 바인딩을 하려면 이렇게해야함 -->
    <!-- v-model을 여러개 사용할떄는 "update:속성명" 형태의 이벤트를 "defindEmits"로 정의해야 부모와 데이터 연동 가능? -->
    <PostFilter
      v-model:title="params.title_like"
      v-model:limit="params._limit"
    />

    <hr class="my-4" />

    <!-- <AppGrid :items="posts">
      <template v-slot="{ item }">
        <PostItem
          :title="item.title"
          :content="item.content"
          :created-at="item.createdAt"
          @click="goPage(item.id)"
        ></PostItem>
      </template>
    </AppGrid> -->
    <div class="row g-3">
      <div v-for="post in posts" :key="post.id" class="col-4">
        <PostItem
          :title="post.title"
          :content="post.content"
          :created-at="post.createdAt"
          @click="goPage(post.id)"
          @modal="openModal(post)"
        />
      </div>
    </div>

    <AppPagination
      :currentPage="params._page"
      :pageCount="pageCount"
      @page="(page) => (params._page = page)"
    />

    <Teleport to="#modal">
      <PostModal
        v-model="show"
        :title="modalTitle"
        :content="modalContent"
        :created-at="modalCreatedAt"
      />
    </Teleport>

    <template v-if="posts && posts.length > 0">
      <hr class="my-5" />
      <AppCard>
        <PostDetailView :id="posts[0].id"></PostDetailView>
      </AppCard>
    </template>
  </div>
</template>

<script setup>
import PostModal from "@/components/posts/PostModal.vue";
import PostFilter from "@/components/posts/PostFilter.vue";
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

// modal
const show = ref(false);
const modalTitle = ref("");
const modalContent = ref("");
const modalCreatedAt = ref("");
const openModal = ({ title, content, createdAt }) => {
  show.value = true;
  modalTitle.value = title;
  modalContent.value = content;
  modalCreatedAt.value = createdAt;
};
</script>

<style lang="scss" scoped></style>
