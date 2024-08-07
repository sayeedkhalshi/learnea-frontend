"use client";

import { useReadContracts } from "wagmi";
import ConnectedNode from "./ConnectedNode";
import { learnea_abi } from "@/abi/Learnea";
import { learnea_contract_address } from "@/lib/constant";
import { term_abi } from "@/abi/Term";
import {
    selectCentralAddressAroundTermsTypeByIndex,
    selectSingleCentralAddress,
    setCentralTermsLevelbyIndex,
} from "@/redux/features/centralTerms.slice";
import { useDispatch, useSelector } from "react-redux";
import {
    findFunctionListForTermTypes,
    getAllMethodsForTermEachFilter,
} from "@/types/Term.type";

type TermsOnMapProps = {
    addressIndex: number;
};

const TermsOnMap: React.FC<TermsOnMapProps> = ({ addressIndex }) => {
    const address = useSelector((state: any) =>
        selectSingleCentralAddress(state, addressIndex)
    );

    const filterValueForAroundTerms = useSelector((state: any) =>
        selectCentralAddressAroundTermsTypeByIndex(state, addressIndex)
    );

    const allMethods = getAllMethodsForTermEachFilter(
        filterValueForAroundTerms,
        8
    );
    const dispatch = useDispatch();

    const {
        data: nodeDetails,
        error,
        isPending,
        isError,
        isLoadingError,
        refetch,
    } = useReadContracts({
        contracts: [
            {
                abi: term_abi,
                address: address, //control structure
                functionName: "getDetails",
            },

            {
                abi: learnea_abi,
                address: learnea_contract_address, //control structure
                functionName: allMethods[0].method,
                args: [address, allMethods[0].indexValue],
            },
            {
                abi: learnea_abi,
                address: learnea_contract_address, //control structure
                functionName: allMethods[1].method,
                args: [address, allMethods[1].indexValue],
            },
            {
                abi: learnea_abi,
                address: learnea_contract_address, //control structure
                functionName: allMethods[2].method,
                args: [address, allMethods[2].indexValue],
            },
            {
                abi: learnea_abi,
                address: learnea_contract_address, //control structure
                functionName: allMethods[3].method,
                args: [address, allMethods[3].indexValue],
            },
            {
                abi: learnea_abi,
                address: learnea_contract_address, //control structure
                functionName: allMethods[4].method,
                args: [address, allMethods[4].indexValue],
            },
            {
                abi: learnea_abi,
                address: learnea_contract_address, //control structure
                functionName: allMethods[5].method,
                args: [address, allMethods[5].indexValue],
            },
            {
                abi: learnea_abi,
                address: learnea_contract_address, //control structure
                functionName: allMethods[6].method,
                args: [address, allMethods[6].indexValue],
            },
            {
                abi: learnea_abi,
                address: learnea_contract_address, //control structure
                functionName: allMethods[7].method,
                args: [address, allMethods[7].indexValue],
            },
        ],
    });

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-900">
                Error! {error.message}
            </div>
        );
    }
    if (typeof address == "undefined" || !address) {
        return (
            <div className="flex justify-center items-center h-screen text-red-900">
                No Address Provided
            </div>
        );
    }

    if (isPending) {
        return (
            <div className="flex justify-center items-center h-screen text-green-700">
                Loading...
            </div>
        );
    }

    if (isLoadingError) {
        return (
            <div className="flex justify-center items-center h-screen text-red-900">
                Loading Err!
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-screen text-red-900">
                Error!
            </div>
        );
    }

    const allNode = nodeDetails;
    console.log("a", allNode);
    const centralNodeDetails = allNode[0].result as TermDetails;
    const perspectiveNodes = allNode[1].result as `0x${string}`;
    const coTermsNodes = allNode[2].result as `0x${string}`;
    const coTermsNodes2 = allNode[3].result as `0x${string}`;
    const microTermsNodes = allNode[4].result as `0x${string}`;
    const macroTermsNodes = allNode[5].result as `0x${string}`;
    const philosophyTermsNodes = allNode[6].result as `0x${string}`;
    const scientificTermsNodes = allNode[7].result as `0x${string}`;
    const scientificTermsNodes2 = allNode[8].result as `0x${string}`;

    if (!centralNodeDetails || typeof centralNodeDetails == "undefined") {
        return (
            <div className="flex justify-center items-center h-screen text-red-900">
                Network error or RPC Request Limit reached. Please reload{" "}
                <button
                    onClick={() =>
                        refetch({
                            throwOnError: false,
                        })
                    }
                    className="btn btn-primary bg-green-700 cursor-pointer"
                >
                    Reload
                </button>
            </div>
        );
    }

    dispatch(
        setCentralTermsLevelbyIndex({
            index: addressIndex,
            title: centralNodeDetails.title,
        })
    );

    const nodesAround = [
        perspectiveNodes,
        coTermsNodes,
        coTermsNodes2,
        microTermsNodes,
        macroTermsNodes,
        philosophyTermsNodes,
        scientificTermsNodes,
        scientificTermsNodes2,
    ];

    return (
        <>
            <ConnectedNode
                address={address}
                centralNode={centralNodeDetails}
                nodesAround={nodesAround}
                addressIndex={addressIndex}
            />

            {/* <ConnectedNode />
            <ConnectedNode />
            <ConnectedNode /> */}
        </>
    );
};

export default TermsOnMap;
