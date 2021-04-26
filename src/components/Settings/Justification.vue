<template>
  <div class="row">
    <div class="col-6">Alignment:</div>
    <div class="col-6">
      <div class="level-item">
        <p class="control">
          <button class="button is-small" @click="justifyChange('left', $event)"><i class="fas fa-align-left"></i></button>
          <button class="button is-small" @click="justifyChange('centered',$event)"><i class="fas fa-align-center"></i></button>
          <button class="button is-small" @click="justifyChange('right', $event)"><i class="fas fa-align-right"></i></button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default  {
  
  name: 'Justification',

  props:
  {
    el: Object,
  },

  data()
  {
    return {

    }
  },

  methods:
  {
    justifyChange(name, e){
      e.preventDefault();
      this.el.justify = name
    }
  },
};

</script>

<style lang="sass">
@import '../../assets/sass/library'
  

</style>