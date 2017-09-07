<template>

  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        {{ title }}
      </p>
      <a class="card-header-icon">
        <span class="icon">
          <i class="fa fa-angle-down"></i>
        </span>
      </a>
    </header>
    <div class="card-image">
      <figure class="image is-2by1">
        <img :src="imageUrl">
      </figure>
    </div>
  </div>

</template>

<script>
  export default {
    props: [
      'title',
      'imageUrl',
    ],
  }
</script>
