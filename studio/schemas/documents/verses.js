export default {
  name: 'verses',
  type: 'document',
  title: 'Verses',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'body',
      type: 'bodyPortableText',
      title: 'Body'
    },
    {
      name: 'post',
      type: 'array',
      title: 'Chapter',
      of: [
        {
          type: 'reference',
          to: {
            type: 'post'
          }
        }
      ]
    }
  ]
}
