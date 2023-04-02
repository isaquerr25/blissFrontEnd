import { getHealthData } from "../api";
import { useQuery } from "@tanstack/react-query";

import React from "react";
import { Loading } from "../elements/loadingScreen";
import { useNavigate } from "react-router-dom";
function Health() {
  const navigate = useNavigate();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["health"],
    queryFn: getHealthData,
  });

  if (isLoading) return <Loading />;

  const { status } = data;

  if (status !== "OK") {
    return (
      <div className="flex justify-center items-center flex-col h-[100vh] w-[100vw]">
        <h3 className=" text-2xl opacity-[0.7]">Server health is not OK!</h3>
        <button
          className="mt-[1rem] px-[1.5rem] py-[0.5rem] rounded-[1rem] border-[2px] border-[#36d7b7] text-[1rem] hover:bg-[#fff2] transition duration-300"
          onClick={refetch}
        >
          Retry Action
        </button>
      </div>
    );
  } else {
    navigate("/questions");
  }

  return <div></div>;
}

export default Health;
