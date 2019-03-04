<template>
  <div id="app">
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title has-text-centered">Point Table Vue</h1>
        </div>
      </div>
       <div class="hero-foot">
        <nav class="tabs is-boxed is-fullwidth">
          <div class="container">
            <ul>
              <router-link tag="li" to="/" exact active-class="is-active"><a>Using Props</a></router-link>
              <router-link tag="li" to="/using-slot" exact active-class="is-active"><a>Using Slot</a></router-link>
              <router-link tag="li" to="/using-api" exact active-class="is-active"><a>Using Api</a></router-link>
            </ul>
          </div>
        </nav>
      </div>
    </section>
    <router-view/>
  </div>
</template>
