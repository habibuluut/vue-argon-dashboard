<template>
    <div class="card">
        <div class="card-header pb-0">
            <h6>Leagues</h6>
        </div>
        <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                    <thead>
                        <tr>
                            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Country Name
                            </th>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Type</th>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        <!-- Loading Placeholder Rows -->
                        <template v-if="loading">
                            <tr v-for="n in 5" :key="n">
                                <td>
                                    <div class="d-flex px-2 py-1">
                                        <div>
                                            <div class="avatar avatar-sm me-3 bg-gray-200 animate-pulse"
                                                style="width: 40px; height: 40px;"></div>
                                        </div>
                                        <div class="d-flex flex-column justify-content-center">
                                            <div class="bg-gray-200 animate-pulse mb-1"
                                                style="width: 100px; height: 14px;"></div>
                                        </div>
                                    </div>
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <div class="bg-gray-200 animate-pulse"
                                        style="width: 60px; height: 14px; margin: 0 auto;"></div>
                                </td>
                                <td class="align-middle text-center">
                                    <div class="bg-gray-200 animate-pulse"
                                        style="width: 80px; height: 14px; margin: 0 auto;"></div>
                                </td>
                            </tr>
                        </template>

                        <!-- Real Data Rows -->
                        <template v-else>
                            <tr v-for="leagues in paginatedLeagues" :key="leagues.name">
                                <td>
                                    <div class="d-flex px-2 py-1">
                                        <div>
                                            <img :src="leagues.logo" class="avatar avatar-sm me-3"
                                                :alt="leagues.name" />
                                        </div>
                                        <div class="d-flex flex-column justify-content-center">
                                            <router-link :to="`/seasons/${leagues.league_id}`"
                                                class="text-decoration-none text-dark">
                                                <h6 class="mb-0 text-sm">{{ leagues.name }}</h6>
                                            </router-link>
                                        </div>
                                    </div>
                                </td>
                                <td class="align-middle text-center">
                                    <span class="text-secondary text-xs font-weight-bold">{{ leagues.type }}</span>
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <span
                                        :class="['badge badge-sm', leagues.isactive === true ? 'bg-gradient-success' : 'bg-gradient-secondary']">
                                        {{ leagues.isactive }}
                                    </span>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- Styled Pagination Controls -->
        <div class="pagination-controls d-flex justify-content-between align-items-center px-3 py-2">
            <button class="btn btn-sm btn-outline-primary" @click="changePage(currentPage - 1)"
                :disabled="currentPage === 1">
                Previous
            </button>
            <span class="text-secondary">
                Page <strong>{{ currentPage }}</strong> of <strong>{{ totalPages }}</strong>
            </span>
            <button class="btn btn-sm btn-outline-primary" @click="changePage(currentPage + 1)"
                :disabled="currentPage === totalPages">
                Next
            </button>
        </div>
    </div>
</template>

<script>
import { useRoute } from "vue-router"; // For accessing the route params
import axios from "axios";

export default {
    data() {
        return {
            leagues: [], // Holds data from the API
            loading: true, // Indicates whether data is being loaded
            currentPage: 1, // Current page number
            pageSize: 10, // Number of items per page
        };
    },
    computed: {
        paginatedLeagues() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.leagues.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.leagues.length / this.pageSize);
        },
    },
    mounted() {
        const route = useRoute();
        const leagueId = route.params.id; // Extract `id` from the route
        this.fetchLeagues(leagueId);
    },
    methods: {
        async fetchLeagues(leagueId) {
            try {
                this.loading = true; // Start loading
                const response = await axios.get(`http://localhost:5001/api/leagues/${leagueId}`);
                this.leagues = response.data;
            } catch (error) {
                console.error("Error fetching Leagues:", error);
            } finally {
                this.loading = false; // Stop loading once data is fetched
            }
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
    },
};
</script>

<style>
.bg-gray-200 {
    background-color: #e2e8f0;
}

.animate-pulse {
    animation: pulse 1.5s infinite ease-in-out;
}

.pagination-controls {
    background-color: #f8f9fa;
    /* Light background to match the table */
    border-top: 1px solid #e9ecef;
    padding: 10px;
    border-radius: 0 0 8px 8px;
    /* Match card corner styling */
}

.pagination-controls button {
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 4px;
}

.pagination-controls button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.pagination-controls span {
    font-size: 0.875rem;
}


@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.4;
    }
}
</style>
