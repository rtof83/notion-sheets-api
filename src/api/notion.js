const { Client } = require('@notionhq/client')

const { NOTION_API_KEY,
        NOTION_DB_COMPRAS_ID,
        NOTION_DB_PRODUTOS_ID
      } = require('./config')

const notion = new Client({ auth: NOTION_API_KEY })

function createCompras({ id, produtos, endereco }) {
  notion.pages.create({
    parent: {
      database_id: NOTION_DB_COMPRAS_ID,
    },

    properties: {
      'ID da compra': {
        title: [
          {
            type: 'text',
            text: {
              content: id,
            },
          },
        ],
      },

    'Produtos': {
       'relation': produtos
      },

    'Endereço de entrega': {
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: {
              content: endereco
            }
          },
        ]
      },
    },
   
  })
}

async function getCompras() {
  const notionPages = await notion.databases.query({
    database_id: NOTION_DB_COMPRAS_ID
  })

  return notionPages.results
}

async function getProdutos() {
  const notionPages = await notion.databases.query({
    database_id: NOTION_DB_PRODUTOS_ID,
    sorts: [{ property: 'ID', direction: "ascending" }],
  })

  return notionPages.results
}

module.exports = {
  createCompras,
  getCompras,
  getProdutos
}
