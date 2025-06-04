'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Category } from '@/types';
import { Link, router } from '@inertiajs/react';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
    id: string;
    name: string;
    category_id: string;
    price: string;
    description?: string;
    company: string;
    created_at: Date;
    updated_at: Date;
    image: string | null;
};

export const columns: ColumnDef<
    Product & {
        category: Category;
    }
>[] = [
    {
        accessorKey: 'image',
        header: 'Image',
        cell: ({ row }) => {
            const product = row.original;
            const imageUrl = product.image
                ? `https://admin.fullstressdigital.id/storage/${product.image}`
                : 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=';

            return <img src={imageUrl} className="aspect-square w-[100px] object-contain" alt={product.name} />;
        },
    },
    {
        accessorKey: 'name',
        // header: "Name",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        // accessorKey: 'category_id',
        id: 'category',
        header: 'Category',
        cell: ({ row }) => {
            const product = row.original;

            return product.category.name;
        },
    },
    {
        accessorKey: 'company',
        header: 'Perusahaan',
    },
    {
        accessorKey: 'price',
        header: 'Price',
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const product = row.original;

            const handleDelete = () => {
                router.visit(route('products.destroy', [product.id]), {
                    method: 'delete',
                    onSuccess: (res) => {
                        console.log('success', res);
                    },
                    onError: (err) => {
                        alert(err.message);
                    },
                });
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                            <Link href={route('products.edit', [product.id])}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={route('products.variants.index', [product.id])}>View variants</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive" onClick={handleDelete}>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
