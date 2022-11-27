import UseApi from "src/composables/UseApi";

export default function postsService() {
  const { list, post, update, remove } = UseApi(`posts`)

  return {
    list,
    post,
    update,
    remove
  }
}
