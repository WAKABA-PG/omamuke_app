function checkStart(){
  $("#checkInput").css('display', 'block');
}

//リスト編集のインデックス番号
var idx = 4;

function addRow(){
  var item = $("#addItem").val();
  $("#check_list").append('<tr id="row-'+idx+'"><td>' + idx + '</td><td>'+item+'</td><td style="text-align: center;"><button class="btn bg-gradient-info red w-12" onclick="deleteRow(\'row-'+idx+'\')">削除</button></td></tr>');
  idx++;
}

function deleteRow(rowno){
  $("#"+rowno).remove();
}