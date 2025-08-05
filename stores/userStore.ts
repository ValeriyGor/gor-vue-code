import { defineStore } from 'pinia'

interface User {
    id: string
    name: string
    email: string
    token: string
}

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as User | null,
        loading: false,
    }),

    getters: {
        isAuthenticated: (state) => !!state.user?.token,
        userName: (state) => state.user?.name || 'Гість',
    },

    actions: {
        async login(email: string, password: string) {
            this.loading = true
            try {
                // API Imitation
                await new Promise((res) => setTimeout(res, 500))
                this.user = {
                    id: '1',
                    name: 'ValeriyGor',
                    email,
                    token: 'mock-token-123',
                }
            } finally {
                this.loading = false
            }
        },

        logout() {
            this.user = null
        },
    },
})
