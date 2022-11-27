<template>
  <q-page padding>
    <q-form
      @submit="onSubmit"
      class="row q-col-gutter-sm"
    >

    <q-input
        outlined
        v-model="form.title"
        label="Título"
        lazy-rules
        class="col-lg-6 col-xs-12"
        :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
    />

    <q-input
        outlined
        v-model="form.author"
        label="Autor"
        lazy-rules
        class="col-lg-6 col-xs-12"
        :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
    />

    <div class="col-lg-12 col-xs-12">
      <q-editor v-model="form.content" min-height="15rem" />
    </div>

    <div class="col-12 q-gutter-sm">
      <q-btn label="Cancelar" color="white" class="float-right" text-color="primary" :to="{ name: 'home' }"></q-btn>
      <q-btn label="Salvar" color="primary" class="float-right" icon="save" type="submit" :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"></q-btn>
    </div>

    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import postsService from 'src/services/post'
import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'FormPosts',

  setup() {
    const form = ref({
      title: '',
      content: '',
      author: ''
    })

    const { post, getById, update } = postsService()
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()

    onMounted( async () => {
      if(route.params.id) {
        const r = await getById(route.params.id)

        form.value = r
      }
    })

    const onSubmit = async () => {
      try {
        if (form.value.id) {
          await update(form.value)

          $q.notify({ message: 'Artigo atualizado com sucesso!', icon: 'check', color: 'positive' })

        } else {
          await post(form.value)

          $q.notify({ message: 'Artigo adicionado com sucesso!', icon: 'check', color: 'positive' })
        }

        router.push({ name: 'home' })
      }


      catch(err) {
        console.log(err)
      }
    }

    return {
      form,
      onSubmit
    }
  }

})
</script>

<style>

</style>
