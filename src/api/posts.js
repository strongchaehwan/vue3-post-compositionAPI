// axios
const posts = [
  {
    id: 1,
    title: "제목1",
    content: "내용1",
    createdAt: "2025-10-31",
  },
  {
    id: 2,
    title: "제목2",
    content: "내용2",
    createdAt: "2025-10-31",
  },
  {
    id: 3,
    title: "제목3",
    content: "내용3",
    createdAt: "2025-10-31",
  },
  {
    id: 4,
    title: "제목4",
    content: "내용4",
    createdAt: "2025-10-31",
  },
];

export function getPost() {
  return posts;
}
