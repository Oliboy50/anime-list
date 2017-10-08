<template>

  <article class="component-item card">
    <header class="card-header">
      <p class="card-header-title">
        {{ item.id }} - {{ item.title }}
      </p>
      <a class="card-header-icon">
        <span class="icon">
          <i class="fa fa-angle-down"></i>
        </span>
      </a>
    </header>
    <div class="card-image">
      <figure class="image is-2by1">
        <img :src="item.image">
      </figure>
    </div>
  </article>

</template>

<script>
  export default {
    props: [
      'item',
    ],
  };
</script>
