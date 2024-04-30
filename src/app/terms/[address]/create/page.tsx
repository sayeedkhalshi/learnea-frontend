"use client";
import CreateTermForm from "@/components/Forms/CreateTerm.form";
import { useReadContract } from "wagmi";
import { TermDetails, parseTermDetails } from "../page";
import { term_v3 } from "@/abi/Term/v3";

const CreateTermPage = ({ params }: { params: { address: `0x${string}` } }) => {
    const {
        data: details,
        error,
        isPending,
    } = useReadContract({
        abi: term_v3,
        address: "0xE792ded485888608D7Ab7a75f4D821D3D97Db6eA",
        functionName: "getDetails",
    });

    if (isPending)
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        );
    if (error)
        return (
            <div className="flex justify-center items-center h-screen">
                Error! {error.message}
            </div>
        );

    const termDetails: TermDetails | null = details
        ? parseTermDetails(details)
        : null;

    return (
        termDetails && (
            <CreateTermForm address={params.address} term={termDetails} />
        )
    );
};

export default CreateTermPage;
