import Link from 'next/link';

export default Home;

function Home() {
    return (
        <div className="p-4">
            <div className="container">
                <p><Link href="/users">Manage Users</Link></p>
                <p><Link href="/products">Manage Products</Link></p>
            </div>
        </div>
    );
}
