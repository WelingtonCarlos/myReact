import "./styles.css";

export const PostCard = (props /* { title, cover, body, id } */) => {
  const post = props.post;
  return (
    <div className="post">
      <img src={post.cover} alt={post.title} />
      <div className="post-content">
        {/* <h1>{post.title}</h1> */}
        <h1>Identificação:{post.id}</h1>
        <h2>Nome:{post.name}</h2>
        <p>E-mail:{post.email}</p>
        <p>Comentário:{post.body}</p>
      </div>
    </div>
  );
};
