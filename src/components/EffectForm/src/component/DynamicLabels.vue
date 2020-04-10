<template>
  <div class="EffectForm_DynamicLabels">
    <!-- <el-tag
      v-for="tag in labels"
      :key="tag.code"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag.label }}
    </el-tag> -->
    <el-radio-group v-model="radio" size="small">
      <span
        v-for="tag in labels"
        :key="tag.code"
        @click="handleRadioChange(tag)"
      >
        <el-radio :label="tag.code" border>
          {{ tag.label }}
        </el-radio>
      </span>
    </el-radio-group>
    <el-button
      class="button-new-tag"
      type="primary"
      size="small"
      @click="handleShowAddTags"
    >
      + 新建二级标签
    </el-button>

    <div v-if="inputVisible" class="input-new-tag">
      <el-form
        :model="form"
        size="mini"
        label-position="left"
        label-width="auto"
      >
        <div class="fail_tag_item">
          <el-form-item label="二级标签名" prop="label">
            <el-input v-model="form.label"></el-input>
          </el-form-item>
          <el-form-item label="code" prop="code">
            <el-input v-model="form.code" :disabled="disableCode"></el-input>
          </el-form-item>
        </div>
        <el-button
          size="mini"
          type="primary"
          round
          class="Ml82 Mb10"
          @click="handleAddThirdTags"
        >
          新增三级标签
        </el-button>
        <template v-if="form.third_tags">
          <div
            v-for="(third, index) in form.third_tags"
            :key="index"
            class="fail_tag_item"
          >
            <el-form-item label="三级标签名">
              <el-input v-model="third.label"></el-input>
            </el-form-item>
            <el-form-item label="code">
              <el-input v-model="third.code"></el-input>
            </el-form-item>
            <el-button size="mini" @click="deleteThirdTag(index)" class="Ml32">
              删除该三级标签
            </el-button>
          </div>
        </template>

        <el-form-item>
          <el-button size="mini" type="primary" @click="handleNewTags">
            确定
          </el-button>
          <el-button v-if="showDelete" size="mini" @click="deleteSecondLabel">
            删除该二级标签
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
const formInit = {
  label: '',
  code: '',
}

export default {
  name: 'DynamicLabels',

  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      inputVisible: false,
      inputValue: '',
      labels: [],
      radio: '',
      showDelete: true,
      disableCode: false,
      form: { ...formInit },
    }
  },

  watch: {
    value() {
      this.labels = this.value || []
    },
  },

  methods: {
    handleRadioChange(tag) {
      this.inputVisible = true
      this.form = { ...tag }
      this.showDelete = true
      this.disableCode = true
    },

    handleShowAddTags() {
      this.radio = ''
      this.showDelete = false
      this.inputVisible = true
      this.disableCode = false
      this.form = { ...formInit }
    },

    handleAddThirdTags() {
      if (this.form.third_tags) {
        this.form.third_tags.push({ label: '', code: '' })
      } else {
        this.$set(this.form, 'third_tags', [{ label: '', code: '' }])
      }
    },

    handleNewTags() {
      if (this.form.label && this.form.code) {
        if (this.radio) {
          let labelIndex = ''
          this.labels.forEach((item, index) => {
            if (item.code === this.radio) {
              labelIndex = index
            }
          })
          this.labels.splice(labelIndex, 1, { ...this.form })
          this.$emit('input', this.labels)
          this.radio = ''
        } else {
          this.labels.push({ ...this.form })
          this.$emit('input', this.labels)
        }
      }
      this.inputVisible = false
      this.form = { ...formInit }
    },

    deleteThirdTag(index) {
      this.form.third_tags.splice(index, 1)
    },

    deleteSecondLabel() {
      let labelIndex = ''
      this.labels.forEach((item, index) => {
        if (item.code === this.form.code) {
          labelIndex = index
        }
      })
      this.labels.splice(labelIndex, 1)
      this.$emit('input', this.labels)
      this.inputVisible = false
    },
  },
}
</script>

<style lang="scss">
.EffectForm_DynamicLabels {
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .el-radio {
    margin-right: 20px;
    .el-radio__input {
      display: none;
    }
    .el-radio__label {
      padding-left: 5px;
    }
  }

  .input-new-tag {
    margin-top: 14px;
    width: 560px;
    .el-form-item--mini.el-form-item {
      margin-bottom: 10px;
    }
    .fail_tag_item {
      display: flex;
      align-items: flex-start;
    }
  }
}
</style>
