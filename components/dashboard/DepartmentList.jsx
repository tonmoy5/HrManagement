import Table from "../../components/Table";
import Department from "../../models/department";
import { connectToDB } from "../../utils/database";

const DepartmentList = async () => {
  await connectToDB();
  const departments = await Department.find({});
  return (
    <Table
      headers={["Name", "Description"]}
      data={departments.map((d) => ({
        name: d.name,
        description: d.description,
      }))}
    />
  );
};

export default DepartmentList;
