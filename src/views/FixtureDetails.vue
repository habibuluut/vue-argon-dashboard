<script setup>
import { ref } from "vue";
import FixtureDetailsTable from "./components/FixtureDetailsTable.vue";
import FixtureStatsTable from "./components/FixtureStatsTable.vue";
import FixtureTeamSquad from "./components/FixtureTeamSquad.vue";
import FixtureEventDetails from "./components/FixtureEventDetails.vue";
import FixtureHeadToHead from "./components/FixtureHeadToHead.vue";
import FixturePredictions from "./components/FixturePredictions.vue";

// Reactive variable to track the active tab
const activeTab = ref("details");

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
          :class="{ active: activeTab === 'details' }"
          @click="switchTab('details')"
        >
          Detaylar
        </button>
        <button
          class="tab-button"
          :class="{ active: activeTab === 'stats' }"
          @click="switchTab('stats')"
        >
          İstatistikler
        </button>
        <button
          class="tab-button"
          :class="{ active: activeTab === 'squads' }"
          @click="switchTab('squads')"
        >
          Takım Kadroları
        </button>
        <button
          class="tab-button"
          :class="{ active: activeTab === 'events' }"
          @click="switchTab('events')"
        >
          Maç Olayları
        </button>
        <button
          class="tab-button"
          :class="{ active: activeTab === 'head2head' }"
          @click="switchTab('head2head')"
        >
          İkili Rekabet
        </button>
        <button
          class="tab-button"
          :class="{ active: activeTab === 'predictions' }"
          @click="switchTab('predictions')"
        >
          Tahminler
        </button>
      </div>

      <!-- Content Section -->
      <div class="col-12">
        <!-- Conditional Rendering Based on Active Tab -->
        <fixture-details-table v-if="activeTab === 'details'" />
        <fixture-stats-table v-else-if="activeTab === 'stats'" />
        <fixture-team-squad v-else-if="activeTab === 'squads'" />
        <fixture-player-stats v-else-if="activeTab === 'plstats'" />
        <fixture-event-details v-else-if="activeTab === 'events'" />
        <fixture-head-to-head v-else-if="activeTab === 'head2head'" />
        <fixture-predictions v-else-if="activeTab === 'predictions'" />

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
