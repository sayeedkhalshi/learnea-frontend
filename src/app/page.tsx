import TermsOnMap from "@/components/TermsOnMap";
import Image from "next/image";

export default function Home() {
    return (
        <main className="flex min-h-screen max-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full font-mono">
                <TermsOnMap />
            </div>
        </main>
    );
}
