import { Outlet } from 'react-router';

export default function LayoutAuth() {
    return (
        <div className="bg-stone-200 h-screen w-screen flex justify-center flex-col items-center">
            <div className=""><Outlet /></div>
        </div>
    );
}
