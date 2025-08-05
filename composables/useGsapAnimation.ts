import { onMounted, onUnmounted } from 'vue'
import gsap, { GSAPTween } from 'gsap'

type GsapOptions = {
    from?: gsap.TweenVars
    to?: gsap.TweenVars
    duration?: number
    delay?: number
    trigger?: boolean
}

export function useGsapAnimation(
    el: Ref<HTMLElement | null>,
    options: GsapOptions
) {
    let tween: GSAPTween | null = null

    onMounted(() => {
        if (!el.value) return

        tween = gsap.fromTo(
            el.value,
            options.from || { opacity: 0, y: 20 },
            {
                ...options.to,
                duration: options.duration || 0.8,
                delay: options.delay || 0,
                ease: 'power2.out',
            }
        )
    })

    onUnmounted(() => {
        tween?.kill()
    })
}


// ----------- use in component

// <template>
//   <div ref="boxRef" class="fade-in-box">
//     Add modal or any box which show with fade
//   </div>
//   </template>
//
//   <script setup lang="ts">
// import { ref } from 'vue'
// import { useGsapAnimation } from '@/composables/useGsapAnimation'
//
// const boxRef = ref<HTMLElement | null>(null)
//
// useGsapAnimation(boxRef, {
//     from: { opacity: 0, y: 50 },
//     to: { opacity: 1, y: 0 },
//     duration: 1,
// })
// </script>