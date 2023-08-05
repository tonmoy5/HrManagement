import Table from "@components/Table";
import Designation from "@models/designation";
import { connectToDB } from "@utils/database";

const DesignationList = async () => {
  await connectToDB();
  const departments = await Designation.find({});
  return (
    <Table
      headers={["Title", "Details"]}
      data={departments.map((d) => ({
        name: d.title,
        description: d.details,
      }))}
    />
  );
};

export default DesignationList;
