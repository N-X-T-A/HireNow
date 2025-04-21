import React, { useState, useEffect } from "react";
import { CompaniesProfileUserShow } from "../../components/user/companiesProfile";
import { useParams } from "react-router-dom";
import { getCompanyDetails } from "../../apis/companies";
const ShowCompanieProfile = () => {
  //config
  const { ComId } = useParams();
  const [company, setCompany] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  //API
  useEffect(() => {
    const fetchCompany = async () => {
      setError("");
      try {
        const data = await getCompanyDetails(ComId);
        setCompany(data);
      } catch (err) {
        setError(
          typeof err === "string"
            ? err
            : "Đã xảy ra lỗi khi tải dữ liệu công ty."
        );
        console.error("Lỗi khi gọi API công ty:", err);
      } finally {
        setLoading(false);
      }
    };

    if (ComId) fetchCompany();
  }, [ComId]);

  return (
    <div>
      <CompaniesProfileUserShow
        company={company}
        error={error}
        loading={loading}
      />
    </div>
  );
};

export default ShowCompanieProfile;
