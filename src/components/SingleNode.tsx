import { term_abi } from "@/abi/Term";
import { toggleTermDrawer } from "@/redux/features/drawer.slice";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useReadContract } from "wagmi";
import TermsOnMap from "./TermsOnMap";
import { replaceCentralAddressByIndex } from "@/redux/features/centralTerms.slice";

interface SingleNodeProps {
    centralAddress?: `0x${string}`;
    name: string;
    id?: string;
    style?: React.CSSProperties;
    isCenter: boolean;
    address?: `0x${string}`;
    addressIndex: number;
}

const SingleNode: React.FC<SingleNodeProps> = ({
    name,
    id,
    style,
    isCenter,
    address,
    centralAddress,
    addressIndex,
}) => {
    const [visibility, setVisibility] = useState(false);
    const dispatch = useDispatch();
    const {
        data: nodeDetails,
        isPending,
        isLoadingError,
        isError,
    } = useReadContract({
        abi: term_abi,
        address: address, //control structure
        functionName: "getDetails",
    });

    if (typeof address == "undefined" || !address) {
        return (
            <Link
                id={id}
                style={style}
                className="sub-terms text-center"
                href={`/terms/${centralAddress}/create`}
                passHref
            >
                Create Term
            </Link>
        );
    }

    if (isPending) {
        return (
            <div id={id} style={style} className="sub-terms">
                Loading...
            </div>
        );
    }

    if (isLoadingError) {
        return (
            <div id={id} style={style} className="sub-terms">
                Loading Err!
            </div>
        );
    }

    if (isError) {
        return (
            <div id={id} style={style} className="sub-terms">
                Error!
            </div>
        );
    }

    console.log("node details", nodeDetails);
    const node = nodeDetails as TermDetails;

    return (
        <Link href={isCenter ? `/terms/${address}` : "#"} passHref>
            <button
                onMouseEnter={() => setVisibility(true)}
                onMouseLeave={() => setVisibility(false)}
                id={id}
                style={style}
                className={`${
                    isCenter ? "shadow-btn mx-auto filter-shadow" : "sub-terms"
                }`}
                onClick={(e) => {
                    if (!isCenter) {
                        e.preventDefault();
                        dispatch(
                            replaceCentralAddressByIndex({
                                addressIndex,
                                address,
                            })
                        );
                    }
                }}
            >
                {node.title}

                <Link
                    href={`/terms/${address}/create`}
                    passHref
                    style={{
                        position: "absolute",
                        backgroundColor: "#e8e2e2",
                        fontSize: "0.8rem",
                        color: "rgb(26 35 35)",
                        fontWeight: "700",
                        border: "1px solid #cea7a7",
                        borderRadius: "5px",
                        padding: "10px",
                        opacity: `${visibility ? 1 : 0}`,
                        transition: "all 0.3s ease-in-out",
                        // boxShadow: "0px 0px 5px 3px brown inset",
                    }}
                >
                    Create Term
                </Link>
                <Link
                    href={`/terms/${address}/`}
                    passHref
                    style={{
                        position: "absolute",
                        top: "-30px",
                        left: "10px",
                        backgroundColor: "rgb(226, 231, 231)",
                        fontSize: "0.8rem",
                        color: "rgb(51, 51, 51)",
                        fontWeight: "700",
                        borderRadius: "5px",
                        padding: "5px",
                        opacity: `${visibility && !isCenter ? 1 : 0}`,
                        transition: "all 0.3s ease-in-out",
                    }}
                >
                    See Details
                </Link>
            </button>
        </Link>
    );
};

export default SingleNode;
