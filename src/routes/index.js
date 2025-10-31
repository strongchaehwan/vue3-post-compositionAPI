import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import PostCreateView from "@/views/posts/PostCreateView.vue";
import PostDetailView from "@/views/posts/PostDetailView.vue";
import PostEditView from "@/views/posts/PostEditView.vue";
import PostListView from "@/views/posts/PostListView.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: HomeView,
    name: "Home",
  },
  {
    path: "/about",
    component: AboutView,
    name: "About",
  },
  {
    path: "/posts",
    name: "PostList",
    component: PostListView,
  },
  {
    path: "/posts/create",
    name: "PostCraete",
    component: PostCreateView,
  },
  {
    path: "/posts/:id",
    name: "PostDetail",
    component: PostDetailView,
  },
  {
    path: "/posts/:id/edit",
    name: "PostEdit",
    component: PostEditView,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
