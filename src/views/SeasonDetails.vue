<script setup>
import { ref } from "vue";
import SeasonStandingsTable from "./components/SeasonStandingsTable.vue";
import SeasonFixturesTable from "./components/SeasonFixturesTable.vue";

// Reactive variable to track the active tab
const activeTab = ref("standings");

// Function to switch tabs
const switchTab = (tabName) => {
  activeTab.value = tabName;
};
</script>

<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <!-- Tabs Navigation -->
      <div class="col-12 d-flex justify-content-start mb-4">
        <button
          class="tab-button"
          :class="{ active: activeTab === 'standings' }"
          @click="switchTab('standings')"
        >
          Standings
        </button>
        <button
          class="tab-button"
          :class="{ active: activeTab === 'fixtures' }"
          @click="switchTab('fixtures')"
        >
          Fixtures
        </button>
      </div>

      <!-- Content Section -->
      <div class="col-12">
        <!-- Conditional Rendering Based on Active Tab -->
        <season-standings-table v-if="activeTab === 'standings'" />
        <season-fixtures-table v-else-if="activeTab === 'fixtures'" />
      </div>
    </div>
  </div>
</template>

<style>
/* General button styling */
.tab-button {
  padding: 10px 20px;
  margin-right: 10px;
  border: 2px solid #2bbb7d;
  border-radius: 5px;
  background-color: transparent;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

/* Active button styling */
.tab-button.active {
  background-color: #118B50;
  border: 2px solid #0d7543;
  color: #fff;
}

/* Hover effect */
.tab-button:hover {
  background-color: #fff;
  border: 2px solid #d8d8d8;
  color: #118B50;
}
</style>
