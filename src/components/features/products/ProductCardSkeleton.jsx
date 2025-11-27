import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div>
      <div className=" space-y-2">
        <Skeleton className="h-30 w-50 " />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[170px]" />
          <Skeleton className="h-4 w-[130px]" />
        </div>
      </div>
    </div>
  );
}
