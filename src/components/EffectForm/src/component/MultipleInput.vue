<template>
  <div class="multiple_input">
    <div v-for="(_, index) in model" :key="index">
      <el-input class="mp_input" v-model="model[index]"></el-input>
      <span class="mp_delete">
        <el-button
          type="danger"
          size="mini"
          icon="el-icon-minus"
          circle
          @click="deleteItem(index)"
        ></el-button>
      </span>
    </div>
    <div class="mp_add">
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-plus"
        circle
        @click="addItem"
      ></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultipleInput',

  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      model: [],
    }
  },

  watch: {
    model: {
      deep: true,
      handler(newValue) {
        this.$emit('input', newValue)
      },
    },

    value() {
      this.model = this.value || []
    },
  },

  methods: {
    addItem() {
      this.model.push('')
    },

    deleteItem(index) {
      this.model.splice(index, 1)
    },
  },

  mounted() {
    this.model = this.value || []
  },
}
</script>

<style lang="scss">
.multiple_input {
  text-align: center;

  .mp_input {
    width: calc(100% - 40px);
    margin-right: 10px;
    margin-bottom: 5px;
  }
  .mp_delete {
    width: 60px;
    text-align: center;
  }
  .mp_add {
    width: calc(100% - 40px);
    text-align: center;
  }
}
</style>
