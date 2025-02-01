import { useQueryClient } from "@tanstack/react-query"
import { usegetAllBookings } from "../hooks/usegetAllBookings"
import { usegetAllProducts } from "../hooks/useGetAllProducts"
import AddItem from "./AddItem"
import Product from "./Product"
import CommentMangement from "./CommentMangement"

export default function AdminArea() {
    const { data: booking } = usegetAllBookings()
    const { data: products } = usegetAllProducts()
    const queryClient = useQueryClient()
    const loogedInUser = queryClient.getQueryData(["loggedInUser"])
    console.log(products);

    return (
        <>
            <h3 className="text-[30px] font-bold mb-5">Admins Area</h3>
            {booking?.length > 0 &&
                <>
                    <h3 className="text-[22px] font-bold mb-5">Mange All Bookings ({booking?.length}) </h3>
                    <section className="py-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {booking?.map(e => (
                            <Product product={e?.productId} />
                        ))}
                    </section>
                </>
            }
            <CommentMangement />
            {products?.documents?.length > 0 && <>
                <h3 className="text-[22px] font-bold mb-5">Mange All Products ( {products?.documentsLength} )</h3>
                <section className="py-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products?.documents?.map(e => (
                        <Product product={e} />
                    ))}
                </section>
            </>}
            <AddItem adminName={loogedInUser?.data?.name} />

        </>
    )
}
