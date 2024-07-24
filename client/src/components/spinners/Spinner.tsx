import RingLoader from "react-spinners/RingLoader";

export default function Spinner({ isLoading }: { isLoading: boolean }) {
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
}
