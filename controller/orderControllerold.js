import {customer_array, item_array, order_array,cart_array,sub_total} from "../db/database.js";
import cartModel from "../model/cartModel.js";
import orderModel from "../model/orderModel.js";

let total = 0;
const currentDate = new Date();
console.log(currentDate);



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
let item_name = null
let customer_name = null
$("#addItemBtn").on("click " ,function (){
     item_name = $('#itemSelect option:selected').val();
     customer_name = $('#customerSelect option:selected').val();
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
export function placeOrder() {

}
export function loadCustomers() {
    console.log("Customer Controller Loaded");

    // Clear existing options in the select element
    $("#customerSelect").empty();

        console.log("Customers available.");
        customer_array.map((item) => {
            // Create a new option element
            let customer = `<option >${item.first_name}</option>`; // Assuming item has an 'id' property
            console.log(customer); // Log the option for debugging
            $("#customerSelect").append(customer); // Append option to the select element
        });

}

export function loadItems() {
    console.log("Item Controller Loaded");

    // Clear existing options in the select element
    $("#itemSelect").empty();

    console.log("Items available.");
    item_array.map((item) => {
        // Create a new option element
        let item1 = `<option >${item.description}</option>`; // Assuming item has an 'id' property
        console.log(item1); // Log the option for debugging
        $("#itemSelect").append(item1); // Append option to the select element
    });

}

$("#customerSelect").on('click' ,function () {
    loadCustomers();
});
$("#itemSelect").on('click' ,function () {
    loadItems();
});

const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

$("#placeOrderBtn").on("click " ,function (){
    let order_id = order_array.length + 1;
    let payment_method = selectedPaymentMethod
    let discount = $('#discountInput').val();
    let qty = $('#quantitySelect').val();
    let total = $('#totalAmount').text();
    console.log("Order Placed",order_id,customer_name,item_name,qty,payment_method,discount,total);

    if (total === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Add Items To cart!",
        });
    }else if (customer_name === null) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Select Customer!",
        });
    }else if (item_name === null) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Select Item!",
        });
    }else if ((qty === 0) || (qty === null)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Qty!",
        });
    }else{
        let order = new orderModel(order_id,customer_name,item_name,qty,payment_method,discount,total);
        order_array.push(order);
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Order Placed Successfully!",
        });
        loadOrderTable()
    }




    $('#customerSelect').val("");
    $('#itemSelect').val("");
    $('#discountInput').val("");
    $('#totalAmount').text("");


});

const loadOrderTable = () => {
    console.log("Loading History Table");
    $('#orderHistory').empty();

    order_array.forEach((item) => {
        console.log("Order Item:", item);
        let data = `<tr>
            <td>${item.id}</td>
            <td>${item.customer}</td>
            <td>${item.item}</td> <!-- Removed item() -->
            <td>${item.qty}</td> <!-- Removed qty() -->
            <td>${item.paymentMethod}</td>
            <td>${item.discount}</td>
            <td>${item.total}</td>
        </tr>`;
        $('#orderHistory').append(data);
    });
};
