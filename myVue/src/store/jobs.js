// stores/counter.js
import { defineStore } from 'pinia'
import { reactive, computed } from 'vue';
import { useToast } from "vue-toastification";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

export const useJobStore = defineStore('job', () =>  {
  
  const route = useRoute();
  const router = useRouter();
  const toaster = useToast();

  const jobId = route.params.id;

  const state = reactive({
    job: [],
    isLoading: true,
    searchQuery: '',
    searchFilter: 'all',
    name: "",
    email: "",
    message: "",
      job_single: {
        // default shape to avoid undefined errors while loading
        id: null,
        title: "",
        salary: "",
        description: "",
        type: "",
        company: {
        name: "",
        industry: "",
        website: "",
        location: ""
        }
    },
    isLoading: true,
    error: null,
    showModal: false,
    modalType: null, // 'edit' | 'delete'
    updating: false
    });


    const sendContact = () => {
       try {
        toaster.success(`Hello! ${state.name}, Message sent successfully!`);
        state.name = "";
        state.email = "";
        state.message = "";
       } catch (error) {
        toast.error("Failed to send message. Please try again.");
       }
    }


    const filteredJobs = computed(() => {
    let jobs = state.job;

    if (state.searchFilter !== 'all') {
        jobs = jobs.filter(job => job.type.toLowerCase() === state.searchFilter);
    }

    if (state.searchQuery) {
        jobs = jobs.filter(job =>
        job.title.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
    }

    return jobs;
    });

    const fetchJobs = async () => {
    try {
        const response = await axios.get("/api/jobs");
        state.job = response.data.jobs;
    } catch (error) {
        console.error("Error fetching job listings:", error);
    } finally {
        state.isLoading = false;
    }
    }



    // ✅ Update filter when a button is clicked
    function setFilter(type) {
    state.searchFilter = type;
    };


    // modal control

    // open modal
    function openModal(type) {
        state.modalType = type;
        state.showModal = true;
    }

    // close modal
    function closeModal() {
        state.showModal = false;
        state.modalType = null;
    }


    // update handlers
    

    async function fetchSingleJob() {
        try {
            const response = await axios.get(`/api/jobs/${jobId}`);
            // assume API returns job object directly or under data.job
            // try common shapes
            const data = response.data && (response.data.job || response.data);
            // merge into state.job to preserve reactivity & shape
            state.job_single = {
            id: data.id ?? state.job.id,
            title: data.title ?? "",
            salary: data.salary ?? "",
            description: data.description ?? "",
            type: data.type ?? "",
            company: {
                name: data.company?.name ?? (data.company_name ?? ""),
                industry: data.company?.industry ?? (data.company_industry ?? ""),
                website: data.company?.website ?? (data.company_website ?? ""),
                location: data.company?.location ?? (data.location ?? "")
            }
            };
        } catch (err) {
            console.error("Error fetching job details:", err);
            state.error = "Error loading job details. Please try again later.";
        } finally {
            state.isLoading = false;
        }
    }

return { state, filteredJobs, setFilter, sendContact , fetchJobs,
     handleUpdate, handleDelete, closeModal, openModal, fetchSingleJob
};


});