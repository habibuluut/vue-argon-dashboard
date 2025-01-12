<template>
    <div class="card">
        <div class="card-header pb-0">
            <h6 class="text-uppercase text-secondary text-sm font-weight-bolder">League Fixtures</h6>
        </div>
        <div class="card-body px-0 pt-0 pb-2">
            <!-- Dropdowns and Buttons -->
            <div class="row px-3 mb-3">
                <!-- First Dropdown -->
                <div class="col-md-4 mb-2">
                    <select v-model="selectedUpdate" class="form-select">
                        <option disabled value="">Bir güncelleme seçin</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                    </select>
                </div>
                <!-- Update Button -->
                <div class="col-md-2 mb-2">
                    <button class="btn btn-primary w-100" @click="handleUpdate" :disabled="loading">
                        <span v-if="loading">
                            <i class="spinner-border spinner-border-sm"></i> Updating...
                        </span>
                        <span v-else>Güncelle</span>
                    </button>
                </div>
                <!-- Second Dropdown -->
                <div class="col-md-4 mb-2">
                    <select v-model="selectedWeek" class="form-select" @change="fetchFixtures">
                        <option disabled value="">Hafta Seçin</option>
                        <option v-for="week in weeks" :key="week.id" :value="week.round_name">
                            {{ week.round_name }}
                        </option>
                    </select>

                </div>
                <!-- Fetch Fixtures Button -->
                <!-- Fetch Fixtures Button -->
                <div class="col-md-2 mb-2">
                    <button class="btn btn-primary w-100" @click="updateWeek" :disabled="loading">
                        <span v-if="loading">
                            <i class="spinner-border spinner-border-sm"></i> Updating...
                        </span>
                        <span v-else>Haftayı Güncelle</span>
                    </button>
                </div>
            </div>


            <!-- Fixtures Table -->
            <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                    <thead>
                        <tr>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Date
                            </th>
                            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Status
                            </th>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Home Team
                            </th>
                            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Away Team
                            </th>
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
                            </tr>
                        </template>

                        <!-- Real Data Rows -->
                        <template v-else>
                            <tr v-for="fixture in fixtures" :key="fixture.id" class="table-row-hover">
                                
                                    <td class="text-center">
                                        <router-link :to="`/fixturedetails/${fixture.fixture_id}`" class="text-decoration-none text-dark">
                                            <span class="text-secondary text-xs font-weight-bold">{{
                                        formatTimestamp(fixture.timestamp) }}</span>
                                        </router-link>
                                </td>
                            
                            
                                <td>
                                    <router-link :to="`/fixturedetails/${fixture.fixture_id}`" class="text-decoration-none text-dark">
                                    <span class="text-secondary text-xs font-weight-bold">{{ fixture.status_long
                                        }}</span>
                                        </router-link>
                                </td>
                                <td class="text-center">
                                    <router-link :to="`/fixturedetails/${fixture.fixture_id}`" class="text-decoration-none text-dark">
                                    <span class="text-secondary text-xs font-weight-bold">{{ fixture.home_team }}</span>
                                </router-link>
                                </td>
                                <td class="text-center">
                                    <router-link :to="`/fixturedetails/${fixture.fixture_id}`" class="text-decoration-none text-dark">
                                    <span class="text-secondary text-xs font-weight-bold">{{ fixture.away_team }}</span>
                                </router-link>
                                </td>
                                            
                                
                            </tr>
                            <tr v-if="!fixtures.length">
                                <td colspan="4" class="text-center">No fixtures available</td>
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
            weeks: [], // List of weeks/rounds
            fixtures: [], // Fixtures to display in the table
            loading: false, // Indicates whether a request is being processed
            selectedUpdate: "", // Selected value for the first dropdown
            selectedWeek: "", // Selected value for the second dropdown
            leagueId: null, // Store leagueId from route params
            seasonYear: null, // Store seasonYear from route params
        };
    },
    mounted() {
        const route = useRoute();
        this.leagueId = route.params.id; // Extract `leagueId` from the route
        this.seasonYear = route.params.year; // Extract `year` from the route
        this.fetchWeeks(); // Fetch weeks on mount
    },
    methods: {
        async fetchWeeks() {
            try {
                const response = await axios.get(
                    `http://localhost:5001/api/rounds/${this.leagueId}/${this.seasonYear}`
                );
                this.weeks = response.data; // Populate the dropdown with weeks
            } catch (error) {
                console.error("Error fetching weeks:", error);
            }
        },
        async fetchFixtures() {
            if (!this.selectedWeek) {
                alert("Please select a week!");
                return;
            }
            try {
                this.loading = true;
                const encodedWeekName = encodeURIComponent(this.selectedWeek);
                console.log(
                    `Fetching fixtures for: http://localhost:5001/api/week-fixtures/${this.leagueId}/${this.seasonYear}/${encodedWeekName}`
                );
                const response = await axios.get(
                    `http://localhost:5001/api/week-fixtures/${this.leagueId}/${this.seasonYear}/${encodedWeekName}`
                );
                this.fixtures = response.data;
                console.log("Fetched fixtures:", this.fixtures);
            } catch (error) {
                console.error("Error fetching fixtures:", error);
            } finally {
                this.loading = false;
            }
        }, 
        async updateWeek() {
            if (!this.selectedWeek) {
                alert("Please select a week!");
                return;
            }
            try {
                this.loading = true; // Start loading
                const encodedWeekName = encodeURIComponent(this.selectedWeek); // Encode week name to handle spaces
                await axios.post(
                    `http://localhost:5001/api/update-week/${this.leagueId}/${this.seasonYear}/${encodedWeekName}`
                ); // Perform the API request
                alert("Week updated successfully!"); // Notify success
            } catch (error) {
                console.error("Error updating week:", error);
                alert("Failed to update the week. Please try again.");
            } finally {
                this.loading = false; // Stop loading
            }
        },
        formatTimestamp(timestamp) {
            // Convert the timestamp to milliseconds and create a new Date object
            const date = new Date(timestamp * 1000); // Multiply by 1000 because JS works with milliseconds
            // Format the date as desired (e.g., YYYY-MM-DD or localized string)
            return date.toISOString().split("T")[0]; // Example: "2024-08-19"
        },
        async handleUpdate() {
            if (!this.selectedUpdate) {
                alert("Please select an update!");
                return;
            }
            try {
                this.loading = true; // Start loading
                const encodedUpdateName = encodeURIComponent(this.selectedUpdate); // Encode update name to handle spaces
                await axios.get(
                    `http://localhost:5001/api/update-week/${this.leagueId}/${this.seasonYear}/${encodedUpdateName}`
                ); // Perform the API request
                alert("Update successful!"); // Notify success
            } catch (error) {
                console.error("Error updating week:", error);
                alert("Failed to update week. Please try again.");
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
    /* Light background */
    border-bottom: 1px solid #e9ecef;
    /* Border for separation */
    padding: 10px 15px;
}

/* Table Styling */
.table {
    border-spacing: 0;
    border-collapse: collapse;
}

.table thead th {
    background-color: #f4f6f9;
    /* Light gray header */
    border-bottom: 2px solid #e9ecef;
    /* Subtle border below header */
    font-weight: bold;
    text-transform: uppercase;
}

.table tbody tr {
    border-bottom: 1px solid #e9ecef;
    /* Border between rows */
}

.table-row-hover:hover {
    background-color: #f1f3f5;
    /* Subtle hover effect */
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
    color: #28a745 !important;
    /* Green */
}

.bg-danger {
    color: #dc3545 !important;
    /* Red */
}

.bg-warning {
    color: #e1ca00 !important;
    /* Yellow */
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
