let list = [
    {"desc": "rice", "amount":"1", "value":"5.40"},
    {"desc": "beer", "amount":"12", "value":"1.99"},
    {"desc": "meat", "amount":"1", "value":"15.00"}
]
function getTotal(list) {
    let total = 0;

    for (const key in list) {
        total += list[key].value * list[key].amount;
         // O comando multiplica a quantidade pelo valor, e o total é a soma de tudo.
    }
    document.getElementById("totalValue").innerHTML = formatValue(total);
}
function setList(list) {
    let table = '<thead><tr><td>Description</td><td>Amound</td><td>Value</td><td>Action</td></tr></thead><tbody><tr>';
    for (const key in list) {
      table +=   '<tr><td>'+formatDesc(list[key].desc)+'</td><td>'+formatAmount(list[key].amount) +'</td><td>'+formatValue(list[key].value)+'</td><td><button class="btn btn-default" onclick="setUpdate('+key+');">Edit</button> | <button class="btn btn-default" onclick="deleteForm('+key+');">Delete</td></tr>';
    }
    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table;
    getTotal(list);
    saveListStorage(list);
}
//Formantando dados
function formatAmount(amount) {
    return parseInt(amount);
}
function formatDesc(desc) {
    let str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}
function formatValue(value) {
    let num = parseFloat(value).toFixed(2)+ '';
    num = num.replace('.' , ',');
    num = '$ ' + num;
    return num;
}
function addData() {//Adicionando dados
    if (!validation()){
        return;
    }
    let desc = document.getElementById("desc").value;
    let amount = document.getElementById("amount").value;
    let value = document.getElementById("value").value;
    list.unshift({"desc": desc, "amount":amount, "value": value});
    setList(list);
}
function setUpdate(id) { //Editando Dados 
    var obj = list[id];
    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;
    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";

    document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';
}

function resetForm() { //Deletando Dados
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";
    document.getElementById("btnUpdate").style.display = 'none';
    document.getElementById("btnAdd").style.display = 'inline-block';
    document.getElementById('inputIDUpdate').innerHTML =  "";
    document.getElementById("errors").style.display = "none"
}
function updateData() { // Salvar alteração de dados
    if (!validation()){
        return;
    }
    let id = document.getElementById('idUpdate').value;
    let desc = document.getElementById("desc").value;
    let amount = document.getElementById("amount").value;
    let value =  document.getElementById("value").value;
    list[id] = {"desc": desc, "amount":amount , "value":value };
    resetForm()
    setList(list);
}
function deleteForm(id){ // Deletando dados
  if (confirm("Delete this item?")) {
    if (id === list.length - 1) {
          list.pop();
      }else if (id === 0){
        list.shift();
      }else{
        let arrAux = list.slice(0,id);
          let arrAuxEnd = list.slice(id + 1);
          list = arrAux.concat(arrAuxEnd);
      }
      setList(list);
  }
}
function validation() {
    let desc = document.getElementById("desc").value;
    let amount = document.getElementById("amount").value;
    let value = document.getElementById("value").value;
    document.getElementById("errors").style.display = "none"
    var errors = "";
    if (desc === "") {
        errors += '<p>Fill out description</p>';
    }
    if (amount === '') {
        errors += '<p>Fill out a quantity</p>';
    }else if (amount != parseInt(amount)) {
        errors += '<p>Fill out a valid amount</p>';
    }
    if (value === '') {
        errors += '<p>Fill out a value</p>';
    }else if (value != parseFloat(value)) {
        errors += '<p>Fill out a valid amount</p>';
    }

    if (errors != "") { // Mostrando erros pendentes
        document.getElementById("errors").style.display = "block";

        document.getElementById("errors").style.backgroundColor = "red";
        document.getElementById("errors").style.color = "white";
        document.getElementById("errors").style.padding = "10px 10px 10px 20px";
        document.getElementById("errors").style.borderRadius = "20px";
        document.getElementById("errors").style.margin = "10px";
        document.getElementById("errors").innerHTML = "<h3>ERROR:</H3>" + errors;
        return 0;
    }else{
        return 1;
    }
}
function deleteList() { // Deletando toda a lista
    if (confirm("Delete this list?")) {
        list = [];
        setList(list);
    }
}

function saveListStorage(list) { // Passa os dados para string para mandar, para o local Storage
    let jsonStr = JSON.stringify(list);
    localStorage.setItem("list", jsonStr);  
}

function initListStorage() { // Função de inicialização 
    let testList = localStorage.getItem("list"); // verifica se a lista já está salva no local storage.
    if(testList){
        list = JSON.parse(testList); // Ele pega os dados salvos no storege, e acrescenta de volta na lista.
        // O parse serve para transformar de string para array novamente.
    }
    setList(list);
}
initListStorage()
