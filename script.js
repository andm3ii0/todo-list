/* eslint-disable func-names, sonarjs/no-collapsible-if */
const inputTarefa = document.getElementById('texto-tarefa');
const botaoAdd = document.getElementById('criar-tarefa');
const botaoRemove = document.getElementById('apaga-tudo');
const botaoRemoveFinalizados = document.getElementById('remover-finalizados');
const botaoSalvar = document.getElementById('salvar-tarefas');
const botaoCima = document.getElementById('mover-cima');
const botaoBaixo = document.getElementById('mover-baixo');
const botaoRemoveUm = document.getElementById('remover-selecionado');
const listaTarefas = 'lista-tarefas';
const listItem = '.list-item';

function removeSelecionado() {
  const itemSelecionado = document.querySelector('.selected');
  itemSelecionado.remove(Element);
}

function moveCima() {
  const itemSelecionado = document.querySelector('.selected');
  if (itemSelecionado !== null) {
    if (itemSelecionado !== itemSelecionado.parentNode.firstChild) {
      itemSelecionado.parentNode.insertBefore(itemSelecionado,
        itemSelecionado.previousElementSibling);
    }
  }
}

function moveBaixo() {
  const itemSelecionado = document.querySelector('.selected');
  if (itemSelecionado !== null) {
    if (itemSelecionado !== itemSelecionado.parentNode.lastChild) {
      itemSelecionado.parentNode.insertBefore(itemSelecionado, itemSelecionado
        .nextElementSibling.nextElementSibling);
    }
  }
}

function salvaTarefa() {
  const lista = document.getElementById(listaTarefas).innerHTML;
  if (lista === '') {
    localStorage.setItem('listaDeTarefas', '');
  }
  localStorage.setItem('listaDeTarefas', lista);
}

function itemClicado(event) {
  const itemnsList = document.querySelectorAll(listItem);
  for (let i = 0; i < itemnsList.length; i += 1) {
    itemnsList[i].classList.remove('selected');
  }
  event.target.classList.add('selected');
}

function itemConcluido(event) {
  const itemnsList = document.querySelectorAll(listItem);
  for (let i = 0; i < itemnsList.length; i += 1) {
    itemnsList[i].classList.remove('selected');
  }
  if (event.target.classList.contains('completed')) {
    event.target.classList.remove('completed');
    event.target.classList.add('selected');
  } else {
    event.target.classList.add('completed');
    event.target.classList.add('selected');
  }
}

function adicionaEvento() {
  const itemnsList = document.querySelectorAll(listItem);
  for (let i = 0; i < itemnsList.length; i += 1) {
    itemnsList[i].addEventListener('click', itemClicado);
    itemnsList[i].addEventListener('dblclick', itemConcluido);
  }
}

function removeItens() {
  const lista = document.getElementById(listaTarefas);
  lista.innerHTML = '';
}

function removeItensCompletos() {
  const itensCompletos = document.getElementsByClassName('completed');
  for (let i = 0; i < itensCompletos.length; i += 0) {
    itensCompletos[i].parentNode.removeChild(itensCompletos[i]);
  }
}

function criaItem() {
  const item = document.createElement('li');
  item.className = 'list-item';
  return item;
}

function adicionaTarefa() {
  if (inputTarefa.value !== '') {
    const lista = document.getElementById(listaTarefas);
    const itemLista = criaItem();
    itemLista.innerText = inputTarefa.value;
    lista.appendChild(itemLista);
    inputTarefa.value = '';
    adicionaEvento();
  }
}

function adicionaTarefaEnter(e) {
  if (e.which === 13 && inputTarefa.value !== '') {
    const lista = document.getElementById(listaTarefas);
    const itemLista = criaItem();
    itemLista.innerText = inputTarefa.value;
    lista.appendChild(itemLista);
    inputTarefa.value = '';
    adicionaEvento();
  }
}

botaoAdd.addEventListener('click', adicionaTarefa);
inputTarefa.addEventListener('keypress', adicionaTarefaEnter);
botaoRemove.addEventListener('click', removeItens);
botaoRemoveFinalizados.addEventListener('click', removeItensCompletos);
botaoSalvar.addEventListener('click', salvaTarefa);
botaoCima.addEventListener('click', moveCima);
botaoBaixo.addEventListener('click', moveBaixo);
botaoRemoveUm.addEventListener('click', removeSelecionado);

window.onload = function () {
  const lista = document.getElementById(listaTarefas);
  if (localStorage.getItem('listaDeTarefas') !== '') {
    lista.innerHTML = localStorage.getItem('listaDeTarefas');
  }
};
