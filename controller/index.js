// Hàm chọn thẻ qua selector
function dom(id) {
    return document.querySelector(id)
}
// Hàm in dữ liệu 1 mảng ra giao diện
function render(arr) {
    var table = ''
    arr.forEach(product => {
        table += `<tr>
        <td>${product.id}</td>
        <td><img src="${product.img}" width="60px" alt=""></td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.description}</td>
        <td>${product.type}</td>
        <td>
            <button class="btn btn-danger" title="delete" onclick="delProduct(${product.id})"><i class="fa fa-trash"></i></button>
            <button class="btn btn-primary" title="edit" onclick="editProduct(${product.id})"><i class="fa fa-pencil-square-o"></i></button>
        </td>
    </tr>`
    });
    dom('#tbContent').innerHTML = table
}
// Hàm clear form
function clearForm() {
    dom('#id').value = ''
    dom('#name').value = ''
    dom('#img').value = ''
    dom('#price').value = ''
    dom('#description').value = ''
    dom('#type').value = 'mobie'
}

//------------GET: lấy dữ liệu từ server và in ra giao diện---------------
function layDanhSachProduct() {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetAll',
        method: 'GET'
    })
    promise.then(function (result) {
        render(result.data)       
    })
    promise.catch(function (err) {
        console.log(err)
    })
}
// gọi hàm lấy dữ liệu từ server khi trang web vừa load xong
window.onload = function () {
    layDanhSachProduct()
}

// ------------POST: thêm dữ liệu -----------------------------
dom('#btnCreate').onclick = function () {
    var id = dom('#id').value
    var name = dom('#name').value
    var img = dom('#img').value
    var price = dom('#price').value
    var description = dom('#description').value
    var type = dom('#type').value

    var device = new Device(id, name, img, price, description, type)
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/CreateProduct',
        method: 'POST',
        data: device
    })
    promise.then(function (result) {
        layDanhSachProduct()
        clearForm()
    })
    promise.catch(function (err) {
        alert(err)
    })
}

// ------------DEL: xoá dữ liệu------------
function delProduct(product) {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/DeleteProduct/' + product,
        method: 'DELETE',
    })
    promise.then(function (result) {
        layDanhSachProduct()
    })
    promise.catch(function (err) {
        console.log(err)
    })
}

//----Chỉnh sửa-------------
function editProduct(product) {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetById/' + product,
        method: 'GET',
    })
    promise.then(function (result) {
        var product = result.data
        dom('#id').value = product.id
        dom('#name').value = product.name
        dom('#img').value = product.img
        dom('#price').value = product.price
        dom('#description').value = product.description
        dom('#type').value = product.type
    })
    promise.catch(function (err) {
        console.log(err)
    })
}

//------------------ PUT: cập nhật dữ liệu---------------
dom('#btnUpdate').onclick = function () {
    var id = dom('#id').value
    var name = dom('#name').value
    var img = dom('#img').value
    var price = dom('#price').value
    var description = dom('#description').value
    var type = dom('#type').value

    var device = new Device(id, name, img, price, description, type)
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/UpdateProduct/' + id,
        method: 'PUT',
        data: device
    })
    promise.then(function (result) {
        layDanhSachProduct()
    })
    promise.catch(function (err) {
        alert('không sửa id')
    })
}

// ----------------Search-------------------
dom('#btnSearch').onclick = function (e) {
    e.preventDefault()
    var ipSearch = dom('#inputSearch').value
    var promise = axios({
        url: 'https://svcy.myclass.vn/api/Product/SearchByName?name=' + ipSearch,
        method: 'GET'
    })
    promise.then(function (result) {
        render(result.data)
    })
    promise.catch(function (err) {
        dom('#tbContent').innerHTML = ''
    })
}
dom('#inputSearch').oninput = function () {
    var ipSearch = dom('#inputSearch').value
    if (ipSearch === '') {
        layDanhSachProduct()
    }
}