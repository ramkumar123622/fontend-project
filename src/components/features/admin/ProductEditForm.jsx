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
  stock: Yup.string().required(),
  category: Yup.string().required(),
  brand: Yup.string().required(),
  image: Yup.mixed()
    .test("fileType", "Unsupported file format", (val) => {
      if (!val) return true;
      return ["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(
        val.type
      );
    })
    .test("fileSize", "File too large", (val) => {
      if (!val) return true;
      return val.size <= 5 * 1024 * 1024;
    }),
});

export default function ProductEditForm({ product }) {
  const nav = useNavigate();
  const { user } = useSelector((state) => state.userSlice);
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  // Correct loading condition
  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Product Update</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            enableReinitialize
            initialValues={{
              title: product.title,
              detail: product.detail,
              price: product.price,
              stock: product.stock,
              category: product.category,
              brand: product.brand,
              image: "",
              imageReview: product.image,
            }}
            validationSchema={valSchema}
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
                toast.error(err.data?.message || "Error occurred");
              }
            }}
          >
            {({
              handleChange,
              handleSubmit,
              setFieldValue,
              values,
              touched,
              errors,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  {/* Title */}
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      type="text"
                      placeholder="Product title"
                      value={values.title}
                      onChange={handleChange}
                    />
                    {touched.title && errors.title && (
                      <p className="text-red-500">{errors.title}</p>
                    )}
                  </div>

                  {/* Detail */}
                  <div className="grid gap-2">
                    <Label htmlFor="detail">Detail</Label>
                    <Textarea
                      id="detail"
                      name="detail"
                      placeholder="Product detail"
                      value={values.detail}
                      onChange={handleChange}
                    />
                    {touched.detail && errors.detail && (
                      <p className="text-red-500">{errors.detail}</p>
                    )}
                  </div>

                  {/* Price */}
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="Product price"
                      value={values.price}
                      onChange={handleChange}
                    />
                    {touched.price && errors.price && (
                      <p className="text-red-500">{errors.price}</p>
                    )}
                  </div>

                  {/* Stock */}
                  <div className="grid gap-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      placeholder="Product stock"
                      value={values.stock}
                      onChange={handleChange}
                    />
                    {touched.stock && errors.stock && (
                      <p className="text-red-500">{errors.stock}</p>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    <Select
                      name="category"
                      value={values.category}
                      onValueChange={(value) =>
                        setFieldValue("category", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="food">Food</SelectItem>
                          <SelectItem value="clothes">Clothes</SelectItem>
                          <SelectItem value="tech">Tech</SelectItem>
                          <SelectItem value="jewellery">Jewellery</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {touched.category && errors.category && (
                      <p className="text-red-500">{errors.category}</p>
                    )}
                  </div>

                  {/* Brand */}
                  <div>
                    <Select
                      name="brand"
                      value={values.brand}
                      onValueChange={(value) => setFieldValue("brand", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="addidas">Addidas</SelectItem>
                          <SelectItem value="samsung">Samsung</SelectItem>
                          <SelectItem value="tanishq">Tanishq</SelectItem>
                          <SelectItem value="iphone">iPhone</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {touched.brand && errors.brand && (
                      <p className="text-red-500">{errors.brand}</p>
                    )}
                  </div>

                  {/* Image */}
                  <div className="grid gap-2">
                    <Label htmlFor="image">Select an image</Label>
                    <Input
                      id="image"
                      name="image"
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setFieldValue("image", file);
                          setFieldValue(
                            "imageReview",
                            URL.createObjectURL(file)
                          );
                        }
                      }}
                    />
                    {values.imageReview && (
                      <img
                        src={
                          values.image?.name
                            ? values.imageReview
                            : `${base}/${values.imageReview}`
                        }
                        alt="preview"
                        className="max-h-40 mt-2"
                      />
                    )}
                    {touched.image && errors.image && (
                      <p className="text-red-500">{errors.image}</p>
                    )}
                  </div>

                  {/* Submit */}
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
                </div>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
