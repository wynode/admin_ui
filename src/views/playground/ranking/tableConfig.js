// import { PureContentCutOff } from '@/components/CellTools'

export function playDetailCols() {
  return [
    {
      label: '姓名',
      prop: 'user_name',
      width: 70,
    },

    {
      label: '所在部门',
      width: 160,
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <p>{this.row.department_cn}</p>
              {this.row.position ? (
                <el-tag size="mini">{this.row.position}</el-tag>
              ) : (
                ''
              )}
            </div>
          )
        },
      },
    },

    {
      label: '综合练习数 / 正确率',
      sortable: 'custom',
      prop: '_mix_count',
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <span>{this.row.mix_count}</span> /{' '}
              {this.row.mix_total_num !== 0 ? (
                <span>{`${(
                  (this.row.mix_correct_num / this.row.mix_total_num) *
                  100
                ).toFixed(1)}%`}</span>
              ) : (
                '0%'
              )}
            </div>
          )
        },
      },
    },

    {
      label: '鉴政练习数 / 正确率',
      sortable: 'custom',
      prop: '_political_count',
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <span>{this.row.political_count}</span> /{' '}
              {this.row.political_total_num !== 0 ? (
                <span>{`${(
                  (this.row.political_correct_num /
                    this.row.political_total_num) *
                  100
                ).toFixed(1)}%`}</span>
              ) : (
                '0%'
              )}
            </div>
          )
        },
      },
    },

    {
      label: '鉴黄练习数 / 正确率',
      prop: '_porn_count',
      sortable: 'custom',
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <span>{this.row.porn_count}</span> /{' '}
              {this.row.porn_total_num !== 0 ? (
                <span>{`${(
                  (this.row.porn_correct_num / this.row.porn_total_num) *
                  100
                ).toFixed(1)}%`}</span>
              ) : (
                '0%'
              )}
            </div>
          )
        },
      },
    },

    {
      label: '鉴恐练习数 / 正确率',
      prop: '_terror_count',
      sortable: 'custom',
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <span>{this.row.terror_count}</span> /{' '}
              {this.row.terror_total_num !== 0 ? (
                <span>{`${(
                  (this.row.terror_correct_num / this.row.terror_total_num) *
                  100
                ).toFixed(1)}%`}</span>
              ) : (
                '0%'
              )}
            </div>
          )
        },
      },
    },

    {
      label: '鉴俗练习数 / 正确率',
      prop: '_vulgar_count',
      sortable: 'custom',
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <span>{this.row.vulgar_count}</span> /{' '}
              {this.row.vulgar_total_num !== 0 ? (
                <span>{`${(
                  (this.row.vulgar_correct_num / this.row.vulgar_total_num) *
                  100
                ).toFixed(1)}%`}</span>
              ) : (
                '0%'
              )}
            </div>
          )
        },
      },
    },

    {
      label: '鉴诈练习数 / 正确率',
      prop: '_fraud_count',
      sortable: 'custom',
      component: {
        props: { row: Object },
        render() {
          return (
            <div>
              <span>{this.row.fraud_count}</span> /{' '}
              {this.row.fraud_total_num !== 0 ? (
                <span>{`${(
                  (this.row.fraud_correct_num / this.row.fraud_total_num) *
                  100
                ).toFixed(1)}%`}</span>
              ) : (
                '0%'
              )}
            </div>
          )
        },
      },
    },
  ]
}
