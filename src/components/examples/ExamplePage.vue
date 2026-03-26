<template>
  <div class="w-full h-5 bg-brand"></div>
  <!-- Navigation -->
  <nav class="bg-white">
    <div class="flex flex-row items-center justify-between px-10 py-4 max-w-7xl mx-auto">
      <div>
        <a href="#">
          <img
            src="https://cpilosenlaces.com/wp-content/uploads/2023/03/cpifp-los-enlaces-2x.png"
            alt="Logo Los Enlaces"
            class="h-15"
          />
        </a>
      </div>
      <ul class="flex gap-4">
        <li><a href="#">Centro</a></li>
        <li><a href="#">Secretaría</a></li>
        <li><a href="#">Contacto</a></li>
      </ul>
    </div>
  </nav>
  <main class="h-full">
    <!-- Hero Section -->
    <section
      class="bg-cover bg-right bg-[url('https://cpilosenlaces.com/wp-content/uploads/2023/05/cpienlaces-home-2.jpg')]"
    >
      <div class="max-w-7xl mx-auto py-20 px-10">
        <div class="w-100">
          <h1 class="text-6xl font-bold">Pensando en tu futuro</h1>
          <p class="text-xl mt-4">
            Te ofrecemos ciclos formativos adaptados a las necesidades actuales de las empresas.
          </p>
          <!-- Buttons -->
          <div class="flex gap-4 mt-6">
            <a
              href="#"
              class="bg-brand text-white py-2 px-4 rounded hover:bg-brand-light cursor-pointer"
            >
              El Centro
            </a>
            <a
              href="#"
              class="bg-brand text-white py-2 px-4 rounded hover:bg-brand-light cursor-pointer"
            >
              Oferta Formativa
            </a>
          </div>
        </div>
      </div>
    </section>
    <!-- Content Section -->
    <section class="py-15 px-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-x-20 gap-y-5">
      <div class="w-full">
        <h2 class="text-3xl font-bold mb-6">¿Por qué estudiar en CPIFP Los Enlaces?</h2>
        <p class="mb-4">
          Porque somos un centro innovador, puntero en nuestras familias profesionales. Porque
          nuestras enseñanzas se adaptan a ti: turno diurno, turno vespertino, distancia, dual,
          bilingüismo, INAEM, PEAC… Porque más de 1.300 empresas han colaborado con nosotros en la
          formación de nuestro alumnado. Porque cada curso una veintena de alumnos participan en
          proyectos Erasmus por toda Europa. Porque te podemos ayudar a crear tu propia empresa en
          nuestro vivero. Y porque, en definitiva, somos la puerta a tu futuro profesional.
        </p>
      </div>
      <img
        src="https://cpilosenlaces.com/wp-content/uploads/2023/04/los-enlaces-centro-400x266.jpg"
        alt="Centro CPIFP Los Enlaces"
        class="shadow-md/30 shadow-black"
      />
    </section>
  </main>
</template>
