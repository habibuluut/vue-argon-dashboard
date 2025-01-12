<template>
    <div class="card">
        <div class="card-header pb-0">
            <h6 class="text-uppercase text-secondary text-sm font-weight-bolder">Fixture Details</h6>
        </div>
        <div class="card-body px-0 pt-0 pb-2">
            <div v-if="loading" class="text-center my-4">
                <i class="spinner-border text-primary" role="status"></i>
                <p class="mt-2">Loading...</p>
            </div>
            <div v-else-if="details">
                <div class="table-responsive p-1">
                    <table class="table align-items-center mb-0">
                        <tbody>
                            <tr>
                                <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-10">League Name</th>
                                <td class="text-secondary text-xs font-weight-bold">{{ details.league_name }}</td>
                            </tr>
                            <tr>
                                <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-10">League Round</th>
                                <td class="text-secondary text-xs font-weight-bold">{{ details.league_round }}</td>
                            </tr>
                            <tr>
                                <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-10">Fixture Date</th>
                                <td class="text-secondary text-xs font-weight-bold">{{ formatDate(details.fixture_date) }}</td>
                            </tr>
                            <tr>
                                <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-10">Venue Name</th>
                                <td class="text-secondary text-xs font-weight-bold">{{ details.venue_name }}</td>
                            </tr>
                            <tr>
                                <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-10">Referee</th>
                                <td class="text-secondary text-xs font-weight-bold">{{ details.referee }}</td>
                            </tr>
                            <tr>
                                <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-10">Status</th>
                                <td class="text-secondary text-xs font-weight-bold">{{ details.status_long }} / {{ details.status_elapsed }}</td>
                            </tr>
                            <tr>
                                <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-10">Home Team</th>
                                <td class="text-secondary text-xs font-weight-bold">{{ details.home_team_name }}</td>
                            </tr>
                            <tr>
                                <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-10">Away Team</th>
                                <td class="text-secondary text-xs font-weight-bold">{{ details.away_team_name }}</td>
                            </tr>
                            <tr>
                                <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-10">Match Result</th>
                                <td class="text-secondary text-xs font-weight-bold">{{ details.home_team_name }} ({{ details.goals_home }}) - ({{ details.goals_away }}) {{ details.away_team_name }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-else class="text-center my-4">
                <p class="text-muted">No fixture details available.</p>
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
            details: null, // Holds fixture details from the API
            loading: true, // Indicates loading state
        };
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
            } catch (error) {
                console.error("Error fetching fixture details:", error);
                this.details = null; // Clear details on error
            } finally {
                this.loading = false; // Stop loading
            }
        },
        formatDate(dateString) {
            // Convert the date string into a human-readable format
            const date = new Date(dateString);
            return date.toLocaleDateString(); // e.g., "MM/DD/YYYY"
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
}

.table tbody tr {
    border-bottom: 1px solid #e9ecef;
}

th {
    text-align: left;
    width: 30%;
}

td {
    text-align: left;
    width: 70%;
}

.text-center {
    text-align: center;
}

</style>
