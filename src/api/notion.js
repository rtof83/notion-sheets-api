// import { Client } from '@notionhq/client'
// require('dotenv').config()
const { Client } = require('@notionhq/client')
// import dotenv from 'dotenv'
// dotenv.config()

const { NOTION_API_KEY,
        NOTION_DB_COMPRAS_ID,
        NOTION_DB_PRODUTOS_ID
      } = require('./config')

const notion = new Client({ auth: NOTION_API_KEY })

// async function getTags() {
//   const database = await notion.databases.retrieve({
//     database_id: process.env.NOTION_DATABASE_ID,
//   })

//   return notionPropertiesById(database.properties)[
//     process.env.NOTION_TAGS_ID
//   ].multi_select.options.map(option => {
//     return { id: option.id, name: option.name }
//   })
// }

// function notionPropertiesById(properties) {
//   return Object.values(properties).reduce((obj, property) => {
//     const { id, ...rest } = property
//     return { ...obj, [id]: rest }
//   }, {})
// }

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

    // 'Produtos': {
    //      'relation': [
    //       {
    //         "id": "3ae14fd6-53c3-4458-8594-09abda55969a"
    //     },
    //     {
    //         "id": "f1769bd9-1fe2-446f-807e-2d1aa224f272"
    //     },
    //     {
    //         "id": "d0552dc3-ae76-4760-b13c-f2c5653003fd"
    //     }
    //       ]
    //     },

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

    // 'Data da compra': {
    //   type: 'date',
    //   date: [{
    //     start: '2022-01-24'
    //   }]
    // },

    // 'Data do envio': {
    //   type: 'date',
    //   date: {
    //     start: '2020-08-12T02:12:33.231Z'
    //   }
    // }
    
  })
}

async function getCompras() {
  const notionPages = await notion.databases.query({
    database_id: NOTION_DB_COMPRAS_ID
    // sorts: [{ property: process.env.NOTION_NAME_ID, direction: "descending" }],
  })

//   return notionPages.results.map(fromNotionObject)
// return notionPages.results[0].properties.email.email
  return notionPages.results
}

async function getProdutos() {
  const notionPages = await notion.databases.query({
    database_id: NOTION_DB_PRODUTOS_ID,
    sorts: [{ property: 'ID', direction: "ascending" }],
  })

  return notionPages.results
}

// function fromNotionObject(notionPage) {
//   const propertiesById = notionPropertiesById(notionPage.properties)

//   return {
//     id: notionPage.id,
//     title: propertiesById[process.env.NOTION_TITLE_ID].title[0].plain_text,
//     votes: propertiesById[process.env.NOTION_VOTES_ID].number,
//     tags: propertiesById[process.env.NOTION_TAGS_ID].multi_select.map(
//       option => {
//         return { id: option.id, name: option.name }
//       }
//     ),
//     isProject: propertiesById[process.env.NOTION_PROJECT_ID].checkbox,
//     description:
//       propertiesById[process.env.NOTION_DESCRIPTION_ID].rich_text[0].text
//         .content,
//   }
// }

// async function upVoteSuggestion(pageId) {
//   const suggestion = await getSuggestion(pageId)
//   const votes = suggestion.votes + 1
//   await notion.pages.update({
//     page_id: pageId,
//     properties: {
//       [process.env.NOTION_VOTES_ID]: { number: votes },
//     },
//   })

//   return votes
// }

// async function getSuggestion(pageId) {
//   return fromNotionObject(await notion.pages.retrieve({ page_id: pageId }))
// }

// export { createCompras, getCompras, getProdutos }

module.exports = {
  createCompras,
  getCompras,
  getProdutos
}


// =======================================================================

// async function getDatabase() {
//   const response = await notion.databases.retrieve({
//     database_id: process.env.NOTION_DATABASE_ID })
//     console.log(response)
// }

// getDatabase()

// =======================================================================


// const prodtest = [];
// prodtest.push({"id": "3ae14fd6-53c3-4458-8594-09abda55969a"});
// prodtest.push({"id": "f1769bd9-1fe2-446f-807e-2d1aa224f272"});
// prodtest.push({"id": "d0552dc3-ae76-4760-b13c-f2c5653003fd"});

// console.log(prodtest);

// createCompras({
//     id: 'Date().toString',
//     produtos: prodtest,
//     endereco: 'endereço teste',
// })

// =======================================================================

// console.log(getTest());
