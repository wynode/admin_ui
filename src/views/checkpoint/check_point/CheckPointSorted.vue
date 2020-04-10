<template>
  <el-card>
    <div slot="header" class="Df Aic">
      <div>
        <label class="Mr24 Fz16 Whsnw">选择分类</label>
        <el-radio-group v-model="currentCategory">
          <el-radio
            v-for="category in checkPointCategory"
            :key="category.value"
            :label="category.value"
          >
            {{ category.label }}
          </el-radio>
        </el-radio-group>
      </div>

      <el-button class="Mla" icon="el-icon-back" @click="backToMainParentPage">
        返回
      </el-button>
      <el-button type="primary" @click="resortCheckPoint">
        保存
      </el-button>
    </div>

    <Draggable
      v-model="checkPointList"
      class="el-row el-row--flex Flww"
      ghostClass="CheckPointItemGhost"
    >
      <el-col
        v-for="(element, index) in checkPointList"
        :key="element.id"
        :span="4"
        class="P8"
      >
        <div class="Df Aic CheckPointSortItem">
          <div class="Bgp CheckPointSortIndex">{{ index + 1 }}</div>
          <div class="Ml8 Fz16">{{ element.name }}</div>
        </div>
      </el-col>
    </Draggable>
  </el-card>
</template>

<script>
import Draggable from 'vuedraggable'
import debounce from 'lodash/debounce'
import { getMapOptions } from '@/utils/mappings'
import { fetchCheckPoint, postCheckPointSort } from '@/apis/checkpoint'
import { allErrors } from '@/utils/errorFormat'

export default {
  name: 'CheckPointSorted',

  components: {
    Draggable,
  },

  data() {
    return {
      currentCategory: '',
      checkPointList: [],
      newOrdering: [],
    }
  },

  computed: {
    checkPointCategory() {
      return getMapOptions('checkPointCategory')
    },
  },

  watch: {
    currentCategory: 'fetchCheckPoint',
  },

  methods: {
    backToMainParentPage() {
      this.$router.push({ name: 'checkPointList' })
    },

    async fetchCheckPoint() {
      const data = await fetchCheckPoint({
        category__in: this.currentCategory,
        page_size: 10000,
        ordering: 'seq',
      })
      this.checkPointList = data.results || []
    },

    resortCheckPoint: debounce(async function resortCheckPoint() {
      try {
        const newOrdering = this.checkPointList.map((cp) => {
          return cp.id
        })
        await postCheckPointSort({ ids: newOrdering })
        this.$notify.success('排序成功')
      } catch (error) {
        allErrors(error.data || error)
      }
    }, 200),
  },

  mounted() {
    if (this.checkPointCategory) {
      const [defaultCategory] = this.checkPointCategory
      this.currentCategory = defaultCategory.value
    }
  },
}
</script>

<style lang="scss">
.CheckPointSortItem {
  padding: 8px;
  border: 1px solid #845bea;
  border-radius: 4px;
  cursor: move;
}

.CheckPointSortIndex {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  color: #fff;
  border-radius: 50%;
  font-size: 14px;
}

.CheckPointItemGhost {
  background: #f3effd;
  border-color: #dacef9;
  border-radius: 4px;
}
</style>
