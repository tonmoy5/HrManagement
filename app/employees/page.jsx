const Employees = async () => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });
  return <div>Employees</div>;
};
export default Employees;
