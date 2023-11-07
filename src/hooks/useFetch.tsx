import { useEffect, useState } from "react";
import axiosInstance from "../service/axiosInstance";

const useFetch = (url: string) => {
  const [candidateData, setCandidata] = useState<any>(null);
  const [totalRecord, setTotalRecord] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const resp = await axiosInstance.get(url);
        if (!resp.data.success) {
          console.log(resp.data.message);
        }
        setCandidata(resp.data.data);
        setTotalRecord(resp.data.records_total);
      } catch (error) {
        console.log(`error`, error);
      }
      setLoading(false);
    })();
  }, [url]);
  return [candidateData, loading, totalRecord];
};

export default useFetch;
