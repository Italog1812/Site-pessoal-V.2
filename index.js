function sucess_repos() {
  const obj2 = JSON.parse(this.responseText);
  const repositories = document.getElementById('folder');
  while (repositories.firstChild) {
    repositories.removeChild(repositories.firstChild);
  }
  let new_repositories = '';
  obj2.map(data => {
    new_repositories +=
      `<div class="col-sm-12 col-md-12 col-lg-4 cartao" onclick="link('${data.html_url}')">
        <div class="col-sm-2 col-md-2 col-lg-3">
          <div class="folders_imagem">
            <i class="fas fa-folder"></i>
          </div>
        </div>
        <div class="col-sm-10 col-md-10 col-lg-9 folders_texto">
          <h1><b>${data.name}</b></h1>
          <p>
            <b>Descrição:</b>
            ${data.description ? data.description : 'Sem descrição'}
          </p>
        
          <p><b>Atualizado em: ${new Date(data.updated_at).toLocaleDateString()}</b></p>
        </div>
        </div>`
  });
  repositories.innerHTML = new_repositories;

}
function link(html_url) {
  window.open(html_url);
}
function succes() {
  const obj = JSON.parse(this.responseText);
  document.getElementById('bio').innerHTML += obj.bio;
  document.getElementById('foto_perfil').src = obj.avatar_url;
  document.getElementById('icons').innerHTML += `<i class="fab fa-github" onclick ="link('${obj.html_url}')"></i>`;
  const xhr2 = new XMLHttpRequest();
  xhr2.onload = sucess_repos;
  xhr2.onerror = error;
  xhr2.open('GET', 'https://api.github.com/users/Italog1812/repos');
  xhr2.send();
}
function error(err) {
  console.log('Erro:', err);
}
var xhr = new XMLHttpRequest();
xhr.onload = succes;
xhr.onerror = error;
xhr.open('GET', 'https://api.github.com/users/Italog1812');
xhr.send();
