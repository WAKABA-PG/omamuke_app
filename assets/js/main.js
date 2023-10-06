function checkStart() {
  $("#checkInput").css('display', 'block');

  getListData(getParamId());
}

//リスト編集のインデックス番号
var idx = 4;

function addRow() {
  var item = $("#addItem").val();
  $("#check_list").append('<tr id="row-' + idx + '"><td>' + idx + '</td><td>' + item + '</td><td style="text-align: center;"><button class="btn bg-gradient-info red w-12" onclick="deleteRow(\'row-' + idx + '\')">削除</button></td></tr>');
  idx++;
}

function deleteRow(rowno) {
  $("#" + rowno).remove();
}

//サーバと疎通して、ログインする
function loginToServer() {
  //TODO:本番用と切り替える
  const API_URL = "https://rad-sherbet-3eb86a.netlify.app/.netlify/functions/Login";
 // const API_URL = "http://localhost:9000/.netlify/functions/Login";


  //入力内容を取得
  var email = document.getElementById("email").value;
  var pw = document.getElementById("pw").value;

  let body = {
    email: email,
    password: pw
  };

  // バックエンドAPIへPOST
  const payload = JSON.stringify(body);


  fetch(API_URL, {
    method: "POST",
    body: payload,
  }).then((response) => {
    return response.json();
  })
    .then((data) => {
      console.log(data.result);
      var re = data.result;
      if (re === "OK") {

        location.href = "../index.html?name=" + data.name + "&email=" + data.email + "&id=" + data.id
      } else {
        alert("ログインできませんでした。メールアドレス、パスワードを確認してください。")
      }

    })
    .catch(error => {
      console.log(error);
      alert("通信エラーが発生しました。再度送信ください。");
    });

}

//サーバと疎通して、ユーザを新規登録する
function createAccout() {
  //TODO:本番用と切り替える
  const API_URL = "https://rad-sherbet-3eb86a.netlify.app/.netlify/functions/AccountCreate";
  //const API_URL = "http://localhost:9000/.netlify/functions/AccountCreate";


  //入力内容を取得
  var email = document.getElementById("email").value;
  var pw = document.getElementById("pw").value;
  var name = document.getElementById("name").value;

  //コメントをスラックに送信する
  let body = {
    email: email,
    password: pw,
    name: name
  };

  // バックエンドAPIへPOST
  const payload = JSON.stringify(body);

  fetch(API_URL, {
    method: "POST",
    body: payload,
  })

    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.result);
      var re = data.result;
      if (re === "OK") {
        location.href = "../index.html?name=" + data.name + "&email=" + data.email + "&id=" + data.id
      } else if (re === "NG1") {
        alert("すでに使用されているメールアドレスです。別のメールアドレスで登録してください。")
      } else {
        alert("ユーザ登録に失敗しました。")
      }

    })
    .catch(error => {
      console.log(error);
      alert("通信エラーが発生しました。再度送信ください。");
    });
}

function setDisplayName(target) {
  // URLを取得
  let url = new URL(window.location.href);
  // URLSearchParamsオブジェクトを取得
  let params = url.searchParams;
  $("#" + target).append(params.get('name'))
}

function getParamId() {
  // URLを取得
  let url = new URL(window.location.href);
  // URLSearchParamsオブジェクトを取得
  let params = url.searchParams;
  return params.get('id')
}

//項目リストをDBから取得する
function getListData(id){
  //TODO:本番用と切り替える
  const API_URL = "https://rad-sherbet-3eb86a.netlify.app/.netlify/functions/GetList?id="+id;
  //const API_URL = "http://localhost:9000/.netlify/functions/GetList?id="+id;


  fetch(API_URL, {
    method: "GET",
  })

    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.items);
      var items = data.items;
      for(var i=0; i<items.length; i++){
        var td1 = "<tr><td>"+String(i+1)+"</td>"
        var td2 = "<td>"+items[i]+"</td>"
        var td3 = "<td style='text-align: center;'><input type='checkbox'></td></tr>"

        
      $("#list_table").append(td1 + td2 + td3)

      }

      
      

    })
    .catch(error => {
      console.log(error);
      alert("通信エラーが発生しました。再度送信ください。");
    });
}



//項目登録
function createItem() {
  //TODO:本番用と切り替える
  const API_URL = "https://rad-sherbet-3eb86a.netlify.app/.netlify/functions/CreateItem";
  //const API_URL = "http://localhost:9000/.netlify/functions/CreateItem";


  //入力内容を取得
  var item = document.getElementById("1-1").value;

var result = []
  let elements = document.getElementsByClassName('box');
  for(var i=0; i<elements.length; i++){
    result.push(elements[i].value)
    alert(elements[i].value)

  }
  alert(res)



  //コメントをスラックに送信する
  let body = {
    items: result,

  };

  // バックエンドAPIへPOST
  const payload = JSON.stringify(body);

  fetch(API_URL, {
    method: "POST",
    body: payload,
  })

    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.result);
      alert(data.result)
      

    })
    .catch(error => {
      console.log(error);
      alert("通信エラーが発生しました。再度送信ください。");
    });
}


function createHistory() {
  //TODO:本番用と切り替える
  const API_URL = "https://rad-sherbet-3eb86a.netlify.app/.netlify/functions/CreateListResult";
  //const API_URL = "http://localhost:9000/.netlify/functions/CreateListResult";


  //入力内容を取得
  var item = document.getElementById("1-1").value;

  
  var result = []
  /**
  let item = document.getElementsByClassName('box');
  let check = document.getElementsByClassName('check');

  for(var i=0; i<item.length; i++){
    console.log(check[i].checked)
    
    
    var json = {
      "item":item[i].value,
      "check":check[i].checked
    }
    result.push(json)

  }
  alert(res)
 */


  //コメントをスラックに送信する
  let body = {
    items: result,

  };

  // バックエンドAPIへPOST
  const payload = JSON.stringify(body);

  fetch(API_URL, {
    method: "POST",
    body: payload,
  })

    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.result);
      alert(data.result)
      

    })
    .catch(error => {
      console.log(error);
      alert("通信エラーが発生しました。再度送信ください。");
    });
}

//結果履歴をDBから取得する
function getHistory(id){
  //TODO:本番用と切り替える
  const API_URL = "https://rad-sherbet-3eb86a.netlify.app/.netlify/functions/GetResultHistory?id="+id;
  //const API_URL = "http://localhost:9000/.netlify/functions/GetResultHistory?id="+id;


  fetch(API_URL, {
    method: "GET",
  })

    .then((response) => {
      return response.json();
    })
    .then((data) => {
    //  alert(data.history[0].date);
     // alert(data.detail[0].item);
      var elem1 = document.getElementById("test1");
      elem1.textContent = data.continues
      /**
      for(var i=0; i<items.length; i++){
        var td1 = "<tr><td>"+String(i+1)+"</td>"
        var td2 = "<td>"+items[i]+"</td>"
        var td3 = "<td style='text-align: center;'><input type='checkbox'></td></tr>"

        
      $("#list_table").append(td1 + td2 + td3)

      }
 */
      
      

    })
    .catch(error => {
      console.log(error);
      alert("通信エラーが発生しました。再度送信ください。");
    });
}