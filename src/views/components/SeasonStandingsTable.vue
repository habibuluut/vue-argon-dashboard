<template>
    <div class="card">
        <div class="card-header pb-0">
            <h6 class="text-uppercase text-secondary text-sm font-weight-bolder">League Details</h6>
        </div>
        <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                    <thead>
                        <tr>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Rank</th>
                            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Team Name</th>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Played</th>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Points</th>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Goals Diff</th>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Form</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Loading Placeholder Rows -->
                        <template v-if="loading">
                            <tr v-for="n in 5" :key="n">
                                <td>
                                    <div class="d-flex px-2 py-1">
                                        <div class="d-flex flex-column justify-content-center">
                                            <div class="bg-gray-200 animate-pulse mb-1"
                                                style="width: 40px; height: 14px;"></div>
                                        </div>
                                    </div>
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <div class="bg-gray-200 animate-pulse"
                                        style="width: 100px; height: 14px; margin: 0 auto;"></div>
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <div class="bg-gray-200 animate-pulse"
                                        style="width: 60px; height: 14px; margin: 0 auto;"></div>
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <div class="bg-gray-200 animate-pulse"
                                        style="width: 60px; height: 14px; margin: 0 auto;"></div>
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <div class="bg-gray-200 animate-pulse"
                                        style="width: 60px; height: 14px; margin: 0 auto;"></div>
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <div class="bg-gray-200 animate-pulse"
                                        style="width: 60px; height: 14px; margin: 0 auto;"></div>
                                </td>
                            </tr>
                        </template>

                        <!-- Real Data Rows -->
                        <template v-else>
                            <tr v-for="standing in standings" :key="standing.rank" class="table-row-hover">
                                <td class="text-center">
                                    <span class="text-secondary text-xs font-weight-bold">{{ standing.rank }}</span>
                                </td>
                                <td>
                                    <div class="d-flex px-2 py-1">
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="mb-0 text-sm font-weight-bold">{{ standing.team_name }}</h6>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <span class="text-secondary text-xs font-weight-bold">{{ standing.played_all }}</span>
                                </td>
                                <td class="text-center">
                                    <span class="text-secondary text-xs font-weight-bold">{{ standing.points }}</span>
                                </td>
                                <td class="text-center">
                                    <span class="text-secondary text-xs font-weight-bold">{{ standing.goals_diff }}</span>
                                </td>
                                <td class="text-center">
                                    <div class="d-flex justify-content-center">
                                        <span v-for="(char, index) in standing.form.split('')" :key="index"
                                            :class="getFormClass(char)"
                                            class="form-character text-white font-weight-bold mx-1 p-1 rounded">
                                            {{ char }}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>



<script>
import { useRoute } from "vue-router";
import axios from "axios";

export default {
    data() {
        return {
            standings: [], // Holds data from the API
            loading: true, // Indicates whether data is being loaded
        };
    },
    mounted() {
        const route = useRoute();
        const leagueId = route.params.id; // Extract `id` from the route
        const seasonYear = route.params.year; // Extract `year` from the route
        this.fetchStandings(leagueId, seasonYear);
    },
    methods: {
        async fetchStandings(leagueId, seasonYear) {
            try {
                this.loading = true; // Start loading
                const response = await axios.get(`http://localhost:5001/api/standings/${leagueId}/${seasonYear}`);
                this.standings = response.data; // Update the variable to `standings`
            } catch (error) {
                console.error("Error fetching standings:", error);
            } finally {
                this.loading = false; // Stop loading once data is fetched
            }
        },
        getFormClass(char) {
            if (char === 'W') return 'bg-success'; // Green for Win
            if (char === 'L') return 'bg-danger'; // Red for Loss
            if (char === 'D') return 'bg-warning'; // Yellow for Draw
            return ''; // Default (no color)
        },
    },
};
</script>


<style>
/* Card header styling */
.card-header {
    background-color: #f8f9fa; /* Light background */
    border-bottom: 1px solid #e9ecef; /* Border for separation */
    padding: 10px 15px;
}

/* Table Styling */
.table {
    border-spacing: 0;
    border-collapse: collapse;
}

.table thead th {
    background-color: #f4f6f9; /* Light gray header */
    border-bottom: 2px solid #e9ecef; /* Subtle border below header */
    font-weight: bold;
    text-transform: uppercase;
}

.table tbody tr {
    border-bottom: 1px solid #e9ecef; /* Border between rows */
}

.table-row-hover:hover {
    background-color: #f1f3f5; /* Subtle hover effect */
    transition: background-color 0.3s ease;
}

/* Center-align specific columns */
.text-center {
    text-align: center;
}

/* Loader styling */
.bg-gray-200 {
    background-color: #e2e8f0;
}

.animate-pulse {
    animation: pulse 1.5s infinite ease-in-out;
}

/* Form Character Styling */
.form-character {
    width: 24px;
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    text-align: center;
    border-radius: 4px;
}
.bg-success {
    color: #28a745 !important; /* Green */
}
.bg-danger {
    color: #dc3545 !important; /* Red */
}
.bg-warning {
    color: #e1ca00 !important; /* Yellow */
}


/* Subtle animation for pulse effect */
@keyframes pulse {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}

</style>
