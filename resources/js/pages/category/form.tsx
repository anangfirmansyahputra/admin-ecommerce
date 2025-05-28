import DashboardLayout from '@/components/layouts/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

interface Category {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
}

interface Props {
    category?: Category;
}

export default function CategoryForm({ category }: Props) {
    const { data, setData, post, processing, errors, put } = useForm({
        name: category ? category.name : '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (category) {
            put(route('categories.update', [category.id]), {
                onSuccess: () => {
                    Swal.fire({
                        title: 'Success',
                        text: 'Update success',
                        icon: 'success',
                    });
                },
            });
        } else {
            post(route('categories.store'));
        }
    };

    return (
        <DashboardLayout>
            <div className="p-10">
                <h2 className="text-lg font-medium">Category</h2>
                <p className="text-slate-700">Form Category</p>

                <form onSubmit={handleSubmit} className="mt-5 max-w-lg space-y-5">
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </div>
                    <Button disabled={processing}>Submit</Button>
                </form>
            </div>
        </DashboardLayout>
    );
}
