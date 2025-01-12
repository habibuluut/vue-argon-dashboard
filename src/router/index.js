import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import Billing from "../views/Billing.vue";
import VirtualReality from "../views/VirtualReality.vue";
import RTL from "../views/Rtl.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import Countries from "../views/Countries.vue";
import CountryLeaguesTable from "../views/CountryLeagues.vue";
import LeagueSeasonsTable from "../views/LeagueSeasons.vue";
import SeasonDetails from "../views/SeasonDetails.vue";
import FixtureDetails from "../views/FixtureDetails.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard-default",
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/countries",
    name: "Countries",
    component: Countries,
  },
  {
    path: "/leagues/:id",
    name: "CountryLeagues",
    component: CountryLeaguesTable,
  },
  {
    path: "/seasons/:id",
    name: "LeagueSeasons",
    component: LeagueSeasonsTable,
  },
  {
    path: "/seasondetails/:id/:year",
    name: "SeasonDetails",
    component: SeasonDetails,
  },
  {
    path: "/fixturedetails/:id",
    name: "FixtureDetails",
    component: FixtureDetails,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/rtl-page",
    name: "RTL",
    component: RTL,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
