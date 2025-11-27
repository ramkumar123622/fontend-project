import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Formik } from "formik";
import * as Yup from "yup";

import { Spinner } from "@/components/ui/spinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUpdateProductMutation } from "../products/productApi";
import { base } from "@/app/mainApi";

const valSchema = Yup.object({
  title: Yup.string().min(4).required(),
  detail: Yup.string().min(10).required(),
  price: Yup.string().required(),
  category: Yup.string().required(),
  brand: Yup.string().required(),
  image: Yup.mixed()
    .test("fileType", "Unsupported file format", (val) => {
      if (!val) return true;
      return (
        val &&
        ["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(val.type)
      );
    })
    .test("filesize", "file too large", (val) => {
      if (!val) return true;
      return val && val.size <= 5 * 1024 * 1024;
    }),
});
export default function ProductEditForm({ product }) {
  const nav = useNavigate();
  const { user } = useSelector((state) => state.userSlice);
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  // // FIX 1: Prevent crash before product loads
  // if (product) return <p>Loading...</p>;

  return (
    <div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Product Create</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              // FIX 2: prevent undefined crash
              title: product?.title || "",
              detail: product?.detail || "",
              price: product?.price || "",
              stock: product?.stock || "",
              category: product?.category || "",
              brand: product?.brand || "",
              image: "",
              imageReview: product?.image || "",
            }}
            onSubmit={async (val) => {
              try {
                const formData = new FormData();
                formData.append("title", val.title);
                formData.append("detail", val.detail);
                formData.append("price", val.price);
                formData.append("stock", val.stock);
                formData.append("category", val.category);
                formData.append("brand", val.brand);
                if (val.image) {
                  formData.append("image", val.image);
                }

                await updateProduct({
                  token: user.token,
                  body: formData,
                  id: product._id,
                }).unwrap();

                toast.success("Product Updated Successfully");
                nav(-1);
              } catch (err) {
                console.log(err);
                toast.error(err.data.message);
              }
            }}
            validationSchema={valSchema}
          >
            {({
              handleChange,
              handleSubmit,
              errors,
              touched,
              setFieldValue,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      name="title"
                      onChange={handleChange}
                      value={values.title}
                      id="title"
                      type="text"
                      placeholder="product-title"
                    />
                    {touched.title && errors.title && (
                      <p className="text-red-500">{errors.title}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="detail">Detail</Label>
                    <Textarea
                      name="detail"
                      onChange={handleChange}
                      value={values.detail}
                      id="detail"
                      type="text"
                      placeholder="product-detail"
                    />
                    {touched.detail && errors.detail && (
                      <p className="text-red-500">{errors.detail}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      name="price"
                      onChange={handleChange}
                      value={values.price}
                      id="price"
                      type="number"
                      placeholder="product-price"
                    />
                    {touched.price && errors.price && (
                      <p className="text-red-500">{errors.price}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      name="stock"
                      onChange={handleChange}
                      value={values.stock}
                      id="stock"
                      type="number"
                      placeholder="product-stock"
                    />
                    {touched.stock && errors.stock && (
                      <p className="text-red-500">{errors.stock}</p>
                    )}
                  </div>

                  <div>
                    <Select
                      value={values.category}
                      name="category"
                      onValueChange={(value) =>
                        setFieldValue("category", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="food">food</SelectItem>
                          <SelectItem value="clothes">clothes</SelectItem>
                          <SelectItem value="tech">Tech</SelectItem>
                          <SelectItem value="jewellery">jewellery</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {touched.category && errors.category && (
                      <p className="text-red-500">{errors.category}</p>
                    )}
                  </div>

                  <div>
                    <Select
                      value={values.brand}
                      name="brand"
                      onValueChange={(value) => setFieldValue("brand", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="addidas">addidas</SelectItem>
                          <SelectItem value="samsung">samsung</SelectItem>
                          <SelectItem value="tanishq">tanishq</SelectItem>
                          <SelectItem value="iphone">iphone</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {touched.brand && errors.brand && (
                      <p className="text-red-500">{errors.brand}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="image">Select an image</Label>
                    <Input
                      name="image"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setFieldValue("imageReview", URL.createObjectURL(file));
                        setFieldValue("image", file);
                      }}
                      id="image"
                      type="file"
                      placeholder="product-image"
                    />
                    {values.imageReview && !errors.image && (
                      <img src={values.imageReview} alt="" />
                    )}

                    {touched.image && errors.image && (
                      <p className="text-red-500">{errors.image}</p>
                    )}
                    {!values.imageReview
                      ? `${base}/${values.imageReview}`
                      : values.imageReview}
                  </div>
                </div>

                {isLoading ? (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled
                    className="w-full mt-5"
                  >
                    <Spinner />
                    Submit
                  </Button>
                ) : (
                  <Button type="submit" className="w-full mt-5">
                    Submit
                  </Button>
                )}
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
