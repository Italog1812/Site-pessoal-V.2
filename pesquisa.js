function link(html_url) {
  window.open(html_url);
}

function sucessPesquisa() {
  const result = JSON.parse(this.responseText);
  console.log(result);
  var b = document.getElementById("types-selection");
  var value4 = b.options[b.selectedIndex].value;
  const cards = document.getElementById('results-pesquisa');
  while (cards.firstChild) {
    cards.removeChild(cards.firstChild);
  }
  let new_cards = '';
  switch (value4) {
    case "code":
      result.items.map(data => {
        new_cards += `<div class="card col-sm-12 col-md-6 col-lg-4 card-pesquisa" style="width: 18rem;" onclick="link('${data.html_url}')">
          <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text">
            ${data.repository.description ? data.repository.description : 'Sem descrição'}
            </p>
          </div>
        </div>`
      });
      cards.innerHTML = new_cards;
      break;
    case "commits":
      result.items.map(data1 => {
        new_cards += `<div class="card col-sm-12 col-md-6 col-lg-4 card-pesquisa" style="width: 18rem;" onclick="link('${data1.html_url}')">
            <div class="card-body">
              <h5 class="card-title">Autor: ${data1.commit.author.name ? data1.commit.author.name : 'Desconhecido'}</h5>
              <p class="card-text">
              Mensagem: ${data1.commit.message}
                    </p>
            </div>
          </div>`
      });
      cards.innerHTML = new_cards;
      break;
    case "issues":
      result.items.map(data2 => {
        new_cards += `<div class="card col-sm-12 col-md-6 col-lg-4 card-pesquisa" style="width: 18rem;" onclick="link('${data2.html_url}')">
              <div class="card-body">
                <h5 class="card-title">Autor: ${data2.user.login}</h5>
                <p class="card-text">
                Descrição: ${data2.title}
                      </p>
              </div>
            </div>`
      });
      cards.innerHTML = new_cards;
      break;
    case "labels":
      result.items.map(data3 => {
        new_cards += `<div class="card col-sm-12 col-md-6 col-lg-4 card-pesquisa" style="width: 18rem;" onclick="link('${data3.html_url}')">
              <div class="card-body">
                <h5 class="card-title">${data3.name}</h5>
                <p class="card-text">
                 ${data3.description ? data3.description : 'Sem descrição'}
                      </p>
              </div>
            </div>`
      });
      cards.innerHTML = new_cards;
      break;
    case "repositories":
      result.items.map(data4 => {
        new_cards += `<div class="card col-sm-12 col-md-6 col-lg-4 card-pesquisa" style="width: 18rem;" onclick="link('${data4.html_url}')">
              <div class="card-body">
                <h5 class="card-title">${data4.name}</h5>
                <p class="card-text">
                 ${data4.description ? data4.description : 'Sem descrição'}
                      </p>
              </div>
            </div>`
      });
      cards.innerHTML = new_cards;
      break;
    case "topics":
      result.items.map(data5 => {
        new_cards += `<div class="card col-sm-12 col-md-6 col-lg-4 card-pesquisa" style="width: 18rem;" onclick="link('${data5.html_url}')">
              <div class="card-body">
                <h5 class="card-title">${data5.name}</h5>
                <p class="card-text">
                 ${data5.short_description ? data5.short_description : 'Sem descrição'}
                      </p>
              </div>
            </div>`
      });
      cards.innerHTML = new_cards;
      break;
    case "users":
      result.items.map(data6 => {
        new_cards += ` <div class="card col-sm-12 col-md-6 col-lg-4 card-pesquisa" style="width: 18rem;" onclick="link('${data6.html_url}')">
              <img class="card-img-top" src="${data6.avatar_url}" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">${data6.login}</h5>
              </div>
            </div>`
      });
      cards.innerHTML = new_cards;
      break;
    default:
      result.items.map(data => {
        new_cards += `<div class="card col-sm-12 col-md-6 col-lg-4 card-pesquisa" style="width: 18rem;" onclick="link('${data.html_url}')">
            <div class="card-body">
              <h5 class="card-title">${data.name}</h5>
              <p class="card-text">
              ${data.description ? data.description : 'Sem descrição'}
                    </p>
            </div>
          </div>`
      });
      cards.innerHTML = new_cards;
  }
}
function errorPesquisa() {
  console.log('Erro:', err);
}

function CreateLink() {
  var a = document.getElementById("types-selection");
  var value2 = a.options[a.selectedIndex].value;
  var xhr3 = new XMLHttpRequest();
  xhr3.onload = sucessPesquisa;
  xhr3.onerror = errorPesquisa;
  switch (value2) {
    case "code":
      xhr3.open('GET', `https://api.github.com/search/code?q=${document.getElementById("text1").value}+user:${document.getElementById("text2").value}`);
      break;
    case "labels":
      xhr3.open('GET', `https://api.github.com/search/labels?q=${document.getElementById("text1").value}&repository_id=${document.getElementById("text2").value}`);
      break;
    default:
      xhr3.open('GET', `https://api.github.com/search/${value2}?q=${document.getElementById("text1").value}`);

  }
  xhr3.send();
}
function changeValue() {
  var e = document.getElementById("types-selection");
  var value = e.options[e.selectedIndex].value;
  const labels = document.getElementById('BP');
  console.log(value);
  let new_labels = '';
  labels.innerHTML = '';
  console.log(labels);
  switch (value) {
    case "code":
      new_labels += `<input
            id="text1"
            style="width: 50%; height: 4.5vh"
            type="text"
            placeholder="Nome do código"
          />
          <input
            id="text2"
            style="width: 50%; height: 4.5vh"
            type="text"
            placeholder="Nome do usuário"
          />`
      labels.innerHTML = new_labels;
      break;
    case "commits":
      new_labels += `
            <input
              id="text1"
              style="width: 100%; height: 4.5vh"
              type="text"
              placeholder="Pesquisa"
            />`
      labels.innerHTML = new_labels;
      break;
    case "issues":
      new_labels += `
            <input
              id="text1"
              style="width: 100%; height: 4.5vh"
              type="text"
              placeholder="Digite seu problema"
            />`
      labels.innerHTML = new_labels;
      break;
    case "labels":
      new_labels += `
            <input
            id="text1"
            style="width: 50%; height: 4.5vh"
            type="text"
            placeholder="Nome do rótulo"
          />
          <input
            id="text2"
            style="width: 50%; height: 4.5vh"
            type="text"
            placeholder="ID do repositorio"
          />`
      labels.innerHTML = new_labels;
      break;
    case "repositories":
      new_labels += `
                <input
                  id="text1" 
                  style="width: 100%; height: 4.5vh"
                  type="text"
                  placeholder="Busca de repositórios"
                />`
      labels.innerHTML = new_labels;
      break;
    case "topics":
      new_labels += `
                <input
                  id="text1"
                  style="width: 100%; height: 4.5vh"
                  type="text"
                  placeholder="Buscar um tópico"
                />`
      labels.innerHTML = new_labels;
      break;
    case "users":
      new_labels += `
                    <input
                      id="text1"
                      style="width: 100%; height: 4.5vh"
                      type="text"
                      placeholder="Buscar um usuário"
                    />`
      labels.innerHTML = new_labels;
      break;
    default:
      new_labels += `<input
            id="text1"
            style="width: 50%; height: 4.5vh"
            type="text"
            placeholder="Nome do código"
          />
          <input
            id="text2"
            style="width: 50%; height: 4.5vh"
            type="text"
            placeholder="Nome do usuário"
          />`
      labels.innerHTML = new_labels;
  }


}