"use client";
import { getDoctors } from "@/app/(commonLayout)/consultation/_actions";
import { useQuery } from "@tanstack/react-query";

const DoctorsList = () => {
  const { data } = useQuery({
    queryKey: ["doctors"],
    queryFn: () => getDoctors(),
  });

  console.log(data);

  return <div>DoctorsList
    <br />
    {data?.map((doctor) => (
      <div key={doctor.id}>{doctor.name}</div>
    ))}
  </div>;
};

export default DoctorsList;
