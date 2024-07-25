import RingLoader from "react-spinners/RingLoader";

export default function Spinner({
    isLoading,
    type = "normal",
}: {
    isLoading: boolean;
    type?: "form" | "normal";
}) {
    if (type == "form")
        return (
            <>
                {isLoading ? (
                    <RingLoader
                        color={"white"}
                        loading={true}
                        size={15}
                        speedMultiplier={1.5}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                ) : null}
            </>
        );
    else {
        return (
            <>
                {isLoading ? (
                    <div className="flex w-full justify-center py-20">
                        <RingLoader
                            color={"black"}
                            loading={true}
                            size={15}
                            speedMultiplier={1.5}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                ) : null}
            </>
        );
    }
}
