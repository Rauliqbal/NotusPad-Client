<script setup>
import Header from "@/components/Dashboard/Header.vue";
import Sidebar from "@/components/Dashboard/Sidebar.vue";
</script>
<template>
  <div class="flex h-screen overflow-hidden bg-gray-100">
    <!-- ===== Sidebar Start ===== -->
    <Sidebar />
    <!-- ===== Sidebar End ===== -->

    <!-- ===== Content Area Start ===== -->
    <div
      class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden"
    >
      <!-- ===== Header Start ===== -->
      <Header />
      <!-- ===== Header End ===== -->

      <!-- ===== Main Content Start ===== -->
      <main>
        <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <slot />
        </div>
      </main>
      <!-- ===== Main Content End ===== -->
    </div>
  </div>
</template>
