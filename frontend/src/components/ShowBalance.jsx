import { useBalance } from "../hooks/useBalance";


const ShowBalance = () => {

    const { balance, loading } = useBalance();

    if (loading) return <div>Loading balance...</div>;

    return <div className="mt-4">
        <span className="text-lg font-semibold m-7 border-2 border-slate-300 p-2">Your balance: ${balance}</span>;
    </div>
}

export default ShowBalance