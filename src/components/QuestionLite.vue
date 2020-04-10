<template>
  <div class="TaStart">
    <p class="Fwb">{{ topic }}</p>
    <ul>
      <li v-for="pz in puzzleList" :key="pz.ans" :class="{ Cy: pz.correct }">
        <span>{{ pz.order }}</span>
        <span>{{ pz.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'QuestionLite',

  props: {
    topic: String,
    puzzle: Array,
    answer: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    puzzleList() {
      const orderList = ['A. ', 'B. ', 'C. ', 'D. ']
      return this.puzzle.map((pz, index) => {
        const [ans, text] = pz
        return {
          correct: this.answer.indexOf(ans) > -1,
          text,
          ans,
          order: orderList[index],
        }
      })
    },
  },
}
</script>

<style></style>
