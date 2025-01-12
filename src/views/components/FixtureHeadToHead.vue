<template>
    <div class="card mb-20">
        <div class="card-header pb-0">
            <h6 class="text-uppercase text-secondary text-sm font-weight-bolder">All Matches Between Two Teams</h6>
        </div>
        <div class="card-body px-0 pt-0 pb-2">
            <div v-if="loading" class="text-center my-4">
                <i class="spinner-border text-primary" role="status"></i>
                <p class="mt-2">Loading...</p>
            </div>
            <div v-else-if="lastmatches.length">
                <div class="table-responsive p-0">
                    <table class="table align-items-center mb-0">
                        <thead>
                            <tr>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Fixture Date</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Home Team</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Result</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Away Team</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(lastmatch, index) in lastmatches" :key="index">
                                <td class="text-secondary text-xs font-weight-bold">{{ formatDate(lastmatch.fixture_date) }}</td>
                                <td class="text-secondary text-xs font-weight-bold text-center">{{ lastmatch.home_team_name }}</td>
                                <td class="text-secondary text-xs font-weight-bold text-center">{{ lastmatch.fulltime_home }} ({{ lastmatch.halftime_home }}) - ({{ lastmatch.halftime_away }}) {{ lastmatch.fulltime_away }}</td>
                                <td class="text-secondary text-xs font-weight-bold text-center">{{ lastmatch.away_team_name }}</td>
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


    <!--Mathes between 2 teams where .... was home team -->

    <div class="card">
        <div class="card-header pb-0">
            <h6 class="text-uppercase text-secondary text-sm font-weight-bolder">Mathes between 2 teams where .... was home team</h6>
        </div>
        <div class="card-body px-0 pt-0 pb-2">
            <div v-if="loading" class="text-center my-4">
                <i class="spinner-border text-primary" role="status"></i>
                <p class="mt-2">Loading...</p>
            </div>
            <div v-else-if="twoteamshomesame.length">
                <div class="table-responsive p-0">
                    <table class="table align-items-center mb-0">
                        <thead>
                            <tr>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Fixture Date</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Home Team</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Result</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Away Team</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(twoteamshome, index) in twoteamshomesame" :key="index">
                                <td class="text-secondary text-xs font-weight-bold">{{ formatDate(twoteamshome.fixture_date) }}</td>
                                <td class="text-secondary text-xs font-weight-bold text-center">{{ twoteamshome.home_team_name }}</td>
                                <td class="text-secondary text-xs font-weight-bold text-center">{{ twoteamshome.fulltime_home }} ({{ twoteamshome.halftime_home }}) - ({{ twoteamshome.halftime_away }}) {{ twoteamshome.fulltime_away }}</td>
                                <td class="text-secondary text-xs font-weight-bold text-center">{{ twoteamshome.away_team_name }}</td>
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


<!--Last 10 Mathes of ...... home -->
    <div class="card">
        <div class="card-header pb-0">
            <h6 class="text-uppercase text-secondary text-sm font-weight-bolder">Last 10 Mathes of ...... home</h6>
        </div>
        <div class="card-body px-0 pt-0 pb-2">
            <div v-if="loading" class="text-center my-4">
                <i class="spinner-border text-primary" role="status"></i>
                <p class="mt-2">Loading...</p>
            </div>
            <div v-else-if="lastmatcheshome.length">
                <div class="table-responsive p-0">
                    <table class="table align-items-center mb-0">
                        <thead>
                            <tr>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Fixture Date</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Home Team</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Result</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Away Team</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(lasthome, index) in lastmatcheshome" :key="index">
                                <td class="text-secondary text-xs font-weight-bold">{{ formatDate(lasthome.fixture_date) }}</td>
                                <td class="text-secondary text-xs font-weight-bold text-center">{{ lasthome.home_team_name }}</td>
                                <td class="text-secondary text-xs font-weight-bold text-center">{{ lasthome.fulltime_home }} ({{ lasthome.halftime_home }}) - ({{ lasthome.halftime_away }}) {{ lasthome.fulltime_away }}</td>
                                <td class="text-secondary text-xs font-weight-bold text-center">{{ lasthome.away_team_name }}</td>
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



<!--Last 10 Mathes of ...... away -->
    <div class="card">
        <div class="card-header pb-0">
            <h6 class="text-uppercase text-secondary text-sm font-weight-bolder">Last 10 Mathes of ...... away</h6>
        </div>
        <div class="card-body px-0 pt-0 pb-2">
            <div v-if="loading" class="text-center my-4">
                <i class="spinner-border text-primary" role="status"></i>
                <p class="mt-2">Loading...</p>
            </div>
            <div v-else-if="lastmatchesaway.length">
                <div class="table-responsive p-0">
                    <table class="table align-items-center mb-0">
                        <thead>
                            <tr>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Fixture Date</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Home Team</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Result</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Away Team</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(lastaway, index) in lastmatchesaway" :key="index">
                                <td class="text-secondary text-xs font-weight-bold">{{ formatDate(lastaway.fixture_date) }}</td>
                                <td class="text-secondary text-xs font-weight-bold text-center">{{ lastaway.home_team_name }}</td>
                                <td class="text-secondary text-xs font-weight-bold text-center">{{ lastaway.fulltime_home }} ({{ lastaway.halftime_home }}) - ({{ lastaway.halftime_away }}) {{ lastaway.fulltime_away }}</td>
                                <td class="text-secondary text-xs font-weight-bold text-center">{{ lastaway.away_team_name }}</td>
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



<!--Last 10 Mathes of ...... played home -->
    <div class="card">
        <div class="card-header pb-0">
            <h6 class="text-uppercase text-secondary text-sm font-weight-bolder">Last 10 Mathes of ...... played home</h6>
        </div>
        <div class="card-body px-0 pt-0 pb-2">
            <div v-if="loading" class="text-center my-4">
                <i class="spinner-border text-primary" role="status"></i>
                <p class="mt-2">Loading...</p>
            </div>
            <div v-else-if="lastmatcheshomehome.length">
                <div class="table-responsive p-0">
                    <table class="table align-items-center mb-0">
                        <thead>
                            <tr>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Fixture Date</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Home Team</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Result</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Away Team</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(lmhomehome, index) in lastmatcheshomehome" :key="index">
                                <td class="text-secondary text-xs font-weight-bold">{{ formatDate(lmhomehome.fixture_date) }}</td>
                                <td class="text-secondary text-xs font-weight-bold text-center">{{ lmhomehome.home_team_name }}</td>
                                <td class="text-secondary text-xs font-weight-bold text-center">{{ lmhomehome.fulltime_home }} ({{ lmhomehome.halftime_home }}) - ({{ lmhomehome.halftime_away }}) {{ lmhomehome.fulltime_away }}</td>
                                <td class="text-secondary text-xs font-weight-bold text-center">{{ lmhomehome.away_team_name }}</td>
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



<!--Last 10 Mathes of ...... played away -->
    <div class="card">
        <div class="card-header pb-0">
            <h6 class="text-uppercase text-secondary text-sm font-weight-bolder">Last 10 Mathes of ...... played away</h6>
        </div>
        <div class="card-body px-0 pt-0 pb-2">
            <div v-if="loading" class="text-center my-4">
                <i class="spinner-border text-primary" role="status"></i>
                <p class="mt-2">Loading...</p>
            </div>
            <div v-else-if="lastmatchesawayaway.length">
                <div class="table-responsive p-0">
                    <table class="table align-items-center mb-0">
                        <thead>
                            <tr>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Fixture Date</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Home Team</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Result</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Away Team</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(lmawayaway, index) in lastmatchesawayaway" :key="index">
                                <td class="text-secondary text-xs font-weight-bold">{{ formatDate(lmawayaway.fixture_date) }}</td>
                                <td class="text-secondary text-xs font-weight-bold text-center">{{ lmawayaway.home_team_name }}</td>
                                <td class="text-secondary text-xs font-weight-bold text-center">{{ lmawayaway.fulltime_home }} ({{ lmawayaway.halftime_home }}) - ({{ lmawayaway.halftime_away }}) {{ lmawayaway.fulltime_away }}</td>
                                <td class="text-secondary text-xs font-weight-bold text-center">{{ lmawayaway.away_team_name }}</td>
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
            lastmatches: [], // Holds the fixture events
            twoteamshomesame:[],
            lastmatcheshome:[],
            lastmatchesaway:[],
            lastmatcheshomehome:[],
            lastmatchesawayaway:[],
            loading: true, // Indicates loading state
        };
    },

    mounted() {
        const route = useRoute();
        const fixtureId = route.params.id; // Extract fixture ID from the route
        this.fetchLastMatches(fixtureId);
    },
    methods: {
        async fetchLastMatches(fixtureId) {
            try {
                this.loading = true; // Start loading
                const response = await axios.get(`http://localhost:5001/api/fixtureHtoH/${fixtureId}`);
                this.lastmatches = response.data; // Assign fetched events to `lastmatches`

                const response2 = await axios.get(`http://localhost:5001/api/fixtureHtoH/twoteamshomesame/${fixtureId}`);
                this.twoteamshomesame = response2.data; // Assign fetched events to `twoteamshomesame`

                const response3 = await axios.get(`http://localhost:5001/api/fixtureHtoH/lastmatcheshome/${fixtureId}`);
                this.lastmatcheshome = response3.data; // Assign fetched events to `lastmatcheshome`

                const response4 = await axios.get(`http://localhost:5001/api/fixtureHtoH/lastmatchesaway/${fixtureId}`);
                this.lastmatchesaway = response4.data; // Assign fetched events to `lastmatchesaway`

                const response5 = await axios.get(`http://localhost:5001/api/fixtureHtoH/lastmatcheshomehome/${fixtureId}`);
                this.lastmatcheshomehome = response5.data; // Assign fetched events to `lastmatcheshomehome`

                const response6 = await axios.get(`http://localhost:5001/api/fixtureHtoH/lastmatchesawayaway/${fixtureId}`);
                this.lastmatchesawayaway = response6.data; // Assign fetched events to `lastmatchesawayaway`
            } catch (error) {
                console.error("Error fetching fixture events:", error);
                this.lastmatches = []; // Clear events on error
            } finally {
                this.loading = false; // Stop loading
            }
        },
        formatDate(dateString) {
        // Convert ISO string to a Date object
        const date = new Date(dateString);
        // Format as YYYY-MM-DD
        return date.toISOString().split('T')[0];
    },
    },
};
</script>

<style>
.card{
    margin-bottom: 20px;
}
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
