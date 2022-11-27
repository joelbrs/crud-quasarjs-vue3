<template>
  <q-page padding>
    <q-table
      title="Artigos"
      :rows="posts"
      :columns="columns"
      row-key="name"
    >

      <template v-slot:top>
        <span class="text-h5">Artigos</span><q-space></q-space>
        <q-btn color="primary" label="Novo" :to="{ name: 'formPosts' }" />
        <q-space />
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn icon="edit" color="info" dense @click="handleEditPosts(props.row.id)" />
          <q-btn icon="delete" color="negative" dense @click="handleDeletePosts(props.row.id)" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import postsService from 'src/services/post'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const posts = ref([])

    const { list, remove, update } = postsService()

    const columns = [
      { name: 'id', label: 'Id', field: 'id', sortable: true, align: 'left' },
      { name: 'title', label: 'Titulo', field: 'title', sortable: true, align: 'left' },
      { name: 'author', label: 'Autor', field: 'author', sortable: true, align: 'left' },
      { name: 'actions', label: 'Ações', field: 'actions', align: 'right' }
    ]

    const $q = useQuasar()
    const router = useRouter()

    const getPosts = async () => {
      try {
        const data = await list()
        posts.value = data
      }
      catch(err) {
        throw new Error(err)
      }
    }

    const handleDeletePosts = async (id) => {
      try {
        $q.dialog({
          title: 'Confirmar',
          message: 'Deseja deletar este post??',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(id)
          $q.notify({ message: 'Apagado com Sucesso', icon: 'check', color: 'positive' })

          await getPosts()
        })
      }
      catch(err) {
        $q.notify({ message: 'Erro ao apagar', icon: 'times', color: 'negative' })
      }
    }

    const handleEditPosts = (id) => {
      try {
        router.push({ name: 'formPosts', params: { id } })
      }

      catch(err) {
        $q.notify({ message: 'Erro ao atualizar', icon: 'times', color: 'negative' })
      }
    }

    onMounted(() => {
      getPosts()
    })

    return {
      posts,
      columns,
      handleDeletePosts,
      handleEditPosts
    }
  }
})
</script>
