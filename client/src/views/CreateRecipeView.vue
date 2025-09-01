<script setup lang="ts">
import AutoComplete from 'primevue/autocomplete'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import MultiSelect from 'primevue/multiselect'
import InputNumber from 'primevue/inputnumber'
import FloatLabel from 'primevue/floatlabel'
import IftaLabel from 'primevue/iftalabel'
import DatePicker from 'primevue/datepicker'
import { useToast } from 'primevue/usetoast'
import { ref, computed, reactive } from 'vue'

const form = reactive<RecipeForm>({
  name: '',
  description: '',
  ingredients: [],
  tags: [],
  instructions: '',
  servings: 1,
  cookingTimes: {
    prepTime: null,
    cookTime: null,
    coolTime: null,
    additionalTime: null,
    restTime: null,
    totalTime: null,
  },
  nutrition: {
    calories: null,
    fat: null,
    carbs: null,
    protein: null,
  },
  imageUrl: '',
  inputUrl: '',
})

type RecipeForm = {
  name: string
  description: string
  ingredients: IngredientRow[]
  tags: string[]
  instructions: string
  servings: number
  cookingTimes: {
    prepTime: number | null
    cookTime: number | null
    coolTime: number | null
    additionalTime: number | null
    restTime: number | null
    totalTime: number | null
  }
  nutrition: {
    calories: number | null
    fat: number | null
    carbs: number | null
    protein: number | null
  }
  imageUrl: string
  inputUrl: string
}

type IngredientRow = {
  name: string
  amount: string
  unit: string
  imageUrl: string
}

const totalTime = computed(() => {
  const prep = form.cookingTimes.prepTime ?? 0
  const cook = form.cookingTimes.cookTime ?? 0
  const cool = form.cookingTimes.coolTime ?? 0
  const additional = form.cookingTimes.additionalTime ?? 0
  const rest = form.cookingTimes.restTime ?? 0
  return prep + cook + cool + additional + rest
})

function resetForm() {
  form.name = ''
  form.description = ''
  form.ingredients = []
  form.tags = []
  form.instructions = ''
  form.servings = 1
  form.cookingTimes = {
    prepTime: null,
    cookTime: null,
    coolTime: null,
    additionalTime: null,
    restTime: null,
    totalTime: null,
  }
  form.imageUrl = ''
  form.inputUrl = ''
}

function addIngredient() {
  form.ingredients.push({ name: '', amount: '', unit: '', imageUrl: '' })
}

function removeIngredient() {
  form.ingredients.pop()
}

function validate() {
  if (!form.name.trim()) {
    return false
  }
  if (form.ingredients.length === 0) {
    return false
  }
  if (!form.instructions.trim()) {
    return false
  }
  return true
}

function onSubmit() {
  console.log('Submitting form:', form)
}
</script>

<template>
  <form class="flex flex-col gap-4 max-w-3xl" @submit.prevent="onSubmit">
    <div>
      <FloatLabel>
        <InputText id="name" v-model="form.name" class="w-full" />
        <label for="name">Recipe Name *</label>
      </FloatLabel>
    </div>
  </form>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
</style>
