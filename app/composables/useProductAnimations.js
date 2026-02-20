import { ref } from 'vue'

export const useProductAnimations = () => {
  const cartAddedMap = ref({})
  const heartPoppingMap = ref({})

  const triggerCartAdded = (id) => {
    cartAddedMap.value = { ...cartAddedMap.value, [id]: true }
    setTimeout(() => {
      const next = { ...cartAddedMap.value }
      delete next[id]
      cartAddedMap.value = next
    }, 1500)
  }

  const isCartAdded = (id) => !!cartAddedMap.value[id]

  const triggerHeartPop = (id) => {
    heartPoppingMap.value = { ...heartPoppingMap.value, [id]: true }
    setTimeout(() => {
      const next = { ...heartPoppingMap.value }
      delete next[id]
      heartPoppingMap.value = next
    }, 700)
  }

  const isHeartPopping = (id) => !!heartPoppingMap.value[id]

  return { triggerCartAdded, isCartAdded, triggerHeartPop, isHeartPopping }
}
