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
    return total;
}
function setList(list) {
    let table = '<thead><tr><td>Description</td><td>Amound</td><td>Value</td><td>Action</td></tr></thead><tbody><tr>';
    for (const key in list) {
      table +=   '<tr><td>'+formatDesc(list[key].desc)+'</td><td>'+formatAmount(list[key].amount) +'</td><td>'+formatNumber(list[key].value)+'</td><td><button class="btn btn-default" onclick="('+key+');">Edit</button> | <button class="btn btn-default" onclick="deleteForm('+key+');">Delete</td></tr>';
    }
    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table;

}
function formatAmount(value) {
    return parseInt(amount);
}
function formatDesc(desc) {
    let str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}
function formatNumber(value) {
    let num = parseFloat(value).toFixed(2)+ '';
    num = num.replace('.' , ',');
    num = '$ ' + num;
    return num;
}
function addData() {
    let desc = document.getElementById('desc').value;
    let amount = document.getElementById('amount').value;
    let value = document.getElementById('value').value;
    list.unshift({"desc": desc, "amount":amount, "value": value});
    setList(list);
}
function setUpdate(id) {
    let obj = list[id];
    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;
    document.getElementById("btnUpdate").style.display = 'inline-block';
    document.getElementById("btnAdd").style.display = 'none';
    document.getElementById('inputIDUpdate').innerHTML =  '<input type="hidden" id="idUpdate"></input>';
}
function resetForm() {
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";
    document.getElementById("btnUpdate").style.display = 'none';
    document.getElementById("btnAdd").style.display = 'inline-block';
    document.getElementById('inputIDUpdate').innerHTML =  "";
}
function updateData() {
    let id = document.getElementById('updateData');
    let desc = document.getElementById("desc").value;
    let amount = document.getElementById("amount").value;
    let value =  document.getElementById("value").value;
    list[id] = {'desc': desc, 'amount':amount , 'value':value }
    resetForm()
    setList(list);
}
function deleteForm(id){
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
    var errors = "";
    if (desc === "") {
        errors += '<p>Fill out description</p>';
    }
    if (amount === '') {

    }
}
setList(list);
console.log(getTotal(list,))
