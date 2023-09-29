import Link from 'next/link';

export default Home;

function Home() {
    return (
        <div className="p-4">
            <div className="container">
                <p>You&apos;re logged in with Next.js & JWT!!</p>
                <p><Link href="/users">Manage Users</Link></p>
            </div>
        </div>
    );
}
