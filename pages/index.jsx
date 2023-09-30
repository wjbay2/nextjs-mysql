import Link from 'next/link';

export default function Home() {
    return (
        <div className="p-4">
            <div className="container">
                <h3>Uncle Jack Online Store - MVP</h3>
                <p><Link href="/products">Manage Products</Link></p>
            </div>
        </div>
    );
}
