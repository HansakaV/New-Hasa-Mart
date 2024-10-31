import {customer_array, item_array, order_array,cart_array} from "../db/database.js";
import cartModel from "../model/cartModel.js";


const loadCart = () => {
    $('#orderItemsList').empty()
    cart_array.map((item, index) => {
        console.log(item);
        let data = `<tr>
        <td>${item.first_name}</td>
        <td>${item.last_name}</td>
        <td>${item.mobile}</td>
        <td>${item.email}</td>
        <td>${item.address}</td>
    </tr>`
        $('#orderItemsList').append(data)

    });
};
function getItemPrice() {
    let item_id = $('#itemSelect').val();
    console.log("Selected item ID: ", item_id);

    // Find the item in the item_array by ID
    let selectedItem = item_array.find(item => item.description === item_id);

    // Check if the item was found and get the price
    if (selectedItem) {
        console.log(`Price of selected item: ${selectedItem.price}`);
        return selectedItem.price; // Return or use the price as needed
    } else {
        console.log("Item not found.");
        return null; // or handle the case when the item is not found
    }
}

$("#addItemBtn").on("click " ,function (){
    let item_id = $('#itemSelect').val();
    let qty = $('#qty').val();
    let unit_price = getItemPrice();
    let total = qty * unit_price;
    console.log("price",unit_price,"total",total);

    let id = cart_array.length + 1;
    let cart = new cartModel(id,item_id,qty,unit_price,total);
    cart_array.push(cart);

    $('#itemSelect').val("");
    $('#qty').val("");
    $('#customerSelect').val("");

    loadCart()

})
export function loadCustomers() {
    console.log("Customer Controller Loaded");

    // Clear existing options in the select element
    $("#customerSelect").empty();

        console.log("Customers available.");
        customer_array.forEach((item) => {
            // Create a new option element
            let option = `<option value="${item.id}">${item.first_name}</option>`; // Assuming item has an 'id' property
            console.log(option); // Log the option for debugging
            $("#customerSelect").append(option); // Append option to the select element
        });

}

export function loadItems() {
    console.log("Item Controller Loaded");

    // Clear existing options in the select element
    $("#itemSelect").empty();

    console.log("Items available.");
    item_array.forEach((item) => {
        // Create a new option element
        let option = `<option value="${item.id}">${item.description}</option>`; // Assuming item has an 'id' property
        console.log(option); // Log the option for debugging
        $("#itemSelect").append(option); // Append option to the select element
    });

}

$("#customerSelect").on('click' ,function () {
    loadCustomers();
});
$("#itemSelect").on('click' ,function () {
    loadItems();
});
