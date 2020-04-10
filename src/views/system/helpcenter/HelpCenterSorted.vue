<template>
  <el-card style="min-height: 220px">
    <div slot="header" class="Df Aic">
      <div style="min-height: 80px">
        <div>
          <label class="Mr24 Fz16 Whsnw">类型</label>
          <el-radio-group v-model="currentType" @change="handleHelpTypeChange">
            <el-radio
              v-for="category in helpType"
              :key="category.value"
              :label="category.value"
            >
              {{ category.label }}
            </el-radio>
          </el-radio-group>
        </div>
        <div v-if="currentType === 'article'" class="Mt20">
          <label class="Mr24 Fz16 Whsnw">上级菜单</label>
          <el-select
            v-model="menu"
            placeholder="请选择"
            @change="handleMenuChange"
            size="small"
          >
            <el-option
              v-for="item in menuOptions"
              :key="item.title"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </div>

      <el-button class="Mla" icon="el-icon-back" @click="backToMainParentPage">
        返回
      </el-button>
      <el-button type="primary" @click="resortHelpCenter">
        保存
      </el-button>
    </div>

    <Draggable
      v-model="helpCenterList"
      class="el-row el-row--flex Flww"
      ghostClass="CheckPointItemGhost"
    >
      <el-col
        v-for="(element, index) in helpCenterList"
        :key="element.id"
        :span="4"
        class="P8"
      >
        <div class="Df Aic CheckPointSortItem">
          <div class="Bgp CheckPointSortIndex">{{ index + 1 }}</div>
          <div class="Ml8 Fz16">{{ element.title }}</div>
        </div>
      </el-col>
    </Draggable>
  </el-card>
</template>

<script>
import Draggable from 'vuedraggable'
import debounce from 'lodash/debounce'
import { fetchHelpCenterSetting, postHelpCenterSort } from '@/apis/system'
import { allErrors } from '@/utils/errorFormat'

export default {
  name: 'HelpCenterSorted',

  components: {
    Draggable,
  },

  data() {
    return {
      currentType: '',
      helpCenterList: [],
      articleList: [],
      menu: '',
      menuOptions: [],
      helpType: [
        { label: '菜单', value: 'menu' },
        {
          label: '文章',
          value: 'article',
        },
      ],
    }
  },

  methods: {
    backToMainParentPage() {
      this.$router.push({ name: 'Helpcenter' })
    },

    handleHelpTypeChange(value) {
      if (value === 'menu') {
        this.helpCenterList = this.menuOptions
      } else {
        this.menu = ''
        this.helpCenterList = []
      }
    },

    handleMenuChange(value) {
      fetchHelpCenterSetting({
        wiki_type__in: 'article',
        parent__in: value,
      }).then((data) => {
        this.helpCenterList = data.results
      })
    },

    resortHelpCenter: debounce(async function resortHelpCenter() {
      try {
        const newOrdering = this.helpCenterList.map((cp) => {
          return cp.id
        })
        await postHelpCenterSort({ obj_list: newOrdering })
        this.$notify.success('排序成功')
      } catch (error) {
        allErrors(error.data || error)
      }
    }, 200),
  },

  mounted() {
    fetchHelpCenterSetting({ wiki_type__in: 'menu' }).then((data) => {
      this.menuOptions = data.results
      this.helpCenterList = data.results
    })
    this.currentType = 'menu'
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
