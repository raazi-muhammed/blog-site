"use client";

import { useToast } from "@/components/ui/use-toast";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export function useQuery<T>({
    service,
    initial,
}: {
    service: () => Promise<AxiosResponse>;
    initial: T;
}) {
    const [data, setData] = useState<T>(initial);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        setLoading(true);

        service()
            .then((res) => {
                setData(res.data.data as T);
            })
            .catch((error) => {
                toast({
                    description:
                        error.response?.data?.errors?.[0]?.message || "Failed",
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { data, setData, loading };
}
