"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { addEmployee } from "@/lib/actions";

import { Formik } from "formik";
import { useRouter } from "next/navigation";

import { useTransition } from "react";
import toast from "react-hot-toast";

export default function EmployeeAdd() {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Add Employee</CardTitle>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={{
            name: "",
            position: "",
            age: 0,
          }}
          onSubmit={async (val) => {
            startTransition(async () => {
              const response = await addEmployee(val);
              router.back();
              if (response.success) {
                toast.success(response.message);
              } else {
                toast.error(response.message);
              }
            });
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    value={values.name}
                    onChange={handleChange}
                    id="name"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    value={values.position}
                    onChange={handleChange}
                    id="position"
                    placeholder="Doe"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    value={values.age}
                    onChange={handleChange}
                    id="age"
                    type="number"
                    placeholder="90"
                    required
                  />
                </div>
                {loading ? (
                  <Button disabled className="w-full">
                    <Spinner /> Submit
                  </Button>
                ) : (
                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                )}
              </div>
            </form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
