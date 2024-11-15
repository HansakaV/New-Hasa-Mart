import {customer_array, item_array, order_array,cart_array,sub_total} from "../db/database.js";
import cartModel from "../model/cartModel.js";

let total = 0;

const loadCart = () => {
    $('#orderItemsList').empty()
    cart_array.map((item, index) => {
        console.log(item);
        let data = `<tr>
        <td>${item.cartItem}</td>
        <td>${item.price}</td>
        <td>${item.quantity}</td>
        <td>${item.total}</td>
    </tr>`
        $('#orderItemsList').append(data)

    });
};
function loadTotal() {
     total = sub_total.reduce(function(sum, number) {
        return sum + number;
    }, 0);
    console.log("TotalSub: ", total);

// Display the sum in the designated span
    $('#subtotal').text(total);
}

function subTotal() {
    let discount = $('#discountInput').val();
    console.log("Discount: ", discount);
    let dis = total * (discount/100);
    let subTotal = total - dis;
    $('#totalAmount').text(subTotal);
}



function getItemPrice() {
    let item_name = $('#itemSelect option:selected').text();
    console.log("Selected item ID: ", item_name);

    let selectedItem = item_array.find(item => item.description === item_name);
    console.log("Selected item: ", selectedItem)

    // Check if the item was found and get the price
    if (selectedItem) {
        console.log(`Price of selected item: ${selectedItem.unitPrice}`);
        return selectedItem.unitPrice;
    } else {
        console.log("Item not found.");
        return null;
    }
}
$("#confirm-discount").on("click " ,function (){
    subTotal();
    console.log("Discount Confirmed");
})

$("#addItemBtn").on("click " ,function (){
    let item_name = $('#itemSelect option:selected').text();
    let qty = $('#quantitySelect').val();
    let unit_price = getItemPrice();
    let total = qty * unit_price;
    console.log("price",unit_price,"total",total);

    let id = cart_array.length + 1;
    let cart = new cartModel(id,item_name,qty,unit_price,total);
    cart_array.push(cart);
    sub_total.push(total);

    $('#itemSelect').val("");
    $('#qty').val("");
    $('#customerSelect').val("");

    loadCart()
    console.log("Cart Loaded");
    loadTotal()
    console.log("Total Loaded");


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
