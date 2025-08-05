import { ref, computed } from 'vue'

export function usePagination(totalItems: number, itemsPerPage = 10) {
    const currentPage = ref(1)

    const totalPages = computed(() =>
        Math.ceil(totalItems / itemsPerPage)
    )

    const offset = computed(() =>
        (currentPage.value - 1) * itemsPerPage
    )

    const nextPage = () => {
        if (currentPage.value < totalPages.value) {
            currentPage.value++
        }
    }

    const prevPage = () => {
        if (currentPage.value > 1) {
            currentPage.value--
        }
    }

    const setPage = (page: number) => {
        if (page >= 1 && page <= totalPages.value) {
            currentPage.value = page
        }
    }

    return {
        currentPage,
        totalPages,
        offset,
        nextPage,
        prevPage,
        setPage,
    }
}
