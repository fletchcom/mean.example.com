var usersApp = (function() {
  function viewArticles(){

    let uri = `${window.location.origin}/api/articles`;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', uri);
  
    xhr.setRequestHeader(
      'Content-Type',
      'application/json; charset=UTF-8'
    );
  
    xhr.send();
  
    xhr.onload = function(){
      let app = document.getElementById('app');
      let data = JSON.parse(xhr.response);
      // console.log(data);

      let users = data.articles;
      let table = '';
      let rows = '';
    
      //Loop each article record into it's own HTML table row, each user should
      //have a link an article view
      for (let i=0; i<articles.length; i++) {
        rows = rows + `<tr>
          <td>
            <a href="#view-${articles[i]['_id']}">${articles[i]['title']}</a>
          </td>
          <td>${articles[i]['description']}</td>
          <td>${articles[i]['keywords']}</td>
        </tr>`;
      }
    
      //Create a users panel, add a table to the panel, inject the rows into the
      //table
      table = `<div class="card">
        <div class="card-header clearfix">
          <h2 class="h3 float-left">Articles</h2>
          <div class="float-right">
            <a href="#create" class="btn btn-primary">New Article</a>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <td>Title</td>
                <td>Description</td>
                <td>Keywords</td>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>`;
    
      //Append the HTML to the #app
      app.innerHTML = table;
    }
  }
  function createArticle(){
    var app = document.getElementById('app');
  
    var form =  `
        <div class="card">
          <div class="card-header clearfix">
            <h2 class="h3 float-left">Create a New Article</h2>
            <div class="float-right">
              <a href="#" class="btn btn-primary">Cancel</a>
            </div>
          </div>
          <div class="card-body">
            <form id="createArticle" class="card-body"> 
              <div id="formMsg" class="alert alert-danger text-center">Your form has errors</div>
  
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="title">Title</label>
                  <input type="text" id="title" name="title" class="form-control" required>
                </div>
  
                <div class="form-group col-md-6">
                  <label for="description">Description</label>
                  <input type="text" id="description" name="description" class="form-control" required>
                </div>
              </div>
  
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="keywords">Keywords</label>
                  <input type="text" id="keywords" name="keywords" class="form-control" required>
                </div>
  
                <div class="form-group col-md-6">
                  <label for="body">Body</label>
                  <input type="body" id="body" name="body" class="form-control" required>
                </div>
              </div>
  
              <div class="text-right">
                <input type="submit" value="Submit" class="btn btn-lg btn-primary btn-sm-block">
              </div>
            </form>
          </div>
        </div>
    `;
  
    app.innerHTML=form;
  }
  function viewUser(id){

    let uri = `${window.location.origin}/api/articles/${id}`;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', uri);
  
    xhr.setRequestHeader(
      'Content-Type',
      'application/json; charset=UTF-8'
    );
  
    xhr.send();
  
    xhr.onload = function(){
      let app = document.getElementById('app');
      let data = JSON.parse(xhr.response);
      let card = '';
  
      card = `<div class="card">
        <div class="card-header clearfix">
          <h2 class="h3 float-left">${data.user.title}</h2>
          <div class="float-right">
            <a href="#edit-${data.article._id}" class="btn btn-primary">Edit</a>
          </div>
        </div>
        <div class="card-body">
          <div>${data.user.title}</div>
          <div>${data.user.description}</div>
        </div>
      </div>`;

      app.innerHTML = card;
    }
  }  
  function editUser(id){

    let uri = `${window.location.origin}/api/articles/${id}`;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', uri);
  
    xhr.setRequestHeader(
      'Content-Type',
      'application/json; charset=UTF-8'
    );
  
    xhr.send();
   
  xhr.onload = function(){
    let app = document.getElementById('app');
    let data = JSON.parse(xhr.response);
  
    var form =  `
      <div class="card">
        <div class="card-header clearfix">
          <h2 class="h3 float-left">Edit</h2>
          <div class="float-right">
            <a href="#" class="btn btn-primary">Cancel</a>
          </div>
        </div>
        <div class="card-body">
          <form id="editArticle" class="card-body">
            <input type="hidden" id="_id" name="_id" value="${data.article._id}">
            <div id="formMsg" class="alert alert-danger text-center">Your form has errors</div>
  
            <div class="row">
              <div class="form-group col-md-6">
                <label for="title">Title</label>
                <input type="text" id="title" name="title" class="form-control" value="${data.article.title}" required>
              </div>
  
              <div class="form-group col-md-6">
                <label for="description">Description</label>
                <input type="text" id="description" name="description" class="form-control" value="${data.article.description}" required>
              </div>
            </div>
  
            <div class="row">
              <div class="form-group col-md-6">
                <label for="keywords">Keywords</label>
                <input type="text" id="keywords" name="keywords" class="form-control" value="${data.article.keywords}" required>
              </div>
  
              <div class="form-group col-md-6">
                <label for="body">Body</label>
                <input type="body" id="body" name="body" class="form-control" value="${data.article.body}" required>
              </div>
            </div>
  
            <div class="text-right">
              <input type="submit" value="Submit" class="btn btn-lg btn-primary btn-sm-block">
            </div>
            <div>
            <a href="#delete-${data.article._id}" class="text-danger">Delete</a>
            </div>
          </form>
        </div>
      </div>
    `;
    app.innerHTML=form;
    processRequest('editArticle', '/api/articles', 'PUT');
  }
  }
  function processRequest(formId, url, method){
    let form = document.getElementById(formId);
    form.addEventListener('submit', function(e){
      e.preventDefault();

      let formData = new FormData(form);
      let uri = `${window.location.origin}${url}`;
      let xhr = new XMLHttpRequest();
      xhr.open(method, uri);

      xhr.setRequestHeader(
        'Content-Type',
        'application/json; charset=UTF-8'
      );

      let object = {};
      formData.forEach(function(value, key){
        object[key]=value;
      });

      xhr.send(JSON.stringify(object));
      xhr.onload = function(){
        let data = JSON.parse(xhr.response);
        if(data.success===true){
          window.location.href = '/';
        }else{
          document.getElementById('formMsg').style.display='block';
        }
      }
    });
  }
  function deleteView(id){

    let uri = `${window.location.origin}/api/articles/${id}`;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', uri);
  
    xhr.setRequestHeader(
      'Content-Type',
      'application/json; charset=UTF-8'
    );
  
    xhr.send();
  
    xhr.onload = function(){
      let app = document.getElementById('app');
      let data = JSON.parse(xhr.response);
      let card = '';
  
      card = `<div class="card bg-transparent border-danger text-danger bg-danger">
        <div class="card-header bg-transparent border-danger">
          <h2 class="h3 text-center">Your About to Delete an Article</h2>
        </div>
        <div class="card-body text-center">
          <div>
            Are you sure you want to delete
            <strong>${data.article.title}</strong>
          </div>
  
          <div>Username: <strong>${data.article.title}</strong></div>
          <div>Email: <strong>${data.article.subscription}</strong></div>
  
          <div class="text-center">
            <br>
            <a onclick="articlesApp.deleteTitle('${data.article._id}');" class="btn btn-lg btn-danger text-white">
            Yes delete ${data.article.username}
            </a>
          </div>
  
        </div>
      </div>`;
  
      app.innerHTML = card;
    }
  }

  function deleteUser(id){

    let uri = `${window.location.origin}/api/articles/${id}`;
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', uri);
  
    xhr.setRequestHeader(
      'Content-Type',
      'application/json; charset=UTF-8'
    );
  
    xhr.send();
  
    xhr.onload = function(){
      let data = JSON.parse(xhr.response);
      if(data.success === true){
        window.location.hash = '#';
      }else{
        alert('Unknown error, the user could not be deleted');
      }
  
    }
  
  }

  return {load: function(){
      let hash = window.location.hash;
      let hashArray = hash.split('-');
    
      switch(hashArray[0]){
        case '#create':
          createArticle();
          processRequest('createArticles', '/api/articles', 'POST');
          break;
    
        case '#view':
          viewArticle(hashArray[1]);
          break;
    
        case '#edit':
          editArticle(hashArray[1]);
          break;
    
        case '#delete':
          deleteArticle(hashArray[1]);
          break;
    
        default:
          viewArticles();
          break;
      }
    },

    deleteArticle: function(id){
      deleteArticle(id);
    }
  }
  
  })();
  
  articlesApp.load();

window.addEventListener("hashchange", function(){
  articlesApp.load();
})
  