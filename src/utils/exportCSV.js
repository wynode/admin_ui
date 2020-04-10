export default function exportCSV(result, name) {
  let _type
  const link = document.createElement('a')
  // const csvContent = `data:text/csv;charset=GBK,\uFEFF${result}`
  // const encodedUri = encodeURI(csvContent)
  const encodedUri =
    'data:text/csv;charset=UTF-8,' + '\uFEFF' + encodeURIComponent(result)
  _type = name || 'my_data_export'
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', `${_type}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
