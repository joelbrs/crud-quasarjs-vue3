<template>
  <q-page padding>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
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

export default defineComponent({
  name: 'FormPosts',

  setup() {
    const form = ref({
      title: '',
      content: '',
      author: ''
    })

    const { post } = postsService()

    const $q = useQuasar()

    const onSubmit = async () => {
      try {
        await post(form.value)

        $q.notify({ message: 'Artigo adicionado com sucesso!', icon: 'check', color: 'positive' })
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
