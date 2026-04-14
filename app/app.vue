<template>
  <div>
    <NuxtRouteAnnouncer />
    <NavBar />
    <main>
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<style>
[data-reveal] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
[data-reveal].revealed {
  opacity: 1;
  transform: translateY(0);
}
</style>
