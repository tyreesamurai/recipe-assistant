<script lang="ts" setup>
import Menubar from 'primevue/menubar'
import router from '@/router'

const items = [
  {
    label: 'Home',
    icon: 'pi pi-fw pi-home',
    command: () => {
      router.push('/')
    },
  },
  {
    label: 'Create',
    icon: 'pi pi-fw pi-plus',
    command: () => {
      router.push('/create')
    },
  },
  {
    label: 'Planner',
    icon: 'pi pi-fw pi-calendar',
    command: () => {
      router.push('/planner')
    },
  },
  {
    label: 'Shopping List',
    icon: 'pi pi-fw pi-shopping-cart',
    command: () => {
      router.push('/shopping-list')
    },
  },
]
</script>

<template>
  <Menubar :model="items"> </Menubar>
</template>
