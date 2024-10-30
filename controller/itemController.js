import itemModel from '../model/itemModel.js';
import { item_array} from '../db/database.js';

console.log("Item Controller Loaded")

let selected_item_index = null

const loadCustomerTable = () => {
    $('#itemTableBody').empty()
    item_array.map((item, index) => {
        console.log(item);
        let data = `<tr>
        <td>${item.id}</td>
        <td>${item.description}</td>
        <td>${item.qty}</td>
        <td>${item.unitPrice}</td>
    </tr>`
        $('#itemTableBody').append(data)

    });
};

$("#add-item").on("click", function () {
    let id = $('#itemID').val();
    let description = $('#description').val();
    let quantity = $('#quantity').val();
    let unitPrice = $('#unitPrice').val();
    console.log(id, description, quantity, unitPrice)

    if (id.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid ID!",
        });

    } else if (description.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Description!",
        });
    } else if (quantity.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Quality!",
        });
    } else if (unitPrice.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Unit Price!",
        });
    } else {
        let item = new itemModel(id, description, quantity, unitPrice);
        item_array.push(item);
        loadCustomerTable();
    }
})

$("#itemTableBody").on("click", "tr", function () {
    let value = $(this).index()
    let item = item_array[value]
    console.log(item)

    let id = item.id;
    let description = item.description;
    let quantity = item.qty;
    let unitPrice = item.unitPrice;

    $('#itemID').val(id);
    $('#description').val(description);
    $('#quantity').val(quantity);
    $('#unitPrice').val(unitPrice);
})
$('#update-item').on('click', function () {
    let id = $('#itemID').val();
    let description = $('#description').val();
    let quantity = $('#quantity').val();
    let unitPrice = $('#unitPrice').val();

    let item = new itemModel(id, description, quantity, unitPrice);
    item_array[selected_item_index] = item;
    loadCustomerTable();


})



