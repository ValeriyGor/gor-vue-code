import { ref, watch } from 'vue'

export function useDebounce<T>(value: T, delay = 300) {
    const debounced = ref(value) as { value: T }

    let timeout: ReturnType<typeof setTimeout>

    watch(
        () => value,
        (newVal) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                debounced.value = newVal
            }, delay)
        },
        { immediate: true }
    )

    return debounced
}

// ------------ Use composable in component

// const search = ref('')
// const debouncedSearch = useDebounce(search.value, 500)
//
// watch(debouncedSearch, (val) => {
//     fetchData(val)
// })