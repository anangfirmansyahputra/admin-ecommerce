'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ProductVariant } from '@/types';
import { Link, router } from '@inertiajs/react';
import Swal from 'sweetalert2';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const columns: ColumnDef<ProductVariant>[] = [
    {
        accessorKey: 'image',
        header: 'Image',
        cell: ({ row }) => {
            const variant = row.original;

            return (
                <img
                    src={`https://admin.fullstressdigital.id/storage/${variant.image}`}
                    className="aspect-square w-[100px] object-contain"
                    alt={variant.variant_name}
                />
            );
        },
    },
    {
        accessorKey: 'variant_name',
        header: 'Variant Name',
    },
    {
        accessorKey: 'stock',
        header: 'Stock',
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const variant = row.original;

            const handleDelete = () => {
                router.visit(route('products.variants.destroy', [variant.product_id, variant.id]), {
                    method: 'delete',
                    onSuccess: () => {
                        Swal.fire({
                            text: 'Delete success',
                            title: 'Success',
                            icon: 'success',
                        });
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
                            <Link href={route('products.variants.edit', [variant.product_id, variant.id])}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive" onClick={handleDelete}>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
