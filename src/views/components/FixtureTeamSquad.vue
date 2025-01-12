<template>
    <div class="card">
        <div class="card-header pb-0">
            <h6 class="text-uppercase text-secondary text-sm font-weight-bolder">Fixture Lineups</h6>
        </div>
        <div class="card-body px-0 pt-0 pb-2">
            <div v-if="loading" class="text-center my-4">
                <i class="spinner-border text-primary" role="status"></i>
                <p class="mt-2">Loading...</p>
            </div>
            <div v-else>
                <!-- Home Team Table -->
                <h6 class="text-center text-secondary text-sm font-weight-bolder">Home Team</h6>
                <div class="table-fit p-0">
                    <table class="table mb-0 table-fit lineups-table">
                        <thead>
                            <tr>
                                <th
                                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 number-column">
                                    #</th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Player
                                </th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Position
                                </th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Rating
                                </th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Substitute</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="player in homeTeam" :key="player.number">
                                <td class="text-secondary text-xs font-weight-bold number-column">
                                    <span @click="openPlayerModal(player, 'home')" style="cursor: pointer;">{{
                                        player.number }}</span>
                                </td>
                                <td class="text-secondary text-xs font-weight-bold">
                                    <img :src="player.player_photo" class="avatar avatar-sm me-2" alt="player"
                                        @click="openPlayerModal(player, 'home')" style="cursor: pointer;" />
                                    <span @click="openPlayerModal(player, 'home')" style="cursor: pointer;">{{
                                        player.player_name }}</span>
                                </td>
                                <td class="text-secondary text-xs font-weight-bold">{{ player.position }}</td>
                                <td class="text-secondary text-xs font-weight-bold">{{ player.rating || 'N/A' }}</td>
                                <td class="text-secondary text-xs font-weight-bold">{{ player.substitute ? 'Yes' : 'No'
                                    }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Away Team Table -->
                <h6 class="text-center text-secondary text-sm font-weight-bolder">Away Team</h6>
                <div class="table-fit p-0">
                    <table class="table mb-0 lineups-table">
                        <thead>
                            <tr>
                                <th
                                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 number-column">
                                    #</th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Player
                                </th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Position
                                </th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Rating
                                </th>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Substitute</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="player in awayTeam" :key="player.number">
                                <td class="text-secondary text-xs font-weight-bold number-column">
                                    <span @click="openPlayerModal(player, 'away')" style="cursor: pointer;">{{
                                        player.number }}</span>
                                </td>
                                <td class="text-secondary text-xs font-weight-bold">
                                    <img :src="player.player_photo" class="avatar avatar-sm me-2" alt="player"
                                        @click="openPlayerModal(player, 'away')" style="cursor: pointer;" />
                                    <span @click="openPlayerModal(player, 'away')" style="cursor: pointer;">{{
                                        player.player_name }}</span>
                                </td>
                                <td class="text-secondary text-xs font-weight-bold">{{ player.position }}</td>
                                <td class="text-secondary text-xs font-weight-bold">{{ player.rating || 'N/A' }}</td>
                                <td class="text-secondary text-xs font-weight-bold">{{ player.substitute ? 'Yes' : 'No'
                                    }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Player Modal -->
        <div v-if="showModal" class="modal-overlay" @click="closeModal">
            <div class="modal-content" @click.stop>
                <h5 class="modal-title text-center">{{ selectedPlayer.player_name }}</h5>
                <img :src="selectedPlayer.player_photo" class="avatar avatar-lg mx-auto my-3" alt="player" />
                <ul class="list-unstyled">
                    <li><strong>Number:</strong> {{ selectedPlayer.number }}</li>
                    <li><strong>Position:</strong> {{ selectedPlayer.position }}</li>
                    <li v-for="[key, value] in filteredPlayerStats" :key="key">
                        <strong>{{ formatKey(key) }}:</strong> {{ value }}
                    </li>
                </ul>
                <button class="btn btn-secondary mt-3" @click="closeModal">Close</button>
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
            homeTeam: [], // Home team players
            awayTeam: [], // Away team players
            selectedPlayer: null, // Selected player for the modal
            selectedPlayerStats: {}, // Stats for the selected player
            showModal: false, // Modal visibility
            loading: true, // Indicates loading state
        };
    },
    computed: {
        filteredPlayerStats() {
            if (!this.selectedPlayerStats) return [];
            return Object.entries(this.selectedPlayerStats)
                .filter(([key, value]) =>
                    key !== 'player_photo' &&
                    key !== 'player_name' &&
                    key !== 'number' &&
                    value !== null
                );
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
                if (response.data) {
                    await this.fetchFixtureSquads(fixtureId, response.data.home_team_id, response.data.away_team_id);
                } else {
                    console.error("Fixture details are missing.");
                }
            } catch (error) {
                console.error("Error fetching fixture details:", error);
            } finally {
                this.loading = false; // Stop loading
            }
        },
        async fetchFixtureSquads(fixtureId, homeTeamId, awayTeamId) {
            try {
                this.loading = true; // Start loading
                const homeResponse = await axios.get(`http://localhost:5001/api/getFixtureLineups/home/${fixtureId}/${homeTeamId}`);
                const awayResponse = await axios.get(`http://localhost:5001/api/getFixtureLineups/away/${fixtureId}/${awayTeamId}`);
                this.homeTeam = homeResponse.data;
                this.awayTeam = awayResponse.data;
            } catch (error) {
                console.error("Error fetching fixture squads:", error);
            } finally {
                this.loading = false; // Stop loading
            }
        },
        async openPlayerModal(player) {
            const fixtureId = window.location.pathname.split('/').pop(); // Get fixture ID from URL

            if (!fixtureId) {
                console.error("Fixture ID is missing. Cannot fetch player stats.");
                return;
            }

            this.showModal = true; // Show the modal
            this.selectedPlayer = player; // Assign the selected player

            try {
                const response = await axios.get(`http://localhost:5001/api/playerstats/fixplayerstats/${fixtureId}/${player.player_id}`);
                if (response.data.length > 0) {
                    this.selectedPlayerStats = response.data[0]; // Assign the first result to modal stats
                } else {
                    this.selectedPlayerStats = {}; // Clear stats if no data is returned
                }
            } catch (error) {
                console.error("Error fetching player stats:", error);
                this.selectedPlayerStats = {}; // Clear stats on error
            }
        },
        formatKey(key) {
            // Convert snake_case to Capitalized Words
            return key
                .replace(/_/g, ' ') // Replace underscores with spaces
                .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
        },
        closeModal() {
            this.showModal = false;
            this.selectedPlayer = null;
            this.selectedPlayerStats = {};
        },
    },

};
</script>

<style>
/* Container for both tables */
.lineups-table th.number-column,
.lineups-table td.number-column {
    max-width: 50px;
    /* Set a reasonable max width */
    width: 50px;
    /* Ensure consistency */
    text-align: center;
    /* Center align the content */
    white-space: nowrap;
    /* Prevent text from wrapping */
    overflow: hidden;
    /* Hide overflowing text */
    text-overflow: ellipsis;
    /* Add ellipsis if content overflows */
}

.table-row {
    display: flex;
    justify-content: space-between;
    /* Space between tables */
    gap: 1rem;
    /* Add spacing between the tables */
}

/* Each table container */
.table-container {
    flex: 1;
    /* Equal width for both tables */
    max-width: 50%;
    /* Ensure each table does not exceed half the row */
}

/* Adjust table layout for compactness */
.table {
    border-spacing: 0;
    border-collapse: collapse;
    width: 100%;
    margin: 0;
}

.table thead th {
    background-color: #f4f6f9;
    border-bottom: 2px solid #e9ecef;
    font-weight: bold;
    text-transform: uppercase;
    text-align: left;
    padding: 6px 12px;
}

.table tbody tr {
    border-bottom: 1px solid #e9ecef;
}

.table tbody td {
    text-align: left;
    padding: 6px 12px;
    vertical-align: middle;
}

/* Adjust avatar image styling */
.avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 8px;
    display: inline-block;
    vertical-align: middle;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    text-align: left;
}

.modal-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.avatar-lg {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
</style>
