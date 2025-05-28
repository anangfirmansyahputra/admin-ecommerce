import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Category } from '@/types';
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface Props {
    categories: Category[]
}

export default function CategoryPage({ categories }: Props) {
    console.log(categories)

  return (
    <DashboardLayout>
        <div className="p-10">
            <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
            <p className="text-muted-foreground">List of category</p>

            <div className="mt-5">
                <DataTable columns={columns} data={categories} />
            </div>
        </div>
    </DashboardLayout>
  )
}
