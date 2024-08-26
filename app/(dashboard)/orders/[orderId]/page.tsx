import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/orderItems/OrderItemsColums";

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  const res = await fetch(
    `${process.env.ADMIN_DASHBOARD_URL}/api/orders/${params.orderId}`
  );
  const { orderDetails, customer } = await res.json();

  const { street, city, state, postalCode, country } =
    orderDetails.shippingAddress;

  return (
    <div className="flex flex-col p-10 gap-5">
      <p className="text-base-bold">
        ID: <span className="text-base-medium">{orderDetails._id}</span>
      </p>
      <p className="text-base-bold">
        Tên Khách Hàng:{" "}
        <span className="text-base-medium">{customer.name}</span>
      </p>
      <p className="text-base-bold">
        Địa Chỉ:{" "}
        <span className="text-base-medium">
          {street}, {city}, {state}, {postalCode}, {country}
        </span>
      </p>
      <p className="text-base-bold">
        Tổng Tiền Phải Thanh Toán:{" "}
        <span className="text-base-medium">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
          }).format(orderDetails.totalAmount)}
        </span>
      </p>
      <p className="text-base-bold">
        Mã Vận Chuyển:{" "}
        <span className="text-base-medium">{orderDetails.shippingRate}</span>
      </p>
      <DataTable
        columns={columns}
        data={orderDetails.products}
        searchKey="product"
      />
    </div>
  );
};

export default OrderDetails;
