import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import JobView from "../views/JobView.vue";
import NotFoundView from "../views/NotFound.vue";
import JobDetail from "../views/JobDetails.vue";
import AddJob from "../views/AddJob.vue";
import About from "../views/About.vue";
import Contact from "../views/Contact.vue";

const routers = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/about",
            name: "about",
            component: About,
        },
        {
            path: "/contact",
            name: "contact",
            component: Contact,
        },
        {
            path: "/jobs",
            name: "jobs",
            component: JobView,
        },
        {
            path: "/jobs/add",
            name: "add-jobs",
            component: AddJob,
        },
        {
            path: "/jobs/:id/edit",
            name: "edit-jobs",
            component: AddJob,
        },
        {
            path: "/jobs/:id",
            name: "jobsdetail",
            component: JobDetail,
        },
        {
            path: '/:catchAll(.*)',
            name: 'NotFound',
            component: NotFoundView
        },
    ]
});

export default routers;