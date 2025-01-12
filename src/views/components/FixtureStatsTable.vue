<template>
    <div class="card">
        <div class="card-header pb-0">
            <h6 class="text-uppercase text-secondary text-sm font-weight-bolder">Fixture Statistics</h6>
        </div>
        <div class="card-body px-0 pt-0 pb-2">
            <div v-if="loading" class="text-center my-4">
                <i class="spinner-border text-primary" role="status"></i>
                <p class="mt-2">Loading...</p>
            </div>
            <div v-else-if="statistics.length">
                <div class="table-responsive p-0">
                    <table class="table align-items-center mb-0">
                        <thead>
                            <tr>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Type</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Home Team</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Away Team</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="type in uniqueTypes" :key="type">
                                <td class="text-secondary text-xs font-weight-bold">{{ type }}</td>
                                <td class="text-center text-secondary text-xs font-weight-bold">
                                    {{ getValueForTeam('home', type) }}
                                </td>
                                <td class="text-center text-secondary text-xs font-weight-bold">
                                    {{ getValueForTeam('away', type) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-else class="text-center my-4">
                <p class="text-muted">No statistics available.</p>
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
            statistics: [], // Holds the combined statistics for home and away teams
            loading: true, // Indicates loading state
        };
    },
    computed: {
        uniqueTypes() {
            // Extract unique types from statistics
            return [...new Set(this.statistics.map((stat) => stat.type))];
        },
    },
    mounted() {
        const route = useRoute();
        const fixtureId = route.params.id; // Extract fixture ID from the route
        this.fetchFixtureDetails(fixtureId);
    },
    methods: {
        async fetchFixtureDetails(fixtureId) {
            try {
                this.loading = true; // Start loading
                const response = await axios.get(`http://localhost:5001/api/fixturedetails/${fixtureId}`);
                this.details = response.data; // Assign fetched details to `details`
                if(response.data) {
                    this.fetchFixtureStatistics(fixtureId,response.data.home_team_id, response.data.away_team_id);
                }else {
                    this.loading = false;
                }
            } catch (error) {
                console.error("Error fetching fixture details:", error);
                this.details = null; // Clear details on error
            } finally {
                this.loading = false; // Stop loading
            }
        },
        async fetchFixtureStatistics(fixtureId,homeTeamId, awayTeamId) {
            try {
                this.loading = true; // Start loading
                // Fetch home team statistics
                const homeResponse = await axios.get(
                    `http://localhost:5001/api/fixturestatistics/home/${fixtureId}/${homeTeamId}`
                );
                // Fetch away team statistics
                const awayResponse = await axios.get(
                    `http://localhost:5001/api/fixturestatistics/away/${fixtureId}/${awayTeamId}`
                );
                // Combine home and away statistics into one array
                this.statistics = [
                    ...homeResponse.data.map((stat) => ({ ...stat, teamType: "home" })),
                    ...awayResponse.data.map((stat) => ({ ...stat, teamType: "away" })),
                ];
            } catch (error) {
                console.error("Error fetching fixture statistics:", error);
                this.statistics = []; // Clear statistics on error
            } finally {
                this.loading = false; // Stop loading
            }
        },
        getValueForTeam(teamType, type) {
            // Find the value for the specified team type and stat type
            const stat = this.statistics.find(
                (stat) => stat.teamType === teamType && stat.type === type
            );
            return stat ? stat.value || "0" : "0";
        },
    },
};

</script>

<style>
/* Card header styling */
.card-header {
    background-color: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
    padding: 10px 15px;
}

/* Table Styling */
.table {
    border-spacing: 0;
    border-collapse: collapse;
    width: 100%; /* Ensure the table uses the full width of its container */
    margin: 0; /* Remove any default margin */
}

/* Adjust header styles */
.table thead th {
    background-color: #f4f6f9;
    border-bottom: 2px solid #e9ecef;
    font-weight: bold;
    text-transform: uppercase;
    text-align: left; /* Align header text to the left */
    padding: 8px 16px; /* Add consistent padding */
}

/* Adjust row spacing */
.table tbody tr {
    border-bottom: 1px solid #e9ecef;
    height: 40px; /* Reduce row height for compactness */
}

/* Align cell content to the left and adjust padding */
.table tbody td {
    text-align: left; /* Align content to the left */
    padding: 8px 16px; /* Add consistent padding */
}

/* Loader styling */
.spinner-border {
    width: 1.5rem;
    height: 1.5rem;
    border-width: 0.2em;
}

</style>
