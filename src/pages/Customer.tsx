import EntityPage from "../components/crud/EntityPage";
import { customerConfig } from "../entities/customer/config";

function Customer() {
  return <EntityPage {...customerConfig} />;
}

export default Customer;
