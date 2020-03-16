export default {
  name: 'allCategories',
  type: 'array',
  title: 'allCategories',
  of: [
    {
      type: 'reference',
      to: {
        type: 'category'
      }
    }
  ]
}
