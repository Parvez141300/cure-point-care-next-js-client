"use client";
import { getDoctors } from "@/app/(commonLayout)/consultation/_actions";
import { useQuery } from "@tanstack/react-query";

const DoctorsList = () => {
  const { data: doctorData } = useQuery({
    queryKey: ["doctors"],
    queryFn: () => getDoctors(),
  });

  console.log(doctorData);

  return <div>DoctorsList
    <br />
    {doctorData!.data?.map((doctor) => (
      <div key={doctor.id}>{doctor.name}</div>
    ))}
  </div>;
};

export default DoctorsList;
