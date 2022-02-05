import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { urlBase } from '../api/config'

function App() {
  const [ id, setId ] = useState('');
  const [ endereco, setEndereco ] = useState('');
  const [ compras, setCompras ] = useState([]);
  const [ produtos, setProdutos ] = useState([]);

  const handleSend = async () => {
    const selectedValues = Array.from(document.getElementById('selectProd')
                            .selectedOptions)
                            .map(selected => selected.value);

    if (!id || !endereco || selectedValues.length === 0) {
      alert('Atenção! Todos os campos devem ser preenchidos ou selecionados.')
    } else {
      const listaNomeProd = Array.from(document.getElementById('selectProd')
                            .selectedOptions)
                            .map(selected => selected.text);
      
      const prodlist = [];
      selectedValues.map(id => prodlist.push({'id': id}));

      const data = {
        id: id,
        produtos: prodlist,
        endereco: endereco,
        listaNomeProd: listaNomeProd
      };

      await axios.post(urlBase, data)
      .then(() => {
        return console.log('Ok!', data);
      })
      .catch((e) => {
        return console.log('Something bad happened:', e.message);
      })

      prodAlert();
      getCompras();
    }
  }

  const getCompras = async () => {
    await axios.get(urlBase)
    .then(res => setCompras(res.data))
  }

  const getProdutos = async () => {
    await axios.get(urlBase + 'produtos')
    .then(res => setProdutos(res.data))
  }

  const prodAlert = async () => {
    const sendAlert = produtos.map(prod => prod.properties.Status.formula.string === '🔆🔆🔆' ?
    prod.properties.Name.title[0].plain_text : null).filter(alert => alert);

    await axios.get(`${urlBase}sendemail/${sendAlert}`)
  }

  useEffect(() => {
    getProdutos();
    getCompras();
  }, [])

  return (
    <div className='App'>
        <h4>Formulário de Compras</h4>
        <div className='divider' />

      <div className='header'>
        <input placeholder='ID' value={id} onChange={e => setId(e.target.value)} />
        
        <select multiple="multiple" name="select" id="selectProd">

          {produtos.map(repository =>
            <option value={repository.id}
                    key={repository.id}>
              {repository.properties.Name.title[0].plain_text}
            </option>
            )}

        </select>

        <textarea placeholder='Endereço' value={endereco} onChange={e => setEndereco(e.target.value)} />
      </div>

      <button className='btnSend' onClick={handleSend}>Enviar</button>

      <div className='divider' />
 
      <table className='tbCompras'>
        <th>ID da compra</th>
        <th>Produtos</th>
        <th>Endereço da entrega</th>
      { compras.map(repository => 
      <tr>
        <td> { repository.properties['ID da compra'].title[0].plain_text } </td>

        <td> { repository.properties.Produtos.relation.map(
              prodCod => produtos.map(produto => produto.id === prodCod.id ?
              produto.properties.Name.title[0].plain_text + ' ' : '')) } </td>

        <td> { repository.properties['Endereço de entrega'].rich_text[0].plain_text } </td>
      </tr>)}
      </table>
    </div>
  );
}

export default App;
