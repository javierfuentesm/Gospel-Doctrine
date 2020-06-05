export default {
  name: 'verses',
  type: 'document',
  title: 'Versiculos',
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
      name: 'order',
      type: 'number',
      title: 'Order of the Verse'
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
