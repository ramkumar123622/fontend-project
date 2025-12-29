export default function PostsPage() {
  const posts = [
    { id: 1, title: "hello" },

    { id: 2, title: "sello" },
  ];
  return (
    <div>
      {posts.map((post) => {
        return <h1 key={post.id}>{post.title}</h1>;
      })}
    </div>
  );
}
