<script setup>
    import { useToast } from "vue-toastification";
    import { reactive } from "vue";

    const toast = useToast();

    const form = reactive({
        name: "",
        email: "",
        message: ""
    });

    const sendContact = () => {
       try {
        toast.success(`Hello! ${form.name}, Message sent successfully!`);
        form.name = "";
        form.email = "";
        form.message = "";
       } catch (error) {
        toast.error("Failed to send message. Please try again.");
       }
    }


</script>

<template>
    <form class="m-auto grid grid-cols-1 gap-6 max-w-lg px-4 py-8 mt-20 bg-white shadow-md rounded-lg" @submit.prevent="sendContact">
        <h1 class="text-3xl text-center"> Contact </h1>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                Name
            </label>
            <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                v-model="form.name"
                placeholder="Your Name"
            />
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Email
            </label>
            <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                v-model="form.email"
                placeholder="Your Email"
            />
        </div>
        <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="message">
                Message
            </label>
            <textarea
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                rows="5"
                v-model="form.message"
                placeholder="Your Message"
            ></textarea>
        </div>
        <div class="flex items-center justify-between">
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
            >
                Send Message
            </button>
        </div>
    </form>
</template>