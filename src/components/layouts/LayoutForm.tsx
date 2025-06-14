import { Outlet } from 'react-router';

export default function LayoutForm() {
    return (
        <div className="bg-stone-200 !h-full w-screen p-10">
            <div className=""><Outlet /></div>
        </div>
    );
}
