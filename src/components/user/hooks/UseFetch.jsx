import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UseFetch(url) {
  const [data, setData] = useState(null); // تعيين القيمة الافتراضية إلى null
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true); // تحديد حالة التحميل قبل جلب البيانات
      try {
        const response = await axios.get(url);
        setData(response.data); // تحديث البيانات
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [url]); // التحديث عند تغيير `url`

  return { data, error, isLoading };
}
