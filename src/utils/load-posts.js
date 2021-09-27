export const loadPosts = async () => {
  //const postsResponse = fetch("https://jsonplaceholder.typicode.com/posts");
  //.then((response) => response.json())
  //.then((posts) => this.setState({ posts }));
  const photosResponse = fetch("https://jsonplaceholder.typicode.com/photos");
  const usersResponse = fetch("https://jsonplaceholder.typicode.com/comments");

  const [/* posts,  */ photos, users] = await Promise.all([
    /* postsResponse ,*/ photosResponse,
    usersResponse,
  ]); // java script
  //traduzindo abaixo para json

  //const postsJson = await posts.json();
  const photosJson = await photos.json();
  const usersJson = await users.json();

  //unindo dois arrays pelo menor dos dois.
  const usersAndPhotos = usersJson.map((post, index) => {
    //postsJson
    return { ...post, cover: photosJson[index].url };
  });
  return usersAndPhotos;
};
