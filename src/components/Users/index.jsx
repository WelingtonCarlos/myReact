import { PostCard } from "../PostCard";
import "./styles.css";

export const Users = ({ users }) => (
  <div className="users">
    {users.map((post) => (
      // componente importado abaixo.
      <PostCard
        post={post}
        key={post.id}
        /* title={post.title}
      body={post.body}
      id={post.id}
      cover={post.cover} */
      />
    ))}
  </div>
);
