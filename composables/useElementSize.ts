import { ref, onMounted, onUnmounted } from 'vue'

export function useElementSize(elRef: Ref<HTMLElement | null>) {
    const width = ref(0)
    const height = ref(0)

    let observer: ResizeObserver | null = null

    const updateSize = (entries: ResizeObserverEntry[]) => {
        const entry = entries[0]
        width.value = entry.contentRect.width
        height.value = entry.contentRect.height
    }

    onMounted(() => {
        if (elRef.value) {
            observer = new ResizeObserver(updateSize)
            observer.observe(elRef.value)
        }
    })

    onUnmounted(() => {
        if (observer && elRef.value) {
            observer.unobserve(elRef.value)
        }
    })

    return { width, height }
}

// use in component

// <template>
//     <div ref="boxRef" class="resizable-box">
//     Ширина: {{ width }} — Высота: {{ height }}
// </div>
// </template>
//
// <script setup lang="ts">
// import { ref } from 'vue'
// import { useElementSize } from '@/composables/useElementSize'
//
// const boxRef = ref<HTMLElement | null>(null)
// const { width, height } = useElementSize(boxRef)
// </script>