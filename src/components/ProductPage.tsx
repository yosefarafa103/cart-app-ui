import { useLocation, useNavigate } from "react-router-dom";
import { useGetSingleProduct } from "../hooks/useGetSingleProduct";
import img from "../assets/1291777_price_price tag_pricing_product_icon.png";
import user from "../assets/download.png";
import { useQuery } from "@tanstack/react-query";
import { useLoggedInUser } from "../hooks/useLoggedInUser";
import AddComment from "./AddComment";
import { FaCheck } from "react-icons/fa";
import UserComment from "./UserComment";
import { getProductComments } from "./services/getProductComments";
import Loader from "./Loader";
import NotFound from "./NotFound";
import toast from "react-hot-toast";
import { useDeleteProduct } from "../hooks/useDeleteProduct";

function ProductPage() {
  const { pathname } = useLocation();
  const product = pathname.slice(1).split("product").join("").replace("/", "");
  const { data } = useGetSingleProduct(product);
  const { data: userData } = useLoggedInUser();
  const { data: productComments, isLoading } = useQuery({
    queryKey: [`product_${product}_comments`],
    queryFn: async () => await getProductComments(product),
  });
  const { mutate } = useDeleteProduct();
  const navigate = useNavigate();
  // const usersCommentToProduct = productComments?.filter(
  //   (comment) => comment.publishedBy === userData?._id
  // );
  const commentNotIncludesCurrentLoggedInUser = productComments?.filter(
    (comment) => comment.publishedBy !== userData?._id
  );
  const isCurrentUserCommented = productComments?.some(
    (el) => el.publishedBy._id === userData?._id
  );
  if (!data && !isLoading) {
    return <NotFound />;
  }

  return (
    <>
      <div className=" p-5 min-h-[50vh]  rounded-br-xl rounded-bl-xl">
        {/* {data?.images?.length &&
          data?.images?.map((im) => (
            <img src={data?.images?.length ? `` : img} className="max-w-[300px] mt-5 mx-auto " alt="" />
          ))} */}
        <img src={data?.images ? `https://res.cloudinary.com/dj4it3c61/image/upload/${data?.images[0]}?_a=BAMClqWO0` : img} className="h-[50vh] mx-auto object-cover rounded-2xl" alt="" />
      </div>
      <section className="md:w-3/4 place-content-center mx-auto">

        <h4 className="mt-3 font-semibold">{data?.productName}</h4>
        {!isCurrentUserCommented ? (
          <>
            <AddComment productId={data?._id} commentsList={data?.commentedBy} />
          </>
        ) : (
          isCurrentUserCommented && (
            <>
              <div className="bg-green-50 mt-4 p-1 px-4 rounded-md">
                <div className="flex my-2 items-center gap-2">
                  <img
                    src={user}
                    className="size-[35px] rounded-[50%] object-cover"
                    alt=""
                  />
                  <div className="flex flex-col">
                    <div className="text-xs font-semibold">@{userData?.name}</div>
                    <div className="text-sm">
                      {isCurrentUserCommented
                        ? productComments?.filter(
                          (el) => el.publishedBy._id === userData?.data?._id
                        )?.[0]?.text
                        : null}
                    </div>
                  </div>
                </div>
                <h3 className="my-3  p-2 bg-green-400 w-fit px-5 rounded-md text-white">
                  You Already Comment To This Product{" "}
                  <FaCheck className="inline" />{" "}
                </h3>
              </div>
            </>
          )
        )}
        {userData?.role === "admin" && (
          <div
            onClick={() => {
              confirm(`Are You Sure To Delete Product: *${data?.productName}* `);
              mutate(product, {
                onSuccess: () => {
                  toast.success("deleted product");
                  navigate("/");
                },
              });
            }}
            className="bg-red-400 ml-3 mt-5 mb-2 cursor-pointer hover:bg-red-500  px-4 py-2 font-semibold rounded-md text-white w-fit"
          >
            Delete This Product
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold border-y-[1px] px-4 py-2">
            Product's Comment
          </h3>
          {/* {productComments} */}
          {isLoading && <Loader />}
          <section className="pl-[20px]">
            {commentNotIncludesCurrentLoggedInUser?.map((comment) => (
              <UserComment
                isDeleted={comment.isDeleted}
                role={comment?.publishedBy.role}
                key={comment._id}
                user={comment.publishedBy._id}
                comment={comment?.text}
              />
            ))}
          </section>
          {!productComments?.length && (
            <h2 className="mt-3 text-center font-bold mb-4">
              No Comments yet! 😥{" "}
            </h2>
          )}
        </div>
      </section>
    </>
  );
}
export default ProductPage;
