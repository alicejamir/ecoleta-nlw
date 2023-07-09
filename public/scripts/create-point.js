/*populando cidade e estado*/
/*ibge servicos api (google)*/

function populateUFs() {
  const ufSelect = document.querySelector('select[name=uf]')

  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(res => res.json())
    .then(states => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
    })
}

populateUFs()

function getCities(event) {
  const citySelect = document.querySelector('[name=city]');
  const stateInput = document.querySelector('[name=state]');

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex 
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = '<option value>Selecione a Cidade</optin>';
  citySelect.disabled = true;

  fetch(url)
    .then(res => res.json())
    .then(cities => {
      
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }

      citySelect.disabled = false;
    })
}

document.querySelector('select[name=uf]').addEventListener('change', getCities)
 
/* itens de coleta */ 

const itemsToCollect = document.querySelectorAll('.items-grid li')

for (const item of itemsToCollect){
  item.addEventListener('click', handleSelectedItem)
}

// coleção de dados para quando os itens forem selecionados, para depois serem enviados para o back com oinput:hidden colocado apos os lis.

const collectedItems =  document.querySelector("input[name=items")

let selectedItems = [];

function handleSelectedItem(event){
  const itemLi = event.target
 //add or remove uma classe com js
  itemLi.classList.toggle('selected')
 
  const itemId =  itemLi.dataset.id


  //Verificar se existem items selecionados, se sim
  //pegar os items selecionados
  const alreadySelected = selectedItems.findIndex(
item => {
  const itemFoud = item == itemId
  return itemFoud
})

  //se já estiver selecionado,
  if(alreadySelected >= 0){
  // tirar da seleção
    const filteredItems = selectedItems.filter( item => {

      const itemIsDifferent = item != itemId
      return itemIsDifferent
    })

    selectedItems = filteredItems
    //se não estiver selecionado 
  } else {
     //adicionar na seleção
     selectedItems.push(itemId)
  }

  //atualizar o campo escondido(input) com os item selecionados para poder enviar para o back
  collectedItems.value = selectedItems
}