import DashboardLayout from '@/components/layouts/dashboard-layout';
import { Category } from '@/types';
import { columns } from './columns';
import { DataTable } from './data-table';

interface Product {
    id: string;
    name: string;
    category_id: string;
    price: string;
    description?: string;
    company: string;
    created_at: Date;
    updated_at: Date;
    image: string | null;
}

interface Props {
    products: (Product & {
        category: Category;
    })[];
}

export default function ProductPage({ products }: Props) {
    console.log(products);

    return (
        <DashboardLayout>
            <div className="p-10">
                <h2 className="text-2xl font-bold tracking-tight">Products</h2>
                <p className="text-muted-foreground">List of products</p>

                <DataTable columns={columns} data={products} />
            </div>
        </DashboardLayout>
    );
}
