<template>
    <div class="card">
        <div class="card-header pb-0">
            <h6 class="text-uppercase text-secondary text-sm font-weight-bolder">Fixture Events</h6>
        </div>
        <div class="card-body px-0 pt-0 pb-2">
            <div v-if="loading" class="text-center my-4">
                <i class="spinner-border text-primary" role="status"></i>
                <p class="mt-2">Loading...</p>
            </div>
            <div v-else-if="events.length">
                <div class="table-responsive p-0">
                    <table class="table align-items-center mb-0">
                        <thead>
                            <tr>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Minute</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Team</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Player</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Type</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Details</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(event, index) in events" :key="index">
                                <td class="text-secondary text-xs font-weight-bold">{{ event.minutes }}</td>
                                <td class="text-secondary text-xs font-weight-bold text-center">{{ event.team_name }}</td>
                                <td class="text-secondary text-xs font-weight-bold text-center">
                                    {{ event.player_name }}
                                    <span v-if="event.assist_player_name"> ({{ event.assist_player_name }})</span>
                                </td>
                                <td class="text-secondary text-xs font-weight-bold text-center">{{ event.type }}</td>
                                <td class="text-secondary text-xs font-weight-bold text-center">{{ event.details }}</td>
                                <td class="text-secondary text-xs font-weight-bold text-center">{{ event.comments || 'N/A' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-else class="text-center my-4">
                <p class="text-muted">No events available.</p>
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
            events: [], // Holds the fixture events
            loading: true, // Indicates loading state
        };
    },

    mounted() {
        const route = useRoute();
        const fixtureId = route.params.id; // Extract fixture ID from the route
        this.fetchFixtureEvents(fixtureId);
    },
    methods: {
        async fetchFixtureEvents(fixtureId) {
            try {
                this.loading = true; // Start loading
                const response = await axios.get(`http://localhost:5001/api/fixtureEvents/${fixtureId}`);
                this.events = response.data; // Assign fetched events to `events`
            } catch (error) {
                console.error("Error fetching fixture events:", error);
                this.events = []; // Clear events on error
            } finally {
                this.loading = false; // Stop loading
            }
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
