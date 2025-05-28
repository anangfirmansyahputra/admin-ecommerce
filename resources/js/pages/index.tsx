import DashboardLayout from '@/components/layouts/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Head, router } from '@inertiajs/react';

export default function Page() {
    const handleOrder = () => {
        // Menambah data di dalam databse
        //
        //

        router.visit('/categories');
        // window.location.href = '/categories';
    };

    console.log('test');

    return (
        <>
            <Head title="Dashboard" />
            <DashboardLayout>
                <Button onClick={handleOrder}>Order Now</Button>
            </DashboardLayout>
        </>
    );
}
