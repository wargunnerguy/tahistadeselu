<template>
  <div>
    <NuxtRouteAnnouncer />
    <NavBar />
    <!-- No top padding — NavBar is fixed, pages control their own spacing -->
    <main>
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>
