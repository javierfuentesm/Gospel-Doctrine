export default {
  widgets: [
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5e6c5adf63bfb81123640d3f',
                  title: 'Sanity Studio',
                  name: 'gatsby-blog-studio-4jh97j8y',
                  apiId: '2cf1c8f6-4980-4f37-bc56-df3c9a8d7a7a'
                },
                {
                  buildHookId: '5e6c5adf281eb0c217a6d21f',
                  title: 'Blog Website',
                  name: 'gatsby-blog-web-rhjs6ks5',
                  apiId: 'af3f64fa-1c45-4801-b6f4-d1782b65f40f'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/javierfuentesm/gatsby-blog',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://gatsby-blog-web-rhjs6ks5.netlify.com', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
