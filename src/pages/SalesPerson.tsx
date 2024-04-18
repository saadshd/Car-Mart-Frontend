import EntityPage from "../components/crud/EntityPage";
import { salesPersonConfig } from "../entities/salesPerson/config";

function SalesPerson() {
  return <EntityPage {...salesPersonConfig} />;
}

export default SalesPerson;
